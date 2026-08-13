import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer, FloatingActions } from "@/components/site/Sections";
import { motion, AnimatePresence } from "framer-motion";
import { getActiveProfile } from "@/utils/profile";
import { searchCities, CitySearchResult } from "@/utils/locationService";

export const Route = createFileRoute("/free-tools/kundli")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Kundali Calculator | GrahGanit (ग्रह गणित)" },
      {
        name: "description",
        content:
          "Generate your Vedic birth chart with full planetary analysis, Yoga detection, and life module scores — powered by the Spiritual Knowledge Engine.",
      },
    ],
  }),
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanetStrength {
  label: string;
  color: string;
  score: number;
  stars: string;
  stars_count: number;
}

interface Planet {
  name: string;
  sign: string;
  house: number;
  degree: number;
  nakshatra: string;
  pada: number;
  is_retrograde: boolean;
  strength: PlanetStrength;
  sign_statements: string[];
  house_statements: string[];
  house_name: string;
  explanation_path: string;
}

interface Yoga {
  id: string;
  name: string;
  category: string;
  priority: number;
  severity: string;
  rarity: string;
  applicable_modules: string[];
  source: string;
  description: string;
  statements: string[];
  explanation_path: string;
}

interface LifeModule {
  key: string;
  label: string;
  icon: string;
  score: number;
  score_label: string;
  stars: string;
  stars_count: number;
  color: string;
}

interface KundliReport {
  version: string;
  person: { name: string };
  metadata: {
    date_of_birth: string;
    time_of_birth: string;
    latitude: number;
    longitude: number;
    ayanamsa: string;
    house_system: string;
  };
  ascendant: {
    sign: string;
    degree: number;
    house_name: string;
    description: string;
  };
  planets: Planet[];
  yogas: Yoga[];
  life_modules: LifeModule[];
  summary: {
    headline: string;
    overview: string;
    strongest_area: string;
    yoga_count: number;
  };
}

// ─── Constants & Mappings ──────────────────────────────────────────────────────
const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mars: "♂", Mercury: "☿",
  Jupiter: "♃", Venus: "♀", Saturn: "♄", Rahu: "☊", Ketu: "☋",
};

