import React from 'react';
import { motion } from 'framer-motion';
import { palmistryItems, PalmistryItem } from './palmData';

interface PalmLinesProps {
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export const PalmLines: React.FC<PalmLinesProps> = ({
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}) => {
  const lineItems = palmistryItems.filter((item) => item.category === 'lines');

  return (
    <g id="palm-lines-group">
      {lineItems.map((item) => {
        const isSelected = selectedId === item.id;
        const isHovered = hoveredId === item.id;
        const isActive = isSelected || isHovered;

        return (
          <g key={item.id} className="cursor-pointer">
            {/* 1. Invisible thick interactive hit target path for easy hovering/clicking */}
            <path
              d={item.path}
              fill="none"
              stroke="transparent"
              strokeWidth={24}
              strokeLinecap="round"
              onMouseEnter={() => onHover(item.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(item.id)}
            />

            {/* 2. Base subtle line (anatomical reference) */}
            <path
              d={item.path}
              fill="none"
              stroke="#D4AF37"
              strokeWidth={3}
              strokeLinecap="round"
              className="opacity-20 transition-opacity duration-300 pointer-events-none"
            />

            {/* 3. Active glowing animated trace line */}
            {isActive && (
              <>
                {/* Glow filter path */}
                <motion.path
                  d={item.path}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth={6}
                  strokeLinecap="round"
                  className="blur-sm pointer-events-none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: isSelected ? 0.8 : 0.4 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                {/* Core sharp gold path */}
                <motion.path
                  d={item.path}
                  fill="none"
                  stroke="#F3E5AB"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  className="pointer-events-none filter drop-shadow-[0_0_4px_rgba(212,175,55,0.8)]"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />

                {/* 4. Particle traveling along the active line */}
                <circle
                  r={3.5}
                  fill="#FFF"
                  className="pointer-events-none filter drop-shadow-[0_0_6px_#D4AF37]"
                >
                  <animateMotion
                    path={item.path}
                    dur={isSelected ? "2.5s" : "4s"}
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
          </g>
        );
      })}
    </g>
  );
};
