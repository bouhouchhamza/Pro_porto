'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

interface PhysicsThreadQuoteProps {
  quote?: string;
  author?: string;
}

export default function PhysicsThreadQuote({ quote, author }: PhysicsThreadQuoteProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const threadsRef = useRef<THREE.Line[]>([]);
  const frameRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const getMountSize = () => {
      const rect = mount.getBoundingClientRect();
      return {
        width: Math.max(1, Math.round(rect?.width || window.innerWidth)),
        height: Math.max(1, Math.round(rect?.height || window.innerHeight)),
      };
    };

    const mountSize = getMountSize();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountSize.width / mountSize.height,
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
    renderer.setSize(mountSize.width, mountSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    const isCurrentLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Thread layers with dark and light color tokens
    const threadLayers = [
      {
        count: 12,
        radius: 18,
        speed: 0.001,
        opacity: 0.78,
        darkColor: [0.82, 0.74, 1.0],
        lightColor: [0.49, 0.23, 0.93], // #7C3AED violet
        width: 1.5
      },
      {
        count: 18,
        radius: 28,
        speed: 0.0008,
        opacity: 0.58,
        darkColor: [0.58, 0.78, 1.0],
        lightColor: [0.39, 0.40, 0.95], // #6366F1 indigo
        width: 1
      },
      {
        count: 24,
        radius: 40,
        speed: 0.0006,
        opacity: 0.38,
        darkColor: [0.48, 0.66, 0.94],
        lightColor: [0.31, 0.27, 0.90], // #4F46E5 deep indigo
        width: 0.7
      },
      {
        count: 14,
        radius: 52,
        speed: 0.00045,
        opacity: 0.22,
        darkColor: [0.55, 0.48, 0.88],
        lightColor: [0.55, 0.36, 0.96], // #8B5CF6 purple-500
        width: 0.5
      },
    ];

    threadLayers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const points = [];
        const segments = 60;
        
        const waveFrequency = 0.5 + Math.random() * 0.5;
        const amplitude = 2 + Math.random() * 3;
        
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          const angle = t * Math.PI * 2 + (i * Math.PI * 2) / layer.count;
          
          const baseRadius = layer.radius;
          const gravitationalPull = Math.sin(angle * 2) * 2;
          const waveMotion = Math.sin(t * Math.PI * waveFrequency + i * 0.5) * amplitude;
          const oscillation = Math.cos(t * Math.PI * 3 + i * 0.3) * 1.5;
          
          const radius = baseRadius + waveMotion + gravitationalPull + oscillation;
          
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle * 0.3) * 8 + Math.sin(i + t * 2) * 3;
          const z = Math.sin(angle) * radius + Math.cos(t * Math.PI + i * 0.4) * 4;
          
          points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const initialColor = isCurrentLight ? layer.lightColor : layer.darkColor;
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(initialColor[0], initialColor[1], initialColor[2]),
          transparent: true,
          opacity: isCurrentLight ? layer.opacity * 0.85 : layer.opacity,
          blending: isCurrentLight ? THREE.NormalBlending : THREE.AdditiveBlending,
          depthWrite: false
        });

        const thread = new THREE.Line(geometry, material);
        
        thread.userData = {
          layerIndex,
          baseOpacity: layer.opacity,
          darkColor: layer.darkColor,
          lightColor: layer.lightColor,
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
      const nextSize = getMountSize();
      cameraRef.current.aspect = nextSize.width / nextSize.height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nextSize.width, nextSize.height);
    };

    // Animation loop - physics-based motion
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

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
            attractionStrength 
          } = thread.userData;
          
          const orbitAngle = time * speed + phase;
          const gravitationalWave = Math.sin(orbitAngle * 2) * attractionStrength;
          const waveOscillation = Math.sin(time * waveFrequency + phase) * waveAmplitude;
          const verticalFlow = Math.sin(time * speed * 2 + verticalPhase) * 2;
          
          const x = Math.cos(orbitAngle) * (orbitRadius + gravitationalWave);
          const z = Math.sin(orbitAngle) * (orbitRadius + waveOscillation * 0.5);
          const y = verticalFlow + Math.cos(time * speed * 1.5 + phase) * 1.5;
          
          thread.position.x += (x - thread.position.x) * 0.03;
          thread.position.y += (y - thread.position.y) * 0.03;
          thread.position.z += (z - thread.position.z) * 0.03;
          
          thread.rotation.x += speed * 0.1;
          thread.rotation.y += speed * 0.15;
          thread.rotation.z += speed * 0.05;
          
          const distanceFromCenter = Math.sqrt(
            thread.position.x * thread.position.x + 
            thread.position.z * thread.position.z
          );
          const opacityFactor = 1 - (distanceFromCenter / (orbitRadius * 2)) * 0.3;
          const pulse = Math.sin(time * speed * 2 + phase) * 0.1 + 0.9;
          
          if (thread.material instanceof THREE.LineBasicMaterial) {
            const isLightNow = document.documentElement.getAttribute('data-theme') === 'light';
            const baseOp = isLightNow ? thread.userData.baseOpacity * 0.85 : thread.userData.baseOpacity;
            thread.material.opacity = Math.max(0.14, baseOp) * opacityFactor * pulse;
          }
        });
      }

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (threadsRef.current && threadsRef.current.length > 0) {
        threadsRef.current.forEach(thread => {
          if (thread && thread.geometry) thread.geometry.dispose();
          if (thread.material instanceof THREE.Material) {
            thread.material.dispose();
          }
          scene.remove(thread);
        });
        threadsRef.current = [];
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mount && rendererRef.current.domElement) {
          mount.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  // Theme change response in-place
  useEffect(() => {
    if (threadsRef.current.length === 0) return;
    const isLight = resolvedTheme === 'light';

    threadsRef.current.forEach((thread) => {
      if (!thread || !thread.material || !thread.userData) return;
      const { darkColor, lightColor, baseOpacity } = thread.userData;
      if (thread.material instanceof THREE.LineBasicMaterial) {
        const c = isLight ? lightColor : darkColor;
        thread.material.color.setRGB(c[0], c[1], c[2]);
        thread.material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
        thread.material.opacity = isLight ? baseOpacity * 0.85 : baseOpacity;
        thread.material.needsUpdate = true;
      }
    });
  }, [resolvedTheme]);

  const hasCustomQuote = Boolean(quote);

  return (
    <div className="quote-stage">
      <div 
        ref={mountRef} 
        className="quote-thread-canvas"
      />
      
      <div className="quote-card-wrap">
        <div className={`quote-card ${isEasterEggActive ? 'is-easter-egg' : ''}`}>
          {!hasCustomQuote && (
            <div className="quote-card-top-bar">
              {!isEasterEggActive ? (
                <button
                  type="button"
                  onClick={() => setIsEasterEggActive(true)}
                  className="quote-easter-egg-toggle"
                  aria-label="Discover alternate cinematic inspiration"
                  title="Discover alternate cinematic inspiration"
                >
                  <span className="quote-easter-egg-sparkle" aria-hidden="true">✦</span>
                  <span>Inspiration</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEasterEggActive(false)}
                  className="quote-easter-egg-return"
                  aria-label="Return to primary quote: A man can change his stars"
                  title="Return to primary quote"
                >
                  <span aria-hidden="true">↺</span>
                  <span>Change your stars</span>
                </button>
              )}
            </div>
          )}

          <div className="quote-content-block">
            {hasCustomQuote ? (
              <>
                <blockquote className="quote-text">&quot;{quote}&quot;</blockquote>
                {author && (
                  <cite className="quote-author">
                    — {author}
                  </cite>
                )}
              </>
            ) : !isEasterEggActive ? (
              <>
                <blockquote className="quote-text" lang="en">
                  &quot;A man can change his{" "}
                  <span className="quote-highlight-stars">stars</span>.&quot;
                </blockquote>
                <cite className="quote-author">
                  — William Thatcher, A Knight&apos;s Tale (2001)
                </cite>
              </>
            ) : (
              <>
                <blockquote className="quote-text quote-text-easter-egg" lang="en">
                  &quot;Sometimes you gotta run before you can walk.&quot;
                </blockquote>
                <cite className="quote-author quote-author-easter-egg">
                  — Tony Stark, Iron Man (2008)
                </cite>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
