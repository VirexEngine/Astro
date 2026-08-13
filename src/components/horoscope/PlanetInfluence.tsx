import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PlanetMetric {
  planetName: string;
  symbol: string;
  metricLabel: string;
  influenceValue: number;
  color: string;
  glow: string;
}

interface PlanetInfluenceProps {
  influences: PlanetMetric[];
}

export const PlanetInfluence: React.FC<PlanetInfluenceProps> = ({ influences }) => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6 overflow-hidden">
      <div className="absolute top-0 left-10 w-24 h-24 bg-gold/3 rounded-full filter blur-2xl pointer-events-none" />

      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          <span>Planet Influence Metrics</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Planetary vibrations augmenting your emotional and intellectual fields today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {influences.map((inf) => (
          <motion.div
            key={inf.planetName}
            whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.25)' }}
            className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-3 relative cursor-default select-none"
            style={{
              boxShadow: `0 4px 15px ${inf.glow}`,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-serif text-gold-soft">{inf.symbol}</span>
              <span className="text-[10px] font-mono font-bold text-white">+{inf.influenceValue}%</span>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white leading-tight">{inf.planetName}</h4>
              <p className="text-[9px] text-white/40 mt-0.5">{inf.metricLabel}</p>
            </div>

            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${inf.influenceValue * 3}%` }} // Scale metric visual width
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${inf.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
