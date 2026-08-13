import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { motion } from 'framer-motion'
import { Sparkles, Calendar, Clock, User, ArrowLeft, Share2, Eye, Bookmark } from 'lucide-react'

export const Route = createFileRoute('/article/$slug')({
  component: ArticleReaderComponent,
})

interface ArticleDetail {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  cover_image: string | null
  author_name: string
  read_time: string
  views_count: number
  created_at: string
}

function ArticleReaderComponent() {
  const { slug } = Route.useParams()
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchArticle()
  }, [slug])

  const fetchArticle = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/articles/${slug}`)
      if (res.ok) {
        setArticle(await res.json())
      }
    } catch (err) {
      console.error('Error fetching article:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmos text-foreground flex flex-col justify-between">
        <Navbar />
        <main className="pt-36 pb-24 text-center text-white/50 font-mono text-sm">
          Unrolling sacred astronomical manuscript...
        </main>
        <Footer />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-cosmos text-foreground flex flex-col justify-between">
        <Navbar />
        <main className="pt-36 pb-24 text-center px-4">
          <h1 className="text-3xl font-display text-white mb-4">Article Not Found</h1>
          <p className="text-sm text-white/50 mb-6">The article you are looking for does not exist or has been archived.</p>
          <Link to="/blog" className="bg-gold text-cosmos px-5 py-2.5 rounded-xl font-semibold text-xs inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Cosmic Journal
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 mx-auto max-w-4xl w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-gold-soft hover:text-gold transition-colors glass px-3.5 py-1.5 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal Articles
          </Link>
        </div>

        {/* Article Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-mono uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-xs text-white/40 font-mono">
              Published {new Date(article.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-medium text-gradient-cosmic leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-white/60 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gold" /> {article.author_name}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold" /> {article.read_time}</span>
              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-gold" /> {article.views_count} views</span>
            </div>

            <button
              onClick={handleShare}
              className="glass px-3 py-1.5 rounded-xl border border-white/10 hover:border-gold/40 text-gold text-xs flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Link!' : 'Share Article'}</span>
            </button>
          </div>
        </motion.div>

        {/* Article Cover Image */}
        {article.cover_image && (
          <div className="rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl aspect-video max-h-[480px]">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Main Body Content */}
        <article className="glass-strong p-6 sm:p-12 rounded-3xl border border-white/10 shadow-2xl prose prose-invert max-w-none text-foreground/80 leading-relaxed space-y-6 font-sans">
          {(article.content || '').split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={idx} className="text-2xl sm:text-3xl font-display text-gradient-gold mt-6 mb-4">{paragraph.replace('# ', '')}</h1>
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-xl sm:text-2xl font-display text-white border-b border-white/10 pb-2 mt-6 mb-3">{paragraph.replace('## ', '')}</h2>
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-lg font-display text-gold-soft mt-4 mb-2">{paragraph.replace('### ', '')}</h3>
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc list-inside space-y-1 my-3 text-white/90">
                  {paragraph.split('\n').map((li, i) => (
                    <li key={i}>{li.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            return <p key={idx} className="text-sm sm:text-base leading-relaxed">{paragraph}</p>
          })}
        </article>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
