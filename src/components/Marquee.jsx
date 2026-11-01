import { marqueeWords } from '../data'

// Two duplicated tracks animate seamlessly for an infinite ticker.
export default function Marquee() {
  const track = [...marqueeWords, ...marqueeWords]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((g) => (
          <div className="marquee-group" key={g}>
            {track.map((w, i) => (
              <span className="marquee-item" key={`${g}-${i}`}>
                {w}
                <em>✦</em>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
