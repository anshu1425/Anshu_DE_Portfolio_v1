# Anshu Agarwal — Portfolio  
**React + Vite · React Router · Framer Motion**

A fast, premium portfolio built for Anshu Agarwal, GCP Data Engineer. 
Features smooth animations, modern layout components, and a dedicated blog interface.

---

## Quick start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # → dist/
npm run preview    # preview production build
```

Node 18+ required.

---

## Routes

| Route | Page |
|---|---|
| `/` | Home (Hero, About, Services, Work) |
| `/work` | Projects Overview |
| `/work/:slug` | Case-study detail |
| `/experience` | Experience & Timeline |
| `/blog` | Blog Overview (3D Framer Motion Carousel) |
| `/blog/:slug` | Article Detail (Animated typography) |
| `/contact` | Contact Page |
| `*` | 404 Not Found |

---

## Key Files & Structure

```
public/
  anshu_photo.png          ← Main hero photo
  Anshu_Resume_final_2026.pdf ← Downloadable CV
src/
  main.jsx                 React + Router + Helmet entry
  App.jsx                  Layout shell + route config
  index.css                Vanilla CSS styling (Light theme)
  data.js                  All content lives here (WORK, TIMELINE, ARTICLES, etc.)
  pages/
    Home.jsx
    Work.jsx
    ProjectDetail.jsx
    Experience.jsx
    Blog.jsx
    BlogDetail.jsx
    Contact.jsx
    NotFound.jsx
  components/
    Nav.jsx                Floating-pill navigation
    DepthBlurCarousel.jsx  3D cinematic cover-flow carousel (used in Blog)
    StackedCardCarousel.jsx Interactive stacked cards (used for Services)
    EyeFollowButton.jsx    Interactive CTA button
    TextRevealScroll.jsx   Scroll-based typography reveal
    ProductFocusCarousel.jsx Product display carousel
    RevealGalleryStack.jsx Image stack interaction
```

