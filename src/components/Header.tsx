import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  ArrowRight,
  ChevronDown,
  Menu,
  MoonStar,
  PanelTop,
  Sparkles,
  SunMedium,
  X,
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'

type NavItem = {
  label: string
  href: string
  isExternal?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
]

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const activeLabel = useMemo(() => {
    const current = NAV_ITEMS.find((item) => isActivePath(location.pathname, item.href))
    return current?.label ?? 'Home'
  }, [location.pathname])

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300',
        scrolled
          ? 'border-[color:var(--border)] bg-[color:var(--header-bg)]/92 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
          : 'border-transparent bg-[color:var(--header-bg)]/70',
      ].join(' ')}
    >
      <div className="page-wrap px-4">
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/85 px-3 py-2 no-underline shadow-[0_1px_0_var(--inset-glint)_inset,0_10px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[color:var(--ring)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
              <PanelTop className="h-4.5 w-4.5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[color:var(--foreground)]">
                TanStack Portfolio
              </span>
              <span className="text-[11px] text-[color:var(--muted-foreground)]">
                Developer Core
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/80 p-1 shadow-[0_1px_0_var(--inset-glint)_inset] md:flex">
            {NAV_ITEMS.map((item) =>
              item.isExternal ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link rounded-full px-4 py-2 text-sm font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href as never}
                  className="nav-link rounded-full px-4 py-2 text-sm font-medium"
                  activeProps={{ className: 'nav-link is-active rounded-full px-4 py-2 text-sm font-semibold' }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/80 px-3 py-2 text-xs text-[color:var(--muted-foreground)] lg:flex">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--primary)]" />
              <span>{activeLabel}</span>
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/85 text-[color:var(--foreground)] transition hover:-translate-y-0.5 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={[
            'grid overflow-hidden transition-all duration-300 md:hidden',
            mobileOpen ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] pb-0 opacity-0',
          ].join(' ')}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)]/90 p-3 shadow-[0_1px_0_var(--inset-glint)_inset,0_12px_28px_rgba(15,23,42,0.1)]">
              <div className="grid gap-1">
                {NAV_ITEMS.map((item) =>
                  item.isExternal ? (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--foreground)] no-underline transition hover:bg-[color:var(--accent)]/35"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-4 w-4 text-[color:var(--muted-foreground)]" />
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      to={item.href as never}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--foreground)] no-underline transition hover:bg-[color:var(--accent)]/35"
                      activeProps={{
                        className:
                          'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-[color:var(--primary)] no-underline bg-[color:var(--accent)]/35',
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] text-[color:var(--muted-foreground)]" />
                    </Link>
                  ),
                )}
              </div>

              <div className="mt-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/55 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  Sectional Transitions
                </p>
                <p className="mt-1 text-sm text-[color:var(--foreground)]">
                  Smooth animations between hero, projects, skills, and contact sections.
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--sidebar)] px-4 py-3">
                <SunMedium className="h-4 w-4 text-[color:var(--primary)]" />
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  Use the theme toggle to switch light and dark modes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative h-px overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--primary)]/60 to-transparent" />
        <div className="absolute left-0 top-0 h-px w-1/3 animate-[shimmer_3s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.65),transparent)] opacity-50" />
      </div>
    </header>
  )
}