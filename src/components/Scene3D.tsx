'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import * as THREE from 'three'

// Simple 3D Go-Kart placeholder (will be replaced with actual model)
function GoKartModel() {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Main Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 0.8, 1.5]} />
        <meshStandardMaterial color="#FF4500" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Wheels */}
      {[[-1.2, 0, 1], [1.2, 0, 1], [-1.2, 0, -1], [1.2, 0, -1]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
      
      {/* Seat */}
      <mesh position={[0, 1, 0.2]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Steering Wheel */}
      <mesh position={[0, 1.5, 0.7]}>
        <torusGeometry args={[0.3, 0.05, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Interactive Hotspots */}
      <Html position={[1.5, 0.5, 0]} distanceFactor={10}>
        <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
          Engine: 750cc
        </div>
      </Html>
      
      <Html position={[-1.5, 0.5, 0]} distanceFactor={10}>
        <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
          Max Speed: 120 km/h
        </div>
      </Html>
    </group>
  )
}

// Floating particles effect
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  
  // Initialize particle positions
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#FF4500" />
    </points>
  )
}

// Camera controller for smooth movements
function CameraController() {
  return null
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        className="w-full h-full"
        camera={{ position: [0, 2, 5], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -10]} color="#FF4500" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00B7EB" intensity={0.3} />

        {/* 3D Models */}
        <GoKartModel />
        <ParticleField />
        
        {/* Environment */}
        <Environment preset="night" />
        
        {/* Controls - disabled auto-rotation for better UX */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}