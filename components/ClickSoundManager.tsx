"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Cpu,
  Radio,
  Terminal,
  Keyboard,
  Gamepad2,
  Zap,
  Atom,
  Sparkles,
  Binary,
  Check,
  Sliders,
  Flame,
  CircleDot,
  Activity,
  Bot,
  Shield,
  Radar
} from "lucide-react";

export type TechSoundMode =
  | "terminal"
  | "cyber"
  | "rocket"
  | "mechanical"
  | "arcade"
  | "laser"
  | "quantum"
  | "hologram"
  | "binary"
  | "warp"
  | "plasma"
  | "glitch"
  | "robot"
  | "shield"
  | "sonar";

export interface SoundOption {
  id: TechSoundMode;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const SOUND_OPTIONS: SoundOption[] = [
  {
    id: "terminal",
    name: "Terminal >_",
    desc: "8-Bit retro matrix code blip",
    icon: Terminal,
    color: "text-emerald-400 border-emerald-400 bg-emerald-950/40"
  },
  {
    id: "cyber",
    name: "Cyber HUD",
    desc: "Futuristic sci-fi interface chirp",
    icon: Cpu,
    color: "text-cyan-400 border-cyan-400 bg-cyan-950/40"
  },
  {
    id: "rocket",
    name: "Rocket Pulse",
    desc: "Space thruster & high laser tap",
    icon: Radio,
    color: "text-orange-400 border-orange-400 bg-orange-950/40"
  },
  {
    id: "mechanical",
    name: "Mech Keyboard",
    desc: "Tactile Cherry MX switch tap",
    icon: Keyboard,
    color: "text-yellow-400 border-yellow-400 bg-yellow-950/40"
  },
  {
    id: "arcade",
    name: "Retro Arcade",
    desc: "Classic 8-bit dual-tone jump sound",
    icon: Gamepad2,
    color: "text-pink-400 border-pink-400 bg-pink-950/40"
  },
  {
    id: "laser",
    name: "Neon Laser",
    desc: "High-tech synth beam zap",
    icon: Zap,
    color: "text-blue-400 border-blue-400 bg-blue-950/40"
  },
  {
    id: "quantum",
    name: "Quantum Pop",
    desc: "Resonant sci-fi glass pop",
    icon: Atom,
    color: "text-purple-400 border-purple-400 bg-purple-950/40"
  },
  {
    id: "hologram",
    name: "Hologram UI",
    desc: "Harmonic shimmer frequency chime",
    icon: Sparkles,
    color: "text-indigo-400 border-indigo-400 bg-indigo-950/40"
  },
  {
    id: "binary",
    name: "Binary Bit",
    desc: "Ultra-crisp 16-bit dev keystroke",
    icon: Binary,
    color: "text-green-400 border-green-400 bg-green-950/40"
  },
  {
    id: "warp",
    name: "Warp Speed",
    desc: "Hyperdrive space warp sweep",
    icon: Flame,
    color: "text-red-400 border-red-400 bg-red-950/40"
  },
  {
    id: "plasma",
    name: "Plasma Cannon",
    desc: "Charged energy blast pulse",
    icon: CircleDot,
    color: "text-fuchsia-400 border-fuchsia-400 bg-fuchsia-950/40"
  },
  {
    id: "glitch",
    name: "Matrix Glitch",
    desc: "Cyberpunk digitized glitch click",
    icon: Activity,
    color: "text-teal-400 border-teal-400 bg-teal-950/40"
  },
  {
    id: "robot",
    name: "Droid Beep",
    desc: "Futuristic AI droid talk blip",
    icon: Bot,
    color: "text-amber-400 border-amber-400 bg-amber-950/40"
  },
  {
    id: "shield",
    name: "Energy Shield",
    desc: "Sci-fi deflector shield tap",
    icon: Shield,
    color: "text-sky-400 border-sky-400 bg-sky-950/40"
  },
  {
    id: "sonar",
    name: "Cyber Sonar",
    desc: "Deep sub-aquatic radar ping",
    icon: Radar,
    color: "text-violet-400 border-violet-400 bg-violet-950/40"
  }
];

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes 15 cool tech-themed UI click sounds using Web Audio API.
 */
export function playTechClickSound(mode: TechSoundMode = "terminal", volume = 0.22) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const pitchJitter = 0.96 + Math.random() * 0.08;

    switch (mode) {
      case "terminal": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(1200 * pitchJitter, now);
        osc.frequency.setValueAtTime(2400 * pitchJitter, now + 0.015);

        gain.gain.setValueAtTime(volume * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.035);
        break;
      }

