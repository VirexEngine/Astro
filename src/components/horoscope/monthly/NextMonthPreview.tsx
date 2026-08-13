import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CalendarDays } from 'lucide-react';

export const NextMonthPreview: React.FC = () => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <CalendarDays className="w-4.5 h-4.5 text-gold animate-pulse" />
            <span>Next Month Teaser (September 2026)</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            A sneak peek at the shifting cosmic alignments and planetary transits for the upcoming month.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Love & Family', score: '↑ Favorable', desc: 'Venus enters Libra, stabilizing home bonds and emotional speech.', color: 'text-emerald-400' },
          { label: 'Career & Ventures', score: '↑ Favorable', desc: 'Jupiter Direct boosts authority, interviews, and project initiatives.', color: 'text-emerald-400' },
          { label: 'Finance & Wealth', score: '↓ Caution', desc: 'Saturn aspects require careful audits and delayed contract signatures.', color: 'text-red-400' },
          { label: 'Health & Vitality', score: '↑ Favorable', desc: 'Sun enters Virgo, enhancing daily hygiene and physical recovery.', color: 'text-emerald-400' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3 }}
            className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-2 relative overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-semibold text-white">{item.label}</h4>
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${item.color}`}>
                {item.score}
              </span>
            </div>
            <p className="text-[10px] text-white/45 leading-normal mt-1 font-sans">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
