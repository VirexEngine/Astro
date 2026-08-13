"""
Interpreter Engine: The main orchestrator of The Brain.
Coordinates Scorer → Rule Engine → Resolver → and packages results
for the Report Builder.
"""
from typing import Dict, Any
from backend.calculator.chart import Chart, RawKundliResponse
from backend.interpreter.scorer import (
    calculate_all_planet_strengths,
    calculate_module_score,
    get_confidence_stars,
    MODULE_PLANETS,
)
from backend.interpreter.rule_engine import detect_yogas
from backend.interpreter.resolver import resolve_planet_interpretations, resolve_ascendant_interpretation


MODULES = ["career", "wealth", "marriage", "health", "fortune", "personality"]


def interpret_chart(raw: RawKundliResponse) -> Dict[str, Any]:
    """
    Master orchestration function.
    Takes a RawKundliResponse (from the calculator) and returns a fully
    interpreted, structured data dict ready for the Report Builder.
    """
    chart: Chart = raw.chart

    # ── Step 1: Score all planets ────────────────────────────────────────────
    planet_strengths = calculate_all_planet_strengths(chart)

    # ── Step 2: Detect Yogas ─────────────────────────────────────────────────
    detected_yogas = detect_yogas(chart)

    # ── Step 3: Resolve sign + house interpretations ─────────────────────────
    planet_interpretations = resolve_planet_interpretations(chart)
    ascendant_interpretation = resolve_ascendant_interpretation(chart)

    # ── Step 4: Calculate module scores ──────────────────────────────────────
    module_scores = {}
    for module in MODULES:
        score = calculate_module_score(module, planet_strengths)
        # Yoga bonus: each relevant high-priority yoga adds up to +5 pts
        for yoga in detected_yogas:
            if module in yoga.get("module", []) and yoga.get("priority", 0) >= 9:
                score = min(100, score + 5)
        module_scores[module] = {
            "score": score,
            "confidence_stars": get_confidence_stars(score),
        }

    # ── Step 5: Build explanation tree ───────────────────────────────────────
    explanation_tree = _build_explanation_tree(
        planet_interpretations, detected_yogas, module_scores
    )

    return {
        "metadata": raw.metadata.model_dump(),
        "ascendant": ascendant_interpretation,
        "planet_strengths": planet_strengths,
        "planet_interpretations": planet_interpretations,
        "yogas": detected_yogas,
        "module_scores": module_scores,
        "explanation_tree": explanation_tree,
    }


def _build_explanation_tree(
    planet_interpretations: Dict,
    yogas: list,
    module_scores: Dict,
) -> Dict[str, Any]:
    """
    Builds a traceable explanation tree showing how each module score
    was derived from planetary positions and yogas.
    """
    tree = {}
    for module, score_data in module_scores.items():
        relevant_planets = MODULE_PLANETS.get(module, [])
        contributing_paths = []

        for planet in relevant_planets:
            interp = planet_interpretations.get(planet)
            if interp:
                contributing_paths.append(interp["explanation_path"])

        contributing_yogas = [
            y["explanation_path"]
            for y in yogas
            if module in y.get("module", [])
        ]

        tree[module] = {
            "score": score_data["score"],
            "confidence_stars": score_data["confidence_stars"],
            "contributing_planets": contributing_paths,
            "contributing_yogas": contributing_yogas,
        }

    return tree
