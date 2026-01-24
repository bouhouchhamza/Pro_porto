'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FilamentBackgroundProps {
  children?: React.ReactNode;
}

export default function FilamentBackground({ children }: FilamentBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const filamentsRef = useRef<THREE.Line[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create luminous filaments
    const filamentLayers = [
      { count: 15, radius: 30, speed: 0.0008, opacity: 0.8, color: [0.8, 0.6, 1.0], width: 2 }, // Close - purple
      { count: 20, radius: 45, speed: 0.0006, opacity: 0.6, color: [0.6, 0.8, 1.0], width: 1.5 }, // Mid - blue
      { count: 25, radius: 60, speed: 0.0004, opacity: 0.4, color: [0.4, 0.9, 1.0], width: 1 }, // Far - cyan
      { count: 30, radius: 80, speed: 0.0002, opacity: 0.2, color: [0.7, 0.7, 1.0], width: 0.5 }, // Very far - light blue
    ];

    filamentLayers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const points = [];
        const segments = 100;
        
        // Create organic wave pattern
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          
          // Complex wave equation for organic motion
          const baseRadius = layer.radius + Math.sin(i * 0.5) * 10;
          const wave1 = Math.sin(t * Math.PI * 2 + i * 0.3) * 8;
          const wave2 = Math.cos(t * Math.PI * 3 + i * 0.7) * 4;
          const wave3 = Math.sin(t * Math.PI * 5 + i * 1.1) * 2;
          
          const radius = baseRadius + wave1 + wave2 + wave3;
          const angle = t * Math.PI * 2 + (i * Math.PI * 2) / layer.count;
          
          // 3D positioning with depth variation
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle * 0.5) * 15 + Math.sin(i + t * 2) * 5;
          const z = Math.sin(angle) * radius + Math.cos(t * Math.PI + i) * 10;
          
          points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Create gradient material for each filament
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(layer.color[0], layer.color[1], layer.color[2]),
          transparent: true,
          opacity: layer.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          linewidth: layer.width
        });

        const filament = new THREE.Line(geometry, material);
        
        // Store animation parameters
        filament.userData = {
          layerIndex,
          speed: layer.speed * (0.8 + Math.random() * 0.4),
          phase: Math.random() * Math.PI * 2,
          amplitude: 1 + Math.random() * 0.5,
          frequency: 0.5 + Math.random() * 0.5
        };
        
        scene.add(filament);
        filamentsRef.current.push(filament);
      }
    });

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Window resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate filaments with organic wave motion
      filamentsRef.current.forEach((filament) => {
        if (!filament || !filament.userData) return;
        
        const { speed, phase, amplitude, frequency, layerIndex } = filament.userData;
        
        // Breathing-like oscillation
        const breathe = Math.sin(time * speed + phase) * amplitude;
        
        // Wave-like motion
        const waveX = Math.sin(time * frequency * 0.5 + phase) * 2;
        const waveY = Math.cos(time * frequency * 0.3 + phase) * 3;
        const waveZ = Math.sin(time * frequency * 0.7 + phase) * 1.5;
        
        // Apply organic motion
        filament.position.x = waveX + breathe * 0.5;
        filament.position.y = waveY + breathe * 0.3;
        filament.position.z = waveZ + breathe * 0.2;
        
        // Slow rotation for depth
        filament.rotation.x += speed * 0.2;
        filament.rotation.y += speed * 0.3;
        filament.rotation.z += speed * 0.1;
        
        // Dynamic opacity based on position
        const distanceFromCenter = Math.sqrt(
          filament.position.x * filament.position.x + 
          filament.position.y * filament.position.y
        );
        const opacityFactor = 1 - (distanceFromCenter / 50) * 0.3;
        if (filament.material instanceof THREE.LineBasicMaterial) {
          filament.material.opacity = Math.max(0.1, filament.material.opacity * opacityFactor);
        }
        
        // Mouse interaction - gentle attraction
        const mouseInfluence = 0.02 * (4 - layerIndex) * 0.25; // Closer layers react more
        filament.position.x += (mouseRef.current.x * 10 - filament.position.x) * mouseInfluence;
        filament.position.y += (mouseRef.current.y * 10 - filament.position.y) * mouseInfluence;
      });

      renderer.render(scene, camera);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="relative w-full h-full">
      {/* 3D Filament Background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #050515 50%, #020208 100%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
