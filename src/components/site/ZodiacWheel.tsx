import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Palette, Hash, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

// ─── Types ───────────────────────────────────────────────────────────────────
interface ZodiacSign {
  name: string;
  sym: string;
  element: "fire" | "earth" | "air" | "water";
  imgSrc?: string; // optional: path to illustration image (e.g. /zodiac/Taurus.jpeg)
}

interface DailyReading {
  prediction: string;
  mood: string;
  luckyColor: string;
  luckyNumber: number;
}

// ─── Sign Data ────────────────────────────────────────────────────────────────
const SIGNS: ZodiacSign[] = [
  { name: "Aries",       sym: "♈", element: "fire",  imgSrc: "/zodiac/Aries.jpeg" },
  { name: "Taurus",      sym: "♉", element: "earth", imgSrc: "/zodiac/Taurus.jpeg" },
  { name: "Gemini",      sym: "♊", element: "air",   imgSrc: "/zodiac/Gemini.jpeg" },
  { name: "Cancer",      sym: "♋", element: "water", imgSrc: "/zodiac/Cancer.jpeg" },
  { name: "Leo",         sym: "♌", element: "fire",  imgSrc: "/zodiac/Leo.jpeg"   },
  { name: "Virgo",       sym: "♍", element: "earth", imgSrc: "/zodiac/Virgo.jpeg" },
  { name: "Libra",       sym: "♎", element: "air",   imgSrc: "/zodiac/Libra.jpeg" },
  { name: "Scorpio",     sym: "♏", element: "water", imgSrc: "/zodiac/Scorpio.jpeg" },
  { name: "Sagittarius", sym: "♐", element: "fire",  imgSrc: "/zodiac/Sagittarius.jpeg" },
  { name: "Capricorn",   sym: "♑", element: "earth", imgSrc: "/zodiac/Capricorn.jpeg" },
  { name: "Aquarius",    sym: "♒", element: "air",   imgSrc: "/zodiac/Aquarius.jpeg" },
  { name: "Pisces",      sym: "♓", element: "water", imgSrc: "/zodiac/Pisces.jpeg" },
];

