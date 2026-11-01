import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitText from './SplitText'

// Closing call-to-action band, reused across pages.
export default function CTA() {
  return (
    <section className="cta section">
      <span className="eyebrow">Your first rep is free</span>
      <h2 className="display cta-title">
        <SplitText text="Ready to" as="span" />{' '}
        <span className="cta-gold">
          <SplitText text="suffer" delay={0.3} as="span" />
        </span>
        <br />
        <SplitText text="and grow?" delay={0.5} as="span" />
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <Link to="/membership" className="btn cta-btn">
          <span>Claim Free Week</span>
        </Link>
      </motion.div>
    </section>
  )
}
