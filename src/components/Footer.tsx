import { Github, Linkedin, Mail, ArrowUpRight, MapPin, Cpu } from 'lucide-react'

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/TanPhat23',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/phan-t%E1%BA%A5n-ph%C3%A1t-4593982a1/',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:ptp112004@gmail.com',
    icon: Mail,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-16 border-t border-[color:var(--border)] bg-[color:var(--header-bg)]/80 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--primary)]/60 to-transparent" />

      <div className="page-wrap px-4 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/80 px-3 py-1 text-xs font-semibold text-[color:var(--muted-foreground)] shadow-[0_1px_0_var(--inset-glint)_inset]">
              <Cpu className="h-3.5 w-3.5 text-[color:var(--primary)]" />
              Developer Core Footer
            </div>

            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl">
                Building clean, scalable, and thoughtful software experiences.
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[color:var(--muted-foreground)] sm:text-base">
                Fullstack developer fresher focused on backend systems, realtime collaboration,
                cloud architecture, and polished interfaces powered by TanStack Start.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] no-underline transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/80 px-5 py-2.5 text-sm font-semibold text-[color:var(--foreground)] no-underline transition hover:-translate-y-0.5 hover:border-[color:var(--ring)]"
              >
                Contact Me
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-5 shadow-[0_1px_0_var(--inset-glint)_inset,0_14px_36px_rgba(15,23,42,0.08)]">
              <p className="island-kicker mb-3">Contact</p>
              <div className="space-y-3 text-sm text-[color:var(--muted-foreground)]">
                <a
                  href="mailto:ptp112004@gmail.com"
                  className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3 no-underline transition hover:border-[color:var(--ring)]"
                >
                  <Mail className="h-4 w-4 text-[color:var(--primary)]" />
                  <span>ptp112004@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3">
                  <MapPin className="h-4 w-4 text-[color:var(--primary)]" />
                  <span>Son Dong Commune, Vinh Long Province</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-5 shadow-[0_1px_0_var(--inset-glint)_inset,0_14px_36px_rgba(15,23,42,0.08)]">
              <p className="island-kicker mb-3">Socials</p>
              <div className="grid gap-2">
                {SOCIALS.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3 no-underline transition hover:-translate-y-0.5 hover:border-[color:var(--ring)] hover:bg-[color:var(--accent)]/30"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium text-[color:var(--foreground)]">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        {social.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[color:var(--muted-foreground)]" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--border)] pt-6 text-sm text-[color:var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            &copy; {year} Phan Tan Phat. All rights reserved.
          </p>
          <p className="m-0">
            Built with TanStack Start, Tailwind v4, shadcn/ui, and Bun.
          </p>
        </div>
      </div>
    </footer>
  )
}