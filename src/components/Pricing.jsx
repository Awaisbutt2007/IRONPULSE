import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { plans } from '../data'

export default function Pricing() {
  return (
    <section id="pricing" className="section pricing">
      <div className="pricing-head">
        <span className="eyebrow">Choose your battle</span>
        <h2 className="display">
          <SplitText text="Membership plans" as="span" />
        </h2>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={`plan ${plan.featured ? 'plan--featured' : ''}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {plan.featured && <span className="plan-badge">Most Popular</span>}
            <h3 className="plan-name display">{plan.name}</h3>
            <div className="plan-price">
              <span className="currency">$</span>
              {plan.price}
              <small>{plan.period}</small>
            </div>
            <ul className="plan-features">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#top" className={`btn ${plan.featured ? '' : 'btn-ghost'}`}>
              <span>Select {plan.name}</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
