import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Terminal,
  Cpu,
  Globe,
  Code,
  Layers,
  Shield,
  Palette,
  Database,
  Sparkles,
  ChevronRight,
  Award,
  Users,
  CheckCircle2,
  Quote,
  ArrowRight,
  Zap,
  BookOpen,
  Activity,
  FileText,
  Copy,
  Check,
  Rocket,
  Server,
  Trophy,
  Brain,
  Smartphone,
  CloudLightning,
  Lock,
  Brush,
  BarChart,
  Lightbulb,
  Compass,
  ArrowUpRight
} from "lucide-react";
import { TeamMember, getMemberAvatarStyle } from "../../types";
import InteractiveHeading from "../InteractiveHeading";
import { Github, Linkedin } from "../Icons";

interface AboutViewProps {
  team: TeamMember[];
  setView?: (view: string) => void;
}

// ============================================================================
// EDITABLE DATA STRUCTURES
// ============================================================================

// Section 2: Why Coderithum Stages
interface WhyStage {
  id: string;
  label: string;
  title: string;
  desc: string;
  color: string;
}

const whyStages: WhyStage[] = [
  {
    id: "learn",
    label: "LEARN",
    title: "Strengthen Technical Foundations",
    desc: "Strengthen technical foundations through workshops, sessions and peer learning.",
    color: "bg-blue-100 border-blue-600 text-blue-900"
  },
  {
    id: "explore",
    label: "EXPLORE",
    title: "Discover New Technologies",
    desc: "Discover new technologies and identify areas of interest.",
    color: "bg-emerald-100 border-emerald-600 text-emerald-900"
  },
  {
    id: "build",
    label: "BUILD",
    title: "Practical Solutions",
    desc: "Turn knowledge into projects and practical solutions.",
    color: "bg-purple-100 border-purple-600 text-purple-900"
  },
  {
    id: "collaborate",
    label: "COLLABORATE",
    title: "Cross-Domain Peer Teams",
    desc: "Work with students across domains and academic years.",
    color: "bg-amber-100 border-amber-600 text-amber-900"
  },
  {
    id: "innovate",
    label: "INNOVATE",
    title: "Real-World Impact",
    desc: "Transform ideas into meaningful solutions and opportunities.",
    color: "bg-rose-100 border-rose-600 text-rose-900"
  }
];

// Section 3: What We Do Cards
interface WhatWeDoItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const whatWeDoItems: WhatWeDoItem[] = [
  {
    icon: <Terminal className="w-6 h-6 text-blue-600" />,
    title: "Technical Workshops",
    desc: "Hands-on labs and bootcamps covering modern programming frameworks, libraries, and dev tools."
  },
  {
    icon: <Rocket className="w-6 h-6 text-emerald-600" />,
    title: "Real-World Projects",
    desc: "Building open-source tools, campus utilities, and software packages to solve local community issues."
  },
  {
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
    title: "Hackathons & Competitions",
    desc: "Preparing team submissions and building functional prototypes for regional and national hackathons."
  },
  {
    icon: <Users className="w-6 h-6 text-purple-600" />,
    title: "Peer Learning & Mentorship",
    desc: "Seniors guiding juniors through pair programming, peer code reviews, and roadmap orientation."
  },
  {
    icon: <Brain className="w-6 h-6 text-rose-500" />,
    title: "Innovation & Research",
    desc: "Exploring emerging technologies, drafting architectures, and investigating theoretical computer science."
  },
  {
    icon: <Globe className="w-6 h-6 text-cyan-600" />,
    title: "Open Source & Collaboration",
    desc: "Publishing and contributing to shared repositories to learn standard engineering workflows."
  }
];

// Section 4: Technical Ecosystem Domains
interface EcosystemDomain {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  longDesc: string;
  color: string;
  tech: string[];
  explore: string[];
  learningPath: string[];
  applications: string[];
}

