import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Github, Mail } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/work' },
  { label: 'Experience', path: '/experience' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: 32,
              height: 32,
              background: 'var(--color-text)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1
            }}>
              AA
            </div>
            Anshu Agarwal
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginLeft: 'auto' }}>
            {/* Desktop Links */}
            <ul className="navbar-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={isActive(item.path) ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Hamburger */}
            <button
              className="navbar-mobile-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile / Desktop Side Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>
                  Menu
                </span>
                <button
                  className="mobile-menu-close"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link to={item.path} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Social Icons at bottom of Sidebar */}
              <motion.div 
                style={{ marginTop: 'auto', paddingTop: 40, display: 'flex', gap: 16 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                 <a href="https://linkedin.com/in/anshuagarwal14" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                   <Linkedin size={20} strokeWidth={2} />
                 </a>
                 <a href="https://github.com/anshu1425" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                   <Github size={20} strokeWidth={2} />
                 </a>
                 <a href="mailto:anshuagarwal979@gmail.com" className="social-icon-btn" aria-label="Email">
                   <Mail size={20} strokeWidth={2} />
                 </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
