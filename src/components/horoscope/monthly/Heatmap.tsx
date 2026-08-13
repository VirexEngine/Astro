import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeatmapDay {
  day: number;
  score: number; // 0-100
  title: string;
}

// Deterministic mock daily energy score mapping
const getDayScore = (day: number): HeatmapDay => {
  const seeds = [
    { title: 'Standard Transit' },
    { title: 'Auspicious Solar peak' },
    { title: 'Lunar conflict caution' },
    { title: 'Venusian connection harmony' },
    { title: 'Mercurial details precision' },
  ];
  
  // Hash function to make daily metrics deterministic but varied
  const hash = (day * 17) % 100;
  const seedIdx = (day * 3) % seeds.length;
  
  let score = 55;
  let title = 'Standard energy index';
  if (hash > 80) {
    score = 92;
    title = 'Cosmic Zenith: Highly auspicious alignment';
  } else if (hash > 60) {
    score = 78;
    title = 'Favorable flow: Support for meetings';
  } else if (hash < 35) {
    score = 35;
    title = 'Caution warning: Avoid new contracts';
  }

  return { day, score, title };
};

export const Heatmap: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const days = Array.from({ length: 31 }).map((_, i) => getDayScore(i + 1));

  const getHeatmapColor = (score: number) => {
    if (score >= 85) {
      return 'bg-gold border border-gold/40 shadow-[0_0_10px_rgba(212,175,55,0.35)]';
    }
    if (score >= 70) {
      return 'bg-purple border border-purple/40 shadow-[0_0_10px_rgba(124,58,237,0.2)]';
    }
    if (score >= 50) {
      return 'bg-indigo-950/60 border border-indigo-950/80 text-white/50';
    }
    return 'bg-[#0a0d24] border border-[#151936] text-white/30';
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-5 overflow-hidden">
      {/* Galaxy backdrop glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="flex justify-between items-center border-b border-white/5 pb-4 z-10">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-gold animate-spin-slow" />
            <span>Galaxy Synergy Heatmap</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            GitHub-style galaxy mapping of the relative cosmic support index for all 31 days.
          </p>
        </div>
      </div>

      {/* Heatmap block Grid */}
      <div className="flex flex-wrap gap-2 w-full pt-2 z-10">
        {days.map((day) => (
          <div
            key={day.day}
            onMouseEnter={() => setHoveredDay(day)}
            onMouseLeave={() => setHoveredDay(null)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-[10px] cursor-pointer transition-all duration-200 hover:scale-105 ${getHeatmapColor(
              day.score
            )}`}
          >
            {day.day}
          </div>
        ))}
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center gap-4 text-[9px] font-mono text-white/40 uppercase tracking-widest pt-2 border-t border-white/5 z-10">
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-[#0a0d24] border border-[#151936]" />
          <span>Caution</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-indigo-950/60 border border-indigo-950/80" />
          <span>Neutral</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-purple border border-purple/40" />
          <span>Favorable</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-gold border border-gold/40" />
          <span>Auspicious</span>
        </span>
      </div>

      {/* Hover tooltip explanation */}
      <div className="min-h-[50px] flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {hoveredDay ? (
            <motion.div
              key={hoveredDay.day}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 bg-white/3 border border-white/5 rounded-xl text-center text-xs text-white/70 max-w-md w-full"
            >
              <strong className="text-white block mb-0.5 font-mono">August {hoveredDay.day}</strong>
              <span className="text-gold font-mono">{hoveredDay.score}% Synergy Index</span> • {hoveredDay.title}
            </motion.div>
          ) : (
            <div className="border border-dashed border-white/10 rounded-xl p-3 text-center text-xs text-white/30 max-w-md w-full">
              💡 Hover over any block to decrypt the day's synergy index.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
