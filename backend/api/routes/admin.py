from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
import secrets

from backend.db import get_db
from backend.models.schemas import User, Article, SiteAnnouncement, ConsultationTier, ContactMessage
from backend.api.routes.user import verify_password, hash_password

router = APIRouter(prefix="/admin", tags=["admin"])

# ─── Pydantic Request Models ──────────────────────────────────────────────────
class AdminLoginRequest(BaseModel):
    email: str
    password: str

class ArticleCreateUpdate(BaseModel):
    title: str
    slug: Optional[str] = None
    category: Optional[str] = "Vedic Astrology"
    excerpt: Optional[str] = None
    content: str
    cover_image: Optional[str] = None
    author_name: Optional[str] = "GrahGanit Observatory"
    read_time: Optional[str] = "5 min read"
    is_published: Optional[bool] = True

class AnnouncementCreateUpdate(BaseModel):
    badge_text: Optional[str] = "COSMIC ALERT"
    message: str
    link_url: Optional[str] = None
    is_active: Optional[bool] = True

class PromoteUserRequest(BaseModel):
    email: str
    is_admin: bool

# ─── 1. Admin Authentication Endpoint ─────────────────────────────────────────
@router.post("/login")
def admin_login(payload: AdminLoginRequest, db: Session = Depends(get_db)):
    """Authenticates admin user and returns access token."""
    user = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials or account not found."
        )

    if not user.password_hash or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Your account does not have Admin privileges."
        )

    # Return admin session info
    return {
        "status": "success",
        "message": "Admin authorization granted.",
        "admin": {
            "id": user.id,
            "name": user.name or "Admin",
            "email": user.email,
            "is_admin": user.is_admin
        },
        "token": secrets.token_hex(32)
    }

