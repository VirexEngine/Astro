import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeader } from "./AstrologySection";

type Mount = {
  key: string; name: string; x: number; y: number;
  interpretation: string; qualities: string[]; symbols: string[]; planet: string;
};

const MOUNTS: Mount[] = [
  { key: "jupiter", name: "Mount of Jupiter", x: 26, y: 22, planet: "Jupiter",
    interpretation: "Traditionally linked to leadership, ambition and self-confidence.",
    qualities: ["Leadership", "Faith", "Ambition"], symbols: ["Authority", "Growth"] },
  { key: "saturn", name: "Mount of Saturn", x: 42, y: 14, planet: "Saturn",
    interpretation: "Reflects discipline, patience and depth of character.",
    qualities: ["Wisdom", "Responsibility", "Solitude"], symbols: ["Time", "Karma"] },
  { key: "apollo", name: "Mount of Apollo", x: 58, y: 18, planet: "Sun",
    interpretation: "Associated with creativity, art and public recognition.",
    qualities: ["Creativity", "Radiance", "Success"], symbols: ["Beauty", "Fame"] },
  { key: "mercury", name: "Mount of Mercury", x: 74, y: 26, planet: "Mercury",
    interpretation: "Governs communication, commerce and cleverness.",
    qualities: ["Wit", "Speech", "Business"], symbols: ["Messenger", "Trade"] },
  { key: "mars-upper", name: "Upper Mount of Mars", x: 78, y: 44, planet: "Mars",
    interpretation: "Signifies moral courage, endurance and calm under fire.",
    qualities: ["Courage", "Endurance", "Composure"], symbols: ["Warrior", "Strength"] },
  { key: "moon", name: "Mount of Moon", x: 72, y: 68, planet: "Moon",
    interpretation: "Reveals imagination, intuition and emotional depth.",
    qualities: ["Imagination", "Empathy", "Dreaming"], symbols: ["Tides", "Reflection"] },
  { key: "venus", name: "Mount of Venus", x: 30, y: 70, planet: "Venus",
    interpretation: "Speaks of love, sensuality, warmth and vitality.",
    qualities: ["Love", "Warmth", "Beauty"], symbols: ["Heart", "Bloom"] },
  { key: "mars-lower", name: "Lower Mount of Mars", x: 22, y: 48, planet: "Mars",
    interpretation: "Physical courage, resistance and the drive to act.",
    qualities: ["Bravery", "Drive", "Resilience"], symbols: ["Shield", "Flame"] },
];

export function PalmSection() {
  const [active, setActive] = useState<Mount | null>(null);
  return (
    <section id="palm" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Palm Reading" title="The map on your hand" sub="Hover a mount to feel its aura — click to read its traditional meaning." />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          {/* Hand */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px]">
            <div className="absolute inset-0 rounded-[40%] bg-[radial-gradient(circle_at_50%_40%,oklch(0.40_0.15_290/0.35),transparent_65%)] blur-2xl" />
            <svg viewBox="0 0 100 130" className="relative h-full w-full drop-shadow-[0_20px_50px_rgba(109,40,217,0.4)]">
              <defs>
                <linearGradient id="palmGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="palmStroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
              </defs>
              {/* fingers */}
              <g fill="url(#palmGrad)" stroke="url(#palmStroke)" strokeWidth="0.4">
                <path d="M22,55 Q18,25 24,10 Q30,25 28,55 Z" />
                <path d="M38,50 Q34,15 42,4 Q50,15 46,50 Z" />
                <path d="M54,50 Q52,10 60,2 Q68,12 62,50 Z" />
                <path d="M70,55 Q68,18 76,14 Q82,25 78,55 Z" />
                <path d="M18,72 Q10,58 8,50 Q4,64 14,80 Z" />
                {/* palm */}
                <path d="M18,60 Q16,90 32,118 Q52,128 72,118 Q84,100 82,60 Q60,58 50,58 Q34,58 18,60 Z" />
              </g>
              {/* palm lines */}
              <g stroke="url(#palmStroke)" strokeWidth="0.3" fill="none" opacity="0.6">
                <path d="M22,68 Q40,78 74,72" />
                <path d="M22,72 Q40,88 60,110" />
                <path d="M28,72 Q42,96 40,120" />
              </g>
              {/* mount pins */}
              {MOUNTS.map((m) => (
                <g key={m.key} className="cursor-pointer" onClick={() => setActive(m)}>
                  <circle cx={m.x} cy={m.y + 20} r="2.4" fill="#F59E0B">
                    <animate attributeName="r" values="2.2;3.2;2.2" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={m.x} cy={m.y + 20} r="5" fill="none" stroke="#F59E0B" strokeWidth="0.3" opacity="0.6" />
                </g>
              ))}
            </svg>
          </div>

          {/* Mount list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOUNTS.map((m) => (
              <motion.button
                key={m.key}
                whileHover={{ y: -3 }}
                onClick={() => setActive(m)}
                className="glass rounded-2xl p-4 text-left transition hover:glow-gold"
              >
                <div className="text-xs uppercase tracking-widest text-gold-soft">{m.planet}</div>
                <div className="mt-1 font-display text-lg">{m.name}</div>
                <p className="mt-1 text-xs text-foreground/60 line-clamp-2">{m.interpretation}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-cosmos/70 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-lg rounded-3xl p-8"
            >
              <button onClick={() => setActive(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass">
                <X className="h-4 w-4" />
              </button>
              <div className="text-xs uppercase tracking-widest text-gold-soft">{active.planet}</div>
              <h3 className="mt-1 font-display text-3xl">{active.name}</h3>
              <p className="mt-4 text-foreground/80">{active.interpretation}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl glass p-4">
                  <div className="text-xs uppercase tracking-widest text-foreground/50">Qualities</div>
                  <div className="mt-2 flex flex-wrap gap-2">{active.qualities.map((q) => <span key={q} className="rounded-full bg-white/5 px-3 py-1 text-xs">{q}</span>)}</div>
                </div>
                <div className="rounded-2xl glass p-4">
                  <div className="text-xs uppercase tracking-widest text-foreground/50">Symbols</div>
                  <div className="mt-2 flex flex-wrap gap-2">{active.symbols.map((q) => <span key={q} className="rounded-full bg-white/5 px-3 py-1 text-xs">{q}</span>)}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
