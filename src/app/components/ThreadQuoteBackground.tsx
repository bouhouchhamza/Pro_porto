'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreadQuoteBackgroundProps {
  quote: string;
  author?: string;
}

export default function ThreadQuoteBackground({ quote, author }: ThreadQuoteBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const threadsRef = useRef<THREE.Line[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - closer for intimate quote view
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
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

    // Create glowing threads for quote section
    const threadLayers = [
      { count: 12, radius: 20, speed: 0.001, opacity: 0.7, color: [0.9, 0.7, 1.0], width: 1.5 }, // Close - soft purple
      { count: 18, radius: 30, speed: 0.0008, opacity: 0.5, color: [0.7, 0.8, 1.0], width: 1 }, // Mid - soft blue
      { count: 24, radius: 40, speed: 0.0006, opacity: 0.3, color: [0.6, 0.9, 1.0], width: 0.7 }, // Far - light cyan
    ];

    threadLayers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const points = [];
        const segments = 80;
        
        // Create flowing wave pattern
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          
          // Organic wave equations for thread motion
          const baseRadius = layer.radius + Math.sin(i * 0.8) * 8;
          const wave1 = Math.sin(t * Math.PI * 2 + i * 0.4) * 6;
          const wave2 = Math.cos(t * Math.PI * 2.5 + i * 0.6) * 3;
          const wave3 = Math.sin(t * Math.PI * 4 + i * 1.2) * 1.5;
          
          const radius = baseRadius + wave1 + wave2 + wave3;
          const angle = t * Math.PI * 1.5 + (i * Math.PI * 2) / layer.count;
          
          // 3D positioning with subtle depth
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle * 0.3) * 10 + Math.sin(i + t * 1.5) * 4;
          const z = Math.sin(angle) * radius + Math.cos(t * Math.PI * 0.8 + i * 0.5) * 6;
          
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
        
        // Store animation parameters
        thread.userData = {
          layerIndex,
          speed: layer.speed * (0.7 + Math.random() * 0.6),
          phase: Math.random() * Math.PI * 2,
          amplitude: 0.8 + Math.random() * 0.4,
          frequency: 0.6 + Math.random() * 0.4
        };
        
        scene.add(thread);
        threadsRef.current.push(thread);
      }
    });

    // Mouse movement handler - subtle interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
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

      // Animate threads with smooth flowing motion
      threadsRef.current.forEach((thread) => {
        if (!thread || !thread.userData) return;
        
        const { speed, phase, amplitude, frequency, layerIndex } = thread.userData;
        
        // Smooth flowing motion
        const flow = Math.sin(time * speed + phase) * amplitude;
        const drift = Math.cos(time * frequency * 0.3 + phase) * 0.5;
        
        // Gentle wave motion
        const waveX = Math.sin(time * frequency * 0.4 + phase) * 1.5;
        const waveY = Math.cos(time * frequency * 0.2 + phase) * 2;
        const waveZ = Math.sin(time * frequency * 0.6 + phase) * 1;
        
        // Apply organic motion
        thread.position.x = waveX + drift * 0.3;
        thread.position.y = waveY + flow * 0.4;
        thread.position.z = waveZ + drift * 0.2;
        
        // Slow rotation for 3D depth feeling
        thread.rotation.x += speed * 0.15;
        thread.rotation.y += speed * 0.25;
        thread.rotation.z += speed * 0.08;
        
        // Subtle mouse interaction - only for quote section
        const mouseInfluence = 0.015 * (3 - layerIndex) * 0.3;
        thread.position.x += (mouseRef.current.x * 5 - thread.position.x) * mouseInfluence;
        thread.position.y += (mouseRef.current.y * 5 - thread.position.y) * mouseInfluence;
      });

      renderer.render(scene, camera);
    };

    // Event listeners
    if (mountRef.current) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
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
      {/* Thread Background - Only for quote section */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, #0a0a1f 0%, #050510 50%, #020208 100%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Quote Card with strong contrast */}
      <div className="relative z-10 px-8 py-12 max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl shadow-white/5">
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
