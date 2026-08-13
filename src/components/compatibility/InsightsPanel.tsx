import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  AlertTriangle, 
  Lightbulb, 
  Home, 
  Briefcase, 
  Heart,
  CalendarDays,
  Compass
} from 'lucide-react';

interface InsightsPanelProps {
  insights: {
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

const TABS = [
  { id: 'overview', label: 'Overview', icon: Brain },
  { id: 'strengths', label: 'Strengths', icon: ShieldCheck },
  { id: 'challenges', label: 'Challenges', icon: AlertTriangle },
  { id: 'advice', label: 'Advice', icon: Lightbulb },
  { id: 'marriage', label: 'Marriage', icon: Heart },
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'family', label: 'Family', icon: Home },
  { id: 'future', label: 'Future transits', icon: CalendarDays },
  { id: 'spiritual', label: 'Soul connection', icon: Compass }
] as const;

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('overview');

  const getTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <p className="text-sm text-white/80 leading-relaxed font-sans">{insights.overview}</p>;
      case 'marriage':
        return <p className="text-sm text-white/80 leading-relaxed font-sans">{insights.marriage}</p>;
      case 'career':
        return <p className="text-sm text-white/80 leading-relaxed font-sans">{insights.career}</p>;
      case 'family':
        return <p className="text-sm text-white/80 leading-relaxed font-sans">{insights.family}</p>;
      case 'future':
        return <p className="text-sm text-white/80 leading-relaxed font-sans">{insights.future}</p>;
      case 'spiritual':
        return <p className="text-sm text-white/80 leading-relaxed font-sans">{insights.spiritual}</p>;
      case 'strengths':
        return (
          <ul className="space-y-3.5">
            {insights.strengths.map((str, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-white/80">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span className="font-sans leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        );
      case 'challenges':
        return (
          <ul className="space-y-3.5">
            {insights.challenges.map((ch, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-white/80">
                <span className="text-red-400 font-bold shrink-0">⚠</span>
                <span className="font-sans leading-relaxed">{ch}</span>
              </li>
            ))}
          </ul>
        );
      case 'advice':
        return (
          <ul className="space-y-3.5">
            {insights.advice.map((adv, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-white/80">
                <span className="text-gold font-bold shrink-0">★</span>
                <span className="font-sans leading-relaxed">{adv}</span>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Vedic AI Relationship Insights</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Deep metaphysical analysis and advice for your unique karmic bond.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Navigation Sidebar Tabs */}
        <div className="flex flex-wrap lg:flex-col gap-1 w-full lg:w-48 bg-white/3 border border-white/5 p-1.5 rounded-2xl">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                  isActive
                    ? 'bg-gold/10 border-gold/30 text-gold shadow-md'
                    : 'text-white/60 hover:text-white border-transparent hover:bg-white/3'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline lg:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Display Panel */}
        <div className="flex-1 w-full min-h-[160px] bg-white/3 border border-white/5 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-full filter blur-lg pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              {getTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
