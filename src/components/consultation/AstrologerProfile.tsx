import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Star, Users, Globe } from 'lucide-react';

export const AstrologerProfile: React.FC = () => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col md:flex-row gap-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple/10 rounded-full filter blur-xl pointer-events-none" />

      {/* Avatar/Photo Column */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-28 h-28 rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-purple via-cosmos to-gold/30 shadow-2xl relative overflow-hidden select-none">
          <img
            src="/images/AcharyaaSmitaMishra.jpg"
            alt="Acharyaa Smita Mishra"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="mt-2.5 flex items-center gap-1 bg-gold/10 border border-gold/20 rounded-full px-2.5 py-0.5 text-gold text-[10px] font-mono font-semibold">
          <Star className="w-3 h-3 fill-gold" />
          <span>4.9 Astrologer Rating</span>
        </div>
      </div>

      {/* Details Column */}
      <div className="flex-1 flex flex-col gap-3 text-xs text-white/70 font-sans">
        <div>
          <h3 className="text-xl font-display font-medium text-white leading-tight">Acharyaa Smita Mishra</h3>
          <p className="text-[10px] text-gold font-mono uppercase tracking-wider mt-0.5">Senior Vedic Consultant &amp; Astrologer</p>
        </div>

        <p className="leading-relaxed">
          With over 15 years of deep study in Vedic Astrology, Kundli analysis, and planetary transits, Acharyaa Smita Mishra has guided thousands of seekers worldwide through complex life crossroads, career transitions, and relationship matching.
        </p>

        {/* Info Grid Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/5 pt-3.5 mt-1">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gold shrink-0" />
            <div>
              <span className="text-[9px] text-white/40 block leading-none font-mono">EXPERIENCE</span>
              <span className="font-semibold text-white mt-1 block">15+ Years</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gold shrink-0" />
            <div>
              <span className="text-[9px] text-white/40 block leading-none font-mono">CONSULTATIONS</span>
              <span className="font-semibold text-white mt-1 block">12,000+ Sessions</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gold shrink-0" />
            <div>
              <span className="text-[9px] text-white/40 block leading-none font-mono">LANGUAGES</span>
              <span className="font-semibold text-white mt-1 block">English, Hindi</span>
            </div>
          </div>
        </div>

        {/* Specializations list */}
        <div className="border-t border-white/5 pt-3.5 flex flex-col gap-1.5">
          <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-1">
            Focus Areas &amp; Specializations
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['Vedic Astrology', 'Kundli matching', 'Career Transitions', 'Business & Wealth Guidance', 'Karmic Remedies'].map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-white/3 border border-white/5 text-[9px] text-white/80">
                • {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
