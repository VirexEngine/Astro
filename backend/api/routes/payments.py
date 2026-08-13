import os
import time
import hmac
import hashlib
import logging
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.db import get_db
from backend.models.schemas import ConsultationBooking
from backend.services.email_service import EmailService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/payments", tags=["payments"])

# ─── Pydantic Schemas ─────────────────────────────────────────────────────────

class CreateOrderRequest(BaseModel):
    plan_id: str
    plan_name: str
    amount: int  # in Rupees
    currency: Optional[str] = "INR"
    seeker_name: str
    seeker_email: str
    seeker_phone: Optional[str] = ""
    dob: Optional[str] = ""
    tob: Optional[str] = ""
    pob: Optional[str] = ""
    scheduled_date: Optional[str] = ""
    scheduled_time: Optional[str] = ""
    notes: Optional[str] = ""
    include_recording: Optional[bool] = False


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


# ─── 1. Create Razorpay Order ──────────────────────────────────────────────────

@router.post("/create-order")
def create_order(payload: CreateOrderRequest, db: Session = Depends(get_db)):
    """
    Creates a new Razorpay order and saves pending booking details in the database.
    """
    key_id = os.getenv("RAZORPAY_KEY_ID", "").strip()
    key_secret = os.getenv("RAZORPAY_KEY_SECRET", "").strip()

    amount_in_paise = int(payload.amount * 100)
    receipt_id = f"grah_{int(time.time())}_{payload.plan_id[:4]}"

    order_id = ""
    if key_id and key_secret:
        try:
            import razorpay
            client = razorpay.Client(auth=(key_id, key_secret))
            order_data = {
                "amount": amount_in_paise,
                "currency": payload.currency or "INR",
                "receipt": receipt_id,
                "notes": {
                    "seeker_name": payload.seeker_name,
                    "seeker_email": payload.seeker_email,
                    "plan_name": payload.plan_name,
                    "scheduled_date": payload.scheduled_date or "N/A"
                }
            }
            order = client.order.create(data=order_data)
            order_id = order.get("id", "")
        except Exception as e:
            logger.error(f"Razorpay order generation error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Payment gateway initiation failed: {str(e)}"
            )
    else:
        # Development fallback
        order_id = f"order_dev_{receipt_id}"

    # Save pending booking in database
    booking = ConsultationBooking(
        order_id=order_id,
        seeker_name=payload.seeker_name.strip(),
        seeker_email=payload.seeker_email.lower().strip(),
        seeker_phone=payload.seeker_phone or "",
        dob=payload.dob or "",
        tob=payload.tob or "",
        pob=payload.pob or "",
        plan_id=payload.plan_id,
        plan_name=payload.plan_name,
        amount=payload.amount,
        currency=payload.currency or "INR",
        scheduled_date=payload.scheduled_date or "",
        scheduled_time=payload.scheduled_time or "",
        notes=payload.notes or "",
        include_recording=payload.include_recording or False,
        payment_status="created"
    )
    db.add(booking)
    db.commit()

    return {
        "status": "success",
        "order_id": order_id,
        "key_id": key_id,
        "amount": amount_in_paise,
        "currency": payload.currency or "INR",
        "plan_name": payload.plan_name,
        "seeker_name": payload.seeker_name,
        "seeker_email": payload.seeker_email,
        "seeker_phone": payload.seeker_phone
    }


# ─── 2. Verify Razorpay Payment Signature ─────────────────────────────────────

@router.post("/verify-payment")
def verify_payment(
    payload: VerifyPaymentRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Verifies Razorpay HMAC SHA256 payment signature and confirms consultation booking.
    Dispatches appointment confirmation email asynchronously.
    """
    key_secret = os.getenv("RAZORPAY_KEY_SECRET", "").strip()

    # Find booking record
    booking = db.query(ConsultationBooking).filter(
        ConsultationBooking.order_id == payload.razorpay_order_id
    ).first()

    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking record for this order ID was not found."
        )

    # Signature verification
    if key_secret and not payload.razorpay_order_id.startswith("order_dev_"):
        try:
            generated_signature = hmac.new(
                key_secret.encode("utf-8"),
                f"{payload.razorpay_order_id}|{payload.razorpay_payment_id}".encode("utf-8"),
                hashlib.sha256
            ).hexdigest()

            if generated_signature != payload.razorpay_signature:
                booking.payment_status = "failed"
                db.commit()
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Payment signature verification failed. Potential tampering detected."
                )
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Signature check error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Verification failed: {str(e)}"
            )

    # Mark booking as successfully paid
    booking.payment_id = payload.razorpay_payment_id
    booking.payment_status = "paid"
    db.commit()
    db.refresh(booking)

    booking_email_payload = {
        "seeker_name": booking.seeker_name,
        "seeker_email": booking.seeker_email,
        "plan_name": booking.plan_name,
        "scheduled_date": booking.scheduled_date,
        "scheduled_time": booking.scheduled_time,
        "amount": booking.amount,
        "payment_id": booking.payment_id,
        "order_id": booking.order_id,
    }
    # Dispatch rich HTML Appointment confirmation email in background daemon thread
    import threading
    threading.Thread(target=EmailService.send_booking_confirmation_email, args=(booking_email_payload,), daemon=True).start()

    return {
        "status": "success",
        "verified": True,
        "message": "Payment verified and consultation booking confirmed successfully ✦",
        "booking": {
            "id": booking.id,
            "order_id": booking.order_id,
            "payment_id": booking.payment_id,
            "seeker_name": booking.seeker_name,
            "seeker_email": booking.seeker_email,
            "plan_name": booking.plan_name,
            "scheduled_date": booking.scheduled_date,
            "scheduled_time": booking.scheduled_time,
            "amount": booking.amount
        }
    }


# ─── 3. Admin Consultation Bookings List ──────────────────────────────────────

@router.get("/bookings")
def list_bookings(db: Session = Depends(get_db)):
    """Returns all confirmed and pending consultation bookings for the Admin panel."""
    bookings = db.query(ConsultationBooking).order_by(ConsultationBooking.created_at.desc()).all()
    return bookings
