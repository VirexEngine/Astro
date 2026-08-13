"""
Pythagorean Numerology System
Maps letters A-Z to numbers 1-9 according to the standard Pythagorean chart.

A J S = 1
B K T = 2
C L U = 3
D M V = 4
E N W = 5
F O X = 6
G P Y = 7
H Q Z = 8
I R   = 9
"""

PYTHAGOREAN_MAP: dict[str, int] = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9,
}

VOWELS = set('AEIOU')
CONSONANTS = set(PYTHAGOREAN_MAP.keys()) - VOWELS


def letter_value(char: str) -> int:
    """Returns the Pythagorean numeric value for a single letter. Non-letters return 0."""
    return PYTHAGOREAN_MAP.get(char.upper(), 0)


def name_to_values(name: str) -> list[int]:
    """Returns a list of Pythagorean values for every letter in a name."""
    return [letter_value(c) for c in name.upper() if c.isalpha()]


def vowel_values(name: str) -> list[int]:
    """Returns Pythagorean values for vowels only."""
    return [letter_value(c) for c in name.upper() if c.upper() in VOWELS]


def consonant_values(name: str) -> list[int]:
    """Returns Pythagorean values for consonants only."""
    return [letter_value(c) for c in name.upper() if c.upper() in CONSONANTS]
