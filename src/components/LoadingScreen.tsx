import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Text Component
function TextMesh({ children, position, scale = 1, color = '#ffffff' }: { 
  children: string; 
  position: [number, number, number]; 
  scale?: number; 
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Center position={position}>
      <Text
        ref={meshRef}
        fontSize={scale}
        color={hovered ? '#007AFF' : color}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {children}
      </Text>
    </Center>
  );
}

// Floating Particles
function FloatingParticles({ count = 100 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useRef(new THREE.Object3D());

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        tempObject.current.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        );
        tempObject.current.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        tempObject.current.scale.setScalar(Math.random() * 0.5 + 0.5);
        tempObject.current.updateMatrix();
        meshRef.current.setMatrixAt(i, tempObject.current.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        meshRef.current.getMatrixAt(i, tempObject.current.matrix);
        tempObject.current.rotation.y += 0.01;
        tempObject.current.rotation.x += 0.005;
        tempObject.current.updateMatrix();
        meshRef.current.setMatrixAt(i, tempObject.current.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#007AFF" metalness={0.8} roughness={0.2} />
    </instancedMesh>
  );
}

// Animated Background
function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial 
        color="#000011" 
        side={THREE.BackSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Main Loading Scene
function LoadingScene({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 2000);
    const timer2 = setTimeout(() => setPhase(2), 4000);
    const timer3 = setTimeout(() => {
      setPhase(3);
      setOpacity(0);
      setTimeout(onComplete, 1000);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      style={{ opacity }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#007AFF" />
        
        <AnimatedBackground />
        <FloatingParticles count={50} />
        
        {phase >= 1 && (
          <TextMesh 
            position={[0, 2, 0]} 
            scale={2} 
            color="#ffffff"
          >
            Saketh
          </TextMesh>
        )}
        
        {phase >= 2 && (
          <TextMesh 
            position={[0, -1, 0]} 
            scale={1.5} 
            color="#007AFF"
          >
            Dasavathini
          </TextMesh>
        )}
        
        {phase >= 3 && (
          <TextMesh 
            position={[0, -3, 0]} 
            scale={0.8} 
            color="#888888"
          >
            Full Stack Engineer
          </TextMesh>
        )}
        
        <Environment preset="night" />
      </Canvas>
      
      {/* Loading Progress */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
            style={{ 
              width: phase === 0 ? '25%' : phase === 1 ? '50%' : phase === 2 ? '75%' : '100%' 
            }}
          />
        </div>
        <p className="text-white text-center mt-4 text-sm">
          {phase === 0 ? 'Initializing...' : 
           phase === 1 ? 'Loading Experience...' : 
           phase === 2 ? 'Preparing Portfolio...' : 
           'Ready!'}
        </p>
      </div>
    </div>
  );
}

// Audio Component with ambient sound generation
function BackgroundAudio() {
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let oscillators: OscillatorNode[] = [];
    let gainNode: GainNode | null = null;

    const createAmbientSound = () => {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);

        // Create multiple oscillators for rich ambient sound
        const frequencies = [220, 330, 440, 550]; // A3, E4, A4, C#5
        const types: OscillatorType[] = ['sine', 'triangle', 'sawtooth', 'square'];

        frequencies.forEach((freq, index) => {
          const oscillator = audioContext!.createOscillator();
          oscillator.connect(gainNode!);
          oscillator.frequency.setValueAtTime(freq, audioContext!.currentTime);
          oscillator.type = types[index];
          oscillator.start();
          oscillators.push(oscillator);
        });

        // Add some modulation for movement
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        lfo.frequency.setValueAtTime(0.1, audioContext.currentTime);
        lfoGain.gain.setValueAtTime(0.1, audioContext.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(gainNode!.gain);
        lfo.start();
        oscillators.push(lfo);

      } catch (error) {
        console.log('Audio not supported or user interaction required');
      }
    };

    const playAudio = () => {
      createAmbientSound();
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
    };
    
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    
    return () => {
      oscillators.forEach(osc => osc.stop());
      if (audioContext) {
        audioContext.close();
      }
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
    };
  }, []);

  return null;
}

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <BackgroundAudio />
      <LoadingScene onComplete={onComplete} />
    </Suspense>
  );
};

export default LoadingScreen;