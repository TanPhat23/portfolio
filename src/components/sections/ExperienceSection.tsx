import React from 'react'
import { GraduationCap, BadgeCheck, MapPin } from 'lucide-react'
import { Card } from '#/components/ui/card'

type ExperienceItem = {
  title: string
  subtitle?: string
  details?: string
  icon?: React.ComponentType<any>
}

const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    title: 'Bachelor of Information Technology',
    subtitle: 'Ho Chi Minh City University of Technology · Expected Jan 2027',
    details: 'GPA: 3.71 / 4.0',
    icon: GraduationCap,
  },
  {
    title: 'Fullstack Intern',
    subtitle: 'Amazon Web Services Vietnam · May 2025 — Aug 2025',
    details:
      'Built a serverless deployment pipeline using S3, Lambda, SNS, and DynamoDB for automated website hosting.',
    icon: BadgeCheck,
  },
  {
    title: 'Achievements',
    subtitle: 'Hackathons & Competitions',
    details: '3rd place in HDBANK Hackathon 2023 · Participated in IT GOT TALENT 2024-2025 · HDBANK Hackathon 2024',
    icon: MapPin,
  },
]

export default function ExperienceSection({ experiences = DEFAULT_EXPERIENCES }: { experiences?: ExperienceItem[] }) {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
      <Card className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 lg:p-8">
        <header className="mb-6">
          <p className="island-kicker mb-3">Experience</p>
          <h2 id="experience-heading" className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
            Education, internship, and achievements
          </h2>
          <p className="mt-3 text-[color:var(--muted-foreground)]">
            My journey combines university learning, an internship at AWS, and participation in hackathons focused on shipping useful products.
          </p>
        </header>

        <div className="space-y-4">
          {experiences.map((exp) => {
            const Icon = exp.icon ?? GraduationCap
            return (
              <article
                key={exp.title}
                className="rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-5"
                aria-labelledby={`exp-${exp.title.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>

                  <div>
                    <h3 id={`exp-${exp.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm font-semibold text-[color:var(--foreground)]">
                      {exp.title}
                    </h3>
                    {exp.subtitle ? (
                      <p className="text-sm text-[color:var(--muted-foreground)]">{exp.subtitle}</p>
                    ) : null}
                    {exp.details ? (
                      <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{exp.details}</p>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Card>
    </section>
  )
}