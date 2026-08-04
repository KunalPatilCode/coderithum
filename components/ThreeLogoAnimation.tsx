import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeLogoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // 2. Isometric Camera Setup
    const aspect = width / height;
    const d = 10;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0.4, 0); // Look slightly upward to capture the floating text

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Master Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // 4. Materials Setup
    const baseTopMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      emissive: 0xffffff,
      emissiveIntensity: 0.15
    });

    const baseSideMaterial = new THREE.MeshPhongMaterial({
      color: 0x2563eb, // Brand blue (#2563EB)
      flatShading: true
    });

    const hashtagMaterial = new THREE.MeshPhongMaterial({
      color: 0x2563eb, // Brand blue (#2563EB)
      flatShading: true,
    });

    const borderMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4, // Brand cyan (#06B6D4)
      flatShading: true
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2
    });

    const baseBoxMaterials = [
      baseSideMaterial, // Right side
      baseSideMaterial, // Left side
      baseTopMaterial,  // Top surface
      baseSideMaterial, // Bottom
      baseSideMaterial, // Front side
      baseSideMaterial  // Back side
    ];

    // 5. Build Base Platform
    const baseGeo = new THREE.BoxGeometry(9.6, 1.6, 9.6);
    const baseMesh = new THREE.Mesh(baseGeo, baseBoxMaterials);
    baseMesh.position.y = -0.8;
    baseMesh.receiveShadow = true;
    logoGroup.add(baseMesh);

    // Outer Border Frame
    const outerBoxGeo = new THREE.BoxGeometry(10.2, 1.8, 10.2);
    const outerBorderMesh = new THREE.Mesh(outerBoxGeo, borderMaterial);
    outerBorderMesh.position.y = -0.8;
    logoGroup.add(outerBorderMesh);

    // 6. Build 3D Hashtag (#)
    const hashtagGroup = new THREE.Group();
    const blockSize = 1.2;
    const blockGeo = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
    const edgesGeo = new THREE.EdgesGeometry(blockGeo);

    const hashtagGrid = [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0]
    ];

    const offset = 2.4; 
    const activeBlockPositions: { x: number; z: number }[] = [];

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (hashtagGrid[r][c] === 1) {
          const posX = (c * 1.2) - offset;
          const posZ = (r * 1.2) - offset;

          const block = new THREE.Mesh(blockGeo, hashtagMaterial);
          block.position.set(posX, 0.6, posZ);
          block.castShadow = true;
          block.receiveShadow = true;
          hashtagGroup.add(block);

          const line = new THREE.LineSegments(edgesGeo, lineMaterial);
          line.position.copy(block.position);
          hashtagGroup.add(line);

          activeBlockPositions.push({ x: posX, z: posZ });
        }
      }
    }
    logoGroup.add(hashtagGroup);

    // 7. Add Orbital Neon Ring
    const ringGeo = new THREE.RingGeometry(3.6, 3.8, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.6;
    logoGroup.add(ringMesh);

    // 8. 3D Voxel Letters Definition for GEC DAMAN
    const voxelLetters: Record<string, string[]> = {
      G: ["1111", "1000", "1011", "1001", "1111"],
      E: ["1111", "1000", "1110", "1000", "1111"],
      C: ["1111", "1000", "1000", "1000", "1111"],
      D: ["1110", "1001", "1001", "1001", "1110"],
      A: ["0110", "1001", "1111", "1001", "1001"],
      M: ["1001", "1111", "1001", "1001", "1001"],
      N: ["1001", "1101", "1011", "1001", "1001"],
    };

    function createVoxelWord(word: string, color: number) {
      const wordGroup = new THREE.Group();
      const pixelSize = 0.22;
      const charSpacing = 0.22;
      
      const charWidth = 4 * pixelSize; // 0.88
      const charHeight = 5 * pixelSize; // 1.10
      const totalWidth = word.length * charWidth + (word.length - 1) * charSpacing;
      const startX = -totalWidth / 2;

      const voxelMat = new THREE.MeshPhongMaterial({
        color: color,
        flatShading: true,
        emissive: 0x050b14,
        emissiveIntensity: 0.05
      });
      const voxelGeo = new THREE.BoxGeometry(pixelSize * 0.95, pixelSize * 0.95, pixelSize * 0.95);
      const voxelEdges = new THREE.EdgesGeometry(voxelGeo);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, linewidth: 1.5 });

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const glyph = voxelLetters[char];
        if (!glyph) continue;

        const charOffset = startX + i * (charWidth + charSpacing);

        for (let r = 0; r < 5; r++) {
          const rowStr = glyph[r];
          for (let c = 0; c < 4; c++) {
            if (rowStr[c] === "1") {
              const x = charOffset + c * pixelSize;
              const y = (4 - r) * pixelSize; // flip vertical

              const cube = new THREE.Mesh(voxelGeo, voxelMat);
              cube.position.set(x, y, 0);
              cube.castShadow = true;
              cube.receiveShadow = true;
              wordGroup.add(cube);

              const wire = new THREE.LineSegments(voxelEdges, lineMat);
              wire.position.set(x, y, 0);
              wordGroup.add(wire);
            }
          }
        }
      }
      return wordGroup;
    }

    // 3D Voxel Counter-Rotating Texts (Dark navy blocks with cyan wireframes for maximum visibility)
    const gecGroup = createVoxelWord("GEC", 0x0f172a);
    const damanGroup = createVoxelWord("DAMAN", 0x0f172a);

    // Position them floating above the hashtag monument
    gecGroup.position.y = 3.6;
    damanGroup.position.y = 2.2;

    logoGroup.add(gecGroup);
    logoGroup.add(damanGroup);

    // 9. Dynamic Binary Textures & Particles Setup
    function createBinaryTexture(text: string) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);
      
      ctx.font = 'Bold 48px monospace';
      ctx.fillStyle = '#06b6d4'; // Cyan text color
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 32, 32);

      return new THREE.CanvasTexture(canvas);
    }

    const texture0 = createBinaryTexture('0');
    const texture1 = createBinaryTexture('1');

    const binaryParticles: THREE.Sprite[] = [];
    const particleCount = 35;

    function resetParticle(sprite: THREE.Sprite) {
      const spawnPos = activeBlockPositions[Math.floor(Math.random() * activeBlockPositions.length)];
      
      sprite.position.x = spawnPos.x + (Math.random() - 0.5) * 0.6;
      sprite.position.y = 1.2;
      sprite.position.z = spawnPos.z + (Math.random() - 0.5) * 0.6;
      
      sprite.userData = {
        speed: 0.03 + Math.random() * 0.04,
        opacity: 1.0,
        fadeSpeed: 0.01 + Math.random() * 0.015
      };
      
      if (sprite.material instanceof THREE.SpriteMaterial) {
        sprite.material.opacity = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const isOne = Math.random() > 0.5;
      const spriteMaterial = new THREE.SpriteMaterial({
        map: isOne ? texture1 : texture0,
        transparent: true,
        opacity: 0
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.9, 0.9, 1);
      
      resetParticle(sprite);
      logoGroup.add(sprite);
      binaryParticles.push(sprite);
    }

    // 10. Animation Loop
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = performance.now() * 0.001;

      // Floating Levitation & Rotation Effect for main hashtag monument
      logoGroup.position.y = Math.sin(time * 2) * 0.3;
      logoGroup.rotation.y = Math.sin(time * 0.5) * 0.25;

      // Counter-rotation text animations
      gecGroup.rotation.y = time * 0.8;
      damanGroup.rotation.y = -time * 0.8;

      // Rotate the orbital cyber ring slowly in the opposite direction
      ringMesh.rotation.z = -time * 0.4;

      // Animate Floating '0' and '1' Particles
      binaryParticles.forEach(sprite => {
        sprite.position.y += sprite.userData.speed;
        sprite.userData.opacity -= sprite.userData.fadeSpeed;
        if (sprite.material instanceof THREE.SpriteMaterial) {
          sprite.material.opacity = Math.max(0, sprite.userData.opacity);
        }

        if (sprite.userData.opacity <= 0) {
          resetParticle(sprite);
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // 11. Handle Resizing
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      
      const aspect = w / h;
      camera.left = -d * aspect;
      camera.right = d * aspect;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[350px] lg:min-h-[450px] flex items-center justify-center overflow-hidden" />;
}
