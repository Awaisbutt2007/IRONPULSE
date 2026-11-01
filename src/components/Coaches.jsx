import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { coaches, fallbackFor } from '../data'

export default function Coaches({ limit, showHeading = true }) {
  const list = limit ? coaches.slice(0, limit) : coaches
  return (
    <section id="coaches" className="section coaches">
      {showHeading && (
        <div className="coaches-head">
          <span className="eyebrow">Your commanders</span>
          <h2 className="display">
            <SplitText text="Coached by the best" as="span" />
          </h2>
        </div>
      )}

      <div className="coaches-grid">
        {list.map((c, i) => (
          <motion.div
            key={c.name}
            className="coach"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="coach-media">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fb)
                    (e.currentTarget.dataset.fb = 1),
                      (e.currentTarget.src = fallbackFor(c.name, 700, 900))
                }}
              />
              <div className="coach-veil" />
            </div>
            <div className="coach-info">
              <h3 className="display">{c.name}</h3>
              <span>{c.role}</span>
              {c.spec && <p className="coach-spec">{c.spec}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
