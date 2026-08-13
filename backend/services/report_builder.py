"""
Report Builder: Transforms the raw interpreter output into the final,
beautifully structured JSON report that the frontend consumes.

This is a pure transformation function — no calculations, no DB calls.
Input:  dict from interpreter/engine.py
Output: Structured KundliReport dict
"""
from typing import Dict, Any, List


STARS_UNICODE = {1: "★☆☆☆☆", 2: "★★☆☆☆", 3: "★★★☆☆", 4: "★★★★☆", 5: "★★★★★"}

MODULE_LABELS = {
    "career":      {"label": "Career & Profession",   "icon": "briefcase"},
    "wealth":      {"label": "Wealth & Finance",       "icon": "coins"},
    "marriage":    {"label": "Love & Marriage",         "icon": "heart"},
    "health":      {"label": "Health & Vitality",       "icon": "activity"},
    "fortune":     {"label": "Luck & Fortune",          "icon": "star"},
    "personality": {"label": "Personality & Self",      "icon": "user"},
}

STRENGTH_LABELS = {
    "exalted":      {"label": "Exalted",      "color": "gold"},
    "own":          {"label": "Own Sign",      "color": "green"},
    "moolatrikona": {"label": "Moolatrikona",  "color": "teal"},
    "neutral":      {"label": "Neutral",       "color": "gray"},
    "debilitated":  {"label": "Debilitated",   "color": "red"},
}

YOGA_CATEGORY_LABELS = {
    "raja":              "Raja Yoga (Royal)",
    "pancha_mahapurusha": "Pancha Mahapurusha",
    "benefic":           "Benefic Yoga",
    "dhana":             "Dhana Yoga (Wealth)",
    "challenging":       "Challenging Yoga",
}


def build_report(name: str, interpreted_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Assembles the final structured Kundli report from interpreter output.
    """
    return {
        "version": "1.0",
        "person": {"name": name},
        "metadata": _build_metadata_section(interpreted_data["metadata"]),
        "ascendant": _build_ascendant_section(interpreted_data["ascendant"]),
        "planets": _build_planets_section(
            interpreted_data["planet_strengths"],
            interpreted_data["planet_interpretations"],
        ),
        "yogas": _build_yogas_section(interpreted_data["yogas"]),
        "life_modules": _build_modules_section(interpreted_data["module_scores"]),
        "explanation_tree": interpreted_data["explanation_tree"],
        "summary": _build_summary(
            name,
            interpreted_data["ascendant"],
            interpreted_data["yogas"],
            interpreted_data["module_scores"],
        ),
    }


def _build_metadata_section(meta: Dict) -> Dict:
    return {
        "date_of_birth": meta.get("date"),
        "time_of_birth": meta.get("time"),
        "latitude": meta.get("latitude"),
        "longitude": meta.get("longitude"),
        "ayanamsa": meta.get("ayanamsa"),
        "house_system": meta.get("house_system"),
    }


def _build_ascendant_section(asc: Dict) -> Dict:
    return {
        "sign": asc.get("sign"),
        "degree": asc.get("degree"),
        "house_name": asc.get("house_name"),
        "description": asc.get("description"),
        "explanation_path": asc.get("explanation_path"),
    }


def _build_planets_section(strengths: Dict, interpretations: Dict) -> List[Dict]:
    PLANET_ORDER = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]
    planets = []
    for planet in PLANET_ORDER:
        s = strengths.get(planet, {})
        i = interpretations.get(planet, {})
        if not s:
            continue

        strength_label = s.get("strength", "neutral")
        strength_info = STRENGTH_LABELS.get(strength_label, STRENGTH_LABELS["neutral"])

        planets.append({
            "name": planet,
            "sign": s.get("sign"),
            "house": s.get("house"),
            "degree": s.get("degree"),
            "nakshatra": s.get("nakshatra"),
            "pada": s.get("pada"),
            "is_retrograde": s.get("is_retrograde", False),
            "strength": {
                "label": strength_info["label"],
                "color": strength_info["color"],
                "score": s.get("score"),
                "stars": STARS_UNICODE.get(s.get("confidence_stars", 3), "★★★☆☆"),
                "stars_count": s.get("confidence_stars", 3),
            },
            "sign_statements": i.get("sign_statements", []),
            "house_statements": i.get("house_statements", []),
            "house_name": i.get("house_name", ""),
            "explanation_path": i.get("explanation_path", ""),
        })
    return planets


def _build_yogas_section(yogas: List[Dict]) -> List[Dict]:
    if not yogas:
        return []

    result = []
    for y in yogas:
        category_label = YOGA_CATEGORY_LABELS.get(y.get("category", ""), y.get("category", ""))
        result.append({
            "id": y["id"],
            "name": y["name"],
            "category": category_label,
            "priority": y["priority"],
            "severity": y["severity"],
            "rarity": y["rarity"],
            "applicable_modules": y.get("module", []),
            "source": y["source"],
            "description": y["description"],
            "statements": y["statements"],
            "explanation_path": y["explanation_path"],
        })
    return result


def _build_modules_section(module_scores: Dict) -> List[Dict]:
    modules = []
    for module_key, score_data in module_scores.items():
        meta = MODULE_LABELS.get(module_key, {"label": module_key, "icon": "circle"})
        score = score_data["score"]
        stars = score_data["confidence_stars"]
        modules.append({
            "key": module_key,
            "label": meta["label"],
            "icon": meta["icon"],
            "score": score,
            "score_label": _score_to_label(score),
            "stars": STARS_UNICODE.get(stars, "★★★☆☆"),
            "stars_count": stars,
            "color": _score_to_color(score),
        })
    return modules


def _build_summary(name: str, asc: Dict, yogas: List, modules: Dict) -> Dict:
    top_module = max(modules.items(), key=lambda x: x[1]["score"])
    top_yoga_names = [y["name"] for y in yogas[:3]] if yogas else []
    yoga_text = (
        f" Your chart contains powerful yogas including {', '.join(top_yoga_names)}."
        if top_yoga_names else ""
    )

    return {
        "headline": f"{name}'s Vedic Kundli Report",
        "overview": (
            f"{name} is born with a {asc.get('sign')} ascendant, "
            f"{asc.get('description', '').split(',')[1].strip() if ',' in asc.get('description','') else ''}."
            f"{yoga_text}"
        ),
        "strongest_area": MODULE_LABELS.get(top_module[0], {}).get("label", top_module[0]),
        "yoga_count": len(yogas),
    }


def _score_to_label(score: int) -> str:
    if score >= 85: return "Exceptional"
    if score >= 70: return "Strong"
    if score >= 55: return "Good"
    if score >= 40: return "Moderate"
    if score >= 25: return "Weak"
    return "Challenging"


def _score_to_color(score: int) -> str:
    if score >= 85: return "#FFD700"
    if score >= 70: return "#22c55e"
    if score >= 55: return "#3b82f6"
    if score >= 40: return "#f59e0b"
    if score >= 25: return "#f97316"
    return "#ef4444"
