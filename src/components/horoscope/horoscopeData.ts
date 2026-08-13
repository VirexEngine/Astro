import { Heart, Briefcase, Activity, Coins, Users, Compass } from './HoroscopeCard';

export interface HoroscopeData {
  cosmicScore: number;
  wisdomQuote: string;
  wisdomAuthor: string;
  metrics: {
    energy: number;
    confidence: number;
    luck: number;
    emotional: number;
  };
  details: {
    category: 'General' | 'Love' | 'Career' | 'Health' | 'Money' | 'Family' | 'Spirituality';
    score: number;
    prediction: string;
    transitWhy: string;
    icon: any;
    color: string;
  }[];
  influences: {
    planetName: string;
    symbol: string;
    metricLabel: string;
    influenceValue: number;
    color: string;
    glow: string;
  }[];
  luckyItems: {
    label: string;
    value: string;
    icon: string;
  }[];
  timeline: {
    time: string;
    emoji: string;
    status: 'Excellent' | 'Good' | 'Average' | 'Avoid' | 'Reflection';
    title: string;
    desc: string;
  }[];
  moonPhase: {
    name: string;
    illumination: number;
    meaning: string;
  };
}

export const HOROSCOPE_DATA: Record<string, HoroscopeData> = {
  Aries: {
    cosmicScore: 88,
    wisdomQuote: "The fire within you is stronger than the storm around you.",
    wisdomAuthor: "Surya Purana",
    metrics: { energy: 92, confidence: 85, luck: 80, emotional: 75 },
    details: [
      { category: 'General', score: 88, prediction: "Aries, today Mars sparks a fiery curiosity in your intellectual pursuits. Your mind is sharp, and you will find yourself cracking solutions to complex structural problems with ease. Avoid rushing conversations before noon, and make time to ground your energy this evening.", transitWhy: "Mars in Gemini aspecting your Sun amplifies rapid mental speed. Grounding exercises prevent burnout.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 84, prediction: "Venus highlights your relationship sector. A minor debate yields a compromise that brings you and your partner closer than ever.", transitWhy: "Venus transit aspects suggest pleasant communication exchanges under the Libra Moon.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 91, prediction: "Excellent day to negotiate terms, send pitches, or speak in public meetings. Your quick wit leads to leadership recognition.", transitWhy: "Mercury in Leo boosts self-expression and professional visibility.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 80, prediction: "Energy levels are high, but mental chatter is constant. Avoid caffeine after 3 PM to ensure deep sleep.", transitWhy: "Lunar opposition calls for rest cycles in the evening.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 82, prediction: "Postpone signing permanent long-term contracts. Review transaction details, as a minor typo could delay payment.", transitWhy: "Mercury Retrograde caution warns against hasty financial commitments.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 85, prediction: "Reconnecting with a relative brings warm nostalgia and clears up a past misunderstanding. Keep speech gentle.", transitWhy: "Fourth house transits indicate supportive domestic vibrations.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 89, prediction: "A short, silent meditation session after sunset reveals a clear message regarding a career crossroads.", transitWhy: "Jupiter aspecting the Ninth house illuminates spiritual wisdom.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Sun', symbol: '☉', metricLabel: 'Vitality', influenceValue: 18, color: 'from-amber-500 to-yellow-400', glow: 'rgba(245,158,11,0.1)' },
      { planetName: 'Moon', symbol: '☽', metricLabel: 'Intuition', influenceValue: 12, color: 'from-slate-400 to-slate-200', glow: 'rgba(255,255,255,0.05)' },
      { planetName: 'Mars', symbol: '♂', metricLabel: 'Courage', influenceValue: 24, color: 'from-red-500 to-orange-400', glow: 'rgba(239,68,68,0.15)' },
      { planetName: 'Mercury', symbol: '☿', metricLabel: 'Logic', influenceValue: 15, color: 'from-emerald-500 to-teal-400', glow: 'rgba(52,211,153,0.1)' },
      { planetName: 'Jupiter', symbol: '♃', metricLabel: 'Fortune', influenceValue: 20, color: 'from-amber-400 to-yellow-500', glow: 'rgba(251,191,36,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '9', icon: '🔢' },
      { label: 'Lucky Color', value: 'Crimson Red', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Red Coral', icon: '💎' },
      { label: 'Lucky Direction', value: 'East', icon: '🧭' },
      { label: 'Lucky Time', value: '9:30 AM – 11:00 AM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'A', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Copper', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Mangalaya Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '6:00 AM', emoji: '🧘', status: 'Reflection', title: 'Inner Focus', desc: 'Ideal time for meditation' },
      { time: '9:00 AM', emoji: '⚡', status: 'Excellent', title: 'Morning Spark', desc: 'Send important emails' },
      { time: '12:00 PM', emoji: '🥗', status: 'Average', title: 'Digestive Pause', desc: 'Avoid disputes over lunch' },
      { time: '3:00 PM', emoji: '💼', status: 'Good', title: 'Career Alignment', desc: 'Great time for interviews' },
      { time: '6:00 PM', emoji: '🚶', status: 'Good', title: 'Grounding Walk', desc: 'Spend time in nature' },
      { time: '9:00 PM', emoji: '📖', status: 'Reflection', title: 'Gratitude Journal', desc: 'Reflect on lessons' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 13,
      meaning: 'A time of planting seeds, setting intentions, and gathering energy for dynamic action.'
    }
  },
  Taurus: {
    cosmicScore: 85,
    wisdomQuote: "Patience and persistence ground the soul in earthly riches.",
    wisdomAuthor: "Veda Vyasa",
    metrics: { energy: 80, confidence: 88, luck: 85, emotional: 90 },
    details: [
      { category: 'General', score: 85, prediction: "Taurus, today Venus casts a warm, stabilizing glow over your sign. Take things slowly and enjoy the sensual pleasures of food, art, or nature. A colleague offers valuable support, reminding you that cooperation is key.", transitWhy: "Venus in Virgo aligns with your Earth element, stabilizing your routines.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 90, prediction: "A partner shares deep appreciation for your reliability. Reconnect over a home-cooked dinner.", transitWhy: "Lunar transit in Libra highlights relational balance.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 82, prediction: "Focus on organizing backlog items. Practical compilation yields better results than starting new initiatives.", transitWhy: "Saturn aspects suggest steady, methodical progress.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 88, prediction: "Physical vitality is excellent. Incorporate stretching or grounding yoga postures to release neck tension.", transitWhy: "Earth element alignments boost muscular recovery.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 89, prediction: "A past investment shows signs of growth. Review long-term portfolio yields with analytical calm.", transitWhy: "Second house solar alignments enhance financial security.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 80, prediction: "A domestic task requires patience. Speak softly, avoiding rigid demands on family members.", transitWhy: "Fourth house transits indicate minor communication friction.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 84, prediction: "Spend time under the moonlight to connect with your inner sanctuary and recharge emotional reserves.", transitWhy: "Moon aspects suggest deep receptive meditations.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Sun', symbol: '☉', metricLabel: 'Vitality', influenceValue: 12, color: 'from-amber-500 to-yellow-400', glow: 'rgba(245,158,11,0.1)' },
      { planetName: 'Moon', symbol: '☽', metricLabel: 'Intuition', influenceValue: 20, color: 'from-slate-400 to-slate-200', glow: 'rgba(255,255,255,0.05)' },
      { planetName: 'Venus', symbol: '♀', metricLabel: 'Harmony', influenceValue: 25, color: 'from-pink-500 to-rose-400', glow: 'rgba(236,72,153,0.15)' },
      { planetName: 'Mercury', symbol: '☿', metricLabel: 'Logic', influenceValue: 14, color: 'from-emerald-500 to-teal-400', glow: 'rgba(52,211,153,0.1)' },
      { planetName: 'Jupiter', symbol: '♃', metricLabel: 'Fortune', influenceValue: 15, color: 'from-amber-400 to-yellow-500', glow: 'rgba(251,191,36,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '6', icon: '🔢' },
      { label: 'Lucky Color', value: 'Emerald Green', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Diamond', icon: '💎' },
      { label: 'Lucky Direction', value: 'South', icon: '🧭' },
      { label: 'Lucky Time', value: '2:15 PM – 3:45 PM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'V', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Silver', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Shukraya Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '6:00 AM', emoji: '🚶', status: 'Good', title: 'Earth Walk', desc: 'Walk barefoot on green grass' },
      { time: '9:00 AM', emoji: '🍳', status: 'Excellent', title: 'Hearty Breakfast', desc: 'Nourish your physical vessel' },
      { time: '12:00 PM', emoji: '📊', status: 'Good', title: 'Financial Audit', desc: 'Review statements' },
      { time: '3:00 PM', emoji: '☕', status: 'Average', title: 'Rest Break', desc: 'Avoid rushing tasks' },
      { time: '6:00 PM', emoji: '🎨', status: 'Excellent', title: 'Creative Act', desc: 'Cook, draw, or listen to music' },
      { time: '9:00 PM', emoji: '🛌', status: 'Reflection', title: 'Lunar Rest', desc: 'Rest early for emotional recovery' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 13,
      meaning: 'Align with intentions. Focus on nurturing newly formed habits.'
    }
  }
  // Fallbacks for remaining signs mapped dynamically in route component
};

export const getZodiacForecast = (sign: string): HoroscopeData => {
  return HOROSCOPE_DATA[sign] || HOROSCOPE_DATA['Aries'];
};
