import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, AlertTriangle, Compass, Award, Calendar } from 'lucide-react';

interface MonthOverviewProps {
  score: number;
  theme: string;
  planet: string;
  challenge: string;
  strength: string;
  luckyDays: number[];
}

export const MonthOverview: React.FC<MonthOverviewProps> = ({
  score,
  theme,
  planet,
  challenge,
  strength,
  luckyDays,
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-5 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple/10 rounded-full filter blur-xl pointer-events-none" />

      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <Award className="w-4.5 h-4.5 text-gold animate-bounce" />
          <span>Month at a Glance</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          High-level overview of cosmic forces and goals for August 2026.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        {/* Left Column: Progress Ring */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-24 h-24 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="5" />
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="5"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 3px rgba(212,175,55,0.4))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[9px] font-mono text-white/40 uppercase">Index</span>
              <span className="text-lg font-mono font-bold text-white mt-0.5">{score}%</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase block leading-none">Synergy Rating</span>
            <span className="text-sm font-semibold text-white mt-1 block">Excellent Month</span>
            <div className="text-[9px] text-gold mt-1">★★★★☆</div>
          </div>
        </div>

        {/* Right Column: Month checklist */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-white/3 border border-white/5 rounded-xl">
            <span className="text-[9px] font-mono text-white/40 uppercase">Theme</span>
            <p className="text-xs font-semibold text-white mt-1">{theme}</p>
          </div>
          <div className="p-3 bg-white/3 border border-white/5 rounded-xl">
            <span className="text-[9px] font-mono text-white/40 uppercase">Planet of the Month</span>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-gold" />
              <span>{planet}</span>
            </p>
          </div>
          <div className="p-3 bg-white/3 border border-white/5 rounded-xl">
            <span className="text-[9px] font-mono text-white/40 uppercase">Greatest Strength</span>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>{strength}</span>
            </p>
          </div>
          <div className="p-3 bg-white/3 border border-white/5 rounded-xl">
            <span className="text-[9px] font-mono text-white/40 uppercase">Warning Challenge</span>
            <p className="text-xs font-semibold text-white mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>{challenge}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-4 flex flex-wrap items-center gap-2 text-xs">
        <Calendar className="w-4 h-4 text-gold shrink-0" />
        <span className="text-white/50">Auspicious Lucky Days:</span>
        <div className="flex gap-1.5">
          {luckyDays.map((day) => (
            <span
              key={day}
              className="w-6 h-6 rounded-full bg-gold/15 border border-gold/20 text-gold flex items-center justify-center font-mono font-bold text-[10px]"
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
