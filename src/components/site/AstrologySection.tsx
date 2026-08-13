import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Planet = {
  key: string; name: string; sym: string; color: string; orbit: number; size: number; dur: number;
  significance: string; traits: string[]; strengths: string[]; weaknesses: string[];
  zodiac: string; colors: string[]; remedies: string[];
};

const PLANETS: Planet[] = [
  { key: "sun", name: "Sun (Surya)", sym: "☉", color: "#F59E0B", orbit: 0, size: 64, dur: 0,
    significance: "The soul, ego, vitality and life-force. Represents the self and authority.",
    traits: ["Confident", "Radiant", "Leading"], strengths: ["Willpower", "Charisma", "Vitality"],
    weaknesses: ["Pride", "Arrogance", "Domineering"], zodiac: "Leo",
    colors: ["Gold", "Amber", "Ruby"], remedies: ["Surya Namaskar at dawn", "Offer water to the Sun", "Wear ruby (traditional)"] },
  { key: "moon", name: "Moon (Chandra)", sym: "☽", color: "#E9D5FF", orbit: 18, size: 44, dur: 20,
    significance: "The mind, emotions, mother, and intuition. Governs mood and memory.",
    traits: ["Intuitive", "Sensitive", "Nurturing"], strengths: ["Empathy", "Imagination", "Emotional depth"],
    weaknesses: ["Moodiness", "Overthinking", "Attachment"], zodiac: "Cancer",
    colors: ["Pearl white", "Silver", "Cream"], remedies: ["Meditate on full moon", "Offer white flowers", "Wear pearl (traditional)"] },
  { key: "mercury", name: "Mercury (Budh)", sym: "☿", color: "#5EEAD4", orbit: 22, size: 34, dur: 12,
    significance: "Intellect, speech, learning and commerce. The messenger of the cosmos.",
    traits: ["Curious", "Analytical", "Communicative"], strengths: ["Wit", "Adaptability", "Logic"],
    weaknesses: ["Restlessness", "Sarcasm", "Indecision"], zodiac: "Gemini, Virgo",
    colors: ["Emerald", "Sea green"], remedies: ["Practice mindful speech", "Feed green fodder to cows", "Chant Budh mantra"] },
  { key: "venus", name: "Venus (Shukra)", sym: "♀", color: "#F0ABFC", orbit: 30, size: 40, dur: 24,
    significance: "Love, beauty, art, luxury and relationships. The great benefic.",
    traits: ["Artistic", "Loving", "Refined"], strengths: ["Charm", "Creativity", "Diplomacy"],
    weaknesses: ["Indulgence", "Vanity", "Attachment to comfort"], zodiac: "Taurus, Libra",
    colors: ["Rose pink", "Ivory"], remedies: ["Support the arts", "Offer white sweets on Friday", "Wear diamond (traditional)"] },
  { key: "mars", name: "Mars (Mangal)", sym: "♂", color: "#F87171", orbit: 40, size: 42, dur: 28,
    significance: "Energy, courage, discipline and action. The warrior planet.",
    traits: ["Bold", "Driven", "Protective"], strengths: ["Courage", "Discipline", "Vitality"],
    weaknesses: ["Aggression", "Impatience", "Impulsiveness"], zodiac: "Aries, Scorpio",
    colors: ["Red", "Crimson"], remedies: ["Chant Hanuman Chalisa", "Physical practice / martial arts", "Wear coral (traditional)"] },
  { key: "jupiter", name: "Jupiter (Guru)", sym: "♃", color: "#FCD34D", orbit: 50, size: 52, dur: 36,
    significance: "Wisdom, expansion, dharma, teachers and fortune. The greater benefic.",
    traits: ["Wise", "Generous", "Optimistic"], strengths: ["Knowledge", "Faith", "Growth"],
    weaknesses: ["Excess", "Over-optimism", "Dogma"], zodiac: "Sagittarius, Pisces",
    colors: ["Saffron", "Yellow"], remedies: ["Study scripture", "Respect elders and teachers", "Wear yellow sapphire (traditional)"] },
  { key: "saturn", name: "Saturn (Shani)", sym: "♄", color: "#94A3B8", orbit: 60, size: 48, dur: 48,
    significance: "Discipline, karma, longevity and hard-earned wisdom. The great teacher.",
    traits: ["Disciplined", "Patient", "Structured"], strengths: ["Perseverance", "Responsibility", "Depth"],
    weaknesses: ["Melancholy", "Rigidity", "Delay"], zodiac: "Capricorn, Aquarius",
    colors: ["Deep blue", "Black"], remedies: ["Serve the underprivileged", "Fast on Saturdays", "Wear blue sapphire (traditional)"] },
  { key: "rahu", name: "Rahu", sym: "☊", color: "#A78BFA", orbit: 70, size: 36, dur: 60,
    significance: "The north lunar node — obsession, illusion, worldly ambition and disruption.",
    traits: ["Ambitious", "Innovative", "Restless"], strengths: ["Vision", "Originality", "Persistence"],
    weaknesses: ["Confusion", "Obsession", "Anxiety"], zodiac: "Aquarius (traditional co-ruler)",
    colors: ["Indigo", "Smoky grey"], remedies: ["Meditation on breath", "Charity to the marginalized", "Chant Rahu mantra"] },
  { key: "ketu", name: "Ketu", sym: "☋", color: "#FDE68A", orbit: 80, size: 34, dur: 68,
    significance: "The south lunar node — detachment, spirituality, moksha and past-life wisdom.",
    traits: ["Introspective", "Spiritual", "Mystical"], strengths: ["Insight", "Non-attachment", "Perception"],
    weaknesses: ["Isolation", "Confusion", "Escapism"], zodiac: "Scorpio (traditional co-ruler)",
    colors: ["Ash grey", "Multi"], remedies: ["Meditation and silence", "Serve dogs", "Chant Ketu mantra"] },
];