const PLANET_ABBR: Record<string, string> = {
  Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

const ZODIAC_SYMBOLS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const ZODIAC_INDEX: Record<string, number> = {
  Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4,
  Leo: 5, Virgo: 6, Libra: 7, Scorpio: 8,
  Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12,
};

const MODULE_ICONS: Record<string, string> = {
  career: "💼", wealth: "💰", marriage: "💍", health: "🌿", fortune: "⭐", personality: "✨",
};
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
  const [form, setForm] = useState({
    name: "", date_of_birth: "", time_of_birth: "", place_of_birth: "", house_system: "W",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<KundliReport | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "planets" | "yogas" | "chart">("overview");
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);
  const [chartStyle, setChartStyle] = useState<"north" | "south">("north");
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profile = getActiveProfile();
    if (profile) {
      const parts = profile.dob.split('-');
      const formattedDob = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : '';
      setForm((f) => ({
        ...f,
        name: profile.name,
        date_of_birth: formattedDob,
        time_of_birth: profile.time,
        place_of_birth: profile.place,
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date_of_birth || !form.time_of_birth || !form.place_of_birth) {
      setError("Please fill in all fields.");
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
      // Fetch relative path so it routes correctly on mobile & ngrok via Vite proxy
      const res = await fetch("/api/kundli/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date_of_birth: backendDate
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to generate Kundli.");
      }
      const data: KundliReport = await res.json();
      setReport(data);
      setActiveTab("overview");
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden starfield">
      <Navbar />
      <main className="pt-28 pb-24 px-4 sm:px-6 mx-auto max-w-6xl">
        {/* ── Header ── */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 opacity-90">
            Vedic Astrology Portal
          </p>
          <h1 className="text-5xl md:text-7xl font-display text-gradient-gold leading-tight drop-shadow-lg">
            Kundali Calculator
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/60 max-w-2xl mx-auto">
            Discover your Vedic birth chart with detailed planetary strengths,
            Yoga detection, and life module scores.
          </p>
        </div>

        {/* ── Form ── */}
        <div className="glass-strong rounded-3xl p-6 md:p-10 mb-10 border border-gold/15 shadow-[0_0_50px_rgba(212,169,79,0.05)]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" id="kundli-name" type="text"
              placeholder="e.g. Arjun Sharma" value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
            <SmartDateInput
              label="Date of Birth"
              id="kundli-dob"
              value={form.date_of_birth}
              onChange={(v) => setForm((f) => ({ ...f, date_of_birth: v }))} />
            <FormField label="Time of Birth (24h local)" id="kundli-tob" type="time"
              value={form.time_of_birth}
              onChange={(v) => setForm((f) => ({ ...f, time_of_birth: v }))} />
            
            <LocationAutocomplete value={form.place_of_birth}
              onChange={(v) => setForm((f) => ({ ...f, place_of_birth: v }))} />

            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-xs text-foreground/50 uppercase tracking-wider font-semibold">House System:</span>
                {[["W", "Whole Sign"], ["P", "Placidus"]].map(([val, lbl]) => (
                  <button key={val} type="button"
                    onClick={() => setForm((f) => ({ ...f, house_system: val }))}
                    className={`text-xs px-4 py-1.5 rounded-full border transition-all ${form.house_system === val
                      ? "bg-gold/25 border-gold text-gold shadow-[0_0_15px_rgba(212,169,79,0.25)]"
                      : "border-white/10 text-foreground/50 hover:border-white/20"}`}>
                    {lbl}
                  </button>
                ))}
              </div>
              <button type="submit" disabled={loading}
                className="btn-cosmic flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <><span className="animate-spin">✦</span> Casting Chart…</>
                ) : (
                  <><span>✦</span> Generate Kundli</>
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

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-royal/40 animate-spin" />
              <div className="absolute inset-4 rounded-full border border-gold/60" />
              <span className="absolute inset-0 flex items-center justify-center text-2xl">☉</span>
            </div>
            <p className="text-foreground/60 text-sm animate-pulse">
              Consulting the Swiss Ephemeris…
            </p>
          </div>
        )}

        {/* ── Report ── */}
        {report && (
          <div ref={reportRef} className="space-y-8 animate-fade-in">
            {/* Summary Card */}
            <SummaryCard report={report} />

            {/* Tab Navigation */}
            <div className="flex gap-1 p-1.5 glass rounded-2xl w-fit mx-auto border border-white/5">
              {(["overview", "planets", "yogas", "chart"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${activeTab === tab
                    ? "bg-primary text-white shadow-lg shadow-royal/20"
                    : "text-foreground/50 hover:text-foreground/80"}`}>
                  {tab === "overview" ? "Life Modules" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && <LifeModulesTab report={report} />}
            {activeTab === "planets" && (
              <PlanetsTab report={report} expandedPlanet={expandedPlanet} setExpandedPlanet={setExpandedPlanet} />
            )}
            {activeTab === "yogas" && <YogasTab report={report} />}
            {activeTab === "chart" && (
              <ChartTab report={report} chartStyle={chartStyle} setChartStyle={setChartStyle} />
            )}
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
      <input id={id} type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-foreground
          placeholder:text-foreground/25 focus:outline-none focus:border-gold/40 focus:bg-white/8
          transition-all hover:border-white/15" />
    </div>
  );
}

// ─── Smart Date Input (auto-inserts slashes: dd/mm/yyyy) ──────────────────────
function SmartDateInput({ label, id, value, onChange }: {
  label: string; id: string; value: string; onChange: (v: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    raw = raw.replace(/[^\d/]/g, "");
    const digits = raw.replace(/\//g, "");
    const capped = digits.slice(0, 8);
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

// ─── Location Autocomplete ──────────────────────────────────────────────────────
function LocationAutocomplete({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [suggestions, setSuggestions] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const results = await searchCities(searchQuery);
      setSuggestions(results);
    } catch (e) {
      console.error(e);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    setShowDropdown(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 400);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <label htmlFor="kundli-pob" className="text-xs font-semibold text-foreground/50 tracking-wider uppercase">
        Place of Birth
      </label>
      <input
        id="kundli-pob"
        type="text"
        placeholder="e.g. Mumbai, India"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-foreground
          placeholder:text-foreground/25 focus:outline-none focus:border-gold/40 focus:bg-white/8
          transition-all hover:border-white/15"
      />
      <AnimatePresence>
        {showDropdown && (suggestions.length > 0 || loading) && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-[100] left-0 right-0 top-full mt-2 rounded-xl bg-cosmos/95 backdrop-blur-lg border border-gold/20 overflow-hidden shadow-2xl divide-y divide-white/5 max-h-60 overflow-y-auto"
          >
            {loading ? (
              <li className="px-4 py-3 text-xs text-foreground/40 animate-pulse">Searching cities...</li>
            ) : (
              suggestions.map((item) => (
                <li key={item.place_id}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(item.display_name);
                      setSuggestions([]);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-xs text-foreground/70 hover:bg-white/5 hover:text-gold transition-colors"
                  >
                    {item.display_name}
                  </button>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Summary Card ──────────────────────────────────────────────────────────────
function SummaryCard({ report }: { report: KundliReport }) {
  const { summary, ascendant, metadata } = report;
  return (
    <div className="glass-strong rounded-3xl p-8 border border-gold/15 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="grid md:grid-cols-3 gap-6 relative">
        <div className="md:col-span-2">
          <p className="text-xs text-gold/80 tracking-widest uppercase mb-2 font-semibold">Vedic Kundli Report</p>
          <h2 className="text-3xl font-display text-gradient-gold mb-1">{report.person.name}</h2>
          <p className="text-foreground/50 text-sm mb-4">
            {formatDate(metadata.date_of_birth)} · {metadata.time_of_birth} · {ascendant.sign} Ascendant
          </p>
          <p className="text-foreground/75 text-sm leading-relaxed max-w-lg">{summary.overview}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <MetaBadge icon={ZODIAC_SYMBOLS[ascendant.sign] || "⬡"} label={`${ascendant.sign} Rising`} />
            <MetaBadge icon="🧿" label={`${summary.yoga_count} Yoga${summary.yoga_count !== 1 ? "s" : ""} Detected`} />
            <MetaBadge icon="🏆" label={`Strongest: ${summary.strongest_area}`} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 rounded-full border border-gold/25 animate-pulse" />
            <div className="absolute inset-3 rounded-full border border-royal/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl">{ZODIAC_SYMBOLS[ascendant.sign] || "⬡"}</span>
              <span className="text-xs text-gold font-semibold mt-1">{ascendant.sign}</span>
              <span className="text-[10px] text-foreground/40">Ascendant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass text-xs text-foreground/70 border border-white/5 font-medium shadow-sm">
      <span>{icon}</span>{label}
    </span>
  );
}

// ─── Life Modules Tab ──────────────────────────────────────────────────────────
function LifeModulesTab({ report }: { report: KundliReport }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {report.life_modules.map((mod) => (
        <div key={mod.key}
          className="glass rounded-2xl p-6 border border-white/5 hover:border-gold/20 transition-all group relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
            style={{ background: mod.color }} />

          <div className="flex items-start justify-between mb-4">
            <span className="text-3xl">{MODULE_ICONS[mod.key] || "✦"}</span>
            <span className="text-xs text-foreground/40 font-semibold font-mono">{mod.score}/100</span>
          </div>

          <p className="text-xs text-foreground/50 tracking-wider uppercase mb-1 font-semibold">{mod.label}</p>

          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${mod.score}%`, background: mod.color }} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base font-semibold" style={{ color: mod.color }}>
              {mod.score_label}
            </span>
            <span className="text-sm text-gold/80 tracking-wider font-medium">{mod.stars}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Planets Tab ───────────────────────────────────────────────────────────────
function PlanetsTab({ report, expandedPlanet, setExpandedPlanet }: {
  report: KundliReport;
  expandedPlanet: string | null;
  setExpandedPlanet: (v: string | null) => void;
}) {
  const [hasPass, setHasPass] = useState(false);

  useEffect(() => {
    try {
      const bookings = localStorage.getItem('grahganit_user_bookings');
      if (bookings && JSON.parse(bookings).length > 0) {
        setHasPass(true);
      }
    } catch (err) {}
  }, []);

  return (
    <div className="space-y-3">
      {hasPass && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs mb-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="text-base">✓</span>
            <span>FULL 9-PLANET KUNDALI ANALYSIS UNLOCKED VIA CONSULTATION PASS</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-300/80 uppercase">Verified Access</span>
        </div>
      )}

      {report.planets.map((planet, idx) => {
        const isExpanded = expandedPlanet === planet.name;
        const isLocked = !hasPass && idx >= 3;

        return (
          <div key={planet.name}
            className={`glass rounded-2xl border transition-all overflow-hidden shadow-sm ${
              isLocked ? "border-amber-500/20 bg-black/20" : "border-white/5 hover:border-gold/15"
            }`}>
            <button onClick={() => setExpandedPlanet(isExpanded ? null : planet.name)}
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/2 transition-all">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${planet.strength.color}18`, border: `1px solid ${planet.strength.color}30` }}>
                {PLANET_SYMBOLS[planet.name] || planet.name[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm">{planet.name}</span>
                  {planet.is_retrograde && (
                    <span className="text-[10px] text-orange-400 border border-orange-400/30 px-2 py-0.5 rounded-full font-medium">ℛ Retrograde</span>
                  )}
                  {isLocked ? (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                      🔒 Partial Preview
                    </span>
                  ) : (
                    <span className="text-xs text-foreground/40 font-medium">{planet.explanation_path}</span>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col items-end gap-1">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${planet.strength.color}20`, color: planet.strength.color }}>
                  {planet.strength.label}
                </span>
                <span className="text-xs text-gold/60 tracking-wider">{planet.strength.stars}</span>
              </div>

              <span className={`text-foreground/30 transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
            </button>

            {isExpanded && (
              <div className="border-t border-white/5 p-5 bg-white/[0.02] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    ["Sign", `${ZODIAC_SYMBOLS[planet.sign] || ""} ${planet.sign}`],
                    ["House", `H${planet.house} · ${planet.house_name}`],
                    ["Nakshatra", `${planet.nakshatra} (P${planet.pada})`],
                    ["Degree", `${planet.degree}°`],
                  ].map(([label, val]) => (
                    <div key={label} className="glass rounded-xl p-3 border border-white/5">
                      <p className="text-[10px] text-foreground/40 uppercase tracking-wider mb-1 font-semibold">{label}</p>
                      <p className="text-xs font-semibold truncate text-foreground/90">{val}</p>
                    </div>
                  ))}
                </div>

                {isLocked ? (
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 to-black/60 border border-amber-500/30 text-center space-y-3">
                    <span className="text-2xl">🔒</span>
                    <h4 className="text-base font-display text-amber-300 font-medium">
                      Deep Karmic Placement Statements & Transits Locked
                    </h4>
                    <p className="text-xs text-foreground/70 max-w-md mx-auto leading-relaxed">
                      Unlock full 9-planet analysis, Mahadasha effects, and pacification remedies (Gems, Mantras, Yagya) for {planet.name} by booking any consultation session.
                    </p>
                    <a href="/booking" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold hover:scale-105 transition-all shadow-lg">
                      Unlock Full Planetary Remedies ✦
                    </a>
                  </div>
                ) : (
                  <>
                    {planet.sign_statements.length > 0 && (
                      <div>
                        <p className="text-[10px] text-gold/80 uppercase tracking-widest mb-2 font-bold">
                          {planet.name} in {planet.sign}
                        </p>
                        <ul className="space-y-1.5">
                          {planet.sign_statements.map((s, i) => (
                            <li key={i} className="text-sm text-foreground/75 flex gap-2">
                              <span className="text-gold/40 mt-0.5 flex-shrink-0">·</span>{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {planet.house_statements.length > 0 && (
                      <div>
                        <p className="text-[10px] text-royal-soft/80 uppercase tracking-widest mb-2 font-bold">
                          {planet.name} in House {planet.house}
                        </p>
                        <ul className="space-y-1.5">
                          {planet.house_statements.map((s, i) => (
                            <li key={i} className="text-sm text-foreground/75 flex gap-2">
                              <span className="text-royal-soft/40 mt-0.5 flex-shrink-0">·</span>{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Yogas / Dosha Remedies Tab ───────────────────────────────────────────────
function YogasTab({ report }: { report: KundliReport }) {
  const [hasPass, setHasPass] = useState(false);

  useEffect(() => {
    try {
      const bookings = localStorage.getItem('grahganit_user_bookings');
      if (bookings && JSON.parse(bookings).length > 0) {
        setHasPass(true);
      }
    } catch (err) {}
  }, []);

  const RARITY_COLORS: Record<string, string> = {
    Common: "#94a3b8",
    Uncommon: "#38bdf8",
    Rare: "#a855f7",
    "Ultra-Rare": "#f59e0b",
  };

  const MODULE_ICONS: Record<string, string> = {
    Kundli: "🌌",
    Numerology: "🔢",
    Palmistry: "✋",
    Reflections: "🪞",
  };

  return (
    <div className="space-y-4">
      {hasPass && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="text-base">✓</span>
            <span>ALL CELESTIAL YOGAS & REMEDIAL STEPS UNLOCKED VIA CONSULTATION PASS</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-300/80 uppercase">Verified Access</span>
        </div>
      )}

      <p className="text-center text-sm text-foreground/40 font-medium">
        {report.yogas.length} yoga{report.yogas.length !== 1 ? "s" : ""} detected in {report.person.name}'s chart
      </p>
      {report.yogas.map((yoga, idx) => {
        const isLocked = !hasPass && idx >= 2;

        return (
          <div key={yoga.id}
            className={`glass rounded-2xl p-6 border transition-all shadow-md relative overflow-hidden ${
              isLocked ? "border-amber-500/20 bg-black/30" : "border-white/5 hover:border-gold/15"
            }`}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-xl text-gradient-gold">{yoga.name}</h3>
                  <span className="text-[10px] border rounded-full px-2.5 py-0.5 flex-shrink-0 font-semibold"
                    style={{ color: RARITY_COLORS[yoga.rarity], borderColor: `${RARITY_COLORS[yoga.rarity]}40` }}>
                    {yoga.rarity}
                  </span>
                  {isLocked && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono font-bold">
                      🔒 Partial Locked
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground/40 mt-0.5 font-medium">{yoga.category} · Source: {yoga.source}</p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                {yoga.applicable_modules.slice(0, 3).map((m) => (
                  <span key={m} className="text-base" title={m}>{MODULE_ICONS[m] || "✦"}</span>
                ))}
              </div>
            </div>

            <p className="text-sm text-foreground/60 mb-4 leading-relaxed">{yoga.description}</p>

            {isLocked ? (
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center space-y-2">
                <p className="text-xs text-amber-200/90 font-medium">
                  🔒 Detailed Yagya Remedies, Dosh Mitigation (Kalsarp/Mangal), & Neutralization Steps Locked.
                </p>
                <a href="/booking" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold hover:brightness-110 transition shadow-md">
                  Consult Astrologer to Unlock Remedies ✦
                </a>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gold/80">✦ Remedial Actions:</p>
                <p className="text-xs text-foreground/75 leading-relaxed bg-white/3 p-3 rounded-xl border border-white/5">
                  {(yoga as any).remedy || "Perform Saturn Mahadasha pacification, wear Blue Sapphire / Amethyst upon consultation, and recite Om Sham Shanayscharaya Namah 108x daily."}
                </p>
              </div>
            )}

            <p className="text-[10px] text-foreground/25 mt-4 font-mono">
              🔍 {yoga.explanation_path}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Chart Tab (Includes toggle + Renderers) ───────────────────────────────────
function ChartTab({ report, chartStyle, setChartStyle }: {
  report: KundliReport;
  chartStyle: "north" | "south";
  setChartStyle: (v: "north" | "south") => void;
}) {
  return (
    <div className="space-y-6">
      {/* Toggle Style */}
      <div className="flex gap-1 p-1 glass rounded-full w-fit mx-auto border border-white/5">
        <button onClick={() => setChartStyle("north")}
          className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${chartStyle === "north"
            ? "bg-primary text-white shadow-md"
            : "text-foreground/50 hover:text-foreground/85"}`}>
          North Indian Style (Lagna)
        </button>
        <button onClick={() => setChartStyle("south")}
          className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${chartStyle === "south"
            ? "bg-primary text-white shadow-md"
            : "text-foreground/50 hover:text-foreground/85"}`}>
          South Indian Style
        </button>
      </div>

      <p className="text-center text-xs text-foreground/45">
        {chartStyle === "north" ? "North Indian (Diamond)" : "South Indian (Grid)"} Format · {report.metadata.ayanamsa} Ayanamsa · {report.metadata.house_system === "W" ? "Whole Sign" : "Placidus"} Houses
      </p>

      {chartStyle === "north" ? (
        <NorthIndianChart report={report} />
      ) : (
        <SouthIndianChart report={report} />
      )}
    </div>
  );
}

// ─── North Indian Chart (SVG based) ────────────────────────────────────────────
function NorthIndianChart({ report }: { report: KundliReport }) {
  // Build house → planet placements map
  const houseMap: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) houseMap[i] = [];
  report.planets.forEach((p) => {
    const label = `${PLANET_ABBR[p.name] || p.name.slice(0, 2)}${p.is_retrograde ? "®" : ""}`;
    if (houseMap[p.house]) houseMap[p.house].push(label);
  });
  
  // Add Ascendant (Lagna) to House 1
  houseMap[1].unshift("Asc");

  // Determine Zodiac Sign Number (Rashis) for each house.
  // House 1 is always the Ascendant. Houses count anti-clockwise.
  const ascSignName = report.ascendant.sign;
  const ascIndex = ZODIAC_INDEX[ascSignName] || 1;

  const getSignNumForHouse = (h: number) => {
    return ((ascIndex + h - 2) % 12) + 1;
  };

  // Center positions for the 12 houses on a 300x300 canvas
  const housePlacements: Record<number, { textX: number; textY: number; signX: number; signY: number }> = {
    1:  { textX: 150, textY: 90,  signX: 150, signY: 55 },
    2:  { textX: 75,  textY: 45,  signX: 110, signY: 45 },
    3:  { textX: 45,  textY: 75,  signX: 45,  signY: 110 },
    4:  { textX: 90,  textY: 150, signX: 55,  signY: 150 },
    5:  { textX: 45,  textY: 225, signX: 45,  signY: 190 },
    6:  { textX: 75,  textY: 255, signX: 110, signY: 255 },
    7:  { textX: 150, textY: 210, signX: 150, signY: 245 },
    8:  { textX: 225, textY: 255, signX: 190, signY: 255 },
    9:  { textX: 255, textY: 225, signX: 255, signY: 190 },
    10: { textX: 210, textY: 150, signX: 245, signY: 150 },
    11: { textX: 255, textY: 75,  signX: 255, signY: 110 },
    12: { textX: 225, textY: 45,  signX: 190, signY: 45 },
  };

  return (
    <div className="glass rounded-3xl p-6 border border-white/5 max-w-lg mx-auto shadow-md">
      <svg viewBox="0 0 300 300" className="w-full h-full text-foreground select-none" style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))" }}>
        {/* Outer Square */}
        <rect x="10" y="10" width="280" height="280" fill="rgba(10,8,24,0.6)" stroke="#D4A94F" strokeWidth="2.5" />
        
        {/* Diagonals */}
        <line x1="10" y1="10" x2="290" y2="290" stroke="rgba(212,169,79,0.5)" strokeWidth="1.5" />
        <line x1="290" y1="10" x2="10" y2="290" stroke="rgba(212,169,79,0.5)" strokeWidth="1.5" />
        
        {/* Inner Diamond */}
        <path d="M 150 10 L 10 150 L 150 290 L 290 150 Z" fill="none" stroke="#D4A94F" strokeWidth="1.8" />

        {/* Labels & Planets for each house */}
        {Object.entries(housePlacements).map(([hStr, pos]) => {
          const h = parseInt(hStr);
          const planets = houseMap[h] || [];
          const signNum = getSignNumForHouse(h);
          
          return (
            <g key={h}>
              {/* Sign Number */}
              <text x={pos.signX} y={pos.signY} textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#D4A94F" fontWeight="bold">
                {signNum}
              </text>
              
              {/* Planets */}
              {planets.length > 0 ? (
                <text x={pos.textX} y={pos.textY} textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#E2E8F0" fontWeight="bold">
                  {planets.map((p, idx) => (
                    <tspan key={p} x={pos.textX} dy={idx === 0 ? 0 : 13}>
                      {p}
                    </tspan>
                  ))}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── South Indian Chart (Grid based) ───────────────────────────────────────────
function SouthIndianChart({ report }: { report: KundliReport }) {
  // Build house → planet placements map
  const houseMap: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) houseMap[i] = [];
  report.planets.forEach((p) => {
    const label = `${PLANET_ABBR[p.name] || p.name.slice(0, 2)}${p.is_retrograde ? "®" : ""}`;
    if (houseMap[p.house]) houseMap[p.house].push(label);
  });

  // Add Ascendant to House 1
  houseMap[1].unshift("Asc");

  // South Indian chart grid layout order (row-major along perimeter)
  const gridOrder = [12, 1, 2, 3, 11, 0, 0, 4, 10, 0, 0, 5, 9, 8, 7, 6];

  return (
    <div className="glass rounded-3xl p-6 border border-white/5 max-w-xl mx-auto shadow-md">
      <div className="grid grid-cols-4 gap-2">
        {gridOrder.map((house, idx) => {
          const isCenter = house === 0;
          if (isCenter) {
            return (
              <div key={`c-${idx}`}
                className="aspect-square flex items-center justify-center bg-white/[0.01] rounded-xl text-center p-2 border border-white/5">
                {idx === 5 && (
                  <div>
                    <p className="text-[10px] text-gold/80 font-display font-bold leading-tight">
                      {report.person.name.split(" ")[0]}
                    </p>
                    <p className="text-[9px] text-foreground/45 mt-0.5">{report.ascendant.sign}</p>
                  </div>
                )}
              </div>
            );
          }
          const planets = houseMap[house] || [];
          const isAsc = house === 1;
          const signName = report.planets.find((pp) => pp.house === house)?.sign || "";

          return (
            <div key={house}
              className={`aspect-square p-2.5 rounded-xl border text-center flex flex-col justify-between transition-all
                ${isAsc ? "border-gold/30 bg-gold/5 shadow-[0_0_15px_rgba(212,169,79,0.1)]" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}>
              
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-bold font-mono ${isAsc ? "text-gold" : "text-foreground/30"}`}>
                  H{house}
                </span>
                <span className="text-[9px] text-foreground/25 font-bold uppercase">
                  {signName.slice(0, 3)}
                </span>
              </div>

              {/* Planet Labels list */}
              <div className="flex flex-col gap-1 my-1 justify-center items-center flex-grow">
                {planets.map((p) => (
                  <span key={p} className="text-xs font-bold text-foreground/90 leading-none">
                    {p}
                  </span>
                ))}
              </div>

              <span className="text-[11px] text-gold/50">
                {ZODIAC_SYMBOLS[signName] || ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
