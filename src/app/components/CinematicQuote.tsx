'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicQuoteProps {
  quote: string;
  author?: string;
}

export default function CinematicQuote({ quote, author }: CinematicQuoteProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points[]>([]);
  const waveGridRef = useRef<THREE.LineSegments | null>(null);
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

    // Create realistic stars
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(2000 * 3);
    const starColors = new Float32Array(2000 * 3);
    const starSizes = new Float32Array(2000);

    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3;
      
      // Random positions in sphere
      const radius = 80 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      // Natural star colors
      const colors = [
        new THREE.Color(0xffffff), // White
        new THREE.Color(0xf8f8ff), // Very light blue
        new THREE.Color(0xf0f8ff), // Light blue
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;

      // Tiny sizes
      starSizes[i] = 0.05 + Math.random() * 0.1;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current.push(stars);

    // Create 3D Wave Grid
    const gridSize = 40;
    const gridDivisions = 30;
    const waveGridGeometry = new THREE.BufferGeometry();
    const gridPositions = new Float32Array(gridSize * 2 * 3);
    const gridColors = new Float32Array(gridSize * 2 * 3);

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridDivisions; j++) {
        const index = (i * gridDivisions + j) * 3;
        
        // Create wave pattern
        const x = (i - gridSize / 2) * 2;
        const z = (j - gridDivisions / 2) * 2;
        const y = Math.sin(i * 0.3) * 2 + Math.cos(j * 0.2) * 1;
        
        gridPositions[index] = x;
        gridPositions[index + 1] = y;
        gridPositions[index + 2] = z;

        // Color gradient for depth
        const depth = Math.abs(i - gridSize / 2) / (gridSize / 2);
        gridColors[index] = 0.8 - depth * 0.3; // White to bluish
        gridColors[index + 1] = 0.9 - depth * 0.2;
        gridColors[index + 2] = 1.0 - depth * 0.1;
      }
    }

    waveGridGeometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
    waveGridGeometry.setAttribute('color', new THREE.BufferAttribute(gridColors, 3));

    const waveGridMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const waveGrid = new THREE.LineSegments(waveGridGeometry, waveGridMaterial);
    scene.add(waveGrid);
    waveGridRef.current = waveGrid;

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

      // Animate stars with subtle drift
      if (starsRef.current && starsRef.current.length > 0) {
        const stars = starsRef.current[0];
        const positions = stars.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < 2000; i++) {
          const i3 = i * 3;
          
          // Very slow drift
          positions[i3] += Math.sin(time * 0.0001 + i * 0.001) * 0.01;
          positions[i3 + 1] += Math.cos(time * 0.0002 + i * 0.001) * 0.01;
          positions[i3 + 2] += Math.sin(time * 0.00015 + i * 0.001) * 0.01;
        }
        
        stars.geometry.attributes.position.needsUpdate = true;
        
        // Subtle rotation
        stars.rotation.y += 0.00005;
        stars.rotation.x += 0.00002;
      }

      // Animate 3D Wave Grid
      if (waveGridRef.current && waveGridRef.current.geometry) {
        const positions = waveGridRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridDivisions; j++) {
            const index = (i * gridDivisions + j) * 3;
            
            // Wave motion
            const waveX = Math.sin(time * 0.5 + i * 0.1) * 0.5;
            const waveZ = Math.cos(time * 0.3 + j * 0.1) * 0.5;
            const waveY = Math.sin(time * 0.4 + i * 0.05 + j * 0.05) * 1.5;
            
            positions[index] = (i - gridSize / 2) * 2 + waveX;
            positions[index + 1] = waveY;
            positions[index + 2] = (j - gridDivisions / 2) * 2 + waveZ;
          }
        }
        
        waveGridRef.current.geometry.attributes.position.needsUpdate = true;
        
        // Slow rotation of the entire grid
        waveGridRef.current.rotation.y += 0.001;
        waveGridRef.current.rotation.x += 0.0005;

        // Subtle mouse parallax
        const parallaxX = mouseRef.current.x * 0.05;
        const parallaxY = mouseRef.current.y * 0.05;
        
        waveGridRef.current.position.x += (parallaxX - waveGridRef.current.position.x) * 0.02;
        waveGridRef.current.position.y += (parallaxY - waveGridRef.current.position.y) * 0.02;
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
      
      // Clean up stars
      if (starsRef.current && starsRef.current.length > 0) {
        starsRef.current.forEach(stars => {
          if (stars && stars.geometry) stars.geometry.dispose();
          if (stars.material instanceof THREE.Material) {
            stars.material.dispose();
          }
          scene.remove(stars);
        });
      }
      
      // Clean up wave grid
      if (waveGridRef.current && waveGridRef.current.geometry) {
        waveGridRef.current.geometry.dispose();
        if (waveGridRef.current.material instanceof THREE.Material) {
          waveGridRef.current.material.dispose();
        }
        scene.remove(waveGridRef.current);
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
      {/* 3D Background */}
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
      
      {/* Quote Card */}
      <div className="relative z-10 px-8 py-12 max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl shadow-white/10">
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
