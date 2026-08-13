import React from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  rating: string;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, rating }) => {
  // SVG Circle stroke dash calculations
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="relative w-52 h-52 flex items-center justify-center">
        {/* Background glow circle */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple/10 to-gold/10 filter blur-xl animate-pulse" />

        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90 select-none">
          {/* Static track circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={10}
          />
          {/* Animated score circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="url(#score-grad)"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
            transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
          />

          <defs>
            <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="60%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Score content inside circle */}
        <div className="absolute text-center flex flex-col items-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl font-mono font-bold text-white tracking-tight"
          >
            {score}%
          </motion.span>
          <span className="text-[10px] font-mono tracking-widest text-gold uppercase mt-1">
            Cosmic Match
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center"
      >
        <p className="text-xl font-display font-medium text-gradient-gold">
          {rating}
        </p>
      </motion.div>
    </div>
  );
};
