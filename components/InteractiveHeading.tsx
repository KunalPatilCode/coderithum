"use client";

import React from "react";
import { motion } from "framer-motion";
import { playMusicalKeyNote } from "./ClickSoundManager";

interface InteractiveHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  volume?: number;
}

export default function InteractiveHeading({
  text,
  as: Tag = "h1",
  className = "",
  volume = 0.03
}: InteractiveHeadingProps) {
  if (!text) return null;

  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <Tag className={`inline-flex flex-wrap items-center gap-x-[0.25em] ${className}`}>
      {words.map((word, wordIdx) => {
        return (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {word.split("").map((char) => {
              const charIdx = globalCharIndex++;
              return (
                <motion.span
                  key={charIdx}
                  className="inline-block transition-colors duration-200 hover:text-cyan-500 cursor-pointer select-none origin-bottom"
                  whileHover={{
                    scale: 1.38,
                    y: -8,
                    rotate: (charIdx % 2 === 0 ? 1 : -1) * 3,
                    transition: { type: "spring", stiffness: 450, damping: 15 }
                  }}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches) {
                      return;
                    }
                    playMusicalKeyNote(charIdx, volume);
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
