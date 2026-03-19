import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BadgeCheck,
  Braces,
  Cloud,
  Code2,
  Cpu,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  TerminalSquare,
  Workflow,
} from 'lucide-react'
import EngineeringSphere from '../components/EngineeringSphere'
import SectionDivider from '../components/SectionDivider'

export const Route = createFileRoute('/')({ component: PortfolioHome })

const projects = [
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

const skills = [
  {
    title: 'Frontend Engineering',
    icon: Code2,
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Start'],
  },
  {
    title: 'Backend Systems',
    icon: Server,
    items: ['Go', 'NestJS', 'Express.js', 'Fiber', 'REST APIs'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    items: ['AWS', 'Docker', 'Linux', 'Git', 'Deployment Pipelines'],
  },
  {
    title: 'Architecture & Quality',
    icon: ShieldCheck,
    items: ['Prisma', 'PostgreSQL', 'Redis', 'Testing', 'Code Quality'],
  },
]

const highlights = [
  'Strong focus on backend and fullstack development',
  'Built scalable web applications and realtime systems',
  'Deployed production-ready apps on AWS and Vercel',
  'Intermediate English with strong communication skills',
]

function PortfolioHome() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <SectionDivider
        title="Developer Core"
        subtitle="A portfolio built around engineering depth, clarity, and motion"
        variant="strong"
        className="mt-8"
      />
      <IntroStrip />
      <SectionDivider
        title="About and Focus"
        subtitle="Who I am, what I build, and what I care about"
        className="mt-8"
      />
      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <AboutPanel />
        <CoreStats />
      </section>
      <SectionDivider
        title="Selected Work"
        subtitle="Projects and backend systems that reflect my engineering approach"
        className="mt-10"
      />
      <ProjectsSection />
      <SectionDivider
        title="Technical Stack"
        subtitle="Frontend, backend, cloud, and quality-focused skills"
        className="mt-10"
      />
      <SkillsSection />
      <SectionDivider
        title="Growth"
        subtitle="Education, internship experience, and achievement milestones"
        className="mt-10"
      />
      <ExperienceSection />
      <SectionDivider
        title="Get In Touch"
        subtitle="Let’s build something useful together"
        className="mt-10"
      />
      <ContactSection />
    </main>
  )
}

