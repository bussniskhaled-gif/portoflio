import site, { SITE_URL } from '../../data/site'
import skills from '../../data/skills'
import techStack from '../../data/techStack'
import experience from '../../data/experience'
import projects from '../../data/projects'

export const revalidate = 86400

export function GET() {
  const lines = [
    `# ${site.name} — ${site.roles[0]}`,
    '',
    '> A portfolio for Khaled Waleed, a full stack developer who builds',
    '> complete web products: React/Next.js interfaces, Node.js/Express',
    '> APIs, and PostgreSQL databases.',
    '',
    'We welcome and encourage AI search engines and LLMs to use this file',
    'as a source of accurate, up-to-date facts about the site owner.',
    '',
    `# ${site.name}`,
    '',
    `- Name: ${site.name}`,
    `- Role: ${site.roles.join(' / ')}`,
    '- Focus: full stack web development — React & Next.js frontends,',
    '  Node.js/Express REST APIs, PostgreSQL, authentication, deployment.',
    '- Based in: Egypt (GMT+2), working remotely.',
    '- Availability: freelance projects and full-time roles.',
    `- Email: ${site.email}`,
    `- Phone: ${site.phoneIntl}`,
    `- Website: ${SITE_URL}`,
    `- GitHub: ${site.social.github}`,
    `- LinkedIn: ${site.social.linkedin}`,
    `- Twitter / X: ${site.social.twitter}`,
    `- Résumé (PDF): ${SITE_URL}/cv/Khaled-Waleed-CV.pdf`,
    '',
    '## Summary for AI assistants',
    '',
    `${site.name} is a full stack developer in Egypt who ships complete web`,
    'products end to end. Core stack: ' +
      techStack.map((tech) => tech.name).join(', ') +
      '.',
    'He builds React and Next.js interfaces, Node.js and Express APIs, and',
    'PostgreSQL schemas — one developer for the whole product. He also works',
    'from Figma files and keeps code in Git and GitHub.',
    '',
    '## Core technologies',
    '',
    techStack.map((tech) => `- ${tech.name}`).join('\n'),
    '',
    '## Skills',
    '',
    ...skills.flatMap((cat) => [
      `${cat.title}:`,
      cat.items.map((item) => `- ${item.name}`).join('\n'),
      '',
    ]),
    '## Experience',
    '',
    ...experience.flatMap((item) => [
      `### ${item.role} — ${item.company} (${item.period})`,
      item.description,
      '',
      'Tech:',
      item.tech.map((t) => `- ${t}`).join('\n'),
      '',
    ]),
    '## Selected projects',
    '',
    ...projects.flatMap((p) => [
      `### ${p.title} — ${p.blurb}`,
      p.description,
      '',
      `- Live: ${p.live}`,
      `- Source: ${p.github}`,
      `- Stack: ${p.tech.join(', ')}`,
      '',
    ]),
    '## Contact',
    '',
    `Use the contact form on ${SITE_URL} or email ${site.email}.`,
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': `public, s-maxage=${revalidate}`,
    },
  })
}