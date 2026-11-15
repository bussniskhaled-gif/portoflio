// ============================================================
// PROJECTS DATA
// Rendered as cards on the Projects page and in the Home preview.
//
// `category`   – 'Web' | 'Mobile' (drives the All/Web/Mobile filter).
// `device`     – 'laptop' | 'phone' (chooses the mockup frame in ProjectCard).
// `screenshot` – a path to an image in /public/images/.
// `featured`   – shown in the Home preview and first on the grid.
// `highlights` – concrete things done on the build, used on the full card.
// ============================================================

const projects = [
  {
    id: 1,
    title: 'Prestige Realty',
    category: 'Web',
    device: 'laptop',
    blurb: 'Real-estate platform',
    year: '2024',
    role: 'Frontend developer',
    featured: true,
    description:
      'A premium real-estate platform for browsing and showcasing properties — a polished, responsive app built with React.',
    detail:
      'Buyers filter a large property inventory by price, area, and type, then open a listing with a full photo gallery, specs, and a direct contact route to the agent. The brief was a folder of design screenshots and a dataset; it shipped as a responsive app with instant client-side filtering.',
    highlights: [
      'Multi-filter property search over the full listing set, client-side and instant',
      'Gallery and detail views built for large photography without hurting load time',
      'Bilingual-friendly layout with Arabic and English content side by side',
      'Responsive down to a 320px phone, including the filter drawer',
    ],
    tech: ['React', 'Tailwind', 'Vite'],
    live: 'https://real-estate-app-five-mauve.vercel.app/',
    github: 'https://github.com/ka6246770',
    screenshot: '/images/real-estate.PNG',
  },
  {
    id: 2,
    title: 'La2ta — Reels Portfolio',
    category: 'Web',
    device: 'laptop',
    blurb: 'Bilingual portfolio',
    year: '2024',
    role: 'Frontend developer',
    featured: true,
    description:
      'A bilingual Arabic/English portfolio for a reels & video editor. Fast-scrolling showcase with a strong first-impression hero.',
    detail:
      'A video editor needed a site that felt as fast as their cuts. The result is a full-RTL Arabic experience with an English mirror, media-heavy sections that stay smooth on phones, and a contact path that turns a visitor into a job enquiry in one screen.',
    highlights: [
      'Full RTL Arabic layout with a mirrored LTR English version',
      'Direction-aware spacing and typography, not just a flipped container',
      'Media-first sections tuned so scrolling stays smooth on mid-range phones',
      'Single-screen enquiry path for clients arriving from social links',
    ],
    tech: ['React', 'Vite', 'CSS'],
    live: 'https://la2ta-portfolio.vercel.app/',
    github: 'https://github.com/ka6246770',
    screenshot: '/images/la2ta.PNG',
  },
  {
    id: 3,
    title: 'Personal Portfolio',
    category: 'Web',
    device: 'laptop',
    blurb: 'Full stack developer site',
    year: '2025',
    role: 'Design and build',
    featured: true,
    description:
      'This site — a dark, animated multi-page portfolio built with Next.js, Tailwind, and Framer Motion.',
    detail:
      'Rebuilt from a single long page into a routed, multi-page site without losing the look. Every page is server-rendered with its own metadata, the contact form posts to a route handler that emails me directly, and the whole thing is documented for AI crawlers as well as people.',
    highlights: [
      'Next.js App Router pages with per-page metadata, OG image, and JSON-LD',
      'Framer Motion route transitions with an exit-and-enter pass per navigation',
      'Contact form backed by a Nodemailer route handler with server-side validation',
      'Strict 60/30/10 palette: black, graphite surfaces, one neon accent',
    ],
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    live: 'https://portofolio-two-eta-92.vercel.app/',
    github: 'https://github.com/ka6246770',
    screenshot: '/images/Capture.PNG',
  },
  {
    id: 4,
    title: 'Enrollhub',
    category: 'Web',
    device: 'laptop',
    blurb: 'Enrollment & learning platform',
    year: '2026',
    role: 'Full stack developer',
    featured: true,
    description:
      'A complete enrollment platform that helps students discover courses, enroll, and track their progress — one dashboard for learners, one admin panel for instructors.',
    detail:
      'Enrollhub was built to replace scattered spreadsheets and manual email chains with a single product where students can browse a course catalog, enroll with one click, and see their progress in real time. Instructors get an admin dashboard to create courses, manage students, and view analytics. The frontend is a responsive Next.js app; the backend is Node.js and Express with PostgreSQL for enrolments, users, and course data.',
    highlights: [
      'Course catalogue with search, filtering, and category browsing',
      'One-click enrolment flow with instant seat confirmation',
      'Student dashboard showing progress, certificates, and upcoming classes',
      'Instructor admin panel for course creation, student management, and analytics',
      'Responsive from 320px phones to wide desktops, dark mode by default',
      'PostgreSQL schema for users, courses, enrolments, and progress records',
    ],
    tech: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind', 'Framer Motion'],
    live: 'https://enrollhub-pi.vercel.app/',
    github: 'https://github.com/ka6246770',
    screenshot: '/images/Enrollhub/Screenshot From 2026-10-29 15-15-49.png',
    images: [
      '/images/Enrollhub/Screenshot From 2026-10-29 15-15-49.png',
      '/images/Enrollhub/Screenshot From 2026-10-29 15-16-22.png',
      '/images/Enrollhub/Screenshot From 2026-10-29 15-16-40.png',
      '/images/Enrollhub/Screenshot From 2026-10-29 15-17-06.png',
      '/images/Enrollhub/Screenshot From 2026-10-29 15-17-32.png',
      '/images/Enrollhub/Screenshot From 2026-10-29 15-17-45.png',
      '/images/Enrollhub/Screenshot From 2026-10-29 15-17-59.png',
      '/images/Enrollhub/Screenshot From 2026-10-24 01-58-33.png',
    ],
  },
]

export default projects
