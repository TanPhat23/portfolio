import React from 'react'
import { BadgeCheck } from 'lucide-react'

type AboutPanelProps = {
  highlights?: string[]
  skills?: string[]
  className?: string
}

const DEFAULT_HIGHLIGHTS = [
  'Strong focus on backend and fullstack development',
  'Built scalable web applications and realtime systems',
  'Deployed production-ready apps on AWS and Vercel',
  'Intermediate English with strong communication skills',
]

const DEFAULT_SKILLS = [
  'Go',
  'React',
  'Next.js',
  'PostgreSQL',
  'AWS',
  'TanStack Start',
]

export default function AboutPanel({
  highlights = DEFAULT_HIGHLIGHTS,
  skills = DEFAULT_SKILLS,
  className = '',
}: AboutPanelProps) {
  return (
    <section
      className={`rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 shadow-[0_1px_0_var(--inset-glint)_inset,0_18px_40px_rgba(15,23,42,0.1)] ${className}`}
      aria-labelledby="about-heading"
    >
      <p className="island-kicker mb-3">About</p>

      <h2 id="about-heading" className="text-2xl font-bold tracking-tight text-[color:var(--foreground)]">
        Built for fullstack, backend, and cloud engineering.
      </h2>

      <p className="mt-4 leading-7 text-[color:var(--muted-foreground)]">
        Dedicated student at Ho Chi Minh City University of Technology with a strong focus on backend and
        fullstack development. I enjoy building scalable web applications, realtime systems, and shipping clean
        interfaces that feel modern and responsive.
      </p>

      <ul className="mt-6 space-y-3" aria-label="Highlights">
        {highlights.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-[color:var(--muted-foreground)]">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--primary)]" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Skills">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1 text-xs font-medium text-[color:var(--foreground)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}