      case "cyber": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(1600 * pitchJitter, now + 0.02);
        osc.frequency.exponentialRampToValueAtTime(400 * pitchJitter, now + 0.04);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1200, now);
        filter.Q.setValueAtTime(3, now);

        gain.gain.setValueAtTime(volume * 0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case "rocket": {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = "sawtooth";
        subOsc.frequency.setValueAtTime(180 * pitchJitter, now);
        subOsc.frequency.exponentialRampToValueAtTime(40 * pitchJitter, now + 0.04);
        subGain.gain.setValueAtTime(volume * 0.5, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        const highOsc = ctx.createOscillator();
        const highGain = ctx.createGain();
        highOsc.type = "sine";
        highOsc.frequency.setValueAtTime(2200 * pitchJitter, now);
        highOsc.frequency.exponentialRampToValueAtTime(800 * pitchJitter, now + 0.02);
        highGain.gain.setValueAtTime(volume * 0.3, now);
        highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        highOsc.connect(highGain);
        highGain.connect(ctx.destination);

        subOsc.start(now);
        subOsc.stop(now + 0.04);
        highOsc.start(now);
        highOsc.stop(now + 0.02);
        break;
      }

      case "mechanical": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1500 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(250 * pitchJitter, now + 0.03);

        gain.gain.setValueAtTime(volume * 0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.03);
        break;
      }

      case "arcade": {
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "square";
        osc1.frequency.setValueAtTime(600 * pitchJitter, now);
        osc1.frequency.setValueAtTime(1200 * pitchJitter, now + 0.02);

        gain1.gain.setValueAtTime(volume * 0.4, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.045);
        break;
      }

      case "laser": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(3200 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(300 * pitchJitter, now + 0.035);

        gain.gain.setValueAtTime(volume * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.035);
        break;
      }

      case "quantum": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(1900 * pitchJitter, now + 0.02);
        osc.frequency.exponentialRampToValueAtTime(700 * pitchJitter, now + 0.04);

        gain.gain.setValueAtTime(volume * 0.65, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case "hologram": {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc2.type = "sine";

        osc1.frequency.setValueAtTime(1046.5 * pitchJitter, now);
        osc2.frequency.setValueAtTime(1567.98 * pitchJitter, now);

        gain.gain.setValueAtTime(volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.05);
        osc2.stop(now + 0.05);
        break;
      }

      case "binary": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(2400 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(600 * pitchJitter, now + 0.02);

        gain.gain.setValueAtTime(volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.02);
        break;
      }

      case "warp": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(3200 * pitchJitter, now + 0.04);

        gain.gain.setValueAtTime(volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case "plasma": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(900 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(150 * pitchJitter, now + 0.045);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2000, now);
        filter.Q.setValueAtTime(5, now);

        gain.gain.setValueAtTime(volume * 0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.045);
        break;
      }

      case "glitch": {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "square";
        osc2.type = "sawtooth";

        osc1.frequency.setValueAtTime(1800 * pitchJitter, now);
        osc1.frequency.setValueAtTime(600 * pitchJitter, now + 0.015);

        osc2.frequency.setValueAtTime(400 * pitchJitter, now);
        osc2.frequency.setValueAtTime(2200 * pitchJitter, now + 0.02);

        gain.gain.setValueAtTime(volume * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.035);
        osc2.stop(now + 0.035);
        break;
      }

      case "robot": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(1760 * pitchJitter, now);
        osc.frequency.setValueAtTime(2637 * pitchJitter, now + 0.018);

        gain.gain.setValueAtTime(volume * 0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.038);
        break;
      }

      case "shield": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(700 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(1400 * pitchJitter, now + 0.025);
        osc.frequency.exponentialRampToValueAtTime(500 * pitchJitter, now + 0.05);

        gain.gain.setValueAtTime(volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case "sonar": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(2093 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(1046 * pitchJitter, now + 0.06);

        gain.gain.setValueAtTime(volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }
    }
  } catch (err) {
    console.debug("Tech click sound error:", err);
  }
}

/**
 * Synthesizes crisp keystroke sounds when the user types on the keyboard.
 */
export function playTypingKeySound(key: string, mode: TechSoundMode = "terminal", volume = 0.16) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const isSpace = key === " " || key === "Spacebar" || key === "Space" || key?.toLowerCase() === "space";
    const isEnter = key === "Enter";

    const pitchJitter = isSpace ? 0.9 : isEnter ? 1.25 : 0.9 + Math.random() * 0.2;

    if (isEnter) {
      // Enter key: punchy completion chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1300 * pitchJitter, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.045);
      gain.gain.setValueAtTime(volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
      return;
    }

    if (isSpace) {
      // Spacebar: punchy tactile mechanical spacebar thud & snap
      const bodyOsc = ctx.createOscillator();
      const snapOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      const snapGain = ctx.createGain();

      // Main resonant body thud (triangle wave sweeping 640Hz -> 180Hz)
      bodyOsc.type = "triangle";
      bodyOsc.frequency.setValueAtTime(640 * pitchJitter, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(180 * pitchJitter, now + 0.055);

      bodyGain.gain.setValueAtTime(volume * 1.1, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

      // Top tactile snap click (square wave sweeping 1600Hz -> 400Hz)
      snapOsc.type = "square";
      snapOsc.frequency.setValueAtTime(1600 * pitchJitter, now);
      snapOsc.frequency.exponentialRampToValueAtTime(400 * pitchJitter, now + 0.025);

      snapGain.gain.setValueAtTime(volume * 0.45, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      bodyOsc.connect(bodyGain);
      snapOsc.connect(snapGain);
      bodyGain.connect(ctx.destination);
      snapGain.connect(ctx.destination);

      bodyOsc.start(now);
      snapOsc.start(now);
      bodyOsc.stop(now + 0.055);
      snapOsc.stop(now + 0.025);
      return;
    }

    // Regular character keypress - ultra fast micro keystroke
    if (mode === "terminal") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(1500 * pitchJitter, now);
      osc.frequency.setValueAtTime(2600 * pitchJitter, now + 0.01);
      gain.gain.setValueAtTime(volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.022);
    } else {
      playTechClickSound(mode, volume * 0.6);
    }
  } catch (err) {
    console.debug("Typing sound error:", err);
  }
}

/**
 * Synthesizes a warm, resonant electric piano / chime note for heading letter hovers.
 * Pitch maps to a harmonic musical scale based on letter index.
 */
export function playMusicalKeyNote(index: number, volume = 0.03) {
  try {
    const isMuted = typeof window !== "undefined" && localStorage.getItem("coderithum_sound_muted") === "true";
    if (isMuted) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Harmonious Pentatonic & Major Scale frequencies (C4 to A6)
    const freqs = [
      261.63, 293.66, 329.63, 392.00, 440.00,
      523.25, 587.33, 659.25, 783.99, 880.00,
      1046.50, 1174.66, 1318.51, 1567.98, 1760.00
    ];
    const freq = freqs[Math.abs(index) % freqs.length];

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    // Primary fundamental sine wave chime (soft subtle volume)
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);
    gain1.gain.setValueAtTime(0.0005, now);
    gain1.gain.linearRampToValueAtTime(volume, now + 0.005);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    // Soft 2nd harmonic (octave higher at 20% volume for subtle warmth)
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, now);
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(volume * 0.2, now + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.18);
    osc2.stop(now + 0.18);
  } catch (err) {
    console.debug("Musical key sound error:", err);
  }
}

