"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import {
  Search,
  Code,
  Sparkles,
  Cpu,
  Layers,
  Database,
  ArrowRight,
  Network,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  User,
  Mail,
  Phone,
  ExternalLink,
  Award,
  Info,
  Menu,
  X,
  Trophy,
  ChevronLeft,
  ArrowUpRight
} from "lucide-react";

// Custom SVG Icons because older Lucide versions lack standard brand exports
const Github = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
  </svg>
);

const Linkedin = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);
import logo from "../public/logo.png";

// ============================================================================
// Types
// ============================================================================

interface ClubEvent {
  id: string;
  title: string;
  banner: string;
  description: string;
  shortDesc: string;
  date: string;
  time: string;
  venue: string;
  agenda: string[];
  speakers: { name: string; role: string; company: string; avatar: string }[];
  regLink: string;
  feedbackLink: string;
  gallery: string[];
  type: "upcoming" | "past";
}

interface ClubProject {
  id: string;
  title: string;
  banner: string;
  description: string;
  shortDesc: string;
  techStack: string[];
  github: string;
  demo: string;
  mentor: string;
  team: string[];
  gallery: string[];
}

interface GalleryAlbum {
  id: string;
  name: string;
  cover: string;
  media: { url: string; caption: string; isVideo?: boolean }[];
}

interface TeamMember {
  name: string;
  role: string;
  category: "Faculty" | "Leadership" | "Technical" | "Design" | "Marketing";
  avatar: string;
  github?: string;
  linkedin?: string;
}

interface ClubAchievement {
  id: string;
  title: string;
  description: string;
  date: string;
  recipient: string;
  award: string;
  iconType: "trophy" | "paper" | "star";
}

// ============================================================================
// Initial Mock Data (Premium, Real-world Developer Focus)
// ============================================================================

const initialEvents: ClubEvent[] = [
  {
    id: "devhack-2026",
    title: "DevHack 2026: National Hackathon",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A 36-hour national hackathon focused on building real-world solutions using Generative AI, Web3, and IoT.",
    description: "DevHack is our flagship annual hackathon bringing together the brightest minds across the nation to hack, innovate, and build. This year, we are focusing on solving localized socio-economic problems using next-gen technologies including Agentic AI, decentralized networks, and smart IoT grids. Over $10,000 in cash prizes, mentors from top startups, and recruiters from top dev teams will be present.",
    date: "October 16-18, 2026",
    time: "09:00 AM onwards",
    venue: "Main Auditorium & Tech Lab, Campus Center",
    agenda: [
      "Day 1, 09:00 AM - Check-in & Team Formation",
      "Day 1, 11:00 AM - Keynote & Topic Release",
      "Day 1, 01:00 PM - Hacking Commences",
      "Day 2, 10:00 AM - Mentorship Checkpoint 1",
      "Day 2, 08:00 PM - Mentorship Checkpoint 2",
      "Day 3, 01:00 PM - Hacking Ends & Code Submission",
      "Day 3, 03:00 PM - Project Pitching & Judging",
      "Day 3, 06:00 PM - Award Ceremony"
    ],
    speakers: [
      { name: "Vikram Sharma", role: "Principal Engineer", company: "Google Cloud", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Priya Nair", role: "AI Research Lead", company: "Meta", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" }
    ],
    regLink: "https://devhack2026.example.com",
    feedbackLink: "https://feedback.example.com/devhack",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
    ],
    type: "upcoming"
  },
  {
    id: "agentic-ai-workshop",
    title: "Hands-on Agentic AI & RAG Bootcamp",
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Build and deploy multi-agent workflows using LangChain, CrewAI, and vector embedding architectures.",
    description: "Deep dive into the world of AI Agents. In this workshop, you will learn how to design pipelines where language models can act, search, compile, and execute tools autonomously. We will build a Retrieval-Augmented Generation (RAG) system with a Pinecone vector DB and connect it to a multi-agent coordinate team using LangGraph.",
    date: "August 22, 2026",
    time: "10:00 AM - 04:00 PM",
    venue: "Seminar Hall-IV, Computer Science Block",
    agenda: [
      "10:00 AM - Introductions to LLMs & Embeddings",
      "11:30 AM - Setting up Pinecone Vector Databases",
      "01:00 PM - Lunch & Networking",
      "02:00 PM - Building Tools & API Connectors",
      "03:00 PM - Orchestrating CrewAI Autonomous Teams",
      "03:45 PM - QA & Certification Distribution"
    ],
    speakers: [
      { name: "Rahul Deshmukh", role: "Lead Systems Architect", company: "Vercel", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" }
    ],
    regLink: "https://bootcamp.example.com",
    feedbackLink: "https://feedback.example.com/ai-bootcamp",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    ],
    type: "upcoming"
  },
  {
    id: "kubernetes-production",
    title: "Docker & Kubernetes in Production",
    banner: "https://images.unsplash.com/photo-1484662020986-75935d2ebc66?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Mastering cloud deployment, containers, and orchestration grids for microservice architectures.",
    description: "A comprehensive past workshop where students built Docker containers from scratch, orchestrated pod scalability using Kubernetes, configured Ingress rules, and integrated automated Prometheus/Grafana server health dashboards.",
    date: "April 12, 2026",
    time: "02:00 PM - 05:30 PM",
    venue: "Main Cloud Lab, CS Department",
    agenda: [
      "02:00 PM - Microservice Theory & Dockerization",
      "03:00 PM - Pods, Deployments & Services in Kubernetes",
      "04:15 PM - Setting up Prometheus Metrics",
      "05:00 PM - Deployment to AWS EKS Grid"
    ],
    speakers: [
      { name: "Sameer Verma", role: "DevOps Lead", company: "Kubecut", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80" }
    ],
    regLink: "https://k8s.example.com/archive",
    feedbackLink: "https://feedback.example.com/k8s",
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
    ],
    type: "past"
  }
];

