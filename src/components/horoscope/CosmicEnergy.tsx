import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Award, Smile } from 'lucide-react';

interface CosmicEnergyProps {
  score: number;
  activeMood: string;
  onChangeMood: (mood: string) => void;
  metrics: {
    energy: number;
    confidence: number;
    luck: number;
    emotional: number;
  };
}

const MOODS = [
  { id: 'Happy', emoji: '😊', glow: 'rgba(234,179,8,0.2)' },
  { id: 'Calm', emoji: '😐', glow: 'rgba(56,189,248,0.2)' },
  { id: 'Focused', emoji: '🧠', glow: 'rgba(168,85,247,0.2)' },
  { id: 'Romantic', emoji: '💖', glow: 'rgba(236,72,153,0.2)' },
  { id: 'Anxious', emoji: '😰', glow: 'rgba(244,63,94,0.2)' },
  { id: 'Inspired', emoji: '✨', glow: 'rgba(251,191,36,0.2)' },
];

export const CosmicEnergy: React.FC<CosmicEnergyProps> = ({
  score,
  activeMood,
  onChangeMood,
  metrics,
}) => {
  // SVG drawing specs for gauge
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <Smile className="w-4 h-4 text-gold animate-bounce" />
          <span>Today's Cosmic Mood &amp; Energy</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Select your current mood to align today's guidance coordinates.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        {/* Left: Circular gauge */}
        <div className="w-36 h-36 relative flex items-center justify-center shrink-0">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="6"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.4))' }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">Energy</span>
            <span className="text-2xl font-mono font-bold text-white leading-none mt-1">{score}%</span>
            <div className="text-[10px] text-gold mt-1.5 tracking-tight select-none">★★★★★</div>
          </div>
        </div>

        {/* Right: Individual bars */}
        <div className="flex-1 w-full flex flex-col gap-3">
          {[
            { label: 'Vitality Energy', val: metrics.energy, icon: Zap, color: 'from-orange-500 to-amber-400' },
            { label: 'Self Confidence', val: metrics.confidence, icon: Award, color: 'from-purple to-indigo-500' },
            { label: 'Destiny Luck', val: metrics.luck, icon: Sparkles, color: 'from-gold to-yellow-400' },
            { label: 'Emotional Balance', val: metrics.emotional, icon: Heart, color: 'from-rose-500 to-pink-400' },
          ].map((bar) => {
            const Icon = bar.icon;
            return (
              <div key={bar.label} className="text-xs">
                <div className="flex justify-between items-center text-white/70 mb-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Icon className="w-3.5 h-3.5 text-white/40" />
                    <span>{bar.label}</span>
                  </span>
                  <span className="font-mono font-bold text-white/90">{bar.val}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.val}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood Selector Grid */}
      <div className="border-t border-white/5 pt-4">
        <label className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-3">
          Current Vibration (Mood)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {MOODS.map((mood) => {
            const isActive = activeMood === mood.id;
            return (
              <motion.button
                key={mood.id}
                type="button"
                whileHover={{ y: -2 }}
                onClick={() => onChangeMood(mood.id)}
                className={`py-2 px-2.5 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gold/10 border-gold/40 text-gold shadow-md'
                    : 'bg-white/3 border-white/5 text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  boxShadow: isActive ? `0 0 12px ${mood.glow}` : 'none',
                }}
              >
                <span className="text-base select-none">{mood.emoji}</span>
                <span>{mood.id}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
