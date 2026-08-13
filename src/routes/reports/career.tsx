import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer, FloatingActions } from "@/components/site/Sections";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Briefcase, TrendingUp, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/reports/career")({
  component: CareerReport,
  head: () => ({
    meta: [
      { title: "Career Direction & Profession Report | GrahGanit" },
      { name: "description", content: "Identify professional karma, 10th House alignment, promotion windows, and job switch timing." }
    ],
  }),
});

function CareerReport() {
  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 mx-auto max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft border border-gold/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" /> Professional Karma &amp; Purpose
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-gradient-cosmic leading-tight mb-6">
            Career Direction &amp; Professional Growth
          </h1>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Align your professional endeavors with planetary transits governing the 10th House (Karma Bhava), 6th House (Service), and Saturn's disciplining energy.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-6">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">10th House &amp; Profession Type</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Determine whether corporate employment, independent business, creative fields, or public service aligns best with your natal Dasha cycles.
            </p>
          </div>

          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">Job Switch &amp; Promotion Windows</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Pinpoint precise favorable months for career transitions, salary negotiations, leadership ascension, and navigating workplace politics.
            </p>
          </div>
        </div>

        {/* Deliverables List */}
        <div className="glass-strong p-8 sm:p-12 rounded-3xl border border-gold/30 shadow-2xl mb-16 space-y-6">
          <h3 className="text-2xl font-display text-gradient-gold">What Your Career Report Covers:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground/80 font-sans">
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> 10th House Karma Bhava &amp; Midheaven Analysis</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Saturn (Shani) &amp; Sun (Surya) Authority Ratings</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Ideal Industry &amp; Vocation Synchronization</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Favorable Job Switch &amp; Promotion Periods</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Boss Dynamics &amp; Office Friction Remediation</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Career Gemstones &amp; Shani Shanti Mantras</li>
          </ul>
        </div>

        {/* CTA Box */}
        <div className="glass-strong p-10 rounded-3xl border border-white/10 text-center space-y-6 bg-gradient-to-b from-purple/10 to-transparent">
          <h3 className="text-3xl font-display text-white">Ready to Elevate Your Career Trajectory?</h3>
          <p className="text-foreground/70 text-sm max-w-xl mx-auto">
            Book a 1-on-1 Career Consultation with Acharyaa Smita Mishra to receive personalized timing for switches, promotions, and professional growth.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              search={{ plan: "career", focus: "Career" }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-gold-soft to-amber-500 text-cosmos font-bold text-xs uppercase tracking-widest px-8 py-4 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all hover:scale-105 cursor-pointer"
            >
              <span>Book Career Guidance Session</span>
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
