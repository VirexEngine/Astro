import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { PalmOutline } from '@/components/palmistry/PalmOutline'
import { InfoPanel } from '@/components/palmistry/InfoPanel'
import { Legend } from '@/components/palmistry/Legend'
import { LearnMode } from '@/components/palmistry/LearnMode'
import { palmistryItems } from '@/components/palmistry/palmData'
import { Sparkles, BookOpen, Volume2, VolumeX, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/services/palm-reading')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Interactive Palmistry Explorer | GrahGanit (ग्रह गणित)' },
      { name: 'description', content: 'Explore the lines, mounts, and symbols of your palm with our premium interactive Palmistry Explorer.' }
    ],
  }),
})

// Web Audio Synth feedback
const playWebAudioSound = (type: 'hover' | 'select' | 'achievement', isMuted: boolean) => {
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
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.08);
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
    } else if (type === 'achievement') {
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
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        oscNode.start(ctx.currentTime + idx * 0.06);
        oscNode.stop(ctx.currentTime + 0.5);
      });
    }
  } catch (e) {
    // Audio Context failed or is blocked by browser policies
  }
};

function RouteComponent() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [handSide, setHandSide] = useState<'left' | 'right'>('left');
  const [viewMode, setViewMode] = useState<'normal' | 'anatomy' | 'palmistry' | 'planet'>('palmistry');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [isLearnModeActive, setIsLearnModeActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Background stars particles
  const [bgStars, setBgStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate background starry coordinates
    const stars = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setBgStars(stars);
  }, []);

  const handleSelectItem = (id: string) => {
    setSelectedId(id || null);
    if (id) {
      playWebAudioSound('select', isMuted);
    }
  };

  const handleHoverItem = (id: string | null) => {
    setHoveredId(id);
    if (id) {
      playWebAudioSound('hover', isMuted);
    }
  };

  const unlockAchievement = (achId: string) => {
    if (!achievements.includes(achId)) {
      const updated = [...achievements, achId];
      setAchievements(updated);
      playWebAudioSound('achievement', isMuted);
    }
  };

  // Find currently active details
  const selectedItem = palmistryItems.find((item) => item.id === selectedId) || null;

  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden">
      {/* Slow Drifting Celestial Stars Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#0B0B0F]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,transparent_70%)]" />
        {bgStars.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white opacity-40 animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      <Navbar />
      
      <main className="pt-28 pb-24 px-4 sm:px-6 mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mb-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/25 bg-gold/5 text-gold text-xs font-mono uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Chiromancy Vault</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-display font-medium text-gradient-gold mb-4 leading-tight">
            Palmistry Explorer
          </h1>
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
            Explore both <strong className="text-gold">Left Hand (Inherent Karma & Potential)</strong> and <strong className="text-gold">Right Hand (Manifested Reality & Action)</strong> with Vedic Chiromancy precision.
          </p>
        </div>

        {/* Global Toolbar & Hand Switcher */}
        <div className="w-full flex flex-wrap justify-between items-center gap-4 mb-8 border-b border-white/5 pb-4">
          {/* Hand Switcher Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl shadow-xl">
            <button
              onClick={() => setHandSide('left')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                handSide === 'left'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span>✋</span> Left Palm (Inborn Potential)
            </button>
            <button
              onClick={() => setHandSide('right')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                handSide === 'right'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span>🤚</span> Right Palm (Manifested Future)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLearnModeActive(!isLearnModeActive)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isLearnModeActive
                  ? 'bg-gold border-gold text-cosmos'
                  : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isLearnModeActive ? 'Close Academy' : 'Open Academy'}</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 transition-colors"
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold" />}
            </button>
          </div>
        </div>

        {/* Dynamic Guided Tour Academy Section */}
        {isLearnModeActive && (
          <div className="w-full max-w-4xl mb-8">
            <LearnMode
              onHighlight={setHoveredId}
              activeItem={selectedItem}
              onSelectItemById={handleSelectItem}
              onUnlockAchievement={unlockAchievement}
              onClose={() => setIsLearnModeActive(false)}
            />
          </div>
        )}

        {/* Primary Interactive Columns Grid */}
        <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Left Column: Hand Geography Legend */}
          <Legend
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={handleSelectItem}
            onHover={handleHoverItem}
          />

          {/* Middle Column: Visual Hand Viewport */}
          <PalmOutline
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={handleSelectItem}
            onHover={handleHoverItem}
            viewMode={viewMode}
            setViewMode={setViewMode}
            handSide={handSide}
          />

          {/* Right Column: Information Panel */}
          <InfoPanel
            selectedItem={selectedItem}
            achievements={achievements}
            handSide={handSide}
          />
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
