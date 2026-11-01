import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { contactInfo, U } from '../data'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Talk to a human"
        title="Contact Us"
        image={U('1571902943202-507ec2618e8f', 1600, 900)}
      />

      <section className="section contact">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Find the floor</span>
            <h2 className="display contact-h">Walk in. We'll hand you chalk.</h2>
            <ul className="contact-list">
              <li>
                <span>Address</span>
                <p>{contactInfo.address}</p>
              </li>
              <li>
                <span>Phone</span>
                <p>{contactInfo.phone}</p>
              </li>
              <li>
                <span>Email</span>
                <p>{contactInfo.email}</p>
              </li>
              <li>
                <span>Hours</span>
                <p>{contactInfo.hours}</p>
              </li>
            </ul>
          </div>

          <motion.form
            className="contact-form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <div className="form-success">
                <h3 className="display">Message sent</h3>
                <p>
                  A coach will reach out within 24 hours. Come ready to move —
                  your first session is on us.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setSent(false)}
                >
                  <span>Send another</span>
                </button>
              </div>
            ) : (
              <>
                <label>
                  Name
                  <input type="text" placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input type="email" placeholder="you@email.com" required />
                </label>
                <label>
                  Goal
                  <select defaultValue="strength">
                    <option value="strength">Build strength</option>
                    <option value="fatloss">Lose fat / get lean</option>
                    <option value="combat">Boxing / combat</option>
                    <option value="sport">Sport performance</option>
                  </select>
                </label>
                <label>
                  Message
                  <textarea rows="4" placeholder="Tell us where you're at and what you want." />
                </label>
                <button type="submit" className="btn">
                  <span>Send Message</span>
                </button>
              </>
            )}
          </motion.form>
        </div>
      </section>
    </>
  )
}
