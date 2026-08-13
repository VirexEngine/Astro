import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { ConsultationHero } from '@/components/consultation/ConsultationHero'
import { AstrologerProfile } from '@/components/consultation/AstrologerProfile'
import { ConsultationTypes } from '@/components/consultation/ConsultationTypes'
import { BookingWizard } from '@/components/consultation/BookingWizard'
import { Timeline } from '@/components/consultation/Timeline'
import { FAQ } from '@/components/consultation/FAQ'

export const Route = createFileRoute('/booking')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Book Your Personal Consultation | GrahGanit' },
      { name: 'description', content: 'Connect with senior Vedic astrologer Acharyaa Smita Mishra for career, marriage, and wealth guidance.' }
    ],
  }),
})

function RouteComponent() {
  const [bgStars, setBgStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate background stars coordinates
    const stars = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.6 + 1,
      delay: Math.random() * 4,
    }));
    setBgStars(stars);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#090B1A] text-foreground overflow-x-hidden">
      {/* Drifting Celestial Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-purple/8 rounded-full filter blur-[95px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full filter blur-3xl" />

        {bgStars.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white opacity-35 animate-pulse"
            style={{
              left: star.x + '%',
              top: star.y + '%',
              width: star.size + 'px',
              height: star.size + 'px',
              animationDelay: star.delay + 's',
              animationDuration: '3.5s',
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 mx-auto max-w-4xl relative z-10 flex flex-col items-center gap-10">
        
        {/* Section 1: Hero */}
        <ConsultationHero />

        {/* Section 2: Astrologer Profile */}
        <div className="w-full">
          <AstrologerProfile />
        </div>

        {/* Section 3: Live Booking Wizard App with Unified Google-Style Comparison Cards */}
        <div className="w-full">
          <BookingWizard />
        </div>

        {/* Section 5: Process Timeline & FAQs combined accordion spacing */}
        <div className="w-full flex flex-col gap-8 border-t border-white/5 pt-10">
          <Timeline />
          <FAQ />
        </div>

      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
export default RouteComponent;
