import React from 'react';
import { motion } from 'framer-motion';
import { palmistryItems } from './palmData';

interface PalmLabelsProps {
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export const PalmLabels: React.FC<PalmLabelsProps> = ({
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}) => {
  const fingerItems = palmistryItems.filter((item) => item.category === 'fingers');
  const markingItems = palmistryItems.filter((item) => item.category === 'markings');

  return (
    <g id="palm-labels-group">
      {/* 1. Fingers Outlines & Regions */}
      {fingerItems.map((item) => {
        const isSelected = selectedId === item.id;
        const isHovered = hoveredId === item.id;
        const isActive = isSelected || isHovered;

        return (
          <g key={item.id} className="cursor-pointer">
            {/* Base interactive region */}
            <path
              d={item.path}
              fill="transparent"
              stroke={isActive ? "rgba(212, 175, 55, 0.4)" : "transparent"}
              strokeWidth={2}
              strokeDasharray="4,4"
              onMouseEnter={() => onHover(item.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(item.id)}
              className="transition-all duration-300 pointer-events-auto"
            />

            {/* Glowing effect inside the finger when hovered/selected */}
            {isActive && (
              <path
                d={item.path}
                fill="rgba(212, 175, 55, 0.05)"
                className="pointer-events-none"
              />
            )}

            {/* Subtle Label Marker Dot */}
            <circle
              cx={item.labelX}
              cy={item.labelY}
              r={isActive ? 6 : 4}
              fill={isActive ? "#FFF" : "#D4AF37"}
              stroke="#0B0B0F"
              strokeWidth={1.5}
              className="pointer-events-none filter drop-shadow-[0_0_4px_rgba(212,175,55,0.6)] transition-all duration-300"
            />
          </g>
        );
      })}

      {/* 2. Special Markings */}
      {markingItems.map((item) => {
        const isSelected = selectedId === item.id;
        const isHovered = hoveredId === item.id;
        const isActive = isSelected || isHovered;

        return (
          <g key={item.id} className="cursor-pointer">
            {/* Invisible thick path for hovering */}
            <path
              d={item.path}
              fill="none"
              stroke="transparent"
              strokeWidth={16}
              strokeLinecap="round"
              onMouseEnter={() => onHover(item.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(item.id)}
            />

            {/* Base subtle marking line */}
            <path
              d={item.path}
              fill="none"
              stroke="#D4AF37"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="opacity-30 pointer-events-none transition-opacity duration-300"
            />

             {/* Highlighted active glowing path */}
            {isActive && (
              <>
                <motion.path
                  d={item.path}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth={8}
                  strokeLinecap="round"
                  className="blur-sm pointer-events-none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.path
                  d={item.path}
                  fill="none"
                  stroke="#FFF"
                  strokeWidth={3}
                  strokeLinecap="round"
                  className="pointer-events-none filter drop-shadow-[0_0_6px_#D4AF37]"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </>
            )}

            {/* Active text marker label */}
            {isActive && (
              <g className="pointer-events-none">
                <rect
                  x={item.labelX - 60}
                  y={item.labelY - 32}
                  width={120}
                  height={22}
                  rx={4}
                  fill="rgba(11, 11, 15, 0.85)"
                  stroke="#D4AF37"
                  strokeWidth={1}
                />
                <text
                  x={item.labelX}
                  y={item.labelY - 17}
                  textAnchor="middle"
                  fill="#FFF"
                  className="text-[10px] font-sans tracking-wider uppercase font-semibold"
                >
                  {item.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};
