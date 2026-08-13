import swisseph as swe
from functools import lru_cache
from .chart import Chart, PlanetPosition, HousePosition, ChartMetadata, RawKundliResponse

ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", 
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", 
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", 
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", 
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
]

PLANETS = {
    "Sun": swe.SUN,
    "Moon": swe.MOON,
    "Mars": swe.MARS,
    "Mercury": swe.MERCURY,
    "Jupiter": swe.JUPITER,
    "Venus": swe.VENUS,
    "Saturn": swe.SATURN,
    "Rahu": swe.MEAN_NODE,
}

def get_nakshatra(longitude: float):
    nakshatra_idx = int(longitude / (360 / 27))
    pada = int((longitude % (360 / 27)) / (360 / 108)) + 1
    return NAKSHATRAS[nakshatra_idx], pada

@lru_cache(maxsize=1024)
def calculate_chart_cached(year: int, month: int, day: int, hour: float, lat: float, lon: float, house_system: str = 'W') -> RawKundliResponse:
    swe.set_sid_mode(swe.SIDM_LAHIRI)
    
    jd = swe.julday(year, month, day, hour)
    flags = swe.FLG_SIDEREAL | swe.FLG_SWIEPH
    
    h_sys = house_system.encode('utf-8')
    houses_data, ascmc = swe.houses_ex(jd, lat, lon, h_sys, flags)
    
    asc_deg = ascmc[0]
    asc_sign_idx = int(asc_deg / 30)
    asc_sign = ZODIAC_SIGNS[asc_sign_idx]
    
    ascendant = HousePosition(house=1, sign=asc_sign, degree=asc_deg)
    
    houses = {}
    if house_system == 'W':
        for i in range(12):
            sign_idx = (asc_sign_idx + i) % 12
            houses[i+1] = HousePosition(house=i+1, sign=ZODIAC_SIGNS[sign_idx], degree=0.0)
    else:
        for i, cusp in enumerate(houses_data):
            idx = i + 1
            sign_idx = int(cusp / 30)
            houses[idx] = HousePosition(house=idx, sign=ZODIAC_SIGNS[sign_idx], degree=cusp)
            
    planets = {}
    for name, p_id in PLANETS.items():
        res, ret = swe.calc_ut(jd, p_id, flags)
        lon_deg = res[0]
        speed = res[3]
        
        sign_idx = int(lon_deg / 30)
        nak, pada = get_nakshatra(lon_deg)
        
        h = ((sign_idx - asc_sign_idx) % 12) + 1
        
        planets[name] = PlanetPosition(
            planet=name,
            sign=ZODIAC_SIGNS[sign_idx],
            house=h,
            degree=lon_deg,
            nakshatra=nak,
            pada=pada,
            is_retrograde=speed < 0
        )
        
    rahu_lon = planets["Rahu"].degree
    ketu_lon = (rahu_lon + 180) % 360
    ketu_sign_idx = int(ketu_lon / 30)
    ketu_nak, ketu_pada = get_nakshatra(ketu_lon)
    ketu_h = ((ketu_sign_idx - asc_sign_idx) % 12) + 1
    
    planets["Ketu"] = PlanetPosition(
        planet="Ketu",
        sign=ZODIAC_SIGNS[ketu_sign_idx],
        house=ketu_h,
        degree=ketu_lon,
        nakshatra=ketu_nak,
        pada=ketu_pada,
        is_retrograde=planets["Rahu"].is_retrograde
    )
    
    chart = Chart(ascendant=ascendant, planets=planets, houses=houses)
    meta = ChartMetadata(
        date=f"{year}-{month:02d}-{day:02d}",
        time=str(hour),
        latitude=lat,
        longitude=lon,
        ayanamsa="Lahiri",
        house_system=house_system
    )
    
    return RawKundliResponse(metadata=meta, chart=chart)
