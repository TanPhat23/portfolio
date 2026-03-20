import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type StoryTrackProps = {
  showSphere?: boolean;
  position?: "left" | "right";
};

type OrbTheme = {
  lift: number;
  scale: number;
  rotation: number;
  tint: string;
  emissive: string;
  ringOpacity: number;
  glowOpacity: number;
  light: string;
  x: number;
  y: number;
};

const ORB_THEMES: OrbTheme[] = [
  {
    lift: 0,
    scale: 1,
    rotation: 0,
    tint: "#0f172a",
    emissive: "#64748b",
    ringOpacity: 0.14,
    glowOpacity: 0.22,
    light: "#f8fafc",
    x: 0,
    y: 0,
  },
  {
    lift: 0.16,
    scale: 1.05,
    rotation: 0.7,
    tint: "#111827",
    emissive: "#94a3b8",
    ringOpacity: 0.18,
    glowOpacity: 0.28,
    light: "#e2e8f0",
    x: 0.12,
    y: -0.04,
  },
  {
    lift: 0.34,
    scale: 1.1,
    rotation: 1.35,
    tint: "#1e293b",
    emissive: "#cbd5e1",
    ringOpacity: 0.22,
    glowOpacity: 0.34,
    light: "#ffffff",
    x: -0.16,
    y: 0.08,
  },
  {
    lift: 0.22,
    scale: 1.06,
    rotation: 2.1,
    tint: "#111827",
    emissive: "#94a3b8",
    ringOpacity: 0.18,
    glowOpacity: 0.3,
    light: "#f8fafc",
    x: 0.08,
    y: 0.02,
  },
];

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(a: string, b: string, t: number) {
  const colorA = new THREE.Color(a);
  const colorB = new THREE.Color(b);
  return colorA.lerp(colorB, t).getStyle();
}

function getOrbTheme(progress: number): OrbTheme {
  const segments = ORB_THEMES.length - 1;
  const scaled = clamp01(progress) * segments;
  const index = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - index;
  const current = ORB_THEMES[index];
  const next = ORB_THEMES[index + 1];

  return {
    lift: lerp(current.lift, next.lift, localT),
    scale: lerp(current.scale, next.scale, localT),
    rotation: lerp(current.rotation, next.rotation, localT),
    tint: lerpColor(current.tint, next.tint, localT),
    emissive: lerpColor(current.emissive, next.emissive, localT),
    ringOpacity: lerp(current.ringOpacity, next.ringOpacity, localT),
    glowOpacity: lerp(current.glowOpacity, next.glowOpacity, localT),
    light: lerpColor(current.light, next.light, localT),
    x: lerp(current.x, next.x, localT),
    y: lerp(current.y, next.y, localT),
  };
}

