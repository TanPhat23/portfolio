import React, { useState } from 'react'
import { Github, Linkedin, Mail, ArrowUpRight, MapPin, Cpu } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'

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
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function onSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error')
      return
    }
    setStatus('sending')
    // Simulate async submission (replace with real API later)
    try {
      await new Promise((res) => setTimeout(res, 700))
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 1800)
    }
  }

  return (
    <footer className="relative mt-12 border-t border-[color:var(--border)] bg-[color:var(--header-bg)]/80 backdrop-blur-xl" role="contentinfo">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--primary)]/60 to-transparent" />

      <div className="page-wrap px-4 py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <Card className="p-6 island-shell">
            <CardHeader>
              <div className="inline-flex items-center gap-2 text-sm text-[color:var(--muted-foreground)]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                  <Cpu className="h-4 w-4" />
                </span>
                Developer Core Footer
              </div>
              <CardTitle className="mt-3 text-2xl text-[color:var(--foreground)]">Building clean, scalable, and thoughtful software experiences.</CardTitle>
              <CardDescription className="mt-2 text-sm text-[color:var(--muted-foreground)] max-w-xl">
                Fullstack developer focused on backend systems, realtime collaboration, cloud architecture, and polished interfaces powered by TanStack Start.
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-4 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#projects" className="inline-flex items-center gap-2">
                  View Projects
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>

              <Button variant="outline" asChild>
                <a href="#contact" className="inline-flex items-center gap-2">
                  Contact Me
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="p-4 island-shell">
              <CardHeader>
                <div className="island-kicker">Contact</div>
              </CardHeader>
              <CardContent className="mt-2 space-y-2 text-sm text-[color:var(--muted-foreground)]">
                <a
                  href="mailto:ptp112004@gmail.com"
                  className="flex items-center gap-3 rounded-md px-3 py-2 no-underline hover:bg-[color:var(--muted)]/40"
                >
                  <Mail className="h-4 w-4 text-[color:var(--primary)]" />
                  <span className="text-[color:var(--foreground)]">ptp112004@gmail.com</span>
                </a>

                <div className="flex items-center gap-3 rounded-md px-3 py-2">
                  <MapPin className="h-4 w-4 text-[color:var(--primary)]" />
                  <span className="text-[color:var(--foreground)]">Son Dong Commune, Vinh Long Province</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 island-shell">
              <CardHeader>
                <div className="island-kicker">Socials</div>
              </CardHeader>
              <CardContent className="mt-2 grid gap-2">
                {SOCIALS.map((social) => {
                  const Icon = social.icon
                  return (
                    <Button key={social.label} variant="ghost" asChild>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-between px-3 py-2"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-[color:var(--foreground)]">{social.label}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-[color:var(--muted-foreground)]" />
                      </a>
                    </Button>
                  )
                })}
              </CardContent>

              <CardFooter className="pt-3">
                <form onSubmit={onSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-w-0"
                    aria-label="Email address"
                  />
                  <Button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Subscribe'}
                  </Button>
                </form>
                <div className="mt-2 text-xs text-[color:var(--muted-foreground)]">
                  {status === 'success' && 'Thanks — you are subscribed!'}
                  {status === 'error' && 'Please enter a valid email.'}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-[color:var(--border)] pt-5 text-sm text-[color:var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">&copy; {year} Phan Tan Phat. All rights reserved.</p>
          <p className="m-0">Built with TanStack Start, Tailwind v4, shadcn/ui, and Bun.</p>
        </div>
      </div>
    </footer>
  )
}