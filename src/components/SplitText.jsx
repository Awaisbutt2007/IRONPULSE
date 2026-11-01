import { motion } from 'framer-motion'

/*
 * Cinematic masked reveal: each word is a clipping window and its letters
 * rise into it. Short stagger so even long headings finish in well under a
 * second — the heading is readable by the time the visitor's eye lands on it.
 */
export default function SplitText({
  text,
  className = '',
  delay = 0,
  as = 'h2',
  stagger = 0.022,
  once = true,
}) {
  const Tag = motion[as] || motion.div
  const words = text.split(' ')
  let i = 0

  return (
    <Tag
      className={className}
      style={{ display: 'inline' }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      aria-label={text}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          <span
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              verticalAlign: 'top',
              padding: '0.1em 0.02em',
              margin: '-0.1em -0.02em',
            }}
          >
            {word.split('').map((ch, c) => {
              const idx = i++
              return (
                <motion.span
                  key={c}
                  variants={{
                    hidden: { y: '115%' },
                    show: {
                      y: '0%',
                      transition: {
                        duration: 0.75,
                        delay: delay + Math.min(idx * stagger, 0.6),
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  style={{ display: 'inline-block', willChange: 'transform' }}
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>
          {w < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
