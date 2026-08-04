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

    // Mouse coordinates (global viewport client coords)
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Theme index and color definitions
    let themeIndex = 0;
    const themes = [
      {
        primary: "#EF4444",   // Red nose/fins
        secondary: "#2563EB", // Blue details
        window: "#06B6D4",    // Cyan window
        body: "#FFFFFF"       // White body
      },
      {
        primary: "#06B6D4",   // Cyan nose/fins
        secondary: "#A855F7", // Purple details
        window: "#FDE047",    // Yellow window
        body: "#FFFFFF"
      },
      {
        primary: "#22C55E",   // Green nose/fins
        secondary: "#FDE047", // Yellow details
        window: "#06B6D4",    // Cyan window
        body: "#FFFFFF"
      },
      {
        primary: "#F97316",   // Orange nose/fins
        secondary: "#EF4444", // Red details
        window: "#22D3EE",    // Cyan window
        body: "#FFFFFF"
      }
    ];

    const handleDblClick = () => {
      themeIndex = (themeIndex + 1) % themes.length;
    };
    window.addEventListener("dblclick", handleDblClick);

    // Easing positions
    let rocketX = width / 2;
    let rocketY = height / 2;

    // Trails and sparks
    let sparks: { x: number; y: number; speedX: number; speedY: number; alpha: number }[] = [];
    let smoke: { x: number; y: number; alpha: number }[] = [];

    const getRocketPixelColor = (dc: number, dr: number, time: number) => {
      // Nose Cone (dr = -3, -2)
      if (dr === -3) {
        if (dc === 0) return themes[themeIndex].primary;
      }
      if (dr === -2) {
        if (dc === 0) return themes[themeIndex].primary;
        if (dc === -1 || dc === 1) return themes[themeIndex].body;
      }

      // Main Body Tube (dr = -1, 0, 1)
      if (dr >= -1 && dr <= 1) {
        if (dc === 0) {
          if (dr === 0) return themes[themeIndex].window;
          return themes[themeIndex].body;
        }
        if (dc === -1 || dc === 1) {
          return themes[themeIndex].body;
        }
      }

      // Fins (dr = 2)
      if (dr === 2) {
        if (dc === -2 || dc === 2) return themes[themeIndex].primary;
        if (dc === -1 || dc === 1) return themes[themeIndex].secondary;
        if (dc === 0) return themes[themeIndex].body;
      }

      // Flame (dr = 3, 4)
      if (dr === 3) {
        if (dc === 0) return "#FB923C"; // Orange flame core
        if (dc === -1 || dc === 1) return "#FDE047"; // Yellow flame sides
      }
      if (dr === 4) {
        if (dc === 0) {
          return Math.sin(time * 0.05) > 0 ? "#FDE047" : null;
        }
      }

      return null;
    };

    const animate = () => {
      const time = performance.now();

      // Clear canvas with transparent clearRect
      ctx.clearRect(0, 0, width, height);

      const angle = -Math.PI / 4; // Rotate 45 degrees counter-clockwise to point to top-left
      const pixelSize = 4; // Render size of rocket pixels
      const localExhaustY = 7 * pixelSize; // 28px
      const exhaustX = rocketX - localExhaustY * Math.sin(angle);
      const exhaustY = rocketY + localExhaustY * Math.cos(angle);

      // 1. Easing rocket position towards mouse coordinates
      if (mouseX !== -1000 && mouseY !== -1000) {
        const prevX = rocketX;
        const prevY = rocketY;

        rocketX += (mouseX - rocketX) * 0.15;
        rocketY += (mouseY - rocketY) * 0.15;

        const moveDist = Math.sqrt(Math.pow(rocketX - prevX, 2) + Math.pow(rocketY - prevY, 2));
        if (moveDist > 1) {
          if (smoke.length === 0 || Math.sqrt(Math.pow(exhaustX - smoke[smoke.length - 1].x, 2) + Math.pow(exhaustY - smoke[smoke.length - 1].y, 2)) > 15) {
            smoke.push({ x: exhaustX, y: exhaustY, alpha: 1.0 });
          }
        }
      }

      // 2. Update and draw smoke trail
      smoke.forEach(s => {
        s.alpha -= 0.015;
      });
      smoke = smoke.filter(s => s.alpha > 0);

      smoke.forEach(s => {
        ctx.fillStyle = `rgba(148, 163, 184, ${s.alpha * 0.4})`;
        ctx.fillRect(s.x - 4, s.y - 4, 8, 8);
      });

      // 3. Update and draw rocket engine sparks
      if (Math.random() < 0.45 && mouseX !== -1000) {
        const sparkSpeed = 1.8 + Math.random() * 2.2;
        // Direction vector out of the rotated exhaust (dx=0.707, dy=0.707)
        const exVectorX = 0.707;
        const exVectorY = 0.707;
        sparks.push({
          x: exhaustX + (Math.random() * 6 - 3),
          y: exhaustY + (Math.random() * 6 - 3),
          speedX: sparkSpeed * exVectorX + (Math.random() * 1.0 - 0.5),
          speedY: sparkSpeed * exVectorY + (Math.random() * 1.0 - 0.5),
          alpha: 1.0
        });
      }

      sparks.forEach(s => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.alpha -= 0.04;
      });
      sparks = sparks.filter(s => s.alpha > 0);

      sparks.forEach(s => {
        let color = `rgba(253, 224, 71, ${s.alpha})`; // yellow spark
        if (s.alpha < 0.35) {
          color = `rgba(239, 68, 68, ${s.alpha})`; // red embers
        } else if (s.alpha < 0.7) {
          color = `rgba(251, 146, 60, ${s.alpha})`; // orange flame
        }
        ctx.fillStyle = color;
        ctx.fillRect(s.x - 2, s.y - 2, 4, 4);
      });

      // 4. Draw pixel rocket cursor
      ctx.save();
      ctx.translate(rocketX, rocketY);
      ctx.rotate(angle);
      ctx.translate(0, 3 * pixelSize); // Align the nose cone tip with mouse click position
      for (let dc = -2; dc <= 2; dc++) {
        for (let dr = -3; dr <= 4; dr++) {
          const color = getRocketPixelColor(dc, dr, time);
          if (color !== null) {
            ctx.fillStyle = color;
            ctx.fillRect(dc * pixelSize, dr * pixelSize, pixelSize, pixelSize);
          }
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
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
