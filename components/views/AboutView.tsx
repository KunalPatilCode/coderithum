import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github } from "../Icons";
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
  Trophy
} from "lucide-react";
import { TeamMember, getMemberAvatarStyle } from "../../types";
import InteractiveHeading from "../InteractiveHeading";
import AnimatedCounter from "../AnimatedCounter";

interface AboutViewProps {
  team: TeamMember[];
  setView?: (view: string) => void;
}

// ----------------------------------------------------------------------
// CLI Terminal Simulation Commands & Data
// ----------------------------------------------------------------------
interface CommandTab {
  id: string;
  filename: string;
  command: string;
}

const terminalCommands: CommandTab[] = [
  { id: "about", filename: "about.sh", command: "./about.sh --verbose" },
  { id: "stats", filename: "stats.json", command: "cat stats.json" },
  { id: "stack", filename: "stack.config", command: "npx coderithum info --stack" },
  { id: "mission", filename: "mission.log", command: "tail -n 20 mission.log" },
  { id: "manifesto", filename: "manifesto.md", command: "cat manifesto.md" },
];

// ----------------------------------------------------------------------
// Technical Ecosystem Matrix Data (8 Domains)
// ----------------------------------------------------------------------
interface DomainTrack {
  id: string;
  title: string;
  icon: string;
  badge: string;
  motto: string;
  desc: string;
  tech: string[];
  projects: string[];
  pathway: string[];
  leadRole: string;
}

