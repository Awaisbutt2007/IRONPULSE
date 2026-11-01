import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { facilities, fallbackFor } from '../data'

// What's under the roof — a card grid of real facility photos.
export default function Facilities() {
  return (
    <section className="section facilities">
      <div className="facilities-head">
        <span className="eyebrow">Under one roof</span>
        <h2 className="display">
          <SplitText text="The Facilities" as="span" />
        </h2>
        <p className="facilities-sub">
          30,000 sq ft of iron, turf and light — zoned so every session has a
          home.
        </p>
      </div>

      <div className="facilities-grid">
        {facilities.map((f, i) => (
          <motion.article
            key={f.title}
            className="facility"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="facility-media">
              <img
                src={f.img}
                alt={f.title}
                loading="lazy"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fb)
                    (e.currentTarget.dataset.fb = 1),
                      (e.currentTarget.src = fallbackFor(
                        'fac' + i,
                        800,
                        600
                      ))
                }}
              />
              <span className="facility-num display">0{i + 1}</span>
            </div>
            <div className="facility-body">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