// ─── Daily Readings ───────────────────────────────────────────────────────────
// 📝 Replace prediction/mood/luckyColor/luckyNumber each day with real content.
// Key format: "SignName" — one entry per sign, update daily.
const DAILY_READINGS: Record<string, DailyReading> = {
  Aries: {
    prediction:
      "The cosmos ignites your ambition today — a bold idea that has been simmering finally demands action. Trust your instincts over outside opinion, especially in matters of career and creative expression. By evening, a chance conversation opens an unexpected door.",
    mood: "Driven & Confident",
    luckyColor: "Crimson",
    luckyNumber: 9,
  },
  Taurus: {
    prediction:
      "Venus casts a warm light over your finances and personal relationships today. A moment of patience will yield better results than forcing an outcome — let things unfold at their natural pace. Ground yourself with a short walk or time in nature.",
    mood: "Steady & Receptive",
    luckyColor: "Emerald Green",
    luckyNumber: 6,
  },
  Gemini: {
    prediction:
      "Mercury sharpens your wit and communication today — you'll find the right words come easily, making this an excellent day for negotiations, writing, or difficult conversations. Two paths present themselves; there is no wrong choice, only different timings.",
    mood: "Curious & Articulate",
    luckyColor: "Sunshine Yellow",
    luckyNumber: 5,
  },
  Cancer: {
    prediction:
      "The moon pulls you inward, making this a powerful day for introspection and emotional clarity. Home and family connections are highlighted — reach out to someone you've been meaning to reconnect with. A small ritual or creative act will restore your sense of inner peace.",
    mood: "Nurturing & Intuitive",
    luckyColor: "Silver",
    luckyNumber: 2,
  },
  Leo: {
    prediction:
      "The sun amplifies your natural magnetism — people are drawn to your warmth and leadership today. An opportunity to shine in a group setting arrives; step forward with confidence rather than waiting to be invited. Creative projects flourish under today's fiery energy.",
    mood: "Radiant & Bold",
    luckyColor: "Gold",
    luckyNumber: 1,
  },
  Virgo: {
    prediction:
      "Details that others overlook are your superpower today. A long-standing problem resolves itself when you approach it with methodical calm rather than urgency. Health and wellness routines benefit from a thoughtful adjustment — small habits compound.",
    mood: "Analytical & Grounded",
    luckyColor: "Forest Green",
    luckyNumber: 4,
  },
  Libra: {
    prediction:
      "Balance is your north star today — a relationship dynamic that has been slightly off-centre gently corrects itself. Beauty, art, and aesthetics restore your soul; give yourself permission to enjoy them without guilt. A fair compromise proves more powerful than winning.",
    mood: "Harmonious & Gracious",
    luckyColor: "Soft Rose",
    luckyNumber: 7,
  },
  Scorpio: {
    prediction:
      "Pluto stirs deep waters today, surfacing buried truths that are ready to be acknowledged. Transformation is rarely comfortable, but what you release now creates space for something far more aligned with your true self. Trust the process unfolding beneath the surface.",
    mood: "Intense & Perceptive",
    luckyColor: "Deep Burgundy",
    luckyNumber: 8,
  },
  Sagittarius: {
    prediction:
      "Jupiter expands your horizon today — a long-held vision suddenly feels within reach. Travel, philosophy, or higher learning captures your imagination and opens a new chapter. Share your enthusiasm generously; it is contagious and attracts the right collaborators.",
    mood: "Optimistic & Adventurous",
    luckyColor: "Royal Purple",
    luckyNumber: 3,
  },
  Capricorn: {
    prediction:
      "Saturn rewards discipline today — the effort you have been quietly putting in behind the scenes is about to receive recognition. Structure a plan rather than reacting to circumstances, and you will move forward with precision. An elder or mentor offers valuable perspective.",
    mood: "Focused & Determined",
    luckyColor: "Charcoal",
    luckyNumber: 8,
  },
  Aquarius: {
    prediction:
      "Uranus sparks original thinking — you see a solution where others see only obstacles. This is a day to champion an unconventional idea, especially in collaborative or community-driven projects. Your individuality is not a disruption; it is the catalyst for change.",
    mood: "Visionary & Independent",
    luckyColor: "Electric Blue",
    luckyNumber: 11,
  },
  Pisces: {
    prediction:
      "Neptune heightens your sensitivity and creative imagination today. Dreams, symbols, and synchronicities carry real messages — write them down before they fade. A compassionate gesture toward someone in your circle creates a ripple effect far beyond what you can see.",
    mood: "Dreamy & Empathetic",
    luckyColor: "Sea Foam",
    luckyNumber: 7,
  },
};

// ─── Element color map ────────────────────────────────────────────────────────
const ELEMENT_COLOR: Record<string, string> = {
  fire:  "#F87171",
  earth: "#86EFAC",
  air:   "#93C5FD",
  water: "#C4B5FD",
};

