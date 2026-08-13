import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Briefcase, Heart, Coins, Activity, Plane, GraduationCap, Compass } from 'lucide-react';

interface Advice {
  overview: string;
  career: string;
  love: string;
  finance: string;
  health: string;
  travel: string;
  education: string;
  spiritual: string;
}

interface AIAdvisorProps {
  advice: Advice;
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: Brain },
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'love', label: 'Love & Family', icon: Heart },
  { id: 'finance', label: 'Finance', icon: Coins },
  { id: 'health', label: 'Health', icon: Activity },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'spiritual', label: 'Spiritual', icon: Compass },
] as const;

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ advice }) => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('overview');

  const getAdviceContent = () => {
    switch (activeTab) {
      case 'overview': return advice.overview;
      case 'career': return advice.career;
      case 'love': return advice.love;
      case 'finance': return advice.finance;
      case 'health': return advice.health;
      case 'travel': return advice.travel;
      case 'education': return advice.education;
      case 'spiritual': return advice.spiritual;
      default: return '';
    }
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Vedic AI Monthly Advisor</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Strategic astrological guidance prepared across all primary lifecycle sectors.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Navigation Sidebar Tabs */}
        <div className="flex flex-wrap lg:flex-col gap-1 w-full lg:w-48 bg-white/3 border border-white/5 p-1.5 rounded-2xl shrink-0">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
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
              exit={{ opacity: 0 }}
              className="text-xs text-white/80 leading-relaxed font-sans"
            >
              {getAdviceContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
