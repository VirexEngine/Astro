import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const TOOLS = [
  {
    title: 'Free Kundli Chart',
    desc: 'Generate your full Vedic birth chart and planetary degrees.',
    path: '/free-tools/kundli',
    icon: '🕉️',
  },
  {
    title: 'Palmistry Explorer',
    desc: 'Inspect the lines, mounts, and symbols mapped on your hands.',
    path: '/services/palm-reading',
    icon: '✋',
  },
  {
    title: 'Numerology Report',
    desc: 'Analyze your Life Path, Destiny, and Soul numbers.',
    path: '/free-tools/numerology',
    icon: '🔢',
  },
  {
    title: 'Daily Horoscope',
    desc: 'Get your customized daily transit forecasts.',
    path: '/free-tools/daily-horoscope',
    icon: '🔮',
  },
];

export const RelatedTools: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-lg font-display font-medium text-white flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Explore More Free Calculators</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Continue your cosmic self-exploration with other Vedic tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {TOOLS.map((tool, idx) => (
          <Link
            key={idx}
            to={tool.path}
            className="block"
          >
            <motion.div
              whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.4)', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.05)' }}
              className="group rounded-2xl border border-white/5 bg-glass-dark p-5 transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <motion.span 
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    className="text-2xl select-none inline-block"
                  >
                    {tool.icon}
                  </motion.span>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-gold transition-colors">
                  {tool.title}
                </h4>
                <p className="text-[11px] text-white/50 mt-1 leading-normal font-sans">
                  {tool.desc}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
