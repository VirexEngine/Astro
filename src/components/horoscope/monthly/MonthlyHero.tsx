import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CalendarDays } from 'lucide-react';

interface MonthlyHeroProps {
  dateText: string;
}

export const MonthlyHero: React.FC<MonthlyHeroProps> = ({ dateText }) => {
  return (
    <div className="text-center max-w-2xl mb-2 relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/25 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-widest mb-3"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Monthly Cosmic Roadmap</span>
      </motion.div>

      <h1 className="text-3xl md:text-5xl font-display font-medium text-gradient-gold mb-3 leading-tight tracking-wide">
        Strategic Cosmic Forecast
      </h1>

      <p className="text-xs md:text-sm text-foreground/60 leading-relaxed max-w-xl mx-auto mb-4 font-sans">
        Understand the major planetary energies shaping your month and plan ahead with strategic confidence.
      </p>

      <div className="flex justify-center items-center gap-3 text-xs font-mono text-white/50">
        <span className="bg-white/3 border border-white/10 rounded-full px-3.5 py-1 flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-gold" />
          <span>{dateText}</span>
        </span>
      </div>
    </div>
  );
};
