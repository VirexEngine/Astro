import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer, FloatingActions } from '@/components/site/Sections'
import { motion } from 'framer-motion'
import { Sparkles, BookOpen, Clock, User, ArrowRight, Search, Tag, Eye } from 'lucide-react'

export const Route = createFileRoute('/blog')({
  component: BlogRouteComponent,
  head: () => ({
    meta: [
      { title: 'Cosmic Journal & Articles | GrahGanit Engine' },
      { name: 'description', content: 'Explore authentic Vedic astrology, planetary transits, numerology, and palmistry insights published by GrahGanit.' }
    ],
  }),
})

interface Article {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  cover_image: string | null
  author_name: string
  read_time: string
  views_count: number
  created_at: string
}

function BlogRouteComponent() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Vedic Astrology', 'Numerology', 'Palmistry', 'Transits & Eclipses', 'Kundali Guidance']

  useEffect(() => {
    fetchArticles()
  }, [selectedCategory])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const url = selectedCategory !== 'All' 
        ? `/api/articles?category=${encodeURIComponent(selectedCategory)}` 
        : '/api/articles'
      const res = await fetch(url)
      if (res.ok) {
        setArticles(await res.json())
      }
    } catch (err) {
      console.error('Failed to load articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (art.excerpt && art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const featuredArticle = articles.length > 0 ? articles[0] : null
  const regularArticles = articles.length > 1 ? articles.slice(1) : articles

  return (
    <div className="relative min-h-screen bg-cosmos text-foreground overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      
      <main className="pt-36 pb-24 px-4 sm:px-6 mx-auto max-w-7xl w-full">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft border border-gold/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" /> GrahGanit Cosmic Journal
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-gradient-cosmic leading-tight">
            Planetary Knowledge &amp; Cosmic Insights
          </h1>
          <p className="mt-4 text-base text-foreground/70 leading-relaxed">
            Deep dive into Vedic astronomy, planetary transits, numerology codes, and palmistry breakdowns — curated by GrahGanit scholars.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="glass-strong p-4 rounded-2xl border border-white/10 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gold text-cosmos font-semibold shadow-md'
                    : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & transits..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>

        {/* FEATURED ARTICLE (If available and no search query) */}
        {featuredArticle && !searchQuery && selectedCategory === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <div className="glass-strong rounded-3xl border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl hover:border-gold/30 transition-all group">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
                <img
                  src={featuredArticle.cover_image || "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200"}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmos via-transparent to-transparent lg:hidden" />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-mono uppercase tracking-widest">
                      FEATURED ARTICLE
                    </span>
                    <span className="text-xs text-white/50 font-mono">{featuredArticle.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white group-hover:text-gold transition-colors leading-tight mb-4">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-6 border-t border-white/5 pt-4">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gold" /> {featuredArticle.author_name}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold" /> {featuredArticle.read_time}</span>
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-gold" /> {featuredArticle.views_count} views</span>
                  </div>

                  <Link
                    to="/article/$slug"
                    params={{ slug: featuredArticle.slug }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-amber-500 text-cosmos px-6 py-3 rounded-xl font-semibold text-xs hover:brightness-110 transition-all shadow-lg"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ARTICLES GRID */}
        {loading ? (
          <div className="py-20 text-center text-white/50 font-mono text-sm">
            Reading celestial scroll data...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <motion.div
                key={art.id}
                whileHover={{ y: -5 }}
                className="glass-strong rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-gold/30 transition-all group shadow-xl"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={art.cover_image || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200"}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-cosmos/80 backdrop-blur-md border border-white/10 text-gold text-[10px] font-mono">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-display font-medium text-white group-hover:text-gold transition-colors line-clamp-2 leading-snug mb-3">
                      {art.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-white/50 font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold" /> {art.read_time}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-gold" /> {art.views_count}</span>
                  </div>

                  <Link
                    to="/article/$slug"
                    params={{ slug: art.slug }}
                    className="text-xs text-gold font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}

            {filteredArticles.length === 0 && (
              <div className="col-span-full py-16 text-center text-white/40 glass p-8 rounded-2xl border border-white/10">
                <BookOpen className="w-8 h-8 text-gold/40 mx-auto mb-3" />
                <p className="text-sm font-medium">No articles matching your filter were found.</p>
                <p className="text-xs mt-1 text-white/30">Check back soon for new planetary transit updates.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
