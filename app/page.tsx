"use client";

import { useState, useEffect } from "react";
import logo from "../public/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code,
  Sparkles,
  Play,
  Cpu,
  Layers,
  Database,
  ArrowRight,
  Network,
  ChevronRight
} from "lucide-react";

interface NetworkNode {
  id: string;
  name: string;
  type: string;
  icon?: React.ReactNode;
  x: number;
  y: number;
  size: number;
  color?: string;
  img?: string;
  borderColor?: string;
}

interface TerminalRow {
  name?: string;
  status?: string;
  sync?: string;
  strength?: string;
  node?: string;
  rel?: string;
  target?: string;
  service?: string;
  host?: string;
  clients?: string;
  capabilities?: string;
}


// ==========================================
// Custom Integration Icons (SVGs)
// ==========================================

const CoderithumLogo = () => (
  <img src={logo.src} alt="Coderithum Logo" className="w-6 h-6 object-contain" />
);

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5a2.5 2.5 0 0 1 2.5 2.5V10H8a2.5 2.5 0 1 1 0-5z" fill="#F24E1E" />
    <path d="M13 5a2.5 2.5 0 0 1 2.5 2.5V10H13V5z" fill="#A259FF" />
    <path d="M8 10a2.5 2.5 0 0 1 2.5 2.5V15H8a2.5 2.5 0 1 1 0-5z" fill="#18A0FB" />
    <path d="M13 10a2.5 2.5 0 0 1 2.5 2.5V15H13v-5z" fill="#0ACF83" />
    <path d="M13 15V17.5a2.5 2.5 0 0 1-5 0c0-1.38 1.12-2.5 2.5-2.5H13z" fill="#19BC9C" />
  </svg>
);

const JiraIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M11.53 11.08L6.88 6.43a.62.62 0 00-.88 0L1.35 11.08a.62.62 0 000 .88l4.65 4.65c.24.24.64.24.88 0l4.65-4.65a.62.62 0 000-.88z" fill="#2684FF" />
    <path d="M22.65 11.08l-4.65-4.65a.62.62 0 00-.88 0l-4.65 4.65a.62.62 0 000 .88l4.65 4.65c.24.24.64.24.88 0l4.65-4.65c.24-.24.24-.64 0-.88z" fill="#0052CC" />
    <path d="M11.53 21.08l-4.65-4.65a.62.62 0 00-.88 0l-4.65 4.65a.62.62 0 000 .88l4.65 4.65c.24.24.64.24.88 0l4.65-4.65a.62.62 0 000-.88z" fill="#0052CC" />
  </svg>
);

const ConfluenceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M11.62 1.48a1 1 0 00-1.41 0L1.48 10.21a1 1 0 000 1.41l8.73 8.73a1 1 0 001.41 0l8.73-8.73a1 1 0 000-1.41L11.62 1.48z" fill="#0052CC" />
    <path d="M11.62 6.48a1 1 0 00-1.41 0L6.48 10.21a1 1 0 000 1.41l3.73 3.73a1 1 0 001.41 0l3.73-3.73a1 1 0 000-1.41L11.62 6.48z" fill="#2684FF" />
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10.5C5 9.67 4.33 9 3.5 9S2 9.67 2 10.5v3c0 .83.67 1.5 1.5 1.5S5 14.33 5 13.5v-3z" fill="#36C5F0" />
    <path d="M6.5 10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H3.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3z" fill="#36C5F0" />
    <path d="M10.5 5c.83 0 1.5-.67 1.5-1.5S11.33 2 10.5 2h-3C6.67 2 6 2.67 6 3.5S6.67 5 7.5 5h3z" fill="#2EB67D" />
    <path d="M10.5 6.5C11.33 6.5 12 5.83 12 5s-.67-1.5-1.5-1.5v3c0 .83.67 1.5 1.5 1.5z" fill="#2EB67D" />
    <path d="M19 13.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5S19 9.67 19 10.5v3z" fill="#E01E5A" />
    <path d="M17.5 13.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-3z" fill="#E01E5A" />
    <path d="M13.5 19c-.83 0-1.5.67-1.5 1.5S12.67 22 13.5 22h3c.83 0 1.5-.67 1.5-1.5S17.33 19 16.5 19h-3z" fill="#ECB22E" />
    <path d="M13.5 17.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5v-3c0-.83-.67-1.5-1.5-1.5z" fill="#ECB22E" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const GoogleDriveIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.2 16.5l3.8-6.6h12l-3.8 6.6H2.2z" fill="#0066DA" />
    <path d="M9.5 3.5l3.8 6.6h10.3l-3.8-6.6H9.5z" fill="#00AA47" />
    <path d="M16 10.1l3.8 6.6-5.1 8.8-3.8-6.6 5.1-8.8z" fill="#FFBA00" />
  </svg>
);

const GoogleSheetsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#0F9D58" />
    <path d="M8 8h8v2H8V8zm0 3h8v2H8v-2zm0 3h8v2H8v-2z" fill="#FFF" />
  </svg>
);

const GoogleCalendarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" x="2" y="2" fill="#4285F4" rx="4" />
    <path d="M6 8h12v10H6z" fill="#FFF" />
    <text x="12" y="16" fill="#4285F4" fontSize="8" fontWeight="bold" textAnchor="middle">31</text>
  </svg>
);

const SharePointIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12.16 2.1c.36.03.68.25.82.58l3.15 7.37c.18.42-.02.9-.44 1.08a.75.75 0 01-.58 0L12 9.7V21a1 1 0 01-2 0V9.7L6.89 11.13c-.42.18-.9-.02-1.08-.44a.75.75 0 010-.58l3.15-7.37c.14-.33.46-.55.82-.58h2.38z" fill="#0078D4" />
  </svg>
);

const TrelloIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#0079BF" />
    <rect x="6" y="6" width="4" height="12" rx="1.5" fill="#FFF" />
    <rect x="14" y="6" width="4" height="8" rx="1.5" fill="#FFF" />
  </svg>
);

// ==========================================
// Custom Animated Letters
// ==========================================

// Yellow Scribble replacing "O" in TEAMWORK
const YellowScribble = () => (
  <span className="relative inline-flex items-center justify-center mx-1 select-none pointer-events-none align-middle w-[1.1em] h-[1.1em]">
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full text-yellow-400 fill-none stroke-[8] stroke-linecap-round stroke-linejoin-round drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]"
    >
      <motion.path
        d="M 50,15 
           C 30,13 13,25 15,48 
           C 17,71 31,84 53,83 
           C 75,82 85,65 82,43 
           C 79,21 61,12 42,16 
           C 25,20 12,38 18,58 
           C 24,78 45,86 63,78 
           C 81,70 87,48 78,32 
           C 69,16 48,15 36,28
           C 24,41 26,62 38,72
           C 50,82 70,76 76,58
           C 82,40 68,28 52,34
           C 36,40 38,62 50,66
           C 62,70 70,54 62,44"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
    </svg>
  </span>
);

// Pentagon Node Network replacing "A" in GRAPH
const NodeNetworkA = () => {
  const aNodes = [
    { id: "a1", cx: 50, cy: 12, color: "#a259ff" }, // top
    { id: "a2", cx: 35, cy: 45, color: "#0acf83" }, // mid-left
    { id: "a3", cx: 65, cy: 45, color: "#ff7262" }, // mid-right
    { id: "a4", cx: 50, cy: 52, color: "#ffc000" }, // center
    { id: "a5", cx: 20, cy: 88, color: "#18a0fb" }, // bot-left
    { id: "a6", cx: 80, cy: 88, color: "#f24e1e" }, // bot-right
  ];

  const aEdges = [
    { from: "a1", to: "a2" },
    { from: "a1", to: "a3" },
    { from: "a2", to: "a4" },
    { from: "a3", to: "a4" },
    { from: "a2", to: "a5" },
    { from: "a3", to: "a6" },
    { from: "a4", to: "a5" },
    { from: "a4", to: "a6" },
    { from: "a5", to: "a6" },
  ];

  return (
    <span className="relative inline-flex items-center justify-center mx-1 select-none align-middle w-[1.1em] h-[1.1em]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {aEdges.map((edge, i) => {
          const n1 = aNodes.find(n => n.id === edge.from)!;
          const n2 = aNodes.find(n => n.id === edge.to)!;
          return (
            <motion.line
              key={i}
              x1={n1.cx}
              y1={n1.cy}
              x2={n2.cx}
              y2={n2.cy}
              stroke="white"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0.1 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.8, delay: i * 0.08 }}
            />
          );
        })}
        {aNodes.map((node, i) => (
          <motion.circle
            key={node.id}
            cx={node.cx}
            cy={node.cy}
            r="8"
            fill={node.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: i * 0.08 + 0.6 }}
            whileHover={{ scale: 1.5, filter: "brightness(1.2)" }}
            className="cursor-pointer"
          />
        ))}
      </svg>
    </span>
  );
};

