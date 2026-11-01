import { Link } from 'react-router-dom'
import { contactInfo } from '../data'
import { scrollToY } from '../lib/smoothScroll'

const explore = [
  { label: 'Programs', to: '/programs' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Membership', to: '/membership' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="nav-logo footer-logo">
            IRON<span>PULSE</span>
          </Link>
          <p>
            Coached strength &amp; conditioning in Lahore. Built for people who
            want results, not a membership card.
          </p>
          <Link to="/membership" className="btn">
            <span>Claim Free Week</span>
          </Link>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          {explore.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h4>Visit</h4>
          <p>{contactInfo.address}</p>
          <p>{contactInfo.hours}</p>
        </div>

        <div className="footer-col">
          <h4>Talk to us</h4>
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </div>
      </div>

      <div className="footer-bar">
        <p className="footer-copy">
          © {new Date().getFullYear()} IRONPULSE — Forged in iron.
        </p>
        <button type="button" className="footer-top-btn" onClick={() => scrollToY(0)}>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
