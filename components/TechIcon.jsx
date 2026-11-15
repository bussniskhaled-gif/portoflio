import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiFigma,
} from 'react-icons/si'

// Brand marks for the core stack. Kept in one map so the icon strip
// and the skill list can never drift apart.
const brandIcons = {
  JavaScript: SiJavascript,
  React: SiReact,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
}

export default function TechIcon({ name, size = 20, color, className = '' }) {
  const Icon = brandIcons[name]
  if (!Icon) return null

  return (
    <Icon
      size={size}
      color={color}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  )
}
