import { motion } from 'framer-motion'
import { manifesto } from '../data'

// Full-width cinematic creed band — a pause between sections.
export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="manifesto-inner">
        <span className="eyebrow manifesto-eyebrow">{manifesto.eyebrow}</span>
        {manifesto.lines.map((line, i) => (
          <motion.h2
            key={line}
            className="manifesto-line display"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {i === 1 ? <span className="manifesto-gold">{line}</span> : line}
          </motion.h2>
        ))}
      </div>
    </section>
  )
}
