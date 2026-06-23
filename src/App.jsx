import { Routes, Route } from 'react-router-dom'
import { Linkedin, Github, Mail } from 'lucide-react'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Experience from './pages/Experience.jsx'
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import NotFound from './pages/NotFound.jsx'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="footer-copy">© 2026 Anshu Agarwal · GCP Data Engineer</span>
        <div className="footer-links" style={{ display: 'flex', gap: 16 }}>
          <a href="https://linkedin.com/in/anshuagarwal14" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
            <Linkedin size={20} strokeWidth={2} />
          </a>
          <a href="https://github.com/anshu1425" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
            <Github size={20} strokeWidth={2} />
          </a>
          <a href="mailto:anshuagarwal979@gmail.com" className="social-icon-btn" aria-label="Email">
            <Mail size={20} strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}
