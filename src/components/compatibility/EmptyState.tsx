import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

export const EmptyState: React.FC = () => {
  const features = [
    { name: 'Planetary Synastry Map', desc: 'Aspect alignments between charts' },
    { name: 'Vedic Element Harmony', desc: 'Fire, Earth, Air, Water balance' },
    { name: 'Life Path Numerology', desc: 'Generational core frequency match' },
    { name: '5-Year Destiny Timeline', desc: 'Relationship phases (2026 - 2030)' },
    { name: 'Suggested Karmic Remedies', desc: 'Mantras, yantras & gemstones' },
    { name: 'AI Deep-Dive Insights', desc: 'Strengths, challenges & advice' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl mx-auto py-10 px-8 flex flex-col items-center bg-glass-dark border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple/10 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold/5 rounded-full filter blur-2xl pointer-events-none" />

      <div className="w-12 h-12 rounded-xl border border-gold/20 flex items-center justify-center bg-gold/5 mb-4 animate-pulse">
        <Compass className="w-6 h-6 text-gold animate-spin-slow" />
      </div>

      <h3 className="text-lg font-display font-medium text-white mb-2">
        Unlock Your Cosmic Compatibility Report
      </h3>
      <p className="text-xs text-white/50 max-w-sm leading-relaxed mb-6 text-center font-sans">
        Chart your Vedic planets, numerology frequencies, and relationship dynamics.
      </p>

      {/* Feature Preview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full border-t border-white/5 pt-6 mb-6">
        {features.map((feat, idx) => (
          <div key={idx} className="flex gap-2.5 items-start p-3 rounded-xl bg-white/2 border border-white/5 text-left">
            <span className="text-gold text-xs mt-0.5">★</span>
            <div>
              <p className="text-xs font-semibold text-white/90">{feat.name}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-gold uppercase bg-gold/5 border border-gold/20 rounded-full px-3 py-1">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Vedic Secrets Await</span>
      </div>
    </motion.div>
  );
};
