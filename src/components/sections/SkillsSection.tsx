import React from "react"
import { Code2, Server, Cloud, ShieldCheck } from "lucide-react"
import { Card } from "#/components/ui/card"

type SkillGroup = {
  title: string
  icon: React.ComponentType<any>
  items: string[]
}

const DEFAULT_SKILLS: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    icon: Code2,
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "TanStack Start"],
  },
  {
    title: "Backend Systems",
    icon: Server,
    items: ["Go", "NestJS", "Express.js", "Fiber", "REST APIs"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    items: ["AWS", "Docker", "Linux", "CI/CD", "Deployment Pipelines"],
  },
  {
    title: "Architecture & Quality",
    icon: ShieldCheck,
    items: ["Prisma", "PostgreSQL", "Redis", "Testing", "Code Quality"],
  },
]

export default function SkillsSection({ skills = DEFAULT_SKILLS }: { skills?: SkillGroup[] }) {
  return (
    <section id="skills" className="mx-auto mt-8 max-w-6xl px-4 sm:px-6" aria-labelledby="skills-heading">
      <Card className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 sm:p-8">
        <header className="mb-6">
          <p className="island-kicker mb-2">Skills</p>
          <h2 id="skills-heading" className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
            A balanced engineering stack
          </h2>
          <p className="mt-3 max-w-3xl text-[color:var(--muted-foreground)]">
            Practical engineering skills across frontend, backend, cloud, and quality-focused tooling.
          </p>
        </header>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {skills.map((group) => {
            const Icon = group.icon
            return (
              <article
                key={group.title}
                className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-5"
                aria-labelledby={`skill-${group.title.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 id={`skill-${group.title.replace(/\s+/g, "-").toLowerCase()}`} className="text-base font-semibold text-[color:var(--foreground)]">
                      {group.title}
                    </h3>
                    <p className="text-sm text-[color:var(--muted-foreground)]">Technical depth with practical delivery</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2" aria-hidden>
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1 text-xs font-medium text-[color:var(--foreground)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </Card>
    </section>
  )
}