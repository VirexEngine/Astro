import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

// ─── Slide Data ───────────────────────────────────────────────────────────────
interface ReportSlide {
  id: string;
  tabName: string;
  eyebrow: string;
  headline: [string, string];
  subtext: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  bookImage: string;
}

const REPORTS: ReportSlide[] = [
  {
    id: "birth",
    tabName: "Origins",
    eyebrow: "✦ Explore Your Foundations",
    headline: ["The Beginning That", "Shapes Everything"],
    subtext: "Delve into the celestial patterns present at your birth to understand your deepest psychological roots. This detailed report uncovers the fundamental energies that shaped your early years and continue to guide your path.",
    ctaPrimary: { label: "Explore Origins", href: "/reports/birth-early-life" },
    ctaSecondary: { label: "Ask Astrologer", href: "/booking?plan=life&focus=Origins" },
    bookImage: "/books/birth_and_early_life.jpeg",
  },
  {
    id: "education",
    tabName: "Education",
    eyebrow: "✦ Awaken Your Intellect",
    headline: ["Your Mind's", "True Path"],
    subtext: "Uncover your natural learning inclinations and the environments where your intellect truly thrives. A vital guide for navigating academic journeys and intellectual growth.",
    ctaPrimary: { label: "Explore Path", href: "/reports/education" },
    ctaSecondary: { label: "Ask Astrologer", href: "/booking?plan=life&focus=Education" },
    bookImage: "/books/education.jpeg",
  },
  {
    id: "career",
    tabName: "Career",
    eyebrow: "✦ Align With Your Purpose",
    headline: ["Potential Deserves", "Direction"],
    subtext: "Find the professional path that resonates with your core energies. Learn to leverage your innate strengths, identify favorable periods for growth, and achieve genuine career fulfillment.",
    ctaPrimary: { label: "Explore Career", href: "/reports/career" },
    ctaSecondary: { label: "Ask Astrologer", href: "/booking?plan=career&focus=Career" },
    bookImage: "/books/career.jpeg",
  },
  {
    id: "marriage",
    tabName: "Marriage",
    eyebrow: "✦ Understand Your Connections",
    headline: ["A Sacred Bond,", "A Shared Journey"],
    subtext: "Navigate the complex dynamics of partnerships. This report helps uncover the timing, nature, and underlying harmony of your most significant emotional bonds.",
    ctaPrimary: { label: "Explore Bonds", href: "/reports/marriage" },
    ctaSecondary: { label: "Ask Astrologer", href: "/booking?plan=marriage&focus=Marriage" },
    bookImage: "/books/marriage.jpeg",
  },
  {
    id: "wealth",
    tabName: "Prosperity",
    eyebrow: "✦ Manifest Your Abundance",
    headline: ["Prosperity Written", "in the Stars"],
    subtext: "Discover the astrological indicators of wealth and learn how to align with the flow of abundance. Identify blockages and favorable periods for long-term financial growth.",
    ctaPrimary: { label: "Explore Prosperity", href: "/reports/wealth-growth" },
    ctaSecondary: { label: "Ask Astrologer", href: "/booking?plan=finance&focus=Wealth" },
    bookImage: "/books/wealth_and_growth.jpeg",
  },
  {
    id: "health",
    tabName: "Vitality",
    eyebrow: "✦ Nurture Your Vitality",
    headline: ["A Healthy Body,", "A Balanced Mind"],
    subtext: "Gain insights into your physical and mental well-being to proactively maintain harmony and health according to your unique planetary constitution.",
    ctaPrimary: { label: "Explore Vitality", href: "/reports/health-wellness" },
    ctaSecondary: { label: "Ask Astrologer", href: "/booking?plan=health&focus=Health" },
    bookImage: "/books/health_and_wellness.jpeg",
  },
];

const INTERVAL_MS = 6000;

export function ReportsExplorerSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REPORTS.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section id="reports" className="relative py-24 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-gold tracking-[0.2em] text-xs font-semibold uppercase mb-4"
          >
            <BookOpen className="h-4 w-4" /> Cosmic Reports
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-gradient-cosmic mb-4"
          >
            Explore Your Path
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg"
          >
            Select an area of your life to uncover deep psychological insights and astrological guidance tailored entirely to you.
          </motion.p>
        </div>

        {/* Explorer Container - Full Width Horizontal */}
        <div className="relative w-full rounded-3xl glass border border-white/5 shadow-2xl bg-black/10 px-6 py-10 md:p-16 min-h-[500px]">
          
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              
              {/* Left Side: Text and CTAs */}
              <div className="flex flex-col justify-center h-full order-2 lg:order-1 text-center lg:text-left">
                <span className="text-[11px] uppercase tracking-widest text-gold/90 font-medium mb-4 block">
                  {REPORTS[current].eyebrow}
                </span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6">
                  {REPORTS[current].headline[0]} <span className="text-gradient-gold block mt-1">{REPORTS[current].headline[1]}</span>
                </h3>
                <p className="text-base md:text-lg text-foreground/70 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {REPORTS[current].subtext}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto justify-center lg:justify-start">
                  <Link
                    to={REPORTS[current].ctaPrimary.href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-medium text-white bg-gradient-to-r from-royal via-royal-soft to-gold shadow-[0_10px_40px_-10px_rgba(245,158,11,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(245,158,11,0.8)] transition-all hover:scale-[1.03] cursor-pointer"
                  >
                    {REPORTS[current].ctaPrimary.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={REPORTS[current].ctaSecondary.href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-medium text-white/90 hover:text-white glass-strong border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.03] cursor-pointer"
                  >
                    {REPORTS[current].ctaSecondary.label}
                  </a>
                </div>
              </div>

              {/* Right Side: Blended Book Image */}
              <div className="flex items-center justify-center relative order-1 lg:order-2 h-[350px] md:h-[450px]">
                {/* Soft ambient glow behind the book */}
                <div
                  className="absolute rounded-full opacity-60 blur-3xl pointer-events-none"
                  style={{ 
                    width: "350px", 
                    height: "350px",
                    background: "radial-gradient(circle, rgba(212,169,79,0.3), transparent 70%)" 
                  }}
                />
                
                <div className="relative z-10 w-[260px] md:w-[320px] lg:w-[360px]">
                  <img
                    src={REPORTS[current].bookImage}
                    alt={REPORTS[current].headline.join(" ")}
                    className="w-full h-auto object-cover"
                    style={{
                      maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
                      transform: "perspective(1000px) rotateY(-5deg) rotateX(2deg)"
                    }}
                  />
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimalist Explorer Navigation Menu */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-6">
          {REPORTS.map((report, idx) => (
            <button
              key={report.id}
              onClick={() => {
                setCurrent(idx);
                setPaused(true);
                setTimeout(() => setPaused(false), INTERVAL_MS);
              }}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                current === idx ? "text-gold" : "text-foreground/50 hover:text-foreground/90"
              }`}
            >
              {report.tabName}
              {current === idx && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
                />
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
