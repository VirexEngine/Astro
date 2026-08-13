export interface MonthlyHoroscopeData {
  energyScore: number;
  theme: string;
  planet: string;
  challenge: string;
  strength: string;
  weeks: {
    week: string;
    score: number;
    title: string;
    status: 'Excellent' | 'Good' | 'Average' | 'Avoid';
    love: number;
    career: number;
    finance: number;
    health: number;
  }[];
  calendarEvents: {
    date: string;
    day: number;
    title: string;
    desc: string;
    type: 'star' | 'heart' | 'money' | 'mind';
    intensity: number;
  }[];
  radarScores: {
    category: string;
    score: number;
  }[];
  bestDays: number[];
  cautionDays: number[];
  decisions: {
    name: string;
    score: number;
  }[];
  goals: {
    id: string;
    category: 'career' | 'health' | 'relationships' | 'finance';
    title: string;
  }[];
  aiAdvice: {
    overview: string;
    career: string;
    love: string;
    finance: string;
    health: string;
    travel: string;
    education: string;
    spiritual: string;
  };
  moonPhases: {
    phase: string;
    emoji: string;
    date: string;
    meaning: string;
    activities: string[];
    avoid: string[];
  }[];
}

export const MONTHLY_DATA: Record<string, MonthlyHoroscopeData> = {
  Aries: {
    energyScore: 84,
    theme: 'Growth & Opportunity',
    planet: '♃ Jupiter',
    challenge: 'Avoid impulsive spending.',
    strength: 'Career Progress.',
    weeks: [
      { week: 'Week 1', score: 80, title: 'Career Alignment', status: 'Excellent', love: 75, career: 90, finance: 80, health: 70 },
      { week: 'Week 2', score: 65, title: 'Relationship Balance', status: 'Average', love: 60, career: 70, finance: 65, health: 75 },
      { week: 'Week 3', score: 92, title: 'Financial Spikes', status: 'Excellent', love: 80, career: 85, finance: 95, health: 80 },
      { week: 'Week 4', score: 60, title: 'Vitality Rest', status: 'Avoid', love: 70, career: 60, finance: 70, health: 50 }
    ],
    calendarEvents: [
      { date: 'Aug 3', day: 3, title: 'Mercury enters Virgo', desc: 'Communication aligns with details. Review work reports thoroughly.', type: 'mind', intensity: 3 },
      { date: 'Aug 8', day: 8, title: 'Full Moon in Aquarius', desc: 'Deep emotional expansion and clarity in community circles.', type: 'heart', intensity: 5 },
      { date: 'Aug 14', day: 14, title: 'Venus Trine Jupiter', desc: 'Auspicious financial vibrations. Ideal day for negotiations.', type: 'money', intensity: 4 },
      { date: 'Aug 20', day: 20, title: 'Mars enters Libra', desc: 'Diplomatic energy dominates relationships. Speak with balance.', type: 'star', intensity: 4 },
      { date: 'Aug 27', day: 27, title: 'New Moon in Leo', desc: 'A time of planting seeds and starting fresh creative projects.', type: 'star', intensity: 5 }
    ],
    radarScores: [
      { category: 'Career', score: 92 },
      { category: 'Love', score: 81 },
      { category: 'Finance', score: 76 },
      { category: 'Health', score: 84 },
      { category: 'Family', score: 87 },
      { category: 'Travel', score: 72 },
      { category: 'Education', score: 91 },
      { category: 'Spirituality', score: 95 }
    ],
    bestDays: [5, 11, 18, 27],
    cautionDays: [9, 15, 22, 30],
    decisions: [
      { name: 'Interview', score: 95 },
      { name: 'Investment', score: 60 },
      { name: 'Marriage', score: 80 },
      { name: 'Travel', score: 90 },
      { name: 'Shopping', score: 40 },
      { name: 'Contracts', score: 85 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Complete structural portfolio review' },
      { id: '2', category: 'health', title: 'Maintain 15-minute meditation post-sunset' },
      { id: '3', category: 'relationships', title: 'Plan weekly dinner with close friends' }
    ],
    aiAdvice: {
      overview: 'August favors expansion, particularly in learning and professional status, although Mercury suggests caution with contracts during retrograde cycles.',
      career: 'Networking yields powerful partnerships. Venus triggers collaborative opportunities after Week 2.',
      love: 'Speak with diplomacy. Under the Libra Moon, active listening cures minor domestic frictions.',
      finance: 'Avoid impulse spending on Week 2. Review statement logs thoroughly on Week 3.',
      health: 'Nourish physical limits during Week 4. Schedule early sleep periods to reduce exhaustion.',
      travel: 'Travel holds auspicious benefits in the first half of the month. East coordinates are favored.',
      education: 'Excellent period for higher philosophical learning or certification review.',
      spiritual: 'Spend time near water under lunar transits to align deep-seated intuitive insights.'
    },
    moonPhases: [
      { phase: 'New Moon', emoji: '🌑', date: 'Aug 27', meaning: 'Dark sky representing empty canvas, reflection, and planting seeds.', activities: ['Set intentions', 'Meditate', 'Journal thoughts'], avoid: ['Starting final battles', 'Impulsive purchases'] },
      { phase: 'Waxing Crescent', emoji: '🌓', date: 'Aug 4', meaning: 'Growing light representing momentum, gather elements.', activities: ['Review work plans', 'Organize desks'], avoid: ['Losing patience'] },
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Complete radiance representing manifestation, harvest, and emotional climax.', activities: ['Perform gratitude acts', 'Celebrate progress'], avoid: ['Entering heated arguments'] },
      { phase: 'Waning Gibbous', emoji: '🌗', date: 'Aug 18', meaning: 'Fading light representing release, sharing wisdom, and auditing excess.', activities: ['Clean domestic clutter', 'Settle minor debts'], avoid: ['Signing permanent contracts'] }
    ]
  },
  Taurus: {
    energyScore: 81,
    theme: 'Stability & Organization',
    planet: '♀ Venus',
    challenge: 'Avoid rigid domestic demands.',
    strength: 'Financial security audits.',
    weeks: [
      { week: 'Week 1', score: 75, title: 'Stability Audit', status: 'Good', love: 80, career: 75, finance: 85, health: 80 },
      { week: 'Week 2', score: 88, title: 'Financial Opportunities', status: 'Excellent', love: 85, career: 80, finance: 90, health: 85 },
      { week: 'Week 3', score: 60, title: 'Communication Friction', status: 'Average', love: 55, career: 65, finance: 60, health: 70 },
      { week: 'Week 4', score: 82, title: 'Recreation & Grounding', status: 'Good', love: 80, career: 78, finance: 82, health: 88 }
    ],
    calendarEvents: [
      { date: 'Aug 3', day: 3, title: 'Mercury enters Virgo', desc: 'Grounds your reasoning. Highly favorable for studying financial details.', type: 'mind', intensity: 4 },
      { date: 'Aug 8', day: 8, title: 'Full Moon in Aquarius', desc: 'Clarity regarding long-term domestic commitments.', type: 'heart', intensity: 4 },
      { date: 'Aug 14', day: 14, title: 'Venus Trine Jupiter', desc: 'Abundance flows to earth signs. Relish art and aesthetic harmony.', type: 'money', intensity: 5 },
      { date: 'Aug 20', day: 20, title: 'Mars enters Libra', desc: 'Requires balanced physical movement and muscular recovery.', type: 'star', intensity: 3 },
      { date: 'Aug 27', day: 27, title: 'New Moon in Leo', desc: 'Plant seeds regarding household decor or relocation plans.', type: 'star', intensity: 4 }
    ],
    radarScores: [
      { category: 'Career', score: 80 },
      { category: 'Love', score: 88 },
      { category: 'Finance', score: 92 },
      { category: 'Health', score: 86 },
      { category: 'Family', score: 82 },
      { category: 'Travel', score: 65 },
      { category: 'Education', score: 84 },
      { category: 'Spirituality', score: 90 }
    ],
    bestDays: [4, 12, 19, 26],
    cautionDays: [8, 14, 21, 29],
    decisions: [
      { name: 'Interview', score: 80 },
      { name: 'Investment', score: 95 },
      { name: 'Marriage', score: 90 },
      { name: 'Travel', score: 60 },
      { name: 'Shopping', score: 75 },
      { name: 'Contracts', score: 80 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Audit monthly expense ledger' },
      { id: '2', category: 'health', title: 'Incorporate 15 minutes of grounding stretches' },
      { id: '3', category: 'relationships', title: 'Schedule cooking dinner together' }
    ],
    aiAdvice: {
      overview: 'August brings material stability, ruled by a friendly Venus alignment. Focus on consolidation rather than wild expansion.',
      career: 'Steady progress. Organize office logs during Week 3 to prevent minor detail losses.',
      love: 'Harmonious domestic waves. Relish cozy, quiet evenings together.',
      finance: 'Excellent opportunities for long-term investments around Week 2.',
      health: 'Physical stability is strong. Prevent neck strains through proper postures.',
      travel: 'Local weekend gateways hold higher relaxation indexes than international flights.',
      education: 'Favorable period for auditing tax records or investment strategies.',
      spiritual: 'Connect with Earth energies. Meditation under old trees anchors your aura.'
    },
    moonPhases: [
      { phase: 'New Moon', emoji: '🌑', date: 'Aug 27', meaning: 'Time to seed household boundaries and domestic intentions.', activities: ['Tidy the house', 'Declutter desks'], avoid: ['Heated verbal disputes'] },
      { phase: 'Waxing Crescent', emoji: '🌓', date: 'Aug 4', meaning: 'Gathering resources for long-term security.', activities: ['Outline business goals', 'Audit investments'], avoid: ['Impulse purchases'] },
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Harvesting the beauty of stable relationships.', activities: ['Cook gourmet meal', 'Enjoy aesthetic arts'], avoid: ['Starting rigorous workouts'] },
      { phase: 'Waning Gibbous', emoji: '🌗', date: 'Aug 18', meaning: 'Releasing stubborn, rigid habits that block growth.', activities: ['Practice flexibility exercises'], avoid: ['Signing loan records'] }
    ]
  },
  Gemini: {
    energyScore: 89,
    theme: 'Mental Clarity & Expressive Power',
    planet: '☿ Mercury',
    challenge: 'Overthinking minor options.',
    strength: 'Negotiation & Communication.',
    weeks: [
      { week: 'Week 1', score: 90, title: 'Intellectual Surge', status: 'Excellent', love: 82, career: 95, finance: 85, health: 80 },
      { week: 'Week 2', score: 85, title: 'Social Expansion', status: 'Good', love: 88, career: 85, finance: 80, health: 78 },
      { week: 'Week 3', score: 94, title: 'Contractual Breakthrough', status: 'Excellent', love: 85, career: 98, finance: 90, health: 85 },
      { week: 'Week 4', score: 72, title: 'Mental Reset', status: 'Average', love: 75, career: 70, finance: 75, health: 82 }
    ],
    calendarEvents: [
      { date: 'Aug 3', day: 3, title: 'Mercury enters Virgo', desc: 'Sharpened focus. Perfect timing for public speaking or writing.', type: 'mind', intensity: 5 },
      { date: 'Aug 10', day: 10, title: 'Trine with Uranus', desc: 'Innovative ideas ignite lucrative freelance proposals.', type: 'star', intensity: 4 },
      { date: 'Aug 17', day: 17, title: 'Mercury Sextile Venus', desc: 'Charming communications resolve old misunderstandings.', type: 'heart', intensity: 4 },
      { date: 'Aug 24', day: 24, title: 'Sun enters Virgo', desc: 'Focus shifts toward domestic organization and family care.', type: 'star', intensity: 3 }
    ],
    radarScores: [
      { category: 'Career', score: 95 },
      { category: 'Love', score: 84 },
      { category: 'Finance', score: 88 },
      { category: 'Health', score: 80 },
      { category: 'Family', score: 83 },
      { category: 'Travel', score: 92 },
      { category: 'Education', score: 96 },
      { category: 'Spirituality', score: 78 }
    ],
    bestDays: [3, 10, 17, 25],
    cautionDays: [7, 13, 21, 28],
    decisions: [
      { name: 'Interview', score: 98 },
      { name: 'Investment', score: 82 },
      { name: 'Marriage', score: 75 },
      { name: 'Travel', score: 95 },
      { name: 'Shopping', score: 70 },
      { name: 'Contracts', score: 92 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Publish key project proposal' },
      { id: '2', category: 'health', title: 'Practice breathwork for mental tranquility' },
      { id: '3', category: 'relationships', title: 'Plan engaging weekend trip' }
    ],
    aiAdvice: {
      overview: 'August brings high cognitive agility for Gemini. Use this window to negotiate contracts, write, and present visionary ideas.',
      career: 'Your communication is magnetic. Pitch high-value clients during Week 1 and Week 3.',
      love: 'Playful conversations rekindle warmth. Keep expectations flexible during Week 4.',
      finance: 'Diversify revenue channels. Short workshops or online consultations bring cash boosts.',
      health: 'Mind rest is essential. Limit screen time before sleep to protect sleep cycles.',
      travel: 'Short business trips yield high returns this month.',
      education: 'Ideal timing for mastering new software tools or languages.',
      spiritual: 'Journaling thoughts brings profound self-awareness.'
    },
    moonPhases: [
      { phase: 'New Moon', emoji: '🌑', date: 'Aug 27', meaning: 'Planting seeds for new learning pathways.', activities: ['Start a journal', 'Outline study plans'], avoid: ['Multitasking to burnout'] },
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Climax of long-standing negotiations.', activities: ['Sign approved agreements', 'Host social meetups'], avoid: ['Scattering energies'] }
    ]
  },
  Cancer: {
    energyScore: 88,
    theme: 'Emotional Awakening & Domestic Bliss',
    planet: '☽ Moon',
    challenge: 'Nurturing others at the cost of personal energy.',
    strength: 'Intuition & Financial Safeguards.',
    weeks: [
      { week: 'Week 1', score: 85, title: 'Inner Harmony', status: 'Excellent', love: 92, career: 80, finance: 85, health: 88 },
      { week: 'Week 2', score: 90, title: 'Family Expansion', status: 'Excellent', love: 95, career: 82, finance: 88, health: 85 },
      { week: 'Week 3', score: 78, title: 'Career Re-calibration', status: 'Good', love: 84, career: 75, finance: 80, health: 78 },
      { week: 'Week 4', score: 91, title: 'Intuitive Mastery', status: 'Excellent', love: 90, career: 88, finance: 92, health: 90 }
    ],
    calendarEvents: [
      { date: 'Aug 4', day: 4, title: 'Moon Trine Neptune', desc: 'Powerful psychic intuition. Trust your gut feelings regarding investments.', type: 'mind', intensity: 5 },
      { date: 'Aug 11', day: 11, title: 'Venus in Cancer Transit', desc: 'Radiant charm in romantic and familial relationships.', type: 'heart', intensity: 5 },
      { date: 'Aug 19', day: 19, title: 'Jupiter Aspecting 4th House', desc: 'Property, vehicle, or home upgrades receive blessed energy.', type: 'money', intensity: 4 },
      { date: 'Aug 28', day: 28, title: 'Moon Conjunct Jupiter', desc: 'Peak emotional radiance and joy shared with loved ones.', type: 'star', intensity: 5 }
    ],
    radarScores: [
      { category: 'Career', score: 82 },
      { category: 'Love', score: 96 },
      { category: 'Finance', score: 89 },
      { category: 'Health', score: 88 },
      { category: 'Family', score: 98 },
      { category: 'Travel', score: 78 },
      { category: 'Education', score: 85 },
      { category: 'Spirituality', score: 97 }
    ],
    bestDays: [4, 11, 19, 28],
    cautionDays: [6, 13, 22, 29],
    decisions: [
      { name: 'Interview', score: 85 },
      { name: 'Investment', score: 90 },
      { name: 'Marriage', score: 98 },
      { name: 'Travel', score: 75 },
      { name: 'Shopping', score: 82 },
      { name: 'Contracts', score: 88 }
    ],
    goals: [
      { id: '1', category: 'relationships', title: 'Organize memorable family gathering' },
      { id: '2', category: 'health', title: 'Hydrate with herbal infusions and sea salt baths' },
      { id: '3', category: 'career', title: 'Consolidate home-office workspace' }
    ],
    aiAdvice: {
      overview: 'August illuminates your inner sanctuary. Moon transit brings profound emotional security and prosperity through family bonds.',
      career: 'Intuition guides high-stakes decisions. Trust your instincts over abstract speculation.',
      love: 'Deep emotional intimacy. Expressions of affection trigger lasting relationship milestones.',
      finance: 'Investments linked to real estate or family assets yield high returns.',
      health: 'Water therapies and restorative rest replenish vital energies.',
      travel: 'Quiet coastal destinations offer profound rejuvenation.',
      education: 'Studies in psychology, history, or Vedic arts flourish.',
      spiritual: 'Meditation under full moon rays activates your third-eye chakra.'
    },
    moonPhases: [
      { phase: 'New Moon', emoji: '🌑', date: 'Aug 27', meaning: 'Planting seeds of domestic abundance.', activities: ['Bless the home', 'Cook soul food'], avoid: ['Carrying old grudges'] },
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Peak emotional fulfillment and celebration.', activities: ['Host family dinner', 'Express heartfelt gratitude'], avoid: ['Absorbing negative moods'] }
    ]
  },
  Leo: {
    energyScore: 92,
    theme: 'Radiance, Leadership & Creative Triumph',
    planet: '☉ Sun',
    challenge: 'Managing pride in collaborative projects.',
    strength: 'Charisma & Leadership.',
    weeks: [
      { week: 'Week 1', score: 94, title: 'Solar Ignition', status: 'Excellent', love: 90, career: 96, finance: 90, health: 92 },
      { week: 'Week 2', score: 88, title: 'Creative Breakthrough', status: 'Excellent', love: 88, career: 92, finance: 85, health: 88 },
      { week: 'Week 3', score: 95, title: 'Financial Harvest', status: 'Excellent', love: 92, career: 95, finance: 98, health: 90 },
      { week: 'Week 4', score: 82, title: 'Leadership Consolidation', status: 'Good', love: 85, career: 86, finance: 82, health: 85 }
    ],
    calendarEvents: [
      { date: 'Aug 1', day: 1, title: 'Sun in Leo peak', desc: 'Solar vitality surges. High visibility for personal branding.', type: 'star', intensity: 5 },
      { date: 'Aug 9', day: 9, title: 'Sun Trine Mars', desc: 'Unstoppable executive momentum. Take bold initiatives.', type: 'star', intensity: 5 },
      { date: 'Aug 16', day: 16, title: 'Venus enters Leo', desc: 'Magnetism at absolute peak. Romance and artistic acclaim flourish.', type: 'heart', intensity: 5 },
      { date: 'Aug 27', day: 27, title: 'New Moon in Leo', desc: 'Your personal Astro New Year! Set powerful annual intentions.', type: 'money', intensity: 5 }
    ],
    radarScores: [
      { category: 'Career', score: 98 },
      { category: 'Love', score: 94 },
      { category: 'Finance', score: 91 },
      { category: 'Health', score: 92 },
      { category: 'Family', score: 88 },
      { category: 'Travel', score: 90 },
      { category: 'Education', score: 86 },
      { category: 'Spirituality', score: 89 }
    ],
    bestDays: [1, 9, 16, 27],
    cautionDays: [5, 12, 20, 31],
    decisions: [
      { name: 'Interview', score: 99 },
      { name: 'Investment', score: 88 },
      { name: 'Marriage', score: 92 },
      { name: 'Travel', score: 92 },
      { name: 'Shopping', score: 85 },
      { name: 'Contracts', score: 95 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Launch signature project campaign' },
      { id: '2', category: 'health', title: 'Cardio workouts for heart vitality' },
      { id: '3', category: 'relationships', title: 'Host celebratory dinner party' }
    ],
    aiAdvice: {
      overview: 'August is your birth season of glory! The Sun in your sign amplifies courage, magnetism, and career victories.',
      career: 'Step into the spotlight. Key stakeholders respond enthusiastically to your leadership.',
      love: 'Passionate romance. Venus in your sign makes you irresistible.',
      finance: 'High earning capacity. Invest in your personal brand and skill mastery.',
      health: 'Heart and spine health are optimal. Maintain active daily workouts.',
      travel: 'Luxury travel or high-end retreats align with your cosmic status.',
      education: 'Public speaking and leadership workshops bring immediate recognition.',
      spiritual: 'Sun worship (Surya Namaskar) at sunrise grounds your royal energy.'
    },
    moonPhases: [
      { phase: 'New Moon in Leo', emoji: '🌑', date: 'Aug 27', meaning: 'Your annual rebirth window. Dream bigger than ever before.', activities: ['Write personal goals', 'Launch brand'], avoid: ['Doubting your worth'] }
    ]
  },
  Virgo: {
    energyScore: 86,
    theme: 'Mastery, Precision & Wellness Renewal',
    planet: '☿ Mercury',
    challenge: 'Perfectionism causing delay.',
    strength: 'Systemic Efficiency.',
    weeks: [
      { week: 'Week 1', score: 82, title: 'System Optimization', status: 'Good', love: 78, career: 88, finance: 85, health: 86 },
      { week: 'Week 2', score: 85, title: 'Detail Mastery', status: 'Good', love: 80, career: 90, finance: 88, health: 88 },
      { week: 'Week 3', score: 92, title: 'Professional Acclaim', status: 'Excellent', love: 85, career: 96, finance: 90, health: 90 },
      { week: 'Week 4', score: 88, title: 'Solar Entrance Focus', status: 'Excellent', love: 86, career: 90, finance: 88, health: 92 }
    ],
    calendarEvents: [
      { date: 'Aug 3', day: 3, title: 'Mercury enters Virgo', desc: 'Ruler planet returns home! Mental focus operates at peak precision.', type: 'mind', intensity: 5 },
      { date: 'Aug 12', day: 12, title: 'Mercury Trine Jupiter', desc: 'Strategic planning pays off in massive financial efficiency.', type: 'money', intensity: 4 },
      { date: 'Aug 24', day: 24, title: 'Sun enters Virgo', desc: 'Virgo Season commences! Energy levels and executive power double.', type: 'star', intensity: 5 }
    ],
    radarScores: [
      { category: 'Career', score: 94 },
      { category: 'Love', score: 82 },
      { category: 'Finance', score: 90 },
      { category: 'Health', score: 94 },
      { category: 'Family', score: 85 },
      { category: 'Travel', score: 76 },
      { category: 'Education', score: 98 },
      { category: 'Spirituality', score: 84 }
    ],
    bestDays: [3, 12, 24, 30],
    cautionDays: [7, 15, 22, 28],
    decisions: [
      { name: 'Interview', score: 94 },
      { name: 'Investment', score: 92 },
      { name: 'Marriage', score: 80 },
      { name: 'Travel', score: 70 },
      { name: 'Shopping', score: 85 },
      { name: 'Contracts', score: 96 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Refine workflow automation' },
      { id: '2', category: 'health', title: 'Clean organic diet detox plan' },
      { id: '3', category: 'relationships', title: 'Communicate boundaries constructively' }
    ],
    aiAdvice: {
      overview: 'With Mercury in your sign, your analytical genius is unrivaled. Perfect workflows and prepare for Virgo Season.',
      career: 'Your precision solves complex bottlenecks. Expect recognition from senior leadership.',
      love: 'Practical gestures of care build deep trust with your partner.',
      finance: 'Budget audits reveal hidden savings and investment avenues.',
      health: 'Digestion and gut health improve with mindful nutrition.',
      travel: 'Well-organized, structured itineraries provide maximum joy.',
      education: 'Peak timing for research, auditing, and complex certifications.',
      spiritual: 'Mindful organization acts as a form of active meditation.'
    },
    moonPhases: [
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Harvesting fruits of methodical labor.', activities: ['Finalize audits', 'Organize files'], avoid: ['Excessive self-criticism'] }
    ]
  },
  Libra: {
    energyScore: 87,
    theme: 'Harmony, Partnerships & Aesthetic Flourish',
    planet: '♀ Venus',
    challenge: 'Indecision when weighing competing choices.',
    strength: 'Diplomacy & Social Magnetism.',
    weeks: [
      { week: 'Week 1', score: 84, title: 'Aesthetic Inspiration', status: 'Good', love: 90, career: 82, finance: 84, health: 85 },
      { week: 'Week 2', score: 88, title: 'Partnership Growth', status: 'Excellent', love: 94, career: 86, finance: 88, health: 86 },
      { week: 'Week 3', score: 90, title: 'Social Success', status: 'Excellent', love: 92, career: 90, finance: 90, health: 88 },
      { week: 'Week 4', score: 85, title: 'Balance Restoration', status: 'Good', love: 88, career: 84, finance: 86, health: 88 }
    ],
    calendarEvents: [
      { date: 'Aug 5', day: 5, title: 'Venus Sextile Mars', desc: 'Sizzling chemistry and relationship milestones.', type: 'heart', intensity: 5 },
      { date: 'Aug 14', day: 14, title: 'Venus Trine Jupiter', desc: 'Financial prosperity through creative ventures.', type: 'money', intensity: 5 },
      { date: 'Aug 20', day: 20, title: 'Mars enters Libra', desc: 'Energy boost! Take decisive action in personal projects.', type: 'star', intensity: 4 }
    ],
    radarScores: [
      { category: 'Career', score: 86 },
      { category: 'Love', score: 97 },
      { category: 'Finance', score: 88 },
      { category: 'Health', score: 87 },
      { category: 'Family', score: 90 },
      { category: 'Travel', score: 89 },
      { category: 'Education', score: 85 },
      { category: 'Spirituality', score: 88 }
    ],
    bestDays: [5, 14, 20, 29],
    cautionDays: [8, 16, 23, 30],
    decisions: [
      { name: 'Interview', score: 88 },
      { name: 'Investment', score: 86 },
      { name: 'Marriage', score: 98 },
      { name: 'Travel', score: 90 },
      { name: 'Shopping', score: 92 },
      { name: 'Contracts', score: 90 }
    ],
    goals: [
      { id: '1', category: 'relationships', title: 'Elevate connection with key partner' },
      { id: '2', category: 'career', title: 'Finalize co-founding or agency contracts' },
      { id: '3', category: 'health', title: 'Maintain yoga & flexibility balance' }
    ],
    aiAdvice: {
      overview: 'Venus blesses your 1st and 11th houses, making August a month of grace, romantic bliss, and lucrative collaborations.',
      career: 'Joint ventures thrive. Negotiate win-win terms with confidence.',
      love: 'Deep romantic harmony. Singles meet magnetic matches.',
      finance: 'Artistic assets and aesthetic investments gain value.',
      health: 'Kidney and lower back health benefits from proper hydration.',
      travel: 'Cultural and artistic capitals offer memorable trips.',
      education: 'Studies in design, law, or diplomacy are favored.',
      spiritual: 'Create an aesthetically uplifting altar for daily meditation.'
    },
    moonPhases: [
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Climax of creative partnerships.', activities: ['Celebrate love', 'Design art'], avoid: ['People-pleasing'] }
    ]
  },
  Scorpio: {
    energyScore: 91,
    theme: 'Transmutation, Power & Financial Breakthrough',
    planet: '♂ Mars',
    challenge: 'Releasing secretive mistrust.',
    strength: 'Unshakable Willpower & Insight.',
    weeks: [
      { week: 'Week 1', score: 88, title: 'Strategic Planning', status: 'Good', love: 85, career: 92, finance: 90, health: 88 },
      { week: 'Week 2', score: 92, title: 'Financial Mastery', status: 'Excellent', love: 88, career: 95, finance: 96, health: 90 },
      { week: 'Week 3', score: 95, title: 'Intuitive Breakthrough', status: 'Excellent', love: 90, career: 96, finance: 98, health: 92 },
      { week: 'Week 4', score: 86, title: 'Recuperation', status: 'Good', love: 86, career: 88, finance: 88, health: 86 }
    ],
    calendarEvents: [
      { date: 'Aug 6', day: 6, title: 'Mars Trine Pluto', desc: 'Raw transformational energy. Overcome any hurdle effortless.', type: 'star', intensity: 5 },
      { date: 'Aug 15', day: 15, title: 'Scorpio Moon Trine Saturn', desc: 'Unshakable emotional resilience and long-term asset security.', type: 'money', intensity: 4 },
      { date: 'Aug 22', day: 22, title: 'Sun Sextile Mars', desc: 'Career victory! Senior executives grant high-level authority.', type: 'star', intensity: 5 }
    ],
    radarScores: [
      { category: 'Career', score: 96 },
      { category: 'Love', score: 88 },
      { category: 'Finance', score: 97 },
      { category: 'Health', score: 90 },
      { category: 'Family', score: 84 },
      { category: 'Travel', score: 82 },
      { category: 'Education', score: 90 },
      { category: 'Spirituality', score: 98 }
    ],
    bestDays: [6, 15, 22, 29],
    cautionDays: [10, 18, 25, 31],
    decisions: [
      { name: 'Interview', score: 96 },
      { name: 'Investment', score: 98 },
      { name: 'Marriage', score: 85 },
      { name: 'Travel', score: 80 },
      { name: 'Shopping', score: 65 },
      { name: 'Contracts', score: 94 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Secure high-equity partnership deal' },
      { id: '2', category: 'health', title: 'Strength training & metabolic conditioning' },
      { id: '3', category: 'relationships', title: 'Deep vulnerable dialogue with partner' }
    ],
    aiAdvice: {
      overview: 'August brings immense personal empowerment for Scorpio. Mars and Pluto synergize to grant financial victories and deep transformation.',
      career: 'Execute bold strategic moves. Secret competitors yield to your determination.',
      love: 'Intense emotional bond. Trust unlocks profound romantic healing.',
      finance: 'Significant financial gains through investments, royalties, or bonuses.',
      health: 'High stamina. Channel intensity into rigorous fitness routines.',
      travel: 'Private, secluded retreats foster deep mental clarity.',
      education: 'Investigative studies, research, or esoteric sciences yield major discoveries.',
      spiritual: 'Kundalini and breathwork practices open higher consciousness.'
    },
    moonPhases: [
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Releasing outdated emotional baggage.', activities: ['Karmic detox', 'Meditation'], avoid: ['Holding grudges'] }
    ]
  },
  Sagittarius: {
    energyScore: 90,
    theme: 'Abundance, Expansion & Global Vision',
    planet: '♃ Jupiter',
    challenge: 'Overcommitting to distant plans.',
    strength: 'Optimism & Higher Wisdom.',
    weeks: [
      { week: 'Week 1', score: 88, title: 'Philosophical Surge', status: 'Good', love: 85, career: 90, finance: 88, health: 90 },
      { week: 'Week 2', score: 94, title: 'Global Opportunities', status: 'Excellent', love: 90, career: 96, finance: 94, health: 92 },
      { week: 'Week 3', score: 90, title: 'Financial Wisdom', status: 'Excellent', love: 88, career: 92, finance: 92, health: 88 },
      { week: 'Week 4', score: 85, title: 'Reflective Integration', status: 'Good', love: 86, career: 85, finance: 86, health: 86 }
    ],
    calendarEvents: [
      { date: 'Aug 7', day: 7, title: 'Jupiter Sextile Sun', desc: 'Supreme luck and expansion. Outstanding day for long-term launches.', type: 'star', intensity: 5 },
      { date: 'Aug 14', day: 14, title: 'Venus Trine Jupiter', desc: 'Cosmic fortune in wealth and higher education.', type: 'money', intensity: 5 },
      { date: 'Aug 23', day: 23, title: 'Moon in Sagittarius', desc: 'High enthusiasm and joyous social celebrations.', type: 'heart', intensity: 4 }
    ],
    radarScores: [
      { category: 'Career', score: 92 },
      { category: 'Love', score: 88 },
      { category: 'Finance', score: 93 },
      { category: 'Health', score: 91 },
      { category: 'Family', score: 86 },
      { category: 'Travel', score: 99 },
      { category: 'Education', score: 97 },
      { category: 'Spirituality', score: 94 }
    ],
    bestDays: [7, 14, 23, 28],
    cautionDays: [9, 17, 24, 30],
    decisions: [
      { name: 'Interview', score: 92 },
      { name: 'Investment', score: 90 },
      { name: 'Marriage', score: 88 },
      { name: 'Travel', score: 99 },
      { name: 'Shopping', score: 80 },
      { name: 'Contracts', score: 88 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Publish international venture proposal' },
      { id: '2', category: 'health', title: 'Outdoor hiking and nature walks' },
      { id: '3', category: 'relationships', title: 'Explore new cultural events together' }
    ],
    aiAdvice: {
      overview: 'Jupiter guides August with fortune, travel opportunities, and intellectual growth for Sagittarius.',
      career: 'Expand your horizons. Foreign clients and high-level mentors back your ideas.',
      love: 'Shared adventures strengthen bonds. Single Sagittarians meet partners while traveling.',
      finance: 'Prosperous period. High ROI from educational investments.',
      health: 'High physical stamina. Outdoor sports boost mood.',
      travel: 'Unbeatable timing for long-distance international travel.',
      education: 'Superior results in competitive exams and higher degrees.',
      spiritual: 'Study sacred texts and practice gratitude rituals.'
    },
    moonPhases: [
      { phase: 'New Moon', emoji: '🌑', date: 'Aug 27', meaning: 'Seeding grand visionary goals.', activities: ['Map travel goals', 'Study philosophy'], avoid: ['Exaggerating promises'] }
    ]
  },
  Capricorn: {
    energyScore: 88,
    theme: 'Authority, Wealth Foundations & Long-Term Mastery',
    planet: '♄ Saturn',
    challenge: 'Overworking without sufficient rest.',
    strength: 'Discipline & Executive Authority.',
    weeks: [
      { week: 'Week 1', score: 85, title: 'Strategic Foundation', status: 'Good', love: 80, career: 92, finance: 90, health: 85 },
      { week: 'Week 2', score: 90, title: 'Financial Structuring', status: 'Excellent', love: 84, career: 94, finance: 95, health: 88 },
      { week: 'Week 3', score: 92, title: 'Leadership Recognition', status: 'Excellent', love: 86, career: 96, finance: 92, health: 86 },
      { week: 'Week 4', score: 84, title: 'System Consolidation', status: 'Good', love: 82, career: 88, finance: 86, health: 84 }
    ],
    calendarEvents: [
      { date: 'Aug 4', day: 4, title: 'Saturn Trine Mercury', desc: 'Masterclass in executive decision-making. Long-term contract victory.', type: 'mind', intensity: 5 },
      { date: 'Aug 13', day: 13, title: 'Capricorn Moon Conjunction', desc: 'Calm emotional strength and clear financial vision.', type: 'money', intensity: 4 },
      { date: 'Aug 25', day: 25, title: 'Saturn Sextile Sun', desc: 'Promotions, structural gains, and elder blessings.', type: 'star', intensity: 5 }
    ],
    radarScores: [
      { category: 'Career', score: 97 },
      { category: 'Love', score: 82 },
      { category: 'Finance', score: 96 },
      { category: 'Health', score: 86 },
      { category: 'Family', score: 88 },
      { category: 'Travel', score: 75 },
      { category: 'Education', score: 92 },
      { category: 'Spirituality', score: 90 }
    ],
    bestDays: [4, 13, 25, 29],
    cautionDays: [8, 16, 22, 30],
    decisions: [
      { name: 'Interview', score: 96 },
      { name: 'Investment', score: 98 },
      { name: 'Marriage', score: 82 },
      { name: 'Travel', score: 72 },
      { name: 'Shopping', score: 70 },
      { name: 'Contracts', score: 98 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Complete annual corporate strategy plan' },
      { id: '2', category: 'finance', title: 'Rebalance long-term investment portfolio' },
      { id: '3', category: 'health', title: 'Maintain joint mobility & spinal care' }
    ],
    aiAdvice: {
      overview: 'Saturn favors steady, disciplined progress. August delivers major breakthroughs in career authority and wealth building.',
      career: 'Your reliability commands respect. Key promotions or long-term contracts solidify.',
      love: 'Show affection through steadfast loyalty and practical support.',
      finance: 'Outstanding period for real estate, bonds, and long-term assets.',
      health: 'Protect knees, teeth, and spine. Ensure adequate sleep.',
      travel: 'Business trips are highly successful.',
      education: 'Favorable timing for professional qualifications and management training.',
      spiritual: 'Grounding meditation and disciplined habits align your karmic energy.'
    },
    moonPhases: [
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Completion of major financial project.', activities: ['Review asset ledgers', 'Settle debt'], avoid: ['Micromanaging teams'] }
    ]
  },
  Aquarius: {
    energyScore: 90,
    theme: 'Innovation, Community Impact & Financial Surge',
    planet: '♄ Saturn / ♅ Uranus',
    challenge: 'Detachment from personal feelings.',
    strength: 'Original Vision & Network Circles.',
    weeks: [
      { week: 'Week 1', score: 92, title: 'Visionary Spark', status: 'Excellent', love: 86, career: 95, finance: 90, health: 88 },
      { week: 'Week 2', score: 95, title: 'Full Moon In Sign', status: 'Excellent', love: 90, career: 96, finance: 94, health: 90 },
      { week: 'Week 3', score: 88, title: 'Network Expansion', status: 'Good', love: 85, career: 90, finance: 88, health: 86 },
      { week: 'Week 4', score: 84, title: 'Reflective Integration', status: 'Good', love: 82, career: 85, finance: 84, health: 85 }
    ],
    calendarEvents: [
      { date: 'Aug 8', day: 8, title: 'Full Moon in Aquarius', desc: 'Peak cosmic radiance in your sign! Personal breakthroughs and emotional clarity.', type: 'star', intensity: 5 },
      { date: 'Aug 16', day: 16, title: 'Uranus Trine Mercury', desc: 'Flashes of technological brilliance and inventive solutions.', type: 'mind', intensity: 5 },
      { date: 'Aug 26', day: 26, title: 'Venus Trine Aquarius', desc: 'Charming connections in social networks bring financial rewards.', type: 'money', intensity: 4 }
    ],
    radarScores: [
      { category: 'Career', score: 94 },
      { category: 'Love', score: 87 },
      { category: 'Finance', score: 92 },
      { category: 'Health', score: 88 },
      { category: 'Family', score: 85 },
      { category: 'Travel', score: 91 },
      { category: 'Education', score: 96 },
      { category: 'Spirituality', score: 93 }
    ],
    bestDays: [8, 16, 22, 26],
    cautionDays: [4, 12, 19, 29],
    decisions: [
      { name: 'Interview', score: 95 },
      { name: 'Investment', score: 90 },
      { name: 'Marriage', score: 86 },
      { name: 'Travel', score: 92 },
      { name: 'Shopping', score: 78 },
      { name: 'Contracts', score: 94 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Launch innovative tech or community platform' },
      { id: '2', category: 'health', title: 'Regular cardiovascular & nervous system care' },
      { id: '3', category: 'relationships', title: 'Connect with visionary soul tribe' }
    ],
    aiAdvice: {
      overview: 'With the Full Moon illuminating Aquarius on Aug 8, this month activates your highest potential, innovative ideas, and network fortune.',
      career: 'Your out-of-the-box ideas get greenlit. Lead community and tech initiatives.',
      love: 'Intellectual intimacy sparks deep romance.',
      finance: 'Monetize digital projects and group ventures.',
      health: 'Calm nervous system through daily meditation and adequate sleep.',
      travel: 'Travel to progressive, vibrant tech or cultural hubs.',
      education: 'Master AI, technology, or social science domains.',
      spiritual: 'Group meditation amplifies your energetic field.'
    },
    moonPhases: [
      { phase: 'Full Moon in Aquarius', emoji: '🌕', date: 'Aug 8', meaning: 'Your personal manifestation peak! Celebrate personal authenticity.', activities: ['Host community meetup', 'Set big dreams'], avoid: ['Isolation'] }
    ]
  },
  Pisces: {
    energyScore: 89,
    theme: 'Spiritual Grace, Creativity & Intuitve Alignment',
    planet: '♃ Jupiter / ♆ Neptune',
    challenge: 'Setting clear energetic boundaries.',
    strength: 'Intuition & Artistic Inspiration.',
    weeks: [
      { week: 'Week 1', score: 86, title: 'Creative Intuition', status: 'Good', love: 90, career: 84, finance: 86, health: 88 },
      { week: 'Week 2', score: 90, title: 'Spiritual Flow', status: 'Excellent', love: 92, career: 88, finance: 90, health: 90 },
      { week: 'Week 3', score: 94, title: 'Artistic Triumph', status: 'Excellent', love: 94, career: 92, finance: 92, health: 88 },
      { week: 'Week 4', score: 85, title: 'Peaceful Integration', status: 'Good', love: 88, career: 84, finance: 85, health: 86 }
    ],
    calendarEvents: [
      { date: 'Aug 5', day: 5, title: 'Neptune Trine Sun', desc: 'Profound artistic inspiration and intuitive dreams.', type: 'mind', intensity: 5 },
      { date: 'Aug 17', day: 17, title: 'Pisces Moon Trine Venus', desc: 'Soulmate connections and poetic romantic bliss.', type: 'heart', intensity: 5 },
      { date: 'Aug 28', day: 28, title: 'Jupiter Sextile Neptune', desc: 'Blessed financial gains through creative and spiritual work.', type: 'money', intensity: 5 }
    ],
    radarScores: [
      { category: 'Career', score: 86 },
      { category: 'Love', score: 95 },
      { category: 'Finance', score: 89 },
      { category: 'Health', score: 88 },
      { category: 'Family', score: 92 },
      { category: 'Travel', score: 88 },
      { category: 'Education', score: 90 },
      { category: 'Spirituality', score: 99 }
    ],
    bestDays: [5, 17, 24, 28],
    cautionDays: [9, 14, 21, 30],
    decisions: [
      { name: 'Interview', score: 88 },
      { name: 'Investment', score: 88 },
      { name: 'Marriage', score: 96 },
      { name: 'Travel', score: 90 },
      { name: 'Shopping', score: 75 },
      { name: 'Contracts', score: 86 }
    ],
    goals: [
      { id: '1', category: 'career', title: 'Complete creative album or writing project' },
      { id: '2', category: 'health', title: 'Daily sound bath & ocean water therapy' },
      { id: '3', category: 'relationships', title: 'Deep spiritual heart-to-heart talk' }
    ],
    aiAdvice: {
      overview: 'Jupiter and Neptune align to make August a Month of Grace for Pisces. Your intuition, creative output, and spiritual wisdom peak.',
      career: 'Artistic, healing, and humanitarian projects receive abundant funding.',
      love: 'Deep soulmate connections. Romantic harmony is effortless.',
      finance: 'Financial flow increases through creative gifts and intuitive choices.',
      health: 'Feet and lymphatic system benefit from massage and sea salt baths.',
      travel: 'Waterfront retreats, islands, and holy sites provide deep peace.',
      education: 'Flourish in music, poetry, psychology, and metaphysical studies.',
      spiritual: 'Meditation, mantra chanting, and lucid dreamwork bring profound revelations.'
    },
    moonPhases: [
      { phase: 'Full Moon', emoji: '🌕', date: 'Aug 8', meaning: 'Intuitive awakening and artistic culmination.', activities: ['Journal dreams', 'Perform water ritual'], avoid: ['Absorbing negative moods'] }
    ]
  }
};

export const getMonthlyForecast = (sign: string): MonthlyHoroscopeData => {
  if (!sign) return MONTHLY_DATA['Aries'];
  const formatted = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
  return MONTHLY_DATA[formatted] || MONTHLY_DATA['Aries'];
};
