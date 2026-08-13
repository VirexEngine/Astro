import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

interface MoonPhase {
  phase: string;
  emoji: string;
  date: string;
  meaning: string;
  activities: string[];
  avoid: string[];
}

interface MoonCalendarProps {
  phases: MoonPhase[];
}

export const MoonCalendar: React.FC<MoonCalendarProps> = ({ phases }) => {
  const [selectedPhase, setSelectedPhase] = useState<MoonPhase>(phases[2]); // Default to Full Moon

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple/10 rounded-full filter blur-xl pointer-events-none" />

      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-gold" />
            <span>Interactive Moon Phase Calendar</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Understand the spiritual currents of each major lunar transit this month.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Left: Interactive Phase Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-60 shrink-0">
          {phases.map((phase) => {
            const isSelected = selectedPhase.phase === phase.phase;
            return (
              <motion.button
                key={phase.phase}
                type="button"
                whileHover={{ y: -2 }}
                onClick={() => setSelectedPhase(phase)}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gold/10 border-gold/45 text-gold shadow-md shadow-gold/10'
                    : 'bg-white/3 border-white/5 text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-3xl select-none">{phase.emoji}</span>
                <div>
                  <h4 className="text-xs font-semibold leading-none">{phase.phase}</h4>
                  <span className="text-[9px] font-mono text-white/40 block mt-1">{phase.date}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right: Phase Details Card */}
        <div className="flex-1 w-full bg-white/3 border border-white/5 rounded-2xl p-5 min-h-[200px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-full filter blur-lg pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPhase.phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4 text-xs text-white/70 leading-relaxed font-sans"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-2.5">
                <span className="text-2xl select-none">{selectedPhase.emoji}</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{selectedPhase.phase} Phase</h4>
                  <span className="text-[9px] font-mono text-gold-soft uppercase tracking-wider block mt-0.5">
                    Lunar currents on {selectedPhase.date}
                  </span>
                </div>
              </div>

              <div>
                <strong className="text-white block mb-0.5">Metaphysical Meaning:</strong>
                {selectedPhase.meaning}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3 mt-1 text-[11px]">
                <div>
                  <span className="text-emerald-400 font-bold block mb-0.5">Recommended Actions</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {selectedPhase.activities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-red-400 font-bold block mb-0.5">Actions to Avoid</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {selectedPhase.avoid.map((av, i) => (
                      <li key={i}>{av}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
