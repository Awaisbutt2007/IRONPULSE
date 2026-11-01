import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplitText from './SplitText'
import { testimonials, fallbackFor } from '../data'

// Social proof — a rotating testimonial with member results.
export default function Testimonials() {
  const [i, setI] = useState(0)
  const t = testimonials[i]
  const go = (d) =>
    setI((p) => (p + d + testimonials.length) % testimonials.length)

  return (
    <section className="section testimonials">
      <div className="testi-head">
        <span className="eyebrow">Proof, not promises</span>
        <h2 className="display">
          <SplitText text="Member Results" as="span" />
        </h2>
      </div>

      <div className="testi-card">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="testi-quote">“{t.quote}”</p>
            <footer className="testi-person">
              <img
                src={t.img}
                alt={t.name}
                onError={(e) => {
                  if (!e.currentTarget.dataset.fb)
                    (e.currentTarget.dataset.fb = 1),
                      (e.currentTarget.src = fallbackFor('testi' + i, 200, 200))
                }}
              />
              <div>
                <strong>{t.name}</strong>
                <span>{t.result}</span>
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="testi-nav">
          <button className="btn btn-ghost btn-sm" onClick={() => go(-1)}>
            <span>Prev</span>
          </button>
          <div className="testi-dots">
            {testimonials.map((_, d) => (
              <button
                key={d}
                aria-label={`Testimonial ${d + 1}`}
                className={`dot ${d === i ? 'on' : ''}`}
                onClick={() => setI(d)}
              />
            ))}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => go(1)}>
            <span>Next</span>
          </button>
        </div>
      </div>
    </section>
  )
}