const initialProjects: ClubProject[] = [
  {
    id: "coderithum-portal",
    title: "Coderithum Hub: Integrated Portal",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A next-generation, high-performance static portal with a modern glassmorphism UI/UX design.",
    description: "We built Coderithum Hub to serve as the unified digital face of our tech club. The project prioritizes lightning-fast loading speeds, complete responsiveness, search optimization, and seamless interactive subviews using Framer Motion animations. Built fully static-friendly to allow serverless hosts like GitHub Pages to serve resource and asset trees without server delays.",
    techStack: ["Next.js 16", "Tailwind CSS v4", "TypeScript", "Framer Motion", "Lucide Icons"],
    github: "https://github.com/KunalPatilCode/coderithum",
    demo: "https://kunalpatilcode.github.io/coderithum/",
    mentor: "Dr. Ananya Sen (Dept. of CSE)",
    team: ["Kunal Patil (Lead)", "Sarah Jenkins (UI/UX)", "Alex Rivera (Frontend)"],
    gallery: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "cybershield-nids",
    title: "CyberShield: Network Intrusion Detection",
    banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "AI-powered packet sniffer and intrusion shield identifying network anomalies in real-time.",
    description: "CyberShield processes raw ethernet packets and feeds traffic features to a local lightweight anomaly detection model. The application detects DDoS attacks, port scanning, and suspicious patterns, immediately sending instant webhook alerts to discord/slack and firewall systems to block hostile IPs.",
    techStack: ["Python", "PyTorch", "Scapy", "React", "Chart.js", "Tailwind CSS"],
    github: "https://github.com/example/cybershield",
    demo: "https://cybershield.example.com",
    mentor: "Prof. Amit Mehra (Head of Security Lab)",
    team: ["Michael Chang (Security Lead)", "James Cole (Backend)", "Jessica Wu (Data Scientist)"],
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
    ]
  }
];

