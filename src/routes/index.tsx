import { createFileRoute } from "@tanstack/react-router";

import Hero from "#/components/Hero";
import ScrollStory from "#/components/ScrollStory";
import AboutPanel from "#/components/sections/AboutPanel";
import CoreStats from "#/components/sections/CoreStats";
import ContactSection from "#/components/sections/ContactSection";

import ProjectsSection from "#/components/sections/ProjectsSection";
import SkillsSection from "#/components/sections/SkillsSection";
import ExperienceSection from "#/components/sections/ExperienceSection";

export const Route = createFileRoute("/")({ component: PortfolioHome });

const storySteps = [
  {
    id: "about-core",
    content: (
      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <AboutPanel />
        <CoreStats />
      </section>
    ),
  },
  {
    id: "projects",
    content: <ProjectsSection />,
  },
  {
    id: "skills",
    content: <SkillsSection />,
  },
  {
    id: "experience",
    content: <ExperienceSection />,
  },
  {
    id: "contact",
    content: <ContactSection />,
  },
];

export function PortfolioHome() {
  return (
    <main className="relative w-full ">
      <Hero />

      <ScrollStory steps={storySteps} className="w-full py-2" />
    </main>
  );
}
