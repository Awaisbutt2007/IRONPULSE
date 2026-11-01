import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        const numEl = el.querySelector('.stat-num')
        const target = +numEl.dataset.target
        const obj = { v: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                numEl.textContent = Math.floor(obj.v).toLocaleString()
              },
            }),
        })
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="stats">
      {stats.map((s, i) => (
        <div
          className="stat"
          key={s.label}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <div className="stat-num display" data-target={s.value}>
            0
          </div>
          <div className="stat-suffix">{s.suffix}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </section>
  )
}
