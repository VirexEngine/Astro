import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LuckyItem {
  label: string;
  value: string;
  icon: string;
}

interface LuckyInsightsProps {
  items: LuckyItem[];
}

export const LuckyInsights: React.FC<LuckyInsightsProps> = ({ items }) => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-5">
      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Lucky Celestial Insights</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Cosmic vibrations aligned with your astrological houses today.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.25)' }}
            className="p-4 bg-white/3 border border-white/5 rounded-2xl flex items-center gap-3 relative cursor-default select-none transition-all"
          >
            <span className="text-2xl select-none">{item.icon}</span>
            <div>
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-white/40 leading-none">
                {item.label}
              </h4>
              <p className="text-sm font-semibold text-white mt-1 leading-snug">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
