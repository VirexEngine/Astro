from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from backend.db import get_db
from backend.models.schemas import Article, SiteAnnouncement

router = APIRouter(prefix="/articles", tags=["articles"])

@router.get("")
def get_published_articles(category: Optional[str] = None, db: Session = Depends(get_db)):
    """Public endpoint returning all published GrahGanit articles."""
    query = db.query(Article).filter(Article.is_published == True)
    if category and category.lower() != "all":
        query = query.filter(Article.category == category)
    
    articles = query.order_by(Article.created_at.desc()).all()
    return [
        {
            "id": a.id,
            "title": a.title,
            "slug": a.slug,
            "category": a.category,
            "excerpt": a.excerpt,
            "content": a.content,
            "cover_image": a.cover_image,
            "author_name": a.author_name,
            "read_time": a.read_time,
            "views_count": a.views_count or 0,
            "created_at": a.created_at.isoformat() if a.created_at else None
        }
        for a in articles
    ]

@router.get("/announcements/active")
def get_active_announcement(db: Session = Depends(get_db)):
    """Returns the latest active site announcement for the top banner."""
    announcement = db.query(SiteAnnouncement).filter(SiteAnnouncement.is_active == True).order_by(SiteAnnouncement.created_at.desc()).first()
    if not announcement:
        return {"active": False, "announcement": None}
    return {
        "active": True,
        "announcement": {
            "id": announcement.id,
            "badge_text": announcement.badge_text,
            "message": announcement.message,
            "link_url": announcement.link_url,
            "is_active": announcement.is_active,
            "created_at": announcement.created_at.isoformat() if announcement.created_at else None
        }
    }

@router.get("/{slug}")
def get_article_by_slug(slug: str, db: Session = Depends(get_db)):
    """Fetches a single article by its unique slug and increments view count."""
    article = db.query(Article).filter(Article.slug == slug, Article.is_published == True).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found or unavailable.")

    # Increment view count
    article.views_count = (article.views_count or 0) + 1
    db.commit()
    db.refresh(article)

    return {
        "id": article.id,
        "title": article.title,
        "slug": article.slug,
        "category": article.category,
        "excerpt": article.excerpt,
        "content": article.content,
        "cover_image": article.cover_image,
        "author_name": article.author_name,
        "read_time": article.read_time,
        "views_count": article.views_count or 0,
        "created_at": article.created_at.isoformat() if article.created_at else None
    }

# ─── Public Testimonials Endpoints ───────────────────────────────────────────
from pydantic import BaseModel

class TestimonialCreate(BaseModel):
    name: str
    zodiac_sign: Optional[str] = "Seeker"
    rating: Optional[int] = 5
    category: Optional[str] = "General Experience"
    comment: str

@router.get("/testimonials/list")
def list_public_testimonials(db: Session = Depends(get_db)):
    """Returns all approved seeker testimonials for the website showcase."""
    from backend.models.schemas import Testimonial
    return db.query(Testimonial).filter(Testimonial.is_approved == True).order_by(Testimonial.created_at.desc()).all()

import html

@router.post("/testimonials/submit")
def submit_public_testimonial(payload: TestimonialCreate, db: Session = Depends(get_db)):
    """Public endpoint to submit a seeker testimonial (Requires Admin Approval)."""
    from backend.models.schemas import Testimonial
    
    clean_name = html.escape(payload.name.strip())
    clean_zodiac = html.escape(payload.zodiac_sign.strip()) if payload.zodiac_sign else "Seeker"
    clean_category = html.escape(payload.category.strip()) if payload.category else "General Experience"
    clean_comment = html.escape(payload.comment.strip())

    new_testimonial = Testimonial(
        name=clean_name,
        zodiac_sign=clean_zodiac,
        rating=payload.rating or 5,
        category=clean_category,
        comment=clean_comment,
        is_approved=False  # Requires Admin Approval to prevent spam!
    )
    db.add(new_testimonial)
    db.commit()
    db.refresh(new_testimonial)
    return {
        "status": "success",
        "message": "Thank you for sharing your experience! Your review has been submitted for moderation and will appear on GrahGanit once verified by Acharyaa Smita Mishra.",
        "testimonial": new_testimonial
    }

