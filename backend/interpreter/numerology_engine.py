"""
Numerology Interpretation Engine
Loads knowledge base data and maps raw numbers into structured interpretations.
Mirrors the architecture of backend/interpreter/engine.py for Kundli.

Input:  raw numerology numbers dict (from calculator)
Output: enriched interpretation dict (consumed by report builder)
"""
from typing import Any

from backend.knowledge.loader import load_numerology_knowledge
from backend.calculator.numerology.reducers import is_master_number

STARS_UNICODE = {1: "★☆☆☆☆", 2: "★★☆☆☆", 3: "★★★☆☆", 4: "★★★★☆", 5: "★★★★★"}

# Confidence for core numbers shown to users
NUMBER_CONFIDENCE: dict[str, int] = {
    "life_path": 5,
    "destiny": 5,
    "soul_urge": 4,
    "personality": 4,
    "birthday": 3,
}

NUMBER_LABELS: dict[str, dict] = {
    "life_path":    {"label": "Life Path",   "symbol": "⭐", "description": "Your primary life purpose and the lessons you are here to learn."},
    "destiny":      {"label": "Destiny",     "symbol": "✦", "description": "Your talents and the path your life is destined to express."},
    "soul_urge":    {"label": "Soul Urge",   "symbol": "♡", "description": "Your deepest inner desires, motivations, and heart's calling."},
    "personality":  {"label": "Personality", "symbol": "◈", "description": "How the outside world perceives and experiences you."},
    "birthday":     {"label": "Birthday",    "symbol": "🎂", "description": "A special gift or talent indicated by your day of birth."},
}


def interpret_numerology(raw: dict) -> dict:
    """
    Enriches raw numerology numbers with knowledge base interpretations.
    
    Args:
        raw: output from calculate_numerology()
    
    Returns:
        Fully enriched interpretation dict for the report builder.
    """
    knowledge = load_numerology_knowledge()
    core = raw["core"]
    extended = raw["extended"]

    interpreted_core = {}
    for key, number in core.items():
        kb = knowledge.get(number, _fallback_knowledge(number))
        stars_count = NUMBER_CONFIDENCE.get(key, 3)
        meta = NUMBER_LABELS.get(key, {"label": key, "symbol": "✦", "description": ""})

        interpreted_core[key] = {
            "number": number,
            "is_master": is_master_number(number),
            "label": meta["label"],
            "symbol": meta["symbol"],
            "description": meta["description"],
            "title": kb.get("title", ""),
            "summary": kb.get("summary", ""),
            "confidence_stars": stars_count,
            "stars_unicode": STARS_UNICODE.get(stars_count, "★★★☆☆"),
            "modules": {
                "personality": {
                    "traits": kb.get("personality", []),
                    "strengths": kb.get("strengths", []),
                    "challenges": kb.get("challenges", []),
                },
                "career": {
                    "fields": kb.get("career", []),
                },
                "relationships": {
                    "overview": kb.get("relationships", ""),
                },
                "finance": {
                    "overview": kb.get("finance", ""),
                },
                "health": {
                    "overview": kb.get("health", ""),
                },
                "lucky_elements": kb.get("lucky_elements", {}),
            },
        }

    # Extended numbers — raw values only, no full interpretation for V1
    interpreted_extended = {
        "personal_year":  {"number": extended["personal_year"], "visible": False},
        "personal_month": {"number": extended["personal_month"], "visible": False},
        "maturity":       {"number": extended["maturity"], "visible": False},
        "challenges":     {"numbers": extended["challenges"], "visible": False},
    }

    return {
        "person": raw["person"],
        "core": interpreted_core,
        "extended": interpreted_extended,
    }


def _fallback_knowledge(number: int) -> dict:
    """Returns a minimal fallback if the knowledge file is missing."""
    return {
        "title": f"Number {number}",
        "summary": f"This is a {number} vibration.",
        "personality": [],
        "strengths": [],
        "challenges": [],
        "career": [],
        "relationships": "",
        "finance": "",
        "health": "",
        "lucky_elements": {},
    }
