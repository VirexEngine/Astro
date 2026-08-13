"""
Numerology Validators
Input validation for the numerology calculator.
"""
import re
from datetime import datetime


def validate_full_name(name: str) -> str:
    """
    Validates and normalises a full name.
    - Must contain at least 2 alphabetic characters.
    - Strips extra whitespace.
    - Raises ValueError if invalid.
    """
    name = name.strip()
    alpha_chars = re.sub(r'[^a-zA-Z]', '', name)
    if len(alpha_chars) < 2:
        raise ValueError("Full name must contain at least 2 alphabetic characters.")
    if len(name) > 150:
        raise ValueError("Full name is too long. Maximum 150 characters.")
    return name


def validate_date_of_birth(dob: str) -> datetime:
    """
    Validates a date of birth string in YYYY-MM-DD format.
    - Must be a real date.
    - Cannot be in the future.
    - Cannot be before 1900.
    Returns a datetime object on success.
    Raises ValueError if invalid.
    """
    try:
        dt = datetime.strptime(dob, "%Y-%m-%d")
    except ValueError:
        raise ValueError(f"Invalid date of birth '{dob}'. Expected format: YYYY-MM-DD.")

    if dt.year < 1900:
        raise ValueError("Date of birth must be after 1900.")
    if dt > datetime.now():
        raise ValueError("Date of birth cannot be in the future.")
    return dt
