'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StarBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points[]>([]);
  const shootingStarsRef = useRef<THREE.Line[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const lastShootingStarRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup for forward motion through space
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50; // Start further back for depth
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

    // Cinematic depth layers for forward flight
    const starLayers = [
      { count: 6000, depth: -500, speed: 0.000001, size: 0.015, brightness: 0.2 },  // Very distant - barely move
      { count: 4000, depth: -300, speed: 0.000003, size: 0.025, brightness: 0.4 },  // Distant - slow drift
      { count: 2500, depth: -150, speed: 0.000008, size: 0.04, brightness: 0.6 },   // Mid-distance - moderate drift
      { count: 800, depth: -50, speed: 0.000015, size: 0.06, brightness: 0.8 },    // Closer - faster drift
      { count: 200, depth: -20, speed: 0.000025, size: 0.08, brightness: 1.0 },    // Very close - fastest drift
    ];

    // Astronomically accurate colors - mostly white with rare tints
    const colors = [
      new THREE.Color(0xffffff), // Pure white (most common)
      new THREE.Color(0xf8f8ff), // Very faint blue (rare)
      new THREE.Color(0xfff8f0), // Very faint warm (very rare)
    ];

    starLayers.forEach((layer, layerIndex) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(layer.count * 3);
      const starColors = new Float32Array(layer.count * 3);
      const sizes = new Float32Array(layer.count);

      for (let i = 0; i < layer.count; i++) {
        const i3 = i * 3;
        
        // Create realistic star distribution for space flight
        let radius, theta, phi;
        
        // Distribute stars in front of camera for forward motion effect
        if (Math.random() < 0.4) {
          // Stars in central path - more likely to be passed
          radius = 20 + Math.random() * 100;
          theta = (Math.random() - 0.5) * Math.PI * 0.8; // Narrower field of view
          phi = Math.acos(0.3 + Math.random() * 0.7); // More in front
        } else {
          // Peripheral stars
          radius = 50 + Math.random() * 200;
          theta = Math.random() * Math.PI * 2;
          phi = Math.acos(2 * Math.random() - 1);
        }

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi) + layer.depth;

        // Natural color distribution - mostly white, rare tints
        const colorRand = Math.random();
        let color;
        if (colorRand < 0.02) {
          color = colors[2]; // Very rare warm tint (2%)
        } else if (colorRand < 0.08) {
          color = colors[1]; // Rare blue tint (6%)
        } else {
          color = colors[0]; // White (92%)
        }
        
        starColors[i3] = color.r;
        starColors[i3 + 1] = color.g;
        starColors[i3 + 2] = color.b;

        // Natural brightness variation - most very dim, few brighter
        const brightnessRand = Math.random();
        let brightness;
        if (brightnessRand < 0.7) {
          brightness = 0.2 + Math.random() * 0.3; // 70% very dim
        } else if (brightnessRand < 0.95) {
          brightness = 0.5 + Math.random() * 0.3; // 25% dim
        } else {
          brightness = 0.8 + Math.random() * 0.2; // 5% slightly brighter
        }
        
        sizes[i] = layer.size * brightness;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Individual proper motion parameters for astronomical accuracy
      const properMotionX = new Float32Array(layer.count);
      const properMotionY = new Float32Array(layer.count);
      const properMotionZ = new Float32Array(layer.count);
      
      for (let i = 0; i < layer.count; i++) {
        // Extremely small proper motion like real stars
        properMotionX[i] = (Math.random() - 0.5) * 0.000002;
        properMotionY[i] = (Math.random() - 0.5) * 0.000002;
        properMotionZ[i] = (Math.random() - 0.5) * 0.000001;
      }
      
      geometry.setAttribute('properMotionX', new THREE.BufferAttribute(properMotionX, 1));
      geometry.setAttribute('properMotionY', new THREE.BufferAttribute(properMotionY, 1));
      geometry.setAttribute('properMotionZ', new THREE.BufferAttribute(properMotionZ, 1));

      // Cinematic star material - sharp points, no glow
      const material = new THREE.PointsMaterial({
        size: layer.size,
        vertexColors: true,
        transparent: true,
        opacity: layer.brightness,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true // Perspective sizing for depth
      });

      const stars = new THREE.Points(geometry, material);
      scene.add(stars);
      starsRef.current.push(stars);
    });

    // Mouse movement for subtle camera orientation
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
      const currentTime = Date.now();

      // Cinematic forward motion through space
      const forwardSpeed = 0.05; // Calm, controlled forward speed
      camera.position.z -= forwardSpeed;
      
      // Subtle camera orientation based on mouse (head movement)
      const lookX = mouseRef.current.x * 0.02;
      const lookY = mouseRef.current.y * 0.02;
      camera.rotation.x = lookY;
      camera.rotation.y = lookX;
      
      // Depth-based parallax and star recycling
      starsRef.current.forEach((stars, index) => {
        if (!stars || !stars.geometry || !starLayers[index]) return;
        
        const layer = starLayers[index];
        
        // Move stars toward camera (forward motion effect)
        stars.position.z += forwardSpeed;
        
        // Recycle stars that pass the camera
        if (stars.position.z > 100) {
          stars.position.z = -500; // Reset to far distance
          
          // Redistribute recycled stars in front
          const positions = stars.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < layer.count; i++) {
            const i3 = i * 3;
            
            // Place stars in front again
            const radius = 20 + Math.random() * 150;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(0.3 + Math.random() * 0.7);
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi) + layer.depth;
          }
          stars.geometry.attributes.position.needsUpdate = true;
        }
        
        // Individual proper motion - barely perceptible
        const positions = stars.geometry.attributes.position.array as Float32Array;
        const properMotionX = stars.geometry.attributes.properMotionX.array as Float32Array;
        const properMotionY = stars.geometry.attributes.properMotionY.array as Float32Array;
        
        for (let i = 0; i < layer.count; i++) {
          const i3 = i * 3;
          
          // Apply individual proper motion
          positions[i3] += properMotionX[i];
          positions[i3 + 1] += properMotionY[i];
        }
        
        stars.geometry.attributes.position.needsUpdate = true;
        
        // Very subtle galactic rotation
        stars.rotation.y += layer.speed;
        stars.rotation.x += layer.speed * 0.3;
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
      
      // Clean up shooting stars
      shootingStarsRef.current.forEach(shootingStar => {
        scene.remove(shootingStar);
        shootingStar.geometry.dispose();
        if (shootingStar.material instanceof THREE.Material) {
          shootingStar.material.dispose();
        }
      });
      shootingStarsRef.current = [];
      
      // Clean up Three.js objects
      starsRef.current.forEach(stars => {
        if (stars.geometry) stars.geometry.dispose();
        if (stars.material instanceof THREE.Material) {
          stars.material.dispose();
        }
        scene.remove(stars);
      });
      
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
      className="starfield-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        isolation: 'isolate'
      }}
    />
  );
}