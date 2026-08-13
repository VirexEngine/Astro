import React from 'react';
import { motion } from 'framer-motion';
import { NumerologyDetail } from '../../types/compatibility';
import { Hash, Sparkles } from 'lucide-react';

interface NumerologyCardProps {
  numerology: {
    lifePath: NumerologyDetail;
    destiny: NumerologyDetail;
    soul: NumerologyDetail;
    expression: NumerologyDetail;
  };
}

export const NumerologyCard: React.FC<NumerologyCardProps> = ({ numerology }) => {
  const categories = [
    { key: 'lifePath', label: 'Life Path Number', data: numerology.lifePath, desc: 'Represents the core life path, journey, and major lessons.' },
    { key: 'destiny', label: 'Destiny (Expression)', data: numerology.destiny, desc: 'Dictates outward career achievements, capabilities, and goals.' },
    { key: 'soul', label: 'Soul Urge Number', data: numerology.soul, desc: 'Identifies deep emotional desires, inner dreams, and vulnerabilities.' },
    { key: 'expression', label: 'Expression Number', data: numerology.expression, desc: 'Governs daily social interactions and communication styles.' }
  ] as const;

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
          <Hash className="w-4 h-4 text-gold" />
          <span>Vedic Numerology Vibrations</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Comparing the numerical code patterns of both names and birth dates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat.key}
            whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.25)' }}
            className="p-5 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-semibold text-white">{cat.label}</h4>
                <p className="text-[10px] text-white/40 mt-0.5 leading-snug">{cat.desc}</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-gold/15 text-gold border border-gold/20 px-2 py-0.5 rounded uppercase">
                {cat.data.score}% Match
              </span>
            </div>

            {/* Score Grid Cards */}
            <div className="grid grid-cols-2 gap-3 my-1">
              <div className="bg-white/3 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-mono font-bold text-gradient-gold">{cat.data.partnerANumber}</span>
                <span className="text-[9px] text-white/50 mt-1">Partner I</span>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-mono font-bold text-gradient-gold">{cat.data.partnerBNumber}</span>
                <span className="text-[9px] text-white/50 mt-1">Partner II</span>
              </div>
            </div>

            {/* Harmony / Meaning explanation */}
            <div className="text-[11px] text-white/60 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/5">
              <span className="font-semibold text-gold block mb-0.5 uppercase tracking-wider font-mono">
                {cat.data.harmony}
              </span>
              {cat.data.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
