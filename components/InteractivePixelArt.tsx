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
        // 1. Clear with gradient from dark slate blue to deep navy (Christmas night)
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#050816"); // Deep black-blue top
        grad.addColorStop(1, "#0d1b40"); // Rich deep navy bottom
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Draw light blue-grey grid lines (dark theme variant)
        ctx.strokeStyle = "#162244";
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

        // 2. Glowing Moon & Cloud (top-right)
        const moonShape = [
          "00111100",
          "01111110",
          "11111111",
          "11111111",
          "11111111",
          "11111111",
          "01111110",
          "00111100"
        ];
        drawPixelShape(cols - 14, 2, moonShape, "#FFE5A3"); // Warm yellow moon
        // Crater details
        drawPixel(cols - 11, 4, "#E2CE8F");
        drawPixel(cols - 10, 5, "#E2CE8F");
        drawPixel(cols - 8, 4, "#E2CE8F");
        drawPixel(cols - 7, 5, "#E2CE8F");
        drawPixel(cols - 9, 7, "#E2CE8F");
        drawPixel(cols - 10, 8, "#E2CE8F");

        // Soft cloud passing moon
        const cloudShape = [
          "00001111000",
          "00111111110",
          "11111111111"
        ];
        drawPixelShape(cols - 19, 7, cloudShape, "#20345C"); // Blue cloud

        // 3. Falling Snow & Twinkling Stars
        // Twinkling stars in high sky
        for (let i = 0; i < 25; i++) {
          const starC = (i * 19) % cols;
          const starR = (i * 7) % Math.floor(rows * 0.35);
          const twinkle = Math.sin(time * 0.0025 + i) > 0.3;
          if (twinkle) {
            drawPixel(starC, starR, "#FFFFFF");
          }
        }
        // Falling snowflakes
        for (let i = 0; i < 45; i++) {
          const speed = 0.035 + (i % 4) * 0.015;
          const xOffset = Math.sin(time * 0.001 + i) * 1.5;
          const snowC = Math.floor((i * 23 + xOffset) % cols);
          const snowR = Math.floor((time * speed + i * 37) % rows);
          if (i % 8 === 0) {
            // Large diamond cross flake
            drawPixel(snowC, snowR, "#FFFFFF");
            drawPixel(snowC - 1, snowR, "#94A3B8");
            drawPixel(snowC + 1, snowR, "#94A3B8");
            drawPixel(snowC, snowR - 1, "#94A3B8");
            drawPixel(snowC, snowR + 1, "#94A3B8");
          } else {
            drawPixel(snowC, snowR, "#FFFFFF");
          }
        }

        // 4. Ground Snow floor with slight pixel hills
        for (let c = 0; c < cols; c++) {
          const hillH = 3 + Math.sin(c * 0.15) * 0.5;
          const startR = Math.floor(rows - hillH);
          for (let r = Math.max(0, startR); r < rows; r++) {
            drawPixel(c, r, "#E2E8F0"); // light grey-blue snow floor
            if (r === startR) {
              drawPixel(c, r, "#FFFFFF"); // white snow cap
            }
          }
        }

        // 5. Cozy Log Cabin on the left
        const drawLogCabin = () => {
          // Chimney stack
          for (let r = rows - 15; r < rows - 9; r++) {
            drawPixel(4, r, "#B91C1C"); // Brick red
            drawPixel(5, r, "#991B1B");
          }
          // Chimney smoke
          const smokeOffset = Math.sin(time * 0.003) * 1.0;
          drawPixel(Math.floor(4 + smokeOffset), rows - 17, "#94A3B8");
          drawPixel(Math.floor(5 + smokeOffset), rows - 18, "#CBD5E1");
          drawPixel(Math.floor(3 + smokeOffset), rows - 19, "#E2E8F0");

          // Wood log walls
          for (let r = rows - 10; r < rows - 2; r++) {
            for (let c = 3; c <= 13; c++) {
              // Alternate log colors
              const isDarkLog = r % 2 === 0;
              drawPixel(c, r, isDarkLog ? "#4E2C0E" : "#6E4720");
            }
          }

          // Snow-covered roof
          const roofLines = [
            { r: rows - 11, start: 2, end: 14 },
            { r: rows - 12, start: 3, end: 13 },
            { r: rows - 13, start: 5, end: 11 },
            { r: rows - 14, start: 7, end: 9 }
          ];
          roofLines.forEach(line => {
            for (let c = line.start; c <= line.end; c++) {
              drawPixel(c, line.r, "#FFFFFF");
              if (line.r === rows - 11) {
                drawPixel(c, line.r + 1, "#E2E8F0"); // shadow under eaves
              }
            }
          });

          // Glowing windows
          for (let r = rows - 8; r <= rows - 6; r++) {
            for (let c = 9; c <= 11; c++) {
              drawPixel(c, r, "#FFD54F"); // Warm amber
            }
          }
          // Window cross divider
          drawPixel(10, rows - 7, "#4E2C0E");

          // Cabin door
          for (let r = rows - 6; r < rows - 2; r++) {
            drawPixel(5, r, "#3E2723");
            drawPixel(6, r, "#3E2723");
          }
          // Green door wreath
          drawPixel(5, rows - 5, "#22C55E");
          drawPixel(6, rows - 5, "#22C55E");
          drawPixel(5, rows - 4, "#EF4444"); // Bow on wreath
        };
        drawLogCabin();

        // Lamp post next to cabin
        const drawLampPost = () => {
          // Pole
          for (let r = rows - 11; r < rows - 2; r++) {
            drawPixel(15, r, "#1E293B");
          }
          // Bow
          drawPixel(15, rows - 7, "#EF4444");
          // Wreath wrap around pole
          drawPixel(14, rows - 8, "#22C55E");
          drawPixel(16, rows - 8, "#22C55E");

          // Glass lantern housing
          drawPixel(14, rows - 12, "#1E293B");
          drawPixel(16, rows - 12, "#1E293B");
          drawPixel(15, rows - 13, "#1E293B");

          // Glowing light bulb inside
          drawPixel(15, rows - 12, "#FFC107");
          drawPixel(15, rows - 11, "#FFC107");
          // Glow halo
          if (Math.sin(time * 0.005) > -0.2) {
            drawPixel(14, rows - 11, "#FBBF24");
            drawPixel(16, rows - 11, "#FBBF24");
          }
        };
        drawLampPost();

        // 6. Snowman (center-left)
        const drawSnowman = () => {
          const sc = Math.floor(cols * 0.3) - 2;
          
          // Head (rows - 12)
          drawPixel(sc + 2, rows - 12, "#FFFFFF");
          drawPixel(sc + 3, rows - 12, "#FFFFFF");
          drawPixel(sc + 2, rows - 13, "#FFFFFF");
          drawPixel(sc + 3, rows - 13, "#FFFFFF");
          // Eyes
          drawPixel(sc + 2, rows - 13, "#000000");
          drawPixel(sc + 4, rows - 13, "#000000");
          // Nose
          drawPixel(sc + 3, rows - 12, "#FF9800");

          // Red Hat
          drawPixel(sc + 1, rows - 14, "#DC2626");
          drawPixel(sc + 2, rows - 14, "#DC2626");
          drawPixel(sc + 3, rows - 14, "#DC2626");
          drawPixel(sc + 4, rows - 14, "#DC2626");
          drawPixel(sc + 2, rows - 15, "#DC2626");
          drawPixel(sc + 3, rows - 15, "#DC2626");
          // White Pom-pom
          drawPixel(sc + 2, rows - 16, "#FFFFFF");

          // Torso (rows - 10 to -8)
          const torso = [
            "01110",
            "11111",
            "01110"
          ];
          drawPixelShape(sc + 1, rows - 11, torso, "#FFFFFF");
          // Scarf
          drawPixel(sc + 1, rows - 11, "#DC2626");
          drawPixel(sc + 2, rows - 11, "#DC2626");
          drawPixel(sc + 3, rows - 11, "#DC2626");
          drawPixel(sc + 4, rows - 11, "#DC2626");
          drawPixel(sc + 4, rows - 10, "#DC2626"); // tail

          // Base (rows - 7 to -4)
          const baseShape = [
            "011110",
            "111111",
            "111111",
            "011110"
          ];
          drawPixelShape(sc, rows - 8, baseShape, "#FFFFFF");
          
          // Shading on snowman edge
          drawPixel(sc + 1, rows - 5, "#CBD5E1");
          drawPixel(sc + 4, rows - 5, "#CBD5E1");

          // Buttons
          drawPixel(sc + 3, rows - 9, "#000000");
          drawPixel(sc + 3, rows - 7, "#000000");

          // Wooden stick arms
          drawPixel(sc, rows - 9, "#8B5A2B");
          drawPixel(sc - 1, rows - 10, "#8B5A2B"); // waving left arm
          
          drawPixel(sc + 6, rows - 9, "#8B5A2B");
          drawPixel(sc + 7, rows - 10, "#8B5A2B"); // right arm
        };
        drawSnowman();

        // Gift Boxes in front of snowman
        const drawGift = (x: number, y: number, color: string, ribbonColor: string) => {
          for (let r = y; r < y + 3; r++) {
            for (let c = x; c < x + 3; c++) {
              drawPixel(c, r, color);
            }
          }
          // Draw Ribbon
          for (let r = y; r < y + 3; r++) {
            drawPixel(x + 1, r, ribbonColor);
          }
          for (let c = x; c < x + 3; c++) {
            drawPixel(c, y + 1, ribbonColor);
          }
          // Bow
          drawPixel(x + 1, y - 1, ribbonColor);
        };
        drawGift(Math.floor(cols * 0.3) + 4, rows - 5, "#15803D", "#EF4444"); // Green box with red ribbon
        drawGift(Math.floor(cols * 0.3) + 8, rows - 5, "#B91C1C", "#FBBF24"); // Red box with yellow ribbon

        // 7. Giant Christmas Tree on the right side
        const drawChristmasTree = () => {
          const tc = cols - 15;
          
          // Pine tree layers (bottom up)
          const treeLayers = [
            { r: rows - 5, w: 11 },
            { r: rows - 6, w: 11 },
            { r: rows - 7, w: 9 },
            { r: rows - 8, w: 9 },
            { r: rows - 9, w: 7 },
            { r: rows - 10, w: 7 },
            { r: rows - 11, w: 5 },
            { r: rows - 12, w: 5 },
            { r: rows - 13, w: 3 },
            { r: rows - 14, w: 3 },
            { r: rows - 15, w: 1 }
          ];

          treeLayers.forEach(layer => {
            const half = Math.floor(layer.w / 2);
            for (let dx = -half; dx <= half; dx++) {
              drawPixel(tc + dx, layer.r, "#15803D"); // green tree body
            }
          });

          // Wood trunk
          for (let r = rows - 4; r < rows - 2; r++) {
            drawPixel(tc, r, "#78350F");
            drawPixel(tc - 1, r, "#78350F");
          }

          // Gold star on top
          drawPixel(tc, rows - 16, "#F59E0B");
          drawPixel(tc - 1, rows - 16, "#F59E0B");
          drawPixel(tc + 1, rows - 16, "#F59E0B");
          drawPixel(tc, rows - 17, "#F59E0B");

          // Multi-colored glowing ornaments
          const ornamentPositions = [
            { c: tc - 3, r: rows - 6, color: "#EF4444" },
            { c: tc + 3, r: rows - 6, color: "#3B82F6" },
            { c: tc, r: rows - 7, color: "#FBBF24" },
            { c: tc - 2, r: rows - 8, color: "#EC4899" },
            { c: tc + 2, r: rows - 8, color: "#EF4444" },
            { c: tc - 1, r: rows - 10, color: "#3B82F6" },
            { c: tc + 1, r: rows - 10, color: "#FBBF24" },
            { c: tc, r: rows - 12, color: "#EF4444" },
            { c: tc - 1, r: rows - 13, color: "#3B82F6" },
            { c: tc, r: rows - 14, color: "#FBBF24" }
          ];

          ornamentPositions.forEach((orn, idx) => {
            // Flicker/glow animation using sine wave
            const flash = Math.sin(time * 0.004 + idx) > -0.2;
            if (flash) {
              drawPixel(orn.c, orn.r, orn.color);
            } else {
              drawPixel(orn.c, orn.r, "#166534"); // dark green when off
            }
          });
        };
        drawChristmasTree();

        // 8. Santa Flying in sleigh (top-left)
        const santaCycle = time % 16000;
        const santaDuration = 8000;
        if (santaCycle < santaDuration) {
          const p = santaCycle / santaDuration;
          const santaC = p * (cols + 35) - 25;
          const santaR = Math.floor(rows * 0.16) + Math.sin(time * 0.0025) * 1.5;

          // Reindeer
          const deerShape = [
            "010100",
            "111110",
            "011100",
            "010100"
          ];
          drawPixelShape(santaC + 11, santaR - 1, deerShape, "#854D0E"); // brown deer
          drawPixel(santaC + 16, santaR - 1, "#EF4444"); // red nose

          // Reindeer harness line
          for (let cx = 6; cx < 11; cx++) {
            drawPixel(Math.floor(santaC + cx), Math.floor(santaR + 1), "#F59E0B");
          }

          // Red Sleigh
          const sleighShape = [
            "001001",
            "111111",
            "111110",
            "010010"
          ];
          drawPixelShape(santaC, santaR, sleighShape, "#DC2626"); // red sleigh

          // Santa face & hat
          drawPixel(santaC + 2, santaR - 1, "#FFFFFF"); // beard
          drawPixel(santaC + 2, santaR - 2, "#DC2626"); // hat
          drawPixel(santaC + 3, santaR - 1, "#FCA5A5"); // face skin

          // Gold magic trail sparkles
          for (let dx = 1; dx <= 10; dx++) {
            if (Math.random() > 0.4) {
              drawPixel(Math.floor(santaC - dx), Math.floor(santaR + 1 + (Math.random() - 0.5) * 2), "#FBBF24");
            }
          }
        }

        // 9. Cute Mouse holding gift on the right side
        const drawMouse = () => {
          const mc = cols - 6;
          const mr = rows - 8;

          // Mouse body
          drawPixel(mc, mr, "#A1887F");
          drawPixel(mc + 1, mr, "#A1887F");
          drawPixel(mc + 2, mr, "#A1887F");
          drawPixel(mc, mr + 1, "#A1887F");
          drawPixel(mc + 1, mr + 1, "#A1887F");
          drawPixel(mc + 2, mr + 1, "#A1887F");
          drawPixel(mc + 3, mr + 1, "#A1887F");
          // Large round ears
          drawPixel(mc - 1, mr - 1, "#D7CCC8");
          drawPixel(mc, mr - 1, "#A1887F");
          drawPixel(mc + 3, mr - 1, "#A1887F");
          drawPixel(mc + 4, mr - 1, "#D7CCC8");

          // Little tail
          drawPixel(mc - 1, mr + 1, "#D7CCC8");
          drawPixel(mc - 2, mr + 2, "#D7CCC8");

          // Santa Hat
          drawPixel(mc + 1, mr - 2, "#DC2626");
          drawPixel(mc + 2, mr - 2, "#DC2626");
          drawPixel(mc + 1, mr - 3, "#DC2626");
          drawPixel(mc + 2, mr - 4, "#FFFFFF"); // pom-pom

          // Green gift box held by mouse
          drawPixel(mc + 3, mr, "#16A34A");
          drawPixel(mc + 4, mr, "#16A34A");
          drawPixel(mc + 3, mr - 1, "#EF4444"); // ribbon bow
        };
        drawMouse();

        // 10. Center Text "MERRY CHRISTMAS" in pixelated font
        const drawPixelLetter = (lx: number, ly: number, char: string, lcolor: string) => {
          const letters: Record<string, string[]> = {
            'M': ["10001", "11011", "10101", "10001", "10001"],
            'E': ["1111", "1000", "1110", "1000", "1111"],
            'R': ["1110", "1001", "1110", "1010", "1001"],
            'Y': ["10001", "01010", "00100", "00100", "00100"],
            'C': ["0111", "1000", "1000", "1000", "0111"],
            'H': ["1001", "1001", "1111", "1001", "1001"],
            'I': ["111", "010", "010", "010", "111"],
            'S': ["0111", "1000", "0110", "0001", "1110"],
            'T': ["11111", "00100", "00100", "00100", "00100"],
            'A': ["0110", "1001", "1111", "1001", "1001"]
          };
          const glyph = letters[char.toUpperCase()];
          if (!glyph) return;
          for (let gr = 0; gr < glyph.length; gr++) {
            for (let gc = 0; gc < glyph[gr].length; gc++) {
              if (glyph[gr][gc] === '1') {
                drawPixel(lx + gc, ly + gr, lcolor);
              }
            }
          }
        };

        // Draw "MERRY" at row 10
        const word1 = "MERRY";
        const startX1 = Math.floor(cols / 2) - 13;
        let curX1 = startX1;
        for (let idx = 0; idx < word1.length; idx++) {
          const char = word1[idx];
          drawPixelLetter(curX1, 10, char, "#EF4444"); // Red
          curX1 += (char === 'M' || char === 'Y') ? 6 : 5;
        }

        // Draw "CHRISTMAS" at row 17
        const word2 = "CHRISTMAS";
        const startX2 = Math.floor(cols / 2) - 22;
        let curX2 = startX2;
        for (let idx = 0; idx < word2.length; idx++) {
          const char = word2[idx];
          drawPixelLetter(curX2, 17, char, "#22C55E"); // Green
          curX2 += (char === 'T' || char === 'M') ? 6 : (char === 'I') ? 4 : 5;
        }

        // Gold divider line decoration under the text
        const lineY = 24;
        const lineCenter = Math.floor(cols / 2);
        for (let dx = -15; dx <= 15; dx++) {
          if (Math.abs(dx) > 2) {
            drawPixel(lineCenter + dx, lineY, "#F59E0B"); // Gold line
            if (Math.abs(dx) === 15) {
              drawPixel(lineCenter + dx, lineY - 1, "#F59E0B"); // terminal ornament
            }
          }
        }
        // Center Poinsettia flower on gold line
        drawPixel(lineCenter, lineY, "#EF4444"); // Red center
        drawPixel(lineCenter - 1, lineY, "#EF4444");
        drawPixel(lineCenter + 1, lineY, "#EF4444");
        drawPixel(lineCenter, lineY - 1, "#EF4444");
        drawPixel(lineCenter, lineY + 1, "#EF4444");
        drawPixel(lineCenter - 1, lineY - 1, "#22C55E"); // green leaves on diagonal
        drawPixel(lineCenter + 1, lineY + 1, "#22C55E");
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
