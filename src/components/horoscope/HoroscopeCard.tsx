import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Briefcase, Activity, Coins, Users, Compass, HelpCircle, X, Sparkles } from 'lucide-react';

interface HoroscopeDetail {
  category: 'General' | 'Love' | 'Career' | 'Health' | 'Money' | 'Family' | 'Spirituality';
  score: number;
  prediction: string;
  transitWhy: string;
  icon: any;
  color: string;
}

interface HoroscopeCardProps {
  sign: string;
  mood: string;
  details: HoroscopeDetail[];
  userName?: string;
}

export const HoroscopeCard: React.FC<HoroscopeCardProps> = ({
  sign,
  mood,
  details,
  userName,
}) => {
  const [activeWhy, setActiveWhy] = useState<HoroscopeDetail | null>(null);

  const general = details.find((d) => d.category === 'General');
  const subs = details.filter((d) => d.category !== 'General');

  // Helper to personalize prediction text dynamically
  const formatPredictionText = (text: string) => {
    const signsRegex = /^(Aries|Taurus|Gemini|Cancer|Leo|Virgo|Libra|Scorpio|Sagittarius|Capricorn|Aquarius|Pisces),?/i;
    if (userName) {
      return text.replace(signsRegex, `${userName},`);
    }
    return text.replace(signsRegex, `${sign},`);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* General Forecast Card */}
      {general && (
        <div className="bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full filter blur-xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 mb-4 gap-2">
            <div>
              <h3 className="text-base font-display font-medium text-gradient-gold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>{userName ? `${userName}'s Personal ${sign} Reading` : `${sign} Celestial Forecast`}</span>
              </h3>
              <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider font-mono">
                {sign} Daily Astrological Alignment ({mood} Alignment)
              </p>
            </div>
            <button
              onClick={() => setActiveWhy(general)}
              className="text-[10px] font-mono text-gold hover:text-gold/80 transition-colors flex items-center gap-1 bg-gold/5 border border-gold/15 rounded-lg px-3 py-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why am I seeing this?</span>
            </button>
          </div>
          <p className="text-sm text-white/80 leading-relaxed font-sans">{formatPredictionText(general.prediction)}</p>
        </div>
      )}

      {/* Grid of Love, Career, Health, Money, Family, Spirituality */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subs.map((sub) => {
          const Icon = sub.icon;
          return (
            <motion.div
              key={sub.category}
              whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.2)' }}
              className="p-5 bg-glass-dark border border-white/10 rounded-2xl flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 ${sub.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white leading-tight">{sub.category}</h4>
                    <span className="text-[9px] text-white/40 mt-0.5 block font-mono">Match Score: {sub.score}%</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveWhy(sub)}
                  className="text-white/35 hover:text-gold transition-colors"
                  title="Why this prediction?"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-white/70 leading-relaxed font-sans">{formatPredictionText(sub.prediction)}</p>
            </motion.div>
          );
        })}
      </div>

      {/* "Why?" Explanation Modal overlay */}
      <AnimatePresence>
        {activeWhy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveWhy(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#0f1122]/95 border border-gold/30 rounded-2xl p-6 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveWhy(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <span className="text-2xl select-none">✨</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Transit Influence Analysis</h4>
                  <p className="text-[10px] text-gold font-mono uppercase mt-0.5">
                    {activeWhy.category} Dynamics
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-sans bg-black/20 p-3.5 rounded-xl border border-white/5">
                {activeWhy.transitWhy}
              </p>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setActiveWhy(null)}
                  className="bg-gold text-cosmos font-semibold text-xs px-4 py-2 rounded-xl hover:bg-gold/90 transition-colors"
                >
                  Acknowledge
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export { Heart, Briefcase, Activity, Coins, Users, Compass };
