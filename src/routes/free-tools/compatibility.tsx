import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { CompatibilityForm } from '@/components/compatibility/CompatibilityForm'
import { ResultDashboard } from '@/components/compatibility/ResultDashboard'
import { PlanetVisualization } from '@/components/compatibility/PlanetVisualization'
import { InsightsPanel } from '@/components/compatibility/InsightsPanel'
import { NumerologyCard } from '@/components/compatibility/NumerologyCard'
import { ElementCards } from '@/components/compatibility/ElementCards'
import { Timeline } from '@/components/compatibility/Timeline'
import { Accordion } from '@/components/compatibility/Accordion'
import { RemediesCard } from '@/components/compatibility/RemediesCard'
import { ShareCard } from '@/components/compatibility/ShareCard'
import { RelatedTools } from '@/components/compatibility/RelatedTools'
import { LoadingState } from '@/components/compatibility/LoadingState'
import { EmptyState } from '@/components/compatibility/EmptyState'
import { useCompatibility } from '@/hooks/useCompatibility'
import { getPlanetaryPositions } from '@/utils/astrology'
import { Sparkles, RefreshCw, Volume2, VolumeX, ShieldAlert } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/free-tools/compatibility')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Cosmic Compatibility Checker | GrahGanit' },
      { name: 'description', content: 'Explore relationship harmony using Vedic astrology, numerology codes, and AI-powered compatibility insights.' }
    ],
  }),
})

// Web Audio Synth feedback
const playWebAudioSound = (type: 'hover' | 'select' | 'success', isMuted: boolean) => {
  if (isMuted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'select') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } else if (type === 'success') {
      // Harmonic chord
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major
      freqs.forEach((freq, idx) => {
        const oscNode = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscNode.type = 'sine';
        oscNode.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        oscNode.connect(gainNode);
        gainNode.connect(ctx.destination);
        gainNode.gain.setValueAtTime(0.02, ctx.currentTime + idx * 0.06);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);
        oscNode.start(ctx.currentTime + idx * 0.06);
        oscNode.stop(ctx.currentTime + 0.55);
      });
    }
  } catch (e) {
    // Audio Context blocked
  }
};

