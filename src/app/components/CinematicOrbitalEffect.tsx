'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicOrbitalEffectProps {
  quote: string;
  author?: string;
}

export default function CinematicOrbitalEffect({ quote, author }: CinematicOrbitalEffectProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const filamentsRef = useRef<THREE.Line[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - cinematic positioning
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    // Renderer setup with full transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      premultipliedAlpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create ultra-thin cinematic filaments
    const cinematicLayers = [
      { count: 6, radius: 10, speed: 0.0008, opacity: 0.6, color: [0.95, 0.9, 1.0], width: 0.5 },   // Close - soft white
      { count: 10, radius: 15, speed: 0.0006, opacity: 0.4, color: [0.85, 0.9, 1.0], width: 0.4 },  // Mid - light blue
      { count: 14, radius: 20, speed: 0.0004, opacity: 0.25, color: [0.8, 0.85, 1.0], width: 0.3 }, // Far - very light
    ];

    cinematicLayers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const points = [];
        const segments = 80;
        
        // Create smooth orbital paths
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          
          // Cinematic orbital equations
          const angle = t * Math.PI * 2 + (i * Math.PI * 2) / layer.count;
          const ellipticalFactor = 1 + Math.sin(angle * 1.5) * 0.1; // Subtle ellipse
          
          // Smooth radius with gentle wave
          const baseRadius = layer.radius * ellipticalFactor;
          const waveOffset = Math.sin(t * Math.PI * 3 + i * 0.3) * 1.5; // Gentle wave
          const radius = baseRadius + waveOffset;
          
          // 3D positioning with cinematic depth
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle * 0.2) * 6 + Math.sin(i + t * 1.5) * 2; // Subtle vertical
          const z = Math.sin(angle) * radius + Math.cos(t * Math.PI * 0.8 + i * 0.2) * 3; // Depth
          
          points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Ultra-thin glowing material
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(layer.color[0], layer.color[1], layer.color[2]),
          transparent: true,
          opacity: layer.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const filament = new THREE.Line(geometry, material);
        
        // Store cinematic animation parameters
        filament.userData = {
          layerIndex,
          speed: layer.speed * (0.9 + Math.random() * 0.2), // Very consistent speeds
          phase: Math.random() * Math.PI * 2,
          orbitRadius: layer.radius,
          driftSpeed: 0.0002 + Math.random() * 0.0001, // Camera-like drift
          rotationSpeed: 0.0001 + Math.random() * 0.00005, // Meditative rotation
          verticalPhase: Math.random() * Math.PI * 2
        };
        
        scene.add(filament);
        filamentsRef.current.push(filament);
      }
    });

    // Window resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop - cinematic and meditative
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Cinematic camera-like movement
      const cameraDriftX = Math.sin(time * 0.0003) * 2;
      const cameraDriftY = Math.cos(time * 0.0002) * 1;
      
      if (cameraRef.current) {
        cameraRef.current.position.x = cameraDriftX;
        cameraRef.current.position.y = cameraDriftY;
      }

      // Animate filaments with cinematic motion
      filamentsRef.current.forEach((filament) => {
        if (!filament || !filament.userData) return;
        
        const { 
          speed, 
          phase, 
          orbitRadius, 
          driftSpeed,
          rotationSpeed,
          verticalPhase,
          layerIndex 
        } = filament.userData;
        
        // Meditative orbital motion
        const orbitAngle = time * speed + phase;
        const ellipticalFactor = 1 + Math.sin(orbitAngle * 1.2) * 0.08; // Very subtle ellipse
        
        // Calculate cinematic orbital position
        const x = Math.cos(orbitAngle) * orbitRadius * ellipticalFactor;
        const z = Math.sin(orbitAngle) * orbitRadius;
        const y = Math.sin(time * driftSpeed * 10 + verticalPhase) * 2; // Gentle vertical drift
        
        // Apply position with camera-like smoothness
        filament.position.x += (x - filament.position.x) * 0.02; // Smooth interpolation
        filament.position.y += (y - filament.position.y) * 0.02;
        filament.position.z += (z - filament.position.z) * 0.02;
        
        // Very slow rotation - almost meditative
        filament.rotation.x += rotationSpeed;
        filament.rotation.y += rotationSpeed * 1.5;
        filament.rotation.z += rotationSpeed * 0.5;
        
        // Subtle depth-based opacity for 3D illusion
        const depthFactor = 0.7 + (Math.sin(time * speed * 2 + phase) * 0.3);
        if (filament.material instanceof THREE.LineBasicMaterial) {
          filament.material.opacity = Math.max(0.1, layerIndex === 0 ? 0.6 : layerIndex === 1 ? 0.4 : 0.25) * depthFactor;
        }
        
        // Very subtle pulsing glow
        const pulse = Math.sin(time * speed * 1.5 + phase) * 0.05 + 0.95;
        if (filament.material instanceof THREE.LineBasicMaterial) {
          filament.material.opacity *= pulse;
        }
      });

      renderer.render(scene, camera);
    };

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      // Clean up filaments
      if (filamentsRef.current && filamentsRef.current.length > 0) {
        filamentsRef.current.forEach(filament => {
          if (filament && filament.geometry) filament.geometry.dispose();
          if (filament.material instanceof THREE.Material) {
            filament.material.dispose();
          }
          scene.remove(filament);
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mountRef.current && rendererRef.current.domElement) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[60vh]">
      {/* Cinematic Orbital Effect - 100% Transparent Background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent', // 100% transparent
          pointerEvents: 'none'
        }}
      />
      
      {/* Quote Card - Center of Cinematic System */}
      <div className="relative z-10 px-8 py-12 max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-black/50 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/50">
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 leading-relaxed">
            "{quote}"
          </blockquote>
          {author && (
            <cite className="text-lg md:text-xl text-gray-200 font-medium text-right block mt-4">
              — {author}
            </cite>
          )}
        </div>
      </div>
    </div>
  );
}
