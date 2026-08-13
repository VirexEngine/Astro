"""
Numerology Report Builder
Assembles the final, frontend-ready JSON report from the interpreted numerology data.
Mirrors the architecture of backend/services/report_builder.py for Kundli.

Input:  dict from interpreter/numerology_engine.py
Output: Structured NumerologyReport dict consumed by frontend
"""
from typing import Any

DOMINANT_NUMBER_ORDER = ["life_path", "destiny", "soul_urge", "personality", "birthday"]


def build_numerology_report(interpreted: dict) -> dict:
    """
    Assembles the final structured Numerology report.
    """
    person = interpreted["person"]
    core = interpreted["core"]

    # Determine the primary number for the summary section
    life_path_data = core.get("life_path", {})
    primary_title = life_path_data.get("title", "")
    primary_summary = life_path_data.get("summary", "")

    # Build the number cards (the 5 main displayed cards)
    number_cards = _build_number_cards(core)

    # Build the full modules report (one unified report driven by Life Path)
    modules_report = _build_modules_report(core)

    # Compatibility stub — API ready for future
    compatibility = {
        "status": "coming_soon",
        "message": "Compatibility calculator is coming soon. Compare your numbers with a partner, friend, or business associate."
    }

    return {
        "version": "1.0",
        "person": person,
        "summary": {
            "headline": f"{person['full_name']}'s Numerology Profile",
            "primary_title": primary_title,
            "overview": primary_summary,
            "life_path": life_path_data.get("number"),
            "is_master": life_path_data.get("is_master", False),
        },
        "number_cards": number_cards,
        "modules": modules_report,
        "compatibility": compatibility,
        "extended_preview": {
            "visible": False,
            "teaser": "Unlock your Personal Year, Maturity Number, and Challenge Numbers with a full report.",
        }
    }


def _build_number_cards(core: dict) -> list[dict]:
    """Builds the 5 number cards for the top grid display."""
    cards = []
    for key in DOMINANT_NUMBER_ORDER:
        data = core.get(key, {})
        if not data:
            continue
        cards.append({
            "key": key,
            "label": data.get("label", key),
            "symbol": data.get("symbol", "✦"),
            "number": data.get("number"),
            "title": data.get("title", ""),
            "is_master": data.get("is_master", False),
            "confidence_stars": data.get("confidence_stars", 3),
            "stars_unicode": data.get("stars_unicode", "★★★☆☆"),
            "description": data.get("description", ""),
            "summary": data.get("summary", ""),
            "modules": data.get("modules", {}),
        })
    return cards


def _build_modules_report(core: dict) -> dict:
    """
    Builds the unified modules section, combining data from all 5 numbers.
    Life Path drives the primary interpretation; others add nuance.
    """
    lp = core.get("life_path", {}).get("modules", {})
    destiny = core.get("destiny", {}).get("modules", {})

    # Merge career fields from Life Path and Destiny
    career_fields = list(dict.fromkeys(
        lp.get("career", {}).get("fields", []) +
        destiny.get("career", {}).get("fields", [])
    ))

    return {
        "personality": {
            "traits":     lp.get("personality", {}).get("traits", []),
            "strengths":  lp.get("personality", {}).get("strengths", []),
            "challenges": lp.get("personality", {}).get("challenges", []),
        },
        "career": {
            "fields": career_fields[:8],  # Cap at 8 for clean display
        },
        "relationships": {
            "overview": lp.get("relationships", {}).get("overview", ""),
        },
        "finance": {
            "overview": lp.get("finance", {}).get("overview", ""),
        },
        "health": {
            "overview": lp.get("health", {}).get("overview", ""),
        },
        "lucky_elements": lp.get("lucky_elements", {}),
    }
