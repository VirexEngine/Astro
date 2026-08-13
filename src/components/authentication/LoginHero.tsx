import React from 'react';
import { motion } from 'framer-motion';

export const LoginHero: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center relative w-1/2 min-h-[80vh] overflow-hidden bg-cosmos border-r border-white/5 rounded-l-3xl">
      {/* Drifting Nebula background glow */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-purple/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Rotating SVG Zodiac Wheel backdrop */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
        className="w-[420px] h-[420px] border border-dashed border-white/5 rounded-full flex items-center justify-center relative select-none opacity-45 pointer-events-none"
      >
        <div className="absolute w-[360px] h-[360px] rounded-full border border-white/10" />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-white/5 border-dashed" />
        
        {/* Zodiac glyph positions representation */}
        {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, idx) => {
          const angle = (idx * 360) / 12;
          const rad = (angle * Math.PI) / 180;
          const r = 180;
          const x = r * Math.cos(rad);
          const y = r * Math.sin(rad);

          return (
            <span
              key={symbol}
              className="absolute text-sm text-gold-soft font-serif"
              style={{
                left: `calc(50% + ${x}px - 10px)`,
                top: `calc(50% + ${y}px - 10px)`,
              }}
            >
              {symbol}
            </span>
          );
        })}
      </motion.div>

      {/* Concentric orbital rings and central glowing orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-purple/30 to-gold/10 filter blur-xl animate-pulse" />
      </div>

      {/* Foreground Quote and Brand Titles */}
      <div className="absolute text-center max-w-sm px-6 flex flex-col gap-3.5 z-10">
        <span className="text-[10px] font-mono tracking-widest text-gold uppercase">GrahGanit Engine (ग्रह गणित)</span>
        <h2 className="text-3xl font-display font-medium text-gradient-gold tracking-wide leading-tight">
          "Every soul has a cosmic blueprint."
        </h2>
        <p className="text-xs text-white/50 leading-relaxed font-sans max-w-xs mx-auto">
          Understand the planetary maps compiled at the exact moment of your birth.
        </p>
      </div>
    </div>
  );
};
export default LoginHero;
