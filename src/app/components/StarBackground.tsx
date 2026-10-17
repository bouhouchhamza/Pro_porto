'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

interface StarLayerDef {
  count: number;
  minZ: number;
  maxZ: number;
  speed: number;
  size: number;
  lightOpacity: number;
  darkOpacity: number;
}

export default function StarBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points[]>([]);
  const shootingStarRef = useRef<THREE.Line | null>(null);
  const shootingStarStateRef = useRef({
    active: false,
    startTime: 0,
    duration: 1100, // 1.1s streak
    nextTriggerTime: 4000,
    head: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    length: 35,
  });
  const frameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);
  const isLightRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const { resolvedTheme } = useTheme();

  // Primary WebGL scene setup (runs once on mount)
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Detect mobile device & reduced motion preference
    const isMobile =
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    isMobileRef.current = isMobile;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    prefersReducedMotionRef.current = prefersReducedMotion;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup for majestic forward perspective through space
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.z = 40;
    cameraRef.current = camera;

    // Renderer setup with high performance & transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Multi-tier Star Layers: carefully balanced for desktop & mobile
    const starLayers: StarLayerDef[] = isMobile
      ? [
          { count: 1100, minZ: -450, maxZ: -200, speed: 0.000002, size: 0.025, lightOpacity: 0.42, darkOpacity: 0.45 },
          { count: 700,  minZ: -200, maxZ: -70,  speed: 0.000005, size: 0.040, lightOpacity: 0.62, darkOpacity: 0.68 },
          { count: 280,  minZ: -70,  maxZ: -10,  speed: 0.000010, size: 0.058, lightOpacity: 0.82, darkOpacity: 0.88 },
        ]
      : [
          { count: 4200, minZ: -600, maxZ: -350, speed: 0.0000015, size: 0.022, lightOpacity: 0.40, darkOpacity: 0.45 }, // Distant cosmos
          { count: 2800, minZ: -350, maxZ: -170, speed: 0.0000035, size: 0.035, lightOpacity: 0.55, darkOpacity: 0.62 }, // Mid field
          { count: 1400, minZ: -170, maxZ: -65,  speed: 0.0000075, size: 0.052, lightOpacity: 0.72, darkOpacity: 0.78 }, // Near field
          { count: 480,  minZ: -65,  maxZ: -10,  speed: 0.0000140, size: 0.075, lightOpacity: 0.88, darkOpacity: 0.95 }, // Foreground celestial
        ];

    // Dark Mode Palette: pure celestial white, icy diamond-blue, soft warm lavender-white
    const colorsDark = [
      new THREE.Color(0xffffff), // Pure celestial white (75%)
      new THREE.Color(0xa5c9ff), // Crystalline starlight blue (15%)
      new THREE.Color(0xe0e7ff), // Soft celestial diamond white (10%)
    ];

    const isCurrentLight =
      typeof document !== 'undefined' &&
      document.documentElement.getAttribute('data-theme') === 'light';
    isLightRef.current = isCurrentLight;

    starLayers.forEach((layer, layerIdx) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(layer.count * 3);
      const starColors = new Float32Array(layer.count * 3);
      const darkColorsArray = new Float32Array(layer.count * 3);
      const lightColorsArray = new Float32Array(layer.count * 3);
      const sizes = new Float32Array(layer.count);
      const properMotionX = new Float32Array(layer.count);
      const properMotionY = new Float32Array(layer.count);

      for (let i = 0; i < layer.count; i++) {
        const i3 = i * 3;

        // Natural continuous 3D coordinate distribution:
        // Spreads smoothly across the full frustum without artificial holes
        const zSpread = layer.maxZ - layer.minZ;
        const z = layer.minZ + Math.random() * zSpread;
        const depthFactor = Math.abs(z) / 80;
        const xSpan = 85 * Math.max(1.2, depthFactor);
        const ySpan = 55 * Math.max(1.2, depthFactor);

        let x = (Math.random() - 0.5) * 2 * xSpan;
        let y = (Math.random() - 0.5) * 2 * ySpan;

        // Reading corridor comfort:
        // Prevent dense clumping directly behind central headings/portrait
        // 55% chance to push slightly outward, 45% remain as gentle stars
        // Guarantees ZERO empty voids while keeping reading text 100% legible
        const normX = x / 38;
        const normY = y / 24;
        const centerMetric = normX * normX + normY * normY;
        if (centerMetric < 1.0 && Math.random() < 0.55) {
          const angle = Math.random() * Math.PI * 2;
          const offset = 34 + Math.random() * 24;
          x = Math.cos(angle) * offset * 1.35;
          y = Math.sin(angle) * offset * 0.95;
        }

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        // DARK MODE COLOR: Radiant celestial white and icy diamond stars
        const colorRand = Math.random();
        let colorD: THREE.Color;
        if (colorRand < 0.75) {
          colorD = colorsDark[0];
        } else if (colorRand < 0.90) {
          colorD = colorsDark[1];
        } else {
          colorD = colorsDark[2];
        }
        darkColorsArray[i3] = colorD.r;
        darkColorsArray[i3 + 1] = colorD.g;
        darkColorsArray[i3 + 2] = colorD.b;

        // LIGHT MODE COLOR: MANDATORY PURE BLACK ONLY (#000000)
        // Strictly R=0, G=0, B=0. No purple, blue, lavender, or indigo!
        lightColorsArray[i3] = 0.0;
        lightColorsArray[i3 + 1] = 0.0;
        lightColorsArray[i3 + 2] = 0.0;

        // Initial active color attribute
        const activeColor = isCurrentLight ? { r: 0.0, g: 0.0, b: 0.0 } : colorD;
        starColors[i3] = activeColor.r;
        starColors[i3 + 1] = activeColor.g;
        starColors[i3 + 2] = activeColor.b;

        // Subtle individual particle scale variance
        const scaleRand = Math.random();
        const particleScale = scaleRand < 0.7 ? 0.75 + scaleRand * 0.35 : 1.1 + (scaleRand - 0.7) * 0.5;
        sizes[i] = layer.size * particleScale;

        // Gentle orbital drift
        properMotionX[i] = (Math.random() - 0.5) * 0.000003;
        properMotionY[i] = (Math.random() - 0.5) * 0.000003;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('properMotionX', new THREE.BufferAttribute(properMotionX, 1));
      geometry.setAttribute('properMotionY', new THREE.BufferAttribute(properMotionY, 1));

      // Star Material:
      // - Light Mode: NormalBlending + High-Contrast Black Opacity
      // - Dark Mode: AdditiveBlending + Luminous Cosmic Glow
      const initialOpacity = isCurrentLight ? layer.lightOpacity : layer.darkOpacity;
      const initialSize = isCurrentLight ? layer.size : layer.size * 1.15;
      const material = new THREE.PointsMaterial({
        size: initialSize,
        vertexColors: true,
        transparent: true,
        opacity: initialOpacity,
        blending: isCurrentLight ? THREE.NormalBlending : THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(geometry, material);
      stars.userData = {
        layer,
        layerIdx,
        darkColors: darkColorsArray,
        lightColors: lightColorsArray,
      };

      scene.add(stars);
      starsRef.current.push(stars);
    });

    // -------------------------------------------------------------------------
    // Shooting Star Entity (Pure Black in Light Mode, Luminous Diamond in Dark)
    // -------------------------------------------------------------------------
    const trailSegments = 14;
    const trailPositions = new Float32Array(trailSegments * 3);
    const trailColors = new Float32Array(trailSegments * 3);

    // Initial dummy off-screen placement
    for (let s = 0; s < trailSegments; s++) {
      trailPositions[s * 3] = -9999;
      trailPositions[s * 3 + 1] = -9999;
      trailPositions[s * 3 + 2] = -9999;
      
      const alpha = 1.0 - s / (trailSegments - 1);
      if (isCurrentLight) {
        trailColors[s * 3] = 0.0;
        trailColors[s * 3 + 1] = 0.0;
        trailColors[s * 3 + 2] = 0.0;
      } else {
        trailColors[s * 3] = 0.85 * alpha;
        trailColors[s * 3 + 1] = 0.95 * alpha;
        trailColors[s * 3 + 2] = 1.0 * alpha;
      }
    }

    const shootingStarGeometry = new THREE.BufferGeometry();
    shootingStarGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    shootingStarGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

    const shootingStarMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isCurrentLight ? 0.75 : 0.95,
      blending: isCurrentLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      linewidth: 1.5,
      depthWrite: false,
    });

    const shootingStarLine = new THREE.Line(shootingStarGeometry, shootingStarMaterial);
    scene.add(shootingStarLine);
    shootingStarRef.current = shootingStarLine;

    // Mouse orientation handler (desktop only)
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMobileRef.current) {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }
    };

    // Window resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation Loop
    let frameCount = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      frameCount++;
      if (isMobileRef.current && frameCount % 2 !== 0) return;

      const now = performance.now();
      const timeSeconds = now * 0.001;
      const isLight = isLightRef.current;
      const isReduced = prefersReducedMotionRef.current;

      // Forward travel speed:
      // Controlled, serene velocity in light mode; gentle perspective in dark mode
      const defaultSpeed = isMobileRef.current ? 0.012 : 0.032;
      const forwardSpeed = isReduced ? 0 : (isLight ? defaultSpeed * 0.7 : defaultSpeed);

      if (cameraRef.current) {
        cameraRef.current.position.z -= forwardSpeed;

        if (!isMobileRef.current) {
          const lookX = mouseRef.current.x * 0.018;
          const lookY = mouseRef.current.y * 0.018;
          cameraRef.current.rotation.x = lookY;
          cameraRef.current.rotation.y = lookX;
        }
      }

      // Animate Star Layers: smooth continuous movement & organic living twinkling
      starsRef.current.forEach((stars) => {
        if (!stars || !stars.geometry) return;
        const layer = stars.userData.layer as StarLayerDef;
        const layerIdx = (stars.userData.layerIdx as number) ?? 0;
        if (!layer) return;

        stars.position.z += forwardSpeed;

        // Wrap around seamlessly when passing camera
        if (stars.position.z > 80) {
          stars.position.z = -520;
          stars.rotation.z += 0.15;
        }

        // Proper motion update
        const positions = stars.geometry.attributes.position.array as Float32Array;
        const properMotionX = stars.geometry.attributes.properMotionX.array as Float32Array;
        const properMotionY = stars.geometry.attributes.properMotionY.array as Float32Array;

        for (let i = 0; i < layer.count; i++) {
          const i3 = i * 3;
          positions[i3] += properMotionX[i];
          positions[i3 + 1] += properMotionY[i];
        }
        stars.geometry.attributes.position.needsUpdate = true;

        // Gentle rotational drift
        const rotFactor = isLight ? 0.6 : 1.0;
        stars.rotation.y += layer.speed * rotFactor;
        stars.rotation.x += layer.speed * 0.3 * rotFactor;

        // Subtle celestial twinkling without CPU buffer churning
        if (stars.material instanceof THREE.PointsMaterial) {
          const baseOpacity = isLight ? layer.lightOpacity : layer.darkOpacity;
          const pulse = Math.sin(timeSeconds * 1.3 + layerIdx * 1.6) * 0.08;
          stars.material.opacity = Math.max(0.20, Math.min(1.0, baseOpacity + pulse));
        }
      });

      // -----------------------------------------------------------------------
      // Shooting Star Simulation
      // -----------------------------------------------------------------------
      const ssState = shootingStarStateRef.current;
      if (shootingStarRef.current && !isReduced) {
        const line = shootingStarRef.current;
        const posAttr = line.geometry.attributes.position;
        const posArr = posAttr.array as Float32Array;

        if (!ssState.active && now >= ssState.nextTriggerTime) {
          // Trigger new shooting star
          ssState.active = true;
          ssState.startTime = now;
          // Spawn in the upper quadrant, shooting downward-right
          const spawnX = (Math.random() - 0.6) * 90;
          const spawnY = 35 + Math.random() * 30;
          const spawnZ = -140 - Math.random() * 80;
          ssState.head.set(spawnX, spawnY, spawnZ);

          const angle = -0.45 - Math.random() * 0.25; // diagonal downwards
          ssState.dir.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.4, 0.45);
        }

        if (ssState.active) {
          const elapsed = now - ssState.startTime;
          const progress = elapsed / ssState.duration;

          if (progress >= 1.0) {
            // End shooting star, schedule next trigger in 8-15 seconds
            ssState.active = false;
            ssState.nextTriggerTime = now + 8000 + Math.random() * 7000;
            for (let s = 0; s < trailSegments * 3; s++) {
              posArr[s] = -9999;
            }
            posAttr.needsUpdate = true;
          } else {
            // Advance head
            const currentHead = ssState.head.clone().addScaledVector(ssState.dir, elapsed * 0.12);

            // Compute tapering trail
            const trailStep = ssState.dir.clone().normalize().multiplyScalar(ssState.length / trailSegments);
            for (let s = 0; s < trailSegments; s++) {
              const segPos = currentHead.clone().addScaledVector(trailStep, -s);
              posArr[s * 3] = segPos.x;
              posArr[s * 3 + 1] = segPos.y;
              posArr[s * 3 + 2] = segPos.z;
            }
            posAttr.needsUpdate = true;
          }
        }
      }

      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      starsRef.current.forEach((stars) => {
        if (stars.geometry) stars.geometry.dispose();
        if (stars.material instanceof THREE.Material) {
          stars.material.dispose();
        }
        scene.remove(stars);
      });
      starsRef.current = [];

      if (shootingStarRef.current) {
        if (shootingStarRef.current.geometry) shootingStarRef.current.geometry.dispose();
        if (shootingStarRef.current.material instanceof THREE.Material) {
          shootingStarRef.current.material.dispose();
        }
        scene.remove(shootingStarRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mount && rendererRef.current.domElement) {
          mount.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  // Theme-aware Dynamic Color & Material Update (In-place, ZERO WebGL context recreation)
  useEffect(() => {
    if (starsRef.current.length === 0) return;

    const isLight = resolvedTheme === 'light';
    isLightRef.current = isLight;

    starsRef.current.forEach((stars) => {
      if (!stars || !stars.geometry || !stars.userData) return;
      const { layer, darkColors, lightColors } = stars.userData;
      if (!layer || !darkColors || !lightColors) return;

      // In-place buffer color update
      const colorsAttr = stars.geometry.attributes.color;
      if (colorsAttr) {
        // Light mode is STRICTLY PURE BLACK (0, 0, 0)
        // Dark mode is radiant celestial white/blue/lavender
        const targetColors = isLight ? lightColors : darkColors;
        const arr = colorsAttr.array as Float32Array;
        for (let i = 0; i < arr.length; i++) {
          arr[i] = targetColors[i];
        }
        colorsAttr.needsUpdate = true;
      }

      // Update material blending, opacity, and point size
      if (stars.material instanceof THREE.PointsMaterial) {
        stars.material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
        stars.material.opacity = isLight ? layer.lightOpacity : layer.darkOpacity;
        stars.material.size = isLight ? layer.size : layer.size * 1.15;
        stars.material.needsUpdate = true;
      }
    });

    // Update shooting star colors & blending
    if (shootingStarRef.current) {
      const line = shootingStarRef.current;
      const colorAttr = line.geometry.attributes.color;
      if (colorAttr) {
        const arr = colorAttr.array as Float32Array;
        const segments = arr.length / 3;
        for (let s = 0; s < segments; s++) {
          const alpha = 1.0 - s / (segments - 1);
          if (isLight) {
            // Pure black shooting star trail in Light Mode
            arr[s * 3] = 0.0;
            arr[s * 3 + 1] = 0.0;
            arr[s * 3 + 2] = 0.0;
          } else {
            // Luminous diamond white-cyan trail in Dark Mode
            arr[s * 3] = 0.90 * alpha;
            arr[s * 3 + 1] = 0.95 * alpha;
            arr[s * 3 + 2] = 1.0 * alpha;
          }
        }
        colorAttr.needsUpdate = true;
      }

      if (line.material instanceof THREE.LineBasicMaterial) {
        line.material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
        line.material.opacity = isLight ? 0.75 : 0.95;
        line.material.needsUpdate = true;
      }
    }
  }, [resolvedTheme]);

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
        isolation: 'isolate',
      }}
    />
  );
}