import PageHeader from '../components/PageHeader'
import Pricing from '../components/Pricing'
import Marquee from '../components/Marquee'
import CTA from '../components/CTA'
import { U } from '../data'

const faqs = [
  {
    q: 'Can I freeze my membership?',
    a: 'Yes — freeze up to 3 months per year at no cost from the member app.',
  },
  {
    q: 'Is there a joining fee?',
    a: 'No enrollment fee during open enrollment. Your first week is always free.',
  },
  {
    q: 'Do you offer student rates?',
    a: 'Students get 20% off the Membership plan with a valid ID at the front desk.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Month-to-month plans cancel anytime with 30 days notice. No penalties.',
  },
]

export default function Membership() {
  return (
    <>
      <PageHeader
        eyebrow="Choose your battle"
        title="Membership"
        image={U('1558611848-73f7eb4001a1', 1600, 900)}
      />
      <Pricing />
      <Marquee />
      <section className="section faq">
        <div className="faq-head">
          <span className="eyebrow">Good to know</span>
          <h2 className="display">Questions, answered</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
