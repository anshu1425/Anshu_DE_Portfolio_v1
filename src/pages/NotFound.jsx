import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
      <Helmet>
        <title>Not found · Anshu Agarwal</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div>
        <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--color-border)', lineHeight: 1, marginBottom: 16 }}>
          404
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-text)', marginBottom: 12 }}>
          Page not found
        </h1>
        <p style={{ fontSize: 16, color: 'var(--color-text-2)', marginBottom: 32 }}>
          The route you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  )
}
