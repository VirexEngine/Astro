import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { AboutPageContent } from '@/components/site/AboutPage'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'About | GrahGanit — Ancient Vedic Wisdom & Planetary Mathematics' },
      { name: 'description', content: 'Meet the team behind GrahGanit (ग्रह गणित). Discover our mission, our story, and why over 122 founders trust us with their cosmic blueprint.' },
    ],
  }),
})

function RouteComponent() {
  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <AboutPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
