from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime

from backend.calculator.ephemeris import calculate_chart_cached
from backend.services.geocoder import geocode_place
from backend.interpreter.engine import interpret_chart
from backend.services.report_builder import build_report

router = APIRouter(prefix="/api/kundli", tags=["Kundli"])


class KundliRequest(BaseModel):
    name: str
    date_of_birth: str    # YYYY-MM-DD
    time_of_birth: str    # HH:MM (24-hour, local time of birth place)
    place_of_birth: str
    house_system: str = "W"


@router.post("/calculate/raw")
async def calculate_raw_kundli(request: KundliRequest):
    """
    Returns the raw, un-interpreted chart data (planet positions, houses, ascendant).
    Useful for debugging or building custom UI.
    """
    try:
        location = geocode_place(request.place_of_birth)
        dt = datetime.strptime(
            f"{request.date_of_birth} {request.time_of_birth}", "%Y-%m-%d %H:%M"
        )

        # Convert local time to UTC using the timezone offset for the location
        utc_hour = _local_to_utc_hour(dt, location.timezone_offset)

        chart_data = calculate_chart_cached(
            year=dt.year,
            month=dt.month,
            day=dt.day,
            hour=utc_hour,
            lat=location.latitude,
            lon=location.longitude,
            house_system=request.house_system,
        )
        return chart_data

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")


@router.post("/interpret")
async def interpret_kundli(request: KundliRequest):
    """
    The full Spiritual Knowledge Engine endpoint.
    Returns a complete, interpreted Kundli report with:
    - Planet positions & strengths (with confidence stars)
    - Detected Yogas with metadata and explanation trees
    - Module scores (Career, Wealth, Marriage, Health, Fortune, Personality)
    - Summary and overview
    """
    try:
        location = geocode_place(request.place_of_birth)
        dt = datetime.strptime(
            f"{request.date_of_birth} {request.time_of_birth}", "%Y-%m-%d %H:%M"
        )

        utc_hour = _local_to_utc_hour(dt, location.timezone_offset)

        raw_chart = calculate_chart_cached(
            year=dt.year,
            month=dt.month,
            day=dt.day,
            hour=utc_hour,
            lat=location.latitude,
            lon=location.longitude,
            house_system=request.house_system,
        )

        interpreted = interpret_chart(raw_chart)
        report = build_report(request.name, interpreted)
        return report

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Interpretation error: {str(e)}")


@router.get("/autocomplete")
async def autocomplete_place(q: str):
    """
    Search places using Nominatim.
    Safe to use on mobile and client-side as it routes through Python backend.
    """
    if not q or len(q) < 3:
        return []
    try:
        from geopy.geocoders import Nominatim
        geolocator = Nominatim(user_agent="spiritual_knowledge_engine", timeout=5)
        locations = geolocator.geocode(q, exactly_one=False, limit=5)
        if not locations:
            return []
        # Return unique address strings
        return list(dict.fromkeys([loc.address for loc in locations]))
    except Exception:
        return []


def _local_to_utc_hour(dt: datetime, tz_offset_hours: float) -> float:
    """
    Converts local time fractional hour to UTC fractional hour.
    tz_offset_hours: e.g., 5.5 for IST (UTC+5:30), -5.0 for EST.
    """
    local_fractional = dt.hour + (dt.minute / 60.0)
    utc_fractional = local_fractional - tz_offset_hours
    # Handle day boundary wrap (keep in 0-24 range; the Julian day handles the date)
    return utc_fractional % 24
