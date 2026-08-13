import React from 'react';
import { motion } from 'framer-motion';
import { palmistryItems } from './palmData';

interface PalmMountsProps {
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  handSide?: 'left' | 'right';
}

export const PalmMounts: React.FC<PalmMountsProps> = ({
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  handSide = 'left',
}) => {
  const mountItems = palmistryItems.filter((item) => item.category === 'mounts');

  return (
    <g id="palm-mounts-group">
      {mountItems.map((item) => {
        const isSelected = selectedId === item.id;
        const isHovered = hoveredId === item.id;
        const isActive = isSelected || isHovered;

        // Custom gradients for each mount based on planet theme
        const gradientId = `grad-${item.id}`;

        return (
          <g key={item.id} className="cursor-pointer">
            <defs>
              <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity={isSelected ? 0.48 : isHovered ? 0.32 : 0.08} />
                <stop offset="75%" stopColor="#D4AF37" stopOpacity={isSelected ? 0.18 : isHovered ? 0.1 : 0.01} />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 1. Base Mount Region Polygon */}
            <path
              d={item.path}
              fill={`url(#${gradientId})`}
              stroke={isActive ? "#D4AF37" : "rgba(212, 175, 55, 0.15)"}
              strokeWidth={isActive ? 3 : 1}
              onMouseEnter={() => onHover(item.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(item.id)}
              className="transition-all duration-500 ease-out"
            />

            {/* Glowing border underlay when active (softens polygon corners) */}
            {isActive && (
              <path
                d={item.path}
                fill="none"
                stroke="#D4AF37"
                strokeWidth={7}
                className="blur-xs opacity-50 pointer-events-none"
              />
            )}

            {/* 2. Interactive details when active */}
            {isActive && item.constellationPoints && (
              <g className="pointer-events-none">
                {/* Connect constellation dots with glowing lines */}
                {item.constellationPoints.map((pt, idx) => {
                  const nextPt = item.constellationPoints![(idx + 1) % item.constellationPoints!.length];
                  return (
                    <motion.line
                      key={`line-${idx}`}
                      x1={pt[0]}
                      y1={pt[1]}
                      x2={nextPt[0]}
                      y2={nextPt[1]}
                      stroke="rgba(212, 175, 55, 0.4)"
                      strokeWidth={1}
                      strokeDasharray="3,3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                  );
                })}

                {/* Draw star points of the constellation */}
                {item.constellationPoints.map((pt, idx) => (
                  <motion.circle
                    key={`star-${idx}`}
                    cx={pt[0]}
                    cy={pt[1]}
                    r={2.5}
                    fill="#FFF"
                    className="filter drop-shadow-[0_0_3px_#D4AF37]"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2 + (idx % 2),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </g>
            )}

            {/* 3. Planet symbol fading and rotating in when selected/hovered */}
            {item.planetSymbol && (
              <g
                className="pointer-events-none select-none"
                transform={handSide === 'right' ? `translate(${item.labelX * 2}, 0) scale(-1, 1)` : undefined}
              >
                {/* Underlay glow */}
                <motion.text
                  x={item.labelX}
                  y={item.labelY + 8}
                  textAnchor="middle"
                  fill="#D4AF37"
                  className="font-serif text-2xl opacity-35 filter blur-xs"
                  animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {item.planetSymbol}
                </motion.text>

                {/* Main symbol text */}
                <motion.text
                  x={item.labelX}
                  y={item.labelY + 8}
                  textAnchor="middle"
                  fill={isSelected ? "#FFF" : "#D4AF37"}
                  className="font-serif text-xl"
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: isSelected ? 1 : isHovered ? 0.75 : 0.35,
                    scale: isSelected ? 1.25 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.planetSymbol}
                </motion.text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};