# ─── 2. Admin Dashboard Stats & Diagnostics ─────────────────────────────────
@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Returns top-level overview metrics and diagnostics for the Admin Console."""
    from backend.models.schemas import ContactMessage, Testimonial
    
    total_users = db.query(User).count()
    admin_users = db.query(User).filter(User.is_admin == True).count()
    total_articles = db.query(Article).count()
    published_articles = db.query(Article).filter(Article.is_published == True).count()
    active_announcements = db.query(SiteAnnouncement).filter(SiteAnnouncement.is_active == True).count()
    unread_messages = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()
    total_messages = db.query(ContactMessage).count()
    total_testimonials = db.query(Testimonial).count()
    approved_testimonials = db.query(Testimonial).filter(Testimonial.is_approved == True).count()

    # Calculate aggregate article views
    articles = db.query(Article).all()
    total_views = sum(a.views_count or 0 for a in articles)

    return {
        "total_users": total_users,
        "admin_users": admin_users,
        "total_articles": total_articles,
        "published_articles": published_articles,
        "total_views": total_views,
        "active_announcements": active_announcements,
        "unread_messages": unread_messages,
        "total_messages": total_messages,
        "total_testimonials": total_testimonials,
        "approved_testimonials": approved_testimonials,
        "db_engine": "SQLite (grahganit.db)",
        "astrology_engine": "Swiss Ephemeris v2.10 (Active)",
        "server_status": "OPERATIONAL 🟢"
    }

# ─── 3. Article Management Endpoints (CRUD) ──────────────────────────────────
@router.get("/articles")
def list_admin_articles(db: Session = Depends(get_db)):
    """Lists all articles (including draft status) for Admin management."""
    articles = db.query(Article).order_by(Article.created_at.desc()).all()
    return articles

@router.post("/articles")
def create_article(payload: ArticleCreateUpdate, db: Session = Depends(get_db)):
    """Creates a new article."""
    slug = payload.slug
    if not slug:
        slug = payload.title.lower().replace(" ", "-").replace("?", "").replace("!", "").strip()
    
    # Check for existing slug
    existing = db.query(Article).filter(Article.slug == slug).first()
    if existing:
        slug = f"{slug}-{secrets.token_hex(3)}"

    new_article = Article(
        title=payload.title,
        slug=slug,
        category=payload.category or "Vedic Astrology",
        excerpt=payload.excerpt,
        content=payload.content,
        cover_image=payload.cover_image,
        author_name=payload.author_name or "GrahGanit Observatory",
        read_time=payload.read_time or "5 min read",
        is_published=payload.is_published
    )
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    return {"status": "success", "article": new_article}

@router.put("/articles/{article_id}")
def update_article(article_id: int, payload: ArticleCreateUpdate, db: Session = Depends(get_db)):
    """Updates an existing article."""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    article.title = payload.title
    if payload.slug:
        article.slug = payload.slug
    article.category = payload.category
    article.excerpt = payload.excerpt
    article.content = payload.content
    article.cover_image = payload.cover_image
    article.author_name = payload.author_name
    article.read_time = payload.read_time
    article.is_published = payload.is_published
    article.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(article)
    return {"status": "success", "article": article}

@router.delete("/articles/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db)):
    """Deletes an article."""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    db.delete(article)
    db.commit()
    return {"status": "success", "message": f"Article #{article_id} deleted."}

# ─── 4. Site Announcement Management Endpoints ────────────────────────────────
@router.get("/announcements")
def list_announcements(db: Session = Depends(get_db)):
    """Lists all site announcements."""
    return db.query(SiteAnnouncement).order_by(SiteAnnouncement.created_at.desc()).all()

@router.post("/announcements")
def create_announcement(payload: AnnouncementCreateUpdate, db: Session = Depends(get_db)):
    """Creates a new site announcement banner."""
    announcement = SiteAnnouncement(
        badge_text=payload.badge_text or "COSMIC ALERT",
        message=payload.message,
        link_url=payload.link_url,
        is_active=payload.is_active
    )
    db.add(announcement)
    db.commit()
    db.refresh(announcement)
    return {"status": "success", "announcement": announcement}

@router.put("/announcements/{announcement_id}/toggle")
def toggle_announcement(announcement_id: int, db: Session = Depends(get_db)):
    """Toggles active state of an announcement."""
    announcement = db.query(SiteAnnouncement).filter(SiteAnnouncement.id == announcement_id).first()
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    announcement.is_active = not announcement.is_active
    db.commit()
    return {"status": "success", "is_active": announcement.is_active}

@router.delete("/announcements/{announcement_id}")
def delete_announcement(announcement_id: int, db: Session = Depends(get_db)):
    """Deletes an announcement."""
    announcement = db.query(SiteAnnouncement).filter(SiteAnnouncement.id == announcement_id).first()
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    db.delete(announcement)
    db.commit()
    return {"status": "success", "message": "Announcement removed."}

# ─── 5. User Management & Admin Promotion ─────────────────────────────────────
@router.get("/users")
def list_users(db: Session = Depends(get_db)):
    """Lists registered users for Admin inspection."""
    users = db.query(User).order_by(User.created_at.desc()).limit(100).all()
    return [
        {
            "id": u.id,
            "name": u.name or "User",
            "email": u.email,
            "is_verified": u.is_verified,
            "is_admin": u.is_admin,
            "created_at": u.created_at
        }
        for u in users
    ]

@router.post("/users/promote")
def promote_user(payload: PromoteUserRequest, db: Session = Depends(get_db)):
    """Grants or revokes Admin privileges for a specific user email."""
    user = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if not user:
        raise HTTPException(status_code=404, detail="User account not found")

    user.is_admin = payload.is_admin
    db.commit()
    return {"status": "success", "email": user.email, "is_admin": user.is_admin}

# ─── 6. Consultation Tiers Management ─────────────────────────────────────────
class ConsultationTierUpdate(BaseModel):
    title: str
    price_inr: int
    duration: str
    description: Optional[str] = None
    features: Optional[List[str]] = None
    is_popular: Optional[bool] = False
    is_active: Optional[bool] = True

@router.get("/consultation-tiers")
def list_consultation_tiers(db: Session = Depends(get_db)):
    """Lists all consultation tiers."""
    return db.query(ConsultationTier).order_by(ConsultationTier.id.asc()).all()

@router.put("/consultation-tiers/{tier_key}")
def update_consultation_tier(tier_key: str, payload: ConsultationTierUpdate, db: Session = Depends(get_db)):
    """Updates a consultation tier by its key (silver, gold, platinum)."""
    tier = db.query(ConsultationTier).filter(ConsultationTier.tier_key == tier_key).first()
    if not tier:
        tier = ConsultationTier(tier_key=tier_key, title=payload.title, price_inr=payload.price_inr, duration=payload.duration)
        db.add(tier)

    tier.title = payload.title
    tier.price_inr = payload.price_inr
    tier.duration = payload.duration
    tier.description = payload.description
    tier.features = payload.features
    tier.is_popular = payload.is_popular
    tier.is_active = payload.is_active

    db.commit()
    db.refresh(tier)
    return {"status": "success", "tier": tier}


# ─── 7. Contact Messages Endpoints ───────────────────────────────────────────
class ContactMessageSubmit(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    dob: Optional[str] = None
    tob: Optional[str] = None
    pob: Optional[str] = None
    message: str

@router.post("/contact-messages/submit")
def submit_contact_message(payload: ContactMessageSubmit, db: Session = Depends(get_db)):
    """Public endpoint: Allows visitors to transmit a message to the Admin Panel."""
    msg = ContactMessage(
        name=payload.name.strip(),
        email=payload.email.strip(),
        phone=payload.phone.strip() if payload.phone else None,
        subject=payload.subject.strip(),
        dob=payload.dob.strip() if payload.dob else None,
        tob=payload.tob.strip() if payload.tob else None,
        pob=payload.pob.strip() if payload.pob else None,
        message=payload.message.strip(),
        is_read=False,
        created_at=datetime.utcnow()
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return {"status": "success", "message": "Message transmitted to GrahGanit Admin Panel.", "id": msg.id}

@router.get("/contact-messages/list")
def list_contact_messages(db: Session = Depends(get_db)):
    """Admin endpoint: Retrieves all submitted seeker messages and unread counter."""
    messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
    unread_count = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()
    return {
        "status": "success",
        "unread_count": unread_count,
        "total_count": len(messages),
        "messages": [
            {
                "id": m.id,
                "name": m.name,
                "email": m.email,
                "phone": m.phone,
                "subject": m.subject,
                "dob": m.dob,
                "tob": m.tob,
                "pob": m.pob,
                "message": m.message,
                "is_read": m.is_read,
                "created_at": m.created_at
            }
            for m in messages
        ]
    }

@router.post("/contact-messages/{message_id}/toggle-read")
def toggle_message_read(message_id: int, db: Session = Depends(get_db)):
    """Admin endpoint: Toggles read/unread status of a message."""
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")

    msg.is_read = not msg.is_read
    db.commit()
    return {"status": "success", "id": msg.id, "is_read": msg.is_read}

@router.delete("/contact-messages/{message_id}")
def delete_contact_message(message_id: int, db: Session = Depends(get_db)):
    """Admin endpoint: Deletes a seeker message."""
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")

    db.delete(msg)
    db.commit()
    return {"status": "success", "message": "Message deleted."}


# ─── 8. Testimonials Management Endpoints ─────────────────────────────────────
@router.get("/testimonials")
def list_admin_testimonials(db: Session = Depends(get_db)):
    """Lists all seeker testimonials for admin approval/moderation."""
    from backend.models.schemas import Testimonial
    testimonials = db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()
    return testimonials

@router.post("/testimonials/{testimonial_id}/toggle-approve")
def toggle_testimonial_approve(testimonial_id: int, db: Session = Depends(get_db)):
    """Toggles approval status of a testimonial."""
    from backend.models.schemas import Testimonial
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    t.is_approved = not t.is_approved
    db.commit()
    return {"status": "success", "id": t.id, "is_approved": t.is_approved}

@router.delete("/testimonials/{testimonial_id}")
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    """Deletes a testimonial."""
    from backend.models.schemas import Testimonial
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(t)
    db.commit()
    return {"status": "success", "message": "Testimonial removed."}


