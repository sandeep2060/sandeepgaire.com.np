import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Inner Data Core */}
        <mesh>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial 
            color="#f97316" 
            emissive="#f97316"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Outer Tech Wireframe Shell */}
        <mesh>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial 
            color="#0ea5e9" 
            wireframe 
            emissive="#0ea5e9"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Orbital Ring */}
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.8 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0ea5e9" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#db2777" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <AnimatedShape />
      </Canvas>
    </div>
  );
};

export default Hero3D;
