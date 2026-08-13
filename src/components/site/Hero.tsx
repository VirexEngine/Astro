import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ZodiacWheel } from "./ZodiacWheel";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        {/* ── Left side ─────────────────────────────────── */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft border border-gold/30">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" /> GrahGanit (ग्रह गणित) · Precision Vedic Engine
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-gradient-cosmic">
            Discover Your<br />Cosmic Blueprint
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/70 leading-relaxed">
            Welcome to <strong className="text-gold font-medium">GrahGanit (ग्रह गणित)</strong> — where ancient Vedic planetary mathematics meets cutting-edge astronomical precision. Instantly generate your authentic Kundali, sidereal transits, numerology matrix & palmistry insights.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="/free-tools/kundli" variant="primary">
              Get Your Free Kundali <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="/free-tools/numerology" variant="ghost">
              Explore Numerology
            </MagneticButton>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 text-xs font-mono text-white/60">
            <span className="flex items-center gap-1.5"><span className="text-gold">✨</span> Deterministic Ephemeris</span>
            <span className="flex items-center gap-1.5"><span className="text-gold">🪐</span> Instant Yoga & Dasha Calculations</span>
            <span className="flex items-center gap-1.5"><span className="text-gold">📜</span> Pure Vedic Accuracy</span>
          </div>
        </div>

        {/* ── Right side — Zodiac Wheel ────────────────────────────── */}
        <div className="relative mx-auto flex w-full max-w-[560px] flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="relative mx-auto flex aspect-square w-full items-center justify-center"
          >
            <ZodiacWheel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── MagneticButton ───────────────────────────────────────────────
function MagneticButton({ href, children, variant }: { href: string; children: React.ReactNode; variant: "primary" | "ghost" }) {
  const base = "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 overflow-hidden";
  if (variant === "primary") {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={`${base} bg-gradient-to-r from-royal via-royal-soft to-gold text-white shadow-[0_10px_40px_-10px_rgba(245,158,11,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(245,158,11,0.8)]`}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} glass-strong text-foreground hover:glow-gold`}
    >
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
