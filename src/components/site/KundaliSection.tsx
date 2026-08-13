import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionHeader } from "./AstrologySection";
import { DobInput } from "../common/DobInput";

const SIGNS = ["Ari","Tau","Gem","Can","Leo","Vir","Lib","Sco","Sag","Cap","Aqu","Pis"];
const PLANETS = ["Su","Mo","Ma","Me","Ju","Ve","Sa","Ra","Ke"];

export function KundaliSection() {
  const [f, setF] = useState({ name: "", dob: "", tob: "", pob: "" });
  const [generated, setGenerated] = useState(false);

  // deterministic sample placements from name
  const seed = (f.name + f.dob).split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  const houses = Array.from({ length: 12 }, (_, i) => {
    const s = (seed + i * 7) % 12;
    const p = PLANETS.filter((_, j) => (seed + i + j * 3) % 5 === 0).slice(0, 2);
    return { sign: SIGNS[s], planets: p };
  });

  return (
    <section id="kundali" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Kundali" title="Your Vedic birth chart" sub="Enter your details to preview a beautifully rendered Kundali with planetary placements." />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
          {/* Form */}
          <div className="glass-strong rounded-3xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name"><input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Ada Lovelace" className={inputCls} /></Field>
              <Field label="Date of birth"><DobInput value={f.dob} onChange={(iso) => setF({ ...f, dob: iso })} className={inputCls} /></Field>
              <Field label="Time of birth"><input type="time" value={f.tob} onChange={(e) => setF({ ...f, tob: e.target.value })} className={inputCls} /></Field>
              <Field label="Place of birth"><input value={f.pob} onChange={(e) => setF({ ...f, pob: e.target.value })} placeholder="Varanasi, India" className={inputCls} /></Field>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setGenerated(true)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal via-royal-soft to-gold px-6 py-3.5 font-medium text-white shadow-[0_20px_60px_-15px_rgba(245,158,11,0.7)] transition hover:glow-gold"
            >
              <Sparkles className="h-4 w-4" /> Generate Kundali
            </motion.button>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <InfoCard title="Mangal Dosha" body="Not detected in this sample chart" tone="gold" />
              <InfoCard title="Kaal Sarp" body="Neutral — no clear alignment" tone="royal" />
              <InfoCard title="Compatibility" body="Guna Milan preview: 26/36" tone="gold" />
              <InfoCard title="Dasha" body="Currently under Jupiter Mahadasha" tone="royal" />
            </div>
          </div>

          {/* Chart */}
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-gold-soft">North Indian style</div>
                <div className="font-display text-2xl">Birth Chart</div>
              </div>
              <div className="text-xs text-foreground/60">{generated ? f.name || "Sample" : "Preview"}</div>
            </div>

            <div className="relative mt-6 aspect-square w-full">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <defs>
                  <linearGradient id="chartStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#6D28D9" />
                  </linearGradient>
                </defs>
                <rect x="4" y="4" width="192" height="192" fill="none" stroke="url(#chartStroke)" strokeWidth="1.2" rx="4" />
                <line x1="4" y1="4" x2="196" y2="196" stroke="url(#chartStroke)" strokeWidth="1" />
                <line x1="196" y1="4" x2="4" y2="196" stroke="url(#chartStroke)" strokeWidth="1" />
                <polygon points="100,4 196,100 100,196 4,100" fill="none" stroke="url(#chartStroke)" strokeWidth="1" />
              </svg>

              {/* 12 houses text overlays */}
              {[
                { i: 0, x: 50, y: 22 }, { i: 1, x: 22, y: 22 }, { i: 2, x: 22, y: 50 }, { i: 3, x: 22, y: 78 },
                { i: 4, x: 50, y: 78 }, { i: 5, x: 78, y: 78 }, { i: 6, x: 78, y: 50 }, { i: 7, x: 78, y: 22 },
                { i: 8, x: 62, y: 34 }, { i: 9, x: 38, y: 34 }, { i: 10, x: 38, y: 66 }, { i: 11, x: 62, y: 66 },
              ].map((h) => (
                <div key={h.i} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  <div className="font-display text-sm text-gold-soft">{houses[h.i].sign}</div>
                  <div className="mt-0.5 text-[10px] text-foreground/80">{generated ? houses[h.i].planets.join(" ") : "·"}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <MiniStat label="Ascendant" value={generated ? houses[0].sign : "—"} />
              <MiniStat label="Moon sign" value={generated ? houses[3].sign : "—"} />
              <MiniStat label="Sun sign" value={generated ? houses[6].sign : "—"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls = "w-full rounded-2xl bg-white/5 px-4 py-3 outline-none focus:ring-2 ring-royal transition placeholder:text-foreground/40";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs uppercase tracking-widest text-foreground/60">{label}</span><div className="mt-2">{children}</div></label>;
}
function InfoCard({ title, body, tone }: { title: string; body: string; tone: "gold" | "royal" }) {
  return (
    <div className={`rounded-2xl border p-4 ${tone === "gold" ? "border-gold/25 bg-gold/5" : "border-royal-soft/25 bg-royal/10"}`}>
      <div className="text-xs uppercase tracking-widest text-foreground/60">{title}</div>
      <div className="mt-1 text-sm text-foreground/85">{body}</div>
    </div>
  );
}
function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="glass rounded-2xl p-3 text-center"><div className="text-[10px] uppercase tracking-widest text-foreground/60">{label}</div><div className="mt-1 font-display text-lg">{value}</div></div>;
}
