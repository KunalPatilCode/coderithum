import React, { useEffect, useRef } from "react";

export default function InteractivePixelArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<{ c: number; r: number; alpha: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Find the nearest parent container that captures mouse events
    const eventTarget = container.closest(".relative") || container;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cellSize = 10;

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseInCanvas = false;

    // Popping circles
    let poppingCircles: { x: number; y: number; radius: number; maxRadius: number; speed: number; alpha: number }[] = [];

    // Theme Index and color definitions
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

    // Easing circle coordinates
    let circleC = 0;
    let circleR = 0;

    // Font representation for "CODERITHUM" (4x5 pixel grid)
    const font: Record<string, string[]> = {
      C: ["1111", "1000", "1000", "1000", "1111"],
      O: ["1111", "1001", "1001", "1001", "1111"],
      D: ["1110", "1001", "1001", "1001", "1110"],
      E: ["1111", "1000", "1110", "1000", "1111"],
      R: ["1110", "1001", "1110", "1010", "1001"],
      I: ["111", "010", "010", "010", "111"],
      T: ["11111", "00100", "00100", "00100", "00100"],
      H: ["1001", "1001", "1111", "1001", "1001"],
      U: ["1001", "1001", "1001", "1001", "1111"],
      M: ["10001", "11011", "10101", "10001", "10001"],
      L: ["1000", "1000", "1000", "1000", "1111"],
      B: ["1110", "1001", "1110", "1001", "1110"],
      G: ["1111", "1000", "1011", "1001", "1111"],
      A: ["0110", "1001", "1111", "1001", "1001"],
      N: ["1001", "1101", "1011", "1001", "1001"]
    };

    // Typewriter state variables
    let textState = 0; // 0=typing CODERITHUM, 1=pause, 2=erasing, 3=typing GEC DAMAN, 4=pause, 5=erasing, 6=typing TECH CLUB, 7=pause, 8=erasing
    let currentText = "";
    let lastTextChangeTime = 0;

    const hashtag = [
      "01010",
      "11111",
      "01010",
      "11111",
      "01010"
    ];

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight || 400;

      // Handle high DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Determine cell size dynamically based on width to fit "CODERITHUM" (needs at least 55 cells)
      cellSize = Math.max(6, Math.min(10, Math.floor(width / 60)));
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initial positions
    circleC = 0;
    circleR = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseInCanvas = true;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseInCanvas = false;
    };

    eventTarget.addEventListener("mousemove", handleMouseMove as EventListener);
    eventTarget.addEventListener("mouseleave", handleMouseLeave as EventListener);

    const handleDblClick = () => {
      themeIndex = (themeIndex + 1) % themes.length;
    };
    eventTarget.addEventListener("dblclick", handleDblClick as EventListener);

    // Color definitions (Theme of Ice)
    const CRYSTAL_BLUE = "#2563EB";
    const DEEP_NAVY = "#0F172A";
    const CYAN = "#06B6D4";

    const animate = () => {
      const time = performance.now();

      // Clear canvas with white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Draw light grey grid lines
      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellSize, 0);
        ctx.lineTo(c * cellSize, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellSize);
        ctx.lineTo(width, r * cellSize);
        ctx.stroke();
      }

      // 1. Update interactive circle coordinates (easing)
      let targetC = 15;
      let targetR = Math.floor(rows * 0.7);

      if (mouseInCanvas) {
        targetC = mouseX / cellSize;
        targetR = mouseY / cellSize;
      } else {
        // Float around a bit when resting
        targetC = Math.max(12, Math.min(cols - 12, cols * 0.25 + Math.sin(time * 0.001) * 3));
        targetR = Math.max(12, Math.min(rows - 12, rows * 0.7 + Math.cos(time * 0.0015) * 2));
      }

      const prevC = circleC;
      const prevR = circleR;

      circleC += (targetC - circleC) * 0.08;
      circleR += (targetR - circleR) * 0.08;

      // Add to trail if moving
      const moveDist = Math.sqrt(Math.pow(circleC - prevC, 2) + Math.pow(circleR - prevR, 2));
      if (moveDist > 0.1) {
        const trail = trailRef.current;
        if (trail.length === 0) {
          trail.push({ c: circleC, r: circleR, alpha: 1.0 });
        } else {
          const last = trail[trail.length - 1];
          const distFromLast = Math.sqrt(Math.pow(circleC - last.c, 2) + Math.pow(circleR - last.r, 2));
          if (distFromLast > 1.8) {
            trail.push({ c: circleC, r: circleR, alpha: 1.0 });
          }
        }
      }

      // Update trail opacity
      trailRef.current.forEach(pt => {
        pt.alpha -= 0.015;
      });
      trailRef.current = trailRef.current.filter(pt => pt.alpha > 0);

      // 7-Vertex Arrow Cursor Path2D for 100% exact shape and prominent hover visibility
      const cursorScale = 1.8;
      const cursorPath = new Path2D();
      cursorPath.moveTo(0, 0);
      cursorPath.lineTo(4.2 * cursorScale, 20.0 * cursorScale);
      cursorPath.lineTo(9.2 * cursorScale, 14.0 * cursorScale);
      cursorPath.lineTo(15.2 * cursorScale, 20.0 * cursorScale);
      cursorPath.lineTo(18.7 * cursorScale, 16.5 * cursorScale);
      cursorPath.lineTo(12.7 * cursorScale, 10.5 * cursorScale);
      cursorPath.lineTo(19.2 * cursorScale, 9.5 * cursorScale);
      cursorPath.closePath();

      const circleCells = new Set<string>();
      const cursorPx = circleC * cellSize;
      const cursorPy = circleR * cellSize;

      const minC = Math.floor((cursorPx - 5) / cellSize);
      const maxC = Math.ceil((cursorPx + 25 * cursorScale) / cellSize);
      const minR = Math.floor((cursorPy - 5) / cellSize);
      const maxR = Math.ceil((cursorPy + 25 * cursorScale) / cellSize);

      for (let c = minC; c <= maxC; c++) {
        for (let r = minR; r <= maxR; r++) {
          const cellCenterX = (c + 0.5) * cellSize - cursorPx;
          const cellCenterY = (r + 0.5) * cellSize - cursorPy;
          if (ctx.isPointInPath(cursorPath, cellCenterX, cellCenterY)) {
            circleCells.add(`${c},${r}`);
          }
        }
      }

      // Draw pixelated city skyline silhouette with twinkling windows & blinking warning lights
      const getBuildingHeight = (col: number) => {
        const blockId = Math.floor(col / 6);
        const phase = blockId % 5;
        let h = 4;
        if (phase === 0) h = 8;
        else if (phase === 1) h = 5;
        else if (phase === 2) h = 10;
        else if (phase === 3) h = 6;
        else if (phase === 4) h = 9;

        const isCenter = (col % 6) === 2;
        if (isCenter && (blockId % 2 === 0)) return h + 2;

        const isGap = (col % 6) === 5;
        if (isGap) return 0;

        return h;
      };

      for (let c = 0; c < cols; c++) {
        const buildingH = getBuildingHeight(c);
        if (buildingH <= 0) continue;

        const startRow = Math.floor(rows - buildingH);
        for (let r = Math.max(0, startRow); r < rows; r++) {
          // If cell is inside hover cursor shape, render in vibrant cyan with sharp border
          if (circleCells.has(`${c},${r}`)) {
            ctx.fillStyle = CYAN;
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            ctx.strokeStyle = DEEP_NAVY;
            ctx.lineWidth = 1;
            ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
            continue;
          }

          if (r === startRow) {
            // Draw flashing red warning light on antenna tips, or slate building tops
            const isAntenna = (c % 6) === 2 && (buildingH > 12);
            if (isAntenna) {
              ctx.fillStyle = (Math.sin(time * 0.005) > 0) ? "#EF4444" : "#475569";
            } else {
              ctx.fillStyle = "#334155"; // Slate building top
            }
          } else {
            // Draw twinkling window lights inside building body
            const isWindowCol = (c % 6) === 1 || (c % 6) === 3;
            const isWindowRow = (rows - r) % 3 === 0;
            const isBelowAntenna = (rows - r) < buildingH - 2;

            if (isWindowCol && isWindowRow && isBelowAntenna) {
              const blockId = Math.floor(c / 6);
              const windowOn = Math.sin(blockId * 7 + r * 13 + time * 0.001) > -0.2;
              ctx.fillStyle = windowOn ? ((blockId % 2 === 0) ? "#FDE047" : "#22D3EE") : "#0F172A";
            } else {
              ctx.fillStyle = "#0F172A"; // Solid deep navy building silhouette
            }
          }
          ctx.fillRect(c * cellSize + 0.5, r * cellSize + 0.5, cellSize - 1, cellSize - 1);
        }
      }

      // Render hover cursor shape cells over sky/non-building areas for 100% visibility anywhere
      circleCells.forEach(cellKey => {
        const [cStr, rStr] = cellKey.split(",");
        const cc = parseInt(cStr, 10);
        const cr = parseInt(rStr, 10);
        const buildingH = getBuildingHeight(cc);
        const startRow = Math.floor(rows - buildingH);

        // Only draw for sky areas (above buildings) to avoid duplicate draw
        if (cr < startRow || buildingH <= 0) {
          ctx.fillStyle = CYAN;
          ctx.fillRect(cc * cellSize, cr * cellSize, cellSize, cellSize);
          ctx.strokeStyle = DEEP_NAVY;
          ctx.lineWidth = 1;
          ctx.strokeRect(cc * cellSize, cr * cellSize, cellSize, cellSize);
        }
      });

      // Draw random popping circles (digital rain ripple effect)
      if (Math.random() < 0.015) {
        poppingCircles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0,
          maxRadius: 25 + Math.random() * 45,
          speed: 0.6 + Math.random() * 0.8,
          alpha: 1.0
        });
      }

      poppingCircles.forEach(pc => {
        pc.radius += pc.speed;
        pc.alpha = 1.0 - (pc.radius / pc.maxRadius);
      });
      poppingCircles = poppingCircles.filter(pc => pc.radius < pc.maxRadius && pc.alpha > 0);

      poppingCircles.forEach(pc => {
        // Outer cyan ring
        ctx.strokeStyle = `rgba(6, 182, 212, ${pc.alpha * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pc.x, pc.y, pc.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner blue ring
        ctx.strokeStyle = `rgba(37, 99, 235, ${pc.alpha * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pc.x, pc.y, pc.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 3. Render brand text "CODERITHUM" & logo inside grid
      const textWidth = 45;
      const brandHeight = 5;
      const logoWidth = 5;

      const sideBySide = cols >= 58;

      let logoStartC = 0;
      let logoStartR = 0;
      let textStartC = 0;
      let textStartR = 0;

      if (sideBySide) {
        const totalBrandWidth = logoWidth + 2 + textWidth;
        logoStartC = Math.max(2, Math.floor((cols - totalBrandWidth) / 2));
        logoStartR = Math.max(9, Math.floor(rows * 0.28));
        textStartC = logoStartC + logoWidth + 2;
        textStartR = logoStartR;
      } else {
        logoStartC = Math.max(2, Math.floor((cols - logoWidth) / 2));
        logoStartR = Math.max(7, Math.floor(rows * 0.22));
        textStartC = Math.max(2, Math.floor((cols - textWidth) / 2));
        textStartR = logoStartR + logoWidth + 2;
      }

      const drawPixel = (cc: number, cr: number, color: string) => {
        if (circleCells.has(`${cc},${cr}`)) return;
        ctx.fillStyle = color;
        ctx.fillRect(cc * cellSize + 0.5, cr * cellSize + 0.5, cellSize - 1, cellSize - 1);
      };

      // Draw Hashtag Logo
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (hashtag[r][c] === "1") {
            const pulse = Math.sin(time * 0.003 + r + c) > 0;
            drawPixel(logoStartC + c, logoStartR + r, pulse ? CYAN : CRYSTAL_BLUE);
          }
        }
      }

      // Typewriter state updates
      const phaseDuration = (textState === 1 || textState === 4 || textState === 7) ? 2000 : ((textState === 2 || textState === 5 || textState === 8) ? 75 : 150);
      if (time - lastTextChangeTime > phaseDuration) {
        lastTextChangeTime = time;
        if (textState === 0) {
          // Typing CODERITHUM
          const target = "CODERITHUM";
          if (currentText.length < target.length) {
            currentText = target.slice(0, currentText.length + 1);
          } else {
            textState = 1; // pause
          }
        } else if (textState === 1) {
          // Pause after CODERITHUM
          textState = 2; // start erasing
        } else if (textState === 2) {
          // Erasing CODERITHUM
          if (currentText.length > 0) {
            currentText = currentText.slice(0, -1);
          } else {
            textState = 3; // start typing GEC DAMAN
          }
        } else if (textState === 3) {
          // Typing GEC DAMAN
          const target = "GEC DAMAN";
          if (currentText.length < target.length) {
            currentText = target.slice(0, currentText.length + 1);
          } else {
            textState = 4; // pause
          }
        } else if (textState === 4) {
          // Pause after GEC DAMAN
          textState = 5; // start erasing
        } else if (textState === 5) {
          // Erasing GEC DAMAN
          if (currentText.length > 0) {
            currentText = currentText.slice(0, -1);
          } else {
            textState = 6; // start typing TECH CLUB
          }
        } else if (textState === 6) {
          // Typing TECH CLUB
          const target = "TECH CLUB";
          if (currentText.length < target.length) {
            currentText = target.slice(0, currentText.length + 1);
          } else {
            textState = 7; // pause
          }
        } else if (textState === 7) {
          // Pause after TECH CLUB
          textState = 8; // start erasing
        } else if (textState === 8) {
          // Erasing TECH CLUB
          if (currentText.length > 0) {
            currentText = currentText.slice(0, -1);
          } else {
            textState = 0; // cycle back to typing CODERITHUM
          }
        }
      }

      // Draw typed characters from currentText
      let currentOffsetC = 0;
      for (let i = 0; i < currentText.length; i++) {
        const char = currentText[i];
        if (char === " ") {
          currentOffsetC += 4; // space width is 3 cells + 1 gap
          continue;
        }
        const glyph = font[char];
        if (!glyph) continue;

        const charWidth = glyph[0].length;
        for (let r = 0; r < brandHeight; r++) {
          const rowStr = glyph[r];
          for (let c = 0; c < charWidth; c++) {
            if (rowStr[c] === "1") {
              const pulse = Math.sin(time * 0.002 + r + currentOffsetC * 0.2) > 0.1;
              const color = pulse ? CRYSTAL_BLUE : DEEP_NAVY;
              drawPixel(textStartC + currentOffsetC + c, textStartR + r, color);
            }
          }
        }
        currentOffsetC += charWidth + 1;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      eventTarget.removeEventListener("mousemove", handleMouseMove as EventListener);
      eventTarget.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      eventTarget.removeEventListener("dblclick", handleDblClick as EventListener);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 overflow-hidden bg-transparent p-0 pointer-events-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
