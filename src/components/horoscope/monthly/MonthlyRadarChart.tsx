import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

interface RadarScore {
  category: string;
  score: number;
}

interface MonthlyRadarChartProps {
  scores: RadarScore[];
}

export const MonthlyRadarChart: React.FC<MonthlyRadarChartProps> = ({ scores }) => {
  const [hoveredScore, setHoveredScore] = useState<RadarScore | null>(null);

  const CX = 100;
  const CY = 100;
  const MaxRadius = 70;

  // Geometry: 8 items -> 45 degrees step (0.785 radians)
  const getCoordinates = (idx: number, score: number) => {
    const angle = (idx * 45 * Math.PI) / 180 - Math.PI / 2; // Offset by -90 deg so first category sits at the top
    const r = (score / 100) * MaxRadius;
    return {
      x: CX + r * Math.cos(angle),
      y: CY + r * Math.sin(angle),
    };
  };

  // Build the polygon path points string
  const pointsStr = scores
    .map((s, i) => {
      const pt = getCoordinates(i, s.score);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6 items-center">
      <div className="w-full flex justify-between items-center border-b border-white/5 pb-3">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-gold" />
            <span>Monthly Life Area Balance</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Synergy ratings plotted across 8 primary lifecycle dimensions.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[340px] aspect-square relative select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            {/* Area gradient */}
            <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Draw Concentric Grid Octagons */}
          {[20, 40, 60, 80, 100].map((gridScore) => {
            const gridPoints = scores
              .map((_, idx) => {
                const pt = getCoordinates(idx, gridScore);
                return `${pt.x},${pt.y}`;
              })
              .join(' ');
            return (
              <polygon
                key={gridScore}
                points={gridPoints}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Radial Lines from Center */}
          {scores.map((s, idx) => {
            const pt = getCoordinates(idx, 100);
            return (
              <line
                key={idx}
                x1={CX}
                y1={CY}
                x2={pt.x}
                y2={pt.y}
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Data Area Polygon */}
          <polygon
            points={pointsStr}
            fill="url(#radarGrad)"
            stroke="#D4AF37"
            strokeWidth="1.2"
            style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.25))' }}
          />

          {/* Data Points Interactive Targets */}
          {scores.map((s, idx) => {
            const pt = getCoordinates(idx, s.score);
            const labelPt = getCoordinates(idx, 114);
            const isHovered = hoveredScore?.category === s.category;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredScore(s)}
                onMouseLeave={() => setHoveredScore(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 3.5 : 2}
                  fill={isHovered ? '#FFF' : '#D4AF37'}
                  className="transition-all duration-150"
                />

                {/* Dimension label text */}
                <text
                  x={labelPt.x}
                  y={labelPt.y + (idx === 0 ? -2 : idx === 4 ? 2 : 0)} // Minor offsets for top/bottom labels
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="5.5"
                  fill={isHovered ? '#D4AF37' : 'rgba(255,255,255,0.5)'}
                  className="font-mono uppercase tracking-wider transition-colors duration-150"
                >
                  {s.category}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Center Tooltip display */}
        <AnimatePresence>
          {hoveredScore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f1122]/95 border border-gold/30 rounded-xl px-3 py-1.5 text-center text-[10px] pointer-events-none shadow-xl"
            >
              <span className="font-semibold text-white block uppercase tracking-widest">{hoveredScore.category}</span>
              <span className="font-mono text-gold font-bold mt-0.5 block">{hoveredScore.score}% Synergy</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
