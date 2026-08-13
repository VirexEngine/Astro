import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer, FloatingActions } from "@/components/site/Sections";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/free-tools/numerology")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Free Numerology Calculator | GrahGanit" },
      {
        name: "description",
        content:
          "Discover your Life Path, Destiny, Soul Urge, Personality, and Birthday numbers. A full Pythagorean numerology reading powered by the Spiritual Knowledge Engine.",
      },
    ],
  }),
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface NumberCard {
  key: string;
  label: string;
  symbol: string;
  number: number;
  title: string;
  is_master: boolean;
  confidence_stars: number;
  stars_unicode: string;
  description: string;
  summary: string;
  modules: {
    personality?: { traits: string[]; strengths: string[]; challenges: string[] };
    career?: { fields: string[] };
    relationships?: { overview: string };
    finance?: { overview: string };
    health?: { overview: string };
    lucky_elements?: {
      numbers?: number[];
      colors?: string[];
      days?: string[];
      gemstone?: string;
      metal?: string;
    };
  };
}

interface NumerologyReport {
  version: string;
  person: { full_name: string; preferred_name: string; date_of_birth: string };
  summary: {
    headline: string;
    primary_title: string;
    overview: string;
    life_path: number;
    is_master: boolean;
  };
  number_cards: NumberCard[];
  modules: {
    personality: { traits: string[]; strengths: string[]; challenges: string[] };
    career: { fields: string[] };
    relationships: { overview: string };
    finance: { overview: string };
    health: { overview: string };
    lucky_elements: {
      numbers?: number[];
      colors?: string[];
      days?: string[];
      gemstone?: string;
      metal?: string;
    };
  };
  compatibility: { status: string; message: string };
  extended_preview: { visible: boolean; teaser: string };
}

