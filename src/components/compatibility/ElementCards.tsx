import React from 'react';
import { motion } from 'framer-motion';
import { ElementCompatibility } from '../../types/compatibility';
import { Flame, Trees, Wind, Droplets, Sparkles } from 'lucide-react';

interface ElementCardsProps {
  elements: ElementCompatibility;
}

const getElementIcon = (el: string) => {
  const cn = "w-5 h-5 text-white";
  switch (el) {
    case 'Fire': return <Flame className={cn} />;
    case 'Earth': return <Trees className={cn} />;
    case 'Air': return <Wind className={cn} />;
    case 'Water': return <Droplets className={cn} />;
    default: return <Sparkles className={cn} />;
  }
};

const getElementStyle = (el: string) => {
  switch (el) {
    case 'Fire': return 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400';
    case 'Earth': return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400';
    case 'Air': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
    case 'Water': return 'from-cyan-500/20 to-indigo-500/20 border-cyan-500/30 text-cyan-400';
    default: return 'from-purple/20 to-gold/20 border-gold/30 text-gold';
  }
};

export const ElementCards: React.FC<ElementCardsProps> = ({ elements }) => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6 overflow-hidden">
      {/* Element matching floating particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: elements.particleColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div>
        <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          <span>Vedic Elemental Harmony</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          How your primary astrological elements interact and blend.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center z-10">
        {/* Element A Card */}
        <div className={`p-5 rounded-2xl border bg-gradient-to-br flex flex-col items-center text-center gap-3 ${getElementStyle(elements.elementA)}`}>
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center animate-pulse">
            {getElementIcon(elements.elementA)}
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">{elements.elementA}</h4>
            <span className="text-[10px] opacity-60">Partner I Primary</span>
          </div>
        </div>

        {/* Center Harmony Score Card */}
        <div className="flex flex-col items-center justify-center text-center gap-1.5 bg-white/3 border border-white/5 rounded-2xl p-5">
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Elemental Score</span>
          <span className="text-3xl font-mono font-bold text-gold">{elements.score}%</span>
          <span className="text-[10px] bg-gold/10 border border-gold/15 rounded-full px-2 py-0.5 text-gold uppercase tracking-wider font-mono">
            {elements.score >= 80 ? 'Highly Harmonious' : 'Friction Blend'}
          </span>
        </div>

        {/* Element B Card */}
        <div className={`p-5 rounded-2xl border bg-gradient-to-br flex flex-col items-center text-center gap-3 ${getElementStyle(elements.elementB)}`}>
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center animate-pulse">
            {getElementIcon(elements.elementB)}
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">{elements.elementB}</h4>
            <span className="text-[10px] opacity-60">Partner II Primary</span>
          </div>
        </div>
      </div>

      <div className="bg-white/3 border border-white/5 rounded-xl p-4 text-xs text-white/70 leading-relaxed font-sans z-10">
        <strong className="text-white block mb-1">Elemental Relationship Dynamics:</strong>
        {elements.description}
      </div>
    </div>
  );
};