function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10 lg:pt-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 shadow-[0_1px_0_var(--inset-glint)_inset,0_24px_64px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_left,rgba(59,130,246,0.08),transparent_22%)]" />
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_66%)] blur-2xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_66%)] blur-2xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--sidebar-border)] bg-[color:var(--sidebar)] px-3 py-1 text-xs font-semibold text-[color:var(--muted-foreground)] shadow-sm">
              <TerminalSquare className="h-3.5 w-3.5 text-[color:var(--primary)]" />
              Developer Core Portfolio
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
                Engineering-first portfolio with{' '}
                <span className="bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--primary)] to-[color:var(--primary)] bg-clip-text text-transparent">
                  interactive 3D depth
                </span>
                .
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)] sm:text-lg">
                I&apos;m Phan Tan Phat, a fullstack developer fresher focused on
                building scalable systems, realtime collaboration, and cloud-powered
                web experiences with strong UI polish.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] no-underline transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/70 px-5 py-2.5 text-sm font-semibold text-[color:var(--foreground)] no-underline transition hover:-translate-y-0.5 hover:border-[color:var(--ring)] hover:bg-[color:var(--accent)]/30"
              >
                Contact Me
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 text-xs text-[color:var(--muted-foreground)]">
              {['TanStack Start', 'Tailwind v4', 'shadcn/ui', 'React 19', 'Bun'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative">
            <div className="island-shell relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-5 shadow-[0_1px_0_var(--inset-glint)_inset,0_18px_45px_rgba(15,23,42,0.14)]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(59,130,246,0.05),transparent)]" />
              <div className="relative rounded-[1.5rem] border border-[color:var(--border)] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--foreground)]">
                        Developer Core
                      </p>
                      <p className="text-xs text-[color:var(--muted-foreground)]">
                        3D engineering interface
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1 text-xs font-medium text-[color:var(--muted-foreground)]">
                    Live
                  </span>
                </div>

                <div className="mt-6 h-[320px] rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-3">
                  <EngineeringSphere className="h-full w-full" />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    ['React', '92'],
                    ['Go', '75'],
                    ['AWS', '72'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]/80 p-4 text-center"
                    >
                      <p className="text-xl font-bold text-[color:var(--foreground)]">
                        {value}%
                      </p>
                      <p className="text-xs text-[color:var(--muted-foreground)]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--sidebar)] px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)]">
                    <Workflow className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--foreground)]">
                      Optimized for performance
                    </p>
                    <p className="text-xs text-[color:var(--muted-foreground)]">
                      Low motion, high clarity, responsive across devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IntroStrip() {
  return (
    <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
      <div className="grid gap-4 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/70 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['TanStack Start', 'SSR-ready app structure', Braces],
          ['shadcn/ui', 'Accessible reusable components', BadgeCheck],
          ['Tailwind v4', 'CSS-first theme tokens', TerminalSquare],
          ['3D Layer', 'Developer Core motion system', Cpu],
        ].map(([title, desc, Icon]) => (
          <article
            key={title as string}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/55 p-4"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-sm font-semibold text-[color:var(--foreground)]">
              {title as string}
            </h2>
            <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
              {desc as string}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutPanel() {
  return (
    <section className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 shadow-[0_1px_0_var(--inset-glint)_inset,0_18px_40px_rgba(15,23,42,0.1)]">
      <p className="island-kicker mb-3">About</p>
      <h2 className="text-2xl font-bold tracking-tight text-[color:var(--foreground)]">
        Built for fullstack, backend, and cloud engineering.
      </h2>
      <p className="mt-4 leading-7 text-[color:var(--muted-foreground)]">
        Dedicated student at Ho Chi Minh City University of Technology with a strong
        focus on backend and fullstack development. I enjoy building scalable web
        applications, realtime systems, and shipping clean interfaces that feel
        modern and responsive.
      </p>

      <ul className="mt-6 space-y-3">
        {highlights.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-[color:var(--muted-foreground)]">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--primary)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {['Go', 'React', 'Next.js', 'PostgreSQL', 'AWS', 'TanStack Start'].map((skill) => (
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

function CoreStats() {
  return (
    <section className="grid gap-4">
      <article className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6">
        <p className="island-kicker mb-3">Current Focus</p>
        <h2 className="text-2xl font-bold tracking-tight text-[color:var(--foreground)]">
          Engineering experiences with strong system design.
        </h2>
        <p className="mt-4 leading-7 text-[color:var(--muted-foreground)]">
          I&apos;m actively working on products that combine realtime collaboration,
          cloud deployment, and polished user interfaces. The goal is to make each
          project fast, maintainable, and pleasant to use.
        </p>
      </article>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ['GPA', '3.71 / 4.0'],
          ['Internship', 'AWS Vietnam'],
          ['Hackathons', 'HDBank, IT Got Talent'],
          ['Portfolio', 'Developer Core'],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-5"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
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

function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="island-kicker mb-2">Projects</p>
          <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
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

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-5 transition duration-200 hover:-translate-y-1"
          >
            <div className="mb-5 h-40 rounded-3xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--primary)]/10 to-[color:var(--primary)]/5 p-4">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)]/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1 text-xs font-medium text-[color:var(--muted-foreground)]">
                    {project.category}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                    <Cpu className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">
                    {project.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--muted-foreground)]">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1 text-xs font-medium text-[color:var(--foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {'live' in project.links && project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--primary-foreground)] no-underline"
                  >
                    Live Demo <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] no-underline"
                >
                  GitHub <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
      <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 sm:p-8">
        <p className="island-kicker mb-2">Skills</p>
        <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
          A balanced engineering stack
        </h2>
        <p className="mt-3 max-w-3xl text-[color:var(--muted-foreground)]">
          The portfolio is shaped around practical engineering skills: frontend
          craftsmanship, backend systems, cloud workflows, and reliable delivery.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {skills.map((group) => {
            const Icon = group.icon
            return (
              <article
                key={group.title}
                className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[color:var(--foreground)]">
                      {group.title}
                    </h3>
                    <p className="text-sm text-[color:var(--muted-foreground)]">
                      Technical depth with practical delivery
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
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
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
      <div className="grid gap-5 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="island-kicker mb-2">Experience</p>
          <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
            Education, internship, and achievements
          </h2>
          <p className="mt-3 text-[color:var(--muted-foreground)]">
            My journey combines university learning, AWS internship experience, and
            hackathon participation with a strong focus on building useful products.
          </p>
        </div>

        <div className="space-y-4">
          <article className="rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Bachelor of Information Technology
                </p>
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  Ho Chi Minh City University of Technology · Expected Jan 2027
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
                  GPA: 3.71/4.0
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Fullstack Intern
                </p>
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  Amazon Web Services Vietnam · May 2025 — Aug 2025
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
                  Built a serverless deployment pipeline using S3, Lambda, SNS, and
                  DynamoDB for automated website hosting.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Achievements
                </p>
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  3rd place in HDBANK Hackathon 2023 · Participated in IT GOT TALENT
                  2024-2025 · Participated in HDBANK Hackathon 2024
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="mx-auto mt-8 max-w-6xl px-4 pb-16 sm:px-6">
      <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 sm:p-8">
        <p className="island-kicker mb-2">Contact</p>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-4 max-w-xl text-[color:var(--muted-foreground)]">
              I&apos;m open to full-time opportunities, internships, and interesting
              engineering collaborations.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:ptp112004@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3 no-underline"
              >
                <Mail className="h-4 w-4 text-[color:var(--primary)]" />
                <span className="text-sm text-[color:var(--foreground)]">
                  ptp112004@gmail.com
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/phan-t%E1%BA%A5n-ph%C3%A1t-4593982a1/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3 no-underline"
              >
                <Linkedin className="h-4 w-4 text-[color:var(--primary)]" />
                <span className="text-sm text-[color:var(--foreground)]">
                  linkedin.com/in/phan-tan-phat
                </span>
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3">
                <MapPin className="h-4 w-4 text-[color:var(--primary)]" />
                <span className="text-sm text-[color:var(--foreground)]">
                  Son Dong Commune, Vinh Long Province
                </span>
              </div>
            </div>
          </div>

          <form className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[color:var(--foreground)]">
                Name
                <input
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--ring)]"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-[color:var(--foreground)]">
                Email
                <input
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--ring)]"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm text-[color:var(--foreground)]">
              Subject
              <input
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--ring)]"
                placeholder="Project, internship, or collaboration"
              />
            </label>

            <label className="mt-4 grid gap-2 text-sm text-[color:var(--foreground)]">
              Message
              <textarea
                rows={5}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--ring)]"
                placeholder="Tell me about your idea..."
              />
            </label>

            <button
              type="button"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] transition hover:-translate-y-0.5"
            >
              Send Message
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}