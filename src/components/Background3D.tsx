"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

function NeuralParticles({ count = 600 }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 40;
      pos[i + 1] = (Math.random() - 0.5) * 40;
      pos[i + 2] = (Math.random() - 0.5) * 30;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#00f0ff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function AuroraWaves() {
  const meshRef = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.3) * 1.5;
      meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.1;
    }
    if (meshRef2.current) {
      meshRef2.current.position.y = Math.sin(t * 0.25 + 1) * 1.8;
      meshRef2.current.rotation.z = Math.sin(t * 0.12 + 0.5) * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, -2, -8]}>
        <planeGeometry args={[25, 6, 64, 64]} />
        <MeshDistortMaterial
          color="#00f0ff"
          transparent
          opacity={0.08}
          distort={0.3}
          speed={2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={meshRef2} position={[0, -1, -6]}>
        <planeGeometry args={[20, 5, 64, 64]} />
        <MeshDistortMaterial
          color="#b829dd"
          transparent
          opacity={0.06}
          distort={0.4}
          speed={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function NeuralNodes() {
  const nodes = useMemo(() => {
    const arr: { position: [number, number, number]; scale: number; color: string }[] = [];
    for (let i = 0; i < 30; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 - 5,
        ],
        scale: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.5 ? "#00f0ff" : "#b829dd",
      });
    }
    return arr;
  }, []);

  const connections = useMemo(() => {
    const conns: { from: THREE.Vector3; to: THREE.Vector3 }[] = [];
    for (let i = 0; i < 40; i++) {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      while (to === from) to = Math.floor(Math.random() * nodes.length);
      const fromPos = new THREE.Vector3(...nodes[from].position);
      const toPos = new THREE.Vector3(...nodes[to].position);
      const dist = fromPos.distanceTo(toPos);
      if (dist < 8) {
        conns.push({ from: fromPos, to: toPos });
      }
    }
    return conns;
  }, [nodes]);

  return (
    <group>
      {nodes.map((node, i) => (
        <Float key={i} speed={0.5 + Math.random() * 0.5} rotationIntensity={0.05} floatIntensity={0.3}>
          <mesh position={node.position} scale={node.scale}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.7} />
          </mesh>
        </Float>
      ))}
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.from, conn.to]}
          color="#00f0ff"
          transparent
          opacity={0.08}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function SynapticFire({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const pos = new Float32Array(100 * 3);
    for (let i = 0; i < 100 * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 2;
      pos[i + 1] = (Math.random() - 0.5) * 2;
      pos[i + 2] = (Math.random() - 0.5) * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const tx = (mouse?.current?.x || 0) * 2;
    const ty = -(mouse?.current?.y || 0) * 2;
    ref.current.position.x += (tx - ref.current.position.x) * 0.02;
    ref.current.position.y += (ty - ref.current.position.y) * 0.02;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#ff006e"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function DarkBackground() {
  const { scene } = useThree();

  useEffect(() => {
    const update = () => {
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      scene.background = new THREE.Color(isDark ? "#050508" : "#faf8f5");
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, [scene]);

  return null;
}

function ThreeScene({ mouse, isMobile }: { mouse: React.MutableRefObject<{ x: number; y: number }>; isMobile: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
      className="!absolute inset-0 w-full h-full"
    >
      <DarkBackground />
      <NeuralParticles count={isMobile ? 200 : 600} />
      <AuroraWaves />
      <NeuralNodes />
      {!isMobile && <SynapticFire mouse={mouse} />}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </Canvas>
  );
}

export default function Background3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const [crashed, setCrashed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    const timer = setTimeout(() => setReady(true), 100);
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  if (crashed || !ready) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <ThreeScene mouse={mouse} isMobile={isMobile} />
    </div>
  );
}