const ecosystemDomains: EcosystemDomain[] = [
  {
    id: "ai",
    title: "AI & GenAI",
    icon: <Brain className="w-5 h-5" />,
    shortDesc: "Building intelligent systems with AI, machine learning and generative technologies.",
    longDesc: "Develop smart models, deploy neural networks, and leverage deep learning frameworks to solve predictive and creative tasks.",
    color: "border-purple-500 text-purple-600 bg-purple-50 hover:bg-purple-50/50 shadow-[0_0_15px_rgba(139,92,246,0.1)]",
    tech: ["Python", "NumPy", "Pandas", "Scikit-learn", "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LLMs"],
    explore: [
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "Large Language Models",
      "Computer Vision",
      "AI application development"
    ],
    learningPath: ["Python", "Mathematics", "Machine Learning", "Deep Learning", "LLMs", "Generative AI", "AI Applications"],
    applications: [
      "AI assistants",
      "Computer vision",
      "Recommendation systems",
      "Automation"
    ]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    icon: <Code className="w-5 h-5" />,
    shortDesc: "Designing complete web applications from frontend to backend.",
    longDesc: "Build complete web applications by combining modern frontend technologies, backend systems, APIs and databases.",
    color: "border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-50/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    tech: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Git & GitHub"],
    explore: [
      "Frontend development",
      "Backend development",
      "REST APIs",
      "Authentication",
      "Database design",
      "Deployment"
    ],
    learningPath: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database", "APIs", "Deployment"],
    applications: [
      "Web applications",
      "College portals",
      "SaaS platforms",
      "Real-time applications"
    ]
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    icon: <Smartphone className="w-5 h-5" />,
    shortDesc: "Creating modern mobile experiences for Android and cross-platform platforms.",
    longDesc: "Design and compile fast, offline-first mobile applications with dynamic native device integrations.",
    color: "border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-50/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    tech: ["Flutter", "Dart", "React Native", "Firebase"],
    explore: [
      "Cross-platform architecture",
      "Mobile UI & Animations",
      "State management",
      "Local storage & databases",
      "Native device APIs",
      "Play Store deployment"
    ],
    learningPath: ["Dart/JS", "UI Layouts", "State Management", "Local Databases", "API Integration", "Device Features", "App Stores"],
    applications: [
      "Campus utility apps",
      "Cross-platform tools",
      "Offline-first clients",
      "Mobile services"
    ]
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: <CloudLightning className="w-5 h-5" />,
    shortDesc: "Building, deploying and maintaining scalable cloud infrastructure.",
    longDesc: "Orchestrate modern servers, design automated pipelines, and manage cloud computing configurations for high-availability apps.",
    color: "border-cyan-500 text-cyan-600 bg-cyan-50 hover:bg-cyan-50/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]",
    tech: ["Docker", "AWS", "Linux", "GitHub Actions", "CI/CD"],
    explore: [
      "Containerization",
      "CI/CD automation",
      "Infrastructure as Code",
      "Linux administration",
      "Cloud hosting services",
      "System telemetry & logging"
    ],
    learningPath: ["Linux Terminal", "Bash Scripting", "Docker Containers", "GitOps CI/CD", "AWS Services", "Cloud Orchestration", "Monitoring"],
    applications: [
      "High-availability clusters",
      "Automated test rigs",
      "Scalable pipelines",
      "Server management"
    ]
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: <Lock className="w-5 h-5" />,
    shortDesc: "Understanding security, networks, vulnerabilities and secure systems.",
    longDesc: "Audit codebases, analyze server vulnerabilities, investigate networking packets, and practice secure coding paradigms.",
    color: "border-rose-500 text-rose-600 bg-rose-50 hover:bg-rose-50/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]",
    tech: ["Networking", "Linux", "OWASP", "Burp Suite", "Wireshark"],
    explore: [
      "Penetration testing",
      "Network sniffing",
      "Cryptography fundamentals",
      "Secure coding practices",
      "Vulnerability patching",
      "CTF operations"
    ],
    learningPath: ["Networking Basics", "Linux Administration", "OWASP Top 10", "Wireshark Packet Analysis", "Vulnerability Scanning", "Penetration Testing", "Security Auditing"],
    applications: [
      "Secure campus portals",
      "Vulnerability audits",
      "Code integrity checks",
      "Network protection"
    ]
  },
  {
    id: "uiux",
    title: "UI/UX & Design",
    icon: <Brush className="w-5 h-5" />,
    shortDesc: "Designing intuitive, accessible and engaging digital experiences.",
    longDesc: "Craft user flows, build tokenized design systems, design prototypes, and test usability postures.",
    color: "border-amber-500 text-amber-600 bg-amber-50 hover:bg-amber-50/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    tech: ["Figma", "Design Systems", "Prototyping", "Framer Motion"],
    explore: [
      "Information architecture",
      "Wireframing & layouts",
      "Prototyping interactions",
      "Usability testing",
      "Accessibility standards",
      "Visual assets & branding"
    ],
    learningPath: ["User Research", "Wireframing", "Figma Auto-layout", "Design System Tokens", "High-Fi Prototyping", "Micro-interactions", "A11y Standards"],
    applications: [
      "High-fidelity wireframes",
      "Interactive design tokens",
      "Mockup interfaces",
      "Usability specifications"
    ]
  },
  {
    id: "datascience",
    title: "Data Science",
    icon: <BarChart className="w-5 h-5" />,
    shortDesc: "Turning data into insights using statistics, programming and visualization.",
    longDesc: "Gather datasets, execute statistical modeling, draw interactive telemetry dashboards, and make predictive models.",
    color: "border-indigo-500 text-indigo-600 bg-indigo-50 hover:bg-indigo-50/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "SQL"],
    explore: [
      "Exploratory data analysis",
      "Database query construction",
      "Data cleaning methods",
      "Statistical hypothesis testing",
      "Predictive regressions",
      "Interactive visualization charts"
    ],
    learningPath: ["Python Basics", "SQL Queries", "Pandas Dataframes", "Data Cleaning", "Matplotlib Visualization", "Statistical Analysis", "Predictive Modeling"],
    applications: [
      "Academic performance dashboards",
      "Predictive placement tools",
      "Interactive usage metrics",
      "Analytics reports"
    ]
  },
  {
    id: "incubation",
    title: "Innovation & Incubation",
    icon: <Lightbulb className="w-5 h-5" />,
    shortDesc: "Transforming ideas into practical solutions, projects and future opportunities.",
    longDesc: "Guide student software projects from concept validation to intellectual property filing, agile sprint management, and venture pitch mentorship.",
    color: "border-teal-500 text-teal-600 bg-teal-50 hover:bg-teal-50/50 shadow-[0_0_15px_rgba(20,184,166,0.1)]",
    tech: ["Ideation", "Problem Solving", "Product Development", "Entrepreneurship", "Research", "Project Management"],
    explore: [
      "Problem discovery",
      "Technical scoping",
      "Agile scrum management",
      "Pitch deck delivery",
      "Patent & IPR basics",
      "Startup formation"
    ],
    learningPath: ["Problem Discovery", "Market Scoping", "Agile Sprints", "Product Spec Drafts", "Pitch Practice", "IPR Patent Law", "Incubation Launch"],
    applications: [
      "Student entrepreneur ventures",
      "Technical pitch decks",
      "Patent registration files",
      "Product specifications"
    ]
  }
];

