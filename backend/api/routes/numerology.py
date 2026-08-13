"""
Numerology API Routes
POST /api/numerology/calculate  → Full numerology report
POST /api/numerology/compatibility → Compatibility stub (future)
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from backend.calculator.numerology import calculate_numerology
from backend.interpreter.numerology_engine import interpret_numerology
from backend.services.numerology_report_builder import build_numerology_report

router = APIRouter(prefix="/api/numerology", tags=["Numerology"])


class NumerologyRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=150, description="Full birth name")
    date_of_birth: str = Field(..., description="Date of birth in YYYY-MM-DD format")
    preferred_name: str = Field(default="", description="Optional nickname or preferred name")


class CompatibilityRequest(BaseModel):
    person_a: NumerologyRequest
    person_b: NumerologyRequest


@router.post("/calculate")
async def calculate_numerology_report(request: NumerologyRequest):
    """
    Full Numerology pipeline:
    Request → Calculator (raw numbers) → Interpretation Engine → Report Builder → JSON

    Returns a complete, structured numerology report with:
    - 5 core number cards (Life Path, Destiny, Soul Urge, Personality, Birthday)
    - Full modules (Personality, Career, Relationships, Finance, Health, Lucky Elements)
    - Extended numbers (hidden in V1, available for future unlock)
    - Compatibility stub
    """
    try:
        # Stage 1: Calculate raw numbers
        raw = calculate_numerology(
            full_name=request.full_name,
            date_of_birth=request.date_of_birth,
            preferred_name=request.preferred_name,
        )

        # Stage 2: Interpret via knowledge base
        interpreted = interpret_numerology(raw)

        # Stage 3: Build structured report
        report = build_numerology_report(interpreted)

        return report

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=f"Knowledge base error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")


@router.post("/compatibility")
async def compatibility_check(request: CompatibilityRequest):
    """
    Compatibility Calculator — API endpoint registered and ready.
    V1 returns a structured stub. Full implementation coming soon.
    """
    try:
        # Calculate both people's core numbers for future use
        raw_a = calculate_numerology(
            full_name=request.person_a.full_name,
            date_of_birth=request.person_a.date_of_birth,
        )
        raw_b = calculate_numerology(
            full_name=request.person_b.full_name,
            date_of_birth=request.person_b.date_of_birth,
        )

        return {
            "status": "coming_soon",
            "person_a": {
                "name": request.person_a.full_name,
                "life_path": raw_a["core"]["life_path"],
            },
            "person_b": {
                "name": request.person_b.full_name,
                "life_path": raw_b["core"]["life_path"],
            },
            "compatibility": {
                "friendship": None,
                "romance": None,
                "business": None,
                "communication": None,
                "message": "Full compatibility analysis is coming soon."
            }
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compatibility error: {str(e)}")
