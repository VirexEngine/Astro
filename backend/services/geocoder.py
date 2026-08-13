"""
Geocoder Service: Resolves a place name to geographic coordinates and UTC offset.
Uses Photon API + Nominatim for lat/lon and timezonefinder for accurate timezone offsets.
All results are LRU-cached for performance.
"""
from functools import lru_cache
from pydantic import BaseModel
import urllib.request
import urllib.parse
import json

class GeoLocation(BaseModel):
    name: str
    latitude: float
    longitude: float
    timezone_str: str = ""
    timezone_offset: float = 0.0   # UTC offset in hours, e.g. 5.5 for IST


@lru_cache(maxsize=128)
def geocode_place(place_name: str) -> GeoLocation:
    """
    Geocodes a place name to lat/lon + UTC offset.
    Uses Photon API, Nominatim fallback, and sensible default for reliability.
    """
    lat, lon, resolved_name = _fetch_coords(place_name)
    tz_offset = _get_timezone_offset(lat, lon)

    return GeoLocation(
        name=resolved_name or place_name,
        latitude=lat,
        longitude=lon,
        timezone_str="",
        timezone_offset=tz_offset,
    )


def _fetch_coords(place_name: str):
    # 1. Try Photon API (komoot)
    try:
        url = f"https://photon.komoot.io/api/?q={urllib.parse.quote(place_name)}&limit=1"
        req = urllib.request.Request(url, headers={'User-Agent': 'GrahGanitApp/1.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data and data.get("features"):
                feat = data["features"][0]
                coords = feat.get("geometry", {}).get("coordinates", [])
                if len(coords) >= 2:
                    lon, lat = float(coords[0]), float(coords[1])
                    props = feat.get("properties", {})
                    name = ", ".join(filter(None, [props.get("name"), props.get("state"), props.get("country")]))
                    return lat, lon, name or place_name
    except Exception as e:
        print(f"[Geocoder] Photon failed: {e}")

    # 2. Try Nominatim geolocator fallback
    try:
        from geopy.geocoders import Nominatim
        geolocator = Nominatim(user_agent="spiritual_knowledge_engine_v2", timeout=5)
        location = geolocator.geocode(place_name)
        if location:
            return location.latitude, location.longitude, location.address
    except Exception as e:
        print(f"[Geocoder] Nominatim failed: {e}")

    # 3. Graceful Fallback (Default: New Delhi, India 28.6139, 77.2090)
    return 28.6139, 77.2090, place_name


def _get_timezone_offset(lat: float, lon: float) -> float:
    """
    Gets the UTC offset for a given lat/lon.
    Prefers timezonefinder (accurate), falls back to longitude estimate.
    """
    try:
        from timezonefinder import TimezoneFinder
        import pytz
        from datetime import datetime

        tf = TimezoneFinder()
        tz_name = tf.timezone_at(lat=lat, lng=lon)
        if tz_name:
            tz = pytz.timezone(tz_name)
            offset = tz.utcoffset(datetime.utcnow()).total_seconds() / 3600.0
            return offset
    except Exception:
        pass

    # Default to IST (5.5) for Indian longitudes or estimate by longitude (15° per hour)
    if 68.0 <= lon <= 97.0 and 6.0 <= lat <= 37.0:
        return 5.5
    return round(lon / 15.0, 1)