const initialAlbums: GalleryAlbum[] = [
  {
    id: "hackathons-album",
    name: "Hackathons & Dev sprints",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    media: [
      { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80", caption: "Teams working through the night at DevHack 2025." },
      { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80", caption: "Final evaluation pitches in front of startup founders." },
      { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80", caption: "Winning team celebrating their cash award!" }
    ]
  },
  {
    id: "workshops-album",
    name: "Workshops & Tech Talks",
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    media: [
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80", caption: "Mentors explaining Docker containers to students." },
      { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80", caption: "Live coding grid during the Agentic AI workshop." }
    ]
  }
];

const initialTeam: TeamMember[] = [
  { name: "Dr. Ananya Sen", role: "Faculty Coordinator", category: "Faculty", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80", linkedin: "https://linkedin.com" },
  { name: "Kunal Patil", role: "Club President", category: "Leadership", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com/KunalPatilCode", linkedin: "https://linkedin.com" },
  { name: "Sarah Jenkins", role: "Vice President & Design Lead", category: "Leadership", avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com", linkedin: "https://linkedin.com" },
  { name: "Alex Rivera", role: "Technical Team Lead", category: "Technical", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com", linkedin: "https://linkedin.com" },
  { name: "Michael Chang", role: "Cybersecurity Head", category: "Technical", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com" },
  { name: "Emily Watson", role: "Marketing & Outreach Lead", category: "Marketing", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80", linkedin: "https://linkedin.com" },
  { name: "Jessica Wu", role: "Graphics & UI Designer", category: "Design", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com", linkedin: "https://linkedin.com" }
];

const initialAchievements: ClubAchievement[] = [
  {
    id: "ach-1",
    title: "Winners of Smart India Hackathon 2025",
    description: "Our core development team bagged the 1st prize at SIH 2025 in the smart energy distribution problem statements, winning a grand cash prize of ₹1,00,000.",
    date: "December 2025",
    recipient: "Team Coderithum SIH (Kunal, Sarah, Alex)",
    award: "Smart India Hackathon Gold Trophy",
    iconType: "trophy"
  },
  {
    id: "ach-2",
    title: "IEEE Research Paper Published",
    description: "A research paper on 'Lightweight Network Attack Classification using Quantized Models' authored by club technical members was published in IEEE Access journal.",
    date: "March 2026",
    recipient: "Michael Chang & Alex Rivera",
    award: "IEEE Access Publication Credit",
    iconType: "star"
  },
  {
    id: "ach-3",
    title: "Top 3 at Inter-College Robotics Challenge",
    description: "Designed a search-and-rescue autonomous bot that scored the fastest navigation and rescue points in the annual tech fest grid challenge.",
    date: "May 2026",
    recipient: "Robotics sub-division (T1)",
    award: "Robotics Fest Silver Shield",
    iconType: "star"
  }
];

function InteractivePixelArt() {
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

    // Dripping ice cube droplets
    let droplets: { c: number; r: number; speedY: number; alpha: number }[] = [];

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
      M: ["10001", "11011", "10101", "10001", "10001"]
    };

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
    const GLACIER_WHITE = "#FFFFFF";
    const PALE_ICE = "#F0F9FF";
    const ICE_BLUE = "#E0F2FE";
    const SKY_BLUE = "#7DD3FC";
    const CYAN = "#06B6D4";
    const CRYSTAL_BLUE = "#2563EB";
    const DEEP_NAVY = "#0F172A";
    const SLATE_BLUE = "#475569";

    const getBackgroundPixelColor = (c: number, r: number, time: number) => {
      const pct = c / cols;
      const noise = Math.sin(c * 0.2 + r * 0.1 + time * 0.003);

      if (pct < 0.3) {
        if (noise > 0.6) return GLACIER_WHITE;
        if (noise > 0.1) return DEEP_NAVY;
        if (noise > -0.4) return CRYSTAL_BLUE;
        return SLATE_BLUE;
      } else if (pct < 0.7) {
        if (noise > 0.5) return GLACIER_WHITE;
        if (noise > 0.0) return PALE_ICE;
        if (noise > -0.4) return ICE_BLUE;
        return CYAN;
      } else {
        if (noise > 0.5) return GLACIER_WHITE;
        if (noise > 0.0) return SKY_BLUE;
        if (noise > -0.4) return ICE_BLUE;
        return CYAN;
      }
    };

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

      // Set of coordinates occupied by the rocket
      const getRocketPixelColor = (dc: number, dr: number) => {
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

      const circleCells = new Set<string>();
      for (let dc = -2; dc <= 2; dc++) {
        for (let dr = -3; dr <= 4; dr++) {
          if (getRocketPixelColor(dc, dr) !== null) {
            const cc = Math.floor(circleC + dc);
            const cr = Math.floor(circleR + dr);
            circleCells.add(`${cc},${cr}`);
          }
        }
      }

      // Draw pixelated city skyline silhouette with twinkling windows & blinking warning lights
      const getBuildingHeight = (col: number) => {
        const blockId = Math.floor(col / 6);
        const phase = blockId % 5;
        let h = 5;
        if (phase === 0) h = 10;
        else if (phase === 1) h = 6;
        else if (phase === 2) h = 14;
        else if (phase === 3) h = 8;
        else if (phase === 4) h = 12;

        const isCenter = (col % 6) === 2;
        if (isCenter && (blockId % 2 === 0)) return h + 3;

        const isGap = (col % 6) === 5;
        if (isGap) return 0;

        return h;
      };

      for (let c = 0; c < cols; c++) {
        const buildingH = getBuildingHeight(c);
        if (buildingH <= 0) continue;

        const startRow = Math.floor(rows - buildingH);
        for (let r = Math.max(0, startRow); r < rows; r++) {
          if (circleCells.has(`${c},${r}`)) continue;

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
        logoStartR = Math.max(10, Math.floor(rows * 0.45));
        textStartC = logoStartC + logoWidth + 2;
        textStartR = logoStartR;
      } else {
        logoStartC = Math.max(2, Math.floor((cols - logoWidth) / 2));
        logoStartR = Math.max(6, Math.floor(rows * 0.35));
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

      // Draw "CODERITHUM" word
      const word = "CODERITHUM";
      let currentOffsetC = 0;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
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

function GlobalRocketCursor() {
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

      // 1. Easing rocket position towards mouse coordinates
      if (mouseX !== -1000 && mouseY !== -1000) {
        const prevX = rocketX;
        const prevY = rocketY;

        rocketX += (mouseX - rocketX) * 0.15;
        rocketY += (mouseY - rocketY) * 0.15;

        const moveDist = Math.sqrt(Math.pow(rocketX - prevX, 2) + Math.pow(rocketY - prevY, 2));
        if (moveDist > 1) {
          if (smoke.length === 0 || Math.sqrt(Math.pow(rocketX - smoke[smoke.length - 1].x, 2) + Math.pow(rocketY - smoke[smoke.length - 1].y, 2)) > 15) {
            smoke.push({ x: rocketX, y: rocketY, alpha: 1.0 });
          }
        }
      }

      // 2. Update and draw smoke trail
      smoke.forEach(s => {
        s.alpha -= 0.015;
      });
      smoke = smoke.filter(s => s.alpha > 0);

      const pixelSize = 4; // Render size of rocket pixels

      smoke.forEach(s => {
        ctx.fillStyle = `rgba(148, 163, 184, ${s.alpha * 0.4})`;
        ctx.fillRect(s.x - 4, s.y + 12, 8, 8);
      });

      // 3. Update and draw rocket engine sparks
      if (Math.random() < 0.45 && mouseX !== -1000) {
        sparks.push({
          x: rocketX + (Math.random() * 8 - 4),
          y: rocketY + 16,
          speedX: Math.random() * 1.5 - 0.75,
          speedY: 1.5 + Math.random() * 2,
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
      for (let dc = -2; dc <= 2; dc++) {
        for (let dr = -3; dr <= 4; dr++) {
          const color = getRocketPixelColor(dc, dr, time);
          if (color !== null) {
            ctx.fillStyle = color;
            ctx.fillRect(rocketX + dc * pixelSize, rocketY + dr * pixelSize, pixelSize, pixelSize);
          }
        }
      }

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

export default function Home() {
  // Navigation State
  const [view, setView] = useState<string>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>("hackathons-album");

  // State Data (Read-only since CMS/Admin was removed)
  const events = initialEvents;
  const projects = initialProjects;
  const albums = initialAlbums;
  const team = initialTeam;
  const achievements = initialAchievements;

  // Tree helper rendering functions
  const renderNode = (title: string, memberKey?: string, delay: number = 0) => {
    const member = memberKey ? team.find(t => {
      if (memberKey === "faculty") return t.category === "Faculty";
      if (memberKey === "president") return t.role.includes("President") && !t.role.includes("Vice");
      if (memberKey === "vp") return t.role.includes("Vice President");
      if (memberKey === "tech_dir") return t.role.includes("Technical Team Lead") || t.role.includes("Technical Director");
      if (memberKey === "incubator_lead") return t.role.includes("Cybersecurity Head") || t.role.includes("Incubator & Ops");
      if (memberKey === "brand_lead") return t.role.includes("Marketing & Outreach");
      if (memberKey === "outreach_lead") return t.role.includes("Graphics & UI") || t.role.includes("Outreach Lead");
      return false;
    }) : null;

    const variants = {
      hidden: { opacity: 0, y: 15, scale: 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay, type: "spring" as const, stiffness: 120, damping: 14 }
      }
    };

    if (member) {
      return (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          whileHover={{ 
            y: -5, 
            x: -2,
            scale: 1.02,
            transition: { duration: 0.15 } 
          }}
          className="w-full max-w-[280px] mx-auto p-4 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] flex flex-col items-center text-center space-y-3 transition-shadow select-none z-10"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-900 bg-slate-100 shrink-0 shadow">
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">{title}</div>
            <h4 className="text-sm font-black text-slate-900 mt-1">{member.name}</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">{member.role}</p>
          </div>
          <div className="flex items-center gap-2">
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors p-1">
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors p-1">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.01 }}
        className="w-full max-w-[280px] mx-auto p-4 bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center text-center justify-center h-24"
      >
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">{title}</div>
        <div className="text-[10px] text-slate-400 font-mono mt-1">Vacant / Cohort Core</div>
      </motion.div>
    );
  };

  const renderArrow = (delay: number = 0) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="flex justify-center my-2"
    >
      <svg className="w-4 h-6 text-slate-900 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.div>
  );

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view, selectedId]);

  // Selected Detail Object Resolvers
  const currentEvent = events.find(e => e.id === selectedId);
  const currentProject = projects.find(p => p.id === selectedId);
  const currentAlbum = albums.find(a => a.id === activeAlbumId);

  // Statistics Calculated Dynamically
  const totalEventsCount = events.length;
  const totalProjectsCount = projects.length;
  const totalMembersCount = team.length;
  const totalAwardsCount = achievements.length;

  return (
    <div className="min-h-screen bg-transparent text-slate-900 font-sans antialiased selection:bg-blue-200 selection:text-blue-900">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[800px] left-[10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[400px] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ======================================================================
          Navigation Header
          ====================================================================== */}
      <header className="sticky top-4 z-50 px-4 md:px-6 w-full max-w-7xl mx-auto pointer-events-none">
        <div className="w-full backdrop-blur-md bg-white/85 border-2 border-slate-900/80 px-6 h-14 rounded-full flex items-center justify-between shadow-lg pointer-events-auto">
          <button onClick={() => { setView("home"); setSelectedId(null); }} className="flex items-center gap-2.5 group cursor-pointer">
            <img src={logo.src} alt="Coderithum Logo" className="w-7 h-7 object-contain transition-transform group-hover:scale-105" />
            <span className="font-bold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
              Coderithum
              <span className="px-2 py-0.5 text-[10px] font-mono font-normal rounded-full bg-blue-50 border border-blue-200 text-blue-600">Tech Club</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 uppercase">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "events", label: "Events" },
              { id: "projects", label: "Projects" },
              { id: "gallery", label: "Gallery" },
              { id: "team", label: "Team" },
              { id: "achievements", label: "Achievements" },
              { id: "contact", label: "Contact" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setView(tab.id); setSelectedId(null); }}
                className={`hover:text-black transition-colors cursor-pointer relative py-1 ${
                  view === tab.id || (tab.id === "events" && view === "event-detail") || (tab.id === "projects" && view === "project-detail")
                    ? "text-black"
                    : ""
                }`}
              >
                {tab.label}
                {(view === tab.id || (tab.id === "events" && view === "event-detail") || (tab.id === "projects" && view === "project-detail")) && (
                  <motion.span layoutId="activeHeaderTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-600 hover:text-black transition-colors">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 bg-white/95 backdrop-blur-md border-2 border-slate-900 z-40 p-6 flex flex-col gap-4 shadow-2xl md:hidden uppercase font-bold rounded-2xl"
          >
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "events", label: "Events" },
              { id: "projects", label: "Projects" },
              { id: "gallery", label: "Gallery" },
              { id: "team", label: "Team" },
              { id: "achievements", label: "Achievements" },
              { id: "contact", label: "Contact" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setView(tab.id); setSelectedId(null); setMobileMenuOpen(false); }}
                className={`text-left text-base py-2 transition-colors ${
                  view === tab.id ? "text-blue-600" : "text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
          Main Body Content Views
          ====================================================================== */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 min-h-[75vh]">
        <AnimatePresence mode="wait">
          
          {/* ==================== HOME VIEW ==================== */}
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-24"
            >
              {/* Hero Section - Full Bleed Ice Theme Banner */}
              <div className="w-screen h-[50vh] relative left-1/2 right-1/2 -translate-x-1/2 bg-white border-b-2 border-slate-900 -mt-[120px] mb-16 overflow-hidden flex justify-center items-center cursor-none">
                {/* Background Canvas */}
                <div className="absolute inset-0 w-full h-full z-0 opacity-90 pointer-events-none">
                  <InteractivePixelArt />
                </div>
              </div>

              {/* Latest Announcement Banner */}
              <div className="p-6 rounded-none bg-blue-50 border-2 border-blue-600/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[4px_4px_0px_#000]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-600">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Announcement</h3>
                    <p className="text-sm text-slate-600 mt-1">Registrations are now open for DevHack 2026: National Hackathon! Secure your team spot today.</p>
                  </div>
                </div>
                <button
                  onClick={() => { setView("event-detail"); setSelectedId("devhack-2026"); }}
                  className="px-5 py-2.5 rounded-none bg-blue-600 border-2 border-blue-700 text-white font-medium text-xs whitespace-nowrap shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                >
                  Register Now
                </button>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white border-2 border-slate-900 p-8 rounded-none shadow-[6px_6px_0px_#000] backdrop-blur-sm">
                {[
                  { value: `${totalEventsCount}+`, label: "Workshops & Hackathons" },
                  { value: `${totalProjectsCount}+`, label: "Active Tech Projects" },
                  { value: `${totalMembersCount}+`, label: "Dedicated Members" },
                  { value: `${totalAwardsCount}+`, label: "National Achievements" }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4">
                    <div className="text-4xl sm:text-5xl font-black text-slate-900">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-600 mt-2 font-mono uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Featured Event Spotlight */}
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
                  <div>
                    <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Spotlight Event</h2>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">Next Major Tech Workshop</h3>
                  </div>
                  <button onClick={() => setView("events")} className="text-xs text-blue-600 hover:text-black font-semibold flex items-center gap-1 cursor-pointer">
                    <span>View All Events</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {events.filter(e => e.type === "upcoming").slice(0, 1).map(event => (
                  <div key={event.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border-2 border-slate-900 rounded-none overflow-hidden group hover:border-slate-900 transition-all shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000]">
                    <div className="lg:col-span-6 relative h-[250px] lg:h-auto overflow-hidden group/glitch">
                      {/* Base Image */}
                      <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent lg:hidden" />
                      
                      {/* Red Glitch Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                        <img 
                          src={event.banner} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover animate-glitch-1 scale-105"
                          style={{ filter: 'hue-rotate(90deg) saturate(2.5)' }}
                        />
                      </div>

                      {/* Blue Glitch Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                        <img 
                          src={event.banner} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover animate-glitch-2 scale-105"
                          style={{ filter: 'hue-rotate(220deg) saturate(2.5)' }}
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-none text-[10px] font-semibold bg-emerald-50 border-2 border-emerald-200 text-emerald-700 uppercase tracking-wider">Upcoming</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{event.shortDesc}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 justify-between border-t-2 border-slate-200 pt-6">
                        <div className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-600" />{event.venue}</div>
                        <button
                          onClick={() => { setView("event-detail"); setSelectedId(event.id); }}
                          className="px-4 py-2 bg-blue-50 border-2 border-blue-600 rounded-none text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Projects */}
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
                  <div>
                    <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Innovation Hub</h2>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">Featured Club Projects</h3>
                  </div>
                  <button onClick={() => setView("projects")} className="text-xs text-blue-600 hover:text-black font-semibold flex items-center gap-1 cursor-pointer">
                    <span>View All Projects</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.slice(0, 2).map(project => (
                    <div key={project.id} className="p-6 rounded-none bg-white border-2 border-slate-900 hover:border-slate-900 transition-all flex flex-col justify-between space-y-6 shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] group">
                      <div className="space-y-4">
                        <div className="w-full h-[180px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
                          <img src={project.banner} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105" />
                          {/* Red Glitch Overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                            <img 
                              src={project.banner} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover animate-glitch-1 scale-105"
                              style={{ filter: 'hue-rotate(90deg) saturate(2.5)' }}
                            />
                          </div>

                          {/* Blue Glitch Overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                            <img 
                              src={project.banner} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover animate-glitch-2 scale-105"
                              style={{ filter: 'hue-rotate(220deg) saturate(2.5)' }}
                            />
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{project.shortDesc}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-none bg-slate-50 text-[10px] text-slate-700 font-mono border-2 border-slate-200">{tech}</span>
                          ))}
                        </div>
                        <button
                          onClick={() => { setView("project-detail"); setSelectedId(project.id); }}
                          className="w-full py-2 bg-blue-50 border-2 border-blue-600 rounded-none text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer"
                        >
                          View Project Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Preview */}
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
                  <div>
                    <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Hall of Fame</h2>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">Latest Achievements</h3>
                  </div>
                  <button onClick={() => setView("achievements")} className="text-xs text-blue-600 hover:text-black font-semibold flex items-center gap-1 cursor-pointer">
                    <span>View All Achievements</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.slice(0, 3).map(ach => (
                    <div key={ach.id} className="p-6 rounded-none bg-white border-2 border-slate-900 flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all">
                      <div className="space-y-3">
                        <div className="w-8 h-8 rounded-none bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{ach.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{ach.description}</p>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{ach.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sponsors Section */}
              <div className="border-t-2 border-slate-200 pt-16 text-center space-y-6">
                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">Proudly Supported By</div>
                <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 hover:opacity-80 transition-opacity">
                  {["GitHub", "Vercel", "AWS", "Google Cloud", "Meta", "Slack"].map((brand, idx) => (
                    <div key={idx} className="text-lg sm:text-xl font-bold text-slate-900 font-mono tracking-tighter">{brand}</div>
                  ))}
                </div>
              </div>

              {/* Call To Action */}
              <div className="p-12 rounded-none bg-white border-2 border-slate-900 text-center space-y-6 max-w-4xl mx-auto shadow-[8px_8px_0px_#000] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.04),transparent_50%)]" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Join the Community</h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Collaborate on open-source codebases, participate in coding sprints, and build projects with top student engineers.
                </p>
                <button
                  onClick={() => setView("contact")}
                  className="px-6 py-3 rounded-none bg-blue-600 border-2 border-blue-700 text-white text-sm font-bold shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                >
                  Get In Touch
                </button>
              </div>

            </motion.div>
          )}

          {/* ==================== ABOUT VIEW ==================== */}
          {view === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16 max-w-4xl mx-auto"
            >
              <div className="space-y-4">
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Who We Are</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">About Coderithum</h1>
                <p className="text-base text-slate-400 leading-relaxed pt-2">
                  Coderithum is the premier, innovation-focused student tech club. Founded with the mission to bridge academia with actual industry development pipelines, we train, guide, and empower students to build real software grids, coordinate national events, and design high-impact projects.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-none bg-[#1E293B]/20 border-2 border-slate-800 space-y-3 shadow-[4px_4px_0px_#0F172A]">
                  <h3 className="text-lg font-bold text-white">Our Vision</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    To cultivate a self-sustaining ecosystem of developers and researchers who innovate continuously, contributing to open source, enterprise engineering, and cutting-edge publications.
                  </p>
                </div>
                <div className="p-6 rounded-none bg-[#1E293B]/20 border-2 border-slate-800 space-y-3 shadow-[4px_4px_0px_#0F172A]">
                  <h3 className="text-lg font-bold text-white">Our Mission</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    We host weekly code reviews, cloud deployments, and hack sprints. We enable future committees to inherit a strong technical base and build projects directly deployed on modern cloud backends.
                  </p>
                </div>
              </div>

              {/* Faculty Section */}
              <div className="space-y-6">
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Faculty Advisors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {team.filter(t => t.category === "Faculty").map((fac, idx) => (
                    <div key={idx} className="p-6 rounded-none bg-[#1E293B]/10 border-2 border-slate-800 flex items-center gap-4 shadow-[4px_4px_0px_#0F172A]">
                      <img src={fac.avatar} alt={fac.name} className="w-16 h-16 rounded-none object-cover border-2 border-slate-800" />
                      <div>
                        <h4 className="text-base font-bold text-white">{fac.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{fac.role}</p>
                        <a href={fac.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 mt-2 font-medium">
                          <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="space-y-8">
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Our Journey Timeline</h2>
                <div className="relative border-l-2 border-slate-800 pl-6 ml-4 space-y-8">
                  {[
                    { year: "2024", title: "Club Conception", desc: "Club founded by a small group of open-source enthusiasts, hosting local compiler building sessions." },
                    { year: "2025", title: "Smart India Hackathon Triumph", desc: "Our developer cohort secured first place at Smart India Hackathon in smart grid management." },
                    { year: "2026", title: "Coderithum Portal Release", desc: "Designed, built, and static-deployed the new visual portfolio portal and resource ecosystem." }
                  ].map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-none bg-blue-600 border-2 border-[#0F172A]" />
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{item.year}</div>
                      <h4 className="text-base font-bold text-white mt-1">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== EVENTS VIEW ==================== */}
          {view === "events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Interactive Timeline</h2>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Workshops & Hackathons</h1>
                <p className="text-xs sm:text-sm text-slate-400">Join our upcoming masterclasses or inspect past workshop agendas and resources.</p>
              </div>

              {/* Upcoming Events Grid */}
              <div className="space-y-8">
                <h3 className="text-base font-mono text-white tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
                  Upcoming Innovation Sprints
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {events.filter(e => e.type === "upcoming").map(event => (
                    <div key={event.id} className="p-6 rounded-none bg-[#1E293B]/20 border-2 border-slate-800 hover:border-blue-500 transition-all flex flex-col justify-between space-y-6 shadow-[6px_6px_0px_#0F172A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#0F172A] group">
                      <div className="space-y-4">
                        <div className="w-full h-[180px] rounded-none border-2 border-slate-800 overflow-hidden relative">
                          <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</div>
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{event.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">{event.shortDesc}</p>
                      </div>
                      <div className="flex items-center justify-between border-t-2 border-slate-800 pt-4">
                        <div className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" />{event.venue}</div>
                        <button
                          onClick={() => { setView("event-detail"); setSelectedId(event.id); }}
                          className="px-4 py-2 bg-blue-600 border-2 border-blue-700 hover:bg-blue-500 text-white rounded-none text-xs font-semibold shadow-[3px_3px_0px_#050B14] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#050B14] transition-all cursor-pointer"
                        >
                          Details & Reg
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Past Events Grid */}
              <div className="space-y-8">
                <h3 className="text-base font-mono text-slate-900 tracking-wider uppercase">Past Training Camps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {events.filter(e => e.type === "past").map(event => (
                    <div key={event.id} className="p-6 rounded-none bg-white border-2 border-slate-900 flex flex-col justify-between space-y-6 opacity-95 hover:opacity-100 transition-all shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] group">
                      <div className="space-y-4">
                        <div className="w-full h-[180px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
                          <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105 filter grayscale group-hover/glitch:grayscale-0" />
                          
                          {/* Red Glitch Overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                            <img 
                              src={event.banner} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover animate-glitch-1 scale-105"
                              style={{ filter: 'hue-rotate(90deg) saturate(2.5)' }}
                            />
                          </div>

                          {/* Blue Glitch Overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                            <img 
                              src={event.banner} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover animate-glitch-2 scale-105"
                              style={{ filter: 'hue-rotate(220deg) saturate(2.5)' }}
                            />
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{event.shortDesc}</p>
                      </div>
                      <div className="flex items-center justify-between border-t-2 border-slate-200 pt-4">
                        <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.venue}</div>
                        <button
                          onClick={() => { setView("event-detail"); setSelectedId(event.id); }}
                          className="px-4 py-2 bg-blue-50 border-2 border-blue-600 rounded-none text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                        >
                          View Agenda
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== EVENT DETAIL VIEW ==================== */}
          {view === "event-detail" && currentEvent && (
            <motion.div
              key="event-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12 max-w-4xl mx-auto"
            >
              <button onClick={() => setView("events")} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-black transition-colors cursor-pointer">
                <ChevronLeft className="w-4 h-4" /> Back to Events
              </button>

              <div className="w-full h-[320px] rounded-none overflow-hidden relative border-2 border-slate-900 shadow-[6px_6px_0px_#000]">
                <img src={currentEvent.banner} alt={currentEvent.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{currentEvent.title}</h1>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{currentEvent.description}</p>
                  </div>

                  {/* Agenda */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Event Agenda</h3>
                    <div className="space-y-3 border-l-2 border-slate-200 pl-4 ml-2">
                      {currentEvent.agenda.map((agendaItem, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 rounded-none bg-blue-600" />
                          <p className="text-xs sm:text-sm text-slate-600 font-mono">{agendaItem}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Speakers */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Event Speakers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentEvent.speakers.map((spk, idx) => (
                        <div key={idx} className="p-4 rounded-none bg-white border-2 border-slate-900 flex items-center gap-3 shadow-[4px_4px_0px_#000]">
                          <img src={spk.avatar} alt={spk.name} className="w-12 h-12 rounded-none object-cover border-2 border-slate-900" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{spk.name}</div>
                            <div className="text-xs text-slate-600 mt-0.5">{spk.role}</div>
                            <div className="text-[10px] text-blue-600 font-mono mt-0.5">{spk.company}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar details */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-slate-900 border-b-2 border-slate-200 pb-3">Logistics</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Date</div>
                          <div className="text-xs text-slate-600 mt-0.5">{currentEvent.date}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Time</div>
                          <div className="text-xs text-slate-600 mt-0.5">{currentEvent.time}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Venue</div>
                          <div className="text-xs text-slate-600 mt-0.5">{currentEvent.venue}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-slate-200 space-y-3">
                      {currentEvent.type === "upcoming" ? (
                        <a
                          href={currentEvent.regLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 bg-blue-600 hover:bg-black text-white rounded-none border-2 border-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all"
                        >
                          Register for Event <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="w-full py-2.5 bg-slate-50 text-slate-400 rounded-none text-xs font-bold flex items-center justify-center select-none border-2 border-slate-200">
                          Registration Closed
                        </span>
                      )}
                      
                      <a
                        href={currentEvent.feedbackLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-white border-2 border-slate-900 hover:bg-slate-50 text-slate-700 rounded-none text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all"
                      >
                        Share Feedback
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PROJECTS VIEW ==================== */}
          {view === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Innovation Hub</h2>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Technical Projects</h1>
                <p className="text-xs sm:text-sm text-slate-600">Discover open-source packages, network grids, and AI agents fully built by club members.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map(project => (
                  <div key={project.id} className="p-6 rounded-none bg-white border-2 border-slate-900 transition-all flex flex-col justify-between space-y-6 shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] group relative">
                    <div className="space-y-4">
                      <div className="w-full h-[200px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
                        {/* Base Image */}
                        <img src={project.banner} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105" />
                        
                        {/* Red Glitch Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                          <img 
                            src={project.banner} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover animate-glitch-1 scale-105"
                            style={{ filter: 'hue-rotate(90deg) saturate(2.5)' }}
                          />
                        </div>

                        {/* Blue Glitch Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                          <img 
                            src={project.banner} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover animate-glitch-2 scale-105"
                            style={{ filter: 'hue-rotate(220deg) saturate(2.5)' }}
                          />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{project.shortDesc}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-none bg-slate-50 text-[10px] text-slate-700 font-mono border-2 border-slate-200">{tech}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => { setView("project-detail"); setSelectedId(project.id); }}
                        className="w-full py-2.5 bg-blue-50 border-2 border-blue-600 rounded-none text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer"
                      >
                        View Project Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ==================== PROJECT DETAIL VIEW ==================== */}
          {view === "project-detail" && currentProject && (
            <motion.div
              key="project-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12 max-w-4xl mx-auto"
            >
              <button onClick={() => setView("projects")} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-black transition-colors cursor-pointer">
                <ChevronLeft className="w-4 h-4" /> Back to Projects
              </button>

              <div className="w-full h-[320px] rounded-none overflow-hidden relative border-2 border-slate-900 shadow-[6px_6px_0px_#000]">
                <img src={currentProject.banner} alt={currentProject.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{currentProject.title}</h1>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{currentProject.description}</p>
                  </div>

                  {/* Tech Stack details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.techStack.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-none bg-slate-50 text-xs text-slate-700 font-mono border-2 border-slate-200">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Team */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Project Members</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.team.map((member, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-none bg-slate-50 text-xs font-semibold text-slate-700 border-2 border-slate-200 flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar details */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-slate-900 border-b-2 border-slate-200 pb-3">Project Metadata</h3>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-slate-900">Mentor</div>
                        <div className="text-xs text-slate-600 mt-1">{currentProject.mentor}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-slate-200 space-y-3">
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-none border-2 border-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all"
                      >
                        <Github className="w-4 h-4" /> Github Repository
                      </a>
                      <a
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all"
                      >
                        Live Demonstration <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== GALLERY VIEW ==================== */}
          {view === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Visual History</h2>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Club Gallery</h1>
                <p className="text-xs sm:text-sm text-slate-600">Sneak peek into our hack sprints, annual bootcamps, and workshop grids.</p>
              </div>

              {/* Album Selectors */}
              <div className="flex justify-center flex-wrap gap-3">
                {albums.map(album => (
                  <button
                    key={album.id}
                    onClick={() => setActiveAlbumId(album.id)}
                    className={`px-4 py-2 rounded-none text-xs font-bold border-2 transition-all cursor-pointer shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] ${
                      activeAlbumId === album.id
                        ? "bg-blue-50 border-blue-600 text-blue-600"
                        : "bg-white border-slate-900 text-slate-700 hover:text-black"
                    }`}
                  >
                    {album.name}
                  </button>
                ))}
              </div>

              {/* Active Album Media Grid */}
              {currentAlbum ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                  {currentAlbum.media.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-none bg-white border-2 border-slate-900 flex flex-col gap-4 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all group">
                      <div className="w-full h-[220px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
                        {/* Base Image */}
                        <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105" />
                        
                        {/* Red Glitch Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                          <img 
                            src={item.url} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover animate-glitch-1 scale-105"
                            style={{ filter: 'hue-rotate(90deg) saturate(2.5)' }}
                          />
                        </div>

                        {/* Blue Glitch Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                          <img 
                            src={item.url} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover animate-glitch-2 scale-105"
                            style={{ filter: 'hue-rotate(220deg) saturate(2.5)' }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed px-1 font-mono">{item.caption}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500 py-12">No media albums found.</div>
              )}
            </motion.div>
          )}

          {/* ==================== TEAM VIEW ==================== */}
          {view === "team" && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Ecosystem Core</h2>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Organizational Structure</h1>
                <p className="text-xs sm:text-sm text-slate-600">Explore Coderithum's board hierarchy, branching from faculty guidance to developers.</p>
              </div>

              {/* Dynamic Organizational Tree */}
              <div className="w-full max-w-5xl mx-auto p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] space-y-8 overflow-x-auto">
                <div className="min-w-[760px] flex flex-col items-center py-4">
                  
                  {/* Level 1: Faculty Mentor */}
                  {renderNode("Faculty Mentor", "faculty", 0.1)}
                  {renderArrow(0.25)}

                  {/* Level 2: President */}
                  {renderNode("President", "president", 0.4)}
                  {renderArrow(0.55)}

                  {/* Level 3: Vice President */}
                  {renderNode("Vice President", "vp", 0.7)}

                  {/* VP to Column Connection Line */}
                  <div className="flex flex-col items-center w-full mt-2">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.85, duration: 0.2 }} className="origin-top w-[3px] h-6 bg-slate-900" />
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.05, duration: 0.3 }} className="origin-center w-[66%] h-[3px] bg-slate-900" />
                    <div className="flex justify-between w-[66%] h-6">
                      <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
                      <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
                      <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
                    </div>
                  </div>

                  {/* Columns Grid */}
                  <div className="grid grid-cols-3 gap-6 w-full mt-2">
                    
                    {/* Column 1: Technical Division */}
                    <div className="flex flex-col">
                      {renderNode("Technical Director", "tech_dir", 1.55)}
                      {renderArrow(1.7)}
                      {renderNode("Domain Leads (AI, Web, Cloud...)", undefined, 1.85)}
                      {renderArrow(2.0)}
                      {renderNode("Project Managers / Tech Leads", undefined, 2.15)}
                      {renderArrow(2.3)}
                      {renderNode("Senior Developers", undefined, 2.45)}
                      {renderArrow(2.6)}
                      {renderNode("Junior Developers", undefined, 2.75)}
                    </div>

                    {/* Column 2: Incubator & Ops Division */}
                    <div className="flex flex-col">
                      {renderNode("Incubator & Ops Lead", "incubator_lead", 1.55)}
                      {renderArrow(1.7)}
                      {renderNode("Functional Leads (Research, Startup)", undefined, 1.85)}
                      {renderArrow(2.0)}
                      {renderNode("Incubator Teams / Research Fellows", undefined, 2.15)}
                    </div>

                    {/* Column 3: Community & Brand Division */}
                    <div className="flex flex-col">
                      {renderNode("Community & Brand Lead", "brand_lead", 1.55)}
                      {renderArrow(1.7)}
                      {renderNode("Outreach Leads (Design, Event...)", "outreach_lead", 1.85)}
                      {renderArrow(2.0)}
                      {renderNode("Operations Core (Media, HR, Fin)", undefined, 2.15)}
                    </div>

                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== ACHIEVEMENTS VIEW ==================== */}
          {view === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Achievements</h2>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Hall of Achievements</h1>
                <p className="text-xs sm:text-sm text-slate-600">Discover awards, SIH trophies, robotics shields, and publications bagged by the club.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {achievements.map(ach => (
                  <div key={ach.id} className="p-6 rounded-none bg-white border-2 border-slate-900 flex items-start gap-4 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all">
                    <div className="w-10 h-10 rounded-none bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 justify-between">
                        <h4 className="text-base font-bold text-slate-900">{ach.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0">{ach.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{ach.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-blue-600" />{ach.recipient}</span>
                        <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-blue-600" />{ach.award}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ==================== CONTACT VIEW ==================== */}
          {view === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Get In Touch</h2>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Contact Coderithum</h1>
                <p className="text-xs sm:text-sm text-slate-600">Have questions about upcoming sprints? Drop us a query or visit the campus block.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
                {/* Left Panel Contact Details */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
                    <h3 className="text-base font-bold text-slate-900 border-b-2 border-slate-200 pb-3">Club Info</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Email Address</div>
                          <a href="mailto:coderithum.tech@gmail.com" className="text-xs text-slate-600 hover:text-black transition-colors">coderithum.tech@gmail.com</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Office Location</div>
                          <div className="text-xs text-slate-600 leading-relaxed mt-0.5">Tech Lab 402, Computer Science Block, Main University Campus</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Technical Support</div>
                          <div className="text-xs text-slate-600 mt-0.5">+91 98765 43210</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Styled Mock map */}
                  <div className="w-full h-[220px] rounded-none border-2 border-slate-900 overflow-hidden relative group shadow-[6px_6px_0px_#000]">
                    <div className="absolute inset-0 bg-white bg-grid-pattern opacity-80 flex items-center justify-center">
                      <div className="text-center space-y-2 z-10">
                        <MapPin className="w-8 h-8 text-blue-600 animate-bounce mx-auto" />
                        <div className="text-xs font-mono text-slate-900">CS Block Tech Lab (Campus Map Grid)</div>
                        <div className="text-[10px] text-slate-500">12.9716° N, 77.5946° E</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right Panel Contact Form */}
                <div className="lg:col-span-7">
                  <div className="p-8 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
                    <h3 className="text-lg font-bold text-slate-900">Send us a direct message</h3>
                    
                    {contactSuccess ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-6 rounded-none bg-emerald-50 border-2 border-emerald-200 text-center space-y-4"
                      >
                        <div className="w-10 h-10 rounded-none bg-emerald-100 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Message Dispatched!</h4>
                        <p className="text-xs text-slate-600">Thank you for writing. Our Technical Board will review your query and write back shortly.</p>
                        <button
                          onClick={() => setContactSuccess(false)}
                          className="px-4 py-2 bg-emerald-600 border-2 border-emerald-700 hover:bg-emerald-500 text-white rounded-none text-xs font-semibold shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-600 uppercase">First Name</label>
                            <input required type="text" placeholder="Kunal" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-600 uppercase">Email Address</label>
                            <input required type="email" placeholder="kunal@example.com" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-600 uppercase">Topic / Subject</label>
                          <input required type="text" placeholder="DevHack 2026 Participation Query" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-600 uppercase">Message Body</label>
                          <textarea required rows={4} placeholder="Hi Coderithum technical team, I wanted to inquire if students from second year..." className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-blue-600 border-2 border-blue-700 hover:bg-blue-500 text-white rounded-none text-xs font-bold shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                        >
                          Submit Inquiry
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== 404 TEST PAGE VIEW ==================== */}
          {view === "404-test" && (
            <motion.div
              key="404"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 max-w-md mx-auto space-y-6"
            >
              <div className="text-8xl font-black text-slate-800 tracking-tighter">404</div>
              <h2 className="text-xl font-bold text-white">Compilation Address Missing</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The path index pointer has returned null. Verify that the requested folder structure exists in the static repository.
              </p>
              <button
                onClick={() => setView("home")}
                className="px-6 py-2.5 bg-blue-600 border-2 border-blue-700 hover:bg-blue-500 text-white rounded-none text-xs font-bold shadow-[3px_3px_0px_#050B14] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#050B14] transition-all cursor-pointer"
              >
                Return to Index Grid
              </button>
            </motion.div>
          )}

          {/* ==================== 500 TEST PAGE VIEW ==================== */}
          {view === "500-test" && (
            <motion.div
              key="500"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 max-w-md mx-auto space-y-6"
            >
              <div className="text-8xl font-black text-rose-950/40 tracking-tighter">500</div>
              <h2 className="text-xl font-bold text-white">Segment Fault / Stack Leak</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                A mock runtime stack overflow anomaly has occurred. Serverless deployment grids remain unaffected.
              </p>
              <button
                onClick={() => setView("home")}
                className="px-6 py-2.5 bg-slate-800 border-2 border-slate-700 hover:bg-slate-700 text-white rounded-none text-xs font-bold shadow-[3px_3px_0px_#050B14] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#050B14] transition-all cursor-pointer"
              >
                Re-initialize State
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ======================================================================
          General Footer
          ====================================================================== */}
      <footer className="border-t-2 border-slate-900 py-16 px-6 bg-white text-xs text-slate-600 relative z-10 font-mono">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <img src={logo.src} alt="Coderithum Logo" className="w-5 h-5 object-contain" />
                <span className="font-bold text-slate-900 text-sm">Coderithum Tech Club</span>
              </div>
              <p className="max-w-xs leading-relaxed text-slate-600">
                Official student computing division showcasing innovation, annual events, and collaborative codebases.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-slate-900 text-sm font-bold">Quick Navigation</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => { setView("home"); setSelectedId(null); }} className="text-left hover:text-black transition-colors cursor-pointer">Index Grid</button>
                <button onClick={() => { setView("about"); setSelectedId(null); }} className="text-left hover:text-black transition-colors cursor-pointer">Our Journey</button>
                <button onClick={() => { setView("events"); setSelectedId(null); }} className="text-left hover:text-black transition-colors cursor-pointer">Events Board</button>
                <button onClick={() => { setView("projects"); setSelectedId(null); }} className="text-left hover:text-black transition-colors cursor-pointer">Tech Projects</button>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-slate-900 text-sm font-bold">Developer Utilities</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => setView("404-test")} className="text-left hover:text-black transition-colors cursor-pointer">View Mock 404 View</button>
                <button onClick={() => setView("500-test")} className="text-left hover:text-black transition-colors cursor-pointer">View Mock 500 View</button>
                <a href="https://github.com/KunalPatilCode/coderithum" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" /> Code Repository
                </a>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Coderithum. All rights reserved. Open source under MIT license.</p>
            <div className="flex items-center gap-4 text-slate-500">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="https://github.com/KunalPatilCode/coderithum" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Github className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </footer>
      <GlobalRocketCursor />
    </div>
  );
}
