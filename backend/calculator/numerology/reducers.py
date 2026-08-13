"""
Numerology Reducers
Handles digit summation and reduction to single digits or Master Numbers.
Master Numbers (11, 22, 33) are preserved and not reduced further.
"""

MASTER_NUMBERS = {11, 22, 33}


def digit_sum(n: int) -> int:
    """Returns the sum of all digits in an integer."""
    return sum(int(d) for d in str(abs(n)))


def reduce_to_single(n: int, allow_master: bool = True) -> int:
    """
    Reduces a number to a single digit (1–9) using iterative digit summation.
    Preserves Master Numbers 11, 22, 33 if allow_master=True.

    Examples:
        27 → 9
        29 → 11 (Master Number, preserved)
        38 → 11 → 2 (if allow_master=False)
    """
    while n > 9:
        if allow_master and n in MASTER_NUMBERS:
            return n
        n = digit_sum(n)
    return n


def reduce_date_to_single(year: int, month: int, day: int) -> int:
    """
    Reduces a date of birth to a Life Path Number.
    Each component (year, month, day) is first independently reduced,
    then they are summed and reduced again.
    Master Numbers at any stage are preserved.

    Example: 09/09/2007
        month: 9
        day:   9
        year:  2+0+0+7 = 9
        total: 9+9+9 = 27 → 9
    """
    r_month = reduce_to_single(month)
    r_day = reduce_to_single(day)
    r_year = reduce_to_single(digit_sum(year))
    total = r_month + r_day + r_year
    return reduce_to_single(total)


def is_master_number(n: int) -> bool:
    return n in MASTER_NUMBERS
