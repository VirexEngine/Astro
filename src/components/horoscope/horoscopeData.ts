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
  },
  Gemini: {
    cosmicScore: 91,
    wisdomQuote: "Thought is the seed of cosmic manifestation.",
    wisdomAuthor: "Rig Veda",
    metrics: { energy: 94, confidence: 89, luck: 86, emotional: 82 },
    details: [
      { category: 'General', score: 91, prediction: "Gemini, your planetary ruler Mercury illuminates your house of intellect and networking. Ideas flow effortlessly, and written or spoken words carry persuasive magnetism. Channel this energy into strategic planning.", transitWhy: "Mercury transit activates your 1st and 3rd house axis.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 87, prediction: "Engaging conversations spark romantic warmth. Share a long-held creative dream with your partner.", transitWhy: "Venus aspecting Gemini brings lighthearted affection.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 95, prediction: "A breakthrough presentation or business proposal gets immediate approval. Speak with bold clarity.", transitWhy: "Sun-Mercury conjunction elevates professional authority.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 85, prediction: "Nervous energy is high. Practice deep pranayama breathwork to quiet an overactive mind.", transitWhy: "Air element predominance requires deliberate breathing.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 84, prediction: "Multiple small income streams show promise. Diversify without overextending your time.", transitWhy: "Eleventh house lord transits support multiple gains.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 88, prediction: "A sibling or cousin reaches out with pleasant news. Host a spontaneous family gathering.", transitWhy: "Third house planetary alignment favors sibling bonds.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 86, prediction: "Study ancient texts or mantras. Your mind is uniquely receptive to subtle philosophical truths.", transitWhy: "Jupiter in the 9th house expands spiritual awareness.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Mercury', symbol: '☿', metricLabel: 'Intellect', influenceValue: 28, color: 'from-emerald-500 to-teal-400', glow: 'rgba(52,211,153,0.15)' },
      { planetName: 'Sun', symbol: '☉', metricLabel: 'Visibility', influenceValue: 20, color: 'from-amber-500 to-yellow-400', glow: 'rgba(245,158,11,0.1)' },
      { planetName: 'Venus', symbol: '♀', metricLabel: 'Charm', influenceValue: 18, color: 'from-pink-500 to-rose-400', glow: 'rgba(236,72,153,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '5', icon: '🔢' },
      { label: 'Lucky Color', value: 'Bright Yellow', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Emerald', icon: '💎' },
      { label: 'Lucky Direction', value: 'North', icon: '🧭' },
      { label: 'Lucky Time', value: '10:00 AM – 11:30 AM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'K', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Bronze', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Budhaya Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '7:00 AM', emoji: '📝', status: 'Excellent', title: 'Creative Writing', desc: 'Jot down morning insights' },
      { time: '11:00 AM', emoji: '🤝', status: 'Excellent', title: 'Client Pitch', desc: 'Highest mental sharpness' },
      { time: '2:00 PM', emoji: '🍵', status: 'Good', title: 'Brain Rest', desc: 'Herbal tea break' },
      { time: '8:00 PM', emoji: '📚', status: 'Reflection', title: 'Night Study', desc: 'Read inspiring literature' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 14,
      meaning: 'Mental energy is waxing. Formulate new strategies and outline ambitious goals.'
    }
  },
  Cancer: {
    cosmicScore: 89,
    wisdomQuote: "The ocean of intuition within holds the pearls of eternal peace.",
    wisdomAuthor: "Chandogya Upanishad",
    metrics: { energy: 82, confidence: 85, luck: 90, emotional: 96 },
    details: [
      { category: 'General', score: 89, prediction: "Cancer, your ruler Chandra (the Moon) streams gentle, soothing currents through your emotional core. Intuition is at a peak. Trust your instincts regarding personal decisions and family matters today.", transitWhy: "Moon transit in friendly nakshatra enhances emotional sensitivity and instinct.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 94, prediction: "Emotional intimacy deepens effortlessly. A candid, heart-to-heart dialogue resolves long-standing hesitation.", transitWhy: "Moon-Venus harmonious aspect fosters compassionate connection.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 86, prediction: "Your protective, nurturing leadership style inspires team members. A supportive advice session boosts morale.", transitWhy: "Tenth house lord receive favorable planetary glances.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 88, prediction: "Hydrate well and spend time near water or peaceful nature. Gentle walking restores physical equilibrium.", transitWhy: "Water element emphasis favors hydration and lunar calming.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 87, prediction: "Favorable planetary signs for property, home upgrade investments, or savings accumulation.", transitWhy: "Fourth house wealth yogas indicate stable asset growth.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 95, prediction: "Home life radiates warmth and peace. Cooking or sharing a meal with elders brings immense bliss.", transitWhy: "Moon in Fourth house grants domestic contentment.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 92, prediction: "Deep devotional meditation opens spiritual channels. Light a ghee lamp at dusk for divine grace.", transitWhy: "Ninth house lord Jupiter showering auspicious glances.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Moon', symbol: '☽', metricLabel: 'Intuition', influenceValue: 30, color: 'from-slate-300 to-slate-100', glow: 'rgba(255,255,255,0.2)' },
      { planetName: 'Jupiter', symbol: '♃', metricLabel: 'Wisdom', influenceValue: 22, color: 'from-amber-400 to-yellow-500', glow: 'rgba(251,191,36,0.15)' },
      { planetName: 'Mars', symbol: '♂', metricLabel: 'Drive', influenceValue: 15, color: 'from-red-500 to-orange-400', glow: 'rgba(239,68,68,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '2', icon: '🔢' },
      { label: 'Lucky Color', value: 'Pearl White', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Natural Pearl', icon: '💎' },
      { label: 'Lucky Direction', value: 'North-West', icon: '🧭' },
      { label: 'Lucky Time', value: '7:30 AM – 9:00 AM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'H', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Silver', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Chandraya Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '6:30 AM', emoji: '🌊', status: 'Reflection', title: 'Water Meditation', desc: 'Morning water prayer' },
      { time: '10:00 AM', emoji: '🏡', status: 'Excellent', title: 'Family Sync', desc: 'Warm domestic decisions' },
      { time: '2:30 PM', emoji: '💼', status: 'Good', title: 'Team Care', desc: 'Support colleagues' },
      { time: '7:00 PM', emoji: '🪔', status: 'Excellent', title: 'Dusk Puja', desc: 'Light ghee lamp' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 15,
      meaning: 'Lunar power is growing. Nurture your soul with peaceful practices.'
    }
  },
  Leo: {
    cosmicScore: 93,
    wisdomQuote: "Radiate your inner light without fear; the universe honors noble courage.",
    wisdomAuthor: "Bhagavad Gita",
    metrics: { energy: 96, confidence: 98, luck: 91, emotional: 80 },
    details: [
      { category: 'General', score: 93, prediction: "Leo, your royal ruler Surya (the Sun) shines brightly in your sign, filling you with magnetic charisma, authority, and creative leadership. Whatever project you champion today gains instant momentum.", transitWhy: "Sun in 1st house granting Digbala (directional strength).", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 88, prediction: "Generous affection wins hearts. Surprise your partner with a thoughtful gift or grand romantic gesture.", transitWhy: "Venus-Sun mutual glance enhances warmth and romantic grandeur.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 97, prediction: "Leadership opportunities emerge naturally. Take charge of key meetings; your vision is respected by peers.", transitWhy: "Sun in 1st house boosts executive presence.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 90, prediction: "High vitality and stamina. Engage in cardiovascular workouts or outdoor sports under the sun.", transitWhy: "Solar rays nourish physical vitality and immune strength.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 86, prediction: "Financial confidence is high. Excellent time for strategic career investments and branding.", transitWhy: "Eleventh house lord transits support wealth expansion.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 84, prediction: "Lead family discussions with magnanimous grace. Avoid letting ego override family compromise.", transitWhy: "Fifth house Jupiter aspect promotes harmonious guidance.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 91, prediction: "Offer water to the rising Sun (Surya Arghya) while chanting Gayatri Mantra for supreme clarity.", transitWhy: "Solar alignment facilitates direct connection with Atman (Soul).", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Sun', symbol: '☉', metricLabel: 'Radiance', influenceValue: 35, color: 'from-amber-500 to-yellow-400', glow: 'rgba(245,158,11,0.25)' },
      { planetName: 'Mars', symbol: '♂', metricLabel: 'Courage', influenceValue: 20, color: 'from-red-500 to-orange-400', glow: 'rgba(239,68,68,0.12)' },
      { planetName: 'Jupiter', symbol: '♃', metricLabel: 'Expansion', influenceValue: 18, color: 'from-amber-400 to-yellow-500', glow: 'rgba(251,191,36,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '1', icon: '🔢' },
      { label: 'Lucky Color', value: 'Royal Gold', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Ruby', icon: '💎' },
      { label: 'Lucky Direction', value: 'East', icon: '🧭' },
      { label: 'Lucky Time', value: '8:00 AM – 9:30 AM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'M', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Gold', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Suryaya Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '6:00 AM', emoji: '🌅', status: 'Excellent', title: 'Surya Arghya', desc: 'Solar offering at sunrise' },
      { time: '10:00 AM', emoji: '👑', status: 'Excellent', title: 'Leadership Brief', desc: 'Lead executive meeting' },
      { time: '3:00 PM', emoji: '💼', status: 'Good', title: 'Project Expansion', desc: 'Approve key initiatives' },
      { time: '8:00 PM', emoji: '🎉', status: 'Good', title: 'Celebration', desc: 'Unwind with loved ones' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 16,
      meaning: 'Solar energy fuels your aspirations. Step into the spotlight with confidence.'
    }
  },
  Virgo: {
    cosmicScore: 87,
    wisdomQuote: "Order in detail brings freedom to the spirit.",
    wisdomAuthor: "Patanjali Yoga Sutras",
    metrics: { energy: 84, confidence: 86, luck: 82, emotional: 85 },
    details: [
      { category: 'General', score: 87, prediction: "Virgo, your keen analytical mind and eye for detail are unmatched today. Complex tasks, financial spreadsheets, and administrative backlogs yield easily to your structured approach.", transitWhy: "Mercury in Virgo grants Exaltation (Ucca) precision.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 83, prediction: "Demonstrate affection through thoughtful acts of service. Preparing a healthy meal or organizing a task speaks volumes.", transitWhy: "Venus in Earth sign reinforces practical love expressions.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 92, prediction: "Meticulous audit or quality control work saves a project from errors. Managers applaud your thoroughness.", transitWhy: "Mercury exalted in 1st house ensures flawless execution.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 91, prediction: "Prime day to start a clean diet, detox routine, or holistic wellness regimen. Your body responds quickly.", transitWhy: "Sixth house planetary favor promotes digestive healing.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 88, prediction: "Budgeting and expense tracking yield extra savings. Great day for tax organization and accounting.", transitWhy: "Mercury-Saturn aspect enforces fiscal discipline.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 82, prediction: "Help a family member solve a practical dilemma. Offer constructive advice without over-criticizing.", transitWhy: "Fourth house transits call for gentle guidance.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 86, prediction: "Karma Yoga (selfless service) brings deep mental peace and spiritual alignment.", transitWhy: "Service-oriented planetary transits illuminate higher purpose.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Mercury', symbol: '☿', metricLabel: 'Precision', influenceValue: 32, color: 'from-emerald-500 to-teal-400', glow: 'rgba(52,211,153,0.2)' },
      { planetName: 'Saturn', symbol: '♄', metricLabel: 'Discipline', influenceValue: 20, color: 'from-blue-600 to-slate-400', glow: 'rgba(59,130,246,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '5', icon: '🔢' },
      { label: 'Lucky Color', value: 'Olive Green', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Green Tourmaline', icon: '💎' },
      { label: 'Lucky Direction', value: 'North', icon: '🧭' },
      { label: 'Lucky Time', value: '11:00 AM – 12:30 PM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'P', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Bronze', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Budhaya Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '7:00 AM', emoji: '🍏', status: 'Excellent', title: 'Green Smoothie', desc: 'Nutritional detox start' },
      { time: '10:00 AM', emoji: '📊', status: 'Excellent', title: 'Audit & Analysis', desc: 'Resolve complex data' },
      { time: '3:00 PM', emoji: '🧹', status: 'Good', title: 'Workspace Declutter', desc: 'Clear physical environment' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 16,
      meaning: 'Organize systems and refine daily workflows.'
    }
  },
  Libra: {
    cosmicScore: 90,
    wisdomQuote: "Harmony in external relationships reflects inner spiritual poise.",
    wisdomAuthor: "Upanishadic Lore",
    metrics: { energy: 86, confidence: 88, luck: 92, emotional: 91 },
    details: [
      { category: 'General', score: 90, prediction: "Libra, your charming ruler Venus brings harmony, beauty, and graceful diplomacy into your day. Partnership negotiations and creative collaborations proceed effortlessly under favorable planetary aspects.", transitWhy: "Venus in friendly aspect enhances aesthetic and social grace.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 96, prediction: "Romantic magnetism is at an all-time high. Singles meet captivating souls; couples enjoy mutual bliss.", transitWhy: "Seventh house planetary alignments favor romantic happiness.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 89, prediction: "Diplomatic mediation resolves workplace friction. Your balanced judgment makes you the trusted peacemaker.", transitWhy: "Venus-Jupiter aspect favors conflict resolution.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 87, prediction: "Kidneys and fluid balance require attention. Drink herbal teas and practice balancing yoga asanas.", transitWhy: "Air sign transits encourage kidney hydration.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 88, prediction: "Prosperous outcomes through joint ventures, luxury art sales, or creative endeavors.", transitWhy: "Venus-Mercury trine supports financial elegance.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 91, prediction: "Re-decorate your living room or garden. Creating an aesthetic home space brings family joy.", transitWhy: "Fourth house Venus influences grant artistic home peace.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 89, prediction: "Meditation focused on unconditional love and heart chakra expansion brings profound serenity.", transitWhy: "Anahata (Heart Chakra) planetary activation.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Venus', symbol: '♀', metricLabel: 'Beauty', influenceValue: 33, color: 'from-pink-500 to-rose-400', glow: 'rgba(236,72,153,0.2)' },
      { planetName: 'Jupiter', symbol: '♃', metricLabel: 'Grace', influenceValue: 20, color: 'from-amber-400 to-yellow-500', glow: 'rgba(251,191,36,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '6', icon: '🔢' },
      { label: 'Lucky Color', value: 'Pastel Pink', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Opal', icon: '💎' },
      { label: 'Lucky Direction', value: 'West', icon: '🧭' },
      { label: 'Lucky Time', value: '4:00 PM – 5:30 PM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'R', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Silver', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Shukraya Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '8:00 AM', emoji: '🌸', status: 'Excellent', title: 'Heart Meditation', desc: 'Focus on gratitude' },
      { time: '1:00 PM', emoji: '🤝', status: 'Excellent', title: 'Partnership Lunch', desc: 'Smooth negotiations' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 17,
      meaning: 'Cultivate balance and surround yourself with beauty.'
    }
  },
  Scorpio: {
    cosmicScore: 89,
    wisdomQuote: "Out of deep waters emerges the indestructible diamond of truth.",
    wisdomAuthor: "Shiva Purana",
    metrics: { energy: 90, confidence: 91, luck: 85, emotional: 88 },
    details: [
      { category: 'General', score: 89, prediction: "Scorpio, Mars and Ketu activate your intuitive and investigative powers. You perceive hidden motivations easily. Use your deep focus to solve complex challenges rather than dwelling on past grievances.", transitWhy: "Mars in 8th house aspecting 2nd house enhances deep research abilities.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 86, prediction: "Intense, soulful connection with your partner. Deep vulnerability fosters sacred trust.", transitWhy: "Eighth house transit deepens emotional intimacy.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 92, prediction: "Uncover hidden information or strategic solutions that others missed. Research and analysis thrive.", transitWhy: "Scorpio intensity brings breakthrough analytical discoveries.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 86, prediction: "Detoxify your body through sauna, sweating, or fasting. Release suppressed emotional tension.", transitWhy: "Mars aspect favors metabolic purification.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 88, prediction: "Potential gains through royalties, insurance settlements, or inherited assets. Audit tax filings.", transitWhy: "Eighth house financial yogas support unearned wealth.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 84, prediction: "Maintain confidentiality regarding private family matters. Protect domestic peace.", transitWhy: "Ketu influence encourages introverted family boundaries.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 94, prediction: "Kundalini or Tantric meditation yields profound mystical breakthroughs and emotional rebirth.", transitWhy: "Scorpio water element is prime for esoteric spiritual awakening.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Mars', symbol: '♂', metricLabel: 'Willpower', influenceValue: 30, color: 'from-red-600 to-amber-600', glow: 'rgba(220,38,38,0.2)' },
      { planetName: 'Ketu', symbol: '☋', metricLabel: 'Moksha', influenceValue: 22, color: 'from-purple-600 to-indigo-500', glow: 'rgba(147,51,234,0.15)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '9', icon: '🔢' },
      { label: 'Lucky Color', value: 'Deep Maroon', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Red Coral', icon: '💎' },
      { label: 'Lucky Direction', value: 'North', icon: '🧭' },
      { label: 'Lucky Time', value: '1:00 PM – 2:30 PM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'N', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Iron', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Narasimhaya Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '6:00 AM', emoji: '🔥', status: 'Excellent', title: 'Tapas Meditation', desc: 'Mantra chanting' },
      { time: '2:00 PM', emoji: '🔍', status: 'Excellent', title: 'Deep Research', desc: 'Uncover key facts' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 17,
      meaning: 'Transform inner obstacles into spiritual strength.'
    }
  },
  Sagittarius: {
    cosmicScore: 92,
    wisdomQuote: "Aim your arrow at the highest truth; divine grace guides its flight.",
    wisdomAuthor: "Kathopanishad",
    metrics: { energy: 93, confidence: 95, luck: 94, emotional: 85 },
    details: [
      { category: 'General', score: 92, prediction: "Sagittarius, your ruler Guru (Jupiter) fills your horizon with optimism, philosophical expansion, and adventurous energy. Higher learning, travel plans, and spiritual discourses bring boundless joy today.", transitWhy: "Jupiter in 9th house grants divine fortune and optimistic foresight.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 89, prediction: "Shared philosophy and travel dreams ignite romance. Take a spontaneous road trip with your companion.", transitWhy: "Ninth house Venus aspect fosters adventurous companionship.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 93, prediction: "Mentorship, publishing, or international trade projects receive immense blessing. Share your wisdom freely.", transitWhy: "Jupiter in 9th house elevates academic and executive stature.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 88, prediction: "Thighs and hips need stretching. Hike, run, or practice Surya Namaskar under open skies.", transitWhy: "Jupiter rules liver and hips; outdoor movement restores flow.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 90, prediction: "Luck favors long-term educational investments, publishing contracts, or travel spending.", transitWhy: "Ninth house fortune yogas support legal and educational gains.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 91, prediction: "Seek blessings from gurus, teachers, or family elders. Their guidance opens fortunate doors.", transitWhy: "Ninth house transits honor ancestral and parental wisdom.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 96, prediction: "Study sacred texts, attend a temple ceremony, or practice japa mantra for divine communion.", transitWhy: "Dharma sthana activation grants spontaneous spiritual illumination.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Jupiter', symbol: '♃', metricLabel: 'Expansion', influenceValue: 35, color: 'from-amber-400 to-yellow-500', glow: 'rgba(251,191,36,0.25)' },
      { planetName: 'Sun', symbol: '☉', metricLabel: 'Dharma', influenceValue: 20, color: 'from-amber-500 to-yellow-400', glow: 'rgba(245,158,11,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '3', icon: '🔢' },
      { label: 'Lucky Color', value: 'Saffron Yellow', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Yellow Sapphire', icon: '💎' },
      { label: 'Lucky Direction', value: 'North-East', icon: '🧭' },
      { label: 'Lucky Time', value: '3:00 PM – 4:30 PM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'B', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Gold', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Gurave Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '6:00 AM', emoji: '🕉️', status: 'Excellent', title: 'Guru Mantra', desc: 'Chant Om Gurave Namah' },
      { time: '11:00 AM', emoji: '🎓', status: 'Excellent', title: 'Learning Session', desc: 'Read higher philosophy' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 18,
      meaning: 'Expand your vision and trust in cosmic guidance.'
    }
  },
  Capricorn: {
    cosmicScore: 88,
    wisdomQuote: "Steady perseverance builds mountain peaks out of small stones.",
    wisdomAuthor: "Valmiki Ramayana",
    metrics: { energy: 86, confidence: 90, luck: 84, emotional: 80 },
    details: [
      { category: 'General', score: 88, prediction: "Capricorn, your ruler Shani (Saturn) grants unshakable discipline, patience, and strategic endurance. Focus on building solid foundations in your career, finances, and long-term commitments.", transitWhy: "Saturn in 10th house grants Sasa Yoga leadership power.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 82, prediction: "Loyalty and steady presence matter more than dramatic words. Show your commitment through reliable support.", transitWhy: "Saturnian groundedness deepens long-term relationship trust.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 95, prediction: "Your managerial competence and structured execution earn praise from senior executives. A promotion pathway opens.", transitWhy: "Tenth house Saturn activation favors corporate elevation.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 85, prediction: "Bones, knees, and joints need care. Ensure adequate calcium intake and avoid overexertion.", transitWhy: "Saturn rules skeletal structures; gentle joint rotation helps.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 91, prediction: "Excellent day for long-term real estate investments, retirement planning, or fixed deposits.", transitWhy: "Tenth house Saturn aspects 12th & 4th house asset security.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 83, prediction: "Take care of family responsibilities methodically. Your steady leadership keeps domestic matters organized.", transitWhy: "Fourth house Saturn aspects require calm responsibility.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 87, prediction: "Disciplined daily rituals (Nitya Karma) and silent meditation bring lasting inner strength.", transitWhy: "Saturnian discipline turns routine into spiritual austerity.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Saturn', symbol: '♄', metricLabel: 'Structure', influenceValue: 34, color: 'from-blue-600 to-slate-400', glow: 'rgba(59,130,246,0.2)' },
      { planetName: 'Mars', symbol: '♂', metricLabel: 'Execution', influenceValue: 18, color: 'from-red-500 to-orange-400', glow: 'rgba(239,68,68,0.1)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '8', icon: '🔢' },
      { label: 'Lucky Color', value: 'Navy Blue', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Blue Sapphire', icon: '💎' },
      { label: 'Lucky Direction', value: 'West', icon: '🧭' },
      { label: 'Lucky Time', value: '5:00 PM – 6:30 PM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'J', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Lead / Steel', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Sham Shanaye Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '7:00 AM', emoji: '📋', status: 'Excellent', title: 'Day Planning', desc: 'Outline strategic targets' },
      { time: '2:00 PM', emoji: '🏢', status: 'Excellent', title: 'Executive Review', desc: 'Present progress to board' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 18,
      meaning: 'Build long-term structures with disciplined patience.'
    }
  },
  Aquarius: {
    cosmicScore: 91,
    wisdomQuote: "True wisdom sees the oneness of humanity behind all diverse forms.",
    wisdomAuthor: "Svetasvatara Upanishad",
    metrics: { energy: 91, confidence: 92, luck: 89, emotional: 84 },
    details: [
      { category: 'General', score: 91, prediction: "Aquarius, Rahu and Saturn inspire visionary thinking, technological breakthroughs, and innovative community projects today. Your original perspective breaks through outdated convention.", transitWhy: "Eleventh house Rahu-Saturn transits amplify visionary network gains.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 86, prediction: "Intellectual friendship forms the foundation of romance. Engage in stimulating discussions about future dreams.", transitWhy: "Air sign harmony fosters visionary love connections.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 94, prediction: "Tech innovations, digital campaigns, or group collaborations yield extraordinary success. Think outside the box.", transitWhy: "Eleventh house activation guarantees high-impact group gains.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 87, prediction: "Ankles and circulation require attention. Alternate sitting with light leg stretches throughout the day.", transitWhy: "Aquarius rules ankles and circulatory channels.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 92, prediction: "Unexpected financial gains from digital assets, tech projects, or network connections.", transitWhy: "Eleventh house Rahu aspect promises unconventional profit.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 85, prediction: "Introduce progressive ideas to family members with gentle tact. Respect traditional views while sharing yours.", transitWhy: "Third house planetary support bridges generational views.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 90, prediction: "Meditate on universal consciousness and cosmic harmony. Group prayers amplify spiritual energy.", transitWhy: "Eleventh house mass consciousness connection.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Saturn', symbol: '♄', metricLabel: 'Vision', influenceValue: 28, color: 'from-blue-600 to-slate-400', glow: 'rgba(59,130,246,0.18)' },
      { planetName: 'Rahu', symbol: '☊', metricLabel: 'Innovation', influenceValue: 24, color: 'from-indigo-600 to-purple-500', glow: 'rgba(99,102,241,0.15)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '7', icon: '🔢' },
      { label: 'Lucky Color', value: 'Electric Cyan', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Hessonite (Gomed)', icon: '💎' },
      { label: 'Lucky Direction', value: 'South-West', icon: '🧭' },
      { label: 'Lucky Time', value: '1:30 PM – 3:00 PM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'G', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Mixed Alloys', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Rahave Namah', icon: '🕉️' }
    ],
    timeline: [
      { time: '8:00 AM', emoji: '💡', status: 'Excellent', title: 'Brainstorming', desc: 'Formulate innovative ideas' },
      { time: '4:00 PM', emoji: '🌐', status: 'Excellent', title: 'Community Launch', desc: 'Connect with tech networks' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 19,
      meaning: 'Innovate with humanitarian vision.'
    }
  },
  Pisces: {
    cosmicScore: 92,
    wisdomQuote: "Surrender the ego to the divine stream, and peace will flow like a boundless river.",
    wisdomAuthor: "Srimad Bhagavatam",
    metrics: { energy: 83, confidence: 85, luck: 93, emotional: 98 },
    details: [
      { category: 'General', score: 92, prediction: "Pisces, Jupiter and the Moon flood your 12th house of intuition and mysticism with divine light. Creative imagination, artistic projects, and deep spiritual communion blossom effortless today.", transitWhy: "Jupiter in 12th house grants Moksha sthana spiritual grace.", icon: Compass, color: 'text-gold' },
      { category: 'Love', score: 93, prediction: "Soulful, unconditional love fills your heart. Express affection through poetry, music, or quiet togetherness.", transitWhy: "Venus-Jupiter water trine illuminates romantic tenderness.", icon: Heart, color: 'text-rose-500' },
      { category: 'Career', score: 87, prediction: "Intuitive decision-making leads to hidden career breakthroughs. Behind-the-scenes work yields great results.", transitWhy: "Twelfth house Jupiter activation favors solitude and research.", icon: Briefcase, color: 'text-indigo-400' },
      { category: 'Health', score: 89, prediction: "Feet and immune system require gentle care. Soaking feet in warm salt water restores subtle energy.", transitWhy: "Pisces rules feet and lymphatic circulation; warm water heals.", icon: Activity, color: 'text-emerald-400' },
      { category: 'Money', score: 86, prediction: "Generous charitable donations return tenfold in spiritual blessings. Avoid impulsive luxury spending.", transitWhy: "Twelfth house planetary transits favor philanthropic giving.", icon: Coins, color: 'text-yellow-400' },
      { category: 'Family', score: 90, prediction: "Forgive past misunderstandings with unconditional compassion. Healing energy flows through domestic life.", transitWhy: "Fourth house Jupiter aspect heals ancestral wounds.", icon: Users, color: 'text-cyan-400' },
      { category: 'Spirituality', score: 98, prediction: "Exceptional day for deep Dhyana (meditation), dream interpretation, and feeling the divine omnipresence.", transitWhy: "Twelfth house Moksha activation provides direct spiritual communion.", icon: Compass, color: 'text-purple-400' }
    ],
    influences: [
      { planetName: 'Jupiter', symbol: '♃', metricLabel: 'Devotion', influenceValue: 36, color: 'from-amber-400 to-yellow-500', glow: 'rgba(251,191,36,0.25)' },
      { planetName: 'Moon', symbol: '☽', metricLabel: 'Empathy', influenceValue: 25, color: 'from-slate-300 to-slate-100', glow: 'rgba(255,255,255,0.15)' }
    ],
    luckyItems: [
      { label: 'Lucky Number', value: '3', icon: '🔢' },
      { label: 'Lucky Color', value: 'Aquamarine', icon: '🎨' },
      { label: 'Lucky Gem', value: 'Yellow Sapphire', icon: '💎' },
      { label: 'Lucky Direction', value: 'North-East', icon: '🧭' },
      { label: 'Lucky Time', value: '6:00 PM – 7:30 PM', icon: '⏰' },
      { label: 'Lucky Letter', value: 'D', icon: '🔤' },
      { label: 'Lucky Metal', value: 'Gold', icon: '🪙' },
      { label: 'Lucky Mantra', value: 'Om Namo Narayanaya', icon: '🕉️' }
    ],
    timeline: [
      { time: '6:00 AM', emoji: '🧘', status: 'Excellent', title: 'Silent Dhyana', desc: 'Deep morning meditation' },
      { time: '8:00 PM', emoji: '🎶', status: 'Excellent', title: 'Kirtan / Music', desc: 'Listen to devotional music' }
    ],
    moonPhase: {
      name: 'Waxing Crescent',
      illumination: 20,
      meaning: 'Surrender worries and immerse your spirit in divine peace.'
    }
  }
};

export const getZodiacForecast = (sign: string): HoroscopeData => {
  return HOROSCOPE_DATA[sign] || HOROSCOPE_DATA['Aries'];
};