// Section 5: Student Growth Steps
interface GrowthStep {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const growthSteps: GrowthStep[] = [
  {
    num: "01",
    title: "EXPLORE",
    desc: "Discover technology and find your interest.",
    icon: <Compass className="w-6 h-6 text-blue-600" />
  },
  {
    num: "02",
    title: "LEARN",
    desc: "Develop technical and problem-solving skills.",
    icon: <BookOpen className="w-6 h-6 text-emerald-600" />
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Work on projects, hackathons and real-world problems.",
    icon: <Cpu className="w-6 h-6 text-purple-600" />
  },
  {
    num: "04",
    title: "LEAD",
    desc: "Lead teams, mentor peers and create impact.",
    icon: <Sparkles className="w-6 h-6 text-amber-500" />
  }
];

const withBasePath = (path: string) => {
  if (!path || path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  return `${basePath}${normalizedPath}`;
};

// Section 3.5: Foundation Team Members
interface FoundationMember {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
}

const foundationMembers: FoundationMember[] = [
  {
    name: "Kunal Patil",
    role: "Foundation Team Member",
    image: "/kunalp.png",
    github: "https://github.com/KunalPatilCode",
    linkedin: "https://www.linkedin.com/in/kunal-patil29?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    name: "Abhishek Kumar",
    role: "Foundation Team Member",
    image: "/abhishek-kumar.png",
    github: "https://github.com/CodebyAbhishek123",
    linkedin: "https://www.linkedin.com/in/abhishek-kumar-63b97b315?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Maitri Patel",
    role: "Foundation Team Member",
    image: "/maitri.png",
    github: "https://github.com/Maitrify",
    linkedin: "https://www.linkedin.com/in/maitri-patel-573927287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    name: "Purnima Upadhyay",
    role: "Foundation Team Member",
    image: "/purnima.png",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/purnima-upadhyay-0902b12b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    name: "Tushar Mahapatra",
    role: "Foundation Team Member",
    image: "/tushar.jpeg"
  },
  {
    name: "Aaryan Patel",
    role: "Foundation Team Member",
    image: "/aaryan-patel.png",
    linkedin: "https://linkedin.com"
  }
];

// Section 3.6: Foundation Connection Lines & Floating Animations Helper Structures
const lineCoords = [
  { x1: "16.6%", y1: "25%", x2: "50%", y2: "50%" },
  { x1: "50%", y1: "25%", x2: "50%", y2: "50%" },
  { x1: "83.3%", y1: "25%", x2: "50%", y2: "50%" },
  { x1: "16.6%", y1: "75%", x2: "50%", y2: "50%" },
  { x1: "50%", y1: "75%", x2: "50%", y2: "50%" },
  { x1: "83.3%", y1: "75%", x2: "50%", y2: "50%" }
];




// Section 6: Principal Message Config (Fully Editable Placeholder)
const principalConfig = {
  name: "Dr. Avinash R. Chaudhari",
  role: "Principal & Chief Patron",
  institution: "Government Engineering College, Daman",
  message: "[Principal's approved message will be added here.]",
  avatar: withBasePath("/principal1.jpg"),
};

// Section 7: Future Scope Phases
interface FuturePhase {
  phase: string;
  title: string;
  points: string[];
}

const futurePhases: FuturePhase[] = [
  {
    phase: "PHASE 01",
    title: "STRENGTHEN",
    points: [
      "Strengthen technical domains",
      "Conduct regular technical workshops",
      "Increase student participation",
      "Build stronger project culture"
    ]
  },
  {
    phase: "PHASE 02",
    title: "COLLABORATE",
    points: [
      "Industry mentorship",
      "Alumni interaction",
      "Collaboration with other colleges",
      "Inter-college technical events",
      "Open-source collaboration"
    ]
  },
  {
    phase: "PHASE 03",
    title: "INNOVATE",
    points: [
      "Student-led products",
      "Research initiatives",
      "Project incubation",
      "Startup-oriented innovation",
      "Real-world problem solving"
    ]
  },
  {
    phase: "PHASE 04",
    title: "IMPACT",
    points: [
      "National-level competitions",
      "Industry-connected projects",
      "Stronger research culture",
      "Open-source contributions",
      "Technology solutions with social and institutional impact"
    ]
  }
];

// Section 9: Value Items
interface ValueItem {
  title: string;
  desc: string;
}

const valueItems: ValueItem[] = [
  {
    title: "Build for Real-World Impact",
    desc: "Focus on solving meaningful problems rather than building projects only for demonstration."
  },
  {
    title: "Learn Together",
    desc: "Encourage peer learning, collaboration and knowledge sharing."
  },
  {
    title: "Create with Curiosity",
    desc: "Explore emerging technologies and experiment with new ideas."
  },
  {
    title: "Lead Through Innovation",
    desc: "Develop students who can take ownership, lead teams and create impact."
  }
];

export default function AboutView({ team, setView }: AboutViewProps) {
  // Why Coderithum State (to show interactive cards)
  const [selectedWhyStage, setSelectedWhyStage] = useState<string>("learn");
  // Technical Ecosystem Active Domain State
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);
  // Foundation Team States
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-24 max-w-6xl mx-auto pb-20"
    >
      {/* ================================================================== */}
      {/* 1. HERO — "What is Coderithum?"                                    */}
      {/* ================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-100 text-blue-900 text-xs font-mono font-bold border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>WHO WE ARE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Building the Next Generation of <span className="text-blue-600">Student Innovators</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            Coderithum is a student-driven technology and innovation community at{" "}
            <span className="font-bold text-slate-900">Government Engineering College, Daman</span>. 
            It brings together students who are passionate about technology, problem solving, innovation, 
            and building real-world solutions.
          </p>

          {/* List of Opportunities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              "Learn emerging technologies",
              "Build real-world projects",
              "Participate in hackathons & competitions",
              "Collaborate with peers",
              "Explore research and innovation",
              "Develop leadership and teamwork skills",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-mono font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual Block */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-[380px] p-6 bg-slate-900 border-2 border-slate-900 shadow-[8px_8px_0px_#000] relative overflow-hidden text-mono font-mono text-xs text-slate-300">
            {/* Visual Node Graph Overlay / Code Graphic */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] text-slate-500">coderithum_nodes.py</span>
            </div>

            {/* Simulated interactive network layout */}
            <div className="relative h-48 border border-slate-800 bg-slate-950 flex items-center justify-center rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              
              {/* Central Core Node */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ duration: 3, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500 flex flex-col items-center justify-center z-10 p-2 text-center"
              >
                <Cpu className="w-5 h-5 text-blue-400" />
                <span className="text-[8px] font-bold text-white mt-1">CORE</span>
              </motion.div>

              {/* Connecting lines */}
              <div className="absolute w-full h-full flex items-center justify-center">
                <svg className="w-full h-full absolute inset-0 pointer-events-none">
                  {/* Dashed animated links */}
                  <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                  <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="1" strokeDasharray="4" />
                  <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4" />
                  <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
                </svg>
              </div>

              {/* Surrounding Nodes */}
              <div className="absolute top-4 left-6 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[9px] text-slate-300">LEARN</span>
              </div>

              <div className="absolute top-4 right-6 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-slate-300">EXPLORE</span>
              </div>

              <div className="absolute bottom-4 left-6 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[9px] text-slate-300">BUILD</span>
              </div>

              <div className="absolute bottom-4 right-6 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[9px] text-slate-300">INNOVATE</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>STATUS: Active</span>
              <span className="text-blue-400">GEC Daman Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHY CODERITHUM EXISTS                                           */}
      {/* ================================================================== */}
      <section className="space-y-8">
        <div className="text-left space-y-2 border-l-4 border-blue-600 pl-4">
          <InteractiveHeading
            text="Why Coderithum?"
            as="h2"
            className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
          />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
            Classroom education provides the foundation. Coderithum provides the environment to apply that knowledge.
          </p>
        </div>

        {/* Stepper Node Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {whyStages.map((stage) => {
            const isSelected = selectedWhyStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedWhyStage(stage.id)}
                className={`p-3.5 border-2 border-slate-900 text-center font-mono font-black text-xs sm:text-sm transition-all cursor-pointer shadow-[3px_3px_0px_#000] relative ${
                  isSelected
                    ? "bg-slate-900 text-white translate-x-[1px] translate-y-[1px] shadow-[1px_1px_0px_#000]"
                    : "bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                {stage.label}
                {isSelected && (
                  <span className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-slate-900 hidden sm:block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Card */}
        <div className="relative min-h-[140px]">
          <AnimatePresence mode="wait">
            {whyStages.map((stage) => {
              if (stage.id !== selectedWhyStage) return null;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`p-6 border-2 border-slate-900 shadow-[6px_6px_0px_#000] rounded-none ${stage.color} flex flex-col justify-between`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest border border-current px-2 py-0.5 inline-block">
                      STAGE — {stage.label}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black">{stage.title}</h3>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">{stage.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. WHAT WE DO                                                      */}
      {/* ================================================================== */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="What We Do"
            as="h2"
            className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
          />
          <p className="text-xs sm:text-sm text-slate-500 font-mono font-bold uppercase">
            EXPLORING CORE ACTIVITIES & COLLABORATIVE INITIATIVES
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatWeDoItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border-2 border-slate-900 shadow-[5px_5px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-slate-50 border border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  {item.icon}
                </div>
                <h4 className="text-base font-black text-slate-900">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3.5. FOUNDATION TEAM                                               */}
      {/* ================================================================== */}
      <section className="space-y-8 relative">
        <div className="text-left space-y-3 border-l-4 border-blue-600 pl-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-blue-600 tracking-wider uppercase bg-blue-100 border-2 border-slate-900 px-3 py-1.5 shadow-[2px_2px_0px_#000] inline-block">
              FOUNDATION TEAM
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border-2 border-slate-900 text-[10px] font-mono font-bold uppercase shadow-[2px_2px_0px_#000] relative overflow-hidden shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping absolute left-3" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 relative" />
              <span className="pl-4">EST. 2024 • FOUNDATION</span>
              <motion.div
                animate={shouldReduceMotion ? {} : { x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }}
                className="absolute inset-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
              />
            </span>
          </div>

          <InteractiveHeading
            text="The People Behind Coderithum"
            as="h2"
            className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
          />
          <p className="text-xs sm:text-sm text-slate-500 font-mono font-bold uppercase">
            “Six students. One shared vision. The beginning of Coderithum.”
          </p>
        </div>

        {/* Responsive Grid with connecting network lines in background */}
        <div className="relative">
          {/* Connection lines in background - only shown on desktop/large screens */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
            <style>{`
              @keyframes line-dash {
                to {
                  stroke-dashoffset: -120;
                }
              }
              .animate-connection-dash {
                animation: line-dash 10s linear infinite;
              }
              @keyframes line-pulse {
                0%, 100% { opacity: 0.35; }
                50% { opacity: 0.65; }
              }
              .animate-line-pulse {
                animation: line-pulse 4s ease-in-out infinite;
              }

              /* Card Floating Animations */
              @keyframes float-card-0 {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-4px); }
              }
              @keyframes float-card-1 {
                0%, 100% { transform: translate(0px, 0px); }
                50% { transform: translate(2px, -3px); }
              }
              @keyframes float-card-2 {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(4px); }
              }
              @keyframes float-card-3 {
                0%, 100% { transform: translate(0px, 0px); }
                50% { transform: translate(-3px, 2px); }
              }
              @keyframes float-card-4 {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-3px); }
              }
              @keyframes float-card-5 {
                0%, 100% { transform: translate(0px, 0px); }
                50% { transform: translate(2px, 3px); }
              }

              .card-float-0 { animation: float-card-0 5.2s ease-in-out infinite; }
              .card-float-1 { animation: float-card-1 6.1s ease-in-out infinite; }
              .card-float-2 { animation: float-card-2 4.8s ease-in-out infinite; }
              .card-float-3 { animation: float-card-3 6.7s ease-in-out infinite; }
              .card-float-4 { animation: float-card-4 5.6s ease-in-out infinite; }
              .card-float-5 { animation: float-card-5 4.9s ease-in-out infinite; }

              .foundation-card {
                transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
              }
              
              .foundation-card:hover {
                animation: none !important;
                transform: translateY(-10px) scale(1.05) !important;
              }

              @media (prefers-reduced-motion: reduce) {
                .card-float-0, .card-float-1, .card-float-2, .card-float-3, .card-float-4, .card-float-5 {
                  animation: none !important;
                }
                .foundation-card {
                  transition: none !important;
                }
                .foundation-card:hover {
                  transform: none !important;
                }
              }
            `}</style>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {lineCoords.map((coords, idx) => {
                const isCardHovered = hoveredIndex === idx;
                return (
                  <g key={idx}>
                    {/* Base Pulse/Highlight Line */}
                    <line
                      x1={coords.x1}
                      y1={coords.y1}
                      x2={coords.x2}
                      y2={coords.y2}
                      stroke={isCardHovered ? "#2563eb" : "#cbd5e1"}
                      strokeWidth={isCardHovered ? "2.5" : "1.5"}
                      className={`transition-all duration-300 ${
                        !shouldReduceMotion && !isCardHovered ? "animate-line-pulse" : ""
                      }`}
                      style={{
                        animationDelay: `${idx * 0.5}s`
                      }}
                    />
                    {/* Moving Dot overlay */}
                    {!shouldReduceMotion && (
                      <line
                        x1={coords.x1}
                        y1={coords.y1}
                        x2={coords.x2}
                        y2={coords.y2}
                        stroke="#2563eb"
                        strokeWidth="2.5"
                        strokeDasharray="6 36"
                        className="animate-connection-dash"
                        style={{
                          opacity: isCardHovered ? 1.0 : 0.35,
                          animationDuration: isCardHovered ? "4s" : "8s"
                        }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Center Code Node */}
              <circle cx="50%" cy="50%" r="20" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                fill="#2563eb"
                fontSize="12"
                fontWeight="black"
                fontFamily="monospace"
              >
                &lt;/&gt;
              </text>
            </svg>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={shouldReduceMotion ? {} : {
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {foundationMembers.map((member, idx) => {
              const isHovered = hoveredIndex === idx;
              const isAnyCardHovered = hoveredIndex !== null;
              return (
                <motion.div
                  key={idx}
                  variants={shouldReduceMotion ? {} : {
                    hidden: { opacity: 0, y: 30, scale: 0.97 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                >
                  <div
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`foundation-card card-float-${idx} group bg-white border-2 flex flex-col overflow-hidden relative max-w-[240px] mx-auto w-full ${
                      isHovered 
                        ? "border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.25),_6px_6px_0px_#2563eb] z-30" 
                        : isAnyCardHovered
                          ? "border-slate-900 shadow-[3px_3px_0px_#000] opacity-75 z-10"
                          : "border-slate-900 shadow-[4px_4px_0px_#000] opacity-100 z-10"
                    }`}
                  >
                    {/* Technical Light Sweep Overlay */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                      <motion.div
                        initial={{ x: "-150%" }}
                        animate={isHovered ? { x: "150%" } : { x: "-150%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -skew-x-12"
                      />
                    </div>

                    {/* Top Badge bar */}
                    <div className="flex justify-between items-center w-full px-4 pt-3.5 pb-2.5 border-b border-slate-100 bg-slate-50/50">
                      <span className="px-2 py-0.5 border border-blue-600 bg-blue-50 text-blue-700 text-[9px] font-mono font-bold tracking-wider uppercase relative overflow-hidden">
                        FOUNDING MEMBER
                        <motion.div
                          animate={shouldReduceMotion ? {} : { x: ["-100%", "200%"] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatDelay: 4 }}
                          className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12"
                        />
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono font-bold">EST. 2024</span>
                    </div>

                    {/* Portrait wrapper with reduced size */}
                    <div className="relative pt-6 pb-4 flex justify-center items-center">
                      {/* Subtle blur glow behind portrait on hover */}
                      <div className={`absolute w-24 h-24 bg-blue-500/10 rounded-full blur-xl transition-opacity duration-300 pointer-events-none ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`} />

                      <div className={`relative size-24 border-2 bg-blue-50/50 overflow-hidden transition-all duration-300 ${
                        isHovered
                          ? "border-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.3),_4px_4px_0px_#2563eb]"
                          : "border-slate-900 shadow-[3px_3px_0px_#000]"
                      }`}>
                        {member.image ? (
                          <img
                            src={withBasePath(member.image)}
                            alt={`${member.name} — Foundation Team Member`}
                            className={`absolute inset-0 w-full h-full object-cover filter grayscale transition-all duration-300 ${
                              isHovered 
                                ? `grayscale-0 ${shouldReduceMotion ? "scale-100" : "scale-108"}` 
                                : ""
                            }`}
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50/30">
                            <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none" />
                            <span className={`text-xl font-mono font-black transition-colors duration-300 ${
                              isHovered ? "text-blue-500" : "text-slate-300"
                            }`}>
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                            <span className={`text-[8px] font-mono font-bold mt-1 uppercase tracking-widest transition-colors duration-300 ${
                              isHovered ? "text-blue-500" : "text-slate-400"
                            }`}>
                              No Photo
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="px-4 pb-4 flex flex-col justify-between flex-grow space-y-3">
                      <div className="space-y-2 text-center w-full">
                        <h4 className={`text-sm font-black uppercase tracking-tight transition-colors duration-300 ${
                          isHovered ? "text-blue-600" : "text-slate-900"
                        }`}>
                          {member.name}
                        </h4>
                        <span className="text-[9px] text-slate-500 font-mono font-bold block uppercase tracking-wider">
                          {member.role}
                        </span>

                        {/* Hover contribution reveal info */}
                        <div className="h-4 overflow-hidden relative">
                          <span className={`text-[9px] font-mono font-extrabold text-blue-600 absolute inset-x-0 bottom-0 transition-all duration-300 ${
                            isHovered 
                              ? "opacity-100 translate-y-0" 
                              : "opacity-0 translate-y-2"
                          }`}>
                            BUILDING THE FOUNDATION • 2024
                          </span>
                        </div>
                      </div>

                      {/* Social links */}
                      <div className={`flex items-center justify-center gap-3 pt-3 border-t border-slate-100 w-full transition-all duration-300 ${
                        isHovered ? "opacity-100" : "opacity-60"
                      }`}>
                        {member.github ? (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 bg-white text-slate-700 border rounded-none transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                              isHovered 
                                ? "border-blue-400 text-blue-600 shadow-[2px_2px_0px_rgba(37,99,235,0.4)] scale-105 hover:scale-110 hover:border-blue-600 hover:text-white hover:bg-blue-600 hover:shadow-[2px_2px_0px_#1d4ed8]" 
                                : "border-slate-300 shadow-[1px_1px_0px_#000]"
                            }`}
                            title={`${member.name}'s GitHub`}
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="p-1.5 border border-slate-200 text-slate-300 cursor-not-allowed">
                            <Github className="w-3.5 h-3.5 opacity-30" />
                          </span>
                        )}

                        {member.linkedin ? (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 bg-white text-slate-700 border rounded-none transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                              isHovered 
                                ? "border-blue-400 text-blue-600 shadow-[2px_2px_0px_rgba(37,99,235,0.4)] scale-105 hover:scale-110 hover:border-blue-600 hover:text-white hover:bg-blue-600 hover:shadow-[2px_2px_0px_#1d4ed8]" 
                                : "border-slate-300 shadow-[1px_1px_0px_#000]"
                            }`}
                            title={`${member.name}'s LinkedIn`}
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="p-1.5 border border-slate-200 text-slate-300 cursor-not-allowed">
                            <Linkedin className="w-3.5 h-3.5 opacity-30" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. OUR TECHNICAL ECOSYSTEM                                         */}
      {/* ================================================================== */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="Explore Our Technical Domains"
            as="h2"
            className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
          />
          <p className="text-sm text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Coderithum provides a flexible, modular environment where students can explore different areas of technology, develop specialized skills, and collaborate across domains on real-world projects.
          </p>
        </div>

        {/* 8 Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ecosystemDomains.map((domain) => {
            const isActive = activeDomainId === domain.id;
            const hasSelection = activeDomainId !== null;
            const opacityClass = isActive
              ? "opacity-100"
              : hasSelection
                ? "opacity-60 hover:opacity-100"
                : "opacity-100";
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(isActive ? null : domain.id)}
                className={`p-5 border-2 border-slate-900 flex flex-col text-left justify-between space-y-4 hover:translate-y-[-2px] transition-all duration-200 cursor-pointer ${opacityClass} ${
                  isActive
                    ? `${domain.color.split(" ")[2]} scale-[1.02] border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.2),_4px_4px_0px_#000]`
                    : "bg-white text-slate-800 shadow-[3px_3px_0px_#000]"
                }`}
              >
                <div className="space-y-3 w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className={`w-10 h-10 border-2 border-slate-900 flex items-center justify-center ${domain.color.split(" ")[0]} ${domain.color.split(" ")[1]} shadow-[2px_2px_0px_#000]`}>
                      {domain.icon}
                    </div>
                    {isActive && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-mono font-bold uppercase shadow-[1px_1px_0px_#000]">
                        <Zap className="w-2.5 h-2.5 animate-pulse" /> Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{domain.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-normal mt-1">
                      {domain.shortDesc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Animated Details Panel */}
        <AnimatePresence>
          {activeDomainId !== null && (
            <motion.div
              key="ecosystem-details-container"
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden relative"
            >
              {ecosystemDomains.map((domain) => {
                if (domain.id !== activeDomainId) return null;
                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 sm:p-8 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_#000] space-y-8 relative overflow-hidden"
                  >
                    {/* Decorative Glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                    {/* Panel Header */}
                    <div className="border-b-2 border-slate-200 pb-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 border-2 border-slate-900 flex items-center justify-center ${domain.color.split(" ")[0]} ${domain.color.split(" ")[1]} shadow-[3px_3px_0px_#000] text-xl`}>
                            {domain.icon}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-blue-600 tracking-wider uppercase">
                              SPECIALIZATION BRANCH
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                              {domain.title}
                            </h3>
                          </div>
                        </div>

                        {/* Close Button inside flow */}
                        <button
                          onClick={() => setActiveDomainId(null)}
                          title="Close Domain Info"
                          className="p-1.5 bg-white hover:bg-slate-100 text-slate-800 hover:text-black border-2 border-slate-900 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold self-start sm:self-center"
                        >
                          <span>Close Domain</span>
                          <span className="text-sm font-black leading-none">×</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed mt-3 max-w-3xl">
                        {domain.longDesc}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: What Students Explore & Tech Stack */}
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            What Students Explore
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {domain.explore.map((point, idx) => (
                              <li key={idx} className="text-xs text-slate-600 flex items-center gap-2 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            <Code className="w-4 h-4 text-emerald-600" />
                            Technology Stack
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {domain.tech.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-300 text-[11px] font-mono font-bold transition-all shadow-[1px_1px_0px_#000]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Learning Path & Project Applications */}
                      <div className="space-y-6">
                        {/* Learning Path Flow */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            <Compass className="w-4 h-4 text-purple-600" />
                            Learning Roadmap
                          </h4>
                          
                          {/* Desktop Horizontal Learning Path */}
                          <div className="hidden sm:flex flex-wrap items-center gap-2 p-4 bg-slate-50 border border-slate-300 rounded-sm">
                            {domain.learningPath.map((step, idx) => (
                              <React.Fragment key={idx}>
                                <div className="flex flex-col items-center">
                                  <span className="px-2.5 py-1 bg-white border border-slate-400 text-[10px] font-mono font-bold text-slate-700 shadow-[1px_1px_0px_#000]">
                                    {step}
                                  </span>
                                </div>
                                {idx < domain.learningPath.length - 1 && (
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 animate-pulse" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          {/* Mobile Vertical Learning Path */}
                          <div className="flex sm:hidden flex-col gap-2 p-3 bg-slate-50 border border-slate-300 rounded-sm">
                            {domain.learningPath.map((step, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-mono font-bold shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="text-[11px] font-mono font-bold text-slate-700">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Project Applications */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-amber-600" />
                            Where It Can Be Applied
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {domain.applications.map((app, idx) => (
                              <div key={idx} className="p-2.5 bg-slate-50 border border-slate-300 text-xs font-mono font-bold text-slate-700 flex items-center gap-2 shadow-[1px_1px_0px_#000]">
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                <span>{app}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cross-Domain Collaboration */}
                    <div className="border-t-2 border-slate-200 pt-6 mt-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <Layers className="w-4 h-4 text-blue-600" />
                          Built Together (Cross-Domain Collaboration)
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 max-w-2xl font-medium">
                          Real-world projects often combine multiple domains. A single project may involve UI/UX, Full Stack Development, AI, Data Science, Cloud and Cybersecurity.
                        </p>
                      </div>

                      {/* Visual Connection Flowchart */}
                      <div className="p-4 bg-blue-50/40 border-2 border-blue-600/20 rounded-sm">
                        <div className="text-[9px] font-mono font-extrabold text-blue-800 uppercase tracking-widest mb-3">
                          DIFFERENT DOMAINS. ONE ECOSYSTEM.
                        </div>
                        
                        {/* Connection Graph flow */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          {[
                            { label: "UI/UX & Design", color: "border-amber-400 text-amber-800 bg-amber-50" },
                            { label: "Full Stack Dev", color: "border-blue-400 text-blue-800 bg-blue-50" },
                            { label: "AI & Data", color: "border-purple-400 text-purple-800 bg-purple-50" },
                            { label: "Cloud & DevOps", color: "border-cyan-400 text-cyan-800 bg-cyan-50" },
                            { label: "Cybersecurity", color: "border-rose-400 text-rose-800 bg-rose-50" }
                          ].map((node, nIdx) => (
                            <React.Fragment key={nIdx}>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={`px-3 py-1.5 border-2 border-slate-900 font-mono text-[10px] font-bold text-center shadow-[2px_2px_0px_#000] w-full sm:w-auto ${node.color}`}
                              >
                                {node.label}
                              </motion.div>
                              {nIdx < 4 && (
                                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 rotate-90 sm:rotate-0" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================================================================== */}
      {/* 5. STUDENT GROWTH JOURNEY                                          */}
      {/* ================================================================== */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="From Learner to Builder"
            as="h2"
            className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
          />
          <p className="text-xs sm:text-sm text-slate-500 font-mono font-bold uppercase">
            THE SEQUENTIAL VALUE PIPELINE FOR CLUB MEMBERS
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {growthSteps.map((step, idx) => (
            <div
              key={step.num}
              className="p-6 bg-white border-2 border-slate-900 shadow-[5px_5px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all relative"
            >
              {/* Step Number Badge */}
              <div className="absolute top-4 right-4 text-3xl font-black font-mono text-slate-200">
                {step.num}
              </div>

              <div className="space-y-3 pt-4">
                <div className="w-12 h-12 bg-slate-50 border border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  {step.icon}
                </div>
                <h4 className="text-base font-black text-slate-900">{step.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. PRINCIPAL'S MESSAGE                                             */}
      {/* ================================================================== */}
      <section className="space-y-6">
        <div className="text-left space-y-1">
          <InteractiveHeading
            text="Message from the Principal"
            as="h2"
            className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
          {/* Photograph Col */}
          <div className="md:col-span-4 bg-slate-100 border-b-2 md:border-b-0 md:border-r-2 border-slate-900 min-h-[250px] relative flex items-center justify-center overflow-hidden">
            <img
              src={principalConfig.avatar}
              alt={principalConfig.name}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Profile & Message Col */}
          <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-blue-600/30" />
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed font-semibold font-mono">
                {principalConfig.message}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="text-base font-black text-slate-900">{principalConfig.name}</h4>
              <p className="text-xs text-blue-600 font-mono font-bold">{principalConfig.role}</p>
              <p className="text-[11px] text-slate-500 font-mono">{principalConfig.institution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. FUTURE SCOPE                                                    */}
      {/* ================================================================== */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="Where Coderithum Is Going"
            as="h2"
            className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
          />
          <span className="inline-flex px-3 py-1 bg-purple-100 text-purple-900 text-xs font-mono font-bold border border-purple-300 uppercase">
            Planned Growth & Vision
          </span>
        </div>

        {/* Futuristic Roadmap Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {futurePhases.map((phase, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-950 text-slate-200 border-2 border-slate-900 shadow-[5px_5px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000] transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-extrabold text-purple-400 bg-purple-950 border border-purple-900 px-2.5 py-0.5">
                    {phase.phase}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Planned</span>
                </div>
                <h4 className="text-sm font-black text-white">{phase.title}</h4>
                <ul className="space-y-1.5 pt-2 border-t border-slate-800">
                  {phase.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-[11px] text-slate-400 flex items-start gap-1.5 font-medium leading-relaxed">
                      <span className="text-purple-400">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. OUR VISION                                                      */}
      {/* ================================================================== */}
      <section className="p-8 sm:p-12 bg-slate-900 text-white border-2 border-slate-900 shadow-[10px_10px_0px_#000] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="space-y-4 max-w-3xl mx-auto relative z-10">
          <span className="text-[10px] font-mono font-extrabold text-blue-400 bg-blue-950/80 border border-blue-900 px-3 py-1 inline-block uppercase tracking-widest">
            OUR VISION
          </span>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-relaxed">
            &quot;To build a student-led technology ecosystem where every learner gets the opportunity to learn, build, collaborate and create meaningful impact.&quot;
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-medium leading-relaxed pt-2">
            Coderithum aims to grow beyond a technical club into a platform where students can transform ideas 
            into projects, projects into solutions, and solutions into meaningful opportunities.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. OUR VALUES                                                      */}
      {/* ================================================================== */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="Our Values"
            as="h2"
            className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight"
          />
          <p className="text-xs sm:text-sm text-slate-500 font-mono font-bold uppercase">
            THE FOUR CORE PILLARS OF OUR TECH CLUB
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {valueItems.map((val, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border-2 border-slate-900 shadow-[5px_5px_0px_#000] flex flex-col justify-between space-y-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-black text-slate-900">{val.title}</h4>
                  <span className="text-[10px] font-mono font-extrabold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5">
                    VALUE 0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. CALL TO ACTION                                                 */}
      {/* ================================================================== */}
      <section className="p-8 sm:p-12 bg-white border-2 border-slate-900 text-center space-y-6 shadow-[10px_10px_0px_#000] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />

        <div className="space-y-3 max-w-2xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 text-xs font-mono font-bold border border-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> BE PART OF THE CODERITHUM JOURNEY
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to Code, Build & Connect?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Whether you want to learn, build, compete, collaborate or innovate, Coderithum gives you a place to start.
          </p>
        </div>

        {/* 3 Neo-Brutalist CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
          <button
            onClick={() => setView?.("projects")}
            className="px-6 py-3 bg-blue-600 text-white border-2 border-slate-900 text-xs sm:text-sm font-mono font-black shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Rocket className="w-4 h-4" /> Explore Projects
          </button>

          <button
            onClick={() => setView?.("events")}
            className="px-6 py-3 bg-emerald-500 text-slate-900 border-2 border-slate-900 text-xs sm:text-sm font-mono font-black shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" /> View Events
          </button>

          <button
            onClick={() => setView?.("contact")}
            className="px-6 py-3 bg-white text-slate-900 border-2 border-slate-900 text-xs sm:text-sm font-mono font-black shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center gap-2 cursor-pointer"
          >
            Join Coderithum <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}
