import { motion } from 'framer-motion'
import SplitText from './SplitText'

const pillars = [
  {
    t: 'Who it\'s for',
    d: 'Anyone who is tired of gyms that sell memberships instead of results — beginners to competitors.',
  },
  {
    t: 'What makes us different',
    d: 'Coaching built on assessment data and periodised plans, on a floor that feels like an arena.',
  },
  {
    t: 'Our promise',
    d: 'Honest feedback, measurable progress and a room that never lets you train alone.',
  },
]

// The purpose statement — bridges the hero story into the method.
export default function StoryIntro() {
  return (
    <section className="section story-intro">
      <span className="eyebrow">Why this place exists</span>
      <p className="story-statement">
        <SplitText
          text="We built IRONPULSE for one purpose — to turn ordinary people into the strongest version of themselves."
          as="span"
          stagger={0.018}
        />
      </p>

      <div className="story-pillars">
        {pillars.map((p, i) => (
          <motion.div
            key={p.t}
            className="pillar"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
