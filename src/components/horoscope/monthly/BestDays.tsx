import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle } from 'lucide-react';

interface BestDaysProps {
  bestDays: number[];
  cautionDays: number[];
}

export const BestDays: React.FC<BestDaysProps> = ({ bestDays, cautionDays }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Best Days Card */}
      <motion.div
        whileHover={{ y: -3 }}
        className="p-5 bg-glass-dark border border-emerald-500/20 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col gap-4 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full filter blur-lg pointer-events-none" />
        <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
          <Sparkles className="w-4.5 h-4.5 text-emerald-400 animate-pulse" />
          <div>
            <h4 className="text-sm font-semibold text-white">✨ Auspicious Days</h4>
            <p className="text-[10px] text-white/40 mt-0.5">Best days for starting projects, signing deals, or romance</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {bestDays.map((day) => (
            <span
              key={day}
              className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs"
            >
              {day}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Caution Days Card */}
      <motion.div
        whileHover={{ y: -3 }}
        className="p-5 bg-glass-dark border border-red-500/20 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col gap-4 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full filter blur-lg pointer-events-none" />
        <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
          <AlertTriangle className="w-4.5 h-4.5 text-red-400" />
          <div>
            <h4 className="text-sm font-semibold text-white">⚠ Caution Days</h4>
            <p className="text-[10px] text-white/40 mt-0.5">Days to avoid high spending, risks, or signing contracts</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {cautionDays.map((day) => (
            <span
              key={day}
              className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/35 text-red-400 flex items-center justify-center font-mono font-bold text-xs"
            >
              {day}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
