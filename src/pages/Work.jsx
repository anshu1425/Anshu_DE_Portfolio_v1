import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { WORK } from '../data.js'

const PROJECT_COLORS = [
  '#e3e3ff', '#e3f2ff', '#ffe3fb', '#dbf5f0',
  '#e9fac0', '#fbebea', '#d1e8fd', '#ffe7a9',
]

const EMOJIS = ['🔁', '🚀', '🛡️', '🤖', '☁️', '📊']

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Work() {
  return (
    <>
      <Helmet>
        <title>Projects · Anshu Agarwal</title>
        <meta name="description" content="Data engineering case studies — pipelines, cloud migrations, and platform reliability engineering by Anshu Agarwal." />
      </Helmet>

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Reveal>
            <span className="section-label">Portfolio</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              All Projects
            </h1>
            <p className="section-desc" style={{ marginTop: 12 }}>
              Enterprise data engineering case studies — pipelines, migrations, and platform reliability built at scale.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Projects Grid */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <div className="projects-grid">
            {WORK.map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.06}>
                <Link to={`/work/${w.slug}`} className="project-card">
                  {/* Color banner */}
                  <div
                    className="project-card-image"
                    style={{ background: PROJECT_COLORS[i % PROJECT_COLORS.length] }}
                  >
                    <span style={{ fontSize: 56 }}>{EMOJIS[i % EMOJIS.length]}</span>
                  </div>

                  <div className="project-card-body">
                    <span className="project-card-cat">{w.cat}</span>
                    <h3 className="project-card-title">{w.title}</h3>
                    <p className="project-card-desc">{w.desc}</p>

                    <div className="project-card-badges">
                      {w.badges.map((b) => (
                        <span key={b} className="badge badge-default">{b}</span>
                      ))}
                    </div>

                    <div className="project-card-arrow">
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-3)' }}>
                        View Case Study
                      </span>
                      <ArrowUpRight size={16} style={{ color: 'var(--color-text-3)' }} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
