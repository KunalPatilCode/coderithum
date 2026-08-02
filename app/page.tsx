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

function ThreeLogoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // 2. Isometric Camera Setup
    const aspect = width / height;
    const d = 10;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Master Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // 4. Materials Setup
    const baseTopMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      emissive: 0xffffff,
      emissiveIntensity: 0.15
    });

    const baseSideMaterial = new THREE.MeshPhongMaterial({
      color: 0x0055b8,
      flatShading: true
    });

    const hashtagMaterial = new THREE.MeshPhongMaterial({
      color: 0x0055b8,
      flatShading: true,
    });

    const borderMaterial = new THREE.MeshPhongMaterial({
      color: 0x0088ff,
      flatShading: true
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2
    });

    const baseBoxMaterials = [
      baseSideMaterial, // Right side
      baseSideMaterial, // Left side
      baseTopMaterial,  // Top surface
      baseSideMaterial, // Bottom
      baseSideMaterial, // Front side
      baseSideMaterial  // Back side
    ];

    // 5. Build Base Platform
    const baseGeo = new THREE.BoxGeometry(9.6, 1.6, 9.6);
    const baseMesh = new THREE.Mesh(baseGeo, baseBoxMaterials);
    baseMesh.position.y = -0.8;
    baseMesh.receiveShadow = true;
    logoGroup.add(baseMesh);

    // Outer Border Frame
    const outerBoxGeo = new THREE.BoxGeometry(10.2, 1.8, 10.2);
    const outerBorderMesh = new THREE.Mesh(outerBoxGeo, borderMaterial);
    outerBorderMesh.position.y = -0.8;
    logoGroup.add(outerBorderMesh);

    // 6. Build 3D Hashtag (#)
    const hashtagGroup = new THREE.Group();
    const blockSize = 1.2;
    const blockGeo = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
    const edgesGeo = new THREE.EdgesGeometry(blockGeo);

    const hashtagGrid = [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0]
    ];

    const offset = 2.4; 
    const activeBlockPositions: { x: number; z: number }[] = [];

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (hashtagGrid[r][c] === 1) {
          const posX = (c * 1.2) - offset;
          const posZ = (r * 1.2) - offset;

          const block = new THREE.Mesh(blockGeo, hashtagMaterial);
          block.position.set(posX, 0.6, posZ);
          block.castShadow = true;
          block.receiveShadow = true;
          hashtagGroup.add(block);

          const line = new THREE.LineSegments(edgesGeo, lineMaterial);
          line.position.copy(block.position);
          hashtagGroup.add(line);

          activeBlockPositions.push({ x: posX, z: posZ });
        }
      }
    }
    logoGroup.add(hashtagGroup);

    // 7. Dynamic Binary Textures & Particles Setup
    function createBinaryTexture(text: string) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);
      
      ctx.font = 'Bold 48px monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 32, 32);

      return new THREE.CanvasTexture(canvas);
    }

    const texture0 = createBinaryTexture('0');
    const texture1 = createBinaryTexture('1');

    const binaryParticles: THREE.Sprite[] = [];
    const particleCount = 35;

    function resetParticle(sprite: THREE.Sprite) {
      const spawnPos = activeBlockPositions[Math.floor(Math.random() * activeBlockPositions.length)];
      
      sprite.position.x = spawnPos.x + (Math.random() - 0.5) * 0.6;
      sprite.position.y = 1.2;
      sprite.position.z = spawnPos.z + (Math.random() - 0.5) * 0.6;
      
      sprite.userData = {
        speed: 0.03 + Math.random() * 0.04,
        opacity: 1.0,
        fadeSpeed: 0.01 + Math.random() * 0.015
      };
      
      if (sprite.material instanceof THREE.SpriteMaterial) {
        sprite.material.opacity = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const isOne = Math.random() > 0.5;
      const spriteMaterial = new THREE.SpriteMaterial({
        map: isOne ? texture1 : texture0,
        transparent: true,
        opacity: 0
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.9, 0.9, 1);
      
      resetParticle(sprite);
      logoGroup.add(sprite);
      binaryParticles.push(sprite);
    }

    // 8. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();

      // Floating Levitation & Rotation Effect
      logoGroup.position.y = Math.sin(time * 2) * 0.3;
      logoGroup.rotation.y = Math.sin(time * 0.5) * 0.25;

      // Animate Floating '0' and '1' Particles
      binaryParticles.forEach(sprite => {
        sprite.position.y += sprite.userData.speed;
        sprite.userData.opacity -= sprite.userData.fadeSpeed;
        if (sprite.material instanceof THREE.SpriteMaterial) {
          sprite.material.opacity = Math.max(0, sprite.userData.opacity);
        }

        if (sprite.userData.opacity <= 0) {
          resetParticle(sprite);
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // 9. Handle Resizing
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      
      const aspect = w / h;
      camera.left = -d * aspect;
      camera.right = d * aspect;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[350px] lg:min-h-[450px] flex items-center justify-center overflow-hidden" />;
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
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans antialiased selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),rgba(6,182,212,0.06)_40%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[800px] left-[10%] w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[400px] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* ======================================================================
          Navigation Header
          ====================================================================== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0F172A]/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => { setView("home"); setSelectedId(null); }} className="flex items-center gap-2.5 group cursor-pointer">
            <img src={logo.src} alt="Coderithum Logo" className="w-7 h-7 object-contain transition-transform group-hover:scale-105" />
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              Coderithum
              <span className="px-2 py-0.5 text-[10px] font-mono font-normal rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">Tech Club</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
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
                className={`hover:text-white transition-colors cursor-pointer relative py-1 ${
                  view === tab.id || (tab.id === "events" && view === "event-detail") || (tab.id === "projects" && view === "project-detail")
                    ? "text-white"
                    : ""
                }`}
              >
                {tab.label}
                {(view === tab.id || (tab.id === "events" && view === "event-detail") || (tab.id === "projects" && view === "project-detail")) && (
                  <motion.span layoutId="activeHeaderTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
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
            className="fixed inset-x-0 top-16 bg-[#0F172A] border-b border-slate-800 z-40 p-6 flex flex-col gap-4 shadow-2xl md:hidden"
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
                className={`text-left text-base font-semibold py-2 transition-colors ${
                  view === tab.id ? "text-blue-500" : "text-slate-400"
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
              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
                <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono w-max">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                    <span>Welcome to the Official Innovation Hub</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    Where Innovation <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500">Meets Execution</span>
                  </h1>
                  <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
                    The official tech club of engineering. Shaping the next generation of software engineers, cloud architects, and hardware designers.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <button
                      onClick={() => setView("events")}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>View Upcoming Events</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setView("projects")}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E293B] border border-slate-800 text-slate-300 font-semibold text-sm flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Explore Projects
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative flex items-center justify-center overflow-hidden min-h-[350px] lg:min-h-[450px]">
                  <ThreeLogoAnimation />
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-[#1E293B]/40 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-sm">
                {[
                  { value: `${totalEventsCount}+`, label: "Workshops & Hackathons" },
                  { value: `${totalProjectsCount}+`, label: "Active Tech Projects" },
                  { value: `${totalMembersCount}+`, label: "Dedicated Members" },
                  { value: `${totalAwardsCount}+`, label: "National Achievements" }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4">
                    <div className="text-4xl sm:text-5xl font-black text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-2 font-mono uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Latest Announcement Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-cyan-900/30 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Announcement</h3>
                    <p className="text-sm text-slate-300 mt-1">Registrations are now open for DevHack 2026: National Hackathon! Secure your team spot today.</p>
                  </div>
                </div>
                <button
                  onClick={() => { setView("event-detail"); setSelectedId("devhack-2026"); }}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs whitespace-nowrap transition-colors cursor-pointer"
                >
                  Register Now
                </button>
              </div>

              {/* Featured Event Spotlight */}
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Spotlight Event</h2>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Next Major Tech Workshop</h3>
                  </div>
                  <button onClick={() => setView("events")} className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer">
                    <span>View All Events</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {events.filter(e => e.type === "upcoming").slice(0, 1).map(event => (
                  <div key={event.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#1E293B]/40 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700/80 transition-all shadow-xl">
                    <div className="lg:col-span-6 relative h-[250px] lg:h-auto overflow-hidden">
                      <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 to-transparent lg:hidden" />
                    </div>
                    <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">Upcoming</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{event.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{event.shortDesc}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 justify-between border-t border-slate-800 pt-6">
                        <div className="text-xs text-slate-400 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan-400" />{event.venue}</div>
                        <button
                          onClick={() => { setView("event-detail"); setSelectedId(event.id); }}
                          className="px-4 py-2 bg-[#1E293B] border border-slate-800 group-hover:border-blue-500/50 rounded-lg text-xs font-semibold text-white hover:bg-slate-800 transition-all cursor-pointer"
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
                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Innovation Hub</h2>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Featured Club Projects</h3>
                  </div>
                  <button onClick={() => setView("projects")} className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer">
                    <span>View All Projects</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.slice(0, 2).map(project => (
                    <div key={project.id} className="p-6 rounded-2xl bg-[#1E293B]/40 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-6 shadow-md hover:-translate-y-1 group">
                      <div className="space-y-4">
                        <div className="w-full h-[180px] rounded-xl overflow-hidden relative">
                          <img src={project.banner} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{project.shortDesc}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono border border-slate-800">{tech}</span>
                          ))}
                        </div>
                        <button
                          onClick={() => { setView("project-detail"); setSelectedId(project.id); }}
                          className="w-full py-2 bg-blue-600/10 border border-blue-500/20 rounded-xl text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
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
                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Hall of Fame</h2>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Latest Achievements</h3>
                  </div>
                  <button onClick={() => setView("achievements")} className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer">
                    <span>View All Achievements</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.slice(0, 3).map(ach => (
                    <div key={ach.id} className="p-6 rounded-2xl bg-[#1E293B]/20 border border-slate-800/80 flex flex-col justify-between space-y-4 shadow-sm">
                      <div className="space-y-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{ach.description}</p>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{ach.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sponsors Section */}
              <div className="border-t border-slate-800/80 pt-16 text-center space-y-6">
                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">Proudly Supported By</div>
                <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 hover:opacity-60 transition-opacity">
                  {["GitHub", "Vercel", "AWS", "Google Cloud", "Meta", "Slack"].map((brand, idx) => (
                    <div key={idx} className="text-lg sm:text-xl font-bold text-white font-mono tracking-tighter">{brand}</div>
                  ))}
                </div>
              </div>

              {/* Call To Action */}
              <div className="p-12 rounded-2xl bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-slate-800 text-center space-y-6 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.08),transparent_50%)]" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Join the Community</h3>
                <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Collaborate on open-source codebases, participate in coding sprints, and build projects with top student engineers.
                </p>
                <button
                  onClick={() => setView("contact")}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors cursor-pointer"
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
                <div className="p-6 rounded-2xl bg-[#1E293B]/40 border border-slate-800 space-y-3">
                  <h3 className="text-lg font-bold text-white">Our Vision</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    To cultivate a self-sustaining ecosystem of developers and researchers who innovate continuously, contributing to open source, enterprise engineering, and cutting-edge publications.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#1E293B]/40 border border-slate-800 space-y-3">
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
                    <div key={idx} className="p-6 rounded-2xl bg-[#1E293B]/20 border border-slate-800 flex items-center gap-4">
                      <img src={fac.avatar} alt={fac.name} className="w-16 h-16 rounded-full object-cover border border-slate-800" />
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
                <div className="relative border-l border-slate-800 pl-6 ml-4 space-y-8">
                  {[
                    { year: "2024", title: "Club Conception", desc: "Club founded by a small group of open-source enthusiasts, hosting local compiler building sessions." },
                    { year: "2025", title: "Smart India Hackathon Triumph", desc: "Our developer cohort secured first place at Smart India Hackathon in smart grid management." },
                    { year: "2026", title: "Coderithum Portal Release", desc: "Designed, built, and static-deployed the new visual portfolio portal and resource ecosystem." }
                  ].map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border border-[#0F172A]" />
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
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Upcoming Innovation Sprints
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {events.filter(e => e.type === "upcoming").map(event => (
                    <div key={event.id} className="p-6 rounded-2xl bg-[#1E293B]/30 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-6 shadow-md hover:-translate-y-1 group">
                      <div className="space-y-4">
                        <div className="w-full h-[180px] rounded-xl overflow-hidden relative">
                          <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</div>
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{event.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">{event.shortDesc}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
                        <div className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" />{event.venue}</div>
                        <button
                          onClick={() => { setView("event-detail"); setSelectedId(event.id); }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
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
                <h3 className="text-base font-mono text-slate-400 tracking-wider uppercase">Past Training Camps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {events.filter(e => e.type === "past").map(event => (
                    <div key={event.id} className="p-6 rounded-2xl bg-[#1E293B]/10 border border-slate-800 flex flex-col justify-between space-y-6 opacity-85 hover:opacity-100 hover:border-slate-800 transition-all group">
                      <div className="space-y-4">
                        <div className="w-full h-[180px] rounded-xl overflow-hidden relative">
                          <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0" />
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</div>
                        <h4 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{event.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">{event.shortDesc}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-800/85 pt-4">
                        <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.venue}</div>
                        <button
                          onClick={() => { setView("event-detail"); setSelectedId(event.id); }}
                          className="px-4 py-2 bg-[#1E293B] border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-semibold text-slate-300 transition-all cursor-pointer"
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
              <button onClick={() => setView("events")} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">
                <ChevronLeft className="w-4 h-4" /> Back to Events
              </button>

              <div className="w-full h-[320px] rounded-2xl overflow-hidden relative border border-slate-800 shadow-lg">
                <img src={currentEvent.banner} alt={currentEvent.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{currentEvent.title}</h1>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{currentEvent.description}</p>
                  </div>

                  {/* Agenda */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Event Agenda</h3>
                    <div className="space-y-3 border-l border-slate-800 pl-4 ml-2">
                      {currentEvent.agenda.map((agendaItem, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <p className="text-xs sm:text-sm text-slate-300 font-mono">{agendaItem}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Speakers */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Event Speakers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentEvent.speakers.map((spk, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#1E293B]/20 border border-slate-800 flex items-center gap-3">
                          <img src={spk.avatar} alt={spk.name} className="w-12 h-12 rounded-full object-cover border border-slate-800" />
                          <div>
                            <div className="text-sm font-semibold text-white">{spk.name}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{spk.role}</div>
                            <div className="text-[10px] text-blue-400 font-mono mt-0.5">{spk.company}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar details */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-6 rounded-2xl bg-[#1E293B]/40 border border-slate-800 space-y-6 shadow-sm">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-white border-b border-slate-800 pb-3">Logistics</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-white">Date</div>
                          <div className="text-xs text-slate-400 mt-0.5">{currentEvent.date}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-white">Time</div>
                          <div className="text-xs text-slate-400 mt-0.5">{currentEvent.time}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-white">Venue</div>
                          <div className="text-xs text-slate-400 mt-0.5">{currentEvent.venue}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 space-y-3">
                      {currentEvent.type === "upcoming" ? (
                        <a
                          href={currentEvent.regLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          Register for Event <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="w-full py-2.5 bg-slate-800 text-slate-500 rounded-xl text-xs font-bold flex items-center justify-center select-none border border-slate-800">
                          Registration Closed
                        </span>
                      )}
                      
                      <a
                        href={currentEvent.feedbackLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-zinc-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
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
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Innovation Hub</h2>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Technical Projects</h1>
                <p className="text-xs sm:text-sm text-slate-400">Discover open-source packages, network grids, and AI agents fully built by club members.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map(project => (
                  <div key={project.id} className="p-6 rounded-2xl bg-[#1E293B]/30 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-6 shadow-md hover:-translate-y-1 group">
                    <div className="space-y-4">
                      <div className="w-full h-[200px] rounded-xl overflow-hidden relative">
                        <img src={project.banner} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{project.shortDesc}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono border border-slate-800">{tech}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => { setView("project-detail"); setSelectedId(project.id); }}
                        className="w-full py-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
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
              <button onClick={() => setView("projects")} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">
                <ChevronLeft className="w-4 h-4" /> Back to Projects
              </button>

              <div className="w-full h-[320px] rounded-2xl overflow-hidden relative border border-slate-800 shadow-lg">
                <img src={currentProject.banner} alt={currentProject.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">{currentProject.title}</h1>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{currentProject.description}</p>
                  </div>

                  {/* Tech Stack details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.techStack.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 rounded bg-[#1E293B]/40 text-xs text-slate-300 font-mono border border-slate-800">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Team */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Project Members</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.team.map((member, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-800 flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-cyan-400" />
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar details */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-6 rounded-2xl bg-[#1E293B]/40 border border-slate-800 space-y-6 shadow-sm">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-white border-b border-slate-800 pb-3">Project Metadata</h3>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-white">Mentor</div>
                        <div className="text-xs text-slate-400 mt-1">{currentProject.mentor}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 space-y-3">
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Github className="w-4 h-4" /> Github Repository
                      </a>
                      <a
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
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
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Visual History</h2>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Club Gallery</h1>
                <p className="text-xs sm:text-sm text-slate-400">Sneak peek into our hack sprints, annual bootcamps, and workshop grids.</p>
              </div>

              {/* Album Selectors */}
              <div className="flex justify-center flex-wrap gap-2">
                {albums.map(album => (
                  <button
                    key={album.id}
                    onClick={() => setActiveAlbumId(album.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      activeAlbumId === album.id
                        ? "bg-blue-600/10 border-blue-500/40 text-white"
                        : "bg-[#1E293B]/20 border-slate-800 text-slate-400 hover:text-slate-200"
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
                    <div key={idx} className="p-4 rounded-2xl bg-[#1E293B]/30 border border-slate-800 flex flex-col gap-4 shadow group hover:border-slate-700/80 transition-all">
                      <div className="w-full h-[220px] rounded-xl overflow-hidden relative">
                        <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed px-1">{item.caption}</p>
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
              className="space-y-16"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Ecosystem Core</h2>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">The Tech Club Board</h1>
                <p className="text-xs sm:text-sm text-slate-400">Empowering student engineering leaders under dedicated faculty guides.</p>
              </div>

              {/* Categories */}
              {["Faculty", "Leadership", "Technical", "Design", "Marketing"].map(cat => (
                <div key={cat} className="space-y-6">
                  <h3 className="text-sm font-mono text-cyan-400 tracking-widest uppercase border-b border-slate-800/80 pb-2">{cat}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.filter(t => t.category === cat).map((member, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#1E293B]/30 border border-slate-800 flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-transform group">
                        <div className="w-20 h-20 rounded-full overflow-hidden p-0.5 bg-blue-600/20 group-hover:bg-blue-600/60 transition-colors shadow">
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full bg-slate-900" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{member.name}</h4>
                          <p className="text-xs text-slate-400 mt-1">{member.role}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {member.github && (
                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Achievements</h2>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Hall of Achievements</h1>
                <p className="text-xs sm:text-sm text-slate-400">Discover awards, SIH trophies, robotics shields, and publications bagged by the club.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {achievements.map(ach => (
                  <div key={ach.id} className="p-6 rounded-2xl bg-[#1E293B]/30 border border-slate-800 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 justify-between">
                        <h4 className="text-base font-bold text-white">{ach.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0">{ach.date}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{ach.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-cyan-400" />{ach.recipient}</span>
                        <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-blue-400" />{ach.award}</span>
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
                <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Get In Touch</h2>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Contact Coderithum</h1>
                <p className="text-xs sm:text-sm text-slate-400">Have questions about upcoming sprints? Drop us a query or visit the campus block.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
                {/* Left Panel Contact Details */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="p-6 rounded-2xl bg-[#1E293B]/40 border border-slate-800 space-y-6">
                    <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Club Info</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-white">Email Address</div>
                          <a href="mailto:coderithum.tech@gmail.com" className="text-xs text-slate-400 hover:text-white transition-colors">coderithum.tech@gmail.com</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-white">Office Location</div>
                          <div className="text-xs text-slate-400 leading-relaxed mt-0.5">Tech Lab 402, Computer Science Block, Main University Campus</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-white">Technical Support</div>
                          <div className="text-xs text-slate-400 mt-0.5">+91 98765 43210</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Styled Mock map */}
                  <div className="w-full h-[220px] rounded-2xl border border-slate-800 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[#0F172A] bg-grid-pattern opacity-60 flex items-center justify-center">
                      <div className="text-center space-y-2 z-10">
                        <MapPin className="w-8 h-8 text-blue-500 animate-bounce mx-auto" />
                        <div className="text-xs font-mono text-white">CS Block Tech Lab (Campus Map Grid)</div>
                        <div className="text-[10px] text-slate-500">12.9716° N, 77.5946° E</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right Panel Contact Form */}
                <div className="lg:col-span-7">
                  <div className="p-8 rounded-2xl bg-[#1E293B]/40 border border-slate-800 space-y-6">
                    <h3 className="text-lg font-bold text-white">Send us a direct message</h3>
                    
                    {contactSuccess ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white">Message Dispatched!</h4>
                        <p className="text-xs text-slate-400">Thank you for writing. Our Technical Board will review your query and write back shortly.</p>
                        <button
                          onClick={() => setContactSuccess(false)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
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
                            <label className="text-[10px] font-mono text-slate-400 uppercase">First Name</label>
                            <input required type="text" placeholder="Kunal" className="w-full bg-[#0F172A] border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-slate-400 uppercase">Email Address</label>
                            <input required type="email" placeholder="kunal@example.com" className="w-full bg-[#0F172A] border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase">Topic / Subject</label>
                          <input required type="text" placeholder="DevHack 2026 Participation Query" className="w-full bg-[#0F172A] border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase">Message Body</label>
                          <textarea required rows={4} placeholder="Hi Coderithum technical team, I wanted to inquire if students from second year..." className="w-full bg-[#0F172A] border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
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
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
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
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
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
      <footer className="border-t border-slate-800/80 py-16 px-6 bg-[#090D1A] text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <img src={logo.src} alt="Coderithum Logo" className="w-5 h-5 object-contain" />
                <span className="font-bold text-white text-sm">Coderithum Tech Club</span>
              </div>
              <p className="max-w-xs leading-relaxed text-slate-400">
                Official student computing division showcasing innovation, annual events, and collaborative codebases.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-white text-sm font-bold">Quick Navigation</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => { setView("home"); setSelectedId(null); }} className="text-left hover:text-white transition-colors cursor-pointer">Index Grid</button>
                <button onClick={() => { setView("about"); setSelectedId(null); }} className="text-left hover:text-white transition-colors cursor-pointer">Our Journey</button>
                <button onClick={() => { setView("events"); setSelectedId(null); }} className="text-left hover:text-white transition-colors cursor-pointer">Events Board</button>
                <button onClick={() => { setView("projects"); setSelectedId(null); }} className="text-left hover:text-white transition-colors cursor-pointer">Tech Projects</button>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-white text-sm font-bold">Developer Utilities</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => setView("404-test")} className="text-left hover:text-white transition-colors cursor-pointer">View Mock 404 View</button>
                <button onClick={() => setView("500-test")} className="text-left hover:text-white transition-colors cursor-pointer">View Mock 500 View</button>
                <a href="https://github.com/KunalPatilCode/coderithum" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" /> Code Repository
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Coderithum. All rights reserved. Open source under MIT license.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="https://github.com/KunalPatilCode/coderithum" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
