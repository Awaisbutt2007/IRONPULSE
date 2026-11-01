import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { gallery, fallbackFor } from '../data'

/*
 * Robust CSS-grid gallery — no ScrollTrigger pin, so it can never overlap
 * the pinned hero/method. Images reveal on scroll with a stagger.
 */
export default function Gallery({
  items = gallery,
  title = 'The Floor',
  eyebrow = 'Inside the temple',
}) {
  return (
    <section id="gallery" className="section gallery">
      <div className="gallery-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display">
          <SplitText text={title} as="span" />
        </h2>
      </div>

      <div className="gallery-grid">
        {items.map((g, i) => (
          <motion.figure
            key={i}
            className={`gallery-cell ${g.tall ? 'tall' : ''}`}
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src={g.src}
              alt={g.label}
              loading="lazy"
              onError={(e) => {
                if (!e.currentTarget.dataset.fb)
                  (e.currentTarget.dataset.fb = 1),
                    (e.currentTarget.src = fallbackFor(
                      'gallery' + i,
                      900,
                      g.tall ? 1200 : 900
                    ))
              }}
            />
            <div className="gallery-veil" />
            <figcaption>
              <span className="g-num display">0{i + 1}</span>
              <span className="g-label">{g.label}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
