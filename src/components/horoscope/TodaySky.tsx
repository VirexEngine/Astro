import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, HelpCircle } from 'lucide-react';

interface Transit {
  planet: string;
  symbol: string;
  sign: string;
  status: 'Direct' | 'Retrograde';
  desc: string;
  glow: string;
}

const TRANSITS: Transit[] = [
  { planet: 'Sun', symbol: '☉', sign: 'Leo', status: 'Direct', desc: 'Amplifies self-expression, confidence, and natural leadership.', glow: 'rgba(245,158,11,0.2)' },
  { planet: 'Moon', symbol: '☽', sign: 'Libra', status: 'Direct', desc: 'Focuses emotional balance on harmony, beauty, and partnerships.', glow: 'rgba(248,250,252,0.2)' },
  { planet: 'Mercury', symbol: '☿', sign: 'Leo', status: 'Retrograde', desc: 'Demands caution in contracts, technology, and speech.', glow: 'rgba(52,211,153,0.2)' },
  { planet: 'Venus', symbol: '♀', sign: 'Virgo', status: 'Direct', desc: 'Gently organizes relationship dynamics and financial values.', glow: 'rgba(254,243,199,0.2)' },
  { planet: 'Mars', symbol: '♂', sign: 'Gemini', status: 'Direct', desc: 'Drives curiosity, quick conversations, and intellectual action.', glow: 'rgba(239,68,68,0.2)' },
];

export const TodaySky: React.FC = () => {
  const [hoveredTransit, setHoveredTransit] = useState<Transit | null>(null);

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-5 overflow-hidden">
      {/* Aurora glow background */}
      <div className="absolute top-0 right-10 w-24 h-24 bg-purple/10 rounded-full filter blur-2xl pointer-events-none" />

      <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
            <span>Today's Sky (Planetary Transits)</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Active celestial alignments influencing today's cosmic energy.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {TRANSITS.map((trans) => {
          const isHovered = hoveredTransit?.planet === trans.planet;

          return (
            <motion.div
              key={trans.planet}
              whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.25)' }}
              onMouseEnter={() => setHoveredTransit(trans)}
              onMouseLeave={() => setHoveredTransit(null)}
              className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col items-center text-center gap-2 relative cursor-pointer select-none transition-all"
              style={{
                boxShadow: isHovered ? `0 0 15px ${trans.glow}` : 'none',
              }}
            >
              <span className="text-2xl font-serif text-gold-soft">{trans.symbol}</span>
              <div>
                <h4 className="text-xs font-semibold text-white leading-tight">{trans.planet}</h4>
                <p className="text-[10px] text-white/40 mt-0.5">in {trans.sign}</p>
              </div>
              <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                trans.status === 'Retrograde' 
                  ? 'bg-orange-500/10 border-orange-500/35 text-orange-400' 
                  : 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400'
              }`}>
                {trans.status}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Floating transit explanation */}
      <div className="min-h-[55px] mt-2">
        <AnimatePresence mode="wait">
          {hoveredTransit ? (
            <motion.div
              key={hoveredTransit.planet}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white/3 border border-white/5 rounded-xl p-3 text-center text-[11px] text-white/70 max-w-xl mx-auto flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-gold shrink-0" />
              <span>{hoveredTransit.desc}</span>
            </motion.div>
          ) : (
            <div className="border border-dashed border-white/10 rounded-xl p-3 text-center text-[11px] text-white/35 max-w-xl mx-auto">
              💡 Hover over any planet card to understand its specific transit influence.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