// ─── Card accent colors ────────────────────────────────────────────────────────
const CARD_COLORS: Record<string, { glow: string; badge: string; text: string }> = {
  life_path:   { glow: "rgba(212,169,79,0.35)", badge: "bg-gold/20 text-gold border-gold/30", text: "text-gold" },
  destiny:     { glow: "rgba(139,92,246,0.3)",  badge: "bg-violet-500/20 text-violet-300 border-violet-400/30", text: "text-violet-300" },
  soul_urge:   { glow: "rgba(236,72,153,0.3)",  badge: "bg-pink-500/20 text-pink-300 border-pink-400/30", text: "text-pink-300" },
  personality: { glow: "rgba(59,130,246,0.3)",  badge: "bg-blue-500/20 text-blue-300 border-blue-400/30", text: "text-blue-300" },
  birthday:    { glow: "rgba(16,185,129,0.3)",  badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30", text: "text-emerald-300" },
};

// ─── Date Formatter Helper ──────────────────────────────────────────────────
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  if (dateStr.includes("/")) return dateStr;
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

// Helper to convert DD/MM/YYYY to YYYY-MM-DD for backend
const convertToBackendDate = (dateStr: string): string => {
  const clean = dateStr.trim();
  const parts = clean.split(/[/\-]/);
  if (parts.length === 3) {
    let day = parts[0];
    let month = parts[1];
    let year = parts[2];
    
    if (year.length === 2) {
      const yearNum = parseInt(year, 10);
      const currentYearShort = new Date().getFullYear() % 100;
      if (yearNum <= currentYearShort + 10) {
        year = `20${year.padStart(2, '0')}`;
      } else {
        year = `19${year.padStart(2, '0')}`;
      }
    }
    
    day = day.padStart(2, '0');
    month = month.padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  return dateStr;
};


// ─── Main Component ────────────────────────────────────────────────────────────
function RouteComponent() {
  const [form, setForm] = useState({ full_name: "", date_of_birth: "", preferred_name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<NumerologyReport | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "career" | "relationships" | "finance" | "health" | "lucky">("overview");
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.date_of_birth.trim()) {
      setError("Please enter your full name and date of birth.");
      return;
    }

    const backendDate = convertToBackendDate(form.date_of_birth);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(backendDate)) {
      setError("Please enter your date of birth in DD/MM/YYYY format.");
      return;
    }

    const [yr, mo, dy] = backendDate.split("-").map(Number);
    const dateObj = new Date(yr, mo - 1, dy);
    if (dateObj.getFullYear() !== yr || dateObj.getMonth() !== mo - 1 || dateObj.getDate() !== dy) {
      setError("Please enter a valid calendar date.");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/numerology/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date_of_birth: backendDate
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to calculate numerology.");
      }
      const data: NumerologyReport = await res.json();
      setReport(data);
      setActiveTab("overview");
      setActiveDrawer(null);
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const activeCard = report?.number_cards.find((c) => c.key === activeDrawer) ?? null;

  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden starfield">
      <Navbar />
      <main className="pt-28 pb-24 px-4 sm:px-6 mx-auto max-w-6xl">

        {/* ── Header ── */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 opacity-90">
            Pythagorean Numerology Portal
          </p>
          <h1 className="text-5xl md:text-7xl font-display text-gradient-gold leading-tight drop-shadow-lg">
            Numerology Calculator
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/60 max-w-2xl mx-auto">
            Discover the five core numbers that shape your destiny, personality, and life purpose.
          </p>
        </div>

        {/* ── Form ── */}
        <div className="glass-strong rounded-3xl p-6 md:p-10 mb-10 border border-gold/15 shadow-[0_0_50px_rgba(212,169,79,0.05)]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Birth Name"
              id="num-full-name"
              type="text"
              placeholder="e.g. Arjun Sharma"
              value={form.full_name}
              onChange={(v) => setForm((f) => ({ ...f, full_name: v }))}
            />
            <SmartDateInput
              label="Date of Birth"
              id="num-dob"
              value={form.date_of_birth}
              onChange={(v) => setForm((f) => ({ ...f, date_of_birth: v }))}
            />
            <div className="md:col-span-2">
              <FormField
                label="Preferred Name / Nickname (optional)"
                id="num-preferred-name"
                type="text"
                placeholder="e.g. Arjun — leave blank to use full name"
                value={form.preferred_name}
                onChange={(v) => setForm((f) => ({ ...f, preferred_name: v }))}
              />
            </div>

            <div className="md:col-span-2 flex justify-end pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={loading}
                className="btn-cosmic flex items-center gap-2 px-10 py-3.5 rounded-full text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><span className="animate-spin">✦</span> Reading the Numbers…</>
                ) : (
                  <><span>✦</span> Reveal My Numbers</>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              ⚠ {error}
            </div>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-royal/40 animate-spin" />
              <div className="absolute inset-4 rounded-full border border-gold/60" />
              <span className="absolute inset-0 flex items-center justify-center text-2xl">✦</span>
            </div>
            <p className="text-foreground/60 text-sm animate-pulse">Consulting the Pythagorean system…</p>
          </div>
        )}

        {/* ── Report ── */}
        {report && (
          <div ref={reportRef} className="space-y-8 animate-fade-in">

            {/* Summary Card */}
            <SummaryCard report={report} />

            {/* Number Cards Pentagon Grid */}
            <NumberCardsGrid
              cards={report.number_cards}
              activeDrawer={activeDrawer}
              setActiveDrawer={setActiveDrawer}
            />

            {/* Number Detail Drawer */}
            <AnimatePresence>
              {activeCard && (
                <NumberDrawer
                  card={activeCard}
                  onClose={() => setActiveDrawer(null)}
                />
              )}
            </AnimatePresence>

            {/* Report Tabs */}
            <div className="flex gap-1 p-1.5 glass rounded-2xl w-fit mx-auto border border-white/5 flex-wrap justify-center">
              {(["overview", "career", "relationships", "finance", "health", "lucky"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-lg shadow-royal/20"
                      : "text-foreground/50 hover:text-foreground/80"
                  }`}
                >
                  {tab === "overview" ? "Personality" : tab === "lucky" ? "Lucky ✨" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === "overview" && <PersonalityTab modules={report.modules} />}
              {activeTab === "career" && <CareerTab modules={report.modules} />}
              {activeTab === "relationships" && <RelationshipsTab modules={report.modules} />}
              {activeTab === "finance" && <FinanceTab modules={report.modules} />}
              {activeTab === "health" && <HealthTab modules={report.modules} />}
              {activeTab === "lucky" && <LuckyTab lucky={report.modules.lucky_elements} />}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

// ─── Form Field ────────────────────────────────────────────────────────────────
function FormField({ label, id, type, placeholder, value, onChange }: {
  label: string; id: string; type: string; placeholder?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-foreground/50 tracking-wider uppercase">
        {label}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-foreground
          placeholder:text-foreground/25 focus:outline-none focus:border-gold/40 focus:bg-white/8
          transition-all hover:border-white/15"
      />
    </div>
  );
}

// ─── Smart Date Input (auto-inserts slashes: dd/mm/yyyy) ──────────────────────
function SmartDateInput({ label, id, value, onChange }: {
  label: string; id: string; value: string; onChange: (v: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    // Only allow digits and slashes
    raw = raw.replace(/[^\d/]/g, "");

    // Strip all slashes to work with raw digits
    const digits = raw.replace(/\//g, "");

    // Limit to 8 digits (ddmmyyyy)
    const capped = digits.slice(0, 8);

    // Auto-insert slashes
    let formatted = capped;
    if (capped.length >= 3 && capped.length <= 4) {
      formatted = `${capped.slice(0, 2)}/${capped.slice(2)}`;
    } else if (capped.length >= 5) {
      formatted = `${capped.slice(0, 2)}/${capped.slice(2, 4)}/${capped.slice(4)}`;
    }

    onChange(formatted);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-foreground/50 tracking-wider uppercase">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        placeholder="dd/mm/yyyy"
        value={value}
        maxLength={10}
        onChange={handleChange}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-foreground
          placeholder:text-foreground/25 focus:outline-none focus:border-gold/40 focus:bg-white/8
          transition-all hover:border-white/15"
      />
    </div>
  );
}

// ─── Summary Card ──────────────────────────────────────────────────────────────
function SummaryCard({ report }: { report: NumerologyReport }) {
  return (
    <div className="glass-strong rounded-3xl p-8 border border-gold/15 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="grid md:grid-cols-3 gap-6 relative">
        <div className="md:col-span-2">
          <p className="text-xs text-gold/80 tracking-widest uppercase mb-2 font-semibold">Numerology Report</p>
          <h2 className="text-3xl font-display text-gradient-gold mb-1">{report.person.full_name}</h2>
          <p className="text-foreground/50 text-sm mb-4">Born {formatDate(report.person.date_of_birth)}</p>
          <p className="text-foreground/75 text-sm leading-relaxed max-w-lg">{report.summary.overview}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <MetaBadge icon="⭐" label={`Life Path ${report.summary.life_path}`} />
            {report.summary.is_master && <MetaBadge icon="⚡" label="Master Number" />}
            <MetaBadge icon="✦" label={report.summary.primary_title} />
          </div>
        </div>

        {/* Central mandala */}
        <div className="flex items-center justify-center">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 rounded-full border border-gold/25 animate-pulse" />
            <div className="absolute inset-3 rounded-full border border-royal/30" />
            <div className="absolute inset-6 rounded-full border border-gold/10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-display text-gradient-gold font-bold leading-none">
                {report.summary.life_path}
              </span>
              <span className="text-[10px] text-gold/70 font-semibold mt-1 tracking-widest uppercase">Life Path</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Meta Badge ───────────────────────────────────────────────────────────────
function MetaBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass text-xs text-foreground/70 border border-white/5 font-medium shadow-sm">
      <span>{icon}</span>{label}
    </span>
  );
}

// ─── Number Cards Grid ─────────────────────────────────────────────────────────
function NumberCardsGrid({ cards, activeDrawer, setActiveDrawer }: {
  cards: NumberCard[];
  activeDrawer: string | null;
  setActiveDrawer: (key: string | null) => void;
}) {
  return (
    <div>
      <p className="text-center text-xs text-foreground/40 uppercase tracking-widest font-semibold mb-5">
        Your Core Numbers — Click any card to explore
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card, i) => {
          const color = CARD_COLORS[card.key] || CARD_COLORS.life_path;
          const isActive = activeDrawer === card.key;
          return (
            <motion.button
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveDrawer(isActive ? null : card.key)}
              className={`group relative glass rounded-2xl p-5 border transition-all text-left cursor-pointer overflow-hidden flex flex-col items-center text-center gap-2
                ${isActive ? "border-gold/50 shadow-[0_0_30px_rgba(212,169,79,0.2)]" : "border-white/5 hover:border-white/15"}`}
              style={{ boxShadow: isActive ? `0 0 40px ${color.glow}` : undefined }}
            >
              {/* Glow bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at center, ${color.glow} 0%, transparent 70%)` }}
              />

              {/* Symbol */}
              <span className="text-2xl relative z-10">{card.symbol}</span>

              {/* Label */}
              <p className="text-[10px] text-foreground/40 uppercase tracking-wider font-semibold relative z-10">{card.label}</p>

              {/* Number */}
              <div className="relative z-10">
                <span className={`text-4xl font-display font-bold ${color.text} leading-none`}>
                  {card.number}
                </span>
                {card.is_master && (
                  <span className="ml-1 text-[9px] text-gold/80 font-bold align-top">M</span>
                )}
              </div>

              {/* Title */}
              <p className="text-xs font-semibold text-foreground/70 leading-tight relative z-10">{card.title}</p>

              {/* Stars */}
              <span className="text-xs text-gold/60 tracking-wider relative z-10">{card.stars_unicode}</span>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Number Detail Drawer ─────────────────────────────────────────────────────
function NumberDrawer({ card, onClose }: { card: NumberCard; onClose: () => void }) {
  const color = CARD_COLORS[card.key] || CARD_COLORS.life_path;

  return (
    <motion.div
      key={card.key}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div
        className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden shadow-2xl"
        style={{ boxShadow: `0 0 60px ${color.glow}` }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: color.glow }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 relative">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold font-display border"
              style={{ background: `${color.glow}`, borderColor: `${color.glow}` }}
            >
              <span className={color.text}>{card.number}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${color.badge}`}>
                  {card.label}
                </span>
                {card.is_master && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-gold/30 text-gold bg-gold/10">
                    ⚡ Master Number
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-display text-gradient-gold mt-1">{card.title}</h3>
              <p className="text-xs text-foreground/50 mt-0.5">{card.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-foreground/30 hover:text-foreground/70 transition-colors text-2xl flex-shrink-0 mt-1"
          >×</button>
        </div>

        {/* Summary */}
        <p className="text-sm text-foreground/70 leading-relaxed mb-6 relative">{card.summary}</p>

        {/* Stars */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gold/80 text-sm tracking-wider">{card.stars_unicode}</span>
          <span className="text-xs text-foreground/40">Confidence Level</span>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
          {/* Personality */}
          {card.modules.personality && card.modules.personality.traits.length > 0 && (
            <DrawerModule title="Core Traits" icon="✨">
              <ul className="space-y-1.5">
                {card.modules.personality.traits.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/70">
                    <span className="text-gold/40 flex-shrink-0 mt-0.5">·</span>{t}
                  </li>
                ))}
              </ul>
            </DrawerModule>
          )}

          {/* Career */}
          {card.modules.career && card.modules.career.fields.length > 0 && (
            <DrawerModule title="Career Paths" icon="💼">
              <div className="flex flex-wrap gap-2">
                {card.modules.career.fields.map((f, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full glass border border-white/5 text-foreground/60">{f}</span>
                ))}
              </div>
            </DrawerModule>
          )}

          {/* Strengths */}
          {card.modules.personality && card.modules.personality.strengths.length > 0 && (
            <DrawerModule title="Strengths" icon="⚡">
              <ul className="space-y-1.5">
                {card.modules.personality.strengths.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-emerald-400/80">
                    <span className="flex-shrink-0 mt-0.5">✓</span>{s}
                  </li>
                ))}
              </ul>
            </DrawerModule>
          )}

          {/* Challenges */}
          {card.modules.personality && card.modules.personality.challenges.length > 0 && (
            <DrawerModule title="Challenges" icon="🌊">
              <ul className="space-y-1.5">
                {card.modules.personality.challenges.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-orange-400/80">
                    <span className="flex-shrink-0 mt-0.5">△</span>{c}
                  </li>
                ))}
              </ul>
            </DrawerModule>
          )}

          {/* Lucky Elements */}
          {card.modules.lucky_elements && Object.keys(card.modules.lucky_elements).length > 0 && (
            <DrawerModule title="Lucky Elements" icon="🍀">
              <div className="space-y-2">
                {card.modules.lucky_elements.colors && (
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-[10px] text-foreground/40 uppercase tracking-wider w-14 flex-shrink-0">Colors</span>
                    {card.modules.lucky_elements.colors.map((c, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full glass border border-white/5 text-foreground/60">{c}</span>
                    ))}
                  </div>
                )}
                {card.modules.lucky_elements.days && (
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-[10px] text-foreground/40 uppercase tracking-wider w-14 flex-shrink-0">Days</span>
                    {card.modules.lucky_elements.days.map((d, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full glass border border-white/5 text-foreground/60">{d}</span>
                    ))}
                  </div>
                )}
                {card.modules.lucky_elements.gemstone && (
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] text-foreground/40 uppercase tracking-wider w-14 flex-shrink-0">Gem</span>
                    <span className="text-xs text-gold/80">{card.modules.lucky_elements.gemstone}</span>
                  </div>
                )}
              </div>
            </DrawerModule>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DrawerModule({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-4 border border-white/5">
      <p className="text-[10px] text-foreground/40 uppercase tracking-widest mb-3 font-bold flex items-center gap-1.5">
        <span>{icon}</span>{title}
      </p>
      {children}
    </div>
  );
}

// ─── Report Tabs ───────────────────────────────────────────────────────────────
function PersonalityTab({ modules }: { modules: NumerologyReport["modules"] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="glass rounded-2xl p-6 border border-white/5">
        <p className="text-[10px] text-gold/80 uppercase tracking-widest mb-4 font-bold">✨ Core Traits</p>
        <ul className="space-y-2">
          {modules.personality.traits.map((t, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/70">
              <span className="text-gold/40 flex-shrink-0 mt-0.5">·</span>{t}
            </li>
          ))}
        </ul>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/5">
        <p className="text-[10px] text-emerald-400/80 uppercase tracking-widest mb-4 font-bold">⚡ Strengths</p>
        <ul className="space-y-2">
          {modules.personality.strengths.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/70">
              <span className="text-emerald-400/50 flex-shrink-0 mt-0.5">✓</span>{s}
            </li>
          ))}
        </ul>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/5">
        <p className="text-[10px] text-orange-400/80 uppercase tracking-widest mb-4 font-bold">🌊 Challenges</p>
        <ul className="space-y-2">
          {modules.personality.challenges.map((c, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/70">
              <span className="text-orange-400/50 flex-shrink-0 mt-0.5">△</span>{c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CareerTab({ modules }: { modules: NumerologyReport["modules"] }) {
  return (
    <div className="glass-strong rounded-3xl p-8 border border-white/5">
      <p className="text-xs text-foreground/40 uppercase tracking-widest mb-6 font-semibold">💼 Suitable Career Paths</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {modules.career.fields.map((field, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 border border-white/5 hover:border-gold/20 transition-all text-center group"
          >
            <p className="text-sm font-medium text-foreground/80 group-hover:text-gold/90 transition-colors leading-snug">{field}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RelationshipsTab({ modules }: { modules: NumerologyReport["modules"] }) {
  const [hasPass, setHasPass] = useState(false);
  useEffect(() => {
    try {
      const bookings = localStorage.getItem('grahganit_user_bookings');
      if (bookings && JSON.parse(bookings).length > 0) setHasPass(true);
    } catch (e) {}
  }, []);

  return (
    <div className="glass-strong rounded-3xl p-8 border border-white/5 space-y-6">
      <p className="text-xs text-foreground/40 uppercase tracking-widest font-semibold">💍 Relationships & Love</p>
      <p className="text-foreground/75 text-sm leading-relaxed max-w-3xl">{modules.relationships.overview}</p>

      {hasPass ? (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <span>✓</span>
            <span>RELATIONSHIP VIBRATION BLUEPRINT UNLOCKED VIA CONSULTATION PASS</span>
          </div>
          <p className="text-white/80 leading-relaxed font-sans">
            Your Life Path and Soul Urge frequencies indicate profound emotional harmony when aligned with supportive planetary Dashas. Consult Acharyaa Smita Mishra during your 1-on-1 session for specific synastry timings.
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/40 border border-amber-500/30 text-center space-y-3">
          <span className="text-2xl">🔒</span>
          <h4 className="text-base font-display text-gradient-gold font-medium">
            Detailed Relationship Vibration & Soulmate Compatibility Locked
          </h4>
          <p className="text-xs text-foreground/70 max-w-md mx-auto leading-relaxed">
            Unlock your complete Numerology Blueprint or consult Acharyaa Smita Mishra for personalized marriage & relationship guidance.
          </p>
          <a href="/booking" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold hover:scale-105 transition-all shadow-lg">
            Book Consultation / Unlock Full Blueprint ✦
          </a>
        </div>
      )}
    </div>
  );
}

function FinanceTab({ modules }: { modules: NumerologyReport["modules"] }) {
  const [hasPass, setHasPass] = useState(false);
  useEffect(() => {
    try {
      const bookings = localStorage.getItem('grahganit_user_bookings');
      if (bookings && JSON.parse(bookings).length > 0) setHasPass(true);
    } catch (e) {}
  }, []);

  return (
    <div className="glass-strong rounded-3xl p-8 border border-white/5 space-y-6">
      <p className="text-xs text-foreground/40 uppercase tracking-widest font-semibold">💰 Finance & Wealth</p>
      <p className="text-foreground/75 text-sm leading-relaxed max-w-3xl">{modules.finance.overview}</p>

      {hasPass ? (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <span>✓</span>
            <span>KARMIC MONEY CYCLES & BUSINESS VIBRATIONS UNLOCKED VIA CONSULTATION PASS</span>
          </div>
          <p className="text-white/80 leading-relaxed font-sans">
            Your wealth accumulation windows follow specific 9-year numerological cycles. Peak financial launching periods synchronize with Jupiter & 11th House transits.
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/40 border border-amber-500/30 text-center space-y-3">
          <span className="text-2xl">🔒</span>
          <h4 className="text-base font-display text-gradient-gold font-medium">
            Karmic Money Cycles & Business Vibrations Locked
          </h4>
          <p className="text-xs text-foreground/70 max-w-md mx-auto leading-relaxed">
            Discover your peak wealth accumulation years, lucky dates, and financial remedies by booking any consultation session.
          </p>
          <a href="/booking" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold hover:scale-105 transition-all shadow-lg">
            Book Consultation / Unlock Full Blueprint ✦
          </a>
        </div>
      )}
    </div>
  );
}

function HealthTab({ modules }: { modules: NumerologyReport["modules"] }) {
  return (
    <div className="glass-strong rounded-3xl p-8 border border-white/5 space-y-6">
      <p className="text-xs text-foreground/40 uppercase tracking-widest font-semibold">🌿 Health & Wellbeing</p>
      <p className="text-foreground/75 text-sm leading-relaxed max-w-3xl">{modules.health.overview}</p>
      <p className="text-[10px] text-foreground/30 mt-6 italic">
        * This information is based on traditional numerology interpretations and is not medical advice.
      </p>
    </div>
  );
}

function LuckyTab({ lucky }: { lucky: NumerologyReport["modules"]["lucky_elements"] }) {
  const items = [
    { label: "Lucky Numbers", value: lucky.numbers?.join(", "), icon: "🔢" },
    { label: "Lucky Colors",  value: lucky.colors?.join(", "), icon: "🎨" },
    { label: "Lucky Days",    value: lucky.days?.join(", "), icon: "📅" },
    { label: "Gemstone",      value: lucky.gemstone, icon: "💎" },
    { label: "Metal",         value: lucky.metal, icon: "⚱️" },
  ].filter((i) => i.value);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass-strong rounded-2xl p-5 border border-gold/10 hover:border-gold/25 transition-all text-center group"
        >
          <span className="text-3xl block mb-3">{item.icon}</span>
          <p className="text-[10px] text-foreground/40 uppercase tracking-wider mb-2 font-semibold">{item.label}</p>
          <p className="text-sm font-semibold text-gold/90 leading-snug group-hover:text-gold transition-colors">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