function DarkGlassOrb({
  progress = 0,
  targetProgress = 0,
}: {
  progress?: number;
  targetProgress?: number;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const theme = useMemo(() => getOrbTheme(progress), [progress]);
  const targetTheme = useMemo(() => getOrbTheme(targetProgress), [targetProgress]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const blended = {
      lift: lerp(theme.lift, targetTheme.lift, 0.18),
      scale: lerp(theme.scale, targetTheme.scale, 0.18),
      rotation: lerp(theme.rotation, targetTheme.rotation, 0.18),
      tint: lerpColor(theme.tint, targetTheme.tint, 0.18),
      emissive: lerpColor(theme.emissive, targetTheme.emissive, 0.18),
      ringOpacity: lerp(theme.ringOpacity, targetTheme.ringOpacity, 0.18),
      glowOpacity: lerp(theme.glowOpacity, targetTheme.glowOpacity, 0.18),
      light: lerpColor(theme.light, targetTheme.light, 0.18),
      x: lerp(theme.x, targetTheme.x, 0.18),
      y: lerp(theme.y, targetTheme.y, 0.18),
    };

    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.08 + blended.rotation;
      rootRef.current.rotation.x = Math.sin(t * 0.1) * 0.02 - blended.lift * 0.08;
      rootRef.current.position.y = Math.sin(t * 0.22) * 0.05 + blended.y - blended.lift * 0.12;
      rootRef.current.position.x = Math.sin(blended.rotation) * 0.03 + blended.x;
      rootRef.current.scale.setScalar(blended.scale);
    }

    if (glassRef.current) {
      glassRef.current.rotation.y = t * 0.06 + blended.rotation * 0.35;
      glassRef.current.rotation.z = blended.lift * 0.08;
      const mat = glassRef.current.material;
      if (mat && "color" in mat) {
        mat.color = new THREE.Color(blended.tint);
        if ("attenuationColor" in mat) mat.attenuationColor = new THREE.Color(blended.emissive);
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.14 + blended.rotation * 0.45;
      ringRef.current.rotation.z = t * 0.07 + blended.rotation * 0.2;
      ringRef.current.position.x = blended.x * 0.75;
      ringRef.current.position.y = blended.y * 0.5;
      const mat = ringRef.current.material;
      if (mat && "opacity" in mat) mat.opacity = blended.ringOpacity + 0.02;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.01 + blended.lift * 0.08);
      glowRef.current.rotation.y += delta * 0.04;
      glowRef.current.position.x = blended.x * 0.35;
      glowRef.current.position.y = blended.y * 0.35;
      const material = glowRef.current.material;
      if (material && "opacity" in material) {
        material.opacity = blended.glowOpacity;
      }
    }
  });

  return (
    <group ref={rootRef}>
      <mesh ref={glassRef}>
        <sphereGeometry args={[1.95, 72, 72]} />
        <meshPhysicalMaterial
          color={theme.tint}
          roughness={0.28}
          metalness={0.03}
          transmission={0.92}
          thickness={1.15}
          clearcoat={0.3}
          clearcoatRoughness={0.24}
          ior={1.3}
          attenuationColor={theme.emissive}
          attenuationDistance={6.2}
          specularIntensity={0.58}
          envMapIntensity={0.45}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.18, 48, 48]} />
        <meshStandardMaterial
          color="#111827"
          emissive={theme.emissive}
          emissiveIntensity={0.2}
          roughness={1}
          metalness={0}
          transparent
          opacity={theme.glowOpacity}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.2, 0.4, 0]}>
        <torusGeometry args={[2.1, 0.035, 12, 220]} />
        <meshStandardMaterial
          color="#cbd5e1"
          emissive={theme.light}
          emissiveIntensity={0.14}
          transparent
          opacity={theme.ringOpacity}
          roughness={0.38}
          metalness={0.18}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[0.85, 0.25, 0]}>
        <torusGeometry args={[2.18, 0.025, 10, 220]} />
        <meshStandardMaterial
          color={theme.light}
          transparent
          opacity={theme.ringOpacity + 0.02}
          roughness={0.34}
          metalness={0.16}
        />
      </mesh>

      <mesh position={[-0.78, 0.72, 1.05]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.65} />
      </mesh>

      <mesh position={[0.88, -0.34, 0.95]}>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

function OrbScene() {
  const [progress, setProgress] = React.useState(0);
  const [targetProgress, setTargetProgress] = React.useState(0);

  useEffect(() => {
    const handleScrollStory = (event: Event) => {
      const customEvent = event as CustomEvent<{ progress?: number }>;
      setTargetProgress(clamp01(customEvent.detail?.progress ?? 0));
    };

    window.addEventListener("scroll-story-step", handleScrollStory as EventListener);
    return () => window.removeEventListener("scroll-story-step", handleScrollStory as EventListener);
  }, []);

  useFrame(() => {
    setProgress((current) => current + (targetProgress - current) * 0.14);
  });

  return <DarkGlassOrb progress={progress} targetProgress={targetProgress} />;
}

function StepSphere() {
  return (
    <div
      className="relative grid aspect-square w-[clamp(8rem,16vw,12rem)] flex-[0_0_auto] place-items-center justify-self-center saturate-[0.92] brightness-[1.04] contrast-[0.98] opacity-[0.98]"
      aria-hidden="true"
    >
      <div className="absolute inset-[9%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(248,250,252,0.22),rgba(148,163,184,0.08)_46%,transparent_78%)] blur-2xl" />
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 34 }}
        style={{ width: "100%", height: "100%", pointerEvents: "none", background: "transparent" }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.88} />
        <directionalLight position={[4, 5, 7]} intensity={1.05} color="#f8fafc" />
        <directionalLight position={[-5, -3, 4]} intensity={0.42} color="#94a3b8" />
        <pointLight position={[0, 0, 5]} intensity={4.2} color="#f8fafc" distance={12} />
        <pointLight position={[-3, 2, 3]} intensity={1.8} color="#cbd5e1" distance={10} />
        <pointLight position={[3, -2, 2]} intensity={1.2} color="#ffffff" distance={8} />
        <OrbScene />
      </Canvas>
    </div>
  );
}

export default function StoryTrack({ showSphere = true, position = "left" }: StoryTrackProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid h-full w-full grid-cols-[minmax(0,1fr)_clamp(4rem,7vw,5.5rem)_minmax(0,1fr)] items-center">
      {showSphere ? (
        <div
          className={
            position === "left"
              ? "col-start-3 row-start-1 justify-self-start pl-4"
              : "col-start-1 row-start-1 justify-self-end pr-4"
          }
        >
          {/*<StepSphere />*/}
        </div>
      ) : null}
    </div>
  );
}