import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer, FloatingActions } from "@/components/site/Sections";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/reports/marriage")({
  component: MarriageReport,
  head: () => ({
    meta: [
      { title: "Marriage & Relationship Compatibility Report | GrahGanit" },
      { name: "description", content: "Explore 7th house dynamics, Venus alignment, Mangal Dosha, and matrimonial timing." }
    ],
  }),
});

function MarriageReport() {
  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 mx-auto max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft border border-gold/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" /> Sacred Bonds &amp; Compatibility
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-gradient-cosmic leading-tight mb-6">
            Marriage &amp; Relationship Harmony
          </h1>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Uncover the planetary forces governing emotional bonds, spouse characteristics, timing of marriage, and remedies for marital friction.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">7th House &amp; Venus Dynamics</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Analyze Kalatra Bhava (7th House), Venus (Shukra), and Jupiter to understand your partner's nature, emotional alignment, and core relationship traits.
            </p>
          </div>

          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">Mangal Dosha &amp; Synastry</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Evaluate Mars placement to check for Kuja/Mangal Dosha, calculate Guna Milan scores, and identify remedies for long-term domestic peace.
            </p>
          </div>
        </div>

        {/* Deliverables List */}
        <div className="glass-strong p-8 sm:p-12 rounded-3xl border border-gold/30 shadow-2xl mb-16 space-y-6">
          <h3 className="text-2xl font-display text-gradient-gold">What Your Marriage Report Includes:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground/80 font-sans">
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> 7th House Lord Placement &amp; Navamsha (D9) Analysis</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Spouse Appearance, Background &amp; Nature</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Favorable Marriage &amp; Proposal Windows</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Mangal Dosha &amp; Rahu-Ketu Relationship Checks</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Partner Synastry &amp; Mutual Growth Potential</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Relationship Harmonies &amp; Vedic Pooja Remedies</li>
          </ul>
        </div>

        {/* CTA Box */}
        <div className="glass-strong p-10 rounded-3xl border border-white/10 text-center space-y-6 bg-gradient-to-b from-purple/10 to-transparent">
          <h3 className="text-3xl font-display text-white">Seeking Clarity on Marriage or Compatibility?</h3>
          <p className="text-foreground/70 text-sm max-w-xl mx-auto">
            Book a 1-on-1 Relationship &amp; Marriage Consultation with Acharyaa Smita Mishra to receive personalized guidance and compatibility charts.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              search={{ plan: "marriage", focus: "Marriage" }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-gold-soft to-amber-500 text-cosmos font-bold text-xs uppercase tracking-widest px-8 py-4 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all hover:scale-105 cursor-pointer"
            >
              <span>Book Marriage Consultation</span>
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
