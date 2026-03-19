# 🚀 TanStack Start Portfolio Setup Guide
## Updated for Tailwind CSS v4 + Latest shadcn/ui + Developer-Focused 3D

This guide documents the setup for your portfolio project using **TanStack Start**, **Tailwind CSS v4**, **latest shadcn/ui**, and modern theming via CSS variables. It also defines a complete 3D system tailored for an engineering and fullstack developer portfolio.

---

## 1) Recommended Stack

- **TanStack Start** for routing, SSR, and full-stack React
- **TanStack Router** for type-safe file-based routing
- **TanStack Query** for data fetching and caching
- **Tailwind CSS v4** for styling
- **shadcn/ui** for reusable UI components
- **Lucide React** for icons
- **Framer Motion** for UI motion and transitions
- **Three.js / React Three Fiber** for 3D scenes and effects

---

## 2) Important Styling Approach

This project should use the **Tailwind v4 CSS-first workflow**:

- Use `@import "tailwindcss";` in the global stylesheet
- Keep theme tokens in CSS variables
- Use `@theme inline` to expose tokens to utilities
- shadcn/ui should read from CSS variables for colors, radii, borders, and shadows
- Dark mode is controlled by the `.dark` class
- Prefer utility classes inside components for flexibility
- Use `@apply` only for shared base styles or small utility groups

---

## 3) Install Dependencies

```bash
npm create tanstack-start@latest portfolio
cd portfolio

npm install

npm install three @react-three/fiber @react-three/drei framer-motion lucide-react
npm install @tanstack/react-query @tanstack/react-router @tanstack/start

npm install clsx class-variance-authority tailwind-merge
npm install zod react-hook-form @hookform/resolvers

npm install -D tailwindcss @tailwindcss/vite
```

If you are using the latest shadcn/ui CLI, initialize it after the project is ready.

---

## 4) Initialize shadcn/ui

Use the latest shadcn setup and enable CSS variables.

Suggested `components.json`:

