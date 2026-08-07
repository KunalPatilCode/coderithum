"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface MarqueeRowProps {
  word: string;
  direction: "left" | "right";
  scrollYProgress: MotionValue<number>;
  startWithSolid: boolean;
}

function MarqueeRow({ word, direction, scrollYProgress, startWithSolid }: MarqueeRowProps) {
  const repeatCount = 15; // Extra repetitions to prevent gaps during wide translations
  
  // Transform scroll progress (0 to 1) into horizontal displacement
  // When user scrolls down (progress goes 0 -> 1):
  // - left-scrolling row shifts further left
  // - right-scrolling row shifts further right
  const xRange = direction === "left" 
    ? ["0%", "-30%"] 
    : ["-30%", "0%"];
    
  const xTransform = useTransform(scrollYProgress, [0, 1], xRange);
  
  // Smooth spring effect to ease the scrolling movement
  const x = useSpring(xTransform, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <div className="w-full overflow-hidden flex select-none py-1 md:py-2">
      <motion.div 
        className="flex whitespace-nowrap" 
        style={{ x }}
      >
        <div className="flex shrink-0 items-center whitespace-nowrap">
          {Array.from({ length: repeatCount }, (_, index) => {
            const isSolid = startWithSolid ? index % 2 === 0 : index % 2 !== 0;
            return (
              <span
                key={`orig-${index}`}
                className={`inline-block mx-3 md:mx-4 font-black tracking-tighter text-3xl sm:text-5xl md:text-6xl transition-colors duration-300 ${
                  isSolid ? "text-slate-900" : "text-stroke-dark"
                }`}
                style={{
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function TextMarqueeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the window relative to this component's viewport presence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div 
      ref={containerRef}
      className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 py-4 overflow-hidden flex flex-col gap-1 bg-transparent"
    >
      {/* Row 1: CODERITHUM (Left) */}
      <MarqueeRow 
        word="CODERITHUM" 
        direction="left" 
        scrollYProgress={scrollYProgress}
        startWithSolid={true} 
      />

      {/* Row 2: CODE (Right) */}
      <MarqueeRow 
        word="CODE" 
        direction="right" 
        scrollYProgress={scrollYProgress}
        startWithSolid={false} 
      />

      {/* Row 3: INNOVATE (Left) */}
      <MarqueeRow 
        word="INNOVATE" 
        direction="left" 
        scrollYProgress={scrollYProgress}
        startWithSolid={true} 
      />

      {/* Row 4: BUILD (Right) */}
      <MarqueeRow 
        word="BUILD" 
        direction="right" 
        scrollYProgress={scrollYProgress}
        startWithSolid={false} 
      />
    </div>
  );
}
