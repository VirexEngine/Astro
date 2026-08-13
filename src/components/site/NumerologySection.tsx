import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./AstrologySection";
import { DobInput } from "../common/DobInput";

type NumInfo = { n: number; planet: string; personality: string; strengths: string[]; weaknesses: string[]; career: string; compatible: number[] };

const NUMBERS: NumInfo[] = [
  { n: 1, planet: "Sun", personality: "The Leader — pioneering and self-driven.", strengths: ["Confident","Original","Focused"], weaknesses: ["Stubborn","Domineering"], career: "Founder, executive, athlete", compatible: [3,5,9] },
  { n: 2, planet: "Moon", personality: "The Diplomat — sensitive and harmonizing.", strengths: ["Empathic","Cooperative","Gentle"], weaknesses: ["Indecisive","Over-sensitive"], career: "Counselor, artist, mediator", compatible: [4,6,8] },
  { n: 3, planet: "Jupiter", personality: "The Communicator — expressive and joyful.", strengths: ["Creative","Optimistic","Sociable"], weaknesses: ["Scattered","Indulgent"], career: "Writer, teacher, performer", compatible: [1,5,9] },
  { n: 4, planet: "Rahu", personality: "The Builder — practical and grounded.", strengths: ["Disciplined","Loyal","Reliable"], weaknesses: ["Rigid","Skeptical"], career: "Engineer, planner, analyst", compatible: [2,6,8] },
  { n: 5, planet: "Mercury", personality: "The Explorer — curious and adaptable.", strengths: ["Versatile","Witty","Adventurous"], weaknesses: ["Restless","Impatient"], career: "Marketer, journalist, trader", compatible: [1,3,7] },
  { n: 6, planet: "Venus", personality: "The Nurturer — loving and harmonious.", strengths: ["Warm","Artistic","Caring"], weaknesses: ["Possessive","Indulgent"], career: "Designer, healer, host", compatible: [2,4,9] },
  { n: 7, planet: "Ketu", personality: "The Mystic — introspective and searching.", strengths: ["Analytical","Spiritual","Insightful"], weaknesses: ["Withdrawn","Skeptical"], career: "Researcher, mystic, scientist", compatible: [1,5,7] },
  { n: 8, planet: "Saturn", personality: "The Executive — powerful and enduring.", strengths: ["Ambitious","Strategic","Just"], weaknesses: ["Stern","Controlling"], career: "CEO, judge, financier", compatible: [2,4,6] },
  { n: 9, planet: "Mars", personality: "The Warrior — courageous and idealistic.", strengths: ["Brave","Generous","Passionate"], weaknesses: ["Impulsive","Fiery"], career: "Athlete, soldier, activist", compatible: [1,3,6] },
];

function reduce(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) n = String(n).split("").reduce((a,d)=>a+Number(d),0);
  return n > 9 ? String(n).split("").reduce((a,d)=>a+Number(d),0) : n;
}
const LETTER_MAP: Record<string, number> = { a:1,j:1,s:1,b:2,k:2,t:2,c:3,l:3,u:3,d:4,m:4,v:4,e:5,n:5,w:5,f:6,o:6,x:6,g:7,p:7,y:7,h:8,q:8,z:8,i:9,r:9 };
const VOWELS = new Set(["a","e","i","o","u"]);

function fromName(name: string, filter?: (c: string) => boolean) {
  const cleaned = name.toLowerCase().replace(/[^a-z]/g, "");
  const sum = [...cleaned].filter((c) => (filter ? filter(c) : true)).reduce((acc, c) => acc + (LETTER_MAP[c] ?? 0), 0);
  return sum ? reduce(sum) : 0;
}

