import { motion } from 'framer-motion'
import SplitText from './SplitText'

// Cinematic header for inner pages, with a real photo backdrop.
export default function PageHeader({ eyebrow, title, image }) {
  return (
    <header className="page-header">
      <div className="page-header-media">
        {image && (
          <motion.img
            src={image}
            alt=""
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
        <div className="page-header-scrim" />
      </div>
      <div className="page-header-content">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          {eyebrow}
        </motion.span>
        <h1 className="display page-header-title">
          <SplitText text={title} as="span" delay={0.35} stagger={0.05} />
        </h1>
      </div>
    </header>
  )
}
