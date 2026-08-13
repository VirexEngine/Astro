import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ZodiacSign {
  name: string;
  sym: string;
  element: 'fire' | 'earth' | 'air' | 'water';
}

const SIGNS: ZodiacSign[] = [
  { name: 'Aries', sym: '♈', element: 'fire' },
  { name: 'Taurus', sym: '♉', element: 'earth' },
  { name: 'Gemini', sym: '♊', element: 'air' },
  { name: 'Cancer', sym: '♋', element: 'water' },
  { name: 'Leo', sym: '♌', element: 'fire' },
  { name: 'Virgo', sym: '♍', element: 'earth' },
  { name: 'Libra', sym: '♎', element: 'air' },
  { name: 'Scorpio', sym: '♏', element: 'water' },
  { name: 'Sagittarius', sym: '♐', element: 'fire' },
  { name: 'Capricorn', sym: '♑', element: 'earth' },
  { name: 'Aquarius', sym: '♒', element: 'air' },
  { name: 'Pisces', sym: '♓', element: 'water' },
];

const ELEMENT_COLOR: Record<string, string> = {
  fire: '#F87171',
  earth: '#86EFAC',
  air: '#93C5FD',
  water: '#C4B5FD',
};

const polar = (cx: number, cy: number, r: number, angleDeg: number) => {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

interface InteractiveWheelProps {
  activeSign: string;
  onSelectSign: (name: string) => void;
}

export const InteractiveWheel: React.FC<InteractiveWheelProps> = ({
  activeSign,
  onSelectSign,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = SIGNS.findIndex((s) => s.name === activeSign);
  const targetRotation = -activeIndex * 30; // Rotate selected sign to the top

  const CX = 100;
  const CY = 100;
  const R_OUTER = 95;
  const R_ZODIAC = 82;
  const R_ORBIT = 60;
  const R_CORE = 18;

  return (
    <div className="w-full max-w-[340px] aspect-square relative select-none mx-auto flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.2)_0%,transparent_60%)] filter blur-xl pointer-events-none" />

      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="wheelCoreGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF" stopOpacity={0.8} />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#7C3AED" />
          </radialGradient>
          <filter id="wheelCoreGlow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer decorative ring */}
        <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.45" />

        {/* Dynamic Rotating Group */}
        <motion.g
          animate={{ rotate: targetRotation }}
          transition={{ type: 'spring', stiffness: 85, damping: 18 }}
          style={{ originX: '100px', originY: '100px' }}
        >
          {/* Sign separators */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30;
            const p1 = polar(CX, CY, R_OUTER, angle);
            const p2 = polar(CX, CY, R_ORBIT, angle);
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="rgba(212,175,55,0.15)"
                strokeWidth="0.4"
              />
            );
          })}

          {/* Orbit Line */}
          <circle cx={CX} cy={CY} r={R_ORBIT} fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="0.4" />

          {/* 12 Zodiac segments */}
          {SIGNS.map((sign, i) => {
            const angle = i * 30;
            const pos = polar(CX, CY, R_ZODIAC, angle);
            const isHovered = hoveredIndex === i;
            const isActive = activeSign === sign.name;
            const color = ELEMENT_COLOR[sign.element];

            return (
              <g
                key={sign.name}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectSign(sign.name)}
              >
                {/* Segment click/hover circle target */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="8.5"
                  fill={isActive ? 'rgba(212,175,55,0.12)' : isHovered ? 'rgba(255,255,255,0.05)' : 'rgba(15,12,32,0.7)'}
                  stroke={isActive ? '#D4AF37' : isHovered ? color : 'rgba(212,175,55,0.25)'}
                  strokeWidth={isActive ? '1' : isHovered ? '0.75' : '0.4'}
                  className="transition-all duration-200"
                />

                {/* Zodiac Symbol Icon glyph */}
                <text
                  x={pos.x}
                  y={pos.y + 0.3}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="8.5"
                  fill={isActive ? '#D4AF37' : isHovered ? color : 'rgba(255,255,255,0.75)'}
                  className="font-serif select-none"
                >
                  {sign.sym}
                </text>
              </g>
            );
          })}
        </motion.g>

        {/* Central Core Globe */}
        <circle cx={CX} cy={CY} r={R_CORE + 4} fill="rgba(124,58,237,0.12)" className="animate-pulse" />
        <circle
          cx={CX}
          cy={CY}
          r={R_CORE}
          fill="url(#wheelCoreGrad)"
          filter="url(#wheelCoreGlow)"
          className="cursor-pointer"
        />
        <text
          x={CX}
          y={CY + 0.5}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="13"
          fill="#FFF"
          className="font-serif select-none pointer-events-none filter drop-shadow-[0_0_3px_#FFF]"
        >
          ✦
        </text>
      </svg>

      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-white/35 uppercase pointer-events-none">
        Tap sign to spin
      </span>
    </div>
  );
};
