import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "@/components/site/StarField";
import { CursorGlow, ScrollProgress } from "@/components/site/Interactive";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { AboutGurudeviSnippet } from "@/components/site/AboutGurudeviSnippet";
import { ReportsExplorerSection } from "@/components/site/ReportsExplorerSection";
import { SpiritualSection as WhyChooseUsSection, Testimonials, ContactSection, Footer, FloatingActions } from "@/components/site/Sections";
import { LatestArticles } from "@/components/site/LatestArticles";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: 'Home | Gurudevi Consulting' },
      { name: 'description', content: 'Transforming lives through Vedic Wisdom. Book your personal consultation with Gurudevi today.' },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Global celestial backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 starfield opacity-60" />
        <StarField density={120} />
      </div>

      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="relative">
        <Hero />
        <ReportsExplorerSection />
        <WhyChooseUsSection />
        <AboutGurudeviSnippet />
        <LatestArticles />
        <Testimonials />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