export function AstrologySection() {
  const [active, setActive] = useState<Planet | null>(null);
  return (
    <section id="astrology" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Astrology" title="The living solar system" sub="Every planet carries a story. Hover to feel its glow — click to open its wisdom." />

        <div className="relative mt-16 aspect-square w-full max-w-[720px] mx-auto">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.30_0.15_290/0.35),transparent_65%)] blur-2xl" />

          {/* Sun in the center */}
          <button
            onClick={() => setActive(PLANETS[0])}
            className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-gold text-3xl font-display text-cosmos animate-pulse-glow hover:scale-110 transition"
          >
            ☉
          </button>

          {PLANETS.slice(1).map((p) => (
            <motion.div
              key={p.key}
              animate={{ rotate: 360 }}
              transition={{ duration: p.dur, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 rounded-full border border-white/5"
              style={{ width: `${p.orbit}%`, height: `${p.orbit}%`, transform: "translate(-50%,-50%)" }}
            >
              <button
                onClick={() => setActive(p)}
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full font-display transition hover:scale-125"
                style={{
                  width: p.size, height: p.size,
                  background: `radial-gradient(circle at 30% 30%, white, ${p.color} 60%, oklch(0.20_0.05_268))`,
                  color: "#0F172A",
                  boxShadow: `0 0 24px ${p.color}, inset -6px -6px 12px rgba(0,0,0,0.3)`,
                }}
              >
                <span className="text-sm">{p.sym}</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Planet grid quick links */}
        <div className="mt-16 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {PLANETS.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p)}
              className="glass group rounded-2xl p-4 text-center transition hover:scale-105 hover:glow-gold"
            >
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full" style={{ background: p.color, color: "#0F172A" }}>
                {p.sym}
              </div>
              <div className="mt-2 text-xs text-foreground/80">{p.name.split(" ")[0]}</div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <PlanetModal planet={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function PlanetModal({ planet, onClose }: { planet: Planet; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-cosmos/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-3xl p-8"
      >
        <button onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass hover:glow-gold">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full text-2xl" style={{ background: planet.color, color: "#0F172A", boxShadow: `0 0 30px ${planet.color}` }}>
            {planet.sym}
          </div>
          <div>
            <h3 className="font-display text-3xl">{planet.name}</h3>
            <p className="text-sm text-foreground/60">Zodiac: {planet.zodiac}</p>
          </div>
        </div>
        <p className="mt-6 text-foreground/80 leading-relaxed">{planet.significance}</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoBlock title="Personality" items={planet.traits} />
          <InfoBlock title="Strengths" items={planet.strengths} />
          <InfoBlock title="Weaknesses" items={planet.weaknesses} />
          <InfoBlock title="Associated colors" items={planet.colors} />
        </div>
        <div className="mt-4 rounded-2xl border border-gold/25 bg-gold/5 p-4">
          <div className="text-xs uppercase tracking-widest text-gold-soft">Traditional remedies</div>
          <ul className="mt-2 space-y-1 text-sm text-foreground/80">
            {planet.remedies.map((r) => <li key={r}>• {r}</li>)}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="text-xs uppercase tracking-widest text-foreground/50">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => <span key={i} className="rounded-full bg-white/5 px-3 py-1 text-xs">{i}</span>)}
      </div>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-gold-soft">
        <span className="h-1 w-1 rounded-full bg-gold" /> {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl text-gradient-cosmic">{title}</h2>
      {sub && <p className="mt-4 text-foreground/70">{sub}</p>}
    </motion.div>
  );
}
