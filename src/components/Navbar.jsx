import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { lockScroll } from '../lib/smoothScroll'

const links = [
  { label: 'Programs', to: '/programs' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname])

  // freeze the page behind the open mobile drawer; Esc closes it
  useEffect(() => {
    lockScroll(open)
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // inner pages have no hero behind the nav, so it must be solid from the start
  const solid = scrolled || location.pathname !== '/'

  return (
    <motion.header
      className={`nav ${solid ? 'nav--solid' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/" className="nav-logo">
        IRON<span>PULSE</span>
      </Link>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {links.map((l) => (
          <NavLink
            key={l.label}
            onClick={() => setOpen(false)}
            to={l.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/membership" className="btn nav-drawer-cta" onClick={() => setOpen(false)}>
          <span>Join Now</span>
        </Link>
      </nav>

      <Link to="/membership" className="btn nav-cta">
        <span>Join Now</span>
      </Link>

      <button
        className={`nav-burger ${open ? 'active' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <i />
        <i />
      </button>
    </motion.header>
  )
}
