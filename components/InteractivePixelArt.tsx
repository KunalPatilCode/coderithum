import React, { useEffect, useRef } from "react";

function interpolateColor(color1: string, color2: string, factor: number): string {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);

  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
}

export default function InteractivePixelArt({ 
  presetId, 
  bannerImage 
}: { 
  presetId?: string;
  bannerImage?: string;
}) {
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

      // Resolve active canvas theme based on presetId or fallback to bannerImage keywords
      let activeTheme = presetId || "ice-canvas";
      if (activeTheme === "custom" && bannerImage) {
        if (bannerImage.includes("makarsankranti")) activeTheme = "makarsankranti";
        else if (bannerImage.includes("dussehra")) activeTheme = "dussehra";
        else if (bannerImage.includes("christmas")) activeTheme = "christmas";
        else if (bannerImage.includes("holi")) activeTheme = "holi";
        else if (bannerImage.includes("diwali")) activeTheme = "diwali";
      }

      // Clear canvas with white or holiday background
      let bgColor = "#FFFFFF";
      let gridColor = "#CBD5E1";

      if (activeTheme === "diwali") {
        bgColor = "#0B0F19";
        gridColor = "#1E293B";
      } else if (activeTheme === "makarsankranti") {
        bgColor = "#FFF7ED";
        gridColor = "#FED7AA";
      } else if (activeTheme === "dussehra") {
        bgColor = "#FFF5F5";
        gridColor = "#FEE2E2";
      } else if (activeTheme === "christmas") {
        bgColor = "#F8FAFC";
        gridColor = "#E2E8F0";
      } else if (activeTheme === "holi") {
        bgColor = "#FFF7ED";
        gridColor = "#FED7AA";
      }

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Draw light grey grid lines
      ctx.strokeStyle = gridColor;
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

      // Mouse interactive cells (disabled per user request)
      const circleCells = new Set<string>();

      const drawPixel = (cc: number, cr: number, color: string) => {
        if (circleCells.has(`${cc},${cr}`)) return;
        ctx.fillStyle = color;
        ctx.fillRect(cc * cellSize + 0.5, cr * cellSize + 0.5, cellSize - 1, cellSize - 1);
      };

      // Helper function to draw pixelated shapes aligned to the grid
      const drawPixelShape = (sc: number, sr: number, shape: string[], color: string) => {
        const startC = Math.round(sc);
        const startR = Math.round(sr);
        for (let r = 0; r < shape.length; r++) {
          for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === "1") {
              const targetC = startC + c;
              const targetR = startR + r;
              if (targetC >= 0 && targetC < cols && targetR >= 0 && targetR < rows) {
                if (!circleCells.has(`${targetC},${targetR}`)) {
                  ctx.fillStyle = color;
                  ctx.fillRect(targetC * cellSize + 0.5, targetR * cellSize + 0.5, cellSize - 1, cellSize - 1);
                }
              }
            }
          }
        }
      };

      // --- CONDITIONAL DRAWING ENGINE BY PRESET ---
      
      const drawSkylineSilhouette = () => {
        const getBuildingHeight = (col: number) => {
          const blockId = Math.floor(col / 6);
          const phase = blockId % 5;
          let h = 6;
          if (phase === 0) h = 11;
          else if (phase === 1) h = 8;
          else if (phase === 2) h = 14;
          else if (phase === 3) h = 9;
          else if (phase === 4) h = 12;

          const isCenter = (col % 6) === 2;
          if (isCenter && (blockId % 2 === 0)) return h + 3;

          const isGap = (col % 6) === 5;
          if (isGap) return 0;

          return h;
        };

        const topColor = activeTheme === "diwali" ? "#1E293B" : "#334155";
        const bodyColor = activeTheme === "diwali" ? "#0F172A" : "#0F172A";

        for (let c = 0; c < cols; c++) {
          const buildingH = getBuildingHeight(c);
          if (buildingH <= 0) continue;

          const startRow = Math.floor(rows - buildingH);
          for (let r = Math.max(0, startRow); r < rows; r++) {
            if (r === startRow) {
              ctx.fillStyle = topColor; // building top
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
                ctx.fillStyle = bodyColor; // Solid building body
              }
            }
            ctx.fillRect(c * cellSize + 0.5, r * cellSize + 0.5, cellSize - 1, cellSize - 1);
          }
        }
      };

      const drawFlappingBirds = () => {
        const birdColor = activeTheme === "diwali" ? "#64748B" : "#334155";
        const isWingUp = Math.floor(time / 150) % 2 === 0;
        
        const birdUpShape = ["101", "010"];
        const birdDownShape = ["010", "101"];
        const birdShape = isWingUp ? birdUpShape : birdDownShape;

        const bird1C = (time * 0.0035) % (cols + 10) - 5;
        const bird1R = Math.floor(rows * 0.44) + Math.sin(time * 0.003) * 1.5;
        drawPixelShape(bird1C, bird1R, birdShape, birdColor);

        const bird2C = ((time * 0.0035) - 5 + cols) % (cols + 10) - 5;
        const bird2R = Math.floor(rows * 0.39) + Math.cos(time * 0.003) * 1.5;
        drawPixelShape(bird2C, bird2R, birdShape, birdColor);

        const bird3C = ((time * 0.0035) - 9 + cols) % (cols + 10) - 5;
        const bird3R = Math.floor(rows * 0.47) + Math.sin(time * 0.002) * 1.5;
        drawPixelShape(bird3C, bird3R, birdShape, birdColor);
      };

      if (activeTheme === "christmas") {
        // 1. Snowflakes
        for (let i = 0; i < 50; i++) {
          const speed = 0.03 + (i % 4) * 0.01;
          const xOffset = Math.sin(time * 0.001 + i) * 2;
          const snowC = (i * 23 + xOffset) % cols;
          const snowR = (time * speed + i * 37) % rows;
          drawPixel(Math.floor(snowC), Math.floor(snowR), "#FFFFFF");
        }

        // 2. Christmas Trees
        for (let c = 4; c < cols; c += 10) {
          const treeHeight = 7 + (c % 3) * 2;
          const treeShape = [
            "0001000",
            "0011100",
            "0111110",
            "1111111",
            "0001000"
          ];
          drawPixelShape(c - 3, rows - 5, treeShape, "#16A34A"); // Green
          drawPixel(c, rows - 6, "#FDE047"); // Gold Star
        }

        // 3. Santa's Sleigh
        const santaCycle = time % 25000;
        const santaDuration = 8000;
        if (santaCycle < santaDuration) {
          const p = santaCycle / santaDuration;
          const santaC = p * (cols + 20) - 10;
          const santaR = Math.floor(rows * 0.15);
          const sleighShape = [
            "00010100",
            "00111100",
            "11111111",
            "01000010"
          ];
          drawPixelShape(santaC, santaR, sleighShape, "#DC2626");
        }
      } 
      else if (activeTheme === "diwali") {
        // 1. Clear with gradient from dark purple to deep navy (Diwali night)
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#080612"); // Dark purple top
        grad.addColorStop(1, "#121124"); // Deep navy bottom
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Draw light grey/yellow grid lines (dark theme variant)
        ctx.strokeStyle = "#1E1E38";
        ctx.lineWidth = 1;
        for (let c = 0; c <= cols; c++) {
          ctx.beginPath();
          ctx.moveTo(c * cellSize, 0);
          ctx.lineTo(c * cellSize, height);
          ctx.stroke();
        }
        for (let r = 0; r <= rows; r++) {
          ctx.beginPath();
          ctx.moveTo(0, r * cellSize);
          ctx.lineTo(width, r * cellSize);
          ctx.stroke();
        }

        // 2. Twinkling Stars
        for (let i = 0; i < 40; i++) {
          const starC = (i * 13) % cols;
          const starR = (i * 7) % Math.floor(rows * 0.4);
          const twinkle = Math.sin(time * 0.003 + i) > 0.2;
          if (twinkle) {
            drawPixel(starC, starR, "#FFFFFF");
          }
        }

        // 3. Hanging Toran (flower garlands) at the top
        for (let c = 0; c < cols; c++) {
          const isGold = c % 4 === 0 || c % 4 === 1;
          const color = isGold ? "#F59E0B" : "#DC2626"; // Gold and Red
          const isHang = c % 2 === 0;
          drawPixel(c, isHang ? 0 : 1, color);
          if (c % 8 === 4) {
            drawPixel(c, 2, color);
          }
        }

        // 4. Hanging Kandils (lanterns) on left and right sides
        const drawKandil = (sc: number, sr: number) => {
          const kandilShape = [
            "00100",
            "01110",
            "11111",
            "01110",
            "00100",
            "01010" // tassel
          ];
          drawPixelShape(sc, sr, kandilShape, "#F59E0B"); // Orange
          drawPixel(sc + 2, sr + 2, "#EF4444"); // Red center light
        };
        drawKandil(2, 3);
        drawKandil(8, 5);
        drawKandil(cols - 7, 3);
        drawKandil(cols - 13, 5);

        // 5. Pointed Temples in the background
        const templeColor = "#1B172E";
        for (let c = 12; c < cols - 12; c += 16) {
          const domeHeight = 8;
          const domeShape = [
            "000010000",
            "000111000",
            "001111100",
            "011111110",
            "111111111"
          ];
          // Dome base
          drawPixelShape(c - 4, rows - 11, domeShape, templeColor);
          // Pillars / temple body
          for (let r = rows - 6; r < rows - 2; r++) {
            for (let tc = c - 4; tc <= c + 4; tc++) {
              drawPixel(tc, r, templeColor);
            }
          }
          // Glowing yellow/orange windows inside temples
          drawPixel(c, rows - 8, "#F59E0B");
          drawPixel(c - 2, rows - 5, "#F59E0B");
          drawPixel(c + 2, rows - 5, "#F59E0B");
        }

        // 6. Water background layer at the bottom
        ctx.fillStyle = "#090715";
        ctx.fillRect(0, (rows - 3) * cellSize, width, 3 * cellSize);

        // Water ripples reflections
        for (let i = 0; i < 15; i++) {
          const ripC = (i * 17 + time * 0.008) % cols;
          const ripR = rows - 3 + (i % 3);
          drawPixel(Math.floor(ripC), ripR, "#26203D");
        }

        // 7. Floating Diyas on the water foreground
        for (let c = 6; c < cols - 6; c += 14) {
          const diyaBase = [
            "11111",
            "01110"
          ];
          drawPixelShape(c - 2, rows - 2, diyaBase, "#D97706"); // Amber bowl
          // Flickering flame
          const flameColor = Math.sin(time * 0.035 + c) > 0 ? "#F59E0B" : "#EF4444";
          drawPixel(c, rows - 3, flameColor);
          // Water reflections directly below diya
          drawPixel(c, rows - 1, "#D97706");
          drawPixel(c - 1, rows - 1, "#B45309");
          drawPixel(c + 1, rows - 1, "#B45309");
        }
      } 
      else if (activeTheme === "makarsankranti") {
        // 1. Giant Sunset Sun
        const sunCenterC = Math.floor(cols * 0.75);
        const sunCenterR = Math.floor(rows * 0.65);
        const sunRadius = 6;
        for (let r = -sunRadius; r <= sunRadius; r++) {
          for (let c = -sunRadius; c <= sunRadius; c++) {
            if (c * c + r * r <= sunRadius * sunRadius) {
              drawPixel(sunCenterC + c, sunCenterR + r, "#FDE047");
            }
          }
        }

        // 2. Skyline Silhouette
        drawSkylineSilhouette();

        // 3. Floating Kites
        const kiteColors = ["#EF4444", "#3B82F6", "#EC4899", "#8B5CF6", "#10B981"];
        for (let i = 0; i < 5; i++) {
          const speed = 0.0003 + i * 0.0001;
          const kiteC = (cols * 0.1 + i * 15 + Math.sin(time * speed) * 4) % cols;
          const kiteR = (rows * 0.2 + i * 5 + Math.cos(time * speed * 1.5) * 3) % (rows * 0.5);
          const kiteShape = ["010", "111", "010"];
          drawPixelShape(kiteC - 1, kiteR - 1, kiteShape, kiteColors[i % kiteColors.length]);
          // Kite strings
          drawPixel(kiteC, kiteR + 1, "#64748B");
          drawPixel(kiteC - 1, kiteR + 2, "#64748B");
        }
      } 
      else if (activeTheme === "dussehra") {
        drawSkylineSilhouette();

        // Rama (Left)
        const ramaC = Math.max(3, Math.floor(cols * 0.12));
        const ramaR = Math.floor(rows * 0.68);
        const ramaShape = ["0100", "1110", "0100", "1010"];
        drawPixelShape(ramaC, ramaR, ramaShape, "#2563EB");

        // Ravana (Right)
        const ravC = Math.min(cols - 12, Math.floor(cols * 0.82));
        const ravR = Math.floor(rows * 0.65);
        const ravShape = ["10101", "11111", "01110", "01010"];
        drawPixelShape(ravC, ravR, ravShape, "#DC2626");

        // Flying golden arrows
        const arrowCycle = time % 3000;
        const arrowDuration = 1800;
        if (arrowCycle < arrowDuration) {
          const p = arrowCycle / arrowDuration;
          const arrowC = ramaC + 4 + p * (ravC - ramaC - 4);
          drawPixel(Math.round(arrowC), Math.round(ramaR + 1), "#F59E0B");
        }
      } 
      else if (activeTheme === "holi") {
        // Splashes of paint
        const holiColors = ["#EC4899", "#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];
        for (let i = 0; i < 8; i++) {
          const splatC = (i * 19) % cols;
          const splatR = (i * 11) % rows;
          const activeColor = holiColors[i % holiColors.length];
          drawPixel(splatC, splatR, activeColor);
          drawPixel(splatC + 1, splatR, activeColor);
          drawPixel(splatC, splatR + 1, activeColor);
          if (i % 2 === 0) {
            drawPixel(splatC - 1, splatR, activeColor);
            drawPixel(splatC, splatR - 1, activeColor);
          }
        }
        drawFlappingBirds();
      } 
      else {
        // --- DEFAULT CLASSIC CANVAS ELEMENTS ---
        
        // 1. Clouds
        const cloudColor = "#FFFFFF";
        const cloud1Shape = ["0001110000", "0011111100", "0111111110", "1111111111"];
        const cloud2Shape = ["001100", "011110", "111111"];
        const cloud3Shape = ["00001111000", "00111111100", "11111111111"];

        const cloud1C = (time * 0.0015) % (cols + 20) - 10;
        drawPixelShape(cloud1C, Math.floor(rows * 0.12), cloud1Shape, cloudColor);

        const cloud2C = ((time * 0.0008) + cols * 0.45) % (cols + 15) - 8;
        drawPixelShape(cloud2C, Math.floor(rows * 0.06), cloud2Shape, cloudColor);

        const cloud3C = ((time * 0.0011) + cols * 0.75) % (cols + 22) - 11;
        drawPixelShape(cloud3C, Math.floor(rows * 0.18), cloud3Shape, cloudColor);

        // 2. Plane
        const planeCycle = time % 40000;
        const planeDuration = 7000;
        if (planeCycle < planeDuration) {
          const p = planeCycle / planeDuration;
          const planeC = p * (cols + 20) - 10;
          const planeR = Math.floor(rows * 0.25);
          const planeShape = ["0000100", "0001100", "1111111", "0001100", "0000100"];
          drawPixelShape(planeC, planeR, planeShape, "#475569");
          
          if (Math.floor(time / 250) % 2 === 0) {
            drawPixel(Math.round(planeC), Math.round(planeR) + 2, "#EF4444");
          }
        }

        // 3. Birds
        drawFlappingBirds();

        // 4. Skyline Silhouette
        drawSkylineSilhouette();
      }

      // Draw random popping circles (digital rain ripple effect / Diwali fireworks)
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
        if (presetId === "diwali") {
          // Colorful firework burst rings
          const hue = (pc.x + pc.y) % 360;
          ctx.strokeStyle = `hsla(${hue}, 90%, 65%, ${pc.alpha * 0.75})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(pc.x, pc.y, pc.radius, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.strokeStyle = `hsla(${(hue + 60) % 360}, 90%, 65%, ${pc.alpha * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pc.x, pc.y, pc.radius * 0.7, 0, Math.PI * 2);
          ctx.stroke();
        } else {
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
        }
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

      // Draw Hashtag Logo
      const brandColorPrimary = activeTheme === "diwali" ? "#06B6D4" : CRYSTAL_BLUE;
      const brandColorSecondary = activeTheme === "diwali" ? "#FFFFFF" : DEEP_NAVY;

      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (hashtag[r][c] === "1") {
            const pulse = Math.sin(time * 0.003 + r + c) > 0;
            drawPixel(logoStartC + c, logoStartR + r, pulse ? CYAN : brandColorPrimary);
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
              const color = pulse ? brandColorPrimary : brandColorSecondary;
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
  }, [presetId, bannerImage]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 overflow-hidden bg-transparent p-0 pointer-events-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
