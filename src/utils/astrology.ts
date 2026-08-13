import { getZodiacSign } from './zodiac';

export interface PlanetPosition {
  name: string;
  symbol: string;
  degree: number; // 0 - 360
  zodiacSign: string;
}

const PLANETS = [
  { name: 'Sun', symbol: '☉' },
  { name: 'Moon', symbol: '☽' },
  { name: 'Mercury', symbol: '☿' },
  { name: 'Venus', symbol: '♀' },
  { name: 'Mars', symbol: '♂' },
  { name: 'Jupiter', symbol: '♃' },
  { name: 'Saturn', symbol: '♄' },
];

// Simple deterministic hash for a string to create consistent numbers
const getDeterministicHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

export const getPlanetaryPositions = (
  dob: string,
  time: string,
  place: string
): PlanetPosition[] => {
  const hashInput = `${dob}-${time}-${place}`;
  const seed = getDeterministicHash(hashInput);

  return PLANETS.map((planet, idx) => {
    // Determine degree deterministically based on seed and index
    let degree = (seed * (idx + 1) + 47) % 360;

    // Special cases to align with Sun-zodiac sign
    if (planet.name === 'Sun') {
      // Align Sun degree with Zodiac sign
      const sign = getZodiacSign(dob);
      const signStartDegrees: Record<string, number> = {
        Aries: 0, Taurus: 30, Gemini: 60, Cancer: 90, Leo: 120, Virgo: 150,
        Libra: 180, Scorpio: 210, Sagittarius: 240, Capricorn: 270, Aquarius: 300, Pisces: 330
      };
      const baseDeg = signStartDegrees[sign] || 0;
      degree = (baseDeg + (seed % 30)) % 360;
    }

    // Determine zodiac sign name based on degrees (each sign takes 30 degrees)
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    const signIndex = Math.floor(degree / 30);
    const zodiacSign = signs[signIndex];

    return {
      name: planet.name,
      symbol: planet.symbol,
      degree,
      zodiacSign,
    };
  });
};
