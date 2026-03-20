import {
  ArrowRight,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Card } from "#/components/ui/card";

/**
 * Hero Section Redesign
 *
 * Features:
 * - Glassmorphism effects with backdrop-blur and semi-transparent borders.
 * - Modern typography with high-contrast gradients.
 * - Integrated 3D ScrollScene as a focal point.
 * - Clean, engineering-focused layout.
 */
export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden px-4 pt-20 pb-12 sm:px-6 lg:pt-32">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Typography & Actions */}
          <div className="flex flex-col space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="w-fit border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Open for Internships 2026
              </Badge>

              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Building the{" "}
                <span className="bg-linear-to-r from-primary via-primary/80 to-blue-500 bg-clip-text text-transparent">
                  Digital Backbone
                </span>{" "}
                of Tomorrow.
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                I'm{" "}
                <span className="font-semibold text-foreground underline decoration-primary/30 decoration-2 underline-offset-4">
                  Phan Tan Phat
                </span>
                , a Fullstack Engineer specializing in high-performance backend
                systems and immersive 3D web interfaces.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                asChild
              >
                <a href="#projects">
                  Explore Work <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border/40 bg-card/40 px-8 text-base font-semibold backdrop-blur-md transition-all hover:bg-card/60"
                asChild
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            {/* Social Proof / Tech Stack Quick View */}
            <div className="flex items-center gap-6 pt-4 text-muted-foreground">
              <div className="flex -space-x-3">
                {["Go", "React", "AWS", "TS"].map((tech) => (
                  <div
                    key={tech}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-bold"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <div className="h-8 w-px bg-border/50" />
              <div className="flex gap-4">
                <a
                  href="https://github.com/TanPhat23"
                  target="_blank"
                  className="transition-colors hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="transition-colors hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:ptp112004@gmail.com"
                  className="transition-colors hover:text-primary"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Engineering Interactive Card */}
          <div className="relative lg:col-span-5">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-tr from-primary/20 to-transparent blur-2xl" />

            <Card className="relative overflow-hidden rounded-[2.5rem] border-border/40 bg-card/30 p-2 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

              <div className="flex flex-col space-y-2 p-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Terminal className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">
                      System.init()
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
                  </div>
                </div>

                <div className="flex items-center gap-4 px-2 py-2">
                  <Cpu className="h-4 w-4 text-primary animate-pulse" />
                  <div className="h-1.5 flex-1 rounded-full bg-white/5">
                    <div className="h-full w-[75%] rounded-full bg-primary" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Load: 75%
                  </span>
                </div>
              </div>
            </Card>

            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/40 bg-card/80 p-4 shadow-xl backdrop-blur-md sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Optimized</p>
                  <p className="text-xs text-muted-foreground">
                    Tailwind v4 Engine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
