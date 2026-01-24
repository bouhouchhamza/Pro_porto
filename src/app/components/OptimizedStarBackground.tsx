'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function OptimizedStarBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points[]>([]);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

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

    // Optimized renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      powerPreference: 'high-performance' // Request high-performance GPU
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Optimized star layers - reduced particle count
    const starLayers = [
      { count: 800, radius: 100, speed: 0.0002, color: [1.0, 1.0, 1.0], size: 1.5 },   // Reduced from 1000
      { count: 600, radius: 80, speed: 0.00015, color: [0.9, 0.9, 1.0], size: 1.2 },     // Reduced from 800
      { count: 400, radius: 60, speed: 0.0001, color: [0.8, 0.8, 1.0], size: 1 },       // Reduced from 600
      { count: 200, radius: 40, speed: 0.00005, color: [0.7, 0.7, 1.0], size: 0.8 },    // Reduced from 400
    ];

    starLayers.forEach((layer) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(layer.count * 3);
      const colors = new Float32Array(layer.count * 3);
      const sizes = new Float32Array(layer.count);
      const phases = new Float32Array(layer.count);

      for (let i = 0; i < layer.count; i++) {
        const i3 = i * 3;
        
        // Optimized spherical distribution
        const radius = layer.radius + (Math.random() - 0.5) * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Optimized colors
        const color = layer.color;
        const brightness = 0.5 + Math.random() * 0.5;
        colors[i3] = color[0] * brightness;
        colors[i3 + 1] = color[1] * brightness;
        colors[i3 + 2] = color[2] * brightness;
        
        sizes[i] = layer.size * (0.5 + Math.random() * 0.5);
        phases[i] = Math.random() * Math.PI * 2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

      // Optimized material
      const material = new THREE.PointsMaterial({
        size: layer.size,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      });

      const stars = new THREE.Points(geometry, material);
      stars.userData = { speed: layer.speed, radius: layer.radius };
      scene.add(stars);
      starsRef.current.push(stars);
    });

    // Optimized resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!cameraRef.current || !rendererRef.current) return;
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }, 250); // Debounce resize events
    };

    // Optimized animation loop with frame limiting
    const animate = (currentTime: number) => {
      frameRef.current = requestAnimationFrame(animate);

      // Limit to 30fps for better performance
      if (currentTime - lastTimeRef.current < 33) return; // ~30fps
      lastTimeRef.current = currentTime;

      const time = currentTime * 0.001;

      // Batch update all stars
      starsRef.current.forEach((stars) => {
        if (!stars || !stars.userData) return;
        
        const { speed, radius } = stars.userData;
        
        // Optimized rotation
        stars.rotation.y += speed;
        stars.rotation.x += speed * 0.5;
        
        // Gentle pulsing effect (reduced frequency)
        const pulse = Math.sin(time * 0.5) * 0.1 + 0.9;
        if (stars.material instanceof THREE.PointsMaterial) {
          stars.material.opacity = Math.max(0.3, 0.8 * pulse);
        }
      });

      renderer.render(scene, camera);
    };

    // Start animation
    frameRef.current = requestAnimationFrame(animate);

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      // Clean up stars
      if (starsRef.current && starsRef.current.length > 0) {
        starsRef.current.forEach(stars => {
          if (stars && stars.geometry) {
            stars.geometry.dispose();
          }
          if (stars.material instanceof THREE.Material) {
            stars.material.dispose();
          }
          scene.remove(stars);
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
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
