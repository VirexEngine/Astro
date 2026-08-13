import { PartnerInput, CompatibilityReport, MetricDetail, TimelineEvent, RemedyDetail } from '../types/compatibility';
import { getZodiacSign, ZODIAC_PROFILES } from '../utils/zodiac';
import { calculateLifePath, calculateDestiny, calculateSoul, calculateExpression, getNumerologyMeaning } from '../utils/numerology';
import { getPlanetaryPositions } from '../utils/astrology';
import { getAspect, getElementsCompatibility, getAngleDiff } from '../utils/compatibility';

export const generateCompatibilityReport = (
  partnerA: PartnerInput,
  partnerB: PartnerInput
): CompatibilityReport => {
  // 1. Calculate Astrological positions
  const planetsA = getPlanetaryPositions(partnerA.dob, partnerA.time, partnerA.place);
  const planetsB = getPlanetaryPositions(partnerB.dob, partnerB.time, partnerB.place);

  const signA = getZodiacSign(partnerA.dob);
  const signB = getZodiacSign(partnerB.dob);

  const profileA = ZODIAC_PROFILES[signA];
  const profileB = ZODIAC_PROFILES[signB];

  // 2. Elements compatibility
  const elements = getElementsCompatibility(profileA.element, profileB.element);

  // 3. Planet Aspects
  const aspects: any[] = [];
  planetsA.forEach((pA) => {
    planetsB.forEach((pB) => {
      const aspect = getAspect(pA, pB);
      if (aspect) {
        aspects.push(aspect);
      }
    });
  });

  // Ensure we have at least 3 aspects to display for UI interest
  if (aspects.length < 3) {
    // Inject fallback aspects deterministically
    aspects.push({
      planetA: 'Moon',
      planetASymbol: '☽',
      planetB: 'Venus',
      planetBSymbol: '♀',
      angle: 120,
      aspectName: 'Trine',
      harmony: 'Excellent',
      description: 'Moon Trine Venus: Exceptional emotional harmony, feeling at home together.',
    });
    aspects.push({
      planetA: 'Venus',
      planetASymbol: '♀',
      planetB: 'Jupiter',
      planetBSymbol: '♃',
      angle: 60,
      aspectName: 'Sextile',
      harmony: 'Good',
      description: 'Venus Sextile Jupiter: Generosity and mutual support in relationships.',
    });
    aspects.push({
      planetA: 'Mars',
      planetASymbol: '♂',
      planetB: 'Saturn',
      planetBSymbol: '♄',
      angle: 90,
      aspectName: 'Square',
      harmony: 'Challenging',
      description: 'Mars Square Saturn: Teaches patience; requires balancing drive with boundaries.',
    });
  }

  // 4. Numerology calculations
  const lpA = calculateLifePath(partnerA.dob);
  const lpB = calculateLifePath(partnerB.dob);
  const lpScore = lpA === lpB ? 95 : (lpA + lpB) % 2 === 0 ? 85 : 70;

  const destA = calculateDestiny(partnerA.name);
  const destB = calculateDestiny(partnerB.name);
  const destScore = destA === destB ? 90 : (destA + destB) % 2 === 0 ? 80 : 75;

  const soulA = calculateSoul(partnerA.name);
  const soulB = calculateSoul(partnerB.name);
  const soulScore = Math.abs(soulA - soulB) <= 2 ? 88 : 72;

  const expA = calculateExpression(partnerA.name);
  const expB = calculateExpression(partnerB.name);
  const expScore = (expA + expB) % 3 === 0 ? 92 : 78;

  // 5. Calculate Metric scores
  const loveScore = Math.round((elements.score * 0.4) + (lpScore * 0.3) + (soulScore * 0.3));
  const marriageScore = Math.round((lpScore * 0.5) + (destScore * 0.5) + (aspects.some(a => a.aspectName === 'Trine') ? 5 : 0));
  const commScore = Math.round((expScore * 0.6) + (elements.elementA === 'Air' || elements.elementB === 'Air' ? 90 : 70) * 0.4);
  const passionScore = Math.round((elements.score * 0.3) + (soulScore * 0.3) + (aspects.some(a => a.planetA === 'Mars' || a.planetB === 'Mars') ? 92 : 68) * 0.4);
  const financialScore = Math.round((destScore * 0.5) + (elements.elementA === 'Earth' || elements.elementB === 'Earth' ? 95 : 70) * 0.5);
  const familyScore = Math.round((loveScore * 0.4) + (marriageScore * 0.3) + (elements.elementA === 'Water' || elements.elementB === 'Water' ? 92 : 70) * 0.3);

  const overallScore = Math.round(
    (loveScore + marriageScore + commScore + passionScore + financialScore + familyScore) / 6
  );

  let matchRating = 'Good Compatibility';
  if (overallScore >= 90) matchRating = 'Excellent Match';
  else if (overallScore >= 80) matchRating = 'Highly Compatible';
  else if (overallScore < 70) matchRating = 'Challenging Harmony';

  const metrics: MetricDetail[] = [
    {
      id: 'love',
      name: 'Love & Empathy',
      score: loveScore,
      description: 'Measures your emotional affinity and raw capacity for heart-centered connection.',
      detailedMeaning: 'Astrological elements of Water and Venus positions govern how you express affection. When combined with numerology LP numbers, it reveals how deeply your souls resonate in daily companionship.',
      influence: 'Venus & Moon Aspects',
      recommendations: ['Practice active empathy', 'Create dedicated quality time together weekly.'],
    },
    {
      id: 'marriage',
      name: 'Marriage Longevity',
      score: marriageScore,
      description: 'Reflects commitment capacity, shared responsibility, and long-term domestic pairing.',
      detailedMeaning: 'long-term stability relies on planetary Saturn (boundaries) and Jupiter (shared wisdom). High compatibility here means shared ethics and values that stand the test of time.',
      influence: 'Saturn & Jupiter Aspects',
      recommendations: ['Establish clear domestic roles early', 'Support each other\'s spiritual paths.'],
    },
    {
      id: 'communication',
      name: 'Communication Flow',
      score: commScore,
      description: 'Calculates cognitive compatibility, verbal alignment, and ease of conflict resolution.',
      detailedMeaning: 'Mercury positions govern logic and expression. If communication is clear, it acts as a cushion that safely resolves friction in other areas like passion or finances.',
      influence: 'Mercury & Expression Vibe',
      recommendations: ['Adopt non-violent communication methods', 'Avoid letting silent grudges build.'],
    },
    {
      id: 'passion',
      name: 'Passion & Chemistry',
      score: passionScore,
      description: 'Indicates physical attraction, chemistry, excitement, and sexual vitality.',
      detailedMeaning: 'Mars (drive) and Venus (desire) angles reveal the magnetic pull between two charts. Fire signs amplify this score, bringing excitement and romantic chases.',
      influence: 'Mars & Venus Alignments',
      recommendations: ['Keep the romantic spark alive with travel and surprises', 'Communicate physical desires openly.'],
    },
    {
      id: 'financial',
      name: 'Financial Harmony',
      score: financialScore,
      description: 'Measures money values, material cooperation, and wealth-building teamwork.',
      detailedMeaning: 'Earth signs and Saturn placements dictate how practical and disciplined you are with wealth. High compatibility indicates shared financial goals and success in business investments.',
      influence: 'Earth Elements & Destiny Numbers',
      recommendations: ['Align on shared budgeting goals', 'Create separate personal fun-money reserves.'],
    },
    {
      id: 'family',
      name: 'Family Alignment',
      score: familyScore,
      description: 'Calculates alignment in parenting styles, ancestral ideals, and domestic peace.',
      detailedMeaning: 'The Fourth House and Moon positions determine home vibes. Harmonious family compatibility points toward a peaceful household and supportive parenting dynamics.',
      influence: 'Moon & Fourth House Placements',
      recommendations: ['Establish family core values together', 'Honour both partners\' ancestral histories.'],
    },
  ];

  // 6. Timeline calculations
  const timeline: TimelineEvent[] = [
    {
      year: 2026,
      score: overallScore - 4,
      status: 'Love',
      emoji: '❤️',
      title: 'Cosmic Bonding Phase',
      description: 'Jupiter aspects your combined houses, fostering romantic breakthroughs and deeper emotional bonding.',
    },
    {
      year: 2027,
      score: overallScore + 3,
      status: 'Growth',
      emoji: '⭐',
      title: 'Expansion & Shared Vision',
      description: 'A highly creative, productive period for co-investments, travel, and aligning long-term life plans.',
    },
    {
      year: 2028,
      score: overallScore - 12,
      status: 'Challenge',
      emoji: '⚠',
      title: 'Saturnian Boundary Test',
      description: 'Saturn squares your natal moons. A period requiring deep patience, boundary respect, and active communication.',
    },
    {
      year: 2029,
      score: overallScore + 5,
      status: 'Transition',
      emoji: '✨',
      title: 'Spiritual Alignment',
      description: 'Ketu transitions, initiating spiritual growth. You shift from material concerns to deep, telepathic soul alignment.',
    },
    {
      year: 2030,
      score: overallScore + 2,
      status: 'Growth',
      emoji: '💍',
      title: 'Domestic Harmony Peak',
      description: 'A stable, joyous year. Excellent for property acquisition, family expansions, or celebrating major milestones.',
    },
  ];

  // 7. Remedies
  const remedies: RemedyDetail[] = [
    {
      title: 'Recommended Gemstone',
      value: lpScore > 80 ? 'Yellow Sapphire (Pukhraj)' : 'Emerald (Panna)',
      description: 'Supports mental clarity, Jupiter alignment, and open communication.',
      icon: '💎',
    },
    {
      title: 'Auspicious Color',
      value: profileA.element === 'Fire' ? 'Warm Gold & Indigo' : 'Forest Green & Cream',
      description: 'Wearing these colors during shared activities harmonizes your aura.',
      icon: '🎨',
    },
    {
      title: 'Lucky Day',
      value: overallScore % 2 === 0 ? 'Thursday' : 'Friday',
      description: 'The day of Jupiter or Venus, ideal for resolving arguments and planning dates.',
      icon: '📅',
    },
    {
      title: 'Suggested Mantra',
      value: 'Om Namo Bhagavate Vasudevaya',
      description: 'Chant 108 times on Thursdays to manifest absolute peace in your domestic environment.',
      icon: '🕉️',
    },
    {
      title: 'Recommended Charity',
      value: 'Feed orphaned children on full moon days',
      description: 'Balances Moon/Venus planetary debts and generates positive karma for your bond.',
      icon: '🤝',
    },
    {
      title: 'Sacred Yantra',
      value: 'Shree Yantra',
      description: 'Keep a copper Shree Yantra in the northeast corner of your home to channel abundance.',
      icon: '🔱',
    },
  ];

  // 8. AI Insights
  const nameA = partnerA.name.split(' ')[0];
  const nameB = partnerB.name.split(' ')[0];

  const aiInsights = {
    overview: `The cosmic alignment between ${nameA} and ${nameB} is marked by a deep sense of mutual respect and spiritual recognition. With an overall compatibility of ${overallScore}%, your charts point to a harmonious energetic balance, blending ${nameA}'s ${profileA.element} drive with ${nameB}'s ${profileB.element} grounding.`,
    strengths: [
      `High resonance between your Life Path numbers (${lpA} and ${lpB}), fostering shared values.`,
      `Excellent communication flow, backed by a strong Mercury alignment.`,
      `Supportive planetary aspects (such as Trines) that foster natural comfort and intimacy without requiring constant effort.`
    ],
    challenges: [
      `Minor elemental friction (combining ${profileA.element} and ${profileB.element}), which can manifest as temporary misunderstandings.`,
      `The Saturn square in 2028 will require patience and mutual boundary settings.`,
      `Potential financial differences: one partner may be more risk-averse than the other.`
    ],
    advice: [
      `Dedicate time for conscious verbal connection weekly. Don't assume silence is always agreement.`,
      `Balance individual independence with shared goals. Respect each other's hobbies and personal space.`,
      `Wear compatible auric colors (Gold/Indigo) when addressing complex domestic topics.`
    ],
    marriage: `Long-term marriage prospects are highly favorable. Your commitment indicators (Saturn/Jupiter aspects) show that you are capable of navigating transitions together with maturity and respect.`,
    career: `If working in business together, your complimentary destiny numbers provide a productive combination, blending creative vision with structured, practical execution.`,
    family: `Your family alignment score is robust. You will create a welcoming, secure, and spiritually open household for children and elders alike.`,
    communication: `Verbal channels are open and wittily charged. Mercury's influence ensures that even during intense arguments, logic and respect will eventually prevail over raw anger.`,
    future: `The timeline reveals steady growth, peaking around 2030, with a minor test of endurance in 2028 that will ultimately strengthen your relationship core.`,
    spiritual: `There is a clear karmic tie here. Your Mystic aspects point to a shared spiritual mission: you are here to accelerate each other's evolutionary growth.`,
  };

  return {
    overallScore,
    matchRating,
    metrics,
    aspects,
    numerology: {
      lifePath: {
        partnerANumber: lpA,
        partnerBNumber: lpB,
        partnerAMeaning: getNumerologyMeaning(lpA, 'LP'),
        partnerBMeaning: getNumerologyMeaning(lpB, 'LP'),
        score: lpScore,
        harmony: lpScore >= 80 ? 'Highly Resonant' : 'Neutral Vibration',
        description: `Life Path ${lpA} matches with ${lpB}. lp ${lpA} represents ${getNumerologyMeaning(lpA, 'LP')} while lp ${lpB} represents ${getNumerologyMeaning(lpB, 'LP')}.`,
      },
      destiny: {
        partnerANumber: destA,
        partnerBNumber: destB,
        partnerAMeaning: getNumerologyMeaning(destA, 'Destiny'),
        partnerBMeaning: getNumerologyMeaning(destB, 'Destiny'),
        score: destScore,
        harmony: destScore >= 80 ? 'Harmonious Match' : 'Challenging Aspect',
        description: `Destiny vibration focuses your career alignment and external duties. Your score indicates a ${destScore >= 80 ? 'smooth' : 'challenging'} co-creation style.`,
      },
      soul: {
        partnerANumber: soulA,
        partnerBNumber: soulB,
        partnerAMeaning: getNumerologyMeaning(soulA, 'Soul'),
        partnerBMeaning: getNumerologyMeaning(soulB, 'Soul'),
        score: soulScore,
        harmony: soulScore >= 80 ? 'Soulmate Resonance' : 'Balanced Affinity',
        description: `Soul urge numbers reveal inner emotional desires. The match indicates a ${soulScore >= 80 ? 'deeply emotional and spiritual' : 'friendly and stable'} alignment.`,
      },
      expression: {
        partnerANumber: expA,
        partnerBNumber: expB,
        partnerAMeaning: getNumerologyMeaning(expA, 'Expression'),
        partnerBMeaning: getNumerologyMeaning(expB, 'Expression'),
        score: expScore,
        harmony: expScore >= 80 ? 'Fluid Expressiveness' : 'Pragmatic Connection',
        description: `Expression values dictate daily verbal interactions and social display compatibility.`,
      },
    },
    elements,
    timeline,
    remedies,
    aiInsights,
  };
};
