import React from 'react';
import { motion } from 'framer-motion';
import { RemedyDetail } from '../../types/compatibility';
import { HeartHandshake, Lock } from 'lucide-react';

interface RemediesCardProps {
  remedies: RemedyDetail[];
}

export const RemediesCard: React.FC<RemediesCardProps> = ({ remedies }) => {
  const [hasPass, setHasPass] = React.useState(false);

  React.useEffect(() => {
    try {
      const bookings = localStorage.getItem('grahganit_user_bookings');
      if (bookings && JSON.parse(bookings).length > 0) setHasPass(true);
    } catch (e) {}
  }, []);

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-gold" />
          <span>Suggested Cosmic Remedies</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Auspicious materials, actions, and mantras to harmonize minor frictions in your synastry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {remedies.map((rem, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.25)' }}
            className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-2 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl select-none">{rem.icon}</span>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">
                  {rem.title}
                </h4>
                <p className="text-sm font-semibold text-white mt-0.5">{rem.value}</p>
              </div>
            </div>
            <p className="text-[11px] text-white/60 leading-normal font-sans mt-2 border-t border-white/5 pt-2">
              {rem.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Freemium Lock Card or Unlocked Banner */}
      {hasPass ? (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <span>✓</span>
            <span>DEEP SYNASTRY & NADI DOSH NEUTRALIZATION UNLOCKED VIA CONSULTATION PASS</span>
          </div>
          <p className="text-white/80 leading-relaxed font-sans">
            Your 36-Guna Ashtakoota score and planetary Dasha synchronization are active. Specific Yagya remedies and Mangal Dosh mitigations are reviewed during your live 1-on-1 session with Acharyaa Smita Mishra.
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/40 border border-amber-500/30 text-center space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" /> Deep Synastry & Nadi Dosh Neutralization Locked
          </div>
          <h4 className="text-base font-display text-gradient-gold font-medium">
            Unlock 36-Guna Ashtakoota Deep Remedies & Kundali Matching
          </h4>
          <p className="text-xs text-white/70 max-w-lg mx-auto leading-relaxed">
            Need definitive marriage compatibility assessment? Book a private 1-on-1 consultation with Acharyaa Smita Mishra to receive personalized Mangal & Nadi Dosh Yagya remedies.
          </p>
          <div className="pt-1 flex flex-wrap justify-center gap-3">
            <a
              href="/booking"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-semibold text-xs shadow-xl hover:scale-105 transition-all"
            >
              Book Marriage Consultation ✦
            </a>
            <a
              href="/services/marriage-matching"
              className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-semibold text-xs hover:bg-white/10 transition-all"
            >
              Full Compatibility Report
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