```json
{
  "style": "new-york",
  "rsc": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

Recommended components to add first:

```bash
npx shadcn@latest add button card badge separator tabs dialog sheet dropdown-menu tooltip progress input textarea form label scroll-area progress avatar navigation-menu sheet toast skeleton
```

Suggested starter additions for this portfolio:
- `button`
- `card`
- `badge`
- `separator`
- `tabs`
- `dialog`
- `sheet`
- `dropdown-menu`
- `tooltip`
- `progress`
- `input`
- `textarea`
- `form`
- `label`
- `scroll-area`
- `avatar`
- `navigation-menu`
- `toast`
- `skeleton`

---

## 5) Global CSS for Tailwind v4 + shadcn/ui

Your global stylesheet should use the Tailwind v4 import and CSS tokens.

Use this structure:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.375rem;

  --background: rgb(255, 255, 255);
  --foreground: rgb(51, 51, 51);
  --card: rgb(255, 255, 255);
  --card-foreground: rgb(51, 51, 51);
  --popover: rgb(255, 255, 255);
  --popover-foreground: rgb(51, 51, 51);
  --primary: rgb(59, 130, 246);
  --primary-foreground: rgb(255, 255, 255);
  --secondary: rgb(243, 244, 246);
  --secondary-foreground: rgb(75, 85, 99);
  --muted: rgb(249, 250, 251);
  --muted-foreground: rgb(107, 114, 128);
  --accent: rgb(224, 242, 254);
  --accent-foreground: rgb(30, 58, 138);
  --destructive: rgb(239, 68, 68);
  --destructive-foreground: rgb(255, 255, 255);
  --border: rgb(229, 231, 235);
  --input: rgb(229, 231, 235);
  --ring: rgb(59, 130, 246);

  --chart-1: rgb(59, 130, 246);
  --chart-2: rgb(37, 99, 235);
  --chart-3: rgb(29, 78, 216);
  --chart-4: rgb(30, 64, 175);
  --chart-5: rgb(30, 58, 138);

  --sidebar: rgb(249, 250, 251);
  --sidebar-foreground: rgb(51, 51, 51);
  --sidebar-primary: rgb(59, 130, 246);
  --sidebar-primary-foreground: rgb(255, 255, 255);
  --sidebar-accent: rgb(224, 242, 254);
  --sidebar-accent-foreground: rgb(30, 58, 138);
  --sidebar-border: rgb(229, 231, 235);
  --sidebar-ring: rgb(59, 130, 246);

  --font-sans: Inter, sans-serif;
  --font-serif: "Source Serif 4", serif;
  --font-mono: "JetBrains Mono", monospace;
}

.dark {
  --background: rgb(23, 23, 23);
  --foreground: rgb(229, 229, 229);
  --card: rgb(38, 38, 38);
  --card-foreground: rgb(229, 229, 229);
  --popover: rgb(38, 38, 38);
  --popover-foreground: rgb(229, 229, 229);
  --primary: rgb(59, 130, 246);
  --primary-foreground: rgb(255, 255, 255);
  --secondary: rgb(38, 38, 38);
  --secondary-foreground: rgb(229, 229, 229);
  --muted: rgb(31, 31, 31);
  --muted-foreground: rgb(163, 163, 163);
  --accent: rgb(30, 58, 138);
  --accent-foreground: rgb(191, 219, 254);
  --destructive: rgb(239, 68, 68);
  --destructive-foreground: rgb(255, 255, 255);
  --border: rgb(64, 64, 64);
  --input: rgb(64, 64, 64);
  --ring: rgb(59, 130, 246);

  --chart-1: rgb(96, 165, 250);
  --chart-2: rgb(59, 130, 246);
  --chart-3: rgb(37, 99, 235);
  --chart-4: rgb(29, 78, 216);
  --chart-5: rgb(30, 64, 175);

  --sidebar: rgb(23, 23, 23);
  --sidebar-foreground: rgb(229, 229, 229);
  --sidebar-primary: rgb(59, 130, 246);
  --sidebar-primary-foreground: rgb(255, 255, 255);
  --sidebar-accent: rgb(30, 58, 138);
  --sidebar-accent-foreground: rgb(191, 219, 254);
  --sidebar-border: rgb(64, 64, 64);
  --sidebar-ring: rgb(59, 130, 246);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 6) Tailwind v4 Notes

With Tailwind v4:

- use `@import "tailwindcss";`
- define tokens with `@theme inline`
- keep design tokens in CSS variables
- use `@apply` only where it improves reuse
- prefer utility classes in components for flexibility and easier shadcn compatibility

If needed, add animation helpers in the same CSS file or a separate one.

---

## 7) Theme Strategy

Use a simple theme model:

- default light mode
- `.dark` class for dark mode
- theme toggle stored in `localStorage`
- component colors should rely on CSS variables, not hardcoded hex values

This works well with shadcn/ui because the components are designed around CSS-variable theming.

---

## 8) Suggested Component Library Setup

For this portfolio, the most useful shadcn/ui components are:

- `button`
- `card`
- `badge`
- `separator`
- `tabs`
- `dialog`
- `sheet`
- `dropdown-menu`
- `tooltip`
- `progress`
- `input`
- `textarea`
- `form`
- `label`
- `scroll-area`
- `avatar`
- `navigation-menu`
- `toast`
- `skeleton`

These will cover:
- hero CTAs
- project cards
- filters
- modals
- contact form
- skill progress bars
- mobile navigation
- loading states
- subtle feedback

---

## 9) Portfolio Content Structure

### Hero
- Name
- Role
- Short intro
- CTA buttons
- subtle 3D accent

### About
- who you are
- what you focus on
- summary of experience
- education

### Projects
- project gallery
- hover animations
- modal details
- live/demo links

### Skills
- grouped skill cards
- progress bars
- badges
- category tabs

### Experience
- internship timeline
- education timeline
- achievements

### Contact
- form
- email
- social links

---

## 10) Skills Experience Levels

For your profile, use a slightly more balanced skill profile:

- keep **React.js** high
- keep **Next.js** high
- lower the rest a bit to stay realistic
- keep **AWS** moderate since it’s based on internship experience
- keep **TanStack Start / Query / Router** at working level

That gives your portfolio a more credible and polished presentation.

---

## 11) Complete 3D Portfolio Direction

This portfolio should feel like a **developer control center** with refined technical depth. The 3D layer should reinforce engineering credibility rather than act as decoration.

### 11.1 Core 3D Theme: `Developer Core`

The 3D identity of the site should combine:
- wireframe geometry
- data-grid surfaces
- node graphs
- modular panels
- soft scan lines
- cool blue accent lighting

Avoid:
- overly colorful abstract art
- cartoon-like shapes
- too many moving objects
- distracting background motion

---

### 11.2 3D Scene Architecture

Use three core 3D systems:

#### A. Hero Scene
- central engineering core object
- orbiting nodes or rings
- subtle camera drift
- mouse-parallax
- light particle field

#### B. Background Scene
- perspective grid
- moving dots
- connection lines
- faint depth fog
- slow ambient motion

#### C. Card-Level 3D
- hover tilt on project cards
- elevated depth on skills tiles
- soft glow on interaction
- modal expansion effect

---

### 11.3 Suggested 3D File Structure

```md
app/
  components/
    3d/
      scene/
        HeroScene.tsx
        GridBackground.tsx
        NodeNetwork.tsx
        CameraRig.tsx
      objects/
        EngineeringCore.tsx
        FloatingNodes.tsx
        DataPillars.tsx
        OrbitRing.tsx
      effects/
        ParticleField.tsx
        ScanLines.tsx
        GlowMaterial.tsx
      cards/
        ProjectCard3D.tsx
        SkillTile3D.tsx
        ExperienceNode3D.tsx
      hooks/
        usePointerParallax.ts
        useReducedMotion.ts
        useViewportQuality.ts
      constants/
        sceneConfig.ts
        colors.ts
        geometry.ts
