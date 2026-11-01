// Fires once the intro loader has lifted, so above-the-fold animations
// play in front of the visitor instead of behind the loader.
let ready = false
const subs = new Set()

export function markReady() {
  if (ready) return
  ready = true
  subs.forEach((fn) => fn())
  subs.clear()
}

export function whenReady(fn) {
  if (ready) fn()
  else subs.add(fn)
  return () => subs.delete(fn)
}
