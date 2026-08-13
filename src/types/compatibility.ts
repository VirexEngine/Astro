export interface PartnerInput {
  name: string;
  gender: string;
  dob: string; // YYYY-MM-DD
  time: string; // HH:MM
  place: string; // Place name
  timezone: string; // e.g. GMT+5:30
  notes?: string;
}

export interface MetricDetail {
  id: string;
  name: string;
  score: number;
  description: string;
  detailedMeaning: string;
  influence: string;
  recommendations: string[];
}

export interface PlanetAspect {
  planetA: string;
  planetASymbol: string;
  planetB: string;
  planetBSymbol: string;
  angle: number; // 0, 60, 90, 120, 180 degrees
  aspectName: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
  harmony: 'Excellent' | 'Good' | 'Challenging' | 'Neutral';
  description: string;
}

export interface NumerologyDetail {
  partnerANumber: number;
  partnerBNumber: number;
  partnerAMeaning: string;
  partnerBMeaning: string;
  score: number;
  harmony: string;
  description: string;
}

export interface TimelineEvent {
  year: number;
  score: number;
  status: 'Love' | 'Growth' | 'Challenge' | 'Transition';
  emoji: string;
  title: string;
  description: string;
}

export interface ElementCompatibility {
  elementA: 'Fire' | 'Earth' | 'Air' | 'Water';
  elementB: 'Fire' | 'Earth' | 'Air' | 'Water';
  score: number;
  description: string;
  particleColor: string;
}

export interface RemedyDetail {
  title: string;
  value: string;
  description: string;
  icon: string;
}

export interface CompatibilityReport {
  overallScore: number;
  matchRating: string; // e.g., 'Excellent Match'
  metrics: MetricDetail[];
  aspects: PlanetAspect[];
  numerology: {
    lifePath: NumerologyDetail;
    destiny: NumerologyDetail;
    soul: NumerologyDetail;
    expression: NumerologyDetail;
  };
  elements: ElementCompatibility;
  timeline: TimelineEvent[];
  remedies: RemedyDetail[];
  aiInsights: {
    overview: string;
    strengths: string[];
    challenges: string[];
    advice: string[];
    marriage: string;
    career: string;
    family: string;
    communication: string;
    future: string;
    spiritual: string;
  };
}
