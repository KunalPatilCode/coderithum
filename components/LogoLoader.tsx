"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface LogoLoaderProps {
  onComplete?: () => void;
}

export default function LogoLoader({ onComplete }: LogoLoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<number>(1);
  const [terminalText, setTerminalText] = useState<string>("> Coderithum.system()");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer1 = setTimeout(() => setTerminalText("> SYSTEM READY_"), 500);
      const timer2 = setTimeout(() => setIsTransitioning(true), 1200);
      const timer3 = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1600);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }

    // STRICT TIMING SEQUENCE (~2.8 seconds total)

    // Phase 1 -> Phase 2: Start 4 Diagonal Entrances & Simultaneous Base (0.2s)
    const t1 = setTimeout(() => {
      setPhase(2); // 4 Diagonal Entrances + Base Construction
      setTerminalText("> assembling_core...");
    }, 200);

    // Phase 2 -> Phase 3: 3D Roll & Isometric Settle (0.95s)
    const t2 = setTimeout(() => {
      setPhase(3); // 3D Roll & Settle
    }, 950);

    // Phase 3 -> Phase 4: Contour Laser Outline Pulse (1.45s)
    const t3 = setTimeout(() => {
      setPhase(4); // Electric Cyan Contour Scanning Pulse
      setTerminalText("> scanning_contour [OK]");
    }, 1450);

    // Phase 4 -> Phase 5: System Ready (1.95s)
    const t4 = setTimeout(() => {
      setPhase(5); // Final Lock & System Ready
      setTerminalText("> SYSTEM READY_");
    }, 1950);

    // Phase 5 -> Transition to Site Grid (2.35s)
    const t5 = setTimeout(() => {
      setIsTransitioning(true);
    }, 2350);

    // Complete Callback (2.85s)
    const t6 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete, shouldReduceMotion]);

  // Luxury cubic-bezier easing curve for buttery-smooth fluid motion
  const snapEase = [0.16, 1, 0.3, 1] as const;

  return (
    <AnimatePresence>
      <motion.div
        key="logo-loader-container"
        initial={{ opacity: 1, backgroundColor: "#050B14" }}
        animate={{
          opacity: isTransitioning ? 0 : 1,
          backgroundColor: isTransitioning ? "#FBFCFE" : "#050B14"
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
      >
        {/* Subtle Technical Grid Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{
              opacity: isTransitioning ? [0.2, 0.5, 0] : phase >= 2 ? 0.2 : 0.1,
              scale: isTransitioning ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `
                linear-gradient(to right, ${isTransitioning ? "rgba(22, 123, 199, 0.25)" : "rgba(0, 240, 255, 0.15)"} 1px, transparent 1px),
                linear-gradient(to bottom, ${isTransitioning ? "rgba(22, 123, 199, 0.25)" : "rgba(0, 240, 255, 0.15)"} 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }}
          />

          {/* Clean Technical Corner Crosshairs */}
          <div className="absolute top-8 left-8 text-[10px] font-mono text-cyan-400/60 flex items-center gap-2">
            <span className="inline-block w-2 h-2 border-l border-t border-cyan-400" />
            <span>SYS.REQ // 0x8849</span>
          </div>
          <div className="absolute top-8 right-8 text-[10px] font-mono text-cyan-400/60 flex items-center gap-2">
            <span>ISOMETRIC // 30°</span>
            <span className="inline-block w-2 h-2 border-r border-t border-cyan-400" />
          </div>
          <div className="absolute bottom-8 left-8 text-[10px] font-mono text-cyan-400/60 flex items-center gap-2">
            <span className="inline-block w-2 h-2 border-l border-b border-cyan-400" />
            <span>CORE // OK</span>
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] font-mono text-cyan-400/60 flex items-center gap-2">
            <span>LATENCY // 0ms</span>
            <span className="inline-block w-2 h-2 border-r border-b border-cyan-400" />
          </div>
        </div>

        {/* Central Logo Canvas */}
        <motion.div
          className="relative w-full max-w-[260px] sm:max-w-[300px] px-6 aspect-[1024/760] flex items-center justify-center"
          animate={
            isTransitioning
              ? { scale: 1.04, y: -10, opacity: 0 }
              : shouldReduceMotion
                ? { scale: [0.95, 1], opacity: [0, 1] }
                : phase === 5
                  ? { y: [0, -4, 0] }
                  : { scale: 1, y: 0, opacity: 1 }
          }
          transition={
            phase === 5
              ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.5, ease: snapEase }
          }
        >
          <svg
            viewBox="0 350 1024 760"
            className="w-full h-full drop-shadow-[0_12px_32px_rgba(11,75,154,0.35)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Vibrant Logo Top Blue Gradient */}
              <linearGradient id="hashGradient" x1="200" y1="440" x2="820" y2="860" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0E58B6" />
                <stop offset="50%" stopColor="#0B4B9A" />
                <stop offset="100%" stopColor="#042C66" />
              </linearGradient>

              {/* Base Left Side Wall Gradient */}
              <linearGradient id="baseSideL" x1="17" y1="661" x2="513" y2="1083" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A4B91" />
                <stop offset="100%" stopColor="#063264" />
              </linearGradient>

              {/* Base Right Side Wall Gradient */}
              <linearGradient id="baseSideR" x1="513" y1="962" x2="1008" y2="789" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#167BC7" />
                <stop offset="100%" stopColor="#0A4B91" />
              </linearGradient>

              {/* Precise 4 Quadrant Diagonal Clip Paths for State 1 Assembly */}
              <clipPath id="clipNW">
                <polygon points="0,0 513,0 513,660 0,660" />
              </clipPath>
              <clipPath id="clipNE">
                <polygon points="513,0 1024,0 1024,660 513,660" />
              </clipPath>
              <clipPath id="clipSW">
                <polygon points="0,660 513,660 513,1100 0,1100" />
              </clipPath>
              <clipPath id="clipSE">
                <polygon points="513,660 1024,660 1024,1100 513,1100" />
              </clipPath>
              {/* Neon Glow Filter for Hashtag Loading Beam */}
              <filter id="hashGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="glowBlur1" />
                <feGaussianBlur stdDeviation="14" result="glowBlur2" />
                <feMerge>
                  <feMergeNode in="glowBlur2" />
                  <feMergeNode in="glowBlur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* SIMULTANEOUS BASE CONSTRUCTION (STATE 1 & STATE 2) */}
            <g id="base">
              {/* 1. Base Outline Draw */}
              {phase >= 2 && !shouldReduceMotion && (
                <g id="base-outline-draw">
                  <motion.polygon
                    points="513,386 1008,661 513,962 17,661"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0.3] }}
                    transition={{ duration: 0.55, ease: snapEase }}
                  />
                  <motion.polygon
                    points="17,661 513,962 513,1083 17,789"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0.3] }}
                    transition={{ duration: 0.55, delay: 0.08, ease: snapEase }}
                  />
                  <motion.polygon
                    points="513,962 1008,661 1008,789 513,1083"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0.3] }}
                    transition={{ duration: 0.55, delay: 0.08, ease: snapEase }}
                  />
                </g>
              )}

              {/* 2. Left Blue Side Surface */}
              <motion.polygon
                id="base-left"
                points="17,661 513,962 513,1083 17,789"
                fill="url(#baseSideL)"
                stroke="#0B3C78"
                strokeWidth="3"
                strokeLinejoin="round"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={
                  phase >= 2 || shouldReduceMotion
                    ? { opacity: 1, scaleY: 1 }
                    : { opacity: 0, scaleY: 0 }
                }
                transition={{ duration: 0.5, delay: 0.08, ease: snapEase }}
                style={{ transformOrigin: "513px 962px" }}
              />

              {/* 3. Right Blue Side Surface */}
              <motion.polygon
                id="base-right"
                points="513,962 1008,661 1008,789 513,1083"
                fill="url(#baseSideR)"
                stroke="#0B3C78"
                strokeWidth="3"
                strokeLinejoin="round"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={
                  phase >= 2 || shouldReduceMotion
                    ? { opacity: 1, scaleY: 1 }
                    : { opacity: 0, scaleY: 0 }
                }
                transition={{ duration: 0.5, delay: 0.08, ease: snapEase }}
                style={{ transformOrigin: "513px 962px" }}
              />

              {/* 4. Top White Surface */}
              <motion.polygon
                id="base-top"
                points="513,386 1008,661 513,962 17,661"
                fill="#FBFCFE"
                stroke="#1675C7"
                strokeWidth="6"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={
                  phase >= 2 || shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.88 }
                }
                transition={{ duration: 0.5, delay: 0.04, ease: snapEase }}
                style={{ transformOrigin: "513px 661px" }}
              />
            </g>

            {/* UNIFIED CONTINUOUS HASH CONTAINER */}
            <g id="hash-container">
              <motion.g
                id="hash-master-group"
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1, rotateX: 0, rotateZ: 0 }
                    : phase >= 3
                      ? {
                        opacity: 1,
                        scale: [1, 0.94, 1.02, 1],
                        rotateX: [0, 48, -4, 0],
                        rotateZ: [0, -18, 2, 0]
                      }
                      : phase === 2
                        ? { opacity: 1, scale: 1, rotateX: 0, rotateZ: 0 }
                        : { opacity: 0 }
                }
                transition={{ duration: 0.65, ease: snapEase }}
                style={{ transformOrigin: "513px 650px", transformStyle: "preserve-3d" }}
              >
                {/* 4 Diagonal Flat Pieces Converging into Flat 2D Hashtag */}
                <g id="state-1-flat-pieces">
                  {/* NW Piece ↘ */}
                  <motion.g
                    clipPath="url(#clipNW)"
                    initial={{ translateX: -360, translateY: -260, opacity: 0 }}
                    animate={
                      phase >= 2 || shouldReduceMotion
                        ? { translateX: 0, translateY: 0, opacity: 1 }
                        : { translateX: -360, translateY: -260, opacity: 0 }
                    }
                    transition={{ duration: 0.7, ease: snapEase }}
                  >
                    <path
                      d="M 818.0 581.0 L 766.0 552.0 L 704.0 590.0 L 700.0 590.0 L 603.0 533.0 L 603.0 531.0 L 592.0 528.0 L 592.0 526.0 L 567.0 512.0 L 567.0 507.0 L 626.0 472.0 L 584.0 448.0 L 582.0 445.0 L 574.0 442.0 L 510.0 480.0 L 447.0 443.0 L 396.0 474.0 L 452.0 508.0 L 451.0 514.0 L 319.0 592.0 L 254.0 554.0 L 201.0 584.0 L 251.0 614.0 L 256.0 615.0 L 260.0 620.0 L 258.0 626.0 L 204.0 657.0 L 202.0 660.0 L 247.0 686.0 L 254.0 688.0 L 318.0 651.0 L 447.0 725.0 L 452.0 730.0 L 452.0 733.0 L 446.0 738.0 L 393.0 768.0 L 434.0 793.0 L 445.0 798.0 L 509.0 761.0 L 573.0 797.0 L 623.0 768.0 L 623.0 766.0 L 569.0 735.0 L 566.0 731.0 L 569.0 726.0 L 700.0 651.0 L 705.0 651.0 L 765.0 686.0 L 796.0 669.0 L 817.0 655.0 L 764.0 625.0 L 760.0 621.0 L 760.0 617.0 Z M 374.0 623.0 L 374.0 619.0 L 378.0 615.0 L 459.0 570.0 L 506.0 541.0 L 513.0 541.0 L 633.0 609.0 L 644.0 618.0 L 644.0 621.0 L 636.0 628.0 L 511.0 701.0 L 507.0 701.0 L 469.0 678.0 L 385.0 632.0 Z"
                      fill="url(#hashGradient)"
                      fillRule="evenodd"
                      stroke="#F8FBFF"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                  </motion.g>

                  {/* NE Piece ↙ */}
                  <motion.g
                    clipPath="url(#clipNE)"
                    initial={{ translateX: 360, translateY: -260, opacity: 0 }}
                    animate={
                      phase >= 2 || shouldReduceMotion
                        ? { translateX: 0, translateY: 0, opacity: 1 }
                        : { translateX: 360, translateY: -260, opacity: 0 }
                    }
                    transition={{ duration: 0.7, ease: snapEase }}
                  >
                    <path
                      d="M 818.0 581.0 L 766.0 552.0 L 704.0 590.0 L 700.0 590.0 L 603.0 533.0 L 603.0 531.0 L 592.0 528.0 L 592.0 526.0 L 567.0 512.0 L 567.0 507.0 L 626.0 472.0 L 584.0 448.0 L 582.0 445.0 L 574.0 442.0 L 510.0 480.0 L 447.0 443.0 L 396.0 474.0 L 452.0 508.0 L 451.0 514.0 L 319.0 592.0 L 254.0 554.0 L 201.0 584.0 L 251.0 614.0 L 256.0 615.0 L 260.0 620.0 L 258.0 626.0 L 204.0 657.0 L 202.0 660.0 L 247.0 686.0 L 254.0 688.0 L 318.0 651.0 L 447.0 725.0 L 452.0 730.0 L 452.0 733.0 L 446.0 738.0 L 393.0 768.0 L 434.0 793.0 L 445.0 798.0 L 509.0 761.0 L 573.0 797.0 L 623.0 768.0 L 623.0 766.0 L 569.0 735.0 L 566.0 731.0 L 569.0 726.0 L 700.0 651.0 L 705.0 651.0 L 765.0 686.0 L 796.0 669.0 L 817.0 655.0 L 764.0 625.0 L 760.0 621.0 L 760.0 617.0 Z M 374.0 623.0 L 374.0 619.0 L 378.0 615.0 L 459.0 570.0 L 506.0 541.0 L 513.0 541.0 L 633.0 609.0 L 644.0 618.0 L 644.0 621.0 L 636.0 628.0 L 511.0 701.0 L 507.0 701.0 L 469.0 678.0 L 385.0 632.0 Z"
                      fill="url(#hashGradient)"
                      fillRule="evenodd"
                      stroke="#F8FBFF"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                  </motion.g>

                  {/* SW Piece ↗ */}
                  <motion.g
                    clipPath="url(#clipSW)"
                    initial={{ translateX: -360, translateY: 260, opacity: 0 }}
                    animate={
                      phase >= 2 || shouldReduceMotion
                        ? { translateX: 0, translateY: 0, opacity: 1 }
                        : { translateX: -360, translateY: 260, opacity: 0 }
                    }
                    transition={{ duration: 0.7, ease: snapEase }}
                  >
                    <path
                      d="M 818.0 581.0 L 766.0 552.0 L 704.0 590.0 L 700.0 590.0 L 603.0 533.0 L 603.0 531.0 L 592.0 528.0 L 592.0 526.0 L 567.0 512.0 L 567.0 507.0 L 626.0 472.0 L 584.0 448.0 L 582.0 445.0 L 574.0 442.0 L 510.0 480.0 L 447.0 443.0 L 396.0 474.0 L 452.0 508.0 L 451.0 514.0 L 319.0 592.0 L 254.0 554.0 L 201.0 584.0 L 251.0 614.0 L 256.0 615.0 L 260.0 620.0 L 258.0 626.0 L 204.0 657.0 L 202.0 660.0 L 247.0 686.0 L 254.0 688.0 L 318.0 651.0 L 447.0 725.0 L 452.0 730.0 L 452.0 733.0 L 446.0 738.0 L 393.0 768.0 L 434.0 793.0 L 445.0 798.0 L 509.0 761.0 L 573.0 797.0 L 623.0 768.0 L 623.0 766.0 L 569.0 735.0 L 566.0 731.0 L 569.0 726.0 L 700.0 651.0 L 705.0 651.0 L 765.0 686.0 L 796.0 669.0 L 817.0 655.0 L 764.0 625.0 L 760.0 621.0 L 760.0 617.0 Z M 374.0 623.0 L 374.0 619.0 L 378.0 615.0 L 459.0 570.0 L 506.0 541.0 L 513.0 541.0 L 633.0 609.0 L 644.0 618.0 L 644.0 621.0 L 636.0 628.0 L 511.0 701.0 L 507.0 701.0 L 469.0 678.0 L 385.0 632.0 Z"
                      fill="url(#hashGradient)"
                      fillRule="evenodd"
                      stroke="#F8FBFF"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                  </motion.g>

                  {/* SE Piece ↖ */}
                  <motion.g
                    clipPath="url(#clipSE)"
                    initial={{ translateX: 360, translateY: 260, opacity: 0 }}
                    animate={
                      phase >= 2 || shouldReduceMotion
                        ? { translateX: 0, translateY: 0, opacity: 1 }
                        : { translateX: 360, translateY: 260, opacity: 0 }
                    }
                    transition={{ duration: 0.7, ease: snapEase }}
                  >
                    <path
                      d="M 818.0 581.0 L 766.0 552.0 L 704.0 590.0 L 700.0 590.0 L 603.0 533.0 L 603.0 531.0 L 592.0 528.0 L 592.0 526.0 L 567.0 512.0 L 567.0 507.0 L 626.0 472.0 L 584.0 448.0 L 582.0 445.0 L 574.0 442.0 L 510.0 480.0 L 447.0 443.0 L 396.0 474.0 L 452.0 508.0 L 451.0 514.0 L 319.0 592.0 L 254.0 554.0 L 201.0 584.0 L 251.0 614.0 L 256.0 615.0 L 260.0 620.0 L 258.0 626.0 L 204.0 657.0 L 202.0 660.0 L 247.0 686.0 L 254.0 688.0 L 318.0 651.0 L 447.0 725.0 L 452.0 730.0 L 452.0 733.0 L 446.0 738.0 L 393.0 768.0 L 434.0 793.0 L 445.0 798.0 L 509.0 761.0 L 573.0 797.0 L 623.0 768.0 L 623.0 766.0 L 569.0 735.0 L 566.0 731.0 L 569.0 726.0 L 700.0 651.0 L 705.0 651.0 L 765.0 686.0 L 796.0 669.0 L 817.0 655.0 L 764.0 625.0 L 760.0 621.0 L 760.0 617.0 Z M 374.0 623.0 L 374.0 619.0 L 378.0 615.0 L 459.0 570.0 L 506.0 541.0 L 513.0 541.0 L 633.0 609.0 L 644.0 618.0 L 644.0 621.0 L 636.0 628.0 L 511.0 701.0 L 507.0 701.0 L 469.0 678.0 L 385.0 632.0 Z"
                      fill="url(#hashGradient)"
                      fillRule="evenodd"
                      stroke="#F8FBFF"
                      strokeWidth="5"
                      strokeLinejoin="round"
                    />
                  </motion.g>
                </g>

                {/* 12 Side Extrusions & Inner Hole Faces smoothly revealing during 3D Roll (State 2) */}
                <motion.g
                  id="hash-extrusions"
                  fill="url(#hashGradient)"
                  stroke="#F8FBFF"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={
                    phase >= 3 || shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 0.55, ease: snapEase }}
                >
                  <path id="hash-face-1" d="M 386.0 779.0 L 385.0 837.0 L 418.0 857.0 L 422.0 858.0 L 423.0 860.0 L 439.0 868.0 L 439.0 808.0 L 436.0 808.0 L 430.0 803.0 L 411.0 792.0 L 408.0 792.0 L 407.0 790.0 L 390.0 780.0 L 389.0 781.0 Z" />
                  <path id="hash-face-2" d="M 515.0 777.0 L 516.0 839.0 L 538.0 852.0 L 546.0 855.0 L 552.0 860.0 L 555.0 860.0 L 561.0 865.0 L 567.0 867.0 L 567.0 807.0 L 553.0 799.0 L 552.0 800.0 L 548.0 796.0 L 524.0 782.0 L 518.0 780.0 Z" />
                  <path id="hash-face-3" d="M 504.0 777.0 L 450.0 809.0 L 451.0 869.0 L 503.0 839.0 Z" />
                  <path id="hash-face-4" d="M 633.0 776.0 L 579.0 807.0 L 579.0 869.0 L 584.0 865.0 L 585.0 866.0 L 588.0 863.0 L 597.0 859.0 L 598.0 857.0 L 599.0 858.0 L 632.0 839.0 Z" />
                  <path id="hash-face-5" d="M 323.0 670.0 L 323.0 728.0 L 379.0 761.0 L 386.0 759.0 L 429.0 734.0 L 432.0 731.0 L 431.0 729.0 L 416.0 722.0 L 415.0 720.0 L 406.0 715.0 L 405.0 716.0 L 404.0 714.0 L 384.0 704.0 L 381.0 701.0 L 380.0 702.0 L 374.0 697.0 L 361.0 691.0 L 360.0 689.0 L 350.0 683.0 L 349.0 684.0 L 348.0 682.0 L 328.0 672.0 L 327.0 670.0 Z" />
                  <path id="hash-face-6" d="M 311.0 669.0 L 259.0 698.0 L 259.0 759.0 L 263.0 755.0 L 267.0 754.0 L 279.0 747.0 L 280.0 745.0 L 286.0 743.0 L 311.0 728.0 Z" />
                  <path id="hash-face-7" d="M 195.0 669.0 L 195.0 728.0 L 208.0 737.0 L 224.0 746.0 L 225.0 745.0 L 229.0 749.0 L 238.0 754.0 L 239.0 753.0 L 247.0 759.0 L 246.0 698.0 L 245.0 699.0 L 244.0 697.0 L 240.0 696.0 L 237.0 693.0 L 219.0 684.0 Z" />
                  <path id="hash-face-8" d="M 707.0 667.0 L 707.0 726.0 L 759.0 756.0 L 759.0 696.0 L 751.0 691.0 L 750.0 692.0 L 746.0 688.0 L 728.0 679.0 L 727.0 677.0 L 723.0 676.0 L 713.0 669.0 Z" />
                  <path id="hash-face-9" d="M 695.0 667.0 L 694.0 669.0 L 693.0 668.0 L 683.0 674.0 L 682.0 676.0 L 676.0 678.0 L 661.0 688.0 L 643.0 697.0 L 642.0 699.0 L 641.0 698.0 L 624.0 709.0 L 616.0 712.0 L 595.0 724.0 L 591.0 728.0 L 590.0 727.0 L 585.0 730.0 L 606.0 743.0 L 610.0 744.0 L 613.0 747.0 L 614.0 746.0 L 615.0 748.0 L 617.0 748.0 L 627.0 755.0 L 630.0 755.0 L 636.0 760.0 L 639.0 760.0 L 661.0 748.0 L 662.0 746.0 L 684.0 735.0 L 695.0 728.0 Z" />
                  <path id="hash-face-10" d="M 825.0 665.0 L 796.0 683.0 L 780.0 691.0 L 779.0 693.0 L 771.0 696.0 L 771.0 757.0 L 777.0 755.0 L 824.0 727.0 Z" />
                  <path id="hash-face-11" d="M 504.0 558.0 L 498.0 560.0 L 492.0 565.0 L 491.0 564.0 L 483.0 570.0 L 474.0 574.0 L 473.0 576.0 L 451.0 587.0 L 445.0 592.0 L 444.0 591.0 L 435.0 596.0 L 431.0 600.0 L 416.0 607.0 L 397.0 618.0 L 393.0 622.0 L 394.0 621.0 L 398.0 625.0 L 427.0 640.0 L 428.0 642.0 L 429.0 641.0 L 430.0 643.0 L 437.0 645.0 L 437.0 647.0 L 439.0 646.0 L 442.0 650.0 L 443.0 649.0 L 444.0 651.0 L 447.0 651.0 L 449.0 654.0 L 450.0 653.0 L 458.0 659.0 L 461.0 659.0 L 465.0 663.0 L 468.0 663.0 L 470.0 666.0 L 472.0 664.0 L 472.0 667.0 L 473.0 666.0 L 477.0 670.0 L 478.0 669.0 L 481.0 672.0 L 482.0 671.0 L 484.0 674.0 L 485.0 673.0 L 486.0 675.0 L 487.0 674.0 L 493.0 677.0 L 493.0 679.0 L 496.0 679.0 L 500.0 683.0 L 501.0 682.0 L 498.0 681.0 L 498.0 679.0 L 497.0 680.0 L 496.0 678.0 L 495.0 679.0 L 486.0 672.0 L 483.0 672.0 L 479.0 668.0 L 478.0 669.0 L 477.0 667.0 L 474.0 667.0 L 472.0 664.0 L 463.0 661.0 L 463.0 659.0 L 462.0 660.0 L 458.0 658.0 L 458.0 656.0 L 456.0 657.0 L 451.0 654.0 L 451.0 652.0 L 450.0 653.0 L 446.0 651.0 L 444.0 648.0 L 442.0 649.0 L 442.0 647.0 L 436.0 645.0 L 432.0 641.0 L 432.0 639.0 L 437.0 634.0 L 438.0 635.0 L 442.0 631.0 L 445.0 631.0 L 445.0 629.0 L 447.0 630.0 L 446.0 629.0 L 448.0 627.0 L 450.0 628.0 L 451.0 626.0 L 452.0 627.0 L 452.0 625.0 L 455.0 625.0 L 455.0 621.0 L 460.0 621.0 L 462.0 617.0 L 464.0 620.0 L 463.0 619.0 L 466.0 616.0 L 469.0 617.0 L 469.0 615.0 L 467.0 616.0 L 465.0 613.0 L 469.0 610.0 L 470.0 611.0 L 471.0 609.0 L 472.0 611.0 L 476.0 611.0 L 477.0 609.0 L 480.0 609.0 L 480.0 605.0 L 483.0 607.0 L 484.0 604.0 L 491.0 604.0 L 490.0 603.0 L 493.0 603.0 L 492.0 602.0 L 494.0 600.0 L 496.0 601.0 L 496.0 599.0 L 500.0 599.0 L 499.0 598.0 L 501.0 595.0 L 503.0 597.0 L 504.0 596.0 Z" />
                  <path id="hash-face-12" d="M 515.0 557.0 L 515.0 595.0 L 516.0 592.0 L 520.0 598.0 L 521.0 596.0 L 524.0 599.0 L 523.0 600.0 L 527.0 600.0 L 529.0 602.0 L 528.0 604.0 L 529.0 602.0 L 531.0 602.0 L 533.0 604.0 L 532.0 605.0 L 534.0 603.0 L 538.0 607.0 L 537.0 608.0 L 541.0 607.0 L 543.0 610.0 L 542.0 611.0 L 546.0 610.0 L 548.0 613.0 L 550.0 613.0 L 549.0 615.0 L 552.0 614.0 L 552.0 617.0 L 554.0 616.0 L 554.0 618.0 L 557.0 616.0 L 558.0 617.0 L 556.0 619.0 L 558.0 618.0 L 560.0 620.0 L 559.0 621.0 L 563.0 621.0 L 563.0 623.0 L 564.0 622.0 L 566.0 625.0 L 568.0 624.0 L 568.0 626.0 L 569.0 625.0 L 573.0 627.0 L 573.0 629.0 L 574.0 628.0 L 575.0 630.0 L 578.0 630.0 L 580.0 633.0 L 581.0 632.0 L 582.0 634.0 L 586.0 635.0 L 588.0 638.0 L 582.0 644.0 L 579.0 644.0 L 575.0 648.0 L 571.0 649.0 L 565.0 654.0 L 564.0 653.0 L 562.0 656.0 L 559.0 656.0 L 558.0 658.0 L 557.0 657.0 L 554.0 660.0 L 555.0 661.0 L 559.0 657.0 L 560.0 658.0 L 566.0 653.0 L 567.0 654.0 L 573.0 649.0 L 574.0 650.0 L 574.0 648.0 L 577.0 648.0 L 583.0 643.0 L 584.0 644.0 L 585.0 642.0 L 588.0 642.0 L 589.0 640.0 L 626.0 619.0 L 582.0 594.0 L 581.0 595.0 L 575.0 590.0 L 572.0 590.0 L 571.0 588.0 L 529.0 565.0 L 526.0 562.0 L 520.0 560.0 L 519.0 558.0 Z" />
                </motion.g>

                {/* NEON LIGHT ROAMING ALONG THE OUTSIDE BORDER/OUTLINE OF THE HASHTAG (#) */}
                {phase >= 4 && !shouldReduceMotion && (
                  <g id="roaming-outer-border-pulse" pointerEvents="none">
                    {/* 1. Deep Neon Cyan Radiant Glow Aura */}
                    <motion.path
                      d="M 201.0 584.0 L 254.0 554.0 L 319.0 592.0 L 396.0 474.0 L 447.0 443.0 L 510.0 480.0 L 574.0 442.0 L 626.0 472.0 L 567.0 512.0 L 603.0 533.0 L 704.0 590.0 L 766.0 552.0 L 818.0 581.0 L 825.0 665.0 L 777.0 755.0 L 771.0 757.0 L 759.0 756.0 L 632.0 839.0 L 579.0 869.0 L 516.0 839.0 L 451.0 869.0 L 439.0 868.0 L 385.0 837.0 L 323.0 728.0 L 259.0 759.0 L 195.0 728.0 Z"
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#hashGlowFilter)"
                      initial={{ opacity: 0, strokeDasharray: "240 480", strokeDashoffset: 0 }}
                      animate={{
                        opacity: [0, 1, 0.8, 1],
                        strokeDashoffset: [0, -1440]
                      }}
                      transition={{
                        opacity: { duration: 0.4 },
                        strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
                      }}
                    />

                    {/* 2. Intense White Electric Core Light Beam */}
                    <motion.path
                      d="M 201.0 584.0 L 254.0 554.0 L 319.0 592.0 L 396.0 474.0 L 447.0 443.0 L 510.0 480.0 L 574.0 442.0 L 626.0 472.0 L 567.0 512.0 L 603.0 533.0 L 704.0 590.0 L 766.0 552.0 L 818.0 581.0 L 825.0 665.0 L 777.0 755.0 L 771.0 757.0 L 759.0 756.0 L 632.0 839.0 L 579.0 869.0 L 516.0 839.0 L 451.0 869.0 L 439.0 868.0 L 385.0 837.0 L 323.0 728.0 L 259.0 759.0 L 195.0 728.0 Z"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, strokeDasharray: "180 540", strokeDashoffset: 0 }}
                      animate={{
                        opacity: [0, 1, 0.8, 1],
                        strokeDashoffset: [0, -1440]
                      }}
                      transition={{
                        opacity: { duration: 0.4 },
                        strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
                      }}
                    />
                  </g>
                )}
              </motion.g>
            </g>
          </svg>
        </motion.div>

        {/* Minimal Terminal Indicator Underneath */}
        <motion.div
          className="mt-6 flex flex-col items-center justify-center font-mono z-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-slate-900/90 border border-cyan-500/40 text-xs text-cyan-400 shadow-xl backdrop-blur-md">
            <span>{terminalText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              className="inline-block w-2 h-3.5 bg-cyan-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
