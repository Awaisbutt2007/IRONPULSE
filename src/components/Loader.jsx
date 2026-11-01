import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { preloadFrames, onKeyProgress } from '../lib/heroFrames'
import { markReady } from '../lib/appReady'
import { lockScroll } from '../lib/smoothScroll'

const MIN_MS = 1100 // never flash
const MAX_MS = 6000 // never trap a visitor on a slow connection

/*
 * Real loader: on the home page it waits for the hero footage's key frames
 * (first frame + a coarse pass across the whole scroll range), so the video
 * scrubs smoothly the moment the curtain lifts. Other pages just get a short
 * branded intro.
 */
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [show, setShow] = useState(true)
  const done = useRef(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const isHome = window.location.pathname === '/'
    const start = performance.now()
    let real = isHome ? 0 : 1
    let raf
    let off = () => {}
    if (isHome) {
      preloadFrames()
      off = onKeyProgress((p) => (real = p))
    }

    const tick = (now) => {
      const elapsed = now - start
      const time = Math.min(1, elapsed / MIN_MS)
      const p = elapsed > MAX_MS ? 1 : Math.min(time, real)
      setPct(Math.floor(p * 100))
      if (p >= 1 && !done.current) {
        done.current = true
        setTimeout(() => {
          setShow(false)
          lockScroll(false)
          markReady() // hero intro plays while the curtain lifts
        }, 200)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      off()
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => onDoneRef.current()}>
      {show && (
        <motion.div
          className="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-inner">
            <div className="loader-mark">
              IRON<span>PULSE</span>
            </div>
            <div className="loader-bar">
              <div className="loader-bar-fill" style={{ transform: `scaleX(${pct / 100})` }} />
            </div>
            <div className="loader-pct">{String(pct).padStart(3, '0')}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
