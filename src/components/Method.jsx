import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { methodSteps, fallbackFor } from '../data'

function MethodRow({ s, i }) {
  const flip = i % 2 === 1
  return (
    <motion.article
      className={`method-row ${flip ? 'flip' : ''}`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="method-media">
        <img
          src={s.img}
          alt={s.title}
          loading="lazy"
          onError={(e) => {
            if (!e.currentTarget.dataset.fb)
              (e.currentTarget.dataset.fb = 1),
                (e.currentTarget.src = fallbackFor('method' + s.num, 1000, 750))
          }}
        />
        <span className="method-num display">{s.num}</span>
      </div>
      <div className="method-copy">
        <span className="method-step">Step {s.num}</span>
        <h3 className="display">{s.title}</h3>
        <p>{s.text}</p>
      </div>
    </motion.article>
  )
}

export default function Method() {
  return (
    <section className="section method">
      <div className="method-head">
        <span className="eyebrow">The IRONPULSE method</span>
        <h2 className="display method-title">
          <SplitText text="Four steps." as="span" />{' '}
          <span className="method-gold">
            <SplitText text="One transformation." delay={0.25} as="span" />
          </span>
        </h2>
      </div>
      <div className="method-list">
        {methodSteps.map((s, i) => (
          <MethodRow key={s.num} s={s} i={i} />
        ))}
      </div>
    </section>
  )
}
