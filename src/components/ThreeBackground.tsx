import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating particles for background
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000);
    for (let i = 0; i < 2000; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#007AFF"
        size={0.005}
        sizeAttenuation={true}
        transparent
        opacity={0.6}
      />
    </points>
  );
}

// Animated geometric shapes
function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[2, 0, -5]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial 
          color="#007AFF" 
          metalness={0.8} 
          roughness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh position={[-2, 1, -3]}>
        <tetrahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#5856d6" 
          metalness={0.8} 
          roughness={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh position={[0, -1, -4]}>
        <icosahedronGeometry args={[0.4]} />
        <meshStandardMaterial 
          color="#af52de" 
          metalness={0.8} 
          roughness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// Main 3D Background Component
export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#007AFF" />
        
        <FloatingParticles />
        <AnimatedShapes />
      </Canvas>
    </div>
  );
}
