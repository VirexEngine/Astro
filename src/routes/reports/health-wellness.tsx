import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer, FloatingActions } from "@/components/site/Sections";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Activity, ShieldCheck, HeartPulse } from "lucide-react";

export const Route = createFileRoute("/reports/health-wellness")({
  component: HealthWellnessReport,
  head: () => ({
    meta: [
      { title: "Health & Vitality Wellness Report | GrahGanit" },
      { name: "description", content: "Explore 6th & 8th house transits, Ayurvedic Dosha constitution, physical vitality, and energetic remedies." }
    ],
  }),
});

function HealthWellnessReport() {
  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 mx-auto max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft border border-gold/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" /> Nurturing Mind &amp; Body
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-gradient-cosmic leading-tight mb-6">
            Vitality &amp; Health Alignment
          </h1>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Gain proactive insights into your physical constitution (Prakriti), 6th house immunity patterns, and mental equilibrium mapped against planetary transits.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">6th House Immunity &amp; Resilience</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Understand Roga Bhava (6th House) transits, Sun vitality, and Moon emotional health to take preventative care during challenging dasha phases.
            </p>
          </div>

          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-6">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">Ayurvedic Dosha &amp; Energy Alignment</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Identify Vata, Pitta, or Kapha dominance in your natal chart and receive customized lifestyle routines and mantras to restore balance.
            </p>
          </div>
        </div>

        {/* Deliverables List */}
        <div className="glass-strong p-8 sm:p-12 rounded-3xl border border-gold/30 shadow-2xl mb-16 space-y-6">
          <h3 className="text-2xl font-display text-gradient-gold">What Your Health Report Includes:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground/80 font-sans">
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> 6th &amp; 8th House Vulnerability Analysis</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Sun (Surya) Vitality &amp; Moon Mental Balance Rating</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Ayurvedic Planetary Constitution (Vata/Pitta/Kapha)</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Vulnerable Health Windows During Transit Cycles</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Chakra Balancing &amp; Holistic Routine Suggestions</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Mahamrityunjaya Mantra &amp; Healing Pooja Guides</li>
          </ul>
        </div>

        {/* CTA Box */}
        <div className="glass-strong p-10 rounded-3xl border border-white/10 text-center space-y-6 bg-gradient-to-b from-purple/10 to-transparent">
          <h3 className="text-3xl font-display text-white">Seeking Mind &amp; Body Energetic Harmony?</h3>
          <p className="text-foreground/70 text-sm max-w-xl mx-auto">
            Book a 1-on-1 Health &amp; Spiritual Consultation with Acharyaa Smita Mishra to receive personalized remedies and wellness guidance.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              search={{ plan: "health", focus: "Health" }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-gold-soft to-amber-500 text-cosmos font-bold text-xs uppercase tracking-widest px-8 py-4 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all hover:scale-105 cursor-pointer"
            >
              <span>Book Health &amp; Vitality Guidance</span>
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
