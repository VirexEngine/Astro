import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Star, Heart, Briefcase, Coins, Activity } from 'lucide-react';

interface WeekData {
  week: string;
  score: number;
  title: string;
  status: 'Excellent' | 'Good' | 'Average' | 'Avoid';
  love: number;
  career: number;
  finance: number;
  health: number;
}

interface WeeklyTimelineProps {
  weeks: WeekData[];
}

const getStatusColor = (status: WeekData['status']) => {
  switch (status) {
    case 'Excellent': return 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400';
    case 'Good': return 'bg-blue-500/10 border-blue-500/35 text-blue-400';
    case 'Average': return 'bg-yellow-500/10 border-yellow-500/35 text-yellow-400';
    case 'Avoid': return 'bg-red-500/10 border-red-500/35 text-red-400';
  }
};

export const WeeklyTimeline: React.FC<WeeklyTimelineProps> = ({ weeks }) => {
  const [activeWeek, setActiveWeek] = useState<WeekData>(weeks[0]);

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <CalendarDays className="w-4.5 h-4.5 text-gold animate-pulse" />
          <span>Weekly Strategic Roadmap</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Four-week transits breakdown mapping focus targets and energy levels.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Timeline List */}
        <div className="flex-1 w-full flex flex-col gap-3">
          {weeks.map((wk) => {
            const isSelected = activeWeek.week === wk.week;
            return (
              <motion.div
                key={wk.week}
                onClick={() => setActiveWeek(wk)}
                whileHover={{ x: 4 }}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gold/10 border-gold/45 text-gold shadow-md'
                    : 'bg-white/3 border-white/5 text-white/70 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                    {wk.week}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{wk.title}</h4>
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded border mt-0.5 inline-block uppercase tracking-wider ${getStatusColor(wk.status)}`}>
                      {wk.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <span className="text-xs font-mono font-bold text-gold">{wk.score}% Match</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 h-3 rounded-full ${
                          i < Math.round(wk.score / 20) ? 'bg-gold' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Active Week detail cards */}
        <div className="w-full lg:w-80 bg-white/3 border border-white/5 rounded-2xl p-5 min-h-[220px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple/5 rounded-full filter blur-xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeWeek.week}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4 text-xs text-white/70 font-sans"
            >
              <div className="border-b border-white/5 pb-2.5">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                  {activeWeek.week} Focus Detail
                </h4>
                <p className="text-sm font-semibold text-gold mt-1">{activeWeek.title}</p>
              </div>

              {/* Sub-ratings bars */}
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Romantic Love', val: activeWeek.love, icon: Heart, color: 'from-rose-500 to-pink-400' },
                  { label: 'Professional Career', val: activeWeek.career, icon: Briefcase, color: 'from-purple to-indigo-500' },
                  { label: 'Financial Opportunity', val: activeWeek.finance, icon: Coins, color: 'from-gold to-yellow-400' },
                  { label: 'Health & Vitality', val: activeWeek.health, icon: Activity, color: 'from-emerald-500 to-teal-400' },
                ].map((bar) => {
                  const Icon = bar.icon;
                  return (
                    <div key={bar.label}>
                      <div className="flex justify-between items-center text-[10px] text-white/60 mb-1">
                        <span className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-white/30" />
                          <span>{bar.label}</span>
                        </span>
                        <span className="font-mono font-bold text-white">{bar.val}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.val}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
