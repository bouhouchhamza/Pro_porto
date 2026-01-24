'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface OrbitalQuoteEffectProps {
  quote: string;
  author?: string;
}

export default function OrbitalQuoteEffect({ quote, author }: OrbitalQuoteEffectProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const threadsRef = useRef<THREE.Line[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - centered on quote
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;
    cameraRef.current = camera;

    // Renderer setup with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      premultipliedAlpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Fully transparent
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create orbital threads around quote center
    const orbitalLayers = [
      { count: 8, radius: 12, speed: 0.002, opacity: 0.8, color: [0.9, 0.8, 1.0], width: 2 },   // Close - bright
      { count: 12, radius: 18, speed: 0.0015, opacity: 0.6, color: [0.7, 0.9, 1.0], width: 1.5 }, // Mid - soft
      { count: 16, radius: 25, speed: 0.001, opacity: 0.4, color: [0.6, 0.8, 1.0], width: 1 },    // Far - dim
    ];

    orbitalLayers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const points = [];
        const segments = 60;
        
        // Create orbital path around quote center
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          
          // Orbital physics equations
          const angle = t * Math.PI * 2 + (i * Math.PI * 2) / layer.count;
          const ellipticalFactor = 1 + Math.sin(angle * 2) * 0.2; // Elliptical variation
          
          // Calculate orbital position
          const baseRadius = layer.radius * ellipticalFactor;
          const waveOffset = Math.sin(t * Math.PI * 4 + i * 0.5) * 2; // Wave along path
          const radius = baseRadius + waveOffset;
          
          // 3D positioning with depth variation
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle * 0.3) * 8 + Math.sin(i + t * 2) * 3; // Vertical oscillation
          const z = Math.sin(angle) * radius + Math.cos(t * Math.PI + i * 0.3) * 4; // Depth variation
          
          points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Create glowing material with subtle emission
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(layer.color[0], layer.color[1], layer.color[2]),
          transparent: true,
          opacity: layer.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const thread = new THREE.Line(geometry, material);
        
        // Store orbital parameters
        thread.userData = {
          layerIndex,
          speed: layer.speed * (0.8 + Math.random() * 0.4),
          phase: Math.random() * Math.PI * 2,
          orbitRadius: layer.radius,
          orbitSpeed: layer.speed,
          waveAmplitude: 0.5 + Math.random() * 0.5,
          verticalOffset: (Math.random() - 0.5) * 10
        };
        
        scene.add(thread);
        threadsRef.current.push(thread);
      }
    });

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

      // Animate orbital threads around quote center
      threadsRef.current.forEach((thread) => {
        if (!thread || !thread.userData) return;
        
        const { 
          speed, 
          phase, 
          orbitRadius, 
          orbitSpeed, 
          waveAmplitude, 
          verticalOffset,
          layerIndex 
        } = thread.userData;
        
        // Orbital motion around quote center
        const orbitAngle = time * orbitSpeed + phase;
        const ellipticalFactor = 1 + Math.sin(orbitAngle * 2) * 0.15;
        
        // Calculate orbital position
        const x = Math.cos(orbitAngle) * orbitRadius * ellipticalFactor;
        const z = Math.sin(orbitAngle) * orbitRadius;
        const y = verticalOffset + Math.sin(time * speed * 2 + phase) * waveAmplitude * 3;
        
        // Apply orbital position
        thread.position.x = x;
        thread.position.y = y;
        thread.position.z = z;
        
        // Rotation for 3D depth effect
        thread.rotation.x += orbitSpeed * 0.1;
        thread.rotation.y += orbitSpeed * 0.2;
        thread.rotation.z += orbitSpeed * 0.05;
        
        // Dynamic opacity based on Z position (depth)
        const depthFactor = (thread.position.z + orbitRadius) / (orbitRadius * 2);
        if (thread.material instanceof THREE.LineBasicMaterial) {
          thread.material.opacity = Math.max(0.1, thread.material.opacity * depthFactor);
        }
        
        // Subtle pulsing glow
        const pulse = Math.sin(time * speed * 3 + phase) * 0.1 + 0.9;
        if (thread.material instanceof THREE.LineBasicMaterial) {
          thread.material.opacity *= pulse;
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
      
      // Clean up threads
      if (threadsRef.current && threadsRef.current.length > 0) {
        threadsRef.current.forEach(thread => {
          if (thread && thread.geometry) thread.geometry.dispose();
          if (thread.material instanceof THREE.Material) {
            thread.material.dispose();
          }
          scene.remove(thread);
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
      {/* Fully Transparent Background with Orbital Threads */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent', // Completely transparent
          pointerEvents: 'none'
        }}
      />
      
      {/* Quote Card - Center of Orbital System */}
      <div className="relative z-10 px-8 py-12 max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-black/60 border border-white/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-white/10">
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
