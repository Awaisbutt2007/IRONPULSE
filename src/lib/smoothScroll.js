import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * One Lenis instance for the whole app, driven by GSAP's ticker so
 * ScrollTrigger (hero video scrub, counters) and the inertia scroll
 * always read the exact same scroll position — no double-smoothing jitter.
 */
let lenis = null

export function initSmoothScroll() {
  if (lenis) return lenis
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  lenis = new Lenis({
    lerp: reduce ? 1 : 0.085,
    wheelMultiplier: 0.9,
    smoothWheel: !reduce,
    syncTouch: false, // native momentum on phones feels better than emulated
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 1.6 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

export function lockScroll(locked) {
  if (!lenis) return
  locked ? lenis.stop() : lenis.start()
}