// ==========================================
// Main Home Component
// ==========================================

export default function Home() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeCatalogTab, setActiveCatalogTab] = useState<string>("all");
  const [terminalCommand, setTerminalCommand] = useState<string>("teamwork-graph connectors list");
  const [terminalOutput, setTerminalOutput] = useState<TerminalRow[]>([
    { name: "Jira Cloud", status: "Connected", sync: "1 min ago", strength: "High" },
    { name: "Confluence Cloud", status: "Connected", sync: "2 mins ago", strength: "High" },
    { name: "Slack", status: "Connected", sync: "Just now", strength: "Medium" },
    { name: "GitHub", status: "Connected", sync: "5 mins ago", strength: "High" },
    { name: "Google Workspace", status: "Connected", sync: "10 mins ago", strength: "Medium" },
  ]);
  const [isTerminalLoading, setIsTerminalLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExplorerNode, setSelectedExplorerNode] = useState<NetworkNode | null>(null);
  const [lastActiveTime, setLastActiveTime] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLastActiveTime(new Date().toLocaleTimeString());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Network Nodes Programmatic Data
  const nodes = [
    // Integrations
    { id: "figma", name: "Figma", type: "integration", icon: <FigmaIcon />, x: 30, y: 28, size: 44, color: "#a259ff" },
    { id: "confluence", name: "Confluence", type: "integration", icon: <ConfluenceIcon />, x: 43, y: 31, size: 44, color: "#0052cc" },
    { id: "jira", name: "Jira", type: "integration", icon: <JiraIcon />, x: 52, y: 22, size: 48, color: "#2684ff" },
    { id: "gdrive", name: "Google Drive", type: "integration", icon: <GoogleDriveIcon />, x: 72, y: 30, size: 44, color: "#00aa47" },
    { id: "slack", name: "Slack", type: "integration", icon: <SlackIcon />, x: 16, y: 63, size: 44, color: "#ecb22e" },
    { id: "gsheets", name: "Sheets", type: "integration", icon: <GoogleSheetsIcon />, x: 4, y: 66, size: 44, color: "#0f9d58" },
    { id: "sharepoint", name: "SharePoint", type: "integration", icon: <SharePointIcon />, x: 7, y: 87, size: 44, color: "#0078d4" },
    { id: "gcal", name: "Calendar", type: "integration", icon: <GoogleCalendarIcon />, x: 84, y: 67, size: 44, color: "#4285f4" },
    { id: "github", name: "GitHub", type: "integration", icon: <GitHubIcon />, x: 6, y: 51, size: 46, color: "#24292e" },
    { id: "trello", name: "Trello", type: "integration", icon: <TrelloIcon />, x: 19, y: 95, size: 44, color: "#0079bf" },

    // People (Avatars)
    { id: "avatar1", name: "Sarah (Design)", type: "people", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", x: 39, y: 20, size: 52, borderColor: "#0acf83" },
    { id: "avatar2", name: "Alex (Engineering)", type: "people", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", x: 51, y: 32, size: 52, borderColor: "#a259ff" },
    { id: "avatar3", name: "Jessica (Product)", type: "people", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", x: 16, y: 81, size: 52, borderColor: "#18a0fb" },
    { id: "avatar4", name: "David (Operations)", type: "people", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", x: 81, y: 23, size: 52, borderColor: "#ff7262" },
    { id: "avatar5", name: "Emily (Marketing)", type: "people", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80", x: 84, y: 36, size: 52, borderColor: "#ffc000" },
    { id: "avatar6", name: "Michael (DevOps)", type: "people", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80", x: 92, y: 45, size: 52, borderColor: "#0acf83" },
    { id: "avatar7", name: "James (QA)", type: "people", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80", x: 20, y: 32, size: 52, borderColor: "#ff7262" },
  ];

  const edges = [
    { from: "figma", to: "avatar1" },
    { from: "avatar1", to: "jira" },
    { from: "jira", to: "gdrive" },
    { from: "gdrive", to: "avatar4" },
    { from: "avatar4", to: "avatar5" },
    { from: "avatar5", to: "avatar6" },
    { from: "confluence", to: "avatar2" },
    { from: "avatar2", to: "gdrive" },
    { from: "figma", to: "confluence" },
    { from: "figma", to: "jira" },
    { from: "avatar7", to: "figma" },
    { from: "avatar7", to: "github" },
    { from: "github", to: "gsheets" },
    { from: "gsheets", to: "slack" },
    { from: "slack", to: "sharepoint" },
    { from: "slack", to: "trello" },
    { from: "slack", to: "avatar3" },
    { from: "trello", to: "avatar3" },
    { from: "gsheets", to: "sharepoint" },
    { from: "gcal", to: "avatar5" },
    { from: "gcal", to: "gdrive" },
    { from: "avatar6", to: "gcal" },
  ];

  // Helper to determine active edge coloring on hover
  const isEdgeHovered = (fromId: string, toId: string) => {
    if (!hoveredNodeId) return false;
    return (
      (fromId === hoveredNodeId || toId === hoveredNodeId)
    );
  };

  // Helper to check if a node is a direct neighbor of hovered node
  const isNodeNeighbor = (nodeId: string) => {
    if (!hoveredNodeId) return false;
    if (nodeId === hoveredNodeId) return true;
    return edges.some(edge =>
      (edge.from === hoveredNodeId && edge.to === nodeId) ||
      (edge.to === hoveredNodeId && edge.from === nodeId)
    );
  };

  // Run Terminal Commands Simulator
  const executeTerminalCommand = (cmd: string) => {
    setIsTerminalLoading(true);
    setTerminalCommand(cmd);
    setTimeout(() => {
      setIsTerminalLoading(false);
      if (cmd.includes("connectors list")) {
        setTerminalOutput([
          { name: "Jira Cloud", status: "Connected", sync: "1 min ago", strength: "High" },
          { name: "Confluence Cloud", status: "Connected", sync: "2 mins ago", strength: "High" },
          { name: "Slack", status: "Connected", sync: "Just now", strength: "Medium" },
          { name: "GitHub", status: "Connected", sync: "5 mins ago", strength: "High" },
          { name: "Google Workspace", status: "Connected", sync: "10 mins ago", strength: "Medium" },
        ]);
      } else if (cmd.includes("query")) {
        setTerminalOutput([
          { node: "Sarah (Design)", rel: "authored", target: "Figma: Home Redesign" },
          { node: "Alex (Engineering)", rel: "implements", target: "Jira: TG-402 (Home Page Layout)" },
          { node: "James (QA)", rel: "reviews", target: "GitHub: PR #24 (NextJS Boilerplate)" },
        ]);
      } else if (cmd.includes("mcp-status")) {
        setTerminalOutput([
          { service: "MCP Server", status: "Active (Listening)", host: "localhost:3012", clients: "Gemini / Claude / Cursor" },
          { capabilities: "context-search, node-relationship-mapping, code-symbol-resolution" }
        ]);
      }
    }, 600);
  };

  // Connectors catalog data
  const catalogConnectors = [
    { id: "jira", name: "Jira", cat: "atlassian", desc: "Maps project tasks, epics, bug tickets, and assigns workflow ownership automatically.", icon: <JiraIcon /> },
    { id: "confluence", name: "Confluence", cat: "atlassian", desc: "Indexes document trees, page updates, and comments to resolve decision context.", icon: <ConfluenceIcon /> },
    { id: "trello", name: "Trello", cat: "atlassian", desc: "Syncs card boards and progress cards to capture task status.", icon: <TrelloIcon /> },
    { id: "figma", name: "Figma", cat: "design", desc: "Traces canvases, comments, and design specs to connect visual changes to code tickets.", icon: <FigmaIcon /> },
    { id: "slack", name: "Slack", cat: "comm", desc: "Bridges project discussions, thread updates, and announcements into the relational graph.", icon: <SlackIcon /> },
    { id: "github", name: "GitHub", cat: "dev", desc: "Links branches, commits, PR reviews, and lines of code straight to tasks.", icon: <GitHubIcon /> },
    { id: "gdrive", name: "Google Drive", cat: "google", desc: "Unifies documents, spreadsheets, slides, and shared files with authorship.", icon: <GoogleDriveIcon /> },
    { id: "gsheets", name: "Google Sheets", cat: "google", desc: "Bridges project sheets and structured documents into the index.", icon: <GoogleSheetsIcon /> },
    { id: "gcal", name: "Google Calendar", cat: "google", desc: "Connects milestones and sprint dates to the team timeline.", icon: <GoogleCalendarIcon /> },
    { id: "sharepoint", name: "SharePoint", cat: "comm", desc: "Bridges SharePoint libraries and files to enterprise workgroups.", icon: <SharePointIcon /> }
  ];

  const filteredConnectors = catalogConnectors.filter(c =>
    activeCatalogTab === "all" || c.cat === activeCatalogTab
  );

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 relative selection:bg-indigo-500/30 selection:text-indigo-200 font-sans overflow-x-hidden">
      {/* Mesh/Radial background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,24,48,0.4),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(99,102,241,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(236,72,153,0.04),transparent_50%)] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#07080a]/80 border-b border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <CoderithumLogo />
            <span className="font-semibold text-base tracking-tight text-white flex items-center gap-1.5">
              <span className="text-zinc-400 font-normal">Coderithum</span>
              Teamwork Graph
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#connectors" className="hover:text-white transition-colors">Connectors</a>
            <a href="#cli" className="hover:text-white transition-colors">CLI</a>
            <a href="#mcp" className="hover:text-white transition-colors">MCP</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="#feedback" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:inline-block">
              Send feedback
            </a>
            <button className="px-4 py-2 border border-zinc-800 rounded-lg text-sm font-medium text-white hover:bg-zinc-900 transition-all hover:scale-105 active:scale-95">
              Log in
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          Hero Section + Network Graph
          ========================================== */}
      <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-12 pb-24">

        {/* Dynamic Interactive SVG Network Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <AnimatePresence>
            {edges.map((edge, index) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = isEdgeHovered(edge.from, edge.to);
              const isDimmed = hoveredNodeId && !isHighlighted;

              return (
                <motion.line
                  key={`${edge.from}-${edge.to}-${index}`}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={isHighlighted ? "url(#glowGradient)" : "rgba(255, 255, 255, 0.08)"}
                  strokeWidth={isHighlighted ? "2.5" : "1.2"}
                  strokeDasharray={isHighlighted ? "none" : "5 5"}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isDimmed ? 0.04 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </AnimatePresence>
          <defs>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Scattered Network Nodes */}
        {nodes.map((node) => {
          const isHighlighted = isNodeNeighbor(node.id) || node.id === hoveredNodeId;
          const isDimmed = hoveredNodeId && !isHighlighted;

          return (
            <div
              key={node.id}
              className="absolute z-20 transition-all duration-300 pointer-events-auto"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Internal float node wrapper to preserve line connection coordinates */}
              <motion.div
                animate={{
                  y: [0, -7, 0],
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 4.5 + (node.x % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: -(node.y % 5),
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 ${isDimmed ? "opacity-20 scale-90" : "scale-100"
                  }`}
              >
                {node.type === "integration" ? (
                  // Integration Circle Badge
                  <div
                    className="rounded-full bg-[#0a0b0d] border border-zinc-800 flex items-center justify-center transition-all duration-300 relative shadow-xl"
                    style={{
                      width: `${node.size}px`,
                      height: `${node.size}px`,
                      boxShadow: isHighlighted ? `0 0 20px ${node.color}50` : "none",
                      borderColor: isHighlighted ? node.color : "#27272a"
                    }}
                  >
                    {node.icon}
                  </div>
                ) : (
                  // People Profile Avatar Badge
                  <div
                    className="rounded-full overflow-hidden p-0.5 transition-all duration-300 relative shadow-xl"
                    style={{
                      width: `${node.size}px`,
                      height: `${node.size}px`,
                      backgroundColor: node.borderColor || "#a259ff",
                      boxShadow: isHighlighted ? `0 0 25px ${node.borderColor}70` : "none",
                    }}
                  >
                    <img
                      src={node.img}
                      alt={node.name}
                      className="w-full h-full object-cover rounded-full bg-zinc-950"
                    />
                  </div>
                )}

                {/* Hover Card Label */}
                <AnimatePresence>
                  {hoveredNodeId === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -node.size / 2 - 20, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap shadow-2xl pointer-events-none z-30"
                    >
                      {node.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}

        {/* Scattered Status Tags, pluses, & hand-drawn scribbles */}
        {/* "To do" Pill */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[13%] top-[42%] bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-20 select-none cursor-default font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          To do
        </motion.div>

        {/* "On track" Pill */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: -1 }}
          className="absolute right-[12%] top-[27%] bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-20 select-none cursor-default font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          On track
        </motion.div>

        {/* White Handdrawn Arrow/Scribbles */}
        <div className="absolute right-[15%] top-[78%] pointer-events-none opacity-40 select-none">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <path d="M5 5 C 20,35 45,35 50,15 M43,18 L50,15 L52,24" />
          </svg>
        </div>

        <div className="absolute left-[24%] top-[88%] pointer-events-none opacity-40 select-none">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <path d="M30 10 C 10,10 5,25 25,30 C 35,32 30,12 15,20" />
          </svg>
        </div>

        {/* Plus Signs */}
        <div className="absolute left-[38%] top-[10%] opacity-20 text-white text-xl pointer-events-none select-none animate-pulse">+</div>
        <div className="absolute right-[33%] top-[24%] opacity-25 text-white text-2xl pointer-events-none select-none font-light animate-pulse">+</div>
        <div className="absolute left-[8%] top-[28%] opacity-15 text-white text-3xl pointer-events-none select-none font-thin rotate-45 select-none">*</div>


      </section>

      {/* ==========================================
          Section: Live Graph Explorer Dashboard
          ========================================== */}
      <section id="explorer" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900/60 relative">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Explorer Panel</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Unify Your Context
          </h2>
          <p className="mt-3 text-zinc-400 text-sm">
            Search projects, teams, or integrations to see how the graph resolves cross-platform connections.
          </p>
        </div>

        {/* Graph Explorer Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          {/* Left panel - Search & Node List */}
          <div className="lg:col-span-5 border-r border-zinc-900 p-6 flex flex-col h-[520px]">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search teammates, tasks, or tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d0e12] border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {nodes
                .filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedExplorerNode(node)}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between border transition-all ${selectedExplorerNode?.id === node.id
                        ? "bg-blue-600/10 border-blue-500/40 text-white"
                        : "bg-zinc-900/30 border-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {node.type === "integration" ? (
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                          {node.icon}
                        </div>
                      ) : (
                        <img src={node.img} alt={node.name} className="w-8 h-8 rounded-full object-cover" />
                      )}
                      <div>
                        <div className="text-sm font-medium">{node.name}</div>
                        <div className="text-xs text-zinc-500 capitalize">{node.type}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
            </div>
          </div>

          {/* Right panel - Node Connections Visualizer */}
          <div className="lg:col-span-7 p-8 flex flex-col justify-between h-[520px] bg-zinc-950/60">
            {selectedExplorerNode ? (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {selectedExplorerNode.type === "integration" ? (
                        <div
                          className="w-14 h-14 rounded-2xl bg-zinc-900 border flex items-center justify-center shadow-xl"
                          style={{ borderColor: selectedExplorerNode.color }}
                        >
                          {selectedExplorerNode.icon}
                        </div>
                      ) : (
                        <img
                          src={selectedExplorerNode.img}
                          alt={selectedExplorerNode.name}
                          className="w-14 h-14 rounded-full object-cover border-2 shadow-xl"
                          style={{ borderColor: selectedExplorerNode.borderColor }}
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-white">{selectedExplorerNode.name}</h3>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {selectedExplorerNode.type}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedExplorerNode(null)}
                      className="text-xs text-zinc-500 hover:text-zinc-300"
                    >
                      Clear Selection
                    </button>
                  </div>

                  <div className="mt-8">
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
                      Active Graph Connections ({edges.filter(e => e.from === selectedExplorerNode.id || e.to === selectedExplorerNode.id).length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {edges
                        .filter(e => e.from === selectedExplorerNode.id || e.to === selectedExplorerNode.id)
                        .map((edge, idx) => {
                          const targetId = edge.from === selectedExplorerNode.id ? edge.to : edge.from;
                          const targetNode = nodes.find(n => n.id === targetId)!;
                          return (
                            <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-900 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {targetNode.type === "integration" ? (
                                  <div className="w-7 h-7 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
                                    {targetNode.icon}
                                  </div>
                                ) : (
                                  <img src={targetNode.img} alt={targetNode.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                                )}
                                <div>
                                  <div className="text-xs font-medium text-white">{targetNode.name}</div>
                                  <div className="text-[10px] text-zinc-500 capitalize">{targetNode.type}</div>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded">
                                Bidirectional
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-900/80 text-xs text-zinc-500 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  <span>The teamwork model compiles context rules continuously from {selectedExplorerNode.name}.</span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                  <Network className="w-5 h-5 text-zinc-600" />
                </div>
                <h4 className="text-sm font-semibold text-zinc-300">Select a node from the list</h4>
                <p className="text-xs text-zinc-500 max-w-xs mt-1">
                  Click on any person or integration tool to explore its mapping links and real-time connectivity strength.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          Section: Connectors Catalog
          ========================================== */}
      <section id="connectors" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-indigo-400 uppercase">Connector Ecosystem</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-white tracking-tight">
              100+ Integrated Work Tools
            </h3>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Sync files, events, tickets, and code branches into a unified teamwork graph context with no coding required.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-900">
            {[
              { id: "all", label: "All Connectors" },
              { id: "atlassian", label: "Atlassian" },
              { id: "design", label: "Design" },
              { id: "comm", label: "Communication" },
              { id: "dev", label: "Dev Tools" },
              { id: "google", label: "Google Suite" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCatalogTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeCatalogTab === tab.id
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Connectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredConnectors.map((c, index) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800/80 transition-all hover:bg-zinc-950 shadow-md group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {c.icon}
                </div>
                <h4 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {c.name}
                </h4>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  {c.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Category: {c.cat}</span>
                  <span className="text-zinc-400 flex items-center gap-1 group-hover:text-white transition-colors">
                    Configure <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ==========================================
          Section: CLI Terminal Simulator
          ========================================== */}
      <section id="cli" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-mono tracking-widest text-indigo-400 uppercase">Developer CLI</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Manage Graph Operations Locally
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Use our quick command line binary to list connected databases, sync resources, or query path connections directly in your local development workspace.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => executeTerminalCommand("teamwork-graph connectors list")}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-mono transition-all ${terminalCommand === "teamwork-graph connectors list"
                    ? "bg-indigo-600/10 border-indigo-500/40 text-white"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300"
                  }`}
              >
                <span>$ teamwork-graph connectors list</span>
                <Play className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => executeTerminalCommand('teamwork-graph query "Sarah AND Alex"')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-mono transition-all ${terminalCommand === 'teamwork-graph query "Sarah AND Alex"'
                    ? "bg-indigo-600/10 border-indigo-500/40 text-white"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300"
                  }`}
              >
                <span>$ teamwork-graph query &quot;Sarah AND Alex&quot;</span>
                <Play className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => executeTerminalCommand("teamwork-graph mcp-status")}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-mono transition-all ${terminalCommand === "teamwork-graph mcp-status"
                    ? "bg-indigo-600/10 border-indigo-500/40 text-white"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300"
                  }`}
              >
                <span>$ teamwork-graph mcp-status</span>
                <Play className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-[#0d0e12] border-b border-zinc-900 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono">zsh - teamwork-graph</span>
                </div>
                <span className="text-[10px] text-zinc-600 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800">
                  CLI v1.2.0
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-xs leading-relaxed min-h-[300px] max-h-[350px] overflow-y-auto">
                <div className="flex items-center gap-2 text-zinc-500 mb-2">
                  <span>Last active: {lastActiveTime || "Calculating..."}</span>
                </div>
                <div className="flex items-start gap-2 text-indigo-400">
                  <span className="text-zinc-600">$</span>
                  <span>{terminalCommand}</span>
                </div>

                {isTerminalLoading ? (
                  <div className="mt-4 text-zinc-500 animate-pulse flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                    <span>Resolving graph indices...</span>
                  </div>
                ) : (
                  <div className="mt-4 text-zinc-300">
                    {terminalCommand.includes("connectors list") && (
                      <div className="space-y-1">
                        <div className="grid grid-cols-4 border-b border-zinc-900 pb-2 mb-2 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                          <span>Connector</span>
                          <span>Status</span>
                          <span>Last Sync</span>
                          <span>Strength</span>
                        </div>
                        {terminalOutput.map((row, i) => (
                          <div key={i} className="grid grid-cols-4 py-1 text-zinc-400 border-b border-zinc-900/40 last:border-0">
                            <span className="text-white font-medium">{row.name}</span>
                            <span className="text-emerald-400">{row.status}</span>
                            <span>{row.sync}</span>
                            <span className="text-indigo-400">{row.strength}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {terminalCommand.includes("query") && (
                      <div className="space-y-1.5">
                        <div className="text-zinc-500 mb-2">Found 3 primary relational paths:</div>
                        {terminalOutput.map((row, i) => (
                          <div key={i} className="p-2 bg-zinc-900/30 rounded border border-zinc-900 flex items-center gap-2">
                            <span className="text-white font-medium">{row.node}</span>
                            <span className="text-indigo-400 font-mono text-[10px] bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/15">{row.rel}</span>
                            <span className="text-zinc-400">{row.target}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {terminalCommand.includes("mcp-status") && (
                      <div className="space-y-4">
                        {terminalOutput[0] && (
                          <div className="space-y-1 bg-zinc-900/40 p-3 rounded-lg border border-zinc-900">
                            <div className="text-zinc-500 uppercase tracking-widest text-[9px] mb-2">Host Settings</div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Service:</span>
                              <span className="text-emerald-400 font-semibold">{terminalOutput[0].service}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Address:</span>
                              <span className="text-zinc-400">{terminalOutput[0].host}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Clients:</span>
                              <span className="text-indigo-400">{terminalOutput[0].clients}</span>
                            </div>
                          </div>
                        )}
                        {terminalOutput[1] && (
                          <div className="space-y-1 bg-zinc-900/40 p-3 rounded-lg border border-zinc-900">
                            <div className="text-zinc-500 uppercase tracking-widest text-[9px] mb-2">Exposed Capabilities</div>
                            <div className="text-zinc-300 leading-relaxed font-mono text-[11px]">
                              {terminalOutput[1].capabilities}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          Section: Model Context Protocol (MCP)
          ========================================== */}
      <section id="mcp" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Platform Standard</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Model Context Protocol Ready
          </h2>
          <p className="mt-3 text-zinc-400 text-sm">
            Expose context data safely to local LLMs and AI coding agents via standard Model Context Protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 relative hover:border-zinc-800/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 mb-6">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Expose Work Relationships</h4>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                Allow AI agents to query the relationships between Jira tickets, GitHub code PRs, and Slack conversations directly.
              </p>
            </div>
            <div className="mt-8 text-xs text-zinc-500 font-mono">mcp:tool // teamwork_query_node</div>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 relative hover:border-zinc-800/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-400 mb-6">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Permission Aware Structure</h4>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                Inherits user workspace permissions. The model only receives context metadata the current user has access to view.
              </p>
            </div>
            <div className="mt-8 text-xs text-zinc-500 font-mono">mcp:auth // OAuth2 Handshake</div>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 relative hover:border-zinc-800/80 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-pink-400 mb-6">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Universal Client Support</h4>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                Connects seamlessly to Claude Desktop, Cursor, Gemini IDE, and other developer tools supporting standard MCP APIs.
              </p>
            </div>
            <div className="mt-8 text-xs text-zinc-500 font-mono">mcp:client // cursor-mcp</div>
          </div>
        </div>
      </section>

      {/* ==========================================
          Footer
          ========================================== */}
      <footer className="border-t border-zinc-900 py-12 px-6 bg-[#040507] text-xs text-zinc-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <CoderithumLogo />
            <span className="font-semibold text-zinc-400">Coderithum Teamwork Graph</span>
          </div>

          <p>© {new Date().getFullYear()} Coderithum. All rights reserved. Open source under MIT license.</p>

          <div className="flex items-center gap-6">
            <a href="https://github.com/KunalPatilCode/coderithum" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub Repo
            </a>
            <a href="#about" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
