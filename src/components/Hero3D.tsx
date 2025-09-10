import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Floating Icons
function FloatingIcons() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const icons = [
    { position: [3, 2, -2], color: '#007AFF', scale: 0.5 },
    { position: [-3, 1, -1], color: '#5856d6', scale: 0.4 },
    { position: [2, -2, -3], color: '#af52de', scale: 0.6 },
    { position: [-2, -1, -2], color: '#30d158', scale: 0.3 },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.children.forEach((child, index) => {
        child.position.y = icons[index].position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
        child.rotation.x = Math.sin(state.clock.elapsedTime + index) * 0.1;
        child.rotation.z = Math.cos(state.clock.elapsedTime + index) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => (
        <mesh
          key={index}
          position={icon.position as [number, number, number]}
          scale={icon.scale}
          onPointerOver={() => setHovered(index)}
          onPointerOut={() => setHovered(null)}
        >
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color={hovered === index ? '#ffffff' : icon.color}
            metalness={0.8}
            roughness={0.2}
            emissive={hovered === index ? icon.color : '#000000'}
            emissiveIntensity={hovered === index ? 0.3 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

// Animated Background Sphere
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial
        color="#000011"
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Main 3D Hero Scene
function Hero3DScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#007AFF" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#5856d6" />
      
      <AnimatedSphere />
      <FloatingIcons />
      
      <Environment preset="night" />
    </Canvas>
  );
}

// Hero 3D Background Component
export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Hero3DScene />
    </div>
  );
}
