import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import StoryCard from "./ScrollStory/StoryCard";
import StoryTrack from "./ScrollStory/StoryTrack";
import { storyPoseForStep } from "./ScrollStory/storyLayout";

gsap.registerPlugin?.(ScrollTrigger);

type StorySection = {
  id: string;
  title?: string;
  subtitle?: string;
  variant?: "default" | "subtle" | "strong";
  start?: string;
  end?: string;
  className?: string;
  content?: React.ReactNode;
  contentClassName?: string;
};

type ScrollStoryProps = {
  steps: StorySection[];
  onStepEnter?: (id: string, direction: "down" | "up") => void;
  onStepLeave?: (id: string, direction: "down" | "up") => void;
  onStepProgress?: (id: string, progress: number) => void;
  markers?: boolean;
  pin?: boolean;
  className?: string;
};

function StoryShell({
  section,
  index,
  count,
}: {
  section: StorySection;
  index: number;
  count: number;
}) {
  return (
    <div className={`scroll-story-step-shell ${section.className ?? ""}`}>
      <div className="relative grid w-full grid-cols-[minmax(0,1fr)_clamp(4rem,7vw,5.5rem)_minmax(0,1fr)] items-center gap-4">
        <div className="pointer-events-none col-start-2 row-start-1 flex h-full items-center justify-center" aria-hidden="true">
          <div className="relative flex h-full min-h-[6rem] w-full items-center justify-center">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-(--border)/40 to-transparent" />
            <span className="block h-[0.95rem] w-[0.95rem] rounded-full border border-[color-mix(in_oklab,var(--primary)_28%,var(--border))] bg-[color-mix(in_oklab,var(--card)_84%,transparent)] shadow-[0_0_0_0.42rem_color-mix(in_oklab,var(--primary)_12%,transparent),0_0_34px_color-mix(in_oklab,var(--primary)_20%,transparent),inset_0_1px_0_var(--inset-glint)] [animation:story-node-pulse_3.8s_ease-in-out_infinite] motion-reduce:animate-none" />
          </div>
        </div>

        <StoryTrack position={index % 2 === 0 ? "left" : "right"} />

        <div
          className={
            index % 2 === 0
              ? "col-start-1 row-start-1 justify-self-end pr-4"
              : "col-start-3 row-start-1 justify-self-start pl-4"
          }
        >
          <StoryCard position={index % 2 === 0 ? "left" : "right"} content={section.content} contentClassName={section.contentClassName} />
        </div>
      </div>
    </div>
  );
}

