import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const SERVICES = [
  { title: 'Premium Kundli Report', desc: 'Get a 50+ page PDF analysis of your houses, dashas, and planetary metrics.', path: '/free-tools/kundli', icon: '🕉️' },
  { title: 'Compatibility Checker', desc: 'Compare celestial compatibility and daily synastry aspects.', path: '/free-tools/compatibility', icon: '💑' },
  { title: 'Palmistry Explorer', desc: 'Detailed lines and mounts interactive analysis of your hand contours.', path: '/services/palm-reading', icon: '✋' },
  { title: 'Numerology Report', desc: 'Identify core master numbers, expression potentials, and lucky targets.', path: '/free-tools/numerology', icon: '🔢' },
];

export const RelatedServices: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-base font-display font-medium text-white flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
          <span>Explore More Astrological Services</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Unlock deeper insights with our premium reports and calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {SERVICES.map((srv, idx) => (
          <Link
            key={idx}
            to={srv.path}
            className="block"
          >
            <motion.div
              whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.4)', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.05)' }}
              className="group rounded-2xl border border-white/5 bg-glass-dark p-5 transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-2xl select-none inline-block">{srv.icon}</span>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-gold transition-colors">
                  {srv.title}
                </h4>
                <p className="text-[11px] text-white/50 mt-1 leading-normal font-sans">
                  {srv.desc}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
