import React from 'react';
import { motion } from 'framer-motion';

interface ZodiacSign {
  name: string;
  sym: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dateRange: string;
}

const SIGNS: ZodiacSign[] = [
  { name: 'Aries', sym: '♈', element: 'Fire', dateRange: 'Mar 21 - Apr 19' },
  { name: 'Taurus', sym: '♉', element: 'Earth', dateRange: 'Apr 20 - May 20' },
  { name: 'Gemini', sym: '♊', element: 'Air', dateRange: 'May 21 - Jun 20' },
  { name: 'Cancer', sym: '♋', element: 'Water', dateRange: 'Jun 21 - Jul 22' },
  { name: 'Leo', sym: '♌', element: 'Fire', dateRange: 'Jul 23 - Aug 22' },
  { name: 'Virgo', sym: '♍', element: 'Earth', dateRange: 'Aug 23 - Sep 22' },
  { name: 'Libra', sym: '♎', element: 'Air', dateRange: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', sym: '♏', element: 'Water', dateRange: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', sym: '♐', element: 'Fire', dateRange: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', sym: '♑', element: 'Earth', dateRange: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', sym: '♒', element: 'Air', dateRange: 'Jan 20 - Feb 18' },
  { name: 'Pisces', sym: '♓', element: 'Water', dateRange: 'Feb 19 - Mar 20' },
];

const getElementColor = (el: ZodiacSign['element']) => {
  switch (el) {
    case 'Fire': return 'bg-orange-500/10 border-orange-500/35 text-orange-400';
    case 'Earth': return 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400';
    case 'Air': return 'bg-blue-500/10 border-blue-500/35 text-blue-400';
    case 'Water': return 'bg-purple/10 border-purple/35 text-purple-400';
  }
};

interface ZodiacCardProps {
  activeSign: string;
  onSelectSign: (name: string) => void;
}

export const ZodiacCard: React.FC<ZodiacCardProps> = ({
  activeSign,
  onSelectSign,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-center sm:text-left">
        <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase block ml-1 mb-1">
          Select Your Sign
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5 w-full">
        {SIGNS.map((sign) => {
          const isActive = activeSign === sign.name;
          return (
            <motion.div
              key={sign.name}
              whileHover={{ y: -3 }}
              onClick={() => onSelectSign(sign.name)}
              className={`p-4 rounded-2xl border bg-glass-dark backdrop-blur-md flex flex-col items-center text-center gap-1.5 cursor-pointer relative overflow-hidden transition-all duration-300 ${
                isActive
                  ? 'border-gold shadow-[0_0_15px_rgba(212,175,55,0.12)] bg-gold/5'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Highlight active dot */}
              {isActive && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              )}

              <span className={`text-2xl font-serif leading-none ${isActive ? 'text-gold' : 'text-white/60'}`}>
                {sign.sym}
              </span>

              <div>
                <h4 className={`text-xs font-semibold leading-tight ${isActive ? 'text-gold' : 'text-white'}`}>
                  {sign.name}
                </h4>
                <span className="text-[8px] text-white/40 block mt-0.5 font-mono">{sign.dateRange}</span>
              </div>

              <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border ${getElementColor(sign.element)}`}>
                {sign.element}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
export { SIGNS };
