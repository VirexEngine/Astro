import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Sparkles } from 'lucide-react';

interface TimelineStep {
  label: string;
  emoji: string;
  desc: string;
}

const STEPS: TimelineStep[] = [
  { label: 'Book Session', emoji: '📅', desc: 'Choose a service type, date, and input your birth details.' },
  { label: 'Confirmation', emoji: '✉️', desc: 'Receive immediate email and Google Meet credentials.' },
  { label: 'Chart Prep', emoji: '🔮', desc: 'Acharyaa Smita Mishra calculates your houses, transits, and dashas.' },
  { label: 'Consultation', emoji: '👥', desc: 'Join the live 1-on-1 video call for direct astrological guidance.' },
  { label: 'Vedic Report', emoji: '📄', desc: 'Receive a personalized PDF detailing transit timelines and remedies.' },
  { label: 'Follow-up Summary', emoji: '✨', desc: 'Get an AI-generated meeting summary to recap key advice.' },
];

export const Timeline: React.FC = () => {
  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-base font-display font-medium text-white flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>What Happens Next (Your Journey)</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Step-by-step roadmap from initial booking to the final consultation reports.
        </p>
      </div>

      <div className="relative pt-6 pb-2">
        {/* Horizontal Connector Line */}
        <div className="absolute top-12 left-6 right-6 h-0.5 bg-white/5 -translate-y-1/2 z-0 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center text-center gap-2 select-none group"
            >
              {/* Circle Emoji Node */}
              <div className="w-11 h-11 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-lg shadow-md group-hover:border-gold/30 transition-colors duration-200">
                {step.emoji}
              </div>

              {/* Title */}
              <h4 className="text-xs font-semibold text-white group-hover:text-gold transition-colors">
                {step.label}
              </h4>

              {/* Description */}
              <p className="text-[10px] text-white/40 leading-relaxed max-w-[140px] mx-auto md:max-w-none font-sans">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
