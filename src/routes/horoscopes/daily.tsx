import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { TodaySky } from '@/components/horoscope/TodaySky'
import { InteractiveWheel } from '@/components/horoscope/InteractiveWheel'
import { CosmicEnergy } from '@/components/horoscope/CosmicEnergy'
import { HoroscopeCard } from '@/components/horoscope/HoroscopeCard'
import { PlanetInfluence } from '@/components/horoscope/PlanetInfluence'
import { LuckyInsights } from '@/components/horoscope/LuckyInsights'
import { DailyTimeline } from '@/components/horoscope/DailyTimeline'
import { AIOracle } from '@/components/horoscope/AIOracle'
import { JournalSection } from '@/components/horoscope/JournalSection'
import { TomorrowPreview } from '@/components/horoscope/TomorrowPreview'
import { ZodiacCard } from '@/components/horoscope/ZodiacCard'
import { getZodiacForecast } from '@/components/horoscope/horoscopeData'
import { Sparkles, Volume2, VolumeX, Moon, Share2, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getActiveProfile } from '@/utils/profile'

export const Route = createFileRoute('/horoscopes/daily')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Daily Cosmic Forecast | GrahGanit' },
      { name: 'description', content: 'Explore your daily personalized Vedic horoscope transits, cosmic scores, timelines, and ask the oracle.' }
    ],
  }),
})

