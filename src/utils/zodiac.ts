export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface ZodiacProfile {
  sign: ZodiacSign;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  ruler: string;
  startDegree: number;
}

export const ZODIAC_PROFILES: Record<ZodiacSign, ZodiacProfile> = {
  Aries: { sign: 'Aries', symbol: '♈', element: 'Fire', ruler: 'Mars', startDegree: 0 },
  Taurus: { sign: 'Taurus', symbol: '♉', element: 'Earth', ruler: 'Venus', startDegree: 30 },
  Gemini: { sign: 'Gemini', symbol: '♊', element: 'Air', ruler: 'Mercury', startDegree: 60 },
  Cancer: { sign: 'Cancer', symbol: '♋', element: 'Water', ruler: 'Moon', startDegree: 90 },
  Leo: { sign: 'Leo', symbol: '♌', element: 'Fire', ruler: 'Sun', startDegree: 120 },
  Virgo: { sign: 'Virgo', symbol: '♍', element: 'Earth', ruler: 'Mercury', startDegree: 150 },
  Libra: { sign: 'Libra', symbol: '♎', element: 'Air', ruler: 'Venus', startDegree: 180 },
  Scorpio: { sign: 'Scorpio', symbol: '♏', element: 'Water', ruler: 'Mars', startDegree: 210 },
  Sagittarius: { sign: 'Sagittarius', symbol: '♐', element: 'Fire', ruler: 'Jupiter', startDegree: 240 },
  Capricorn: { sign: 'Capricorn', symbol: '♑', element: 'Earth', ruler: 'Saturn', startDegree: 270 },
  Aquarius: { sign: 'Aquarius', symbol: '♒', element: 'Air', ruler: 'Saturn', startDegree: 300 },
  Pisces: { sign: 'Pisces', symbol: '♓', element: 'Water', ruler: 'Jupiter', startDegree: 330 },
};

export const getZodiacSign = (dobStr: string): ZodiacSign => {
  const date = new Date(dobStr);
  if (isNaN(date.getTime())) return 'Aries';
  const month = date.getMonth() + 1; // 1-indexed
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
};
