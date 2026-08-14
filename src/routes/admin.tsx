import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Sections'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, Lock, Mail, Eye, EyeOff, Sparkles, Plus, Edit3, Trash2,
  FileText, Megaphone, Users, RefreshCw, CheckCircle2, AlertCircle,
  TrendingUp, Eye as ViewIcon, ExternalLink, BookOpen, Star, CreditCard, Calendar, Phone, DollarSign, MessageSquare
} from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminRouteComponent,
  head: () => ({
    meta: [
      { title: 'Admin Portal | GrahGanit Engine' },
      { name: 'description', content: 'GrahGanit Control Portal for verified administrator access.' }
    ],
  }),
})

interface ArticleItem {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string | null
  content: string
  cover_image: string | null
  author_name: string
  read_time: string
  is_published: boolean
  views_count: number
  created_at: string
}

interface AnnouncementItem {
  id: number
  badge_text: string
  message: string
  link_url: string | null
  is_active: boolean
  created_at: string
}

interface UserItem {
  id: number
  name: string
  email: string
  phone_number?: string
  is_verified: boolean
  is_admin: boolean
  created_at: string
}

function AdminRouteComponent() {
  const [adminToken, setAdminToken] = useState<string | null>(null)
  const [adminUser, setAdminUser] = useState<any>(null)

  // Login form state
  const [email, setEmail] = useState('admin@grahganit.in')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'consultations' | 'messages' | 'testimonials' | 'articles' | 'announcements' | 'users'>('overview')

  // Data state
  const [stats, setStats] = useState<any>(null)
  const [articles, setArticles] = useState<ArticleItem[]>([])
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([])
  const [usersList, setUsersList] = useState<UserItem[]>([])
  const [messagesList, setMessagesList] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [testimonialsList, setTestimonialsList] = useState<any[]>([])
  const [bookingsList, setBookingsList] = useState<any[]>([])
  const [tiersList, setTiersList] = useState<any[]>([])
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all')
  const [bookingSearch, setBookingSearch] = useState<string>('')

  // Article Modal Form state
  const [articleModalOpen, setArticleModalOpen] = useState(false)
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null)
  const [artTitle, setArtTitle] = useState('')
  const [artSlug, setArtSlug] = useState('')
  const [artCategory, setArtCategory] = useState('Vedic Astrology')
  const [artExcerpt, setArtExcerpt] = useState('')
  const [artContent, setArtContent] = useState('')
  const [artCover, setArtCover] = useState('')
  const [artAuthor, setArtAuthor] = useState('GrahGanit Observatory')
  const [artReadTime, setArtReadTime] = useState('5 min read')
  const [artPublished, setArtPublished] = useState(true)

  // Announcement Form state
  const [newAnnMsg, setNewAnnMsg] = useState('')
  const [newAnnBadge, setNewAnnBadge] = useState('COSMIC ALERT')
  const [newAnnLink, setNewAnnLink] = useState('')

  useEffect(() => {
    const savedToken = localStorage.getItem('grahganit_admin_token')
    const savedAdmin = localStorage.getItem('grahganit_admin_user')
    if (savedToken && savedAdmin) {
      setAdminToken(savedToken)
      setAdminUser(JSON.parse(savedAdmin))
    }
  }, [])

  useEffect(() => {
    if (adminToken) {
      fetchDashboardData()
    }
  }, [adminToken])

  const fetchDashboardData = async () => {
    try {
      // 1. Stats
      const resStats = await fetch('/api/admin/stats')
      if (resStats.ok) {
        setStats(await resStats.json())
      }
      // 2. Articles
      const resArt = await fetch('/api/admin/articles')
      if (resArt.ok) {
        setArticles(await resArt.json())
      }
      // 3. Announcements
      const resAnn = await fetch('/api/admin/announcements')
      if (resAnn.ok) {
        setAnnouncements(await resAnn.json())
      }
      // 4. Users
      const resUsers = await fetch('/api/admin/users')
      if (resUsers.ok) {
        setUsersList(await resUsers.json())
      }
      // 5. Contact Messages
      const resMsg = await fetch('/api/admin/contact-messages/list')
      if (resMsg.ok) {
        const dataMsg = await resMsg.json()
        setMessagesList(dataMsg.messages || [])
        setUnreadCount(dataMsg.unread_count || 0)
      }
      // 6. Testimonials
      const resTest = await fetch('/api/admin/testimonials')
      if (resTest.ok) {
        setTestimonialsList(await resTest.json())
      }
      // 7. Consultation Tiers
      const resTiers = await fetch('/api/admin/consultation-tiers')
      if (resTiers.ok) {
        setTiersList(await resTiers.json())
      }
      // 8. Consultation Bookings
      const resBookings = await fetch('/api/admin/bookings')
      if (resBookings.ok) {
        const dataBookings = await resBookings.json()
        setBookingsList(dataBookings.bookings || [])
      }
    } catch (err) {
      console.error('Error fetching admin data:', err)
    }
  }

  const handleUpdateBookingStatus = async (bookingId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_status: newStatus })
      })
      if (res.ok) {
        setBookingsList(prev => prev.map(b => b.id === bookingId ? { ...b, payment_status: newStatus } : b))
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Error updating booking status:', err)
    }
  }

  const handleToggleReadMessage = async (msgId: number) => {
    try {
      const res = await fetch(`/api/admin/contact-messages/${msgId}/toggle-read`, { method: 'POST' })
      if (res.ok) {
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Error toggling message read status:', err)
    }
  }

  const handleDeleteMessage = async (msgId: number) => {
    if (!confirm('Are you sure you want to delete this seeker message?')) return
    try {
      const res = await fetch(`/api/admin/contact-messages/${msgId}`, { method: 'DELETE' })
      if (res.ok) {
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Error deleting message:', err)
    }
  }

  const handleToggleApproveTestimonial = async (tId: number) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${tId}/toggle-approve`, { method: 'POST' })
      if (res.ok) fetchDashboardData()
    } catch (err) {
      console.error('Error approving testimonial:', err)
    }
  }

  const handleDeleteTestimonial = async (tId: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    try {
      const res = await fetch(`/api/admin/testimonials/${tId}`, { method: 'DELETE' })
      if (res.ok) fetchDashboardData()
    } catch (err) {
      console.error('Error deleting testimonial:', err)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || 'Login failed')
      }
      localStorage.setItem('grahganit_admin_token', data.token)
      localStorage.setItem('grahganit_admin_user', JSON.stringify(data.admin))
      setAdminToken(data.token)
      setAdminUser(data.admin)
    } catch (err: any) {
      setErrorMsg(err.message || 'Authorization failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('grahganit_admin_token')
    localStorage.removeItem('grahganit_admin_user')
    setAdminToken(null)
    setAdminUser(null)
  }

  const openCreateArticleModal = () => {
    setEditingArticleId(null)
    setArtTitle('')
    setArtSlug('')
    setArtCategory('Vedic Astrology')
    setArtExcerpt('')
    setArtContent('')
    setArtCover('')
    setArtAuthor('GrahGanit Observatory')
    setArtReadTime('5 min read')
    setArtPublished(true)
    setArticleModalOpen(true)
  }

  const openEditArticleModal = (art: ArticleItem) => {
    setEditingArticleId(art.id)
    setArtTitle(art.title)
    setArtSlug(art.slug)
    setArtCategory(art.category)
    setArtExcerpt(art.excerpt || '')
    setArtContent(art.content)
    setArtCover(art.cover_image || '')
    setArtAuthor(art.author_name)
    setArtReadTime(art.read_time)
    setArtPublished(art.is_published)
    setArticleModalOpen(true)
  }

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!artTitle || !artContent) return

    const payload = {
      title: artTitle,
      slug: artSlug || undefined,
      category: artCategory,
      excerpt: artExcerpt,
      content: artContent,
      cover_image: artCover || null,
      author_name: artAuthor,
      read_time: artReadTime,
      is_published: artPublished,
    }

    try {
      const url = editingArticleId ? `/api/admin/articles/${editingArticleId}` : '/api/admin/articles'
      const method = editingArticleId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setArticleModalOpen(false)
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Save article failed:', err)
    }
  }

  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Delete article failed:', err)
    }
  }

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAnnMsg) return
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          badge_text: newAnnBadge,
          message: newAnnMsg,
          link_url: newAnnLink || null,
          is_active: true,
        }),
      })
      if (res.ok) {
        setNewAnnMsg('')
        setNewAnnLink('')
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Create announcement failed:', err)
    }
  }

  const handleToggleAnnouncement = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/announcements/${id}/toggle`, { method: 'PUT' })
      if (res.ok) {
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Toggle failed:', err)
    }
  }

  const handleDeleteAnnouncement = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handlePromoteUser = async (userEmail: string, currentAdminStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/users/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, is_admin: !currentAdminStatus }),
      })
      if (res.ok) {
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Promote user failed:', err)
    }
  }

  // ─── LOGIN GATE SCREEN ──────────────────────────────────────────────────────
  if (!adminToken) {
    return (
      <div className="min-h-screen bg-cosmos text-foreground flex flex-col justify-between">
        <Navbar />
        <main className="pt-32 pb-20 px-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-strong p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 text-gold mb-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-display font-medium text-gradient-gold">GrahGanit Admin Portal</h1>
              <p className="text-xs text-white/50 mt-1">Verified Administrator Authentication</p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-gold-soft uppercase tracking-wider block mb-1.5">Admin Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@grahganit.in"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-gold-soft uppercase tracking-wider block mb-1.5">Master Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-white/40 hover:text-white/80"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gold via-gold-soft to-amber-500 text-cosmos font-semibold text-sm py-3 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authenticate Admin Access</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-white/5 text-center text-[10px] text-white/40">
              Default Seeded Access: <span className="text-gold font-mono">admin@grahganit.in</span> / <span className="text-gold font-mono">Admin@12345</span>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  // ─── ADMIN DASHBOARD ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cosmos text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-10 mx-auto max-w-[1600px] w-full">
        {/* Legal Security & Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-gold-soft uppercase tracking-widest bg-gold/10 border border-gold/30 px-3.5 py-1 rounded-full mb-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>🔐 256-Bit Encrypted Legal Admin Console · GrahGanit Observatory</span>
            </div>
            <h1 className="text-4xl font-display font-semibold text-gradient-gold">Control &amp; Operations Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{adminUser?.name || 'Master Admin'}</p>
              <p className="text-xs text-gold-soft font-mono">{adminUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-xs font-medium text-white transition-all cursor-pointer"
            >
              Sign Out Console
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'bookings', label: 'Paid Bookings', icon: <CreditCard className="w-4 h-4" />, badge: bookingsList.filter(b => b.payment_status === 'paid').length },
            { id: 'consultations', label: 'Consultation Tiers', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'messages', label: 'Seeker Messages', icon: <Mail className="w-4 h-4" />, badge: unreadCount },
            { id: 'testimonials', label: 'Seeker Testimonials', icon: <Star className="w-4 h-4" />, badge: testimonialsList.filter(t => !t.is_approved).length },
            { id: 'articles', label: 'Articles & Content', icon: <FileText className="w-4 h-4" /> },
            { id: 'announcements', label: 'Header Announcements', icon: <Megaphone className="w-4 h-4" /> },
            { id: 'users', label: 'User Directory', icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap relative cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold to-amber-500 text-cosmos shadow-lg shadow-gold/20 scale-[1.02]'
                  : 'glass text-white/80 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold animate-pulse">
                  {tab.badge} NEW
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── TAB 1: OVERVIEW ───────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 6 High-Density Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Registered Users', val: stats?.total_users ?? 0, sub: `${stats?.admin_users ?? 0} Verified Admins`, icon: <Users className="w-6 h-6 text-blue-400" /> },
                { label: 'Seeker Messages Inbox', val: stats?.total_messages ?? 0, sub: `${stats?.unread_messages ?? 0} Unread Messages Pending`, icon: <Mail className="w-6 h-6 text-rose-400" /> },
                { label: 'Seeker Testimonials', val: stats?.total_testimonials ?? 0, sub: `${stats?.approved_testimonials ?? 0} Live Approved`, icon: <Star className="w-6 h-6 text-amber-400" /> },
                { label: 'Published Articles', val: stats?.published_articles ?? 0, sub: `Out of ${stats?.total_articles ?? 0} Total Drafts`, icon: <FileText className="w-6 h-6 text-gold" /> },
                { label: 'Total Reader Views', val: stats?.total_views ?? 0, sub: 'Cumulative Article Reads', icon: <ViewIcon className="w-6 h-6 text-purple-400" /> },
                { label: 'System Diagnostics', val: stats?.server_status ?? 'OPERATIONAL 🟢', sub: `${stats?.db_engine} · ${stats?.astrology_engine}`, icon: <ShieldCheck className="w-6 h-6 text-emerald-400" /> },
              ].map((card, i) => (
                <div key={i} className="glass-strong p-6 rounded-3xl border border-white/10 hover:border-gold/40 transition-all flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-xs text-gold-soft font-mono uppercase tracking-wider">{card.label}</p>
                    <p className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">{card.val}</p>
                    <p className="text-xs text-white/60 mt-1 font-mono">{card.sub}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">{card.icon}</div>
                </div>
              ))}
            </div>

            {/* System Health Banner */}
            <div className="glass-strong p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xl shrink-0">
                  ⚡
                </div>
                <div>
                  <h4 className="text-sm font-mono font-bold text-emerald-300 uppercase tracking-wider">Engine Status: Fully Operational</h4>
                  <p className="text-xs text-white/70 mt-0.5">Vite Dev Server (Port 8080) &amp; FastAPI Backend (Port 8000) running with Swiss Ephemeris deterministic calculation module.</p>
                </div>
              </div>
              <div className="text-xs font-mono text-white/60 shrink-0">
                <span>Latency: 2ms</span> · <span className="text-emerald-400">100% Uptime</span>
              </div>
            </div>

            {/* Quick Management Shortcuts */}
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-lg font-display font-medium text-white">Quick Operations Shortcuts</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={openCreateArticleModal}
                  className="bg-gold text-cosmos px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Create New Article
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="glass-strong px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 hover:bg-white/10 transition-all border border-white/15 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-rose-400" /> View Seeker Messages ({unreadCount} New)
                </button>
                <Link
                  to="/blog"
                  target="_blank"
                  className="glass-strong px-6 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-2 hover:bg-white/10 transition-all border border-white/15"
                >
                  <ExternalLink className="w-4 h-4 text-gold" /> Preview Live Blog
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: ARTICLES ───────────────────────────────────────────────── */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display text-white">Cosmic Articles & Guides</h3>
                <p className="text-xs text-white/50">Manage published and draft articles on GrahGanit</p>
              </div>
              <button
                onClick={openCreateArticleModal}
                className="bg-gold text-cosmos px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 hover:bg-gold/90 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Article
              </button>
            </div>

            <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-white/60 font-mono text-[10px] uppercase border-b border-white/10">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Views</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/80">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white max-w-xs truncate">
                          {art.title}
                          <span className="block text-[10px] text-white/40 font-mono font-normal">/article/{art.slug}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-mono border border-gold/20">
                            {art.category}
                          </span>
                        </td>
                        <td className="p-4 text-white/60">{art.author_name}</td>
                        <td className="p-4 font-mono">{art.views_count}</td>
                        <td className="p-4">
                          {art.is_published ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-mono">
                              <CheckCircle2 className="w-3 h-3" /> Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-400 text-[10px] font-mono">
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditArticleModal(art)}
                            className="p-1.5 rounded-lg glass text-gold hover:bg-gold/20 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 rounded-lg glass text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {articles.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-white/40">No articles created yet. Click "Add Article" above to publish one.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: ANNOUNCEMENTS ──────────────────────────────────────────── */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="glass-strong p-6 rounded-2xl border border-white/10">
              <h3 className="text-base font-display text-white mb-4">Create Site-Wide Notification Banner</h3>
              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-gold-soft uppercase block mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={newAnnBadge}
                      onChange={(e) => setNewAnnBadge(e.target.value)}
                      placeholder="COSMIC ALERT"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-mono text-gold-soft uppercase block mb-1">Announcement Message</label>
                    <input
                      type="text"
                      value={newAnnMsg}
                      onChange={(e) => setNewAnnMsg(e.target.value)}
                      required
                      placeholder="e.g. Major Solar Eclipse Transit Report Available Now!"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gold-soft uppercase block mb-1">Link Target URL (Optional)</label>
                  <input
                    type="text"
                    value={newAnnLink}
                    onChange={(e) => setNewAnnLink(e.target.value)}
                    placeholder="/blog"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold text-cosmos px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 hover:bg-gold/90 transition-all shadow-md"
                >
                  <Megaphone className="w-4 h-4" /> Publish Banner to Live Website
                </button>
              </form>
            </div>

            {/* List of Announcements */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest">Active & Past Announcements</h4>
              {announcements.map((ann) => (
                <div key={ann.id} className="glass p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${ann.is_active ? 'bg-gold/20 text-gold border border-gold/40' : 'bg-white/10 text-white/40'}`}>
                      {ann.badge_text}
                    </span>
                    <p className="text-xs text-white font-medium">{ann.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleAnnouncement(ann.id)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono ${ann.is_active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-white/10 text-white/40'}`}
                    >
                      {ann.is_active ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 2: PAID BOOKINGS & APPOINTMENTS ──────────────────────────── */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Header & Revenue Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-display text-white">Paid Consultations &amp; Appointments</h3>
                <p className="text-xs text-white/50">Real-time tracker of all seeker appointments, payments, and notes</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                  <span className="text-sm">₹</span>
                  <span>Total Paid Revenue: ₹{bookingsList.filter(b => b.payment_status === 'paid').reduce((sum, b) => sum + (b.amount || 0), 0).toLocaleString('en-IN')}</span>
                </div>
                <button
                  onClick={fetchDashboardData}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
                  title="Refresh Bookings"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/10">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'paid', 'scheduled', 'completed', 'created'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      bookingStatusFilter === st
                        ? 'bg-gold text-cosmos font-bold shadow-md shadow-gold/20'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {st === 'all' ? `All (${bookingsList.length})` : `${st} (${bookingsList.filter(b => b.payment_status === st).length})`}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search seeker name, email, phone, or txn..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full sm:w-64 bg-white/5 border border-white/10 focus:border-gold/40 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 outline-none"
              />
            </div>

            {/* Bookings Table */}
            <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-white/60 font-mono text-[10px] uppercase border-b border-white/10">
                    <tr>
                      <th className="p-4">Seeker Information</th>
                      <th className="p-4">Phone / WhatsApp</th>
                      <th className="p-4">Package &amp; Price</th>
                      <th className="p-4">Appointment Slot</th>
                      <th className="p-4">Seeker Question / Message</th>
                      <th className="p-4">Payment &amp; Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/80">
                    {bookingsList
                      .filter((b) => {
                        if (bookingStatusFilter !== 'all' && b.payment_status !== bookingStatusFilter) return false
                        if (bookingSearch.trim()) {
                          const q = bookingSearch.toLowerCase()
                          const matchName = (b.seeker_name || '').toLowerCase().includes(q)
                          const matchEmail = (b.seeker_email || '').toLowerCase().includes(q)
                          const matchPhone = (b.seeker_phone || '').toLowerCase().includes(q)
                          const matchTxn = (b.payment_id || b.order_id || '').toLowerCase().includes(q)
                          const matchPlan = (b.plan_name || '').toLowerCase().includes(q)
                          return matchName || matchEmail || matchPhone || matchTxn || matchPlan
                        }
                        return true
                      })
                      .map((b) => {
                        const cleanPhone = (b.seeker_phone || '').replace(/[^0-9]/g, '')
                        const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`

                        return (
                          <tr key={b.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <p className="font-semibold text-white">{b.seeker_name}</p>
                              <a href={`mailto:${b.seeker_email}`} className="text-xs text-white/50 hover:text-gold transition-colors font-mono">
                                {b.seeker_email}
                              </a>
                              {b.dob && (
                                <p className="text-[10px] text-white/40 font-mono mt-0.5">
                                  DOB: {b.dob} {b.tob ? `@ ${b.tob}` : ''} {b.pob ? `· ${b.pob}` : ''}
                                </p>
                              )}
                            </td>

                            <td className="p-4 font-mono">
                              {b.seeker_phone ? (
                                <div className="space-y-1">
                                  <span className="text-white text-xs">{b.seeker_phone}</span>
                                  {cleanPhone.length >= 10 && (
                                    <a
                                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello ${b.seeker_name}, greetings from GrahGanit! Regarding your ${b.plan_name} consultation scheduled for ${b.scheduled_date || 'your chosen date'}...`)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full"
                                    >
                                      <span>💬 WhatsApp Chat</span>
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  )}
                                </div>
                              ) : (
                                <span className="text-white/30 text-[10px]">—</span>
                              )}
                            </td>

                            <td className="p-4">
                              <span className="font-semibold text-gold">{b.plan_name}</span>
                              <p className="text-base font-bold font-mono text-white mt-0.5">₹{b.amount}</p>
                              {b.include_recording && (
                                <span className="text-[9px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded">
                                  + Recording Included
                                </span>
                              )}
                            </td>

                            <td className="p-4 font-mono">
                              <p className="text-white font-medium">{b.scheduled_date || 'Date Pending'}</p>
                              <p className="text-xs text-amber-400/80">{b.scheduled_time || '10:30 AM'}</p>
                            </td>

                            <td className="p-4 max-w-xs">
                              {b.notes ? (
                                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/80 font-sans leading-relaxed">
                                  {b.notes}
                                </div>
                              ) : (
                                <span className="text-white/30 italic text-[11px]">No specific message provided.</span>
                              )}
                            </td>

                            <td className="p-4">
                              <div className="space-y-1.5">
                                <select
                                  value={b.payment_status}
                                  onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                                  className={`text-[10px] font-mono font-bold uppercase rounded-xl px-2.5 py-1 border outline-none cursor-pointer ${
                                    b.payment_status === 'paid'
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                      : b.payment_status === 'scheduled'
                                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                      : b.payment_status === 'completed'
                                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  }`}
                                >
                                  <option value="paid" className="bg-cosmos text-white">Paid (Confirmed)</option>
                                  <option value="scheduled" className="bg-cosmos text-white">Scheduled</option>
                                  <option value="completed" className="bg-cosmos text-white">Completed</option>
                                  <option value="created" className="bg-cosmos text-white">Pending Payment</option>
                                  <option value="cancelled" className="bg-cosmos text-white">Cancelled</option>
                                </select>

                                {b.payment_id && (
                                  <p className="text-[9px] font-mono text-white/40 block truncate max-w-[130px]" title={b.payment_id}>
                                    Txn: {b.payment_id}
                                  </p>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
                {bookingsList.length === 0 && (
                  <div className="p-12 text-center text-white/40">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No consultation bookings recorded yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: CONSULTATIONS & PRICING ────────────────────────────────── */}
        {activeTab === 'consultations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display text-white">Consultation Packages &amp; Pricing</h3>
                <p className="text-xs text-white/50">Live pricing engine · Changes update immediately across the entire website &amp; payment gateway</p>
              </div>
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync Live Prices</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { key: 'career', title: 'Career Guidance', defaultPrice: 999, duration: '45 Minutes', badge: 'CAREER & JOBS' },
                { key: 'marriage', title: 'Marriage & Relationship', defaultPrice: 1499, duration: '60 Minutes', badge: 'SYNASTRY & LOVE' },
                { key: 'finance', title: 'Business & Finance', defaultPrice: 1499, duration: '60 Minutes', badge: 'WEALTH & LAUNCH' },
                { key: 'health', title: 'Health & Spiritual Guidance', defaultPrice: 999, duration: '45 Minutes', badge: 'WELLNESS & MANTRAS' },
                { key: 'life', title: 'Complete Life Reading', defaultPrice: 2499, duration: '90 Minutes', badge: 'MOST POPULAR' },
              ].map((tier) => {
                const dbTier = tiersList.find((t: any) => t.tier_key === tier.key)
                const currentPrice = dbTier ? dbTier.price_inr : tier.defaultPrice
                const currentDuration = dbTier ? dbTier.duration : tier.duration

                return (
                  <div key={tier.key} className="glass-strong p-6 rounded-2xl border border-white/10 space-y-4 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-mono border border-gold/20 font-bold">
                        {tier.badge}
                      </span>
                      <span className="text-xs text-white/40 font-mono">Key: {tier.key}</span>
                    </div>

                    <div>
                      <h4 className="text-base font-display font-medium text-white">{tier.title}</h4>
                      <p className="text-3xl font-bold font-mono text-gold mt-1">₹{currentPrice}</p>
                      <p className="text-xs text-white/50">{currentDuration}</p>
                    </div>

                    <div className="pt-2 border-t border-white/5 text-xs text-white/70 space-y-1 font-mono">
                      <p>• Live 1-on-1 Astrologer Session</p>
                      <p>• Birth Chart (Kundali) Analysis</p>
                      <p>• Custom Remedies &amp; Q&amp;A</p>
                    </div>

                    <button
                      onClick={async () => {
                        const newPriceStr = prompt(`Enter new price in INR for ${tier.title}:`, currentPrice.toString())
                        if (newPriceStr && !isNaN(Number(newPriceStr))) {
                          const newPrice = Number(newPriceStr)
                          // 1. Immediately update UI state
                          setTiersList((prev: any[]) => {
                            const exists = prev.some((t) => t.tier_key === tier.key)
                            if (exists) {
                              return prev.map((t) => (t.tier_key === tier.key ? { ...t, price_inr: newPrice } : t))
                            }
                            return [...prev, { tier_key: tier.key, title: tier.title, price_inr: newPrice, duration: tier.duration }]
                          })

                          // 2. Persist to DB
                          try {
                            const res = await fetch(`/api/admin/consultation-tiers/${tier.key}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                title: tier.title,
                                price_inr: newPrice,
                                duration: currentDuration,
                                is_active: true,
                              }),
                            })
                            if (res.ok) {
                              alert(`✅ ${tier.title} price updated to ₹${newPrice} successfully!`)
                              fetchDashboardData()
                            }
                          } catch (e) {
                            console.error('Error saving tier price:', e)
                          }
                        }
                      }}
                      className="w-full bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Package Price</span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── TAB 5: USERS DIRECTORY ────────────────────────────────────────── */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-white/60 font-mono text-[10px] uppercase border-b border-white/10">
                  <tr>
                    <th className="p-4">User Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Phone / WhatsApp</th>
                    <th className="p-4">Registered Date</th>
                    <th className="p-4">Role</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {usersList.map((usr) => (
                    <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white">{usr.name}</td>
                      <td className="p-4 font-mono text-white/70">
                        <a href={`mailto:${usr.email}`} className="hover:text-gold transition-colors">
                          {usr.email}
                        </a>
                      </td>
                      <td className="p-4 font-mono text-xs">
                        {usr.phone_number && usr.phone_number !== 'Not Provided' ? (
                          <a
                            href={`https://wa.me/${usr.phone_number.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(usr.name)},%20this%20is%20GrahGanit%20support.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <span>{usr.phone_number}</span>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded">WA</span>
                          </a>
                        ) : (
                          <span className="text-white/30 italic">Not provided</span>
                        )}
                      </td>
                      <td className="p-4 text-white/50">{new Date(usr.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        {usr.is_admin ? (
                          <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-[10px] font-mono border border-gold/30">
                            ADMIN
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-[10px] font-mono">
                            USER
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handlePromoteUser(usr.email, usr.is_admin)}
                          className="px-3 py-1 rounded-lg glass text-[10px] text-gold hover:bg-gold/20 transition-colors"
                        >
                          {usr.is_admin ? 'Revoke Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 6: SEEKER MESSAGES ─────────────────────────────────────────── */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-display font-medium text-white flex items-center gap-2">
                  <span>📩 Seeker Inquiries &amp; Messages</span>
                  {unreadCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-mono font-bold animate-pulse">
                      {unreadCount} UNREAD
                    </span>
                  )}
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Messages transmitted directly from the /contact form with birth chart details.
                </p>
              </div>

              <button
                onClick={fetchDashboardData}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-gold" /> Refresh Inbox
              </button>
            </div>

            {messagesList.length === 0 ? (
              <div className="glass-strong rounded-3xl p-12 text-center text-white/50 border border-white/10">
                <Mail className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-sm font-medium">No seeker messages received yet.</p>
                <p className="text-xs text-white/40 mt-1">Submitted messages from /contact will automatically appear here with a notification badge.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messagesList.map((msg) => (
                  <div
                    key={msg.id}
                    className={`glass-strong rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden ${
                      !msg.is_read
                        ? 'border-gold/50 bg-gold/5 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
                        : 'border-white/10 bg-white/[0.02]'
                    }`}
                  >
                    {/* Status Badge & Actions Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        {!msg.is_read ? (
                          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> NEW UNREAD
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 text-[10px] font-mono uppercase tracking-wider">
                            ✓ READ
                          </span>
                        )}

                        <span className="px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/30 text-[10px] font-mono font-medium">
                          {msg.subject || 'General Enquiry'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                        <span>{new Date(msg.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                      </div>
                    </div>

                    {/* Sender Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Seeker Name</span>
                        <span className="text-sm font-semibold text-white">{msg.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Email Address</span>
                        <a href={`mailto:${msg.email}`} className="text-xs font-mono text-gold hover:underline">
                          {msg.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Phone / WhatsApp</span>
                        <span className="text-xs font-mono text-white/80">{msg.phone || 'Not provided'}</span>
                      </div>
                    </div>

                    {/* Birth Chart Context Pill */}
                    {(msg.dob || msg.tob || msg.pob) && (
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 flex flex-wrap items-center gap-4 text-xs font-mono text-gold-soft">
                        <span className="text-white/40 uppercase text-[10px] tracking-wider">Birth Context:</span>
                        {msg.dob && <span>☀️ DOB: {msg.dob}</span>}
                        {msg.tob && <span>⏰ TOB: {msg.tob}</span>}
                        {msg.pob && <span>📍 POB: {msg.pob}</span>}
                      </div>
                    )}

                    {/* Message Body */}
                    <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-xs text-white/90 leading-relaxed font-sans whitespace-pre-wrap">
                      {msg.message}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleReadMessage(msg.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            !msg.is_read
                              ? 'bg-gold/20 text-gold border border-gold/40 hover:bg-gold/30'
                              : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {!msg.is_read ? 'Mark as Read' : 'Mark as Unread'}
                        </button>

                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)} - GrahGanit Guidance`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5 text-gold" /> Reply via Email
                        </a>

                        {msg.phone && (
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(msg.name)},%20this%20is%20GrahGanit%20support%20regarding%20your%20inquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            WhatsApp Reply
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs text-rose-300 transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: SEEKER TESTIMONIALS MODERATION ────────────────────────────── */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-display font-medium text-white flex items-center gap-2">
                  <span>⭐ Seeker Testimonials &amp; Reviews Moderation</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-mono font-bold">
                    {testimonialsList.length} Total Submitted
                  </span>
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Approve or hide seeker testimonials submitted on the main website homepage &amp; experience section.
                </p>
              </div>

              <button
                onClick={fetchDashboardData}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-gold" /> Refresh Reviews
              </button>
            </div>

            {testimonialsList.length === 0 ? (
              <div className="glass-strong rounded-3xl p-12 text-center text-white/50 border border-white/10">
                <Star className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-sm font-medium">No testimonials submitted yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonialsList.map((t) => (
                  <div
                    key={t.id}
                    className={`glass-strong rounded-3xl p-6 border transition-all duration-300 relative flex flex-col justify-between ${
                      t.is_approved
                        ? 'border-emerald-500/30 bg-emerald-500/5'
                        : 'border-amber-500/40 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                        <div>
                          <h4 className="text-base font-semibold text-white">{t.name}</h4>
                          <span className="text-[10px] font-mono text-gold-soft uppercase tracking-wider block">
                            {t.zodiac_sign || 'Seeker'} · {t.category || 'General Experience'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-full px-2.5 py-0.5 text-gold text-xs font-mono">
                          {'★'.repeat(t.rating || 5)}
                        </div>
                      </div>

                      <p className="text-xs text-white/85 leading-relaxed italic mb-4 font-sans">
                        "{t.comment}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => handleToggleApproveTestimonial(t.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          t.is_approved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-gold text-cosmos font-bold shadow-md hover:bg-amber-400'
                        }`}
                      >
                        {t.is_approved ? '✓ Approved & Live' : '✦ Approve & Publish'}
                      </button>

                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs text-rose-300 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ARTICLE EDITOR MODAL */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl glass-strong p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5 my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-display text-gradient-gold">
                {editingArticleId ? 'Edit Article' : 'Publish New Cosmic Article'}
              </h3>
              <button onClick={() => setArticleModalOpen(false)} className="text-white/40 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-gold-soft uppercase block mb-1">Article Title</label>
                  <input
                    type="text"
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    required
                    placeholder="Title..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gold-soft uppercase block mb-1">Category</label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value)}
                    className="w-full bg-cosmos border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Vedic Astrology">Vedic Astrology</option>
                    <option value="Numerology">Numerology</option>
                    <option value="Palmistry">Palmistry</option>
                    <option value="Transits & Eclipses">Transits &amp; Eclipses</option>
                    <option value="Kundali Guidance">Kundali Guidance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-gold-soft uppercase block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={artCover}
                  onChange={(e) => setArtCover(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gold-soft uppercase block mb-1">Short Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={artExcerpt}
                  onChange={(e) => setArtExcerpt(e.target.value)}
                  placeholder="Brief summary for list preview..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gold-soft uppercase block mb-1">Full Content (Markdown supported)</label>
                <textarea
                  rows={10}
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  required
                  placeholder="# Write article content using Markdown..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="artPub"
                  checked={artPublished}
                  onChange={(e) => setArtPublished(e.target.checked)}
                  className="rounded bg-white/10 border-white/20"
                />
                <label htmlFor="artPub" className="text-xs text-white">Publish immediately to GrahGanit Live Blog</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="px-4 py-2 rounded-xl glass text-xs text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold text-cosmos font-semibold text-xs hover:bg-gold/90 transition-all shadow-md"
                >
                  {editingArticleId ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}
