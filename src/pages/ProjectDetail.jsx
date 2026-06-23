import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ExternalLink, Calendar, Target } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { WORK } from '../data.js'
import EyeFollowButton from '../components/EyeFollowButton.jsx'
import NotFound from './NotFound.jsx'

const PROJECT_COLORS = [
  '#e3e3ff', '#e3f2ff', '#ffe3fb', '#dbf5f0',
  '#e9fac0', '#fbebea', '#d1e8fd', '#ffe7a9',
]
const EMOJIS = ['🔁', '🚀', '🛡️', '🤖', '☁️', '📊']

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

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = WORK.findIndex((w) => w.slug === slug)
  const w = WORK[idx]

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!w) return <NotFound />

  const prev = WORK[(idx - 1 + WORK.length) % WORK.length]
  const next = WORK[(idx + 1) % WORK.length]
  const color = PROJECT_COLORS[idx % PROJECT_COLORS.length]
  const emoji = EMOJIS[idx % EMOJIS.length]

  return (
    <>
      <Helmet>
        <title>{w.title} · Anshu Agarwal</title>
        <meta name="description" content={w.desc} />
      </Helmet>

      {/* Hero banner */}
      <div style={{
        background: color,
        padding: '80px 0 60px',
        marginTop: 0,
      }}>
        <div className="container">
          <Link
            to="/work"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, color: 'var(--color-text-2)',
              marginBottom: 32, textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} /> All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label" style={{ marginBottom: 12 }}>{w.cat}</span>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--color-text)',
              maxWidth: 720,
              marginBottom: 16,
            }}>
              {w.title}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--color-text-2)', marginBottom: 24, maxWidth: 600 }}>
              {w.ctx}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {w.badges.map((b) => (
                <span key={b} style={{
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 999,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--color-text)',
                }}>
                  {b}
                </span>
              ))}
            </div>

            {(w.repo || w.live) && (
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                {w.repo && (
                  <a href={w.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ background: 'white', fontSize: 13, padding: '10px 20px' }}>
                    <Github size={14} /> Source Code
                  </a>
                )}
                {w.live && (
                  <a href={w.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '64px 40px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>

          {/* Main */}
          <div>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* Connecting line */}
              <div style={{
                position: 'absolute', left: 24, top: 24, bottom: 24,
                width: 2, background: 'var(--color-border)', zIndex: 0
              }} />

              {[
                { label: 'The Problem', text: w.problem, icon: '🎯' },
                { label: 'My Solution', text: w.solution, icon: '💡' },
                { label: 'The Outcome', text: w.outcome, icon: '✨' },
              ].map((section, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div style={{ display: 'flex', gap: 24, position: 'relative', zIndex: 1 }}>
                    {/* Icon Node */}
                    <div style={{
                      width: 50, height: 50, borderRadius: '50%',
                      background: color, border: '4px solid white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                      {section.icon}
                    </div>

                    {/* Content Card */}
                    <div style={{
                      background: 'white',
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: 16,
                      padding: '28px 32px',
                      flex: 1,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'var(--color-text-3)',
                        marginBottom: 12,
                      }}>
                        {section.label}
                      </div>
                      <p style={{
                        fontSize: section.label === 'The Outcome' ? 16 : 15,
                        lineHeight: 1.7,
                        color: 'var(--color-text)',
                        fontWeight: section.label === 'The Outcome' ? 600 : 400,
                      }}>
                        {section.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal>
              <div style={{
                background: 'var(--color-bg-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                padding: 32,
              }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                  Want similar results?
                </h3>
                <p style={{ color: 'var(--color-text-2)', marginBottom: 20, fontSize: 15 }}>
                  Let's talk about your data engineering challenges.
                </p>
                <EyeFollowButton text="Get in Touch" buttonColor="var(--color-primary)" textColor="var(--color-bg)" eyeColor="#fff" />
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <Reveal delay={0.15}>
            <div style={{ position: 'sticky', top: 96 }}>
              {/* Impact card */}
              <div style={{
                background: color,
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 16,
                padding: 28,
                marginBottom: 16,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>{emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                  Impact Summary
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {w.badges.map((b) => (
                    <div key={b} style={{
                      background: 'white',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--color-text)',
                    }}>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Client */}
              <div style={{
                background: 'var(--color-bg-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                padding: 24,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: 8 }}>
                  Client
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>{w.client}</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Prev / Next Navigation */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
          marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--color-border)',
        }}>
          <Link to={`/work/${prev.slug}`} style={{
            background: 'var(--color-bg-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 16, padding: '20px 24px',
            display: 'flex', flexDirection: 'column', gap: 6,
            textDecoration: 'none', transition: 'all 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ArrowLeft size={11} /> Previous
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.4 }}>{prev.title}</span>
          </Link>

          <Link to={`/work/${next.slug}`} style={{
            background: 'var(--color-bg-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 16, padding: '20px 24px',
            display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end',
            textDecoration: 'none', transition: 'all 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
              Next <ArrowRight size={11} />
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.4, textAlign: 'right' }}>{next.title}</span>
          </Link>
        </div>
      </div>
    </>
  )
}
