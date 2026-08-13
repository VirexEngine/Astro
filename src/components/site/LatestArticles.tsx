import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./AstrologySection";

const articles = [
  {
    title: "Understanding Jupiter Retrograde",
    excerpt: "How the giant planet's backward motion affects your spiritual growth and material expansion this year.",
    date: "Jul 12, 2026",
    category: "Astrology",
    slug: "understanding-jupiter-retrograde"
  },
  {
    title: "The Power of Life Path 7",
    excerpt: "Exploring the traits of the seeker, the thinker, and the searcher of truth in modern numerology.",
    date: "Jun 28, 2026",
    category: "Numerology",
    slug: "power-of-life-path-7"
  },
  {
    title: "Manglik Dosh: Myths and Remedies",
    excerpt: "Demystifying one of the most misunderstood planetary alignments in Vedic Kundali matchmaking.",
    date: "Jun 15, 2026",
    category: "Kundali",
    slug: "manglik-dosh-myths"
  }
];

export function LatestArticles() {
  return (
    <section className="relative py-28 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeader 
            eyebrow="Cosmic Insights" 
            title="Latest Articles" 
            sub="Wisdom from our astrologers, numerologists, and seers."
          />
          <Link to="/blog" className="shrink-0 rounded-full glass px-6 py-2.5 text-sm font-medium hover:glow-royal transition-all hidden md:inline-flex items-center gap-2">
            View all articles <span>→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <Link key={article.slug} to="/blog" className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-3xl p-8 h-full flex flex-col group cursor-pointer hover:border-royal/50 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-medium uppercase tracking-widest text-gold-soft bg-gold/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-foreground/40">{article.date}</span>
                </div>
                <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors">{article.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow">{article.excerpt}</p>
                <div className="mt-auto text-xs uppercase tracking-widest text-royal-soft flex items-center gap-2 group-hover:gap-4 transition-all">
                  Read article <span>→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link to="/blog" className="inline-flex items-center justify-center rounded-full glass px-8 py-3 text-sm font-medium hover:glow-royal transition-all">
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
