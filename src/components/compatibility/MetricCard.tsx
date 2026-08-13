import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Landmark, MessageSquare, Flame, Coins, Users } from 'lucide-react';

interface MetricCardProps {
  id: string;
  name: string;
  score: number;
  description: string;
  influence: string;
}

const getMetricIcon = (id: string) => {
  const cn = "w-5 h-5 text-gold shrink-0";
  switch (id) {
    case 'love': return <Heart className={cn} />;
    case 'marriage': return <Landmark className={cn} />;
    case 'communication': return <MessageSquare className={cn} />;
    case 'passion': return <Flame className={cn} />;
    case 'financial': return <Coins className={cn} />;
    case 'family': return <Users className={cn} />;
    default: return <Heart className={cn} />;
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  name,
  score,
  description,
  influence,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3, borderColor: 'rgba(212, 175, 55, 0.35)' }}
      className="bg-glass-dark border border-white/5 rounded-2xl p-5 backdrop-blur-md transition-all flex flex-col justify-between gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center">
            {getMetricIcon(id)}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{name}</h4>
            <p className="text-[10px] font-mono text-white/40 uppercase mt-0.5 tracking-wider">
              {influence}
            </p>
          </div>
        </div>

        {/* Score Pill */}
        <div className="text-right">
          <span className="text-lg font-mono font-bold text-gold">{score}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
          className="h-full bg-gradient-to-r from-purple via-gold to-amber-500 rounded-full"
        />
      </div>

      <p className="text-xs text-white/60 leading-relaxed font-sans mt-1">
        {description}
      </p>
    </motion.div>
  );
};
