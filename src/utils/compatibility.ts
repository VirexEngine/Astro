import { PlanetPosition } from './astrology';
import { PlanetAspect, ElementCompatibility } from '../types/compatibility';

// Calculate angular difference between two degrees (0 - 360)
export const getAngleDiff = (deg1: number, deg2: number): number => {
  const diff = Math.abs(deg1 - deg2) % 360;
  return diff > 180 ? 360 - diff : diff;
};

// Check if an angle forms an aspect within a given orb (e.g. 7 degrees)
export const getAspect = (
  planetA: PlanetPosition,
  planetB: PlanetPosition
): PlanetAspect | null => {
  const diff = getAngleDiff(planetA.degree, planetB.degree);
  const orb = 8; // Orb of tolerance

  const aspects: {
    target: number;
    name: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
    harmony: 'Excellent' | 'Good' | 'Challenging' | 'Neutral';
    desc: string;
  }[] = [
    {
      target: 0,
      name: 'Conjunction',
      harmony: 'Good',
      desc: 'Blends energy and focuses action. Indicates high resonance and joint paths.',
    },
    {
      target: 60,
      name: 'Sextile',
      harmony: 'Good',
      desc: 'Creates supportive, cooperative energy. Promotes easy conversational flow.',
    },
    {
      target: 90,
      name: 'Square',
      harmony: 'Challenging',
      desc: 'Generates dynamic tension. Highlights areas that require learning, compromise, and friction.',
    },
    {
      target: 120,
      name: 'Trine',
      harmony: 'Excellent',
      desc: 'Flows easily and brings natural harmony. Unlocks deep emotional compatibility without effort.',
    },
    {
      target: 180,
      name: 'Opposition',
      harmony: 'Challenging',
      desc: 'Highlights differences. Promotes dynamic balancing and forces growth or compromise.',
    },
  ];

  for (const asp of aspects) {
    if (Math.abs(diff - asp.target) <= orb) {
      return {
        planetA: planetA.name,
        planetASymbol: planetA.symbol,
        planetB: planetB.name,
        planetBSymbol: planetB.symbol,
        angle: Math.round(diff),
        aspectName: asp.name,
        harmony: asp.harmony,
        description: `${planetA.name} ${asp.name} ${planetB.name}: ${asp.desc}`,
      };
    }
  }

  return null;
};

export const getElementsCompatibility = (
  elA: 'Fire' | 'Earth' | 'Air' | 'Water',
  elB: 'Fire' | 'Earth' | 'Air' | 'Water'
): ElementCompatibility => {
  const key = `${elA}-${elB}`;
  const reverseKey = `${elB}-${elA}`;

  const elementsData: Record<string, { score: number; desc: string; color: string }> = {
    // Same elements
    'Fire-Fire': { score: 90, desc: 'High passion, enthusiasm, and shared motivation. Can occasionally explode into arguments.', color: '#F59E0B' },
    'Earth-Earth': { score: 95, desc: 'Exceptionally stable, reliable, and practical partnership. Solid long-term commitment.', color: '#10B981' },
    'Air-Air': { score: 88, desc: 'Exceptional communication, mental alignment, and intellectual exchange. Lacks grounding.', color: '#3B82F6' },
    'Water-Water': { score: 92, desc: 'Deep intuitive bonding, mutual empathy, and silent understanding. Prone to emotional volatility.', color: '#06B6D4' },
    
    // Fire combinations
    'Fire-Earth': { score: 65, desc: 'Fire can warm the Earth, but too much Earth smothers Fire. Demands continuous adjustment.', color: '#D97706' },
    'Fire-Air': { score: 85, desc: 'Air fans the Fire, creating spark, travel plans, and high creativity. Exciting and active bond.', color: '#F59E0B' },
    'Fire-Water': { score: 50, desc: 'Steam creation: Water extinguishes Fire, Fire boils Water. Highly passionate but volatile.', color: '#EC4899' },
    
    // Earth combinations
    'Earth-Air': { score: 60, desc: 'Practicality meets intellect. Earth finds Air too flighty, Air finds Earth too slow.', color: '#10B981' },
    'Earth-Water': { score: 95, desc: 'Earth structures Water, Water nourishes Earth. An incredibly productive, fertile, and loving match.', color: '#10B981' },
    
    // Air combinations
    'Air-Water': { score: 58, desc: 'Fogs and storms: Air tries to analyze feelings, Water acts on intuition. Confusing communication.', color: '#3B82F6' },
  };

  const match = elementsData[key] || elementsData[reverseKey] || { score: 70, desc: 'Neutral elemental compatibility.', color: '#7C3AED' };

  return {
    elementA: elA,
    elementB: elB,
    score: match.score,
    description: match.desc,
    particleColor: match.color,
  };
};