export default function ClickSoundManager() {
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTypingSoundEnabled, setIsTypingSoundEnabled] = useState<boolean>(true);
  const [soundMode, setSoundMode] = useState<TechSoundMode>("terminal");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const storedMuted = localStorage.getItem("coderithum_sound_muted");
    if (storedMuted !== null) {
      setIsMuted(storedMuted === "true");
    }
    const storedTyping = localStorage.getItem("coderithum_typing_sound_enabled");
    if (storedTyping !== null) {
      setIsTypingSoundEnabled(storedTyping === "true");
    }
    const storedMode = localStorage.getItem("coderithum_sound_mode") as TechSoundMode;
    if (storedMode && SOUND_OPTIONS.some(opt => opt.id === storedMode)) {
      setSoundMode(storedMode);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("coderithum_sound_muted", isMuted ? "true" : "false");
  }, [isMuted, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("coderithum_typing_sound_enabled", isTypingSoundEnabled ? "true" : "false");
  }, [isTypingSoundEnabled, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("coderithum_sound_mode", soundMode);
  }, [soundMode, mounted]);

  // Click Sound Listener
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && menuRef.current.contains(e.target as Node)) {
        return;
      }

      if (isMuted) return;
      if (e.button !== 0) return;

      // On mobile/touch devices, pointerdown fires when touching to scroll.
      // Ignore touch on pointerdown and handle actual taps via click event instead.
      if (e.pointerType === "touch") return;

      playTechClickSound(soundMode, 0.22);
    };

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(e.target as Node)) {
        return;
      }

      if (isMuted) return;
      if (e.button !== 0) return;

      // Trigger click sound on touch clicks (since mouse is handled on pointerdown)
      const isTouchClick =
        (e as PointerEvent).pointerType === "touch" ||
        e.detail === 0 ||
        !("pointerType" in e);

      if (isTouchClick) {
        playTechClickSound(soundMode, 0.22);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("click", handleClick);
    };
  }, [isMuted, soundMode]);

  // Typing Sound Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMuted || !isTypingSoundEnabled) return;

      // Ignore single modifier keys
      if (["Control", "Shift", "Alt", "Meta", "CapsLock", "Tab", "Escape"].includes(e.key)) {
        return;
      }

      const isSpaceKey = e.key === " " || e.code === "Space" || e.key === "Spacebar";

      // Ignore held-down key repeating except backspace & spacebar
      if (e.repeat && e.key !== "Backspace" && !isSpaceKey) return;

      const keyToPlay = isSpaceKey ? " " : e.key;
      playTypingKeySound(keyToPlay, soundMode, 0.20);
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMuted, isTypingSoundEnabled, soundMode]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (!newMutedState) {
      setTimeout(() => playTechClickSound(soundMode, 0.25), 50);
    }
  };

  const selectMode = (mode: TechSoundMode) => {
    setSoundMode(mode);
    setMenuOpen(false);
    if (!isMuted) {
      playTechClickSound(mode, 0.3);
    }
  };

  if (!mounted) return null;

  const currentOption = SOUND_OPTIONS.find(opt => opt.id === soundMode) || SOUND_OPTIONS[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div ref={menuRef} className="fixed bottom-5 left-5 z-50 pointer-events-auto flex flex-col gap-2">
      {/* Sound Options Selector Menu Dropup */}
      {menuOpen && !isMuted && (
        <div className="w-80 bg-slate-900/95 border-2 border-cyan-500/50 backdrop-blur-xl rounded-2xl p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 px-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Tech Sound Arsenal
            </span>
            <span className="text-[10px] font-mono bg-cyan-950 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
              15 FX
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {SOUND_OPTIONS.map(opt => {
              const IconComp = opt.icon;
              const isSelected = opt.id === soundMode;
              return (
                <button
                  key={opt.id}
                  onClick={() => selectMode(opt.id)}
                  className={`flex items-center justify-between p-2 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                    isSelected
                      ? "bg-slate-800 border-cyan-400 text-white shadow-sm"
                      : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${opt.color}`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold leading-tight flex items-center gap-1">
                        {opt.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans leading-tight">
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>

          {/* Typing Sounds Independent Control */}
          <div className="pt-2.5 mt-2 border-t border-slate-800 flex items-center justify-between px-1">
            <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-cyan-400" /> Typing Keystrokes
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsTypingSoundEnabled(!isTypingSoundEnabled);
              }}
              className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer border ${
                isTypingSoundEnabled
                  ? "bg-cyan-950 border-cyan-500 text-cyan-300 hover:bg-cyan-900"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {isTypingSoundEnabled ? "ENABLED" : "MUTED"}
            </button>
          </div>
        </div>
      )}

      {/* Control Buttons Bar */}
      <div className="flex items-center gap-2">
        {/* Main Sound Mute/Unmute Button */}
        <button
          onClick={toggleSound}
          title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border-2 text-xs font-mono font-bold shadow-lg transition-all duration-200 cursor-pointer ${
            isMuted
              ? "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
              : "bg-slate-900 text-cyan-400 border-cyan-400 hover:bg-black hover:scale-105"
          }`}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>SOUND: OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>SOUND: ON</span>
            </>
          )}
        </button>

        {/* Tech Sound Preset Selector Dropup Trigger */}
        {!isMuted && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            title="Click to open Tech Sound Selection Menu"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 bg-slate-900/90 backdrop-blur-md text-white text-xs font-mono font-semibold shadow-md transition-all duration-200 cursor-pointer ${
              menuOpen
                ? "border-cyan-400 ring-2 ring-cyan-400/30 scale-105"
                : "border-slate-700 hover:border-cyan-400 hover:scale-105"
            }`}
          >
            <CurrentIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentOption.name}</span>
            <Sliders className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>
        )}
      </div>
    </div>
  );
}
