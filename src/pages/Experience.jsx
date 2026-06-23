import { Helmet } from 'react-helmet-async'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TIMELINE, CERTS, TOOLS, STACK } from '../data.js'
import { Database, Wind, Layers, Terminal, Zap, Cloud, Link as LinkIcon, Snowflake, BarChart, Box, Github, GitMerge, Code, Settings } from 'lucide-react'
import DepthBlurCarousel from '../components/DepthBlurCarousel.jsx'
import CardDeckSpread from '../components/CardDeckSpread.jsx'
import ElevatedCarousel from '../components/ElevatedCarousel.jsx'

const getToolIcon = (tool) => {
  const mapping = {
    'BigQuery': { icon: Database, color: '#3b82f6' },
    'Apache Airflow': { icon: Wind, color: '#10b981' },
    'dbt': { icon: Layers, color: '#f59e0b' },
    'Python': { icon: Terminal, color: '#fcd34d' },
    'PySpark': { icon: Zap, color: '#f97316' },
    'SQL': { icon: Database, color: '#9ca3af' },
    'Cloud Composer': { icon: Cloud, color: '#3b82f6' },
    'GCP': { icon: Cloud, color: '#ef4444' },
    'AWS Glue': { icon: LinkIcon, color: '#f59e0b' },
    'Snowflake': { icon: Snowflake, color: '#38bdf8' },
    'Spark': { icon: Zap, color: '#f97316' },
    'Power BI': { icon: BarChart, color: '#fbbf24' },
    'Databricks': { icon: Box, color: '#ef4444' },
    'GitHub Actions': { icon: Github, color: '#ffffff' }
  }
  return mapping[tool] || { icon: Box, color: '#ffffff' }
}

const getGroupIcon = (group) => {
  if (group.includes('Cloud')) return Cloud
  if (group.includes('Orchestration')) return GitMerge
  if (group.includes('Languages')) return Code
  if (group.includes('Ops')) return Settings
  return Box
}

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

const SKILL_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6']

function SkillBar({ name, pct, delay = 0, color = 'var(--color-text)' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-top">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

const CERT_ICONS = ['🏆', '🚁', '🤖', '📊', '💻', '☁️']
const CERT_COLORS = ['#e3e3ff', '#e3f2ff', '#dbf5f0', '#ffe7a9', '#ffe3fb', '#e9fac0']

const SKILLS = [
  { name: 'Apache Airflow / Cloud Composer', pct: 92 },
  { name: 'BigQuery & SQL', pct: 95 },
  { name: 'dbt (data build tool)', pct: 88 },
  { name: 'Python & PySpark', pct: 85 },
  { name: 'Google Cloud Platform (GCP)', pct: 90 },
  { name: 'Snowflake & AWS Glue', pct: 78 },
  { name: 'Power BI & Data Visualization', pct: 75 },
  { name: 'GenAI / Claude & GitHub Copilot', pct: 80 },
]

export default function Experience() {
  return (
    <>
      <Helmet>
        <title>Experience · Anshu Agarwal</title>
        <meta name="description" content="Career timeline, skills, and certifications of Anshu Agarwal — GCP Data Engineer." />
      </Helmet>

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <Reveal>
            <span className="section-label">Career</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Experience & Skills
            </h1>
            <p className="section-desc" style={{ marginTop: 12 }}>
              4+ years building enterprise data infrastructure at General Mills and Bayer A.G.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <Reveal>
            <span className="section-label">Work History</span>
            <h2 className="section-title">Career Timeline</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="timeline" style={{ marginTop: 48 }}>
              {TIMELINE.map((t, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-card">
                    <div className="timeline-date">{t.dates}</div>
                    <div className="timeline-title">{t.title}</div>
                    <div className="timeline-org">{t.org}</div>
                    <ul className="timeline-bullets">
                      {t.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section className="skills-section">
        <div className="container">
          <Reveal>
            <span className="section-label">Proficiency</span>
            <h2 className="section-title">Technical Skills</h2>
          </Reveal>

          <div className="skills-layout">
            <div>
              <div className="skill-group">
                <div className="skill-group-label">Skill Levels</div>
                {SKILLS.map((s, i) => (
                  <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i * 0.06} color={SKILL_COLORS[i % SKILL_COLORS.length]} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="skill-group" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                  Tools I Build With
                </div>
                <div style={{ fontSize: 15, color: 'var(--color-text-2)', marginBottom: 32, maxWidth: 360, marginInline: 'auto', lineHeight: 1.5 }}>
                  A curated set of technologies I rely on to build robust data pipelines and analytics platforms.
                </div>
                <div className="tools-cloud-centered">
                  {TOOLS.map((t) => {
                    const { icon: Icon, color } = getToolIcon(t)
                    return (
                      <span key={t} className="tool-chip-dark">
                        <Icon size={18} color={color} strokeWidth={2.5} />
                        {t}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="skill-group" style={{ marginTop: 80, overflow: 'hidden' }}>
            <div className="skill-group-label" style={{ textAlign: 'center', marginBottom: 40 }}>Stack by Category</div>
            <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', height: 480, position: 'relative' }}>
              <CardDeckSpread
                overlap={60}
                cardWidth={280}
                cardHeight={360}
                animationTrigger="scroll"
                hoverBorderColor="var(--color-primary)"
              >
                {STACK.map((s, i) => {
                  const GroupIcon = getGroupIcon(s.group)
                  const PASTEL_COLORS = [
                    '#e8f4fd', // Soft Blue
                    '#fdf4ff', // Soft Pink
                    '#eefcf2', // Soft Green
                    '#fff8e6', // Soft Yellow
                    '#f5f3ff', // Soft Purple
                  ]
                  const cardColor = PASTEL_COLORS[i % PASTEL_COLORS.length]

                  return (
                    <div key={s.group} style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
                      <div className="stack-card" style={{ height: '100%', margin: 0, display: 'flex', flexDirection: 'column', background: cardColor, padding: '24px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <div className="stack-card-icon" style={{ marginBottom: 16 }}>
                          <GroupIcon size={28} strokeWidth={2} />
                        </div>
                        <div className="stack-category-title" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                          {s.group}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1, alignContent: 'flex-start' }}>
                          {s.items.map((item) => (
                            <span key={item} className="stack-chip" style={{ fontSize: 13, padding: '6px 12px', background: '#fff', borderRadius: 999, border: '1px solid #e5e7eb' }}>{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardDeckSpread>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: '80px 0 100px', overflow: 'hidden' }}>
        <div className="container">
          <Reveal>
            <span className="section-label">Certifications</span>
            <h2 className="section-title">Credentials</h2>
          </Reveal>
        </div>

        <div style={{ width: '100%', height: 420, marginTop: 40, padding: '40px 0' }}>
          <ElevatedCarousel
            items={CERTS.map((c, i) => ({
              title: c.t,
              subheadline: `${c.o} • ${c.y}`,
              icon: CERT_ICONS[i % CERT_ICONS.length],
              bg: CERT_COLORS[i % CERT_COLORS.length],
              img: c.img,
            }))}
            cardWidth={340}
            cardHeight={240}
            cardGap={24}
            elevationOffset={40}
            cardRadius={24}
          />
        </div>
      </section>
    </>
  )
}
