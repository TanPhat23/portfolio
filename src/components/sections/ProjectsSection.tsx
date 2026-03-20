import React, { useState } from 'react'
import { ArrowRight, Cpu, Github } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardFooter } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

type Project = {
  title: string
  category: string
  description: string
  stack: string[]
  links: {
    live?: string
    github?: string
  }
}

const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'Web Builder V2',
    category: 'Full Stack',
    description:
      'A drag-and-drop website builder with reusable components, optimized caching, and improved architecture.',
    stack: ['Next.js', 'React', 'Prisma', 'PostgreSQL', 'TanStack Query', 'Bun'],
    links: {
      live: 'https://webbuilderv2.vercel.app/',
      github: 'https://github.com/TanPhat23/webbuilderv2',
    },
  },
  {
    title: 'Realtime Collaboration API',
    category: 'Backend',
    description:
      'A Go-based realtime service that powers collaborative editing with low-latency WebSocket updates.',
    stack: ['Go', 'Fiber', 'WebSocket', 'Redis'],
    links: {
      github: 'https://github.com/TanPhat23/webbuilder.realtime.go',
    },
  },
  {
    title: 'Web Builder API',
    category: 'Backend',
    description:
      'A REST API for project management, persistence, and authentication in the Web Builder platform.',
    stack: ['Go', 'Fiber', 'PostgreSQL', 'Redis'],
    links: {
      github: 'https://github.com/TanPhat23/webbuilder.api.go',
    },
  },
]

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, '-')
}

function ProjectCard({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: Project
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const id = slugify(project.title)

  return (
    <Card className="group flex min-h-[320px] overflow-hidden rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-0 shadow-sm transition duration-200 hover:-translate-y-1">
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-5 py-4">
          <Badge variant="outline" className="px-3 py-1 text-xs">
            {project.category}
          </Badge>

          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
            <Cpu className="h-4 w-4" />
          </div>
        </div>

        <CardContent className="flex min-h-0 flex-1 flex-col gap-4 px-5 py-4">
          <div className="min-h-0">
            <h3 id={`${id}-title`} className="text-sm font-semibold text-[color:var(--foreground)]">
              {project.title}
            </h3>

            <p
              id={`${id}-description`}
              className={`mt-2 text-sm leading-6 break-words text-[color:var(--muted-foreground)] ${
                isOpen ? '' : 'line-clamp-3'
              }`}
            >
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-hidden>
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1 text-xs font-medium text-[color:var(--foreground)]"
              >
                {item}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="w-fit text-sm font-medium text-[color:var(--primary)] hover:underline"
            aria-expanded={isOpen}
            aria-controls={`${id}-description`}
          >
            {isOpen ? 'Show less' : 'Read more'}
          </button>
        </CardContent>

        <CardFooter className="mt-auto flex flex-wrap gap-3 border-t border-[color:var(--border)] px-5 py-4">
          {project.links.live ? (
            <Button asChild>
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--primary-foreground)] no-underline"
              >
                Live Demo <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          ) : null}

          {project.links.github ? (
            <Button asChild variant="outline">
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] no-underline"
              >
                GitHub <Github className="h-4 w-4" />
              </a>
            </Button>
          ) : null}
        </CardFooter>
      </div>
    </Card>
  )
}

export default function ProjectsSection({ projects = DEFAULT_PROJECTS }: { projects?: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="projects"
      className="mx-auto mt-8 max-w-6xl px-4 sm:px-6"
      aria-labelledby="projects-heading"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="island-kicker mb-2">Projects</p>
          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl"
          >
            Selected engineering work
          </h2>
        </div>

        <a
          href="https://github.com/TanPhat23"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 text-sm font-semibold text-[color:var(--primary)] no-underline sm:inline-flex"
        >
          View GitHub <Github className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={idx}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  )
}