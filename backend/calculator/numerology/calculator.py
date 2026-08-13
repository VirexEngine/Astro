"""
Numerology Calculator
Computes all core and extended numerology numbers from validated inputs.
Returns raw numbers only — no interpretations.
The interpretation engine loads meaning from the knowledge base.

Core Numbers (displayed in V1):
  - Life Path Number   → from date of birth
  - Destiny Number     → from full birth name (all letters)
  - Soul Urge Number   → from vowels in name
  - Personality Number → from consonants in name
  - Birthday Number    → from day of birth

Extended Numbers (computed, stored, hidden in V1 — for future unlock):
  - Personal Year Number
  - Personal Month Number
  - Maturity Number
  - Challenge Numbers (4)
"""
from datetime import datetime

from .reducers import reduce_to_single, reduce_date_to_single, digit_sum
from .pythagorean import name_to_values, vowel_values, consonant_values
from .validators import validate_full_name, validate_date_of_birth


def calculate_numerology(full_name: str, date_of_birth: str, preferred_name: str = "") -> dict:
    """
    Master calculator entry point.
    
    Args:
        full_name:      Full birth name (e.g., "Pratyush Kumar")
        date_of_birth:  Date of birth in YYYY-MM-DD format
        preferred_name: Optional nickname for supplemental calculations

    Returns:
        dict with 'core' numbers and 'extended' numbers (raw, unreduced where applicable).
    """
    # ── Validate Inputs ────────────────────────────────────────────────────────
    validated_name = validate_full_name(full_name)
    validated_dob: datetime = validate_date_of_birth(date_of_birth)

    calc_name = validate_full_name(preferred_name) if preferred_name and preferred_name.strip() else validated_name

    year = validated_dob.year
    month = validated_dob.month
    day = validated_dob.day

    # ── Core Numbers ───────────────────────────────────────────────────────────
    life_path = _life_path(year, month, day)
    destiny   = _destiny(validated_name)
    soul_urge  = _soul_urge(validated_name)
    personality = _personality(validated_name)
    birthday  = _birthday(day)

    # ── Extended Numbers (hidden in V1) ────────────────────────────────────────
    current_year  = datetime.now().year
    personal_year = _personal_year(month, day, current_year)
    personal_month = _personal_month(personal_year, datetime.now().month)
    maturity      = _maturity(life_path, destiny)
    challenges    = _challenge_numbers(year, month, day)

    return {
        "person": {
            "full_name": validated_name,
            "preferred_name": calc_name,
            "date_of_birth": date_of_birth,
        },
        "core": {
            "life_path":    life_path,
            "destiny":      destiny,
            "soul_urge":    soul_urge,
            "personality":  personality,
            "birthday":     birthday,
        },
        "extended": {
            "personal_year":   personal_year,
            "personal_month":  personal_month,
            "maturity":        maturity,
            "challenges":      challenges,
        }
    }


# ── Core Calculators ───────────────────────────────────────────────────────────

def _life_path(year: int, month: int, day: int) -> int:
    """Life Path: digit-sum of full DOB, preserving Master Numbers."""
    return reduce_date_to_single(year, month, day)


def _destiny(name: str) -> int:
    """Destiny (Expression): sum of all letter values in full birth name."""
    values = name_to_values(name)
    return reduce_to_single(sum(values))


def _soul_urge(name: str) -> int:
    """Soul Urge (Heart's Desire): sum of vowel values in full birth name."""
    values = vowel_values(name)
    total = sum(values)
    return reduce_to_single(total) if total else 0


def _personality(name: str) -> int:
    """Personality: sum of consonant values in full birth name."""
    values = consonant_values(name)
    total = sum(values)
    return reduce_to_single(total) if total else 0


def _birthday(day: int) -> int:
    """Birthday: the day of birth, reduced if > 9 but preserving Master Numbers."""
    return reduce_to_single(day)


# ── Extended Calculators ───────────────────────────────────────────────────────

def _personal_year(birth_month: int, birth_day: int, current_year: int) -> int:
    """Personal Year: month + day of birth + current year, all reduced."""
    total = reduce_to_single(birth_month) + reduce_to_single(birth_day) + reduce_to_single(digit_sum(current_year))
    return reduce_to_single(total)


def _personal_month(personal_year: int, current_month: int) -> int:
    """Personal Month: personal year + current month, reduced."""
    return reduce_to_single(personal_year + current_month)


def _maturity(life_path: int, destiny: int) -> int:
    """Maturity Number: sum of Life Path and Destiny, reduced."""
    return reduce_to_single(life_path + destiny)


def _challenge_numbers(year: int, month: int, day: int) -> list[int]:
    """
    Returns the 4 Challenge Numbers:
      C1 = |day - month|
      C2 = |day - year|
      C3 = |C1 - C2|
      C4 = |month - year|
    All values reduced to single digits (no Master Number preservation for challenges).
    """
    r_month = reduce_to_single(month, allow_master=False)
    r_day   = reduce_to_single(day, allow_master=False)
    r_year  = reduce_to_single(digit_sum(year), allow_master=False)

    c1 = reduce_to_single(abs(r_day - r_month), allow_master=False)
    c2 = reduce_to_single(abs(r_day - r_year), allow_master=False)
    c3 = reduce_to_single(abs(c1 - c2), allow_master=False)
    c4 = reduce_to_single(abs(r_month - r_year), allow_master=False)

    return [c1, c2, c3, c4]
