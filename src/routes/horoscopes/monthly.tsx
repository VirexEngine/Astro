import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { MonthlyHero } from '@/components/horoscope/monthly/MonthlyHero'
import { MonthOverview } from '@/components/horoscope/monthly/MonthOverview'
import { MonthlyRadarChart } from '@/components/horoscope/monthly/MonthlyRadarChart'
import { TransitCalendar } from '@/components/horoscope/monthly/TransitCalendar'
import { PlanetWheel } from '@/components/horoscope/monthly/PlanetWheel'
import { WeeklyTimeline } from '@/components/horoscope/monthly/WeeklyTimeline'
import { DecisionCards } from '@/components/horoscope/monthly/DecisionCards'
import { GoalPlanner } from '@/components/horoscope/monthly/GoalPlanner'
import { Journal } from '@/components/horoscope/monthly/Journal'
import { Heatmap } from '@/components/horoscope/monthly/Heatmap'
import { AIAdvisor } from '@/components/horoscope/monthly/AIAdvisor'
import { BestDays } from '@/components/horoscope/monthly/BestDays'
import { MoonCalendar } from '@/components/horoscope/monthly/MoonCalendar'
import { NextMonthPreview } from '@/components/horoscope/monthly/NextMonthPreview'
import { RelatedTools } from '@/components/horoscope/monthly/RelatedTools'
import { ZodiacCard } from '@/components/horoscope/ZodiacCard'
import { getMonthlyForecast } from '@/components/horoscope/monthly/monthlyData'
import { InteractiveWheel } from '@/components/horoscope/InteractiveWheel'
import { Sparkles, Moon, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { getActiveProfile } from '@/utils/profile'

export const Route = createFileRoute('/horoscopes/monthly')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Monthly Cosmic Forecast | GrahGanit' },
      { name: 'description', content: 'Explore your monthly personalized Vedic horoscope transits, cosmic scores, weekly timelines, and AI monthly advice.' }
    ],
  }),
})

function RouteComponent() {
  const [activeSign, setActiveSign] = useState('Aries');
  const [bgStars, setBgStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate background stars coordinates
    const stars = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 1,
      delay: Math.random() * 4,
    }));
    setBgStars(stars);

    const loadUserSign = () => {
      const profile = getActiveProfile();
      if (profile) {
        const sign = profile.moonSign || profile.primaryZodiac || profile.ascendant;
        if (sign) {
          const formatted = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
          setActiveSign(formatted);
        }
      }
    };

    loadUserSign();
    window.addEventListener('grahganit_profile_sync', loadUserSign);
    return () => window.removeEventListener('grahganit_profile_sync', loadUserSign);
  }, []);

  const forecast = getMonthlyForecast(activeSign);

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
        <MonthlyHero dateText="August 2026" />

        {/* Section 2: Zodiac Selector Cards Grid */}
        <div className="w-full max-w-4xl">
          <ZodiacCard activeSign={activeSign} onSelectSign={setActiveSign} />
        </div>

        {/* Section 3: Interactive Orbit Wheel & Month Overview side-by-side */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center">
          {/* Wheel Selector */}
          <div className="flex-1 w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple/5 rounded-full filter blur-xl" />
            <InteractiveWheel activeSign={activeSign} onSelectSign={setActiveSign} />
          </div>

          {/* Month Overview */}
          <div className="flex-grow w-full">
            <MonthOverview
              score={forecast.energyScore}
              theme={forecast.theme}
              planet={forecast.planet}
              challenge={forecast.challenge}
              strength={forecast.strength}
              luckyDays={forecast.bestDays}
            />
          </div>
        </div>

        {/* Section 4: Weekly Timeline Roadmap */}
        <div className="w-full max-w-4xl">
          <WeeklyTimeline weeks={forecast.weeks} />
        </div>

        {/* Section 5: Transit Calendar */}
        <div className="w-full max-w-4xl">
          <TransitCalendar events={forecast.calendarEvents} />
        </div>

        {/* Section 6: Life Area Radar Chart */}
        <div className="w-full max-w-4xl">
          <MonthlyRadarChart scores={forecast.radarScores} />
        </div>

        {/* Section 7: Planetary Influences Wheel */}
        <div className="w-full max-w-4xl">
          <PlanetWheel />
        </div>

        {/* Section 8: Decisions Calendar */}
        <div className="w-full max-w-4xl">
          <DecisionCards decisions={forecast.decisions} />
        </div>

        {/* Section 9: Goals Organizer */}
        <div className="w-full max-w-4xl">
          <GoalPlanner initialGoals={forecast.goals} />
        </div>

        {/* Section 10: Weekly reflections logs */}
        <div className="w-full max-w-4xl">
          <Journal />
        </div>

        {/* Section 11: AI Advisor tabs */}
        <div className="w-full max-w-4xl">
          <AIAdvisor advice={forecast.aiAdvice} />
        </div>

        {/* Section 12: Best Days & Warning Days */}
        <div className="w-full max-w-4xl">
          <BestDays bestDays={forecast.bestDays} cautionDays={forecast.cautionDays} />
        </div>

        {/* Section 13: Moon Calendar transits */}
        <div className="w-full max-w-4xl">
          <MoonCalendar phases={forecast.moonPhases} />
        </div>

        {/* Section 14: GitHub-style Heatmap */}
        <div className="w-full max-w-4xl">
          <Heatmap />
        </div>

        {/* Section 15: Next Month Preview */}
        <div className="w-full max-w-4xl">
          <NextMonthPreview />
        </div>

        {/* Section 16: Related Tools */}
        <div className="w-full mt-8 max-w-5xl border-t border-white/5 pt-12">
          <RelatedTools />
        </div>

      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