// ─── Geometry helpers ────────────────────────────────────────────────────────
const DEG_TO_RAD = Math.PI / 180;
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg - 90) * DEG_TO_RAD;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ReadingModal({
  sign,
  onClose,
}: {
  sign: ZodiacSign;
  onClose: () => void;
}) {
  const reading = DAILY_READINGS[sign.name];
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const elColor = ELEMENT_COLOR[sign.element];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{ background: "rgba(12,10,26,0.82)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-2xl p-6 sm:p-8"
        style={{
          background: "linear-gradient(145deg, #12102A, #1A1535)",
          border: "1px solid rgba(212,169,79,0.35)",
          boxShadow: "0 32px 80px -16px rgba(0,0,0,0.9), 0 0 0 1px rgba(212,169,79,0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full transition hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-foreground/60" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-3xl"
            style={{
              background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15), rgba(0,0,0,0.3))`,
              border: `1.5px solid ${elColor}55`,
              boxShadow: `0 0 20px ${elColor}33`,
              color: elColor,
            }}
          >
            {sign.sym}
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-gradient-gold leading-tight">
              {sign.name}
            </h2>
            <p className="text-xs text-foreground/50 mt-0.5">{today}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(212,169,79,0.4), transparent)" }} />

        {/* Prediction */}
        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6">
          {reading.prediction}
        </p>

        {/* Flavor stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Star,    label: "Mood",        value: reading.mood },
            { icon: Palette, label: "Lucky Color", value: reading.luckyColor },
            { icon: Hash,    label: "Lucky No.",   value: String(reading.luckyNumber) },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Icon className="h-4 w-4 mb-1.5" style={{ color: "#D4A94F" }} />
              <span className="text-[10px] uppercase tracking-widest text-foreground/40 mb-0.5">{label}</span>
              <span className="text-xs font-medium text-foreground/80 leading-tight">{value}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/booking"
          onClick={onClose}
          className="group flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-white transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #6D28D9, #D97706)",
            boxShadow: "0 8px 32px -8px rgba(245,158,11,0.4)",
          }}
        >
          Get Your Full Reading
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Navagraha (9 Planets) ────────────────────────────────────────────────────
interface Navagraha {
  id: string;
  name: string;
  sanskrit: string;
  desc: string;
  color: string;
  orbit: 1 | 2;
  angle: number;
  dur: number; // orbital period in seconds
  dir: 1 | -1; // 1 = clockwise, -1 = counter-clockwise
}

const NAVAGRAHA: Navagraha[] = [
  { id: "sun", name: "Sun", sanskrit: "Surya", desc: "Governs soul, vitality, and self-expression", color: "#F59E0B", orbit: 2, angle: -90, dur: 120, dir: 1 },
  { id: "moon", name: "Moon", sanskrit: "Chandra", desc: "Governs mind, emotions, and intuition", color: "#F8FAFC", orbit: 1, angle: -50, dur: 85, dir: -1 },
  { id: "mars", name: "Mars", sanskrit: "Mangal", desc: "Governs courage, energy, and action", color: "#EF4444", orbit: 2, angle: -10, dur: 135, dir: 1 },
  { id: "mercury", name: "Mercury", sanskrit: "Budh", desc: "Governs intellect, communication, and logic", color: "#34D399", orbit: 1, angle: 30, dur: 95, dir: -1 },
  { id: "jupiter", name: "Jupiter", sanskrit: "Guru", desc: "Governs wisdom, expansion, and fortune", color: "#FDE047", orbit: 2, angle: 70, dur: 160, dir: 1 },
  { id: "venus", name: "Venus", sanskrit: "Shukra", desc: "Governs love, beauty, and harmony", color: "#FEF3C7", orbit: 1, angle: 110, dur: 110, dir: -1 },
  { id: "saturn", name: "Saturn", sanskrit: "Shani", desc: "Governs discipline, karma, and patience", color: "#94A3B8", orbit: 2, angle: 150, dur: 190, dir: 1 },
  { id: "rahu", name: "North Node", sanskrit: "Rahu", desc: "Governs worldly desires and illusions", color: "#A78BFA", orbit: 1, angle: 190, dur: 140, dir: -1 },
  { id: "ketu", name: "South Node", sanskrit: "Ketu", desc: "Governs spirituality and liberation", color: "#991B1B", orbit: 2, angle: 230, dur: 140, dir: -1 },
];

// ─── Main ZodiacWheel ─────────────────────────────────────────────────────────
export function ZodiacWheel() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<ZodiacSign | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<Navagraha | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handlePlanetMouseMove = (e: React.MouseEvent, planet: Navagraha) => {
    setHoveredPlanet(planet);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  // SVG viewport is 200×200 with center at (100,100)
  const CX = 100;
  const CY = 100;

  // Ring radii (in SVG units)
  const R_OUTER_RING  = 95;   // outermost decorative ring
  const R_ZODIAC      = 85;   // zodiac symbol centers
  const R_ORBIT_1     = 63;   // outer orbit ring (Jupiter / Moon)
  const R_ORBIT_2     = 47;   // inner orbit ring (Sun)
  const R_CORE        = 18;   // central glowing core radius

  // Tick mark geometry
  const TICK_COUNT = 36; // every 10°

  return (
    <>
      <div className="relative h-full w-full select-none">
        {/* Single ambient glow layer — only one blur, not two */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(109,40,217,0.32) 0%, rgba(245,158,11,0.10) 42%, transparent 70%)",
            filter: "blur(32px)",
          }}
        />

        {/* ── Main SVG wheel ─────────────────────────────────────── */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-label="Interactive zodiac wheel"
        >
          <defs>
            {/* Core gradient — defined once, reused */}
            <radialGradient id="coreGrad" cx="38%" cy="38%" r="62%" fx="38%" fy="38%">
              <stop offset="0%"   stopColor="#FDE68A" />
              <stop offset="40%"  stopColor="#D97706" />
              <stop offset="100%" stopColor="#7C3AED" />
            </radialGradient>

            {/* Orbit ring gradient */}
            <linearGradient id="orbitGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#D4A94F" stopOpacity="0.5" />
              <stop offset="50%"  stopColor="#D4A94F" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#D4A94F" stopOpacity="0.5" />
            </linearGradient>

            {/* Core glow filter — only applied to center */}
            <filter id="coreGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle planet glow — shared between the 2 planet icons */}
            <filter id="planetGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Planet body gradients */}
            <radialGradient id="sunGrad" cx="35%" cy="35%" r="65%" fx="35%" fy="35%">
              <stop offset="0%"   stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
            <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%" fx="35%" fy="35%">
              <stop offset="0%"   stopColor="#EDE9FE" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </radialGradient>

            {/* Sign hover glow */}
            <filter id="signGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Clip to square so signs at edges don't overflow */}
            <clipPath id="wheelClip">
              <circle cx={CX} cy={CY} r="98" />
            </clipPath>

            {/* Reusable circle clip at local origin — applied to image signs */}
            <clipPath id="signImgClip">
              <circle cx="0" cy="0" r="8.8" />
            </clipPath>

            {/* Navagraha Planet Glows */}
            {NAVAGRAHA.map((p) => (
              <radialGradient key={`glow-${p.id}`} id={`glow-${p.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={p.color} stopOpacity="0.85" />
                <stop offset="35%" stopColor={p.color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={p.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* ── Outer decorative ring ────────────────────────────── */}
          <circle
            cx={CX} cy={CY} r={R_OUTER_RING}
            fill="none"
            stroke="rgba(212,169,79,0.22)"
            strokeWidth="0.4"
          />

          {/* Tick marks — static, no animation, GPU-friendly */}
          {Array.from({ length: TICK_COUNT }).map((_, i) => {
            const a = (i * 360) / TICK_COUNT;
            const isMain = i % 3 === 0; // every 30° = zodiac boundary
            const p1 = polar(CX, CY, R_OUTER_RING, a);
            const p2 = polar(CX, CY, R_OUTER_RING - (isMain ? 5 : 2.5), a);
            return (
              <line
                key={i}
                x1={p1.x} y1={p1.y}
                x2={p2.x} y2={p2.y}
                stroke={isMain ? "#D4A94F" : "rgba(212,169,79,0.35)"}
                strokeWidth={isMain ? "0.55" : "0.28"}
                strokeLinecap="round"
              />
            );
          })}

          {/* Inner ring at zodiac radius */}
          <circle
            cx={CX} cy={CY} r={R_ZODIAC - 9}
            fill="none"
            stroke="rgba(212,169,79,0.10)"
            strokeWidth="0.3"
          />

          {/* ── Zodiac symbol ring — STATIC (never rotates) ────────── */}
          {SIGNS.map((sign, i) => {
            const angleDeg = i * 30; // 360/12 = 30° per sign
            const pos = polar(CX, CY, R_ZODIAC, angleDeg);
            const isHov = hovered === i;
            const elColor = ELEMENT_COLOR[sign.element];
            const hasImage = Boolean(sign.imgSrc);

            return (
              <g
                key={sign.name}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(sign)}
              >
                {/* Hover / press glow ring — always present */}
                <circle
                  cx={pos.x} cy={pos.y} r="9.6"
                  fill={isHov ? `${elColor}1A` : "rgba(0,0,0,0)"}
                  stroke={isHov ? elColor : "rgba(212,169,79,0.22)"}
                  strokeWidth={isHov ? "0.9" : "0.4"}
                  style={{ transition: "all 0.22s ease" }}
                  filter={isHov ? "url(#signGlow)" : undefined}
                />

                {hasImage ? (
                  /* ── Illustrated image icon ─────────────────── */
                  <g transform={`translate(${pos.x}, ${pos.y})`} clipPath="url(#signImgClip)">
                    <image
                      href={sign.imgSrc}
                      x="-8.8" y="-8.8"
                      width="17.6" height="17.6"
                      preserveAspectRatio="xMidYMid slice"
                      style={{
                        opacity: isHov ? 1 : 0.92,
                        transition: "opacity 0.22s ease",
                        // Slight brightness boost on hover
                        filter: isHov ? "brightness(1.12) drop-shadow(0 0 2px rgba(212,169,79,0.7))" : undefined,
                      }}
                    />
                  </g>
                ) : (
                  /* ── Text glyph placeholder ─────────────────── */
                  <>
                    <circle
                      cx={pos.x} cy={pos.y} r="7.5"
                      fill="rgba(15,12,32,0.70)"
                    />
                    <text
                      x={pos.x} y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="8.5"
                      fill={isHov ? elColor : "#D4A94F"}
                      style={{
                        fontFamily: "serif",
                        transition: "fill 0.2s ease",
                        userSelect: "none",
                        filter: isHov ? "url(#signGlow)" : undefined,
                      }}
                    >
                      {sign.sym}
                    </text>
                  </>
                )}

                {/* Sign name — shown on hover, positioned at outer edge */}
                {isHov && (() => {
                  const labelPos = polar(CX, CY, R_OUTER_RING + 7, angleDeg);
                  return (
                    <text
                      x={labelPos.x} y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="4.5"
                      fill="#D4A94F"
                      style={{ fontFamily: "sans-serif", userSelect: "none", pointerEvents: "none" }}
                    >
                      {sign.name}
                    </text>
                  );
                })()}
              </g>
            );
          })}

          {/* ── Orbit ring 1 — Moon orbit ────────────────────────── */}
          <circle
            cx={CX} cy={CY} r={R_ORBIT_1}
            fill="none"
            stroke="rgba(196,181,253,0.14)"
            strokeWidth="0.5"
            strokeDasharray="1.5 3"
          />

          {/* ── Orbit ring 2 — Sun orbit ─────────────────────────── */}
          <circle
            cx={CX} cy={CY} r={R_ORBIT_2}
            fill="none"
            stroke="rgba(245,158,11,0.16)"
            strokeWidth="0.5"
          />

          {/* ── Navagraha (9 Planets) ────────────────────────────────── */}
          {NAVAGRAHA.map((planet) => {
            const radius = planet.orbit === 1 ? R_ORBIT_1 : R_ORBIT_2;
            const pos = polar(CX, CY, radius, planet.angle);
            const isHov = hoveredPlanet?.id === planet.id;
            
            return (
              <g key={planet.id}>
                {/* Orbital Animation (GPU accelerated, no JS updates) */}
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from={`0 ${CX} ${CY}`}
                  to={`${360 * planet.dir} ${CX} ${CY}`}
                  dur={`${planet.dur}s`}
                  repeatCount="indefinite"
                />
                
                <g
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onMouseMove={(e) => handlePlanetMouseMove(e, planet)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Subtle soft glow ring matching planet color */}
                  <circle
                    r={isHov ? "6.5" : "4.5"}
                    fill={`url(#glow-${planet.id})`}
                    style={{ transition: "all 0.2s ease" }}
                  />
                  {/* Consistent central core dot (~10px scaled) */}
                  <circle
                    r="1.6"
                    fill={planet.color}
                    style={{ transition: "all 0.2s ease", transform: isHov ? "scale(1.2)" : "scale(1)" }}
                  />
                </g>
              </g>
            );
          })}

          {/* ── Central core ─────────────────────────────────────── */}
          {/* Soft ambient ring behind core — CSS animation, no JS */}
          <circle
            cx={CX} cy={CY} r={R_CORE + 6}
            fill="rgba(245,158,11,0.07)"
            className="animate-core-pulse"
          />
          <circle
            cx={CX} cy={CY} r={R_CORE}
            fill="url(#coreGrad)"
            filter="url(#coreGlow)"
          />
          {/* ✦ centre glyph */}
          <text
            x={CX} y={CY}
            textAnchor="middle" dominantBaseline="central"
            fontSize="14"
            fill="rgba(255,255,255,0.92)"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            ✦
          </text>
        </svg>

        {/* "Tap a sign" hint */}
        <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-widest uppercase text-foreground/30">
          tap a sign for today's reading
        </p>

        {/* Planet Tooltip */}
        <AnimatePresence>
          {hoveredPlanet && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="fixed z-[100] p-3 rounded-xl bg-black/85 backdrop-blur-md border border-gold/30 text-center pointer-events-none w-52 shadow-2xl"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: 'translate(-50%, -130%)' // Hover above cursor
              }}
            >
              <div className="font-display text-gold text-lg mb-0.5 leading-none">
                {hoveredPlanet.sanskrit} <span className="text-sm opacity-80 text-white/70">({hoveredPlanet.name})</span>
              </div>
              <div className="text-xs text-white/90 leading-snug mt-2">
                {hoveredPlanet.desc}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Reading modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <ReadingModal sign={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
