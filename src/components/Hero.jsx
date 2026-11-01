import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { heroChapters } from '../data'
import {
  FRAME_COUNT,
  preloadFrames,
  nearestFrame,
  onFrameLoaded,
} from '../lib/heroFrames'
import { whenReady } from '../lib/appReady'
import { scrollToY } from '../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = heroChapters.length + 2 // intro + story chapters + CTA

const Chars = ({ text }) =>
  text.split('').map((c, i) => (
    <span className="hero-char" key={i}>
      {c}
    </span>
  ))

/*
 * Scroll-told hero. The section is tall; its stage is CSS-sticky (no JS pin,
 * so nothing jumps). Scroll progress drives:
 *   - the footage, drawn frame-by-frame onto a canvas (cover-fit, DPR aware)
 *   - a slow cinematic push-in on the footage
 *   - the chapter ticker, progress rail and chapter counter
 * Lenis smooths the scroll itself, so the scrub stays 1:1 with no lag.
 */
export default function Hero() {
  const section = useRef()
  const canvas = useRef()
  const [chapter, setChapter] = useState(0)

  // ---- canvas renderer + scroll story ----
  useEffect(() => {
    preloadFrames()
    const cv = canvas.current
    const ctx2d = cv.getContext('2d', { alpha: false })
    const state = { frame: 0, drawn: -1, drawnImg: null }

    const draw = () => {
      const i = Math.round(state.frame)
      const img = nearestFrame(i)
      if (!img || (i === state.drawn && img === state.drawnImg)) return
      const cw = cv.width
      const ch = cv.height
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * s
      const h = img.naturalHeight * s
      ctx2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
      state.drawn = i
      state.drawnImg = img
    }

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(cv.clientWidth * dpr)
      cv.height = Math.round(cv.clientHeight * dpr)
      ctx2d.imageSmoothingQuality = 'high'
      state.drawn = -1
      draw()
    }

    // an exact frame for where we are just finished decoding — repaint
    const offLoaded = onFrameLoaded((idx) => {
      if (Math.abs(idx - Math.round(state.frame)) <= 4) {
        state.drawn = -1
        draw()
      }
    })

    const ro = new ResizeObserver(size)
    ro.observe(cv)
    size()

    const ctx = gsap.context(() => {
      // y: 0 explicitly — otherwise a stale px offset can survive a context
      // revert/re-run (React StrictMode) and push chapters off-centre
      gsap.set('.hero-chapter', { y: 0, yPercent: 0 })
      gsap.set(['.hero-ch-2', '.hero-ch-3', '.hero-ch-4', '.hero-ch-5'], {
        autoAlpha: 0,
        yPercent: 60,
      })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // 2 timeline units per chapter; switch as the next one rises in
            const c = Math.min(CHAPTERS - 1, Math.floor(self.animation.time() / 2 + 0.06))
            setChapter((prev) => (prev === c ? prev : c))
          },
        },
      })

      // footage: first → last frame across the whole runway
      tl.to(state, { frame: FRAME_COUNT - 1, duration: 10, onUpdate: draw }, 0)
      // slow push-in for depth
      tl.fromTo('.hero-canvas', { scale: 1.14 }, { scale: 1, duration: 10 }, 0)
      // rail runs the full 11.4 units: footage ends at 10, then the final
      // CTA chapter holds, fully settled, before the hero scrolls away
      tl.fromTo('.hero-rail-fill', { scaleY: 0 }, { scaleY: 1, duration: 11.4 }, 0)
      // scrim eases off mid-story so the footage reads, closes again at the end
      tl.to('.hero-scrim', { opacity: 0.7, duration: 2.5 }, 1)
      tl.to('.hero-scrim', { opacity: 1, duration: 1.5 }, 8.5)
      tl.to('.hero-scroll', { autoAlpha: 0, duration: 0.4 }, 0.1)

      // chapter ticker: outgoing rises out + blurs, incoming rises in sharp
      const sels = ['.hero-ch-1', '.hero-ch-2', '.hero-ch-3', '.hero-ch-4', '.hero-ch-5']
      const slot = 10 / sels.length
      sels.forEach((sel, i) => {
        if (i > 0) {
          tl.fromTo(
            sel,
            { autoAlpha: 0, y: 0, yPercent: 60, filter: 'blur(6px)' },
            {
              autoAlpha: 1,
              yPercent: 0,
              filter: 'blur(0px)',
              duration: 0.6,
              ease: 'power3.out',
            },
            i * slot - 0.1
          )
        }
        if (i < sels.length - 1) {
          tl.to(
            sel,
            {
              autoAlpha: 0,
              yPercent: -45,
              filter: 'blur(6px)',
              duration: 0.55,
              ease: 'power2.in',
            },
            (i + 1) * slot - 0.6
          )
        }
      })
    }, section)

    // fonts/images can shift layout after mount — re-measure once settled
    const t = setTimeout(() => ScrollTrigger.refresh(), 700)

    return () => {
      clearTimeout(t)
      offLoaded()
      ro.disconnect()
      ctx.revert()
    }
  }, [])

  // ---- intro reveal (plays once the loader lifts) ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-ch-1 .hero-char', { yPercent: 115 })
      gsap.set(['.hero-ch-1 .eyebrow', '.hero-ch-1 .hero-lead', '.hero-meta'], {
        autoAlpha: 0,
        y: 24,
      })
    }, section)
    const off = whenReady(() => {
      ctx.add(() => {
        gsap
          .timeline({ delay: 0.1 })
          .to('.hero-ch-1 .eyebrow', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          .to(
            '.hero-ch-1 .hero-char',
            { yPercent: 0, duration: 1.1, stagger: 0.035, ease: 'expo.out' },
            0.1
          )
          .to(
            ['.hero-ch-1 .hero-lead', '.hero-meta'],
            { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
            0.6
          )
      })
    })
    return () => {
      off()
      ctx.revert()
    }
  }, [])

  return (
    <section id="top" className="hero" ref={section}>
      <div className="hero-stage">
        <div className="hero-media">
          <canvas ref={canvas} className="hero-canvas" aria-hidden="true" />
        </div>
        <div className="hero-scrim" />
        <div className="hero-vignette" />

        <div className="hero-content">
          <div className="hero-chapter hero-ch-1">
            <p className="eyebrow">Strength &amp; Conditioning Club</p>
            <h1 className="hero-title display" aria-label="Forge your body">
              <span className="hero-line">
                <Chars text="FORGE" />
              </span>
              <span className="hero-line hero-title-outline">
                <Chars text="YOUR" />
              </span>
              <span className="hero-line">
                <Chars text="BODY" />
              </span>
            </h1>
            <p className="hero-lead">
              Coached strength training on a floor built like an arena.
            </p>
          </div>

          {heroChapters.map((ch, i) => (
            <div key={ch.title} className={`hero-chapter hero-ch-${i + 2}`}>
              <span className="hero-ch-kicker">{ch.kicker}</span>
              <h2 className="hero-ch-title display">{ch.title}</h2>
              <p className="hero-ch-text">{ch.text}</p>
            </div>
          ))}

          <div className="hero-chapter hero-ch-5">
            <span className="hero-ch-kicker">Your first week is free</span>
            <h2 className="hero-ch-title display">
              Start <em>today.</em>
            </h2>
            <div className="hero-actions">
              <Link to="/membership" className="btn">
                <span>Start Training</span>
              </Link>
              <Link to="/programs" className="btn btn-ghost">
                <span>Explore Programs</span>
              </Link>
            </div>
          </div>
        </div>

        {/* progress rail + chapter counter */}
        <div className="hero-meta" aria-hidden="true">
          <span className="hero-count">
            <b>{String(chapter + 1).padStart(2, '0')}</b>
            <i>/ {String(CHAPTERS).padStart(2, '0')}</i>
          </span>
          <span className="hero-rail">
            <span className="hero-rail-fill" />
          </span>
        </div>

        <button
          type="button"
          className="hero-scroll"
          onClick={() => scrollToY(window.innerHeight * 1.6)}
        >
          <span>Scroll the story</span>
          <i />
        </button>
      </div>
    </section>
  )
}
