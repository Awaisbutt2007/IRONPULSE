import { useRef } from 'react'
import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { programs, fallbackFor } from '../data'

function TiltCard({ p, index }) {
  const ref = useRef()

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${
      -y * 12
    }deg) translateY(-6px)`
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }

  const reset = (el) => {
    if (el) el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'
  }

  return (
    <motion.article
      className="program"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="program-inner"
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={(e) => reset(e.currentTarget)}
      >
        <div className="program-media">
          <img
            src={p.img}
            alt={p.title}
            loading="lazy"
            onError={(e) => {
              if (!e.currentTarget.dataset.fb)
                (e.currentTarget.dataset.fb = 1),
                  (e.currentTarget.src = fallbackFor(p.title, 900, 700))
            }}
          />
          <span className="program-tag display">{p.tag}</span>
          <div className="program-glare" />
        </div>
        <div className="program-body">
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <span className="program-more">Train now →</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Programs({ limit, showHeading = true }) {
  const list = limit ? programs.slice(0, limit) : programs
  return (
    <section id="programs" className="section programs">
      {showHeading && (
        <div className="programs-head">
          <span className="eyebrow">What we train</span>
          <h2 className="display programs-title">
            <SplitText text="Programs built for" as="span" />
            <br />
            <SplitText text="relentless results" delay={0.1} as="span" />
          </h2>
        </div>
      )}

      <div className="programs-grid">
        {list.map((p, i) => (
          <TiltCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}
