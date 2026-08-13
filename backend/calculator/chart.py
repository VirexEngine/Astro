from pydantic import BaseModel
from typing import Dict

class PlanetPosition(BaseModel):
    planet: str
    sign: str
    house: int
    degree: float
    nakshatra: str
    pada: int
    is_retrograde: bool

class HousePosition(BaseModel):
    house: int
    sign: str
    degree: float

class Chart(BaseModel):
    ascendant: HousePosition
    planets: Dict[str, PlanetPosition]
    houses: Dict[int, HousePosition]

class ChartMetadata(BaseModel):
    date: str
    time: str
    latitude: float
    longitude: float
    ayanamsa: str
    house_system: str

class RawKundliResponse(BaseModel):
    metadata: ChartMetadata
    chart: Chart
