"""
Knowledge Loader: Loads and caches all atomic JSON knowledge files.
This is a read-only module — it never modifies data.
"""
import json
import os
from functools import lru_cache
from typing import Dict, Any

KNOWLEDGE_ROOT = os.path.join(os.path.dirname(__file__), "v1")


def _load_json(filepath: str) -> Any:
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


@lru_cache(maxsize=1)
def load_planet_knowledge() -> Dict[str, Any]:
    """Returns a dict of all planet knowledge, keyed by planet name."""
    planets_dir = os.path.join(KNOWLEDGE_ROOT, "planets")
    data = {}
    for filename in os.listdir(planets_dir):
        if filename.endswith(".json"):
            planet_name = filename.replace(".json", "").capitalize()
            filepath = os.path.join(planets_dir, filename)
            data[planet_name] = _load_json(filepath)
    return data


@lru_cache(maxsize=1)
def load_house_knowledge() -> Dict[str, Any]:
    """Returns the houses knowledge dict."""
    filepath = os.path.join(KNOWLEDGE_ROOT, "houses", "houses.json")
    return _load_json(filepath)["houses"]


@lru_cache(maxsize=1)
def load_yoga_knowledge() -> list:
    """Returns a list of all yoga definitions."""
    filepath = os.path.join(KNOWLEDGE_ROOT, "yogas", "yogas.json")
    return _load_json(filepath)["yogas"]


@lru_cache(maxsize=1)
def load_numerology_knowledge() -> dict[int, dict]:
    """
    Returns a dict of all numerology number knowledge, keyed by number (int).
    Loads core numbers (1–9) and master numbers (11, 22, 33).
    """
    data: dict[int, dict] = {}

    core_dir = os.path.join(KNOWLEDGE_ROOT, "numerology", "core")
    for filename in os.listdir(core_dir):
        if filename.endswith(".json"):
            num = int(filename.replace(".json", ""))
            data[num] = _load_json(os.path.join(core_dir, filename))

    master_dir = os.path.join(KNOWLEDGE_ROOT, "numerology", "master")
    for filename in os.listdir(master_dir):
        if filename.endswith(".json"):
            num = int(filename.replace(".json", ""))
            data[num] = _load_json(os.path.join(master_dir, filename))

    return data
