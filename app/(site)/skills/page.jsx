import PageHeader from '../../../components/PageHeader'
import Skills from '../../../components/Skills'
import Tools from '../../../components/Tools'
import CTABand from '../../../components/CTABand'
import { SITE_URL } from '../../../data/site'
import techStack from '../../../data/techStack'

export const metadata = {
  title: 'Skills — The stack I work in',
  description:
    'React, Next.js, JavaScript and TypeScript, HTML5, CSS3, Tailwind CSS, Node.js, PostgreSQL, Git, GitHub, and Figma — with how each one is actually used.',
  keywords: [
    'Khaled Waleed skills',
    'React developer',
    'Next.js developer',
    'JavaScript developer',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Node.js developer',
    'PostgreSQL developer',
    'Git',
    'GitHub',
    'Figma to code',
    'full stack developer skills',
  ],
  alternates: { canonical: '/skills' },
  openGraph: {
    url: `${SITE_URL}/skills`,
    title: 'Skills — Khaled Waleed',
    description:
      'React, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS, Node.js, PostgreSQL, Git, GitHub, and Figma — the stack behind every product I ship.',
  },
}

// Matches the visible icon strip, so the structured data describes
// content a visitor can actually see.
const coreStackData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Core technologies — Khaled Waleed',
  itemListElement: techStack.map((tech, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: tech.name,
  })),
}

export default function SkillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coreStackData) }}
      />

      <PageHeader
        path="/skills"
        title="What I"
        accent="work with"
        lead="Two buckets, stated honestly: the fundamentals underneath every interface, and the toolkit I open each day. No invented proficiency bars — just how often and on what."
        meta={[
          { label: 'core languages', value: 'JS · TS · HTML · CSS' },
          { label: 'framework', value: 'React & Next.js' },
          { label: 'also fluent in', value: '12 supporting tools' },
        ]}
      />

      <Skills />
      <Tools />

      <CTABand
        label="// stack fit"
        title="Working with"
        accent="this stack?"
        text="If your team already lives in React and Tailwind, we will not need an onboarding period. Tell me what the codebase looks like and I will tell you where I would start."
        primary={{ label: 'contact me', href: '/contact' }}
        secondary={{ label: 'how I work', href: '/about' }}
      />
    </>
  )
}