```

---

### 11.4 Hero Scene: `Engineering Core`

#### Purpose
This is the visual anchor of the homepage.

#### Object idea
Use one of these:
- wireframe cube
- modular core
- technical ring cluster
- connected node lattice

#### Best fit for your portfolio
Use a **modular wireframe core** with orbiting nodes and a faint glow.

#### Motion behavior
- slow rotation
- cursor-reactive tilt
- slight scale pulse
- section-aware camera shift
- soft entry animation on load

#### Visual language
- blue/cyan highlight
- transparent dark glass feel
- thin wireframe edges
- minimal but high-end

---

### 11.5 Background Scene: Grid + Node Network

#### Purpose
Set the tone of a technical workspace.

#### Elements
- perspective grid plane
- particle nodes
- connector lines
- faint floating points
- ambient haze

#### Rules
- low opacity
- slow movement
- never compete with the hero text
- adapt to motion preference and device performance

---

### 11.6 Project Cards: Depth + Hover Tilt

#### Purpose
Make projects feel like polished engineering deliverables.

#### Behavior
- card lifts in 3D on hover
- pointer tracking tilt
- border glow
- image zoom
- click opens a modal with expanded details

#### Visual style
- soft shadows
- glass or surface panel look
- badge chips
- subtle outline highlights

---

### 11.7 Skills Section: Modular 3D Tiles

#### Purpose
Present your stack in a structured, technical way.

#### Tile concept
Each group becomes a module:
- Frontend
- Backend
- DevOps
- Database
- 3D/Animation

#### Behavior
- hover expansion
- subtle rotation
- progress bars inside the tile
- accent glow on focus

---

### 11.8 Experience Timeline: System Trace

#### Purpose
Make your growth feel like engineering progression.

#### Visual style
- glowing vertical line
- animated nodes
- event cards with depth
- soft connector animation
- subtle scan reveal on scroll

---

### 11.9 Contact Section: Control Panel

#### Purpose
Keep contact professional and clean.

#### Style
- shadcn card
- shallow depth effect
- compact layout
- input focus glow
- optional terminal-style side note

#### Motion
- subtle float
- mild tilt
- success feedback animation

---

### 11.10 Materials and Lighting

#### Recommended materials
- `MeshStandardMaterial`
- `MeshPhysicalMaterial`
- wireframe materials
- translucent panel materials

#### Lighting setup
- 1 ambient light
- 1 directional light
- 1 rim light
- 1 accent point light
- optional soft fog

#### Lighting style
- cool blue accents
- soft highlights
- low contrast shadows
- polished but restrained

---

### 11.11 Geometry Strategy

Prefer simple, efficient geometry:
- `BoxGeometry`
- `SphereGeometry`
- `TorusGeometry`
- `PlaneGeometry`
- `IcosahedronGeometry`
- `BufferGeometry` for particles and lines

Rule:
- keep geometry lightweight
- use instancing for repeated elements
- avoid overcomplicated meshes

---

### 11.12 Motion System

#### Motion types
- slow rotation
- drift
- hover tilt
- camera shift
- pulsing nodes
- line drawing
- parallax scroll

#### Timing guidance
- hero core rotation: continuous, slow
- particle motion: continuous, very subtle
- hover tilt: responsive, short
- section reveal: 0.5s to 1s
- modal transitions: smooth and minimal

---

### 11.13 Interaction Model

#### Mouse interactions
- move cursor = slight tilt
- hover = glow and depth increase
- click = open modal or expand panel

#### Scroll interactions
- shift camera slightly
- reveal nodes and lines
- animate in section content
- adjust background parallax

#### Accessibility
- support `prefers-reduced-motion`
- provide static fallbacks
- ensure key content remains accessible without WebGL
- keep text and controls usable on all devices

---

### 11.14 Responsive Strategy

#### Desktop
- full 3D hero
- richer particle network
- hover tilt cards
- deeper motion set

#### Tablet
- fewer particles
- simpler core object
- reduced motion complexity

#### Mobile
- minimal background scene
- very light particles
- no expensive effects
- readable content first

---

### 11.15 Quality Levels

Implement three quality tiers:

#### High
- desktop
- full particle field
- more nodes
- optional soft postprocessing

#### Medium
- tablets
- fewer particles
- simplified lighting

#### Low
- mobile
- minimal geometry
- no postprocessing
- reduced motion count

---

### 11.16 Motion Flow by Section

#### On load
1. hero scene fades in
2. core object rotates into view
3. particles appear
4. headline and CTA animate
5. rest of content enters progressively

#### On hover
1. element lifts
2. glow appears
3. depth increases
4. interaction feedback is immediate

#### On scroll
1. scene shifts subtly
2. grid moves in perspective
3. cards and nodes reveal
4. timeline animates in sequence

---

### 11.17 Recommended 3D Component List

- `HeroScene`
- `EngineeringCore`
- `ParticleField`
- `GridBackground`
- `NodeNetwork`
- `ProjectCard3D`
- `SkillTile3D`
- `TimelineNode3D`
- `CameraRig`
- `SceneQualityManager`

---

### 11.18 3D Performance Rules

- lazy-load 3D sections
- use one main canvas per major area
- cap particle count
- simplify geometry on mobile
- avoid heavy postprocessing by default
- respect reduced motion preferences
- test on low-end hardware

---

### 11.19 Best Implementation Order for 3D

1. build theme and layout
2. initialize shadcn/ui
3. add the hero 3D scene
4. add grid and particle background
5. add project card tilt
6. add skill tiles
7. add experience timeline motion
8. add contact panel effects
9. add performance controls
10. test responsiveness
11. refine and polish

---

## 12) Recommended Development Order

1. Set up TanStack Start project
2. Add Tailwind v4 global styles
3. Initialize shadcn/ui
4. Add core components
5. Build navigation and layout
6. Build hero section
7. Build projects gallery
8. Build about/experience
9. Build contact form
10. Add 3D effects last
11. Optimize performance and responsiveness

---

## 13) Final Notes

For the best result:

- keep the UI clean and modern
- use shadcn/ui for consistency
- let Tailwind v4 handle the design tokens
- use 3D effects sparingly
- prioritize content readability and speed

The best visual direction for your portfolio is:

> **a developer control center with elegant technical depth**

---

## 14) Next Files to Create

When you're ready, the best next files are:

- `globals.css`
- `components.json`
- `tailwind config`
- `layout/navbar`
- `hero section`
- `projects gallery`
- `3D scene components`

---

**Status:** Updated for Tailwind v4 + latest shadcn/ui  
**Recommended style:** `new-york` + CSS variables + dark mode tokens  
**3D direction:** `Developer Core`