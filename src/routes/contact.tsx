import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { ContactPageContent } from '@/components/site/ContactPage'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Contact | GrahGanit — Write to the Cosmos' },
      { name: 'description', content: 'Get in touch with the GrahGanit team. Book a consultation, ask a question, or simply say hello.' },
    ],
  }),
})

function RouteComponent() {
  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <ContactPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
