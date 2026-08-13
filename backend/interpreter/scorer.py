"""
Scorer: Calculates dynamic planetary strength and module-level scores.
- Planetary strength is based on sign placement (exaltation, own, moolatrikona, neutral, debilitated).
- Module scores (Career, Wealth, Marriage, etc.) aggregate relevant planet strengths.
"""
from typing import Dict, Tuple
from backend.calculator.chart import Chart
from backend.knowledge.loader import load_planet_knowledge

# Strength weights for scoring
STRENGTH_WEIGHTS = {
    "exalted": 100,
    "own": 85,
    "moolatrikona": 75,
    "neutral": 50,
    "debilitated": 15,
}

# Confidence star thresholds
CONFIDENCE_THRESHOLDS = [
    (90, 5),
    (70, 4),
    (50, 3),
    (30, 2),
    (0, 1),
]

# Kendra (angular) houses boost planetary strength
KENDRA_HOUSES = {1, 4, 7, 10}
TRIKONA_HOUSES = {1, 5, 9}

# Which planets are relevant for each module
MODULE_PLANETS = {
    "career": ["Sun", "Saturn", "Mars", "Jupiter", "Mercury"],
    "wealth": ["Jupiter", "Venus", "Moon", "Mercury", "Sun"],
    "marriage": ["Venus", "Jupiter", "Moon", "Mars"],
    "health": ["Sun", "Moon", "Mars", "Saturn"],
    "fortune": ["Jupiter", "Sun", "Moon", "Venus"],
    "personality": ["Sun", "Moon", "Ascendant"],
}


def get_planet_strength(planet_name: str, sign: str, house: int) -> Tuple[str, int]:
    """
    Returns (strength_label, numeric_score) for a planet in a given sign and house.
    Kendra/Trikona placement adds a bonus.
    """
    knowledge = load_planet_knowledge()
    planet_data = knowledge.get(planet_name)

    if not planet_data:
        return ("neutral", 50)

    strength_label = "neutral"
    base_score = 50

    # Determine sign-based strength
    if sign == planet_data.get("exaltation"):
        strength_label = "exalted"
    elif sign in planet_data.get("rules", []):
        strength_label = "own"
    elif sign == planet_data.get("moolatrikona"):
        strength_label = "moolatrikona"
    elif sign == planet_data.get("debilitation"):
        strength_label = "debilitated"
    else:
        strength_label = "neutral"

    base_score = STRENGTH_WEIGHTS.get(strength_label, 50)

    # Angular/trine house bonus
    if house in KENDRA_HOUSES or house in TRIKONA_HOUSES:
        base_score = min(100, base_score + 10)

    return (strength_label, base_score)


def get_confidence_stars(score: int) -> int:
    """Converts a 0-100 score to 1-5 confidence stars."""
    for threshold, stars in CONFIDENCE_THRESHOLDS:
        if score >= threshold:
            return stars
    return 1


def calculate_all_planet_strengths(chart: Chart) -> Dict[str, Dict]:
    """
    Calculates strength data for all planets in the chart.
    Returns a dict: { "Sun": { "sign": "Leo", "house": 1, "strength": "own", "score": 85, "stars": 4 } }
    """
    results = {}
    for planet_name, pos in chart.planets.items():
        strength_label, score = get_planet_strength(planet_name, pos.sign, pos.house)
        results[planet_name] = {
            "sign": pos.sign,
            "house": pos.house,
            "degree": round(pos.degree % 30, 2),
            "nakshatra": pos.nakshatra,
            "pada": pos.pada,
            "is_retrograde": pos.is_retrograde,
            "strength": strength_label,
            "score": score,
            "confidence_stars": get_confidence_stars(score),
        }
    return results


def calculate_module_score(module: str, planet_strengths: Dict[str, Dict]) -> int:
    """
    Calculates a 0-100 score for a life module based on relevant planet strengths.
    """
    relevant_planets = MODULE_PLANETS.get(module, [])
    scores = []
    for planet in relevant_planets:
        if planet in planet_strengths:
            scores.append(planet_strengths[planet]["score"])

    if not scores:
        return 50

    return round(sum(scores) / len(scores))