function RouteComponent() {
  const { report, isLoading, loadingStage, error, calculate, reset } = useCompatibility();
  const [isMuted, setIsMuted] = useState(true);
  const [bgStars, setBgStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate background starry coordinates
    const stars = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setBgStars(stars);
  }, []);

  const handleCalculate = (partnerA: any, partnerB: any) => {
    playWebAudioSound('select', isMuted);
    calculate(partnerA, partnerB).then(() => {
      if (!error) {
        playWebAudioSound('success', isMuted);
      }
    });
  };

  const handleReset = () => {
    playWebAudioSound('select', isMuted);
    reset();
  };

  return (
    <div className="relative min-h-screen bg-[#090B1A] text-foreground overflow-x-hidden">
      {/* Drifting Cosmic Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-purple/8 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full filter blur-3xl" />
        {bgStars.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white opacity-30 animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: '3.5s',
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className="pt-24 pb-24 px-4 sm:px-6 mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        {/* Section 1: Hero */}
        <div className="text-center mb-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/25 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vedic Synastry Matcher</span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-display font-medium text-gradient-gold mb-3 leading-tight tracking-wide">
            Discover Your Cosmic Compatibility
          </h1>
          <p className="text-xs md:text-sm text-foreground/60 leading-relaxed max-w-xl mx-auto mb-4 font-sans">
            Explore the harmony between two souls through Vedic Astrology, Numerology grids, and AI-powered relationship insights.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 text-[10px] font-mono text-white/50 mb-5">
            <span className="bg-white/3 border border-white/10 rounded-full px-3 py-0.5">✨ Free Analysis</span>
            <span className="bg-white/3 border border-white/10 rounded-full px-3 py-0.5">🔒 Privacy Protected</span>
            <span className="bg-white/3 border border-white/10 rounded-full px-3 py-0.5">⚡ Instant Results</span>
          </div>

          {/* Relationship Illustration (Sun-Moon Orbit Heart) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center gap-4 my-4"
          >
            <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-base font-serif text-gold bg-gold/5 shadow-[0_0_8px_rgba(212,175,55,0.25)] select-none">
              ☉
            </div>
            <svg viewBox="0 0 100 20" className="w-28 h-6 text-gold/35 pointer-events-none">
              <path d="M 0,10 C 25,-6 75,-6 100,10" fill="none" stroke="currentColor" strokeWidth={0.75} strokeDasharray="3,3" />
              <path d="M 0,10 C 25,26 75,26 100,10" fill="none" stroke="currentColor" strokeWidth={0.75} strokeDasharray="3,3" />
              <circle cx="50" cy="10" r="2.5" fill="#D4AF37" className="animate-ping" />
              <path d="M 47,10 C 47,8 50,7 50,10 C 50,7 53,8 53,10 C 53,12 50,14 50,14 C 50,14 47,12 47,10 Z" fill="#D4AF37" className="filter drop-shadow-[0_0_2px_#D4AF37]" />
            </svg>
            <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-base font-serif text-gold bg-gold/5 shadow-[0_0_8px_rgba(212,175,55,0.25)] select-none">
              ☽
            </div>
          </motion.div>
        </div>

        {/* Global Toolbar */}
        <div className="w-full flex justify-end items-center gap-4 mb-8 border-b border-white/5 pb-4 max-w-4xl">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold" />}
          </button>
        </div>

        {/* Section 2: Input Form / Loading / Results Display */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl flex items-center gap-3 mb-6"
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex justify-center py-6"
            >
              <LoadingState stageText={loadingStage} />
            </motion.div>
          ) : report ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col gap-10 items-center"
            >
              {/* Reset Control */}
              <div className="w-full flex justify-between items-center max-w-4xl">
                <span className="text-xs text-white/45 font-mono">Report Generated successfully</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/3 hover:bg-white/5 text-xs text-white/80 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Calculate New Match</span>
                </button>
              </div>

              {/* Section 3: Result Dashboard */}
              <div className="w-full max-w-5xl">
                <ResultDashboard report={report} />
              </div>

              {/* Section 4: Planet Visualization */}
              <div className="w-full max-w-4xl">
                <PlanetVisualization
                  planetsA={getPlanetaryPositions(report.numerology.lifePath.partnerANumber + '-seed', '12:00', 'Deh')} // Maps deterministic planet coordinates
                  planetsB={getPlanetaryPositions(report.numerology.lifePath.partnerBNumber + '-seed', '12:00', 'Deh')}
                  aspects={report.aspects}
                />
              </div>

              {/* Section 5: AI Insights */}
              <div className="w-full max-w-4xl">
                <InsightsPanel insights={report.aiInsights} />
              </div>

              {/* Section 6: Numerology */}
              <div className="w-full max-w-4xl">
                <NumerologyCard numerology={report.numerology} />
              </div>

              {/* Section 7: Element Compatibility */}
              <div className="w-full max-w-4xl">
                <ElementCards elements={report.elements} />
              </div>

              {/* Section 8: Timeline */}
              <div className="w-full max-w-4xl">
                <Timeline timeline={report.timeline} />
              </div>

              {/* Section 9: Detailed Breakdown Accordion */}
              <div className="w-full max-w-4xl">
                <Accordion report={report} />
              </div>

              {/* Section 10: Suggested Remedies */}
              <div className="w-full max-w-4xl">
                <RemediesCard remedies={report.remedies} />
              </div>

              {/* Section 11: Share Card */}
              <div className="w-full max-w-4xl">
                <ShareCard
                  score={report.overallScore}
                  rating={report.matchRating}
                  partnerAName="Partner I"
                  partnerBName="Partner II"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-10 items-center"
            >
              <CompatibilityForm onCalculate={handleCalculate} isLoading={isLoading} />
              <EmptyState />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 12: Related Tools */}
        <div className="w-full mt-16 max-w-5xl border-t border-white/5 pt-12">
          <RelatedTools />
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
