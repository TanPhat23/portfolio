import React, { useState } from "react"
import { Mail, Linkedin, MapPin, ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { Input } from "#/components/ui/input"
import { Button } from "#/components/ui/button"

type Status = "idle" | "sending" | "success" | "error"

export default function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  function validateEmail(v: string) {
    return /\S+@\S+\.\S+/.test(v)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in your name, email, and message.")
      setStatus("error")
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please provide a valid email address.")
      setStatus("error")
      return
    }

    setStatus("sending")

    // Mock async submit - replace with real API call when available
    try {
      await new Promise<void>((res) => setTimeout(() => res(), 800))
      setStatus("success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setTimeout(() => setStatus("idle"), 2200)
    } catch (err) {
      setErrorMessage("Submission failed. Please try again.")
      setStatus("error")
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto mt-8 max-w-6xl px-4 pb-16 sm:px-6"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="sr-only">
        Contact
      </h2>

      <Card className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-6 sm:p-8">
        <CardHeader aria-hidden className="mb-4">
          <CardTitle>
            <span className="island-kicker">Contact</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
              Let's build something useful.
            </h3>
            <p className="mt-4 max-w-xl text-[color:var(--muted-foreground)]">
              I'm open to full-time roles, internships, and engineering collaborations.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:ptp112004@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3 no-underline transition hover:border-[color:var(--ring)]"
              >
                <Mail className="h-4 w-4 text-[color:var(--primary)]" />
                <span className="text-sm text-[color:var(--foreground)]">ptp112004@gmail.com</span>
              </a>

              <a
             EE83-CE8B   href="https://www.linkedin.com/in/phan-t%E1%BA%A5n-ph%C3%A1t-4593982a1/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3 no-underline transition hover:border-[color:var(--ring)]"
              >
                <Linkedin className="h-4 w-4 text-[color:var(--primary)]" />
                <span className="text-sm text-[color:var(--foreground)]">linkedin.com/in/phan-tan-phat</span>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-4 py-3">
                <MapPin className="h-4 w-4 text-[color:var(--primary)]" />
                <span className="text-sm text-[color:var(--foreground)]">Son Dong Commune, Vinh Long Province</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--muted)]/45 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[color:var(--foreground)]">
                Name
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                />
              </label>

              <label className="grid gap-2 text-sm text-[color:var(--foreground)]">
                Email
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  aria-label="Email address"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm text-[color:var(--foreground)]">
              Subject
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project, internship, or collaboration"
                aria-label="Subject"
              />
            </label>

            <label className="mt-4 grid gap-2 text-sm text-[color:var(--foreground)]">
              Message
              <textarea
                rows={5}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--ring)]"
                placeholder="Tell me about your idea..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-label="Message"
              />
            </label>

            <div className="mt-4 flex items-start gap-4">
              <Button
                type="submit"
                variant="default"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div aria-live="polite" className="text-sm min-w-[160px]">
                {status === "success" && (
                  <p className="text-[color:var(--primary)]">Thanks — your message was sent (mock).</p>
                )}
                {status === "error" && <p className="text-destructive">{errorMessage ?? "Please check the form."}</p>}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}