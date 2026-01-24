'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleQuoteProps {
  quote: string;
  author?: string;
}

export default function ParticleQuote({ quote, author }: ParticleQuoteProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points[]>([]);
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

    // Create particle layers for depth
    const particleLayers = [
      { count: 300, radius: 15, speed: 0.001, size: 0.3, opacity: 0.8 },  // Foreground
      { count: 500, radius: 25, speed: 0.0008, size: 0.2, opacity: 0.6 }, // Mid
      { count: 800, radius: 40, speed: 0.0006, size: 0.15, opacity: 0.4 }, // Background
      { count: 1200, radius: 60, speed: 0.0004, size: 0.1, opacity: 0.2 }, // Far background
    ];

    // Astronomical colors
    const colors = [
      new THREE.Color(0xffffff), // Pure white
      new THREE.Color(0xf0f8ff), // Light blue
      new THREE.Color(0xe6e6fa), // Lavender
      new THREE.Color(0xf5f5ff), // Very light violet
    ];

    particleLayers.forEach((layer, layerIndex) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(layer.count * 3);
      const particleColors = new Float32Array(layer.count * 3);
      const sizes = new Float32Array(layer.count);
      const phases = new Float32Array(layer.count);
      const speeds = new Float32Array(layer.count);
      const radii = new Float32Array(layer.count);

      for (let i = 0; i < layer.count; i++) {
        const i3 = i * 3;
        
        // Create orbital positions
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 30; // Vertical spread
        const radiusVariation = layer.radius + (Math.random() - 0.5) * 10;
        
        positions[i3] = Math.cos(angle) * radiusVariation;
        positions[i3 + 1] = height;
        positions[i3 + 2] = Math.sin(angle) * radiusVariation;

        // Natural color distribution
        const color = colors[Math.floor(Math.random() * colors.length)];
        particleColors[i3] = color.r;
        particleColors[i3 + 1] = color.g;
        particleColors[i3 + 2] = color.b;

        // Size variation
        sizes[i] = layer.size * (0.5 + Math.random() * 0.5);

        // Orbital parameters
        phases[i] = Math.random() * Math.PI * 2;
        speeds[i] = layer.speed * (0.8 + Math.random() * 0.4);
        radii[i] = radiusVariation;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Store orbital data
      geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
      geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
      geometry.setAttribute('radius', new THREE.BufferAttribute(radii, 1));

      // Particle material with glow
      const material = new THREE.PointsMaterial({
        size: layer.size,
        vertexColors: true,
        transparent: true,
        opacity: layer.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      particlesRef.current.push(particles);
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

      // Animate particles in orbital motion
      if (particlesRef.current && particlesRef.current.length > 0 && particleLayers) {
        particlesRef.current.forEach((particles, index) => {
          if (!particles || !particles.geometry || !particleLayers[index]) return;
          
          const layer = particleLayers[index];
          const positions = particles.geometry.attributes.position.array as Float32Array;
          const phases = particles.geometry.attributes.phase.array as Float32Array;
          const speeds = particles.geometry.attributes.speed.array as Float32Array;
          const radii = particles.geometry.attributes.radius.array as Float32Array;

        for (let i = 0; i < layer.count; i++) {
          const i3 = i * 3;
          
          // Orbital motion
          const angle = phases[i] + time * speeds[i];
          const radius = radii[i];
          
          // Add slight elliptical variation
          const ellipticalFactor = 1 + Math.sin(time * 0.5 + i * 0.1) * 0.1;
          
          positions[i3] = Math.cos(angle) * radius * ellipticalFactor;
          positions[i3 + 2] = Math.sin(angle) * radius;
          
          // Subtle vertical oscillation
          positions[i3 + 1] += Math.sin(time * 2 + i * 0.5) * 0.5;
        }

        particles.geometry.attributes.position.needsUpdate = true;

        // Rotate entire particle system
        particles.rotation.y += layer.speed * 0.5;
        particles.rotation.x += layer.speed * 0.2;

        // Subtle mouse parallax
        const parallaxX = mouseRef.current.x * 0.02 * (index + 1) * 0.3;
        const parallaxY = mouseRef.current.y * 0.02 * (index + 1) * 0.3;
        
        particles.position.x += (parallaxX - particles.position.x) * 0.01;
        particles.position.y += (parallaxY - particles.position.y) * 0.01;
        });
      }

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
      
      if (particlesRef.current && particlesRef.current.length > 0) {
        particlesRef.current.forEach(particles => {
          if (particles && particles.geometry) particles.geometry.dispose();
          if (particles && particles.material instanceof THREE.Material) {
            particles.material.dispose();
          }
          if (particles) scene.remove(particles);
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
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Particle System */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
      
      {/* Quote Content */}
      <div className="relative z-10 text-center px-8 py-12 max-w-4xl mx-auto">
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 leading-relaxed">
          "{quote}"
        </blockquote>
        {author && (
          <cite className="text-lg md:text-xl text-gray-300 font-medium">
            — {author}
          </cite>
        )}
      </div>
    </div>
  );
}
