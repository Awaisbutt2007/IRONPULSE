/*
 * Hero footage as an image sequence (extracted from the 4K source with
 * ffmpeg → 240 × 1600px WebP, ~7 MB). Scrubbing a canvas through decoded
 * images is frame-exact and stutter-free in every browser, unlike seeking
 * an <video> element's currentTime on scroll.
 */
export const FRAME_COUNT = 240
const src = (i) => `/hero-frames/f_${String(i + 1).padStart(3, '0')}.webp`

export const frames = new Array(FRAME_COUNT).fill(null)
let started = false
let keyLoaded = 0
const keyListeners = new Set()
const frameListeners = new Set()

// load order: first frame, then a coarse pass (every 8th) so the whole
// scroll range is scrubbable early, then progressively finer passes.
function loadOrder() {
  const seen = new Set()
  const order = []
  for (const step of [FRAME_COUNT, 8, 4, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += step) {
      if (!seen.has(i)) {
        seen.add(i)
        order.push(i)
      }
    }
  }
  return order
}
const ORDER = loadOrder()
export const KEY_FRAMES = ORDER.indexOf(4) // size of the first + coarse pass

export function preloadFrames() {
  if (started) return
  started = true
  let cursor = 0
  const PARALLEL = 6
  const next = () => {
    if (cursor >= ORDER.length) return
    const idx = ORDER[cursor++]
    const isKey = cursor <= KEY_FRAMES
    const img = new Image()
    img.decoding = 'async'
    img.src = src(idx)
    const done = (ok) => {
      if (ok) {
        frames[idx] = img
        frameListeners.forEach((fn) => fn(idx))
      }
      if (isKey) {
        keyLoaded++
        keyListeners.forEach((fn) => fn(keyLoaded / KEY_FRAMES))
      }
      next()
    }
    img.onload = () =>
      img.decode ? img.decode().then(() => done(true), () => done(true)) : done(true)
    img.onerror = () => done(false)
  }
  for (let p = 0; p < PARALLEL; p++) next()
}

export const onKeyProgress = (fn) => {
  keyListeners.add(fn)
  fn(keyLoaded / KEY_FRAMES)
  return () => keyListeners.delete(fn)
}
export const onFrameLoaded = (fn) => {
  frameListeners.add(fn)
  return () => frameListeners.delete(fn)
}

// nearest already-decoded frame, so scrubbing never shows a blank canvas
export function nearestFrame(i) {
  if (frames[i]) return frames[i]
  for (let d = 1; d < FRAME_COUNT; d++) {
    if (frames[i - d]) return frames[i - d]
    if (frames[i + d]) return frames[i + d]
  }
  return null
}
