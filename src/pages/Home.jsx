import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Wind, Database, Layers, Terminal, Cloud, Snowflake } from 'lucide-react'
import { WORK, TIMELINE, TOOLS } from '../data.js'
import DepthBlurCarousel from '../components/DepthBlurCarousel.jsx'
import ProductFocusCarousel from '../components/ProductFocusCarousel.jsx'
import RevealGalleryStack from '../components/RevealGalleryStack.jsx'
import StackedCardCarousel from '../components/StackedCardCarousel.jsx'
import TextRevealScroll from '../components/TextRevealScroll.jsx'
import EyeFollowButton from '../components/EyeFollowButton.jsx'
import ElevatedCarousel from '../components/ElevatedCarousel.jsx'
/* ─── EASE CURVES (matches Meeko's framer easing) ─────── */
const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_IN_OUT = [0.45, 0, 0.55, 1]

/* ─── STAGGER REVEAL WRAPPER ───────────────────────────── */
function Reveal({ children, delay = 0, className = '', distance = 32 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

/* ─── FADE IN (no Y movement, for badges/labels) ───────── */
function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

/* ─── ANIMATED COUNTER ─────────────────────────────────── */
function Counter({ to, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px 0px' })

  useEffect(() => {
    if (!inView) return
    const dur = 1800
    const t0 = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1)
      // Ease-out cubic
      const e = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(to * e))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── SKILL BAR ────────────────────────────────────────── */
function SkillBar({ name, pct, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  return (
    <div className="skill-bar-item" ref={ref}>
      <motion.div
        className="skill-bar-top"
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay, ease: EASE_OUT }}
      >
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct">{pct}%</span>
      </motion.div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : {}}
          transition={{ duration: 1.3, delay: delay + 0.15, ease: EASE_OUT }}
        />
      </div>
    </div>
  )
}

/* ─── PROJECT COLORS ───────────────────────────────────── */
const PROJECT_COLORS = [
  '#e3e3ff', '#e3f2ff', '#ffe3fb', '#dbf5f0',
  '#e9fac0', '#fbebea', '#d1e8fd', '#ffe7a9',
]

/* ════════════════════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════════════════════ */
function HeroSection() {
  // Parallax on hero photo as user scrolls
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } }
  }
  const photoVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.97 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.85, ease: EASE_OUT, delay: 0.15 } }
  }

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-inner">
        {/* Left: Text — stagger children */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="hero-badge-dot" />
            Available for opportunities
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-title">
            Hi, I'm <span>Anshu</span><br />
            <motion.span
              style={{ color: '#555555', fontWeight: 600, display: 'block' }}
              variants={itemVariants}
            >
              GCP Data Engineer
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            <TextRevealScroll text="I build high-scale data pipelines, enforce schema safety, and deliver fail-fast reliability on GCP and hybrid cloud platforms. Based in Pune, India." revealMode="words" startOffset={100} endOffset={70} />
          </motion.p>

          <motion.div variants={itemVariants} className="hero-ctas">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/work" className="btn btn-primary">
                <TextRevealScroll text="View Projects" /> <ArrowRight size={15} />
              </Link>
            </motion.div>
            <EyeFollowButton text="Get in Touch" buttonColor="transparent" textColor="var(--color-text)" style={{ border: '1px solid var(--color-border)', padding: '10px 16px 10px 24px' }} />
          </motion.div>
        </motion.div>

        {/* Right: Photo — slides in from right + scroll parallax */}
        <motion.div
          className="hero-photo-wrap"
          variants={photoVariants}
          initial="hidden"
          animate="show"
        >
          {/* Floating tags — staggered pop-in */}
          {[
            { cls: 'hero-tag-1', txt: '☁️ Google Cloud', delay: 0.6 },
            { cls: 'hero-tag-2', txt: '🔧 Apache Airflow', delay: 0.75 },
            { cls: 'hero-tag-3', txt: '📊 BigQuery', delay: 0.65 },
            { cls: 'hero-tag-4', txt: '🤖 dbt', delay: 0.8 },
          ].map(({ cls, txt, delay }) => (
            <motion.div
              key={cls}
              className={`hero-tag ${cls}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay, ease: EASE_OUT }}
            >
              {txt}
            </motion.div>
          ))}

          {/* Photo with scroll-driven parallax */}
          <motion.div
            className="hero-photo-card"
            style={{ y: photoY, scale: photoScale }}
          >
            <img src="/anshu_photo.png" alt="Anshu Agarwal" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Quick-Nav Cards ─────────────────────────────── */}
      <div style={{
        maxWidth: 'var(--container-max)',
        width: '100%',
        margin: '0 auto',
        padding: '0 40px',
        marginTop: 60,
        marginBottom: 60,
        height: 380,
      }}>
        <RevealGalleryStack
          layout="row"
          spreadAmount={340}
          rotationAmount={3}
          cardWidth={320}
          heightMode={null}
          clickToFocus={false}
          items={[
            {
              icon: '📁',
              title: 'My Projects',
              desc: 'Explore enterprise data pipelines and my engineering approach.',
              to: '/work',
              color: '#e3e3ff',
              btnColor: '#6060e0',
            },
            {
              icon: '🗂️',
              title: 'Experience',
              desc: 'A closer look at my background, skills, and career journey.',
              to: '/experience',
              color: '#e9fac0',
              btnColor: '#7ab020',
            },
            {
              icon: '✉️',
              title: 'Contact Me',
              desc: 'Let\'s work together to solve your data engineering challenges.',
              to: '/contact',
              color: '#dbf5f0',
              btnColor: '#1a9a7c',
            },
          ].map(({ icon, title, desc, to, color, btnColor }) => (
            <div
              key={to}
              style={{
                background: 'white',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 16,
                height: '100%',
              }}
            >
              <div style={{
                width: 64, height: 64,
                borderRadius: 16,
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}>
                {icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
                {title}
              </div>
              <div style={{ fontSize: 14, color: 'var(--color-text-2)', lineHeight: 1.6, flex: 1 }}>
                {desc}
              </div>
              <Link
                to={to}
                style={{
                  width: 48, height: 48,
                  borderRadius: '50%',
                  background: color,
                  border: `2px solid ${btnColor}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: btnColor,
                  fontWeight: 700,
                  fontSize: 20,
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = btnColor; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = btnColor }}
              >
                →
              </Link>
            </div>
          ))}
        />
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   COUNTERS — fade up + count animation
════════════════════════════════════════════════════════ */
function ImpactsSection() {
  const impacts = [
    { value: '3+', label: 'Years Experience', desc: 'Over a half decade building impactful data products.' },
    { value: '5+', label: 'Projects Done', desc: 'From concept to launch with tangible enterprise impact.' },
    { value: '99%', label: 'Client Satisfaction', desc: 'Consistent quality that builds lasting business trust.' },
  ]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section className="impacts-section" style={{ position: 'relative', marginTop: 100, paddingBottom: 100 }} ref={ref}>
      {/* Background overlap */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: '#f5f5ff', zIndex: -1 }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          style={{
            background: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: 24,
            padding: '64px 40px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.04)'
          }}
          className="impacts-grid"
        >
          {impacts.map((imp, i) => (
            <div key={i} style={{ textAlign: 'center', position: 'relative', padding: '0 20px' }}>
              {/* Divider lines between items */}
              {i > 0 && <div style={{ position: 'absolute', left: -20, top: '10%', bottom: '10%', width: 1, background: 'var(--color-border)' }} />}

              <div style={{
                fontSize: 72,
                fontWeight: 700,
                color: '#f5f5ff',
                WebkitTextStroke: '2px var(--color-text-2)',
                textShadow: '4px 4px 0 #e3e3ff',
                marginBottom: 16,
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}>
                {imp.value}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
                {imp.label}
              </div>
              <div style={{ fontSize: 14, color: 'var(--color-text-3)', lineHeight: 1.6, margin: '0 auto', maxWidth: 220 }}>
                {imp.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   SERVICES — cards scale up + fade in on scroll (Meeko "appear effect")
════════════════════════════════════════════════════════ */
function ServicesSection() {
  const services = [
    {
      num: '01', emoji: '🔁', bg: '#e3e3ff',
      title: 'Data Pipelines & Orchestration',
      items: ['Airflow and Cloud Composer DAGs', 'dbt models and transformations', 'Dynamic schema-aware ingestion', 'Automated refresh and scheduling'],
    },
    {
      num: '02', emoji: '🛡️', bg: '#dbf5f0',
      title: 'Reliability & Data Quality',
      items: ['Production monitoring and alerting', 'Fail-fast dbt tests and data contracts', 'Deduplication and schema-drift defense', 'Observability cutting recovery time'],
    },
    {
      num: '03', emoji: '☁️', bg: '#e3f2ff',
      title: 'Cloud & Migration',
      items: ['GCP and AWS data platforms', 'Multi-terabyte zero-loss migrations', 'Cost-aware partition-smart design', 'CI/CD with high uptime'],
    },
    {
      num: '04', emoji: '📊', bg: '#ffe7a9',
      title: 'Analytics Enablement',
      items: ['BigQuery modeling and warehousing', 'Power BI reporting layers', 'GenAI-assisted engineering with Claude', 'Faster onboarding and documentation'],
    },
  ]

  return (
    <section className="services-section">
      <div className="container services-layout">
        <div className="services-left">
          <Reveal>
            <span className="section-label">What I Do</span>
            <h2 className="section-title">Services & Expertise</h2>
            <p className="section-desc">
              End-to-end data engineering across GCP and hybrid cloud — from ingestion to analytics-ready models.
            </p>
          </Reveal>
        </div>

        <div className="services-right" style={{ height: '560px' }}>
          <StackedCardCarousel cardBorderRadius={24} cardPadding={0} contentPadding={0}>
            {services.map((service) => (
              <div key={service.num} style={{ display: 'flex', width: '100%', height: '100%' }}>
                <div style={{ flex: '0 0 35%', background: service.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
                  {service.emoji}
                </div>
                <div style={{ flex: '1', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fff' }}>
                  <div style={{ color: 'var(--color-text-2)', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>SERVICE {service.num}</div>
                  <h3 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: 700, letterSpacing: '-0.02em' }}>{service.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {service.items.map(bullet => (
                      <li key={bullet} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: 'var(--color-text-2)' }}>
                        <div style={{ width: '6px', height: '6px', background: 'var(--color-text)', borderRadius: '50%', flexShrink: 0 }} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </StackedCardCarousel>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   FEATURED PROJECTS — Depth Blur Carousel
════════════════════════════════════════════════════════ */
function FeaturedProjects() {
  const items = WORK.map((w, i) => (
    <div key={w.slug} style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
      <ProjectCard work={w} index={i} inCarousel={true} />
    </div>
  ))

  return (
    <section className="projects-section" style={{ background: 'var(--color-text)', padding: '100px 0', overflow: 'hidden' }}>
      <div className="container" style={{ paddingBottom: 0 }}>
        <div className="section-header" style={{ marginBottom: 56, justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Reveal>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)', margin: '0 auto 16px' }}>My Works</span>
            <h2 className="section-title" style={{ color: 'white', fontSize: 'clamp(32px, 4vw, 48px)', maxWidth: 640, margin: '0 auto', lineHeight: 1.2 }}>
              Transforming complex pipelines into timeless infrastructure.
            </h2>
          </Reveal>
        </div>
      </div>

      <div style={{ width: '100%', height: 500, position: 'relative' }}>
        <ProductFocusCarousel
          items={items}
          itemWidth={640}
          itemHeight={440}
          gap={32}
        />
      </div>
    </section>
  )
}

function ProjectCard({ work: w, index, inCarousel = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  const content = (
    <Link to={`/work/${w.slug}`} className="project-card" style={{ height: '100%' }}>
      <div
        className="project-card-image"
        style={{ background: PROJECT_COLORS[index % PROJECT_COLORS.length] }}
      >
        <motion.span
          style={{ fontSize: 56, display: 'inline-block' }}
          whileHover={{ scale: 1.2, rotate: 8 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          {['🔁', '🚀', '🛡️', '🤖', '☁️', '📊'][index % 6]}
        </motion.span>
      </div>
      <div className="project-card-body" style={{ background: 'white' }}>
        <span className="project-card-cat">{w.cat}</span>
        <h3 className="project-card-title">{w.title}</h3>
        <p className="project-card-desc">{w.desc}</p>
        <div className="project-card-badges">
          {w.badges.map((b) => (
            <span key={b} className="badge badge-default">{b}</span>
          ))}
        </div>
        <div className="project-card-arrow">
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-3)' }}>View Case Study</span>
          <ArrowUpRight size={16} style={{ color: 'var(--color-text-3)' }} />
        </div>
      </div>
    </Link>
  )

  if (inCarousel) {
    return (
      <div style={{ height: '100%', background: 'white', borderRadius: 16 }}>
        {content}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE_OUT }}
      style={{ height: '100%' }}
    >
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.09)', transition: { duration: 0.25, ease: EASE_OUT } }}
        style={{ height: '100%' }}
      >
        {content}
      </motion.div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════
   SKILLS — 2-col colored bar grid + capability chips
════════════════════════════════════════════════════════ */

// Pairs of skills side-by-side (left col, right col)
const SKILLS_LIST = [
  { title: 'Apache Airflow', pct: 92, color: '#3b82f6', Icon: Wind, subheadline: 'Orchestration' },
  { title: 'BigQuery & SQL', pct: 95, color: '#10b981', Icon: Database, subheadline: 'Data Warehousing' },
  { title: 'dbt', pct: 88, color: '#f59e0b', Icon: Layers, subheadline: 'Transformations' },
  { title: 'Python & PySpark', pct: 85, color: '#8b5cf6', Icon: Terminal, subheadline: 'Data Processing' },
  { title: 'Google Cloud', pct: 90, color: '#ef4444', Icon: Cloud, subheadline: 'Cloud Platform' },
  { title: 'Snowflake & AWS', pct: 78, color: '#f97316', Icon: Snowflake, subheadline: 'Cloud Platform' },
]

const CAPABILITIES = [
  '✦ Data Pipelines', '✦ Cloud Migration', '✦ dbt & BigQuery',
  '✦ Airflow Orchestration', '△ Data Quality', '✦ Reliability Engineering',
  '✧ GenAI Integration',
]

function CircularProgressIcon({ Icon, pct, color }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="80" height="80" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="6" />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        />
      </svg>
      <div style={{ zIndex: 1, color: 'var(--color-text)' }}>
        <Icon size={28} strokeWidth={2} />
      </div>
    </div>
  )
}

function SkillsSection() {
  const capsRef = useRef(null)
  const capsInView = useInView(capsRef, { once: true, margin: '-60px 0px' })

  return (
    <section className="skills-section" style={{ overflow: 'hidden' }}>
      <div className="container">
        <Reveal>
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">Skills & Tools</h2>
        </Reveal>

        {/* Elevated Carousel Skills */}
        <div style={{ width: '100%', height: 440, marginTop: 40, position: 'relative' }}>
          <ElevatedCarousel
            items={SKILLS_LIST.map((s) => ({
              title: s.title,
              subheadline: `${s.pct}% • ${s.subheadline}`,
              icon: <CircularProgressIcon Icon={s.Icon} pct={s.pct} color={s.color} />,
              bg: '#ffffff'
            }))}
            cardWidth={280}
            cardHeight={300}
            cardGap={24}
            elevationOffset={30}
            cardRadius={24}
          />
        </div>

        {/* Capabilities row — scrolling marquee */}
        <div style={{ marginTop: 48, padding: '20px 0' }}>
          <Reveal delay={0.1}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: 24 }}>
              My Capabilities
            </div>
          </Reveal>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              style={{ display: 'inline-flex', gap: 16 }}
            >
              {[...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES].map((cap, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '12px 24px',
                    borderRadius: 999,
                    border: '1px solid var(--color-border)',
                    background: 'white',
                    fontSize: 14, fontWeight: 500,
                    color: 'var(--color-text)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                >
                  {cap}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   EXPERIENCE TIMELINE — items slide in from left sequentially
════════════════════════════════════════════════════════ */
function ExperienceSection() {
  return (
    <section className="timeline-section">
      <div className="container">
        <div className="section-header">
          <Reveal>
            <span className="section-label">Career</span>
            <h2 className="section-title">Experience</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/experience" className="btn btn-outline" style={{ fontSize: '13px', padding: '10px 20px' }}>
                Full Timeline <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </Reveal>
        </div>

        <div className="timeline" style={{ marginTop: 48 }}>
          {TIMELINE.map((t, i) => (
            <TimelineItem key={i} item={t} index={i} />
          ))}
        </div>

        {/* Check my CV Button */}
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48, position: 'relative', zIndex: 10 }}>
            <a
              href="/Anshu_Resume_final_2026.pdf"
              target="_blank"
              style={{
                background: 'white',
                color: 'var(--color-text)',
                fontWeight: 600,
                fontSize: 15,
                padding: '14px 32px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'; }}
            >
              Check my CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TimelineItem({ item: t, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE_OUT }}
    >
      <div className="timeline-card">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
        >
          <div className="timeline-date">{t.dates}</div>
          <div className="timeline-title">{t.title}</div>
          <div className="timeline-org">{t.org}</div>
          <ul className="timeline-bullets">
            {t.bullets.map((b, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.12 + j * 0.07 + 0.3, ease: EASE_OUT }}
              >
                {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════
   GET IN TOUCH CTA — large fade-up with scale
════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section className="cta-section" ref={ref}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <motion.div
            className="cta-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Let's collaborate
          </motion.div>

          <motion.h2
            className="cta-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            <TextRevealScroll text="Let's Work Together" revealMode="words" startOffset={95} endOffset={50} />
          </motion.h2>

          <motion.p
            className="cta-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE_OUT }}
          >
            Have a pipeline problem or scale challenge? Let's talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE_OUT }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-block' }}
          >
            <EyeFollowButton text="Get in Touch" buttonColor="white" textColor="#1d1d1d" eyeColor="#f5f5f5" style={{ padding: '14px 14px 14px 32px' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   HOME PAGE EXPORT
════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Anshu Agarwal · GCP Data Engineer</title>
        <meta name="description" content="GCP Data Engineer specialising in high-scale pipelines, BigQuery, Airflow, dbt and cloud migrations. Based in Pune, India." />
      </Helmet>

      <HeroSection />
      <ServicesSection />
      <FeaturedProjects />
      <SkillsSection />
      <ExperienceSection />
      <ImpactsSection />
      <CTASection />
    </>
  )
}
