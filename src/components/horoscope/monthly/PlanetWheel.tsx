import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle } from 'lucide-react';

interface PlanetDetail {
  name: string;
  sanskrit: string;
  symbol: string;
  effect: string;
  focus: string;
  challenge: string;
  color: string;
  glow: string;
}

const PLANETS: PlanetDetail[] = [
  { name: 'Sun', sanskrit: 'Surya', symbol: '☉', effect: 'Vitality, leadership, and public recognition are highly energized.', focus: 'Career Visibility', challenge: 'Avoid pride in office meetings.', color: '#F59E0B', glow: 'rgba(245,158,11,0.2)' },
  { name: 'Moon', sanskrit: 'Chandra', symbol: '☽', effect: 'Governs emotional shifts, home harmony, and intuitive dreams.', focus: 'Inner Peace', challenge: 'Mood waves around the Full Moon.', color: '#F8FAFC', glow: 'rgba(255,255,255,0.15)' },
  { name: 'Mercury', sanskrit: 'Budh', symbol: '☿', effect: 'Rules analytical details, document logs, negotiations, and contracts.', focus: 'Communications', challenge: 'Retrograde slips and delays.', color: '#34D399', glow: 'rgba(52,211,153,0.2)' },
  { name: 'Venus', sanskrit: 'Shukra', symbol: '♀', effect: 'Brings aesthetic joy, romantic alignment, and smooth financial transactions.', focus: 'Love & Harmony', challenge: 'Avoid relationship rigidity.', color: '#FEF3C7', glow: 'rgba(254,243,199,0.2)' },
  { name: 'Mars', sanskrit: 'Mangal', symbol: '♂', effect: 'Ignites physical energy, courage, work velocity, and decisive actions.', focus: 'Initiatives', challenge: 'Prevent aggressive debates.', color: '#EF4444', glow: 'rgba(239,68,68,0.2)' },
  { name: 'Jupiter', sanskrit: 'Guru', symbol: '♃', effect: 'Governs long-term expansion, fortune, philosophical wisdom, and wealth.', focus: 'Financial Growth', challenge: 'Over-expansion and scaling too fast.', color: '#FDE047', glow: 'rgba(253,224,71,0.2)' },
  { name: 'Saturn', sanskrit: 'Shani', symbol: '♄', effect: 'Brings structural discipline, karmic lessons, organization, and patience.', focus: 'Stability', challenge: 'Slow delays and backlog work.', color: '#94A3B8', glow: 'rgba(148,163,184,0.2)' },
];

export const PlanetWheel: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetDetail>(PLANETS[5]); // Default to Jupiter (Planet of the Month)

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-gold animate-pulse" />
            <span>Monthly Planetary Influences</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Select a planet to decrypt its strategic impact for the upcoming 30 days.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        {/* Left: Orbital Selector */}
        <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
          {/* Orbital path rings */}
          <div className="absolute w-52 h-52 rounded-full border border-dashed border-white/5 pointer-events-none" />
          <div className="absolute w-36 h-36 rounded-full border border-white/5 pointer-events-none" />

          {/* Central sun globe */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-purple flex items-center justify-center text-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] select-none z-0">
            ☀️
          </div>

          {/* Planets arranged in a circle */}
          {PLANETS.map((planet, idx) => {
            const angle = (idx * 360) / PLANETS.length;
            const rad = (angle * Math.PI) / 180;
            const r = 90; // Orbital radius
            const x = r * Math.cos(rad);
            const y = r * Math.sin(rad);

            const isSelected = selectedPlanet.name === planet.name;

            return (
              <motion.button
                key={planet.name}
                type="button"
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedPlanet(planet)}
                className={`absolute w-9 h-9 rounded-full border flex items-center justify-center text-base cursor-pointer transition-all z-10 ${
                  isSelected
                    ? 'bg-gold/15 border-gold text-gold shadow-md'
                    : 'bg-white/3 border-white/5 text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  left: `calc(50% + ${x}px - 18px)`,
                  top: `calc(50% + ${y}px - 18px)`,
                  boxShadow: isSelected ? `0 0 10px ${planet.glow}` : 'none',
                }}
              >
                <span className="font-serif select-none">{planet.symbol}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Right: Active Detail Card */}
        <div className="flex-1 w-full bg-white/3 border border-white/5 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center min-h-[220px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full filter blur-xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPlanet.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4 text-xs text-white/70 leading-relaxed font-sans"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="text-2xl font-serif text-gold-soft">{selectedPlanet.symbol}</span>
                <div>
                  <h4 className="text-sm font-semibold text-white leading-tight">
                    {selectedPlanet.sanskrit} ({selectedPlanet.name})
                  </h4>
                  <span className="text-[10px] text-gold font-mono uppercase tracking-wider block mt-0.5">
                    Strategic Focus: {selectedPlanet.focus}
                  </span>
                </div>
              </div>

              <div>
                <strong className="text-white block mb-0.5">Monthly Transits Effect:</strong>
                {selectedPlanet.effect}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3 mt-1 text-[11px]">
                <div>
                  <span className="text-emerald-400 font-bold block mb-0.5">Best Activities</span>
                  {selectedPlanet.focus} exercises, networking.
                </div>
                <div>
                  <span className="text-red-400 font-bold block mb-0.5">Caution / Challenge</span>
                  {selectedPlanet.challenge}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
