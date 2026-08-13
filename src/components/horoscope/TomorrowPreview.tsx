import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CalendarDays } from 'lucide-react';

interface HeatmapDay {
  dayName: string;
  score: number; // 0-100
  color: string;
}

const HEATMAP: HeatmapDay[] = [
  { dayName: 'Mon', score: 40, color: 'bg-emerald-500/20' },
  { dayName: 'Tue', score: 85, color: 'bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]' },
  { dayName: 'Wed', score: 60, color: 'bg-emerald-500/50' },
  { dayName: 'Thu', score: 30, color: 'bg-emerald-500/10' },
  { dayName: 'Fri', score: 90, color: 'bg-emerald-500/90 shadow-[0_0_10px_rgba(16,185,129,0.4)]' },
  { dayName: 'Sat', score: 75, color: 'bg-emerald-500/70 shadow-[0_0_10px_rgba(16,185,129,0.2)]' },
  { dayName: 'Sun', score: 50, color: 'bg-emerald-500/30' },
];

export const TomorrowPreview: React.FC = () => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gold" />
            <span>Tomorrow's Teaser &amp; Weekly Heatmap</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            A sneak peek at tomorrow's planetary alignments and the week's favorable spikes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Tomorrow Teaser */}
        <div className="p-5 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-widest text-gold-soft uppercase">Tomorrow's Sneak Peek</span>
            <span className="text-[9px] font-mono font-bold bg-gold/15 text-gold border border-gold/20 px-2 py-0.5 rounded">Favorable</span>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex flex-col text-xs text-white/80 gap-1 font-sans">
              <span className="flex items-center gap-1"><span className="text-emerald-400">↑</span> Love (Venus Aspects)</span>
              <span className="flex items-center gap-1"><span className="text-emerald-400">↑</span> Career (Jupiter Aspects)</span>
              <span className="flex items-center gap-1"><span className="text-red-400">↓</span> Tech (Mercury Retrograde)</span>
            </div>
          </div>

          <p className="text-[11px] text-white/60 leading-relaxed font-sans">
            Tomorrow, the lunar transition into Scorpio increases emotional intuition. It is an excellent day for research and quiet, analytical work.
          </p>
        </div>

        {/* Right: Weekly Heatmap Grid */}
        <div className="p-5 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-4">
          <div>
            <h4 className="text-xs font-semibold text-white">Astrological Synergy Index</h4>
            <p className="text-[10px] text-white/40 mt-0.5">Weekly mapping of cosmic support</p>
          </div>

          {/* Favorable Days Heatmap (GitHub-style blocks) */}
          <div className="flex items-end justify-between gap-2.5 pt-2">
            {HEATMAP.map((day) => (
              <div key={day.dayName} className="flex flex-col items-center gap-1.5 flex-1">
                {/* Visual Bar Height relative to score */}
                <div className="w-full h-12 bg-white/5 rounded-md overflow-hidden relative flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${day.score}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className={`w-full rounded-md ${day.color}`}
                  />
                </div>
                <span className="text-[9px] font-mono text-white/45">{day.dayName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
