# Coderithum Sound System Documentation 🎵⚡

This document provides a comprehensive technical breakdown of the **Web Audio API Sound Engine** implemented in the **Coderithum Tech Club Portal** (`components/ClickSoundManager.tsx`).

---

## 1. Overview & Architecture

The sound system is designed to provide responsive, high-performance audio feedback for both **mouse clicks** and **keyboard typing** across the entire website without relying on external `.mp3` or `.wav` audio files.

### Key Architectural Advantages:
* **Zero Latency (0ms Response)**: Audio is synthesized instantly in memory on the exact millisecond of a user gesture.
* **No External Dependencies**: Zero network overhead or risk of broken/missing audio asset URLs.
* **Non-Robotic Acoustics**: Micro pitch jitter (randomized frequency variance of ±6% to ±20%) prevents flat, repetitive audio.
* **SSR Hydration Protection**: Uses a client-side `mounted` state check to prevent Next.js server-side vs client-side React hydration mismatches when reading `localStorage`.

---

## 2. Technical Implementation & Sound Synthesis

The engine uses the browser's native **Web Audio API** (`AudioContext`).

```
+-----------------------------------------------------------------------+
|                             AudioContext                              |
|                                                                       |
|  +--------------------+    +--------------------+    +-------------+  |
|  | OscillatorNode     | -> | BiquadFilterNode   | -> | GainNode    |  |
|  | (sine/square/etc)  |    | (bandpass/lowpass) |    | (volume)    |  |
|  +--------------------+    +--------------------+    +-------------+  |
|                                                             |         |
|                                                             v         |
|                                                     ctx.destination   |
+-----------------------------------------------------------------------+
```

### Core Web Audio Concepts Used:
1. **`OscillatorNode`**: Generates pure audio wave types (`sine`, `square`, `sawtooth`, `triangle`).
2. **`BiquadFilterNode`**: Filters specific frequencies (e.g., `bandpass` for sci-fi HUD chirps, `lowpass` for plasma thumps).
3. **`GainNode`**: Controls volume levels and applies exponential decay (`exponentialRampToValueAtTime`) to eliminate clipping or speaker pops.
4. **Frequency Sweeping**: Sweeps frequencies rapidly (e.g., `800Hz -> 1600Hz -> 400Hz` in 0.04s) to create distinct UI feedback tones.

---

## 3. The 15 Tech Sound Options

| # | Sound Option | Waveform / Synthesis Type | Description |
|---|--------------|---------------------------|-------------|
| **1** | **Terminal >_** *(Default)* | `square` wave dual-tone step (`1200Hz -> 2400Hz`) | 8-bit retro matrix code blip |
| **2** | **Cyber HUD** | `sine` wave with `bandpass` filter sweep | Sci-fi high-tech interface chirp |
| **3** | **Rocket Pulse** | `sawtooth` sub thud (`180Hz`) + `sine` laser (`2200Hz`) | Space thruster & high laser tap |
| **4** | **Mech Keyboard** | `sine` wave frequency drop (`1500Hz -> 250Hz`) | Tactile Cherry MX mechanical switch tap |
| **5** | **Retro Arcade** | `square` dual-tone arpeggio (`600Hz -> 1200Hz`) | Classic 8-bit arcade jump sound |
| **6** | **Neon Laser** | High `sawtooth` sweep (`3200Hz -> 300Hz`) | High-tech synth beam laser zap |
| **7** | **Quantum Pop** | `sine` liquid sweep (`450Hz -> 1900Hz -> 700Hz`) | Resonant sci-fi glass bubble pop |
| **8** | **Hologram UI** | Dual `sine` harmonics (`1046Hz` + `1567Hz`) | Harmonic shimmer frequency chime |
| **9** | **Binary Bit** | Fast `triangle` wave drop (`2400Hz -> 600Hz`) | Ultra-crisp 16-bit developer keystroke |
| **10** | **Warp Speed** | Upward `sawtooth` sweep (`150Hz -> 3200Hz`) | Hyperdrive space warp sweep |
| **11** | **Plasma Cannon** | `sawtooth` with `lowpass` Q-resonance filter | Charged energy blast pulse |
| **12** | **Matrix Glitch** | Dual `square` + `sawtooth` frequency cross-slide | Cyberpunk digitized glitch click |
| **13** | **Droid Beep** | Dual pitch step `sine` (`1760Hz -> 2637Hz`) | Futuristic AI droid talk blip |
| **14** | **Energy Shield** | Multi-step `triangle` wave sweep | Sci-fi deflector shield tap |
| **15** | **Cyber Sonar** | Deep high-to-low `sine` drop (`2093Hz -> 1046Hz`) | Deep sub-aquatic radar ping |

---

## 4. Keystroke Typing Sound Engine (`playTypingKeySound`)

Whenever the user types anywhere on the keyboard, the system triggers `playTypingKeySound(key, soundMode, volume)` via a global `keydown` event listener.

### Key Features:
* **Micro-keystrokes**: Optimized to be shorter and quieter than full mouse clicks (`0.02s - 0.04s` duration) so fast typing sounds rhythmic and pleasant.
* **Spacebar Thud & Snap**: Synthesizes a dual-oscillator mechanical spacebar sound combining a resonant triangle body thud (`520Hz -> 140Hz`) and a tactile top click snap (`1200Hz -> 280Hz`).
* **Enter Key Chime**: Synthesizes a completion tone (`1300Hz -> 300Hz`).
* **Ignored Keys**: Single modifier keys (`Control`, `Shift`, `Alt`, `Meta`, `CapsLock`, `Tab`, `Escape`) are ignored so pressing shortcuts doesn't spam sounds.

---

## 5. State Management & Controls

State is managed locally in `ClickSoundManager.tsx` and persisted in `localStorage`:

| State Variable | Type | LocalStorage Key | Default | Description |
|----------------|------|------------------|---------|-------------|
| `isMuted` | `boolean` | `coderithum_sound_muted` | `false` | Master audio mute toggle (Mutes all sounds) |
| `isTypingSoundEnabled` | `boolean` | `coderithum_typing_sound_enabled` | `true` | Independent toggle for typing keystroke sounds |
| `soundMode` | `TechSoundMode` | `coderithum_sound_mode` | `"terminal"` | Active sound theme selection |
| `mounted` | `boolean` | N/A | `false` | Prevents SSR React hydration mismatch |

---

## 6. User Interface Components

* **Floating Control Badge**: Positioned at `bottom-5 left-5` (`SOUND: ON / OFF`).
* **Tech Sound Arsenal Menu**: Glassmorphic popover displaying all 15 sound options with live icons, descriptions, active state checks, and an independent **Typing Keystrokes [ENABLED/MUTED]** toggle switch.

---

## 7. File Locations

* **Sound Engine Component**: [`components/ClickSoundManager.tsx`](file:///c:/Users/Maitri/coderithum/components/ClickSoundManager.tsx)
* **Global Mounting Point**: [`app/layout.tsx`](file:///c:/Users/Maitri/coderithum/app/layout.tsx#L21-L24)
