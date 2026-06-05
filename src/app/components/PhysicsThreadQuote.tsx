'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PhysicsThreadQuoteProps {
  quote: string;
  author?: string;
}

export default function PhysicsThreadQuote({ quote, author }: PhysicsThreadQuoteProps) {
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

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      premultipliedAlpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent to show stars
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create physics-based flowing threads
    const threadLayers = [
      { count: 8, radius: 15, speed: 0.001, opacity: 0.7, color: [0.9, 0.8, 1.0], width: 1.5 },   // Close - bright
      { count: 12, radius: 22, speed: 0.0008, opacity: 0.5, color: [0.7, 0.9, 1.0], width: 1 },    // Mid - soft
      { count: 16, radius: 30, speed: 0.0006, opacity: 0.3, color: [0.6, 0.8, 1.0], width: 0.7 },   // Far - dim
    ];

    threadLayers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const points = [];
        const segments = 60;
        
        // Physics simulation parameters - defined in correct scope
        const waveFrequency = 0.5 + Math.random() * 0.5;
        const amplitude = 2 + Math.random() * 3;
        
        // Create physics-based flowing paths
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          
          // Physics simulation parameters
          const angle = t * Math.PI * 2 + (i * Math.PI * 2) / layer.count;
          
          // Orbital physics with attraction to quote center
          const baseRadius = layer.radius;
          const gravitationalPull = Math.sin(angle * 2) * 2; // Attraction variation
          const waveMotion = Math.sin(t * Math.PI * waveFrequency + i * 0.5) * amplitude;
          const oscillation = Math.cos(t * Math.PI * 3 + i * 0.3) * 1.5;
          
          const radius = baseRadius + waveMotion + gravitationalPull + oscillation;
          
          // 3D positioning with organic curves
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle * 0.3) * 8 + Math.sin(i + t * 2) * 3; // Vertical flow
          const z = Math.sin(angle) * radius + Math.cos(t * Math.PI + i * 0.4) * 4; // Depth variation
          
          points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Create glowing material for threads
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(layer.color[0], layer.color[1], layer.color[2]),
          transparent: true,
          opacity: layer.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const thread = new THREE.Line(geometry, material);
        
        // Store physics animation parameters
        thread.userData = {
          layerIndex,
          speed: layer.speed * (0.8 + Math.random() * 0.4),
          phase: Math.random() * Math.PI * 2,
          orbitRadius: layer.radius,
          waveAmplitude: amplitude,
          waveFrequency: waveFrequency,
          verticalPhase: Math.random() * Math.PI * 2,
          attractionStrength: 0.5 + Math.random() * 0.5
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

    // Animation loop - physics-based motion
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate threads with physics simulation
      if (threadsRef.current && threadsRef.current.length > 0) {
        threadsRef.current.forEach((thread) => {
          if (!thread || !thread.userData) return;
          
          const { 
            speed, 
            phase, 
            orbitRadius, 
            waveAmplitude,
            waveFrequency,
            verticalPhase,
            attractionStrength,
            layerIndex 
          } = thread.userData;
          
          // Physics-based orbital motion
          const orbitAngle = time * speed + phase;
          const gravitationalWave = Math.sin(orbitAngle * 2) * attractionStrength;
          const waveOscillation = Math.sin(time * waveFrequency + phase) * waveAmplitude;
          const verticalFlow = Math.sin(time * speed * 2 + verticalPhase) * 2;
          
          // Calculate physics-based position
          const x = Math.cos(orbitAngle) * (orbitRadius + gravitationalWave);
          const z = Math.sin(orbitAngle) * (orbitRadius + waveOscillation * 0.5);
          const y = verticalFlow + Math.cos(time * speed * 1.5 + phase) * 1.5;
          
          // Smooth position updates
          thread.position.x += (x - thread.position.x) * 0.03;
          thread.position.y += (y - thread.position.y) * 0.03;
          thread.position.z += (z - thread.position.z) * 0.03;
          
          // Organic rotation
          thread.rotation.x += speed * 0.1;
          thread.rotation.y += speed * 0.15;
          thread.rotation.z += speed * 0.05;
          
          // Dynamic opacity based on position
          const distanceFromCenter = Math.sqrt(
            thread.position.x * thread.position.x + 
            thread.position.z * thread.position.z
          );
          const opacityFactor = 1 - (distanceFromCenter / (orbitRadius * 2)) * 0.3;
          if (thread.material instanceof THREE.LineBasicMaterial) {
            thread.material.opacity = Math.max(0.1, layerIndex === 0 ? 0.7 : layerIndex === 1 ? 0.5 : 0.3) * opacityFactor;
          }
          
          // Subtle pulsing glow
          const pulse = Math.sin(time * speed * 2 + phase) * 0.1 + 0.9;
          if (thread.material instanceof THREE.LineBasicMaterial) {
            thread.material.opacity *= pulse;
          }
        });
      }

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
    <div className="quote-stage">
      {/* Physics Threads - Transparent Background */}
      <div 
        ref={mountRef} 
        className="quote-thread-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent', // Transparent to show stars
          pointerEvents: 'none'
        }}
      />
      
      {/* Quote Card - Center of Physics System */}
      <div className="quote-card-wrap">
        <div className="quote-card">
          <blockquote className="quote-text">&quot;{quote}&quot;</blockquote>
          {author && (
            <cite className="quote-author">
              — {author}
            </cite>
          )}
        </div>
      </div>
    </div>
  );
}
