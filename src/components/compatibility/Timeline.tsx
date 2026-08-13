import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineEvent } from '../../types/compatibility';
import { CalendarRange, Sparkles } from 'lucide-react';

interface TimelineProps {
  timeline: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
          <CalendarRange className="w-4 h-4 text-gold" />
          <span>Destiny Timeline (2026 - 2030)</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Predicting key transit phases and cosmic cycles in your connection.
        </p>
      </div>

      <div className="relative pt-6 pb-4">
        {/* Horizontal Line connector */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

        <div className="grid grid-cols-5 relative z-10">
          {timeline.map((event) => {
            const isHovered = hoveredEvent?.year === event.year;
            
            return (
              <div
                key={event.year}
                className="flex flex-col items-center gap-3 cursor-pointer relative"
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Score badge at top */}
                <motion.span
                  animate={isHovered ? { y: -3, scale: 1.1 } : {}}
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-all ${
                    isHovered ? 'bg-gold/15 border-gold text-gold' : 'bg-white/5 border-white/10 text-white/60'
                  }`}
                >
                  {event.score}%
                </motion.span>

                {/* Timeline node circle */}
                <motion.div
                  animate={isHovered ? { scale: 1.25 } : {}}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border text-base shadow-md transition-all ${
                    event.status === 'Challenge'
                      ? 'bg-red-500/10 border-red-500/30'
                      : event.status === 'Love'
                      ? 'bg-purple/20 border-purple/40 text-purple'
                      : 'bg-gold/10 border-gold/30 text-gold'
                  }`}
                >
                  {event.emoji}
                </motion.div>

                {/* Year tag */}
                <span className={`text-xs font-mono font-semibold transition-all ${
                  isHovered ? 'text-gold' : 'text-white/60'
                }`}>
                  {event.year}
                </span>
              </div>
            );
          })}
        </div>

        {/* Floating details cards */}
        <div className="min-h-[85px] mt-6 flex justify-center">
          <AnimatePresence mode="wait">
            {hoveredEvent ? (
              <motion.div
                key={hoveredEvent.year}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full bg-white/3 border border-white/10 rounded-xl p-4 text-center max-w-lg shadow-md relative"
              >
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-1 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{hoveredEvent.year} • {hoveredEvent.title}</span>
                </h4>
                <p className="text-[11px] text-white/70 leading-relaxed max-w-md mx-auto">
                  {hoveredEvent.description}
                </p>
              </motion.div>
            ) : (
              <div className="w-full border border-dashed border-white/10 rounded-xl p-4 text-center text-xs text-white/30 flex items-center justify-center max-w-lg">
                💡 Hover over any timeline node to reveal the year's prediction.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