const domainTracks: DomainTrack[] = [
  {
    id: "ai",
    title: "AI & GenAI",
    icon: "🤖",
    badge: "DEEP LEARNING",
    motto: "Autonomous Edge Intelligence & Generative AI Systems",
    desc: "Focuses on deep learning architectures, fine-tuning open LLMs, computer vision algorithms, and deploying low-latency inference models on edge compute.",
    tech: ["PyTorch", "Hugging Face", "LangChain", "OpenCV", "TensorFlow", "Ollama", "Python"],
    projects: ["Campus AI Assist", "Solar Grid Defect Inspector", "Automated Attendance AI"],
    pathway: ["Tensor Math & Python Fundamentals", "Neural Network Architectures", "LLM Fine-Tuning & Quantization", "Production Edge Deployment"],
    leadRole: "AI Research Lead"
  },
  {
    id: "fullstack",
    title: "Full Stack Dev",
    icon: "💻",
    motto: "High-Throughput Modern Web & Cloud Architectures",
    badge: "WEB & API SYSTEMS",
    desc: "Crafting scalable, accessible web portals and distributed micro-services with Next.js, React, Node.js, and PostgreSQL using clean decoupled architecture.",
    tech: ["React 19", "Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "GraphQL"],
    projects: ["Coderithum Tech Portal v2", "GEC Student Workstation", "Hackathon Management Platform"],
    pathway: ["Modern ES6+ & DOM Engineering", "TypeScript & Complex State Engines", "RESTful & GraphQL Service Design", "Edge Serverless Deployment"],
    leadRole: "Full Stack Domain Lead"
  },
  {
    id: "mobile",
    title: "Mobile App Dev",
    icon: "📱",
    badge: "CROSS PLATFORM",
    motto: "Cross-Platform Native Engineering for iOS & Android",
    desc: "Designing responsive, offline-first cross-platform mobile experiences using Flutter and React Native integrated with real-time backend sync.",
    tech: ["Flutter", "React Native", "Dart", "Swift", "Kotlin", "Firebase Sync", "SQLite"],
    projects: ["Campus Bus Tracker App", "Student Event Companion", "Attendance QR Scanner"],
    pathway: ["UI Layouts & Micro-Animations", "State Management (Bloc/Zustand)", "Native Hardware API Binding", "App Store Pipeline Release"],
    leadRole: "Mobile Domain Lead"
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "☁️",
    badge: "GITOPS & INFRA",
    motto: "Infrastructure as Code & Automated CI/CD Pipelines",
    desc: "Automating cloud infrastructure provisioning, container orchestration, zero-downtime deployment pipelines, and cluster monitoring across AWS and Docker.",
    tech: ["AWS EC2/S3", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Nginx", "Prometheus"],
    projects: ["Incubator Automated CI/CD Engine", "GEC Portal High-Availability Cluster", "Telemetry Log Pipeline"],
    pathway: ["Linux Systems Administration", "Containerization Mastery", "GitOps CI/CD Automation", "Kubernetes Cluster Security"],
    leadRole: "Cloud & DevOps Lead"
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: "🔒",
    badge: "DEFENSIVE & AUDIT",
    motto: "Penetration Testing, Auditing & Offensive CTF Operations",
    desc: "Auditing application security posture, discovering vulnerabilities, running CTF competitions, and securing campus network perimeters.",
    tech: ["Burp Suite", "Kali Linux", "Wireshark", "OWASP Top 10", "Metasploit", "Python Exploits", "Cryptography"],
    projects: ["Campus Infrastructure Pen-Test Audit", "CTF Training Laboratory", "Vulnerability Bot Scanner"],
    pathway: ["Network Protocols & Linux Internals", "Web App Vulnerability Analysis", "Binary Exploitation & Crypto", "Enterprise Security Audit"],
    leadRole: "Cybersecurity Lead"
  },
  {
    id: "uiux",
    title: "UI/UX & Design",
    icon: "🎨",
    badge: "SYSTEMS & BRAND",
    motto: "Human-Centered Design Systems & Brutalist Aesthetics",
    desc: "Transforming complex workflows into intuitive, vibrant visual interfaces using design tokens, wireframing, interactive prototypes, and micro-interactions.",
    tech: ["Figma", "Design Tokens", "Framer Motion", "Storybook", "Adobe CC", "Accessibility (a11y)"],
    projects: ["Coderithum Brutalist Design System", "GEC Library Interface Overhaul", "Event Portal Design Spec"],
    pathway: ["User Research & Wireframing", "Design System Tokenization", "Interactive Prototyping", "Design System Documentation"],
    leadRole: "UI/UX Design Lead"
  },
  {
    id: "datascience",
    title: "Data Science",
    icon: "📊",
    badge: "ANALYTICS & ML",
    motto: "Predictive Analytics, Data Pipelines & Insights",
    desc: "Extracting actionable insights from complex datasets, constructing machine learning pipelines, and engineering interactive data visualization dashboards.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "SQL", "Tableau"],
    projects: ["Academic Performance Analytics", "Campus Placement Predictor", "Solar Yield Forecasting Model"],
    pathway: ["Exploratory Data Analysis", "Statistical Modeling & Hypothesis Testing", "Machine Learning Pipelines", "Production Analytics Dashboards"],
    leadRole: "Data Science Lead"
  },
  {
    id: "incubator",
    title: "Incubator Ops",
    icon: "🛠️",
    badge: "VENTURES & IPR",
    motto: "Product Management, IPR Patents & Student Venture Growth",
    desc: "Guiding student software projects from concept validation to intellectual property filing, agile sprint management, and venture pitch mentorship.",
    tech: ["Agile/Scrum", "Jira", "Product Specs", "IPR & Patents", "Pitch Decks", "Growth Analytics"],
    projects: ["Student Startup Acceleration Program", "IPR Patent Registration Drive", "Annual Incubator Showcase"],
    pathway: ["Problem Discovery & Product Spec", "Agile Sprint Management", "Patent & Licensing Strategy", "Investor & Venture Presentation"],
    leadRole: "Incubator Operations Lead"
  }
];

// ----------------------------------------------------------------------
// Dynamic Timeline Stepper Data
// ----------------------------------------------------------------------
const timelineMilestones = [
  {
    year: "2024",
    tag: "ORIGIN & FOUNDATION",
    title: "Club Conception & Founding at GEC Daman",
    desc: "Established at Government Engineering College (GEC) Daman by open-source enthusiasts to bridge classroom theory with production software development.",
    achievements: [
      "Inaugural cohort of 35 dedicated student developers",
      "Formed initial 4 core technical domain sub-divisions",
      "Conducted institute-wide Git & Linux CLI bootcamps"
    ],
    highlight: "From 5 founders in a computer lab to a recognized institute tech ecosystem."
  },
  {
    year: "2025",
    tag: "NATIONAL RECOGNITION",
    title: "Smart India Hackathon Regional Triumph",
    desc: "Core developer team secured 1st place in Smart India Hackathon Regional Selection for an automated solar grid telemetry solution.",
    achievements: [
      "SIH 2025 Regional Champion Gold Trophy",
      "Deployed 5 campus utility applications to production",
      "Expanded active club membership to 90+ student coders"
    ],
    highlight: "Validating GEC Daman's technical prowess on a national competitive stage."
  },
  {
    year: "2026",
    tag: "PORTAL & INCUBATOR",
    title: "Next-Gen Tech Portal & 8-Domain Scale",
    desc: "Launched the unified Coderithum Tech Portal, expanded into 8 specialized domain divisions, and established the Student Project Incubator.",
    achievements: [
      "Unified Tech Portal v2 production release",
      "8 active domain tracks with dedicated mentor leads",
      "1,400+ monthly GitHub commits across active repositories"
    ],
    highlight: "Achieving full production velocity with automated CI/CD and student incubations."
  },
  {
    year: "2027",
    tag: "FUTURE VISION",
    title: "National Open-Source & Innovation Foundation",
    desc: "Scaling Coderithum into an inter-collegiate incubator network, publishing research papers, and hosting the inaugural Daman DevCon.",
    achievements: [
      "Targeting 300+ active student contributors",
      "Filing 5+ student software patents/IPR registrations",
      "Establishing Daman DevCon annual hackathon"
    ],
    highlight: "Setting a benchmark for student-driven software engineering excellence in Western India."
  }
];

// ----------------------------------------------------------------------
// Core Values Data
// ----------------------------------------------------------------------
const coreValuesData = [
  {
    id: "impact",
    icon: "🎯",
    title: "Build for Real-World Impact",
    summary: "Every project built targets genuine problem statements for our college, local industries, or digital communities.",
    culture: "We prioritize solving real user problems over writing vanity code. If it doesn't solve a real issue, we iterate until it does.",
    enforcement: "Mandatory user validation, production deployment, and telemetry tracking for all incubator projects."
  },
  {
    id: "quality",
    icon: "🛠️",
    title: "Code Quality & Architecture",
    summary: "We enforce strict TypeScript standards, clean modular architecture, systematic Git workflows, and automated testing.",
    culture: "Code is read far more often than it is written. We take pride in clean abstractions, readable commits, and zero dead code.",
    enforcement: "Strict TypeScript rules, ESLint enforcement, 100% peer code reviews, and automated CI/CD test gates."
  },
  {
    id: "mentorship",
    icon: "🤝",
    title: "Inclusivity & Peer Mentorship",
    summary: "We welcome developers of all skill levels. Senior leads actively pair program with beginners to accelerate growth.",
    culture: "No developer is left behind. Ego is checked at the door, and learning is a collaborative team sport.",
    enforcement: "Weekly 1-on-1 pair programming sprints, beginner-friendly Git labs, and open office hours."
  },
  {
    id: "curiosity",
    icon: "🚀",
    title: "Continuous Curiosity",
    summary: "Technology evolves rapidly. We constantly explore bleeding-edge tools, frameworks, and engineering paradigms.",
    culture: "We foster an environment where experimentation is celebrated and failure is viewed as valuable technical telemetry.",
    enforcement: "Bi-weekly Tech Radar sessions, monthly spike projects, and rapid prototyping hackathons."
  }
];

export default function AboutView({ team, setView }: AboutViewProps) {
  // Terminal Simulator State
  const [activeTab, setActiveTab] = useState<string>("about");
  const [typedCmd, setTypedCmd] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Ecosystem Matrix State
  const [activeDomainId, setActiveDomainId] = useState<string>("ai");

  // Timeline Stepper State
  const [activeYear, setActiveYear] = useState<string>("2026");

  // Core Values Interactive View State (culture vs enforcement)
  const [valueViewMode, setValueViewMode] = useState<"culture" | "enforcement">("culture");

  // Typing animation effect when terminal tab changes
  useEffect(() => {
    const target = terminalCommands.find((c) => c.id === activeTab)?.command || "";
    setTypedCmd("");
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < target.length) {
        setTypedCmd(target.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleCopyCmd = () => {
    const cmdStr = terminalCommands.find((c) => c.id === activeTab)?.command || "";
    navigator.clipboard.writeText(cmdStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Faculty filtering with fallback
  const rawFaculty = team ? team.filter((t) => t.category === "Faculty") : [];
  const facultyMembers = rawFaculty.length > 0 ? rawFaculty : [
    {
      name: "Dr. Avinash R. Chaudhari",
      role: "Principal & Chief Patron",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Mrs. Hemali J. Damania",
      role: "Faculty Coordinator & Asst. Professor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Ms. Dipika Ganpat Damania",
      role: "Faculty Advisor & Asst. Professor",
      avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80",
      linkedin: "https://linkedin.com",
    }
  ];

  const facultyFocusMap: Record<string, string[]> = {
    "Dr. Avinash R. Chaudhari": ["Distributed Systems", "Academic Research", "Institute Strategy"],
    "Mrs. Hemali J. Damania": ["Cloud Architecture", "Fullstack Systems", "Incubator Mentorship"],
    "Ms. Dipika Ganpat Damania": ["Algorithms & DSA", "Data Engineering", "Student Guidance"],
  };

  const facultyQuoteMap: Record<string, string> = {
    "Dr. Avinash R. Chaudhari": "Empowering GEC Daman students to bridge academic theory with industry-grade engineering.",
    "Mrs. Hemali J. Damania": "Fostering an open-source technical culture where student projects launch into real production.",
    "Ms. Dipika Ganpat Damania": "Guiding future software leaders to write clean code, solve hard problems, and inspire peers.",
  };

  const activeDomain = domainTracks.find((d) => d.id === activeDomainId) || domainTracks[0];
  const activeMilestone = timelineMilestones.find((m) => m.year === activeYear) || timelineMilestones[2];

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-20 max-w-6xl mx-auto pb-12"
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. Cyber Hero Banner & Interactive CLI Terminal Simulator           */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-8">
        {/* Banner Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-100 text-blue-900 text-xs font-mono font-bold rounded-none border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
            <Zap className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>EST. 2024 • GEC DAMAN</span>
          </div>

          <div>
            <InteractiveHeading
              text="Who We Are"
              as="h2"
              className="text-xs font-mono tracking-widest text-blue-600 uppercase"
            />
            <div>
              <InteractiveHeading
                text="About Coderithum Ecosystem"
                as="h1"
                className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1"
              />
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            <strong>Coderithum</strong> is the premier student developer & innovation ecosystem at{" "}
            <strong>Government Engineering College (GEC) Daman</strong>. Operating under the Computer
            Engineering Department, we empower engineering students to build production cloud apps,
            AI pipelines, and open-source software.
          </p>
        </div>

        {/* Interactive CLI Terminal Simulator */}
        <div className="bg-slate-950 border-2 border-slate-900 rounded-none shadow-[8px_8px_0px_#000] overflow-hidden text-mono font-mono text-xs sm:text-sm text-slate-200">
          {/* Terminal Window Header Bar */}
          <div className="bg-slate-900 border-b-2 border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-700" />
              <span className="ml-2 text-[11px] text-slate-400 font-mono hidden sm:inline">
                coderithum-cli v2.4.0 — zsh — 80x24
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                SYSTEM_STATUS: ONLINE
              </span>
              <button
                onClick={handleCopyCmd}
                title="Copy Command"
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Clickable Command Tabs */}
          <div className="bg-slate-900/60 border-b border-slate-800 px-3 py-1.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {terminalCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => setActiveTab(cmd.id)}
                className={`px-3 py-1 text-[11px] font-mono border transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === cmd.id
                    ? "bg-blue-600 text-white border-blue-400 shadow-[2px_2px_0px_#000]"
                    : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {cmd.filename}
              </button>
            ))}
          </div>

          {/* Terminal Screen Body */}
          <div className="p-5 sm:p-6 space-y-4 font-mono leading-relaxed min-h-[220px]">
            {/* Prompt line with typing effect */}
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="text-emerald-400">coderithum@gecdaman:~$</span>
              <span className="text-white">{typedCmd}</span>
              {isTyping && <span className="w-2 h-4 bg-emerald-400 animate-pulse" />}
            </div>

            {/* Rendered Output based on activeTab */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="pt-2 text-slate-300 space-y-2 text-xs sm:text-sm"
              >
                {activeTab === "about" && (
                  <div className="space-y-1.5 text-slate-300">
                    <p className="text-emerald-400 font-bold">[OK] Initializing Coderithum Core Subsystems...</p>
                    <p><span className="text-cyan-400">Organization  :</span> Coderithum Tech & Innovation Club</p>
                    <p><span className="text-cyan-400">Institution   :</span> Government Engineering College (GEC) Daman</p>
                    <p><span className="text-cyan-400">Department    :</span> Computer Engineering Division</p>
                    <p><span className="text-cyan-400">Affiliation   :</span> GTU / UT Administration of DNH & DD</p>
                    <p><span className="text-cyan-400">Active Cohort :</span> 150+ Student Developers across 8 Domains</p>
                    <p className="text-yellow-400 pt-1">⚡ Mission: Bridge textbook theory with production software pipelines and competitive excellence.</p>
                  </div>
                )}

                {activeTab === "stats" && (
                  <div className="text-emerald-400">
                    <pre className="overflow-x-auto text-[11px] sm:text-xs">
{`{
  "active_student_developers": 150,
  "production_live_deployments": 24,
  "national_hackathon_awards": 15,
  "monthly_git_commits": 1420,
  "specialized_domain_tracks": 8,
  "peer_code_reviews_completed": 480,
  "incubator_sprint_velocity": "94%",
  "system_uptime": "99.9%"
}`}
                    </pre>
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="space-y-1.5">
                    <p className="text-blue-400 font-bold">// Coderithum Production Engineering Stack</p>
                    <p><span className="text-purple-400">Frontend     :</span> React 19, Next.js 15, TypeScript, TailwindCSS v4, Framer Motion</p>
                    <p><span className="text-purple-400">Backend      :</span> Node.js, Express, Python PyTorch, Go Microservices, GraphQL</p>
                    <p><span className="text-purple-400">Databases    :</span> PostgreSQL, Redis, MongoDB, SQLite</p>
                    <p><span className="text-purple-400">DevOps/Cloud :</span> AWS EC2/S3, Docker Containers, Kubernetes, GitHub Actions CI/CD</p>
                    <p><span className="text-purple-400">Security     :</span> OWASP Penetration Auditing, Burp Suite, CTF Cyber Labs</p>
                  </div>
                )}

                {activeTab === "mission" && (
                  <div className="space-y-1 text-slate-300 text-[11px] sm:text-xs">
                    <p className="text-slate-500">[2024-08-01 10:00:00] INITIAL_COMMIT: Coderithum founded at GEC Daman lab.</p>
                    <p className="text-slate-400">[2025-03-12 14:30:00] HACKATHON_WIN: 1st Prize @ Smart India Hackathon Regionals.</p>
                    <p className="text-slate-300">[2026-01-10 09:15:00] DEPLOYMENT: V2 Portal & Student Incubator Pipeline live.</p>
                    <p className="text-emerald-400">[2026-08-11 20:20:00] RUNTIME_STATUS: All 8 domain subtrees active & pushing code.</p>
                  </div>
                )}

                {activeTab === "manifesto" && (
                  <div className="space-y-2 border-l-2 border-emerald-500 pl-3 py-1">
                    <p className="text-white font-bold"># Coderithum Engineering Manifesto</p>
                    <p className="italic text-yellow-300">"Theory without code is abstract; Code without architecture is fragile."</p>
                    <ul className="space-y-1 text-[11px] sm:text-xs text-slate-300">
                      <li>1. <span className="text-emerald-400 font-bold">Zero Monoliths:</span> Build modular, decoupled micro-architectures.</li>
                      <li>2. <span className="text-emerald-400 font-bold">Open Source First:</span> Internal tools are open to the student community.</li>
                      <li>3. <span className="text-emerald-400 font-bold">Production Grade:</span> Strict TypeScript, 100% peer code reviews & automated CI/CD.</li>
                      <li>4. <span className="text-emerald-400 font-bold">Peer Mentorship:</span> Senior leads pair program with incoming students daily.</li>
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Asymmetrical Neo-Brutalist Bento Grid                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="Metrics & Impact"
            as="h2"
            className="text-xs font-mono tracking-widest text-blue-600 uppercase"
          />
          <div>
            <InteractiveHeading
              text="Our Engineering Metrics"
              as="h3"
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
            />
          </div>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Bento Card 1: Large Counter + Domain Breakdown (Span 2) */}
          <div className="md:col-span-2 p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 uppercase">
                  ACTIVE COMMUNITY
                </span>
                <h4 className="text-lg font-black text-slate-900">Student Developer Cohort</h4>
              </div>
              <Users className="w-6 h-6 text-blue-600 shrink-0" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-blue-600 font-mono">
                <AnimatedCounter target={150} />+
              </span>
              <span className="text-xs text-slate-500 font-mono uppercase font-bold">Active Coders @ GEC Daman</span>
            </div>

            {/* Domain Breakdown Progress Bar */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="flex justify-between text-[11px] font-mono text-slate-600 font-bold">
                <span>Domain Composition</span>
                <span>100% Student Driven</span>
              </div>
              <div className="h-3 w-full bg-slate-100 border border-slate-900 flex overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: "45%" }} title="Web & API (45%)" />
                <div className="h-full bg-emerald-500" style={{ width: "25%" }} title="AI & ML (25%)" />
                <div className="h-full bg-purple-500" style={{ width: "15%" }} title="Mobile (15%)" />
                <div className="h-full bg-amber-500" style={{ width: "15%" }} title="Cloud & Cyber (15%)" />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-slate-500 pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-600 inline-block" /> Web (45%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 inline-block" /> AI/ML (25%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 inline-block" /> Mobile (15%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 inline-block" /> DevOps/Cyber (15%)</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Live Production Systems (Span 1) */}
          <div className="p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <Server className="w-6 h-6 text-emerald-600" />
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE
              </span>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900 font-mono">
                <AnimatedCounter target={20} />+
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">Production Systems</div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">Campus tools & open-source portals deployed.</p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 99.9% Cloud Uptime SLA
            </div>
          </div>

          {/* Bento Card 3: Hackathon Awards & Recognition (Span 1) */}
          <div className="p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <Award className="w-6 h-6 text-amber-500" />
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-mono font-bold">
                SIH '25 WINNERS
              </span>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900 font-mono">
                <AnimatedCounter target={15} />+
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">Hackathon Trophies</div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">Smart India Hackathon & GTU Techfests.</p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-amber-700 font-bold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" /> Regional Selection 1st Prize
            </div>
          </div>

          {/* Bento Card 4: Incubator Lab Velocity (Span 2) */}
          <div className="md:col-span-2 p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5">
                  INCUBATOR VELOCITY
                </span>
                <h4 className="text-sm font-black text-slate-900">Sprint Delivery Pipeline</h4>
              </div>
              <Activity className="w-5 h-5 text-purple-600" />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center py-2 bg-slate-50 border border-slate-200 p-3">
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono">94%</div>
                <div className="text-[9px] font-mono text-slate-500 uppercase font-bold">Sprint Pace</div>
              </div>
              <div className="border-x border-slate-300">
                <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono">1,420</div>
                <div className="text-[9px] font-mono text-slate-500 uppercase font-bold">Commits / Mo</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono">480+</div>
                <div className="text-[9px] font-mono text-slate-500 uppercase font-bold">PR Reviews</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 leading-relaxed">
              Automated CI/CD pipelines trigger unit tests and static code audits for every pull request merged into our GitHub organization.
            </div>
          </div>

          {/* Bento Card 5: Technical Ecosystem Spotlight (Span 2) */}
          <div className="md:col-span-1 lg:col-span-2 p-6 bg-slate-900 text-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-black text-white">8 Technical Domains</h4>
              </div>
              <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold">
                SPECIALIZED
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              From low-level C++ embedded AI systems to high-concurrency Node.js web backends, our club operates across 8 specialized developer divisions.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {domainTracks.map((d) => (
                <span
                  key={d.id}
                  onClick={() => setActiveDomainId(d.id)}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 text-[10px] font-mono cursor-pointer transition-colors"
                >
                  {d.icon} {d.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Interactive Technical Ecosystem Matrix (8 Domains)               */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="Technical Ecosystem"
            as="h2"
            className="text-xs font-mono tracking-widest text-blue-600 uppercase"
          />
          <div>
            <InteractiveHeading
              text="8 Specialization Divisions"
              as="h3"
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Select a technical domain below to inspect core tech stacks, active production projects, and mastery pathways.
          </p>
        </div>

        {/* 8 Domain Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {domainTracks.map((domain) => {
            const isSelected = domain.id === activeDomainId;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id)}
                className={`p-3 border-2 border-slate-900 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-slate-900 hover:bg-slate-50 shadow-[2px_2px_0px_#000]"
                }`}
              >
                <span className="text-2xl">{domain.icon}</span>
                <span className="text-xs font-black truncate w-full">{domain.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Deep-Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_#000] space-y-6"
          >
            {/* Domain Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-3 bg-blue-50 border-2 border-slate-900 shadow-[3px_3px_0px_#000]">
                  {activeDomain.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-900 text-[10px] font-mono font-bold border border-blue-300 uppercase">
                      {activeDomain.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-bold">{activeDomain.leadRole}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{activeDomain.title}</h4>
                </div>
              </div>

              <div className="text-right sm:text-right text-xs font-mono text-blue-600 font-bold bg-blue-50 px-3 py-1.5 border border-blue-200">
                {activeDomain.motto}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {activeDomain.desc}
            </p>

            {/* 3-Column Content Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Tech Stack Column */}
              <div className="space-y-3 p-4 bg-slate-50 border border-slate-300">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase">
                  <Code className="w-4 h-4 text-blue-600" /> Core Tech Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDomain.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white border border-slate-400 text-[11px] font-mono font-semibold text-slate-800 shadow-[1px_1px_0px_#000]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Projects Column */}
              <div className="space-y-3 p-4 bg-slate-50 border border-slate-300">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase">
                  <Rocket className="w-4 h-4 text-blue-600" /> Key Projects
                </div>
                <ul className="space-y-1.5">
                  {activeDomain.projects.map((p, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 font-medium">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mastery Pathway Column */}
              <div className="space-y-3 p-4 bg-slate-50 border border-slate-300">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Skill Roadmap
                </div>
                <div className="space-y-1.5 text-[11px] font-mono text-slate-700">
                  {activeDomain.pathway.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Dynamic Timeline Stepper                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="Evolution"
            as="h2"
            className="text-xs font-mono tracking-widest text-blue-600 uppercase"
          />
          <div>
            <InteractiveHeading
              text="Our Journey & Milestones"
              as="h3"
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Click on milestone years to trace Coderithum's growth from a student initiative to a national hackathon champion.
          </p>
        </div>

        {/* Year Stepper Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
          {timelineMilestones.map((m) => {
            const isActive = m.year === activeYear;
            return (
              <button
                key={m.year}
                onClick={() => setActiveYear(m.year)}
                className={`px-5 py-2.5 border-2 border-slate-900 font-mono font-black text-sm transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-slate-900 hover:bg-slate-50 shadow-[2px_2px_0px_#000]"
                }`}
              >
                <span>{m.year}</span>
                <span className="text-[10px] font-normal opacity-85 hidden sm:inline">({m.tag.split(" ")[0]})</span>
              </button>
            );
          })}
        </div>

        {/* Active Milestone Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.year}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_#000] space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-black text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 uppercase">
                  {activeMilestone.tag}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{activeMilestone.title}</h4>
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-slate-300">
                {activeMilestone.year}
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {activeMilestone.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Key Deliverables & Achievements */}
              <div className="space-y-3 p-4 bg-slate-50 border border-slate-300">
                <div className="text-xs font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Deliverables & Milestones
                </div>
                <ul className="space-y-2">
                  {activeMilestone.achievements.map((ach, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlight Quote */}
              <div className="p-4 bg-blue-50 border-2 border-blue-600/30 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <Quote className="w-6 h-6 text-blue-600 opacity-60" />
                  <p className="text-xs sm:text-sm font-bold text-slate-900 italic leading-relaxed">
                    "{activeMilestone.highlight}"
                  </p>
                </div>
                <div className="text-[10px] font-mono text-blue-800 font-bold uppercase tracking-wider">
                  — Coderithum Leadership Log {activeMilestone.year}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Core Engineering Values (Interactive View Mode Toggle)           */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <InteractiveHeading
            text="Our Culture & Standards"
            as="h2"
            className="text-xs font-mono tracking-widest text-blue-600 uppercase"
          />
          <div>
            <InteractiveHeading
              text="Core Engineering Values"
              as="h3"
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
            />
          </div>

          {/* Toggle View Mode Button */}
          <div className="inline-flex p-1 bg-slate-100 border-2 border-slate-900 shadow-[3px_3px_0px_#000] text-xs font-mono font-bold mt-2">
            <button
              onClick={() => setValueViewMode("culture")}
              className={`px-4 py-1.5 transition-all cursor-pointer ${
                valueViewMode === "culture"
                  ? "bg-blue-600 text-white shadow-[2px_2px_0px_#000]"
                  : "text-slate-700 hover:text-black"
              }`}
            >
              Philosophy & Culture
            </button>
            <button
              onClick={() => setValueViewMode("enforcement")}
              className={`px-4 py-1.5 transition-all cursor-pointer ${
                valueViewMode === "enforcement"
                  ? "bg-blue-600 text-white shadow-[2px_2px_0px_#000]"
                  : "text-slate-700 hover:text-black"
              }`}
            >
              Production Standards
            </button>
          </div>
        </div>

        {/* 4 Values Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValuesData.map((val) => (
            <div
              key={val.id}
              className="p-6 bg-white border-2 border-slate-900 shadow-[5px_5px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 bg-blue-50 border border-slate-900 shadow-[2px_2px_0px_#000]">
                    {val.icon}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    VALUE 0{coreValuesData.indexOf(val) + 1}
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900">{val.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {val.summary}
                </p>
              </div>

              {/* Mode-Specific Content Block */}
              <div className="pt-3 border-t-2 border-slate-100">
                {valueViewMode === "culture" ? (
                  <div className="p-3 bg-blue-50/60 border border-blue-200 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-blue-800 uppercase">PHILOSOPHY</span>
                    <p className="text-xs text-slate-700 italic font-medium">"{val.culture}"</p>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase">ENFORCEMENT</span>
                    <p className="text-xs text-slate-800 font-mono font-semibold">✓ {val.enforcement}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Faculty Leadership Showcase                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <InteractiveHeading
            text="Patrons & Advisory"
            as="h2"
            className="text-xs font-mono tracking-widest text-blue-600 uppercase"
          />
          <div>
            <InteractiveHeading
              text="Faculty Leadership"
              as="h3"
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Guided by distinguished faculty mentors at Government Engineering College Daman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facultyMembers.map((fac, idx) => {
            const focusTags = facultyFocusMap[fac.name] || ["Software Systems", "Academic Mentorship", "Engineering"];
            const quoteText = facultyQuoteMap[fac.name] || "Empowering students to build scalable software solutions.";

            return (
              <div
                key={idx}
                className="p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-4 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all text-center items-center"
              >
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-none overflow-hidden border-2 border-slate-900 shadow-[2px_2px_0px_#000] bg-slate-100 shrink-0">
                    <img src={fac.avatar} alt={fac.name} className="w-full h-full" style={getMemberAvatarStyle(fac)} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">{fac.name}</h4>
                    <p className="text-xs text-blue-600 font-mono font-bold mt-0.5">{fac.role}</p>
                    <p className="text-[11px] text-slate-500 font-mono">GEC Daman</p>
                  </div>
                </div>

                {/* Focus Tags */}
                <div className="flex flex-wrap gap-1 justify-center py-1">
                  {focusTags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 bg-slate-100 border border-slate-300 text-[10px] font-mono text-slate-700 font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quote Callout */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 text-left space-y-1 w-full">
                  <Quote className="w-3.5 h-3.5 text-blue-600" />
                  <p className="text-[11px] text-slate-700 italic leading-normal font-medium">"{quoteText}"</p>
                </div>

                {/* Social Connect Link */}
                {fac.linkedin && (
                  <a
                    href={fac.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-slate-100 hover:bg-blue-600 hover:text-white border-2 border-slate-900 text-xs font-mono font-bold transition-all shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> Connect on LinkedIn
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 7. Interactive Ecosystem CTA Banner                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-8 sm:p-12 bg-white border-2 border-slate-900 text-center space-y-6 shadow-[10px_10px_0px_#000] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />

        <div className="space-y-3 max-w-2xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 text-xs font-mono font-bold border border-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> READY TO CODE & INNOVATE?
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Join the Coderithum Ecosystem
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Whether you want to explore active open-source projects, register for upcoming hackathons, or get in touch with domain leads, take the next step.
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
            Get In Touch <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}


