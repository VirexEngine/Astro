import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer, FloatingActions } from "@/components/site/Sections";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, GraduationCap, Brain, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/reports/education")({
  component: EducationReport,
  head: () => ({
    meta: [
      { title: "Education & Learning Inclinations Report | GrahGanit" },
      { name: "description", content: "Uncover your intellect, natural learning style, 5th house Vidya Yogas, and favorable academic timing." }
    ],
  }),
});

function EducationReport() {
  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 mx-auto max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft border border-gold/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" /> Intellect &amp; Learning Guidance
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-gradient-cosmic leading-tight mb-6">
            Education &amp; Intellectual Path
          </h1>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Discover the cosmic factors influencing memory, analytical skill, higher learning, and competitive exams through Mercury (Budha), Jupiter (Guru), and the 4th/5th Houses.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">Mercury &amp; Analytical Retention</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Budha governs logic, speech, mathematical aptitude, and rapid comprehension. We analyze your Mercury placement to identify your optimal learning environment.
            </p>
          </div>

          <div className="rounded-3xl glass-strong p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-6">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">Higher Studies &amp; Exam Timing</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Examine the 5th House of intelligence and 9th House of wisdom to pinpoint favorable periods for university admissions, competitive exams, and study abroad.
            </p>
          </div>
        </div>

        {/* Deliverables List */}
        <div className="glass-strong p-8 sm:p-12 rounded-3xl border border-gold/30 shadow-2xl mb-16 space-y-6">
          <h3 className="text-2xl font-display text-gradient-gold">Key Academic Insights Covered:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground/80 font-sans">
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> 4th House Primary Education &amp; Focus</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> 5th House Intelligence &amp; Creative Aptitude</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Mercury &amp; Jupiter Planetary Strength Score</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Competitive Exam &amp; Entrance Test Windows</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Foreign Study / Higher Learning Yogas</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-gold shrink-0" /> Concentration &amp; Saraswati Mantra Remedies</li>
          </ul>
        </div>

        {/* CTA Box */}
        <div className="glass-strong p-10 rounded-3xl border border-white/10 text-center space-y-6 bg-gradient-to-b from-purple/10 to-transparent">
          <h3 className="text-3xl font-display text-white">Seeking Academic &amp; Educational Clarity?</h3>
          <p className="text-foreground/70 text-sm max-w-xl mx-auto">
            Book a dedicated consultation to evaluate field selection, exam timing, and intellectual remedies with Acharyaa Smita Mishra.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              search={{ plan: "life", focus: "Education" }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-gold-soft to-amber-500 text-cosmos font-bold text-xs uppercase tracking-widest px-8 py-4 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all hover:scale-105 cursor-pointer"
            >
              <span>Book Education Consultation</span>
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
