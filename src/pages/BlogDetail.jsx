import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { ARTICLES } from '../data.js'
import NotFound from './NotFound.jsx'
import TextRevealScroll from '../components/TextRevealScroll.jsx'
import EyeFollowButton from '../components/EyeFollowButton.jsx'
import { motion } from 'framer-motion'

function renderContent(text) {
  return text.split('\n\n').map((block, idx) => {
    const trimmed = block.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('### ')) {
      return <h3 key={idx} style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text)', marginTop: 32, marginBottom: 12 }}>{trimmed.replace('### ', '')}</h3>
    }
    if (trimmed.startsWith('## ')) {
      return <h2 key={idx} style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-text)', marginTop: 40, marginBottom: 16 }}>{trimmed.replace('## ', '')}</h2>
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split('\n').map(li => li.replace(/^[-*]\s+/, ''))
      return (
        <ul key={idx} style={{ paddingLeft: 24, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, si) => <li key={si} style={{ fontSize: 16, color: 'var(--color-text-2)', lineHeight: 1.65 }}>{item}</li>)}
        </ul>
      )
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split('\n').map(li => li.replace(/^\d+\.\s+/, ''))
      return (
        <ol key={idx} style={{ paddingLeft: 24, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, si) => <li key={si} style={{ fontSize: 16, color: 'var(--color-text-2)', lineHeight: 1.65 }}>{item}</li>)}
        </ol>
      )
    }
    const parts = trimmed.split(/(\*\*.*?\*\*)/g)
    const rendered = parts.map((p, pi) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={pi} style={{ fontWeight: 600, color: 'var(--color-text)' }}>{p.slice(2, -2)}</strong>
        : p
    )
    return <p key={idx} style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--color-text-2)', marginBottom: 20 }}>{rendered}</p>
  })
}

export default function BlogDetail() {
  const { slug } = useParams()
  const article = ARTICLES.find((a) => a.slug === slug)
  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  if (!article) return <NotFound />

  return (
    <>
      <Helmet>
        <title>{article.title} · Anshu Agarwal</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '100px 40px' }}>
        <Link
          to="/blog"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--color-text-2)',
            marginBottom: 40, textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} /> Back to Articles
        </Link>

        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: 12 }}>
          {article.date}
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-text)', lineHeight: 1.15, marginBottom: 24 }}>
          <TextRevealScroll text={article.title} revealMode="chars" />
        </h1>
        <p style={{ fontSize: 20, color: 'var(--color-text-2)', lineHeight: 1.65, marginBottom: 48, borderBottom: '1px solid var(--color-border)', paddingBottom: 40 }}>
          {article.excerpt}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderContent(article.content)}
        </motion.div>

        <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>Anshu Agarwal</div>
            <div style={{ fontSize: 14, color: 'var(--color-text-3)', marginTop: 4 }}>GCP Data Engineer · Pune, India</div>
          </div>
          <EyeFollowButton text="Let's Talk" link="/contact" buttonColor="#000" textColor="#fff" />
        </div>
      </div>
    </>
  )
}
