import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineChartBar, HiOutlineCube, HiOutlineTag, HiOutlineStar, HiOutlineBell, HiOutlinePhotograph, HiOutlineCog, HiOutlineLogout, HiOutlineMenu, HiX } from '../../components/ui/Icons'
import AdminDashboard from './AdminDashboard'
import ProductsManager from './ProductsManager'
import ReviewsManager from './ReviewsManager'
import NotificationsManager from './NotificationsManager'
import SettingsManager from './SettingsManager'

const sidebarLinks = [
  { path: '/admin', label: 'لوحة التحكم', icon: HiOutlineChartBar, end: true },
  { path: '/admin/products', label: 'المنتجات', icon: HiOutlineCube },
  { path: '/admin/reviews', label: 'التقييمات', icon: HiOutlineStar },
  { path: '/admin/notifications', label: 'الإشعارات', icon: HiOutlineBell },
  { path: '/admin/settings', label: 'الإعدادات', icon: HiOutlineCog },
]

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const stored = localStorage.getItem('admin_authenticated')
    if (stored === 'true') setAuthenticated(true)
    setCheckingAuth(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    setAuthenticated(false)
  }

  if (checkingAuth) return null

  if (!authenticated) {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen bg-dark flex">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          background: 'rgba(15,17,21,0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xs">MS</span>
              </div>
              <span className="font-heading font-semibold text-sm">لوحة الإدارة</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted hover:text-white">
              <HiX size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = link.end
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted hover:text-red-400 hover:bg-red-500/5 transition-all w-full border border-transparent">
              <HiOutlineLogout size={18} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-x-hidden">
        <div className="sticky top-0 z-30 py-4 px-6" style={{
          background: 'rgba(5,5,5,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted hover:text-white"
          >
            <HiOutlineMenu size={24} />
          </button>
        </div>

        <div className="p-6">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="reviews" element={<ReviewsManager />} />
            <Route path="notifications" element={<NotificationsManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 800))

    if (form.email === 'admin@premiumstore.com' && form.password === 'admin123') {
      localStorage.setItem('admin_authenticated', 'true')
      window.location.reload()
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-premium p-8"
        style={{
          background: 'rgba(15,17,21,0.95)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-heading font-bold text-lg">MS</span>
          </div>
          <h1 className="text-2xl font-heading font-bold">تسجيل دخول المشرف</h1>
          <p className="text-sm text-muted mt-1">مرحباً بعودتك</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-primary text-white font-medium hover:glow-blue transition-all disabled:opacity-50"
          >
            {loading ? '...' : 'تسجيل الدخول'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
