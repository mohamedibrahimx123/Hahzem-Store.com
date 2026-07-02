import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
import Compare from './pages/Compare'
import HelpMeChoose from './pages/HelpMeChoose'
import Reviews from './pages/Reviews'
import Admin from './pages/admin/Admin'
import PageTransition from './components/ui/PageTransition'

function App() {
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-dark text-white font-body">
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/products/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
          <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
          <Route path="/compare" element={<PageTransition><Compare /></PageTransition>} />
          <Route path="/help-me-choose" element={<PageTransition><HelpMeChoose /></PageTransition>} />
          <Route path="/reviews" element={<PageTransition><Reviews /></PageTransition>} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App
