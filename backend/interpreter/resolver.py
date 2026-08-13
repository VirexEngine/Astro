"""
Resolver: Assembles the planet-level interpretations.
Pulls statements from knowledge base based on planet sign and house placement.
Builds the explanation tree for traceability.
"""
from typing import Dict, List, Any
from backend.calculator.chart import Chart
from backend.knowledge.loader import load_planet_knowledge, load_house_knowledge


def resolve_planet_interpretations(chart: Chart) -> Dict[str, Any]:
    """
    For each planet, pulls sign-based and house-based statements from the knowledge base.
    Returns a dict keyed by planet name, with interpretation arrays and explanation paths.
    """
    planet_knowledge = load_planet_knowledge()
    house_knowledge = load_house_knowledge()
    results = {}

    for planet_name, pos in chart.planets.items():
        p_data = planet_knowledge.get(planet_name)
        if not p_data:
            continue

        sign_statements = []
        house_statements = []
        sign_strength = "neutral"

        # Get sign-based statements
        in_signs = p_data.get("in_signs", {})
        sign_data = in_signs.get(pos.sign, {})
        if sign_data:
            sign_statements = sign_data.get("statements", [])
            sign_strength = sign_data.get("strength", "neutral")

        # Get house-based statements
        in_houses = p_data.get("in_houses", {})
        house_statements = in_houses.get(str(pos.house), [])

        # Get house signification context
        house_meta = house_knowledge.get(str(pos.house), {})

        results[planet_name] = {
            "planet": planet_name,
            "sign": pos.sign,
            "house": pos.house,
            "nakshatra": pos.nakshatra,
            "pada": pos.pada,
            "is_retrograde": pos.is_retrograde,
            "sign_strength": sign_strength,
            "sign_statements": sign_statements,
            "house_statements": house_statements,
            "house_name": house_meta.get("name", ""),
            "house_significations": house_meta.get("significations", []),
            "explanation_path": f"{planet_name} in {pos.sign} → House {pos.house} ({house_meta.get('name', '')})"
        }

    return results


def resolve_ascendant_interpretation(chart: Chart) -> Dict[str, Any]:
    """Resolves the ascendant (rising sign) description."""
    house_knowledge = load_house_knowledge()
    asc = chart.ascendant
    first_house = house_knowledge.get("1", {})

    return {
        "sign": asc.sign,
        "degree": round(asc.degree % 30, 2),
        "house_name": first_house.get("name", "Tanu Bhava"),
        "description": f"Your ascendant is {asc.sign}, making you {_get_asc_trait(asc.sign)}",
        "explanation_path": f"Ascendant → {asc.sign} → House 1 (Tanu Bhava)"
    }


def _get_asc_trait(sign: str) -> str:
    traits = {
        "Aries": "bold, pioneering, and naturally assertive",
        "Taurus": "grounded, sensual, and persistent",
        "Gemini": "intellectually curious, communicative, and adaptable",
        "Cancer": "deeply nurturing, intuitive, and emotionally sensitive",
        "Leo": "charismatic, confident, and naturally commanding",
        "Virgo": "analytical, service-oriented, and meticulous",
        "Libra": "charming, balanced, and socially graceful",
        "Scorpio": "intense, perceptive, and powerfully transformative",
        "Sagittarius": "optimistic, philosophical, and freedom-loving",
        "Capricorn": "disciplined, ambitious, and steadily determined",
        "Aquarius": "innovative, independent, and humanitarianly driven",
        "Pisces": "empathetic, spiritually inclined, and imaginatively gifted"
    }
    return traits.get(sign, "a unique individual with distinctive qualities")
