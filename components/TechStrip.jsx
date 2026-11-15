import techStack from '../data/techStack'
import TechIcon from './TechIcon'

// ============================================================
// TECH STRIP
// The ten core technologies, each with its real brand mark and
// brand colour. Sits at the top of the Skills section so a visitor
// (or a recruiter skimming) sees the stack in one glance.
// ============================================================
export default function TechStrip() {
  return (
    <ul
      aria-label="Core technologies"
      className="mb-16 grid w-full grid-cols-2 gap-px border border-surface-light bg-surface-light sm:grid-cols-3 lg:grid-cols-5"
    >
      {techStack.map((tech) => (
        <li
          key={tech.name}
          className="flex items-center gap-3 bg-background px-4 py-4 transition-colors duration-300 hover:bg-surface"
        >
          <TechIcon name={tech.name} size={20} color={tech.color} />
          <span className="font-mono text-sm text-soft">{tech.name}</span>
        </li>
      ))}
    </ul>
  )
}
