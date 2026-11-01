import { useEffect, useLayoutEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProgramsPage from './pages/ProgramsPage'
import GalleryPage from './pages/GalleryPage'
import Trainers from './pages/Trainers'
import Membership from './pages/Membership'
import About from './pages/About'
import Contact from './pages/Contact'
import { initSmoothScroll, lockScroll, scrollToTop } from './lib/smoothScroll'
import { markReady } from './lib/appReady'

const pages = [
  { path: '/', el: <Home /> },
  { path: '/programs', el: <ProgramsPage /> },
  { path: '/gallery', el: <GalleryPage /> },
  { path: '/trainers', el: <Trainers /> },
  { path: '/membership', el: <Membership /> },
  { path: '/about', el: <About /> },
  { path: '/contact', el: <Contact /> },
]

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    initSmoothScroll()
    lockScroll(true)
  }, [])

  const onLoaded = () => {
    setLoading(false)
    lockScroll(false)
    markReady()
  }

  // new page mounted (after the exit fade): start at the top, re-measure triggers
  const onPageEnter = () => {
    scrollToTop()
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  // late-loading images change page height — keep trigger positions honest
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {loading && <Loader onDone={onLoaded} />}
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={onPageEnter}>
        {/* opacity-only: a transform here would break the hero's sticky stage */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Routes location={location}>
            {pages.map((p) => (
              <Route key={p.path} path={p.path} element={p.el} />
            ))}
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
