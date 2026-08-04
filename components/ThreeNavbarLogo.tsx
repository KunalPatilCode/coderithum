import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeNavbarLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = 40;
    const height = 40;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // Camera setup - Orthographic for isometric look
    const d = 3.2;
    const camera = new THREE.OrthographicCamera(-d, d, d, -d, 1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // Simple lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Voxel Hashtag Group
    const hashtagGroup = new THREE.Group();
    scene.add(hashtagGroup);

    // Materials
    const blockMat = new THREE.MeshPhongMaterial({
      color: 0x2563eb, // Brand blue
      flatShading: true,
      emissive: 0x2563eb,
      emissiveIntensity: 0.1
    });

    const borderMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan wireframe
      wireframe: true
    });

    const blockSize = 0.8;
    const blockGeo = new THREE.BoxGeometry(blockSize, blockSize, blockSize);

    const hashtagGrid = [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0]
    ];

    const offset = 1.6; // (5 blocks * 0.8 size)/2 - block offset

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (hashtagGrid[r][c] === 1) {
          const posX = (c * 0.8) - offset;
          const posZ = (r * 0.8) - offset;

          const block = new THREE.Mesh(blockGeo, blockMat);
          block.position.set(posX, 0, posZ);
          hashtagGroup.add(block);

          // Add a thin cyan wireframe overlay
          const wire = new THREE.Mesh(blockGeo, borderMat);
          wire.position.copy(block.position);
          wire.scale.set(1.02, 1.02, 1.02); // Slightly larger to prevent z-fighting
          hashtagGroup.add(wire);
        }
      }
    }

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.0015;

      // Spin the logo smoothly
      hashtagGroup.rotation.y = time;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-10 h-10 overflow-hidden bg-transparent flex items-center justify-center cursor-pointer shrink-0 transition-transform group-hover:scale-105"
    />
  );
}
