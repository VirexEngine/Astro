import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star } from 'lucide-react';

interface TimelineNode {
  time: string;
  emoji: string;
  status: 'Excellent' | 'Good' | 'Average' | 'Avoid' | 'Reflection';
  title: string;
  desc: string;
}

interface DailyTimelineProps {
  nodes: TimelineNode[];
}

const getStatusColor = (status: TimelineNode['status']) => {
  switch (status) {
    case 'Excellent': return 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400';
    case 'Good': return 'bg-blue-500/10 border-blue-500/35 text-blue-400';
    case 'Average': return 'bg-yellow-500/10 border-yellow-500/35 text-yellow-400';
    case 'Avoid': return 'bg-red-500/10 border-red-500/35 text-red-400';
    case 'Reflection': return 'bg-purple/10 border-purple/35 text-purple-400';
  }
};

export const DailyTimeline: React.FC<DailyTimelineProps> = ({ nodes }) => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold" />
          <span>Today's Cosmic Timeline</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Hour-by-hour forecast mapping today's transit peaks to help you plan your activities.
        </p>
      </div>

      <div className="relative pt-4 pb-2">
        {/* Horizontal Line connector */}
        <div className="absolute top-12 left-6 right-6 h-0.5 bg-white/5 -translate-y-1/2 z-0 hidden sm:block" />

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 relative z-10">
          {nodes.map((node, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center text-center gap-2 cursor-pointer select-none group"
            >
              <span className="text-[10px] font-mono text-white/40 leading-none">{node.time}</span>

              {/* Emoji Node */}
              <div className="w-10 h-10 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-base shadow-md group-hover:border-gold/30 transition-colors">
                {node.emoji}
              </div>

              {/* Status Badge */}
              <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getStatusColor(node.status)}`}>
                {node.status}
              </span>

              {/* Title & Desc */}
              <div className="mt-1">
                <h4 className="text-xs font-semibold text-white group-hover:text-gold transition-colors">{node.title}</h4>
                <p className="text-[10px] text-white/40 mt-1 leading-normal max-w-[120px] mx-auto sm:max-w-none">
                  {node.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