export default function ScrollStory({
  steps,
  onStepEnter,
  onStepLeave,
  onStepProgress,
  markers = false,
  pin = false,
  className = "",
}: ScrollStoryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  const totalSteps = steps.length;

  const layoutSteps = useMemo(
    () =>
      steps.map((step, index) => ({
        ...step,
        index,
        pose: index % 2 === 0 ? "left" : "right",
      })),
    [steps],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!steps || steps.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];
    let pinTrigger: ScrollTrigger | null = null;

    const storyHeight = () =>
      Array.from(stepRefs.current).reduce((total, el) => total + (el?.offsetHeight ?? 0), 0);

    if (pin) {
      try {
        pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 0.9, storyHeight())}`,
          pin: true,
          pinSpacing: true,
          markers,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      } catch {
        pinTrigger = null;
      }
    }

    steps.forEach((step, i) => {
      const el = stepRefs.current[i];
      if (!el) return;

      const start = step.start ?? (i === 0 ? "top 85%" : "top 72%");
      const end = step.end ?? "bottom 28%";
      const pose = storyPoseForStep(step.id, i, totalSteps);

      const applyPose = () => {
        const handler = (window as Window & { scrollSceneSetPose?: (id?: string) => void }).scrollSceneSetPose;
        if (typeof handler === "function") handler(pose.pose);
      };

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        scrub: 0.8,
        markers,
        onEnter: () => {
          const detail = { id: step.id, type: "enter" as const, direction: "down" as const };
          window.dispatchEvent(new CustomEvent("scroll-story-step", { detail }));
          onStepEnter?.(step.id, "down");
          applyPose();
        },
        onEnterBack: () => {
          const detail = { id: step.id, type: "enter" as const, direction: "up" as const };
          window.dispatchEvent(new CustomEvent("scroll-story-step", { detail }));
          onStepEnter?.(step.id, "up");
          applyPose();
        },
        onLeave: () => {
          const detail = { id: step.id, type: "leave" as const, direction: "down" as const };
          window.dispatchEvent(new CustomEvent("scroll-story-step", { detail }));
          onStepLeave?.(step.id, "down");
        },
        onLeaveBack: () => {
          const detail = { id: step.id, type: "leave" as const, direction: "up" as const };
          window.dispatchEvent(new CustomEvent("scroll-story-step", { detail }));
          onStepLeave?.(step.id, "up");
        },
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(1, self.progress));
          const detail = { id: step.id, type: "progress" as const, progress };
          window.dispatchEvent(new CustomEvent("scroll-story-step", { detail }));
          onStepProgress?.(step.id, progress);

          if (i === 0 && progress > 0.15) {
            const handler = (window as Window & { scrollSceneSetPose?: (id?: string) => void }).scrollSceneSetPose;
            if (typeof handler === "function") handler(pose.pose);
          }
        },
      });

      triggers.push(trigger);
    });

    try {
      ScrollTrigger.refresh();
    } catch {
      // noop
    }

    return () => {
      triggers.forEach((trigger) => {
        try {
          trigger.kill();
        } catch {
          // noop
        }
      });

      if (pinTrigger) {
        try {
          pinTrigger.kill();
        } catch {
          // noop
        }
      }

      try {
        ScrollTrigger.refresh();
      } catch {
        // noop
      }
    };
  }, [steps, markers, pin, onStepEnter, onStepLeave, onStepProgress, totalSteps]);

  return (
    <section
      ref={containerRef}
      className={`scroll-story-wrap relative w-full overflow-visible pt-16 ${className}`}
      aria-roledescription="scroll-story"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-linear-to-b from-transparent via-(--border)/40 to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-0 top-0 h-24 w-full bg-linear-to-b from-[color-mix(in_oklab,var(--background)_92%,transparent)] to-transparent" aria-hidden="true" />

      {layoutSteps.map((step, index) => {
        const pose = storyPoseForStep(step.id, index, totalSteps);

        return (
          <article
            key={step.id}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            data-scroll-step-id={step.id}
            data-scroll-story-pose={index % 2 === 0 ? "left" : "right"}
            className={`scroll-story-step relative w-full ${step.className ?? ""}`}
          >
            <StoryShell section={step} index={index} count={totalSteps} />
          </article>
        );
      })}

      <style>{`
        .scroll-story-wrap {
          isolation: isolate;
        }

        .scroll-story-step {
          scroll-margin-top: 8rem;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        .scroll-story-step:first-child {
          padding-top: 2rem;
        }

        .scroll-story-step-shell {
          width: 100%;
          padding: 0.875rem 0;
        }

        .scroll-story-step:nth-child(odd) .scroll-story-step-shell {
          --story-step-shift: clamp(1rem, 4vw, 4rem);
        }

        .scroll-story-step:nth-child(even) .scroll-story-step-shell {
          --story-step-shift: clamp(-1rem, -4vw, -4rem);
        }

        .scroll-story-step-shell > div {
          transform: translateX(var(--story-step-shift, 0));
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-story-section {
          position: relative;
          display: grid;
          align-items: center;
          gap: clamp(1rem, 2vw, 1.5rem);
          width: 100%;
          grid-template-columns: minmax(0, 1fr) clamp(4rem, 7vw, 5.5rem) minmax(0, 1fr);
          transform: translate3d(0, 0, 0);
        }

        .scroll-story-section-track {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
          grid-column: 2;
          opacity: 0.9;
        }

        .scroll-story-section-track-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(
            180deg,
            transparent,
            color-mix(in oklab, var(--border) 82%, transparent),
            transparent
          );
        }

        .scroll-story-section-track-node {
          width: 0.95rem;
          height: 0.95rem;
          border-radius: 9999px;
          border: 1px solid color-mix(in oklab, var(--primary) 28%, var(--border));
          background: color-mix(in oklab, var(--card) 84%, transparent);
          box-shadow:
            0 0 0 0.42rem color-mix(in oklab, var(--primary) 12%, transparent),
            0 0 34px color-mix(in oklab, var(--primary) 20%, transparent),
            inset 0 1px 0 var(--inset-glint);
          display: block;
          animation: story-node-pulse 3.8s ease-in-out infinite;
          margin-inline: auto;
        }

        .scroll-story-section-content {
          min-width: 0;
          width: 100%;
          grid-column: 1;
        }

        .scroll-story-card {
          width: 100%;
          min-width: 0;
          max-width: min(100%, 72rem);
          width: 100%;
          border-radius: 1.9rem;
          border: 1px solid color-mix(in oklab, var(--border) 100%, transparent);
          background:
            linear-gradient(
              180deg,
              color-mix(in oklab, var(--card) 96%, transparent),
              color-mix(in oklab, var(--card) 82%, transparent)
            ),
            radial-gradient(
              circle at top left,
              color-mix(in oklab, var(--primary) 12%, transparent),
              transparent 34%
            );
          box-shadow:
            0 26px 70px -34px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 var(--inset-glint);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          overflow: hidden;
        }

        .scroll-story-card-inner {
          min-width: 0;
          padding: clamp(1rem, 2vw, 1.5rem);
        }

        .scroll-story-badge {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          align-self: center;
          margin-inline: auto;
          margin-bottom: 0.9rem;
          padding: 0.55rem 0.8rem;
          border-radius: 9999px;
          border: 1px solid color-mix(in oklab, var(--border) 100%, transparent);
          background: color-mix(in oklab, var(--card) 84%, transparent);
          box-shadow: inset 0 1px 0 var(--inset-glint);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .scroll-story-badge::before,
        .scroll-story-badge::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }

        .scroll-story-badge::before {
          background: linear-gradient(
            90deg,
            transparent 0%,
            color-mix(in oklab, var(--primary) 18%, transparent) 50%,
            transparent 100%
          );
          opacity: 0.3;
        }

        .scroll-story-badge::after {
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.14) 20%,
            transparent 40%
          );
          opacity: 0.25;
        }

        .scroll-story-badge-dot {
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
          width: 0.38rem;
          height: 0.38rem;
          border-radius: 9999px;
          background: var(--primary);
          box-shadow: 0 0 14px color-mix(in oklab, var(--primary) 50%, transparent);
          animation: divider-pulse 2.6s ease-in-out infinite;
        }

        .scroll-story-badge-dot-a {
          animation-delay: 0s;
          opacity: 0.95;
        }

        .scroll-story-badge-dot-b {
          width: 0.28rem;
          height: 0.28rem;
          background: color-mix(in oklab, var(--foreground) 62%, transparent);
          box-shadow: none;
          opacity: 0.6;
          animation-delay: 0.3s;
        }

        .scroll-story-badge-dot-c {
          animation-delay: 0.6s;
          opacity: 0.78;
        }

        .scroll-story-content {
          min-width: 0;
          margin-top: 0.9rem;
        }

        .scroll-story-sphere {
          position: relative;
          width: clamp(3.5rem, 7vw, 5rem);
          aspect-ratio: 1;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          justify-self: center;
          filter: saturate(1.1);
        }

        .scroll-story-sphere-core,
        .scroll-story-sphere-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
        }

        .scroll-story-sphere-core {
          inset: 22%;
          background:
            radial-gradient(circle at 30% 28%, color-mix(in oklab, var(--primary) 24%, white), transparent 26%),
            radial-gradient(
              circle at 50% 50%,
              color-mix(in oklab, var(--primary) 20%, transparent),
              color-mix(in oklab, var(--primary) 8%, transparent) 52%,
              transparent 72%
            ),
            linear-gradient(
              180deg,
              color-mix(in oklab, var(--card) 90%, transparent),
              color-mix(in oklab, var(--muted) 88%, transparent)
            );
          border: 1px solid color-mix(in oklab, var(--primary) 22%, var(--border));
          box-shadow:
            inset 0 1px 0 var(--inset-glint),
            0 10px 24px color-mix(in oklab, var(--primary) 10%, transparent),
            0 0 24px color-mix(in oklab, var(--primary) 10%, transparent);
          animation: story-sphere-core 6.5s ease-in-out infinite;
        }

        .scroll-story-sphere-ring {
          border: 1px solid color-mix(in oklab, var(--primary) 18%, transparent);
          box-shadow: inset 0 1px 0 var(--inset-glint);
        }

        .scroll-story-sphere-ring-a {
          inset: 0;
          transform: rotateX(65deg) rotateZ(0deg);
          background: radial-gradient(
            circle at center,
            transparent 60%,
            color-mix(in oklab, var(--primary) 10%, transparent) 61%,
            transparent 72%
          );
          animation: story-sphere-spin 20s linear infinite;
        }

        .scroll-story-sphere-ring-b {
          inset: 8%;
          transform: rotateY(65deg) rotateZ(30deg);
          background: radial-gradient(
            circle at center,
            transparent 62%,
            color-mix(in oklab, var(--primary) 12%, transparent) 63%,
            transparent 74%
          );
          animation: story-sphere-spin-reverse 26s linear infinite;
        }

        .scroll-story-section-track {
          grid-column: 2;
        }

        .scroll-story-section-track,
        .scroll-story-sphere {
          grid-row: 1;
        }

        .scroll-story-section-center .scroll-story-section-track {
          display: flex;
        }

        .scroll-story-section-center .scroll-story-sphere {
          display: none;
        }

        .scroll-story-card-left {
          width: 100%;
        }

        .scroll-story-card-right {
          width: 100%;
        }

        .scroll-story-card-center {
          width: 100%;
        }

        .scroll-story-step[data-scroll-story-pose="left"] .scroll-story-card,
        .scroll-story-step[data-scroll-story-pose="right"] .scroll-story-card,
        .scroll-story-step[data-scroll-story-pose="center"] .scroll-story-card {
          transition:
            transform 450ms cubic-bezier(0.2, 0.9, 0.15, 1),
            box-shadow 450ms cubic-bezier(0.2, 0.9, 0.15, 1),
            border-color 450ms ease,
            background 450ms ease;
        }

        .scroll-story-step:hover .scroll-story-card {
          transform: translate3d(0, -3px, 0);
          border-color: color-mix(in oklab, var(--primary) 22%, var(--border));
          box-shadow:
            0 32px 78px -36px rgba(0, 0, 0, 0.56),
            inset 0 1px 0 var(--inset-glint);
        }

        .scroll-story-step:hover .scroll-story-sphere-core {
          animation-duration: 4.8s;
        }

        @keyframes divider-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.14);
            opacity: 1;
          }
        }

        @keyframes story-node-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.82;
          }
          50% {
            transform: scale(1.18);
            opacity: 1;
          }
        }

        @keyframes story-sphere-core {
          0%,
          100% {
            transform: scale(1) translateY(0px);
          }
          50% {
            transform: scale(1.04) translateY(-4px);
          }
        }

        @keyframes story-sphere-spin {
          from {
            transform: rotate(0deg) rotateX(65deg);
          }
          to {
            transform: rotate(360deg) rotateX(65deg);
          }
        }

        @keyframes story-sphere-spin-reverse {
          from {
            transform: rotate(360deg) rotateY(65deg) rotateZ(30deg);
          }
          to {
            transform: rotate(0deg) rotateY(65deg) rotateZ(30deg);
          }
        }

        @media (max-width: 1023px) {
          .scroll-story-section,
          .scroll-story-section-left,
          .scroll-story-section-right,
          .scroll-story-section-center {
            grid-template-columns: minmax(0, 1fr);
          }

          .scroll-story-section-track,
          .scroll-story-sphere {
            display: none;
          }

          .scroll-story-section-content {
            grid-column: 1;
          }

          .scroll-story-card,
          .scroll-story-step[data-scroll-story-pose="left"] .scroll-story-card,
          .scroll-story-step[data-scroll-story-pose="right"] .scroll-story-card {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-story-sphere-core,
          .scroll-story-sphere-ring,
          .scroll-story-section-track-node,
          .scroll-story-badge::before,
          .scroll-story-badge::after,
          .scroll-story-badge-dot {
            animation: none;
          }

          .scroll-story-card,
          .scroll-story-step[data-scroll-story-pose="left"] .scroll-story-card,
          .scroll-story-step[data-scroll-story-pose="right"] .scroll-story-card,
          .scroll-story-step:hover .scroll-story-card {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}