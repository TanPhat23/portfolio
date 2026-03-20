import React from 'react'

export default function CoreStats() {
  const stats: [string, string][] = [
    ['GPA', '3.71 / 4.0'],
    ['Internship', 'AWS Vietnam'],
    ['Hackathons', 'HDBank, IT Got Talent'],
    ['Portfolio', 'Developer Core'],
  ]

  return (
    <section className="grid gap-4" aria-labelledby="core-stats-heading">
      <article className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6">
        <p className="island-kicker mb-3">Current Focus</p>
        <h2 id="core-stats-heading" className="text-2xl font-bold tracking-tight text-[color:var(--foreground)]">
          Engineering experiences with strong system design.
        </h2>
        <p className="mt-4 leading-7 text-[color:var(--muted-foreground)]">
          I&apos;m actively working on products that combine realtime collaboration,
          cloud deployment, and polished user interfaces. The goal is to make each
          project fast, maintainable, and pleasant to use.
        </p>
      </article>

      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map(([label, value]) => (
          <article
            key={label}
            className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-5"
            aria-labelledby={`stat-${label.replace(/\s+/g, '-').toLowerCase()}-label`}
          >
            <p
              id={`stat-${label.replace(/\s+/g, '-').toLowerCase()}-label`}
              className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]"
            >
              {label}
            </p>
            <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
              {value}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}