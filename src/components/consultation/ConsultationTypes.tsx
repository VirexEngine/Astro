import React from 'react';
import { Briefcase, Heart, Coins, Sparkles, Activity, ShieldCheck } from 'lucide-react';

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  emoji: string;
  bestFor: string;
  desc: string;
  features: string[];
  isPopular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'career',
    name: 'Career Guidance',
    duration: '45 min',
    price: 999,
    emoji: '💼',
    bestFor: 'Jobs, Promotion, Interview Timing',
    desc: 'Plot planetary positions governing Tenth house structures.',
    features: [
      'Tenth House Karma & Profession Analysis',
      'Job Switch & Promotion Timing',
      'Office Politics & Boss Dynamics',
      'Custom Gemstone & Remedy Guide'
    ]
  },
  {
    id: 'marriage',
    name: 'Marriage & Relationship',
    duration: '60 min',
    price: 1499,
    emoji: '❤️',
    bestFor: 'Synastry Compatibility, Disputes',
    desc: 'Review Venus, Moon, and Seventh house marriage dynamics.',
    features: [
      'Seventh House Synastry Compatibility',
      'Marriage Timing & Partner Characteristics',
      'Venus & Mangal Dosha Assessment',
      'Relationship Dispute Remediation'
    ]
  },
  {
    id: 'finance',
    name: 'Business & Finance',
    duration: '60 min',
    price: 1499,
    emoji: '💰',
    bestFor: 'Wealth, Investments, Partnerships',
    desc: 'Identify auspicious periods for financial launches.',
    features: [
      'Second & Eleventh House Wealth Yogas',
      'Business Launch & Partnership Timing',
      'Financial Investment Risk Windows',
      'Lakshmi & Kubera Mantras'
    ]
  },
  {
    id: 'health',
    name: 'Health & Spiritual Guidance',
    duration: '45 min',
    price: 999,
    emoji: '🪷',
    bestFor: 'Wellness, Mindfulness, Mantras',
    desc: 'Analyze Sixth house transits and design karmic adjustments.',
    features: [
      'Sixth & Eighth House Transit Analysis',
      'Chakra Alignment & Energetic Remedies',
      'Ayurvedic & Mindful Routines',
      'Mahamrityunjaya Mantra Guide'
    ]
  },
  {
    id: 'life',
    name: 'Complete Life Reading',
    duration: '90 min',
    price: 2499,
    emoji: '🌌',
    bestFor: 'All areas, Year Ahead Preview',
    desc: 'Full, comprehensive birth chart transit briefing.',
    isPopular: true,
    features: [
      'Full 12-House Kundali & Lagna Analysis',
      'Sade Sati, Rahu-Ketu & Dasha Breakdown',
      'Career, Wealth & Marriage Synchronization',
      'Custom Gemstone, Yantra & Remedy Plan',
      'Unlimited Q&A & Session Audio Notes'
    ]
  },
];

export const ConsultationTypes: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Comparison Table */}
      <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-5 overflow-hidden">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-gold" />
            <span>Consultation Package Comparison</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Compare duration, pricing, and suitability to choose the right session.
          </p>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs text-white/70 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[9px] font-mono uppercase tracking-widest text-white/40">
                <th className="pb-3 pl-2">Session Name</th>
                <th className="pb-3 text-center">Duration</th>
                <th className="pb-3 text-right">Price (INR)</th>
                <th className="pb-3 pl-4">Target Focus Area</th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="py-3 pl-2 font-semibold text-white flex items-center gap-2">
                    <span className="select-none text-base">{p.emoji}</span>
                    <span>{p.name}</span>
                  </td>
                  <td className="py-3 text-center font-mono">{p.duration}</td>
                  <td className="py-3 text-right font-mono text-gold font-semibold">₹{p.price}</td>
                  <td className="py-3 pl-4 text-white/50">{p.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export { Heart, Briefcase, Activity, Coins };
