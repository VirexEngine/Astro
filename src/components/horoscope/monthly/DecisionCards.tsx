import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

interface DecisionRating {
  name: string;
  score: number;
}

interface DecisionCardsProps {
  decisions: DecisionRating[];
}

export const DecisionCards: React.FC<DecisionCardsProps> = ({ decisions }) => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-5">
      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-gold" />
          <span>Daily Decisions Favorability Index</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Planetary compatibility ratings mapped for key initiatives during this month.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {decisions.map((dec) => {
          // Convert 0-100 score to 5-star rating scale
          const starsCount = Math.round(dec.score / 20);

          return (
            <motion.div
              key={dec.name}
              whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.25)' }}
              className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col items-center text-center gap-2 relative cursor-default select-none transition-all"
            >
              <h4 className="text-[11px] font-semibold text-white uppercase tracking-wider font-mono">
                {dec.name}
              </h4>

              <span className="text-lg font-mono font-bold text-gold mt-1">{dec.score}%</span>

              <div className="flex gap-0.5 mt-1 select-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < starsCount ? 'text-gold fill-gold' : 'text-white/10'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
