import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Sparkles, HelpCircle, AlertTriangle } from 'lucide-react';

interface CalendarEvent {
  date: string;
  day: number;
  title: string;
  desc: string;
  type: 'star' | 'heart' | 'money' | 'mind';
  intensity: number;
}

interface TransitCalendarProps {
  events: CalendarEvent[];
}

const getEventSymbol = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'star': return '⭐';
    case 'heart': return '❤️';
    case 'money': return '💰';
    case 'mind': return '🧠';
  }
};

const getEventGlow = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'star': return 'rgba(212,175,55,0.15)';
    case 'heart': return 'rgba(239,68,68,0.15)';
    case 'money': return 'rgba(16,185,129,0.15)';
    case 'mind': return 'rgba(124,58,237,0.15)';
  }
};

export const TransitCalendar: React.FC<TransitCalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(events[1]); // Default to first major event (Full Moon)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // August 2026 starts on Saturday (index 6, assuming Sun is 0)
  const blanks = Array.from({ length: 6 });
  const days = Array.from({ length: 31 }).map((_, i) => i + 1);
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <CalendarDays className="w-4.5 h-4.5 text-gold" />
            <span>Interactive Transit Calendar</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Apple-style calendar detailing transits, eclipses, and lunar shifts for August 2026.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Interactive Grid */}
        <div className="flex-1 w-full flex flex-col gap-2">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">
            {WEEKDAYS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Grid blocks */}
          <div className="grid grid-cols-7 gap-1.5 w-full">
            {/* Blanks */}
            {blanks.map((_, idx) => (
              <div key={`blank-${idx}`} className="aspect-square opacity-0 pointer-events-none" />
            ))}

            {/* Days */}
            {days.map((day) => {
              const matchedEvent = events.find((e) => e.day === day);
              const isSelected = selectedEvent?.day === day;
              
              // Calculate daily energy color intensity
              let dayBg = 'bg-white/2 hover:bg-white/5 border border-white/5';
              if (matchedEvent) {
                dayBg = isSelected
                  ? 'bg-gold/10 border-gold/45 text-gold shadow-md'
                  : 'bg-white/5 border-white/10 hover:border-gold/25 text-white/90';
              }

              return (
                <div
                  key={day}
                  onClick={() => matchedEvent && setSelectedEvent(matchedEvent)}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`aspect-square rounded-xl p-1.5 flex flex-col justify-between cursor-pointer transition-all relative ${dayBg}`}
                  style={{
                    boxShadow: isSelected && matchedEvent ? `0 0 10px ${getEventGlow(matchedEvent.type)}` : 'none',
                  }}
                >
                  <span className="text-[9px] font-mono text-white/50">{day}</span>
                  {matchedEvent && (
                    <span className="text-xs select-none self-end">
                      {getEventSymbol(matchedEvent.type)}
                    </span>
                  )}

                  {/* Tiny hover tooltip */}
                  {hoveredDay === day && matchedEvent && (
                    <div className="absolute bottom-[105%] left-1/2 -translate-x-1/2 bg-[#0f1122]/95 border border-white/10 rounded-lg p-2 text-center text-[9px] w-28 shadow-2xl z-20 pointer-events-none">
                      <span className="font-semibold text-white leading-none block">{matchedEvent.title}</span>
                      <span className="text-gold font-mono block mt-1">Click to view</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Event Details Panel */}
        <div className="w-full lg:w-72 bg-white/3 border border-white/5 rounded-2xl p-5 min-h-[220px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-full filter blur-xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.day}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3.5 text-xs text-white/70 leading-relaxed font-sans"
              >
                <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                  <span className="text-xl select-none">{getEventSymbol(selectedEvent.type)}</span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{selectedEvent.title}</h4>
                    <span className="text-[9px] font-mono text-gold-soft uppercase tracking-wider block mt-0.5">
                      Transit Alignment ({selectedEvent.date})
                    </span>
                  </div>
                </div>

                <p className="bg-black/20 p-3 rounded-xl border border-white/5">{selectedEvent.desc}</p>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/40 uppercase">
                  <span>Intensity:</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i < selectedEvent.intensity ? 'bg-gold' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-xs text-white/30 p-4 border border-dashed border-white/10 rounded-xl">
                💡 Select any transit marked on the calendar to view its cosmic analysis.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
