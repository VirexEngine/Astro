import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer, FloatingActions } from "@/components/site/Sections";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, Compass, ShieldCheck, Star } from "lucide-react";

export const Route = createFileRoute("/reports/birth-early-life")({
  component: BirthEarlyLifeReport,
  head: () => ({
    meta: [
      { title: "Origins & Birth Chart Analysis Report | GrahGanit" },
      { name: "description", content: "Uncover the celestial positions, Lagna energies, and early childhood Dasha cycles that shaped your foundational life trajectory." }
    ],
  }),
});

function BirthEarlyLifeReport() {
  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 mx-auto max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft border border-gold/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" /> Foundational Cosmic Analysis
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-gradient-cosmic leading-tight mb-6">
            Origins &amp; Birth Chart Analysis
          </h1>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Delve into the exact planetary positions at your moment of birth. Discover how your Ascendant (Lagna), Sun, Moon, and early Dasha transits formed your psychological core.
          </p>
        </div>

        {/* Feature Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">Lagna &amp; First House Dynamics</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Your Ascendant determines your physical constitution, innate temperament, and how you project yourself to the world. We map out your primary ruling planet and its strength.
            </p>
          </div>

          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-6">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">Childhood Dasha Timeline</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Analyze the Vimshottari Dasha period active at your birth to understand early family environments, parental bonds, and subconscious conditioning.
            </p>
          </div>
        </div>

        {/* Sample Report Insights Box */}
        <div className="glass-strong p-8 sm:p-12 rounded-3xl border border-gold/30 shadow-2xl mb-16 space-y-6">
          <h3 className="text-2xl font-display text-gradient-gold">What Your Birth &amp; Origins Report Includes:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground/80 font-sans">
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Ascendant (Lagna) &amp; Lord Placement Analysis</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Sun &amp; Moon Nakshatra Deep-Dive</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Fourth House Family &amp; Emotional Roots</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Infant &amp; Adolescent Dasha Sequences</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Inherited Karmic Yogas &amp; Dosha Checks</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Tailored Remedial Gemstone &amp; Mantra Guidance</li>
          </ul>
        </div>

        {/* Call To Action Box */}
        <div className="glass-strong p-10 rounded-3xl border border-white/10 text-center space-y-6 bg-gradient-to-b from-purple/10 to-transparent">
          <h3 className="text-3xl font-display text-white">Ready for a Personalized Birth Reading?</h3>
          <p className="text-foreground/70 text-sm max-w-xl mx-auto">
            Book a 1-on-1 consultation with Acharyaa Smita Mishra to analyze your full birth chart, Lagna lord, and early dasha patterns.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              search={{ plan: "life", focus: "Origins" }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-gold-soft to-amber-500 text-cosmos font-bold text-xs uppercase tracking-widest px-8 py-4 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all hover:scale-105 cursor-pointer"
            >
              <span>Book Consultation for Origins</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
