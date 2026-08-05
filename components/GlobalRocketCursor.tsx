import React, { useEffect, useRef } from "react";

export default function GlobalRocketCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let isHoveringInteractive = false;
    let isMouseDown = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.onclick !== null ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          window.getComputedStyle(target).cursor === "pointer";
        isHoveringInteractive = !!isClickable;
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      spawnClickBurst();
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Theme definitions (Coding & Neobrutalist Tech themes)
    let themeIndex = 0;
    const themes = [
      {
        name: "Developer Code </>",
        primary: "#2563EB",     // Royal Blue
        secondary: "#06B6D4",   // Cyan
        accent: "#3B82F6",      // Electric Light Blue
        border: "#0F172A",      // Dark Slate Border
        particleType: "code",   // Binary / Code symbols
        colors: ["#2563EB", "#06B6D4", "#60A5FA", "#38BDF8"]
      },
      {
        name: "Matrix Terminal >_",
        primary: "#10B981",     // Emerald Green
        secondary: "#22C55E",   // Lime
        accent: "#34D399",      // Mint
        border: "#022C22",      // Dark Green Border
        particleType: "matrix", // 1s and 0s
        colors: ["#10B981", "#22C55E", "#4ADE80", "#A7F3D0"]
      },
      {
        name: "Neobrutalist Pixel",
        primary: "#FDE047",     // Bold Yellow
        secondary: "#A855F7",   // Cyber Purple
        accent: "#EC4899",      // Vibrant Pink
        border: "#0F172A",      // Sharp Black Border
        particleType: "blocks", // Neo-brutalist square pixels
        colors: ["#FDE047", "#A855F7", "#EC4899", "#3B82F6"]
      },
      {
        name: "Cyber Circuit ⚡",
        primary: "#F97316",     // Neon Orange
        secondary: "#EF4444",   // Bright Red
        accent: "#FACC15",      // Yellow Volt
        border: "#1E1B4B",      // Deep Navy Border
        particleType: "sparks", // Electric sparks
        colors: ["#F97316", "#EF4444", "#FACC15", "#FB923C"]
      }
    ];

    const handleDblClick = () => {
      themeIndex = (themeIndex + 1) % themes.length;
      spawnClickBurst();
    };
    window.addEventListener("dblclick", handleDblClick);

    // Easing cursor positions
    let cursorX = width / 2;
    let cursorY = height / 2;

    // Particles system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      char?: string;
      color: string;
      rotation?: number;
      vRot?: number;
    }

    let particles: Particle[] = [];

    const codeChars = ["0", "1", "{", "}", "</>", ";", "=>", "const", "git", "npm"];

    const spawnTrailParticle = (x: number, y: number) => {
      const currentTheme = themes[themeIndex];
      const color = currentTheme.colors[Math.floor(Math.random() * currentTheme.colors.length)];
      const char = codeChars[Math.floor(Math.random() * codeChars.length)];

      particles.push({
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        vx: (Math.random() - 0.5) * 1.2,
        vy: currentTheme.particleType === "matrix" ? 0.8 + Math.random() * 1.5 : (Math.random() - 0.5) * 1.2 - 0.5,
        alpha: 0.9,
        size: Math.floor(Math.random() * 4) + 4,
        char: currentTheme.particleType === "code" || currentTheme.particleType === "matrix" ? char : undefined,
        color,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.1
      });
    };

    const spawnClickBurst = () => {
      if (mouseX === -1000) return;
      const currentTheme = themes[themeIndex];
      const count = 14;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2 - 0.1);
        const speed = 2.5 + Math.random() * 3.5;
        const color = currentTheme.colors[i % currentTheme.colors.length];
        const char = codeChars[i % codeChars.length];

        particles.push({
          x: cursorX,
          y: cursorY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: Math.floor(Math.random() * 4) + 5,
          char: currentTheme.particleType === "code" || currentTheme.particleType === "matrix" ? char : undefined,
          color,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2
        });
      }
    };

    // Render Arrow + Code Emblem Cursor (Exact vector shape matching Image 2 reference cursor)
    const drawPixelTechCursor = (x: number, y: number, time: number) => {
      const theme = themes[themeIndex];
      const scale = isHoveringInteractive ? 1.35 : 1.15;

      ctx.save();
      ctx.translate(x, y);

      // Pulse effect on click
      if (isMouseDown) {
        ctx.scale(0.88, 0.88);
      }

      // Exact 7-vertex vector path matching Image 2 reference cursor
      ctx.beginPath();
      ctx.moveTo(0, 0);                               // Top-left tip
      ctx.lineTo(4.2 * scale, 20.0 * scale);           // Left wing tip
      ctx.lineTo(9.2 * scale, 14.0 * scale);           // Left inner corner
      ctx.lineTo(15.2 * scale, 20.0 * scale);          // Stem bottom-left (45° angle)
      ctx.lineTo(18.7 * scale, 16.5 * scale);          // Stem bottom-right (90° perp end)
      ctx.lineTo(12.7 * scale, 10.5 * scale);          // Stem top-right (45° angle)
      ctx.lineTo(19.2 * scale, 9.5 * scale);           // Right wing tip
      ctx.closePath();

      // Solid Primary Fill (Uniform color throughout entire arrow)
      ctx.fillStyle = isHoveringInteractive ? theme.accent : theme.primary;
      ctx.fill();

      // Sharp Neobrutalist Border
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = theme.border;
      ctx.lineJoin = "miter";
      ctx.lineCap = "square";
      ctx.miterLimit = 3;
      ctx.stroke();

      // Draw Mini Code Emblem next to pointer (</> or >_)
      const emblemOffsetX = 22 * scale;
      const emblemOffsetY = 9 * scale;

      ctx.font = `bold ${isHoveringInteractive ? 11 : 9}px "Share Tech Mono", monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      // Shadow / Neobrutalist backing for code emblem tag
      const tagText = isHoveringInteractive ? "</>" : theme.name.includes(">_") ? ">_" : "</>";
      const textMetrics = ctx.measureText(tagText);
      const bgW = textMetrics.width + 8;
      const bgH = 14;

      // Dark border box for code badge
      ctx.fillStyle = theme.border;
      ctx.fillRect(emblemOffsetX - 2, emblemOffsetY - 8, bgW + 4, bgH + 4);

      // Inner fill for code badge
      ctx.fillStyle = isHoveringInteractive ? theme.secondary : "#FFFFFF";
      ctx.fillRect(emblemOffsetX, emblemOffsetY - 6, bgW, bgH);

      // Text inside code badge
      ctx.fillStyle = isHoveringInteractive ? "#FFFFFF" : theme.primary;
      ctx.fillText(tagText, emblemOffsetX + 4, emblemOffsetY + 1);

      ctx.restore();
    };

    let lastTrailTime = 0;

    const animate = () => {
      const time = performance.now();

      ctx.clearRect(0, 0, width, height);

      // 1. Smooth Easing to mouse coords
      if (mouseX !== -1000 && mouseY !== -1000) {
        const prevX = cursorX;
        const prevY = cursorY;

        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;

        const moveDist = Math.hypot(cursorX - prevX, cursorY - prevY);

        if (moveDist > 1.5 && time - lastTrailTime > 25) {
          spawnTrailParticle(cursorX + 12, cursorY + 12);
          lastTrailTime = time;
        }
      }

      // 2. Update & Draw Particles
      particles.forEach(pt => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.022;
        if (pt.rotation !== undefined && pt.vRot !== undefined) {
          pt.rotation += pt.vRot;
        }
      });

      particles = particles.filter(pt => pt.alpha > 0);

      particles.forEach(pt => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);

        if (pt.char) {
          // Code character particle
          ctx.font = `bold ${pt.size + 6}px "Share Tech Mono", monospace`;
          ctx.fillStyle = pt.color;
          ctx.fillText(pt.char, pt.x, pt.y);
        } else {
          // Pixel block / spark particle
          ctx.translate(pt.x, pt.y);
          if (pt.rotation) ctx.rotate(pt.rotation);

          ctx.fillStyle = pt.color;
          ctx.fillRect(-pt.size / 2, -pt.size / 2, pt.size, pt.size);

          // Dark pixel outline for neobrutalist style
          ctx.strokeStyle = "#0F172A";
          ctx.lineWidth = 1;
          ctx.strokeRect(-pt.size / 2, -pt.size / 2, pt.size, pt.size);
        }
        ctx.restore();
      });

      // 3. Draw Tech Pixel Cursor
      if (mouseX !== -1000 && mouseY !== -1000) {
        drawPixelTechCursor(cursorX, cursorY, time);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("dblclick", handleDblClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999] block"
    />
  );
}
