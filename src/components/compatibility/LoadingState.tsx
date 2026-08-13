import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon } from 'lucide-react';

interface LoadingStateProps {
  stageText: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ stageText }) => {
  return (
    <div className="w-full max-w-lg mx-auto py-16 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-glass-dark border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl">
      {/* Drifting star rings */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-gold/10 animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-purple/10 animate-spin-reverse" />
      </div>

      {/* Orbiting planet animation */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-8">
        {/* Sun center */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-gold to-amber-500 flex items-center justify-center shadow-lg shadow-gold/25 z-10"
        >
          <Sparkles className="w-6 h-6 text-cosmos animate-pulse" />
        </motion.div>

        {/* Orbiting Moon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center shadow-md shadow-white/30">
            <Moon className="w-3.5 h-3.5 text-cosmos" />
          </div>
        </motion.div>

        {/* Orbiting Venus */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple flex items-center justify-center shadow-md shadow-purple/30">
            <span className="text-[10px] text-white">♀</span>
          </div>
        </motion.div>
      </div>

      {/* Loading Message */}
      <h3 className="text-xl font-display font-medium text-white mb-2 tracking-wide">
        Calculating Cosmic Alignment
      </h3>
      
      {/* Current stage text */}
      <motion.p
        key={stageText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-mono text-gold tracking-wide h-6 select-none"
      >
        {stageText}
      </motion.p>

      {/* Subtitle */}
      <p className="text-xs text-white/40 max-w-[280px] mt-4 leading-relaxed font-sans">
        Consulting your planetary positions, birth charts, and numerology grids to reveal compatibility.
      </p>
    </div>
  );
};