function RouteComponent() {
  const [activeSign, setActiveSign] = useState('Aries');
  const [activeMood, setActiveMood] = useState('Happy');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bgStars, setBgStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Generate background stars coordinates
    const stars = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 1,
      delay: Math.random() * 4,
    }));
    setBgStars(stars);

    const profile = getActiveProfile();
    if (profile) {
      setUserProfile(profile);
      if (profile.moonSign) {
        setActiveSign(profile.moonSign);
      } else if (profile.primaryZodiac) {
        setActiveSign(profile.primaryZodiac);
      }
    }
  }, []);

  const forecast = getZodiacForecast(activeSign);
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // HTML5 SpeechSynthesis narration
  const handleVoiceReading = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      const text = `Today's cosmic forecast for ${activeSign}. General prediction: ${forecast.details[0].prediction}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech voice narration is not supported on this browser version.');
    }
  };

  // Adjust metrics slightly based on selected mood
  const getAdjustedMetrics = () => {
    const base = forecast.metrics;
    if (activeMood === 'Focused') {
      return { ...base, confidence: Math.min(100, base.confidence + 5) };
    }
    if (activeMood === 'Inspired') {
      return { ...base, energy: Math.min(100, base.energy + 4), luck: Math.min(100, base.luck + 4) };
    }
    if (activeMood === 'Romantic') {
      return { ...base, emotional: Math.min(100, base.emotional + 6) };
    }
    if (activeMood === 'Anxious') {
      return { ...base, emotional: Math.max(20, base.emotional - 12), confidence: Math.max(20, base.confidence - 8) };
    }
    return base;
  };

  const getAdjustedGeneralScore = () => {
    const metrics = getAdjustedMetrics();
    return Math.round((metrics.energy + metrics.confidence + metrics.luck + metrics.emotional) / 4);
  };

  return (
    <div className="relative min-h-screen bg-[#090B1A] text-foreground overflow-x-hidden">
      {/* Drifting Celestial Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-purple/8 rounded-full filter blur-[95px] pointer-events-none" />
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

      <main className="pt-24 pb-24 px-4 sm:px-6 mx-auto max-w-6xl relative z-10 flex flex-col items-center gap-8">
        
        {/* Section 1: Hero */}
        <div className="text-center max-w-2xl mb-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/25 bg-gold/5 text-gold text-[10px] font-mono uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daily Cosmic Forecast</span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-display font-medium text-gradient-gold mb-3 leading-tight tracking-wide">
            Your Daily Celestial Briefing
          </h1>
          
          <p className="text-xs md:text-sm text-foreground/60 leading-relaxed max-w-xl mx-auto mb-4 font-sans">
            Start your day with personalized celestial insights, planetary guidance, and ancient Vedic wisdom.
          </p>

          <div className="flex justify-center items-center gap-3 text-xs font-mono text-white/50">
            <span className="bg-white/3 border border-white/10 rounded-full px-3.5 py-1">
              📅 {todayDate}
            </span>
          </div>
        </div>

        {/* Personalized Welcome Banner if user is logged in */}
        {userProfile && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-purple-900/20 to-amber-500/10 border border-amber-500/25 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 font-serif text-xl shrink-0">
                ✦
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block">Personalized Chart Alignment</span>
                <h2 className="text-xl font-display text-white font-medium">
                  Welcome, <span className="text-amber-300">{userProfile.name}</span>
                </h2>
                <p className="text-xs text-white/60 mt-0.5">
                  Here is your dedicated forecast calculated for your <strong>{activeSign}</strong> sign ({userProfile.ascendant} Ascendant).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs">
              <span className="text-amber-300 font-mono">Nakshatra:</span>
              <span className="text-white font-medium">{userProfile.nakshatra}</span>
            </div>
          </motion.div>
        )}

        {/* Global Toolbar Controls */}
        <div className="w-full flex justify-between items-center max-w-4xl border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceReading}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all active:scale-97 ${
                isSpeaking 
                  ? 'bg-gold/15 border-gold text-gold shadow-md shadow-gold/10'
                  : 'bg-white/3 border-white/10 hover:bg-white/5 text-white/80'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold" />}
              <span>{isSpeaking ? 'Mute Narrator' : 'Voice Horoscope'}</span>
            </button>
          </div>

          {/* Moon Phase Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/3 border border-white/5 text-xs text-white/60">
            <Moon className="w-3.5 h-3.5 text-gold animate-pulse shrink-0" />
            <span className="font-mono text-[10px] uppercase">
              {forecast.moonPhase.name} • {forecast.moonPhase.illumination}%
            </span>
          </div>
        </div>

        {/* Direct Horoscope Forecast Card (First & Upfront!) */}
        <div className="w-full max-w-4xl">
          <HoroscopeCard
            sign={activeSign}
            mood={activeMood}
            details={forecast.details}
            userName={userProfile?.name}
          />
        </div>

        {/* Section 2: Zodiac Selector Cards Grid */}
        <div className="w-full max-w-4xl">
          <ZodiacCard activeSign={activeSign} onSelectSign={setActiveSign} />
        </div>

        {/* Section 3: Interactive Orbit Wheel & Energy metrics side-by-side */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center">
          {/* Wheel Selector */}
          <div className="flex-1 w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple/5 rounded-full filter blur-xl" />
            <InteractiveWheel activeSign={activeSign} onSelectSign={setActiveSign} />
          </div>

          {/* Cosmic Score & Mood Cards */}
          <div className="flex-1 w-full">
            <CosmicEnergy
              score={getAdjustedGeneralScore()}
              activeMood={activeMood}
              onChangeMood={setActiveMood}
              metrics={getAdjustedMetrics()}
            />
          </div>
        </div>

        {/* Section 4: General Prediction & sub-categories */}
        <div className="w-full max-w-4xl">
          <HoroscopeCard
            sign={activeSign}
            mood={activeMood}
            details={forecast.details}
          />
        </div>

        {/* Section 5: Today's Sky Transits */}
        <div className="w-full max-w-4xl">
          <TodaySky />
        </div>

        {/* Section 6: Planet Influences */}
        <div className="w-full max-w-4xl">
          <PlanetInfluence influences={forecast.influences} />
        </div>

        {/* Section 7: Lucky Section */}
        <div className="w-full max-w-4xl">
          <LuckyInsights items={forecast.luckyItems} />
        </div>

        {/* Section 8: Today's Timeline */}
        <div className="w-full max-w-4xl">
          <DailyTimeline nodes={forecast.timeline} />
        </div>

        {/* Section 9: AI Ask the Oracle */}
        <div className="w-full max-w-4xl">
          <AIOracle sign={activeSign} mood={activeMood} />
        </div>

        {/* Section 10: Reflection Journal & streak & challenge */}
        <div className="w-full max-w-4xl">
          <JournalSection />
        </div>

        {/* Section 11: Tomorrow Preview & heatmap synergy */}
        <div className="w-full max-w-4xl">
          <TomorrowPreview />
        </div>

        {/* Section 12: Compatibility Shortcut */}
        <div className="w-full max-w-4xl p-5 bg-gradient-to-r from-purple/20 via-cosmos to-gold/10 border border-white/10 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-semibold text-white">Curious about compatibility today?</h4>
            <p className="text-xs text-white/50 mt-0.5 font-sans">Compare daily aspects directly against your partner's natal placements.</p>
          </div>
          <Link
            to="/free-tools/compatibility"
            className="px-4 py-2 bg-gold text-cosmos font-semibold text-xs rounded-xl hover:bg-gold/90 transition-colors shrink-0"
          >
            Check Compatibility →
          </Link>
        </div>

      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
