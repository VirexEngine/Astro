"""
Rule Engine: Detects Yogas and rules from the knowledge base given a parsed chart.
Each detected Yoga includes full metadata for the explanation tree.
"""
from typing import List, Dict, Any
from backend.calculator.chart import Chart
from backend.knowledge.loader import load_yoga_knowledge

KENDRA_HOUSES = {1, 4, 7, 10}
BENEFIC_PLANETS = {"Jupiter", "Venus", "Mercury", "Moon"}


def _get_house_lord(house_sign: str) -> str:
    """Returns the ruling planet of a zodiac sign."""
    SIGN_RULERS = {
        "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
        "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
        "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
        "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
    }
    return SIGN_RULERS.get(house_sign, "Unknown")


def _get_lord_of_house(chart: Chart, house_num: int) -> str:
    """Returns the ruling planet of a given house number."""
    house_data = chart.houses.get(house_num)
    if not house_data:
        return "Unknown"
    return _get_house_lord(house_data.sign)


def _planets_are_conjunct(chart: Chart, p1: str, p2: str) -> bool:
    """Check if two planets are in the same house."""
    pos1 = chart.planets.get(p1)
    pos2 = chart.planets.get(p2)
    if not pos1 or not pos2:
        return False
    return pos1.house == pos2.house


def _lords_in_mutual_aspect_or_conjunction(chart: Chart, house1: int, house2: int) -> bool:
    """
    Check if lords of two houses are conjunct or in mutual aspect (7th from each other).
    """
    lord1 = _get_lord_of_house(chart, house1)
    lord2 = _get_lord_of_house(chart, house2)

    if lord1 == "Unknown" or lord2 == "Unknown":
        return False

    pos1 = chart.planets.get(lord1)
    pos2 = chart.planets.get(lord2)

    if not pos1 or not pos2:
        return False

    # Conjunction
    if pos1.house == pos2.house:
        return True

    # Mutual 7th aspect (opposition)
    if abs(pos1.house - pos2.house) == 6:
        return True

    return False


def _planet_in_own_or_exalted_in_kendra(chart: Chart, planet: str) -> bool:
    """Check if a planet is in own sign or exalted AND in a Kendra house."""
    from backend.knowledge.loader import load_planet_knowledge
    knowledge = load_planet_knowledge()
    planet_data = knowledge.get(planet)
    if not planet_data:
        return False

    pos = chart.planets.get(planet)
    if not pos:
        return False

    is_strong = (
        pos.sign in planet_data.get("rules", []) or
        pos.sign == planet_data.get("exaltation") or
        pos.sign == planet_data.get("moolatrikona")
    )

    return is_strong and pos.house in KENDRA_HOUSES


def _check_gaja_kesari(chart: Chart) -> bool:
    """Jupiter and Moon in mutual Kendra from each other."""
    jup = chart.planets.get("Jupiter")
    moon = chart.planets.get("Moon")
    if not jup or not moon:
        return False
    diff = abs(jup.house - moon.house)
    return diff in {0, 3, 6, 9}


def _check_kemadruma(chart: Chart) -> bool:
    """Moon has no planets in 2nd or 12th from it (excluding Sun and nodes)."""
    moon = chart.planets.get("Moon")
    if not moon:
        return False
    moon_house = moon.house
    flanking = {((moon_house - 2) % 12) + 1, moon_house % 12 + 1}
    EXCLUDED = {"Moon", "Sun", "Rahu", "Ketu"}
    occupied = set()
    for p_name, p_pos in chart.planets.items():
        if p_name not in EXCLUDED:
            occupied.add(p_pos.house)
    return len(flanking.intersection(occupied)) == 0


def _check_neecha_bhanga(chart: Chart) -> bool:
    """
    A debilitated planet has its debilitation sign lord in a Kendra from the ascendant,
    OR the exalted sign lord of the debilitated planet is in a Kendra.
    Simplified check.
    """
    from backend.knowledge.loader import load_planet_knowledge
    knowledge = load_planet_knowledge()
    for p_name, pos in chart.planets.items():
        planet_data = knowledge.get(p_name)
        if not planet_data:
            continue
        if pos.sign == planet_data.get("debilitation"):
            # Check if the lord of the debilitation sign is in a kendra
            debi_lord = _get_house_lord(pos.sign)
            debi_lord_pos = chart.planets.get(debi_lord)
            if debi_lord_pos and debi_lord_pos.house in KENDRA_HOUSES:
                return True
    return False


def _check_adhi_yoga(chart: Chart) -> bool:
    """Mercury, Venus, Jupiter are in 6th, 7th, or 8th from Moon (any combination)."""
    moon = chart.planets.get("Moon")
    if not moon:
        return False
    moon_house = moon.house
    target_houses = {(moon_house + offset - 1) % 12 + 1 for offset in [5, 6, 7]}
    benefic_houses = set()
    for p in ["Mercury", "Venus", "Jupiter"]:
        pos = chart.planets.get(p)
        if pos:
            benefic_houses.add(pos.house)
    return len(benefic_houses.intersection(target_houses)) >= 2


def detect_yogas(chart: Chart) -> List[Dict[str, Any]]:
    """
    Runs all yoga conditions against the chart and returns a list of detected yogas
    with full metadata and explanation tree entries.
    """
    all_yogas = load_yoga_knowledge()
    detected = []

    for yoga in all_yogas:
        triggered = False
        conditions = yoga.get("conditions", [])

        for condition in conditions:
            ctype = condition.get("type")

            if ctype == "conjunction_or_mutual_aspect":
                houses = condition.get("houses", [])
                if len(houses) == 2:
                    triggered = _lords_in_mutual_aspect_or_conjunction(chart, houses[0], houses[1])

            elif ctype == "conjunction_or_mutual_kendra":
                planets = condition.get("planets", [])
                if planets == ["Jupiter", "Moon"]:
                    triggered = _check_gaja_kesari(chart)

            elif ctype == "planet_in_own_or_exalted_in_kendra":
                planet = condition.get("planet")
                if planet:
                    triggered = _planet_in_own_or_exalted_in_kendra(chart, planet)

            elif ctype == "benefics_in_6_7_8_from_moon":
                triggered = _check_adhi_yoga(chart)

            elif ctype == "conjunction":
                planets = condition.get("planets", [])
                if len(planets) == 2:
                    triggered = _planets_are_conjunct(chart, planets[0], planets[1])

            elif ctype == "kemadruma":
                triggered = _check_kemadruma(chart)

            elif ctype == "neecha_bhanga":
                triggered = _check_neecha_bhanga(chart)

            if triggered:
                break

        if triggered:
            detected.append({
                "id": yoga["id"],
                "name": yoga["name"],
                "category": yoga["category"],
                "priority": yoga["priority"],
                "severity": yoga["severity"],
                "rarity": yoga["rarity"],
                "module": yoga["module"],
                "source": yoga["source"],
                "description": yoga["description"],
                "statements": yoga["statements"],
                "explanation_path": f"{yoga['name']} → {yoga['source']}"
            })

    # Sort by priority descending
    detected.sort(key=lambda y: y["priority"], reverse=True)
    return detected
