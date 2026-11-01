import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import SplitText from '../components/SplitText'
import Stats from '../components/Stats'
import CTA from '../components/CTA'
import { aboutImages, values, fallbackFor } from '../data'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Since 2014"
        title="Our Story"
        image={aboutImages.story}
      />

      <section className="section about-story">
        <div className="about-story-grid">
          <motion.div
            className="about-story-media"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={aboutImages.community}
              alt="Members training together"
              onError={(e) => {
                if (!e.currentTarget.dataset.fb)
                  (e.currentTarget.dataset.fb = 1),
                    (e.currentTarget.src = fallbackFor('about-community', 900, 1100))
              }}
            />
          </motion.div>
          <div className="about-story-copy">
            <span className="eyebrow">Built in a garage</span>
            <h2 className="display about-h">
              <SplitText text="Forged from rust & stubbornness" as="span" />
            </h2>
            <p>
              IRONPULSE started in 2014 as a 900 sq ft garage with one rack, two
              bars and a rule that never changed: show up, do the work, leave
              better than you came. A decade later we run 4,000 sq ft of
              competition-grade iron — but the rule is the same.
            </p>
            <p>
              We are not a franchise. Every plate is loaded by hand, every
              coach is a competitor in their craft, and every member — from
              first-timers to national-level lifters — trains on the same floor.
            </p>
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="values-head">
          <span className="eyebrow">What we stand on</span>
          <h2 className="display">The code</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="value"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="value-num display">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  )
}
