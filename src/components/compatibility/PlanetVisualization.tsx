import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanetPosition } from '../../utils/astrology';
import { PlanetAspect } from '../../types/compatibility';
import { Sparkles, Info } from 'lucide-react';

interface PlanetVisualizationProps {
  planetsA: PlanetPosition[];
  planetsB: PlanetPosition[];
  aspects: PlanetAspect[];
}

const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries' }, { symbol: '♉', name: 'Taurus' },
  { symbol: '♊', name: 'Gemini' }, { symbol: '♋', name: 'Cancer' },
  { symbol: '♌', name: 'Leo' }, { symbol: '♍', name: 'Virgo' },
  { symbol: '♎', name: 'Libra' }, { symbol: '♏', name: 'Scorpio' },
  { symbol: '♐', name: 'Sagittarius' }, { symbol: '♑', name: 'Capricorn' },
  { symbol: '♒', name: 'Aquarius' }, { symbol: '♓', name: 'Pisces' }
];

export const PlanetVisualization: React.FC<PlanetVisualizationProps> = ({
  planetsA,
  planetsB,
  aspects,
}) => {
  // Rotate values
  const [rotA, setRotA] = useState(0);
  const [rotB, setRotB] = useState(0);
  const [hoveredAspect, setHoveredAspect] = useState<PlanetAspect | null>(null);

  // Slow rotation animation loop
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setRotA((prev) => (prev + 0.05) % 360);
      setRotB((prev) => (prev - 0.035) % 360);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const rWheel = 100; // Radius of outer ring
  const rPlanets = 68; // Radius of planet placement ring

  // Helper to find absolute coordinate in the SVG
  const getCoordinates = (
    centerX: number,
    centerY: number,
    deg: number,
    rot: number,
    radius: number
  ) => {
    const finalRad = ((deg + rot) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(finalRad),
      y: centerY + radius * Math.sin(finalRad),
    };
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Planetary Aspects Map</span>
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Visualizing synastry connections between your birth charts.
          </p>
        </div>

        {/* Hover aspect info */}
        <div className="text-xs text-gold font-mono mt-2 sm:mt-0 flex items-center gap-1.5 bg-gold/5 border border-gold/15 rounded-lg px-3 py-1">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Hover lines to reveal aspects</span>
        </div>
      </div>

      <div className="relative w-full aspect-[2/1] min-h-[220px] max-h-[320px]">
        {/* SVG Drawing Canvas */}
        <svg viewBox="0 0 600 300" className="w-full h-full select-none">
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="aspect-excellent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="aspect-good" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="aspect-challenging" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Draw connecting Aspect Lines */}
          {aspects.map((aspect, idx) => {
            const pA = planetsA.find((p) => p.name === aspect.planetA);
            const pB = planetsB.find((p) => p.name === aspect.planetB);
            if (!pA || !pB) return null;

            // Coordinates for endpoints
            const ptA = getCoordinates(150, 150, pA.degree, rotA, rPlanets);
            const ptB = getCoordinates(450, 150, pB.degree, rotB, rPlanets);

            const isHovered = hoveredAspect?.planetA === aspect.planetA && hoveredAspect?.planetB === aspect.planetB;
            const strokeColor = 
              aspect.harmony === 'Excellent' ? 'url(#aspect-excellent)' :
              aspect.harmony === 'Challenging' ? 'url(#aspect-challenging)' : 'url(#aspect-good)';

            return (
              <g key={`aspect-${idx}`} className="cursor-pointer">
                {/* Thick invisible interaction target */}
                <line
                  x1={ptA.x}
                  y1={ptA.y}
                  x2={ptB.x}
                  y2={ptB.y}
                  stroke="transparent"
                  strokeWidth={12}
                  onMouseEnter={() => setHoveredAspect(aspect)}
                  onMouseLeave={() => setHoveredAspect(null)}
                />
                
                {/* Visual Line */}
                <line
                  x1={ptA.x}
                  y1={ptA.y}
                  x2={ptB.x}
                  y2={ptB.y}
                  stroke={strokeColor}
                  strokeWidth={isHovered ? 2.5 : 1}
                  strokeDasharray={aspect.harmony === 'Challenging' ? '3,3' : 'none'}
                  className="transition-all duration-300"
                />

                {/* Animated pulsing dot on active aspects */}
                {isHovered && (
                  <circle r={3} fill="#FFF">
                    <animateMotion
                      path={`M ${ptA.x},${ptA.y} L ${ptB.x},${ptB.y}`}
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* WHEEL A (Partner One) Group */}
          <g transform="translate(0, 0)">
            {/* Outer Wheel Rim */}
            <circle cx="150" cy="150" r={rWheel} fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth={1} />
            <circle cx="150" cy="150" r={rWheel - 15} fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth={0.5} />
            <circle cx="150" cy="150" r="30" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth={0.5} />
            
            {/* Rotating elements of Wheel A */}
            <g transform={`rotate(${rotA}, 150, 150)`}>
              {/* Dividers */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={150 + (rWheel - 15) * Math.cos(angle)}
                    y1={150 + (rWheel - 15) * Math.sin(angle)}
                    x2={150 + rWheel * Math.cos(angle)}
                    y2={150 + rWheel * Math.sin(angle)}
                    stroke="rgba(212, 175, 55, 0.15)"
                    strokeWidth={0.5}
                  />
                );
              })}
              {/* Zodiac Signs */}
              {ZODIAC_SIGNS.map((sign, i) => {
                const angle = ((i * 30 + 15) * Math.PI) / 180;
                const tx = 150 + (rWheel - 7) * Math.cos(angle);
                const ty = 150 + (rWheel - 7) * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={tx}
                    y={ty + 2}
                    textAnchor="middle"
                    fill="rgba(212, 175, 55, 0.45)"
                    className="text-[7px] font-serif"
                    transform={`rotate(${i * 30 + 15 + 90}, ${tx}, ${ty})`}
                  >
                    {sign.symbol}
                  </text>
                );
              })}
              {/* Planets markers */}
              {planetsA.map((planet) => {
                const pt = getCoordinates(150, 150, planet.degree, 0, rPlanets);
                return (
                  <g key={planet.name}>
                    <circle cx={pt.x} cy={pt.y} r={2.5} fill="#D4AF37" />
                    <text x={pt.x} y={pt.y + 2.5} textAnchor="middle" fill="#FFF" className="text-[8px] font-serif">
                      {planet.symbol}
                    </text>
                  </g>
                );
              })}
            </g>
            <text x="150" y="153" textAnchor="middle" fill="rgba(255,255,255,0.4)" className="text-[8px] font-mono tracking-widest">
              PARTNER I
            </text>
          </g>

          {/* WHEEL B (Partner Two) Group */}
          <g transform="translate(0, 0)">
            {/* Outer Wheel Rim */}
            <circle cx="450" cy="150" r={rWheel} fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth={1} />
            <circle cx="450" cy="150" r={rWheel - 15} fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth={0.5} />
            <circle cx="450" cy="150" r="30" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth={0.5} />

            {/* Rotating elements of Wheel B */}
            <g transform={`rotate(${rotB}, 450, 150)`}>
              {/* Dividers */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={450 + (rWheel - 15) * Math.cos(angle)}
                    y1={150 + (rWheel - 15) * Math.sin(angle)}
                    x2={450 + rWheel * Math.cos(angle)}
                    y2={150 + rWheel * Math.sin(angle)}
                    stroke="rgba(212, 175, 55, 0.15)"
                    strokeWidth={0.5}
                  />
                );
              })}
              {/* Zodiac Signs */}
              {ZODIAC_SIGNS.map((sign, i) => {
                const angle = ((i * 30 + 15) * Math.PI) / 180;
                const tx = 450 + (rWheel - 7) * Math.cos(angle);
                const ty = 150 + (rWheel - 7) * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={tx}
                    y={ty + 2}
                    textAnchor="middle"
                    fill="rgba(212, 175, 55, 0.45)"
                    className="text-[7px] font-serif"
                    transform={`rotate(${i * 30 + 15 + 90}, ${tx}, ${ty})`}
                  >
                    {sign.symbol}
                  </text>
                );
              })}
              {/* Planets markers */}
              {planetsB.map((planet) => {
                const pt = getCoordinates(450, 150, planet.degree, 0, rPlanets);
                return (
                  <g key={planet.name}>
                    <circle cx={pt.x} cy={pt.y} r={2.5} fill="#D4AF37" />
                    <text x={pt.x} y={pt.y + 2.5} textAnchor="middle" fill="#FFF" className="text-[8px] font-serif">
                      {planet.symbol}
                    </text>
                  </g>
                );
              })}
            </g>
            <text x="450" y="153" textAnchor="middle" fill="rgba(255,255,255,0.4)" className="text-[8px] font-mono tracking-widest">
              PARTNER II
            </text>
          </g>
        </svg>

        {/* Display aspect details on hover */}
        <AnimatePresence>
          {hoveredAspect && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-cosmos/95 border border-gold/30 rounded-xl px-4 py-2 text-center text-xs text-white max-w-[260px] shadow-lg backdrop-blur-md"
            >
              <div className="font-semibold text-gold mb-0.5 flex justify-center items-center gap-1.5">
                <span>
                  {hoveredAspect.planetASymbol} {hoveredAspect.planetA}
                </span>
                <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-wider font-mono">
                  {hoveredAspect.aspectName}
                </span>
                <span>
                  {hoveredAspect.planetB} {hoveredAspect.planetBSymbol}
                </span>
              </div>
              <p className="text-[10px] text-white/70 leading-normal">{hoveredAspect.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