export function NumerologySection() {
  const [selected, setSelected] = useState<NumInfo>(NUMBERS[0]);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const results = useMemo(() => {
    if (!name && !dob) return null;
    const life = dob ? reduce(dob.replace(/[^0-9]/g, "").split("").reduce((a,d)=>a+Number(d),0)) : 0;
    const destiny = fromName(name);
    const personality = fromName(name, (c) => !VOWELS.has(c));
    const soul = fromName(name, (c) => VOWELS.has(c));
    return { life, destiny, personality, soul };
  }, [name, dob]);

  return (
    <section id="numerology" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Numerology" title="Nine keys to the self" sub="Select a number to reveal its resonance — or generate your personal profile below." />

        {/* Number wheel */}
        <div className="relative mt-16 mx-auto aspect-square w-full max-w-[560px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-gold/20"
          />
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute inset-0">
            {NUMBERS.map((n, i) => {
              const angle = (i * 360) / NUMBERS.length;
              const isActive = selected.n === n.n;
              return (
                <div key={n.n} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${angle}deg) translateY(-42%)` }}>
                  <button
                    onClick={() => setSelected(n)}
                    style={{ transform: `translateX(-50%) rotate(-${angle}deg)` }}
                    className={`grid h-14 w-14 place-items-center rounded-full font-display text-2xl transition ${isActive ? "bg-gradient-to-br from-gold to-royal text-white glow-gold scale-125" : "glass hover:glow-royal"}`}
                  >
                    {n.n}
                  </button>
                </div>
              );
            })}
          </div>
          {/* Center */}
          <motion.div
            key={selected.n}
            initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <div className="font-display text-7xl text-gradient-gold">{selected.n}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-foreground/60">Ruled by {selected.planet}</div>
          </motion.div>
        </div>

        {/* Selected details */}
        <motion.div
          key={selected.n + "-details"}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-strong mt-10 mx-auto max-w-4xl rounded-3xl p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-soft">Personality</div>
              <p className="mt-2 text-foreground/85">{selected.personality}</p>
              <div className="mt-4 text-xs uppercase tracking-widest text-gold-soft">Career tendencies</div>
              <p className="mt-2 text-foreground/85">{selected.career}</p>
              <div className="mt-4 text-xs uppercase tracking-widest text-gold-soft">Compatibility</div>
              <div className="mt-2 flex gap-2">{selected.compatible.map((c) => <span key={c} className="grid h-9 w-9 place-items-center rounded-full glass text-sm">{c}</span>)}</div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <StatChips title="Strengths" items={selected.strengths} tone="gold" />
              <StatChips title="Weaknesses" items={selected.weaknesses} tone="royal" />
            </div>
          </div>
        </motion.div>

        {/* Calculator */}
        <div id="calculator" className="mt-20 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8">
          <div className="glass-strong rounded-3xl p-8">
            <h3 className="font-display text-3xl">Numerology calculator</h3>
            <p className="mt-2 text-sm text-foreground/60">Your Life Path, Destiny, Personality and Soul Urge numbers — computed from tradition.</p>
            <div className="mt-6 space-y-4">
              <Field label="Full name at birth">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ada Lovelace"
                  className="w-full rounded-2xl bg-white/5 px-4 py-3 outline-none focus:ring-2 ring-royal transition" />
              </Field>
              <Field label="Date of birth">
                <DobInput value={dob} onChange={(iso) => setDob(iso)}
                  className="w-full rounded-2xl bg-white/5 px-4 py-3 outline-none focus:ring-2 ring-royal transition" />
              </Field>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberDial label="Life Path" value={results?.life ?? 0} color="var(--gold)" />
            <NumberDial label="Destiny" value={results?.destiny ?? 0} color="var(--royal-soft)" />
            <NumberDial label="Personality" value={results?.personality ?? 0} color="#F0ABFC" />
            <NumberDial label="Soul Urge" value={results?.soul ?? 0} color="#5EEAD4" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-foreground/60">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function StatChips({ title, items, tone }: { title: string; items: string[]; tone: "gold" | "royal" }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="text-xs uppercase tracking-widest text-foreground/60">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => (
          <span key={i} className={`rounded-full px-3 py-1 text-xs ${tone === "gold" ? "bg-gold/15 text-gold-soft" : "bg-royal/25 text-white/90"}`}>{i}</span>
        ))}
      </div>
    </div>
  );
}

function NumberDial({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = value ? (value / 9) * 100 : 0;
  const c = 2 * Math.PI * 42;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-5 text-center">
      <div className="relative mx-auto h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - (c * pct) / 100 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-4xl">{value || "—"}</span>
        </div>
      </div>
      <div className="mt-3 text-xs uppercase tracking-widest text-foreground/70">{label}</div>
    </motion.div>
  );
}
