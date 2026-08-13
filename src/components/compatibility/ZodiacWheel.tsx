import React from 'react';
import { motion } from 'framer-motion';
import { PlanetPosition } from '../../utils/astrology';

interface ZodiacWheelProps {
  planets: PlanetPosition[];
  rotation: number;
  label: string;
}

const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries' }, { symbol: '♉', name: 'Taurus' },
  { symbol: '♊', name: 'Gemini' }, { symbol: '♋', name: 'Cancer' },
  { symbol: '♌', name: 'Leo' }, { symbol: '♍', name: 'Virgo' },
  { symbol: '♎', name: 'Libra' }, { symbol: '♏', name: 'Scorpio' },
  { symbol: '♐', name: 'Sagittarius' }, { symbol: '♑', name: 'Capricorn' },
  { symbol: '♒', name: 'Aquarius' }, { symbol: '♓', name: 'Pisces' }
];

export const ZodiacWheel: React.FC<ZodiacWheelProps> = ({
  planets,
  rotation,
  label,
}) => {
  const radius = 100;
  const center = 120;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-mono tracking-widest text-white/50 uppercase">{label}</span>
      <div className="relative w-64 h-64 border border-white/5 rounded-full p-2 bg-gradient-to-b from-white/3 to-transparent shadow-xl">
        <motion.svg
          viewBox="0 0 240 240"
          className="w-full h-full select-none"
          animate={{ rotate: rotation }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer circle ring */}
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth={1} />
          <circle cx={center} cy={center} r={radius - 18} fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth={0.5} />
          <circle cx={center} cy={center} r={35} fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth={1} />

          {/* Draw 12 Zodiac dividers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = center + (radius - 18) * Math.cos(angle);
            const y1 = center + (radius - 18) * Math.sin(angle);
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(212, 175, 55, 0.15)"
                strokeWidth={0.5}
              />
            );
          })}

          {/* Place Zodiac symbols */}
          {ZODIAC_SIGNS.map((sign, i) => {
            const angle = ((i * 30 + 15) * Math.PI) / 180;
            const tx = center + (radius - 9) * Math.cos(angle);
            const ty = center + (radius - 9) * Math.sin(angle);
            return (
              <text
                key={i}
                x={tx}
                y={ty + 3}
                textAnchor="middle"
                fill="rgba(212, 175, 55, 0.55)"
                className="text-[9px] font-serif"
                transform={`rotate(${i * 30 + 15 + 90}, ${tx}, ${ty})`}
              >
                {sign.symbol}
              </text>
            );
          })}

          {/* Draw Planetary positions */}
          {planets.map((planet) => {
            const angle = (planet.degree * Math.PI) / 180;
            const px = center + (radius - 32) * Math.cos(angle);
            const py = center + (radius - 32) * Math.sin(angle);

            return (
              <g key={planet.name} className="cursor-help">
                <circle
                  cx={px}
                  cy={py}
                  r={3.5}
                  fill="#D4AF37"
                  className="filter drop-shadow-[0_0_3px_#D4AF37]"
                />
                <text
                  x={px}
                  y={py + 3}
                  textAnchor="middle"
                  fill="#FFF"
                  className="text-[10px] font-serif filter drop-shadow-[0_0_2px_#000]"
                >
                  {planet.symbol}
                </text>
              </g>
            );
          })}
        </motion.svg>
      </div>
    </div>
  );
};
