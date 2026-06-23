import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send, Mail, MapPin, Linkedin, Github } from 'lucide-react'

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in all required fields.')
      return
    }
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <Helmet>
        <title>Contact · Anshu Agarwal</title>
        <meta name="description" content="Get in touch with Anshu Agarwal — GCP Data Engineer based in Pune, India." />
      </Helmet>

      <div className="contact-section">
        <div className="container">
          {/* Page Heading */}
          <Reveal>
            <span className="section-label">Say Hello</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 52px)', marginBottom: 12 }}>
              Get in Touch
            </h1>
            <p className="section-desc" style={{ marginBottom: 56 }}>
              Have a pipeline problem, migration challenge, or just want to connect?
              I read and respond to every message.
            </p>
          </Reveal>

          <div className="contact-layout">
            {/* Left: Info */}
            <Reveal delay={0.05}>
              <div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">📧</div>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <a href="mailto:anshuagarwal979@gmail.com" className="contact-info-value" style={{ color: 'var(--color-text)' }}>
                      anshuagarwal979@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">📍</div>
                  <div>
                    <div className="contact-info-label">Location</div>
                    <div className="contact-info-value">Pune, Maharashtra, India</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">💼</div>
                  <div>
                    <div className="contact-info-label">LinkedIn</div>
                    <a
                      href="https://linkedin.com/in/anshuagarwal14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-info-value"
                      style={{ color: 'var(--color-text)' }}
                    >
                      linkedin.com/in/anshuagarwal14
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">💻</div>
                  <div>
                    <div className="contact-info-label">GitHub</div>
                    <a
                      href="https://github.com/anshu1425"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-info-value"
                      style={{ color: 'var(--color-text)' }}
                    >
                      github.com/anshu1425
                    </a>
                  </div>
                </div>

                {/* Availability note */}
                <div style={{
                  marginTop: 32,
                  background: '#e9fac0',
                  border: '1px solid #c5e88a',
                  borderRadius: 12,
                  padding: '20px 24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6ab820', display: 'block' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#4a6c10', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Currently Available
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: '#4a6c10', lineHeight: 1.6 }}>
                    Open to data engineering roles — remote, hybrid, or on-site. Let's talk about what you're building.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right: Form */}
            <Reveal delay={0.1}>
              {status === 'success' ? (
                <div style={{
                  background: 'var(--color-bg-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 20,
                  padding: 48,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--color-text-2)' }}>
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus('')}
                    className="btn btn-outline"
                    style={{ marginTop: 24 }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="meeko-form" onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Name <span style={{ color: 'red' }}>*</span></label>
                      <input
                        id="contact-name"
                        className="form-input"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span style={{ color: 'red' }}>*</span></label>
                      <input
                        id="contact-email"
                        className="form-input"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      id="contact-subject"
                      className="form-input"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message <span style={{ color: 'red' }}>*</span></label>
                    <textarea
                      id="contact-message"
                      className="form-textarea"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the pipeline problem you're trying to solve..."
                      required
                    />
                  </div>

                  {status && status !== 'success' && (
                    <p style={{ fontSize: 13, color: '#c0392b', background: '#fff0ee', padding: '10px 14px', borderRadius: 8 }}>
                      {status}
                    </p>
                  )}

                  <button id="contact-submit" type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15 }}>
                    Send Message <Send size={15} />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
