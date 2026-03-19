import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type EngineeringSphereProps = {
  className?: string
}

function SphereScene() {
  const coreRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const clusterRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const points = useMemo(() => {
    const count = 180
    const data = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      const r = 2.3 + Math.random() * 0.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      data[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      data[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      data[i * 3 + 2] = r * Math.cos(phi)
    }

    return data
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (clusterRef.current) {
      clusterRef.current.rotation.y += delta * 0.14
      clusterRef.current.rotation.x = Math.sin(t * 0.35) * 0.12
      clusterRef.current.position.y = Math.sin(t * 0.9) * 0.06
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3
      coreRef.current.rotation.z = Math.sin(t * 0.5) * 0.08
      coreRef.current.scale.lerp(
        new THREE.Vector3(hovered ? 1.08 : 1, hovered ? 1.08 : 1, hovered ? 1.08 : 1),
        0.08,
      )
    }

    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.18
      wireRef.current.rotation.x = Math.cos(t * 0.28) * 0.06
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12
      ringRef.current.rotation.y = Math.sin(t * 0.22) * 0.24
    }
  })

  return (
    <group
      ref={clusterRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.25, 48, 48]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.78}
          roughness={0.16}
          emissive="#2563eb"
          emissiveIntensity={hovered ? 0.3 : 0.16}
        />
      </mesh>

      <mesh ref={wireRef}>
        <sphereGeometry args={[1.52, 24, 24]} />
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={hovered ? 0.7 : 0.45}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[0.9, 0.2, 0]}>
        <torusGeometry args={[1.82, 0.04, 16, 120]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.7}
          metalness={0.86}
          roughness={0.16}
        />
      </mesh>

      <mesh rotation={[0.25, 0.9, 0]}>
        <torusGeometry args={[1.52, 0.025, 10, 120]} />
        <meshBasicMaterial color="#a5f3fc" transparent opacity={0.4} />
      </mesh>

      <pointLight position={[3.5, 3, 3]} intensity={1.4} color="#60a5fa" />
      <pointLight position={[-3, -2, -1]} intensity={0.9} color="#22c55e" />
      <ambientLight intensity={0.45} />

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={points}
            count={points.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#93c5fd"
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      {[
        [2.55, 0.35, 0.15],
        [-2.35, -0.72, 0.35],
        [0.2, 2.2, -0.1],
        [0.25, -2.15, -0.48],
      ].map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]} rotation={[0.45, 0.35, 0.2]}>
          <torusGeometry args={[0.14, 0.035, 10, 24]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.75}
            metalness={0.88}
            roughness={0.12}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function EngineeringSphere({ className }: EngineeringSphereProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '320px',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 7, 15]} />
        <SphereScene />
      </Canvas>
    </div>
  )
}