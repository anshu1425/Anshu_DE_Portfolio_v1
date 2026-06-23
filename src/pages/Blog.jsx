import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ARTICLES } from '../data.js'
import DepthBlurCarousel from '../components/DepthBlurCarousel.jsx'

const BLOG_COLORS = ['#e3e3ff', '#e3f2ff', '#ffe3fb', '#dbf5f0', '#e9fac0', '#fbebea']

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

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog · Anshu Agarwal</title>
        <meta name="description" content="Thoughts, patterns and case-studies in GCP Data Engineering by Anshu Agarwal." />
      </Helmet>

      <div className="page-header">
        <div className="container">
          <Reveal>
            <span className="section-label">Journal</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Thoughts & Writing
            </h1>
            <p className="section-desc" style={{ marginTop: 12 }}>
              Writing about data orchestration, schemas, BigQuery optimization, and lessons from enterprise data platforms.
            </p>
          </Reveal>
        </div>
      </div>

      <section style={{ padding: '40px 0 100px', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: 600 }}>
          <DepthBlurCarousel
            items={ARTICLES.map((article, i) => (
              <div
                key={article.slug}
                style={{
                  display: 'flex', flexDirection: 'column',
                  height: '100%', width: '100%',
                  background: 'white',
                  padding: '40px',
                }}
              >
                <div style={{ height: 6, width: '40%', background: BLOG_COLORS[i % BLOG_COLORS.length], borderRadius: 3, marginBottom: 24 }} />
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: 16 }}>
                  {article.date}
                </span>
                <h3 style={{ fontSize: 26, fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: 16 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 16, color: 'var(--color-text-2)', lineHeight: 1.65, flex: 1 }}>
                  {article.excerpt}
                </p>
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--color-border)' }}>
                  <Link to={`/blog/${article.slug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Read Article <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
            itemWidth={420}
            itemHeight={520}
            sideItemWidth={340}
            sideItemHeight={440}
            gap={60}
          />
        </div>
      </section>
    </>
  )
}
