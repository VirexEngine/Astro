import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Award, Users } from 'lucide-react';

export const ConsultationHero: React.FC = () => {
  const scrollToWizard = () => {
    document.getElementById('booking-wizard-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text-center max-w-3xl mb-4 relative z-10 flex flex-col items-center">
      {/* Background glow behind hero text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-purple/10 rounded-full filter blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/25 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-widest mb-4"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Astrology Consultations</span>
      </motion.div>

      <h1 className="text-3xl md:text-5xl font-display font-medium text-gradient-gold mb-3 leading-tight tracking-wide">
        Book Your Personal Consultation
      </h1>

      <p className="text-xs md:text-sm text-foreground/60 leading-relaxed max-w-xl mx-auto mb-6 font-sans">
        Connect with an experienced Vedic astrologer for personalized guidance on your career, relationships, finances, health, and life path.
      </p>

      {/* Trust credentials badges */}
      <div className="flex flex-wrap justify-center gap-3 text-[10px] font-mono text-white/50 mb-8">
        <span className="bg-white/3 border border-white/10 rounded-full px-3.5 py-1.5 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-gold" />
          <span>⭐ 4.9 Rating</span>
        </span>
        <span className="bg-white/3 border border-white/10 rounded-full px-3.5 py-1.5 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-gold" />
          <span>12,000+ Sessions</span>
        </span>
        <span className="bg-white/3 border border-white/10 rounded-full px-3.5 py-1.5 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Secure &amp; Private</span>
        </span>
      </div>

      <button
        onClick={scrollToWizard}
        className="relative group overflow-hidden bg-gradient-to-r from-purple via-gold to-purple/85 text-white font-semibold text-xs uppercase tracking-widest py-3.5 px-7 rounded-2xl shadow-xl shadow-purple/15 hover:shadow-gold/20 active:scale-97 transition-all cursor-pointer border border-gold/25"
      >
        {/* Shimmer bar */}
        <motion.div
          className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
          initial={{ x: '-150%' }}
          animate={{ x: '350%' }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
        <span>Book Your Session</span>
      </button>
    </div>
  );
};
