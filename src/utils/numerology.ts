export const reduceToSingleDigit = (num: number): number => {
  let temp = num;
  while (temp > 9) {
    temp = String(temp)
      .split('')
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0);
  }
  return temp;
};

export const calculateLifePath = (dobStr: string): number => {
  const digitsOnly = dobStr.replace(/\D/g, '');
  if (!digitsOnly) return 1;
  const sum = digitsOnly.split('').map(Number).reduce((acc, curr) => acc + curr, 0);
  return reduceToSingleDigit(sum);
};

const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

export const calculateDestiny = (name: string): number => {
  const clean = name.toLowerCase().replace(/[^a-z]/g, '');
  const sum = clean.split('').reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
  return reduceToSingleDigit(sum);
};

export const calculateSoul = (name: string): number => {
  const clean = name.toLowerCase().replace(/[^a-z]/g, '');
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const sum = clean
    .split('')
    .filter((char) => vowels.includes(char))
    .reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
  return reduceToSingleDigit(sum);
};

export const calculateExpression = (name: string): number => {
  const clean = name.toLowerCase().replace(/[^a-z]/g, '');
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const sum = clean
    .split('')
    .filter((char) => !vowels.includes(char))
    .reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
  return reduceToSingleDigit(sum);
};

export const getNumerologyMeaning = (num: number, category: string): string => {
  const meanings: Record<number, string> = {
    1: 'The Pioneer: independence, leadership, and raw initiative.',
    2: 'The Harmonizer: empathy, cooperation, and diplomatic pairing.',
    3: 'The Creator: joyful self-expression, communication, and social charm.',
    4: 'The Anchor: stability, structured foundations, and practical work.',
    5: 'The Explorer: absolute freedom, high adaptability, and versatile shifts.',
    6: 'The Caretaker: deep responsibility, home harmony, and warm empathy.',
    7: 'The Seeker: mental depth, spiritual analysis, and intuitive quietude.',
    8: 'The Achiever: material success, authoritative drive, and executive focus.',
    9: 'The Philanthropist: universal love, selflessness, and spiritual closure.',
  };
  return meanings[num] || 'A balanced vibrational energy.';
};
