"use client"

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Cpu,
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  Compass,
  Radio,
  Crown,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Github, Linkedin } from "@/components/Icons"
import { TeamMember, getMemberAvatarStyle, getMemberTierLevel } from "@/types"

interface CoderithumNetworkProps {
  team: TeamMember[]
  onSelectMember?: (member: TeamMember) => void
}

interface NetworkCardProps {
  member: TeamMember
  badgeText: string
  themeColor: "emerald" | "amber" | "cyan"
  isSelected?: boolean
  isHub?: boolean
  onClick?: () => void
  memberCount?: number
  prefersReducedMotion?: boolean
  compact?: boolean
  isPremium?: boolean
}

// Reusable Network Node Card matching exact UI in Photo 2
// Reusable Network Node Card matching exact UI in Photo 2
function NetworkNodeCard({
  member,
  badgeText,
  themeColor,
  isSelected,
  isHub,
  onClick,
  memberCount,
  prefersReducedMotion,
  compact,
  isPremium
}: NetworkCardProps) {
  let themeBorder = isPremium ? "border-[3px] border-cyan-400" : "border-cyan-500"
  let themeShadow = isPremium ? "shadow-[0_0_35px_rgba(34,211,238,0.5)]" : "shadow-[0_0_20px_rgba(34,211,238,0.3)]"
  let themeText = "text-cyan-400"
  let themeBadgeBg = isPremium ? "bg-cyan-950 border-cyan-400 text-cyan-300" : "bg-cyan-950/80 border-cyan-800"
  let themeRotatingBorder = "border-cyan-400/50"
  let themeDot = "bg-cyan-400"

  if (themeColor === "emerald") {
    themeBorder = isPremium ? "border-[3px] border-emerald-400" : "border-emerald-500"
    themeShadow = isPremium ? "shadow-[0_0_35px_rgba(16,185,129,0.5)]" : "shadow-[0_0_20px_rgba(16,185,129,0.3)]"
    themeText = "text-emerald-400"
    themeBadgeBg = isPremium ? "bg-emerald-950 border-emerald-400 text-emerald-300" : "bg-emerald-950/80 border-emerald-800"
    themeRotatingBorder = "border-emerald-400/50"
    themeDot = "bg-emerald-400"
  } else if (themeColor === "amber") {
    themeBorder = isPremium ? "border-[3px] border-amber-400" : "border-amber-500"
    themeShadow = isPremium ? "shadow-[0_0_35px_rgba(245,158,11,0.5)]" : "shadow-[0_0_20px_rgba(245,158,11,0.3)]"
    themeText = "text-amber-400"
    themeBadgeBg = isPremium ? "bg-amber-950 border-amber-400 text-amber-300" : "bg-amber-950/80 border-amber-800"
    themeRotatingBorder = "border-amber-400/50"
    themeDot = "bg-amber-400"
  }

  const cardWidthClass = compact ? "w-52 sm:w-56 md:w-60 p-2.5 sm:p-3" : "w-60 sm:w-68 md:w-72 p-3.5 sm:p-4"
  const avatarSizeClass = compact ? "size-12 sm:size-16" : "size-16 sm:size-20"
  const titleSizeClass = compact ? "text-xs sm:text-sm font-extrabold" : "text-sm sm:text-base font-black"

  const renderPremiumIcon = () => {
    if (!isPremium) return <Radio className={`size-3.5 ${themeText} ${isHub ? "animate-pulse" : ""}`} />
    if (themeColor === "emerald") return <ShieldCheck className="size-4 text-emerald-400 shrink-0 animate-pulse" />
    if (themeColor === "amber") return <Crown className="size-4 text-amber-400 shrink-0" />
    return <Sparkles className="size-4 text-cyan-400 shrink-0" />
  }

  const renderPremiumLabel = () => {
    if (!isPremium) return isHub ? "CENTRAL HUB" : compact ? "RING NODE" : "PERMANENT CORE"
    if (themeColor === "emerald") return "FACULTY ADVISOR"
    if (themeColor === "amber") return "CHIEF COMMAND"
    return "EXECUTIVE VP"
  }

  return (
    <div
      onClick={onClick}
      className={`relative ${cardWidthClass} ${isPremium ? "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-[3px]" : "bg-slate-950 border-2"} ${themeBorder} ${themeShadow} font-mono text-xs z-10 flex flex-col justify-between select-none group transition-all duration-200 ${onClick ? "cursor-pointer hover:scale-105" : ""
        }`}
    >


      {/* Pixel Corner Accents */}
      <div className={`absolute -top-1 -left-1 size-2 ${themeDot} border border-slate-900 z-20`} />
      <div className={`absolute -top-1 -right-1 size-2 ${themeDot} border border-slate-900 z-20`} />
      <div className={`absolute -bottom-1 -left-1 size-2 ${themeDot} border border-slate-900 z-20`} />
      <div className={`absolute -bottom-1 -right-1 size-2 ${themeDot} border border-slate-900 z-20`} />

      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-2 text-[10px] sm:text-xs">
        <span className={`${themeText} font-extrabold flex items-center gap-1.5 uppercase tracking-wider`}>
          {renderPremiumIcon()}
          {renderPremiumLabel()}
        </span>
        <span className={`font-bold uppercase tracking-wider text-[9px] sm:text-[10px] border px-2 py-0.5 ${themeBadgeBg}`}>
          {badgeText}
        </span>
      </div>

      {/* Middle Body Row */}
      <div className="flex items-center gap-3 my-1.5">
        <div className={`relative ${avatarSizeClass} shrink-0 border-2 ${themeBorder} bg-slate-100 overflow-hidden shadow-[2px_2px_0px_#000] ${isPremium ? `ring-2 ring-offset-1 ring-${themeColor}-400/30` : ""}`}>
          <img
            src={member.avatar}
            alt={member.name}
            style={getMemberAvatarStyle(member)}
            className="w-full h-full object-cover"
            onError={(e: any) => {
              e.target.src =
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className={`${titleSizeClass} text-white truncate group-hover:text-cyan-400 transition-colors`}>
            {member.name}
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 line-clamp-2 leading-tight">
            {member.role}
          </p>
        </div>
      </div>

      {/* Bottom Footer Row */}
      <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 font-mono">
        <span>
          REPORTS: <span className={`${themeText} font-bold`}>{memberCount !== undefined ? `${memberCount} NODES` : "CORE NODE"}</span>
        </span>
        <div className="flex items-center gap-2">
          {member.github && (
            <a href={member.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Github className="size-3.5 sm:size-4" />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="size-3.5 sm:size-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CoderithumNetwork({ team, onSelectMember }: CoderithumNetworkProps) {
  // Boot Sequence State
  const [booting, setBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [bootLogIndex, setBootLogIndex] = useState(0)

  // Canvas Dimensions
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 })

  // Active Selection (null = Initial Leader Ring Topology View)
  const [selectedLeader, setSelectedLeader] = useState<TeamMember | null>(null)
  const [hoveredMemberName, setHoveredMemberName] = useState<string | null>(null)
  const [selectedMemberModal, setSelectedMemberModal] = useState<TeamMember | null>(null)
  const [showLevel2, setShowLevel2] = useState(false)

  // Viewport & Filter Controls
  const [zoomLevel, setZoomLevel] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  // Reduced Motion Detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    }
  }, [])

  // Boot logs
  const bootLogs = [
    "> MOUNTING PERMANENT CORE: PROF. SHRUTI TOMAR, KUNAL PATIL, MAITRI PATEL...",
    "> ROTATING DIAMOND RECTANGLE ENCLOSURES ONLINE",
    "> SYNCHRONIZING LEADERS RING TOPOLOGY: MDISMILE <-> PURNIMA <-> ABHISHEK...",
    "> CODERITHUM NETWORK ONLINE"
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setBooting(false), 200)
          return 100
        }
        return prev + 25
      })
    }, 240)

    const logInterval = setInterval(() => {
      setBootLogIndex((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev))
    }, 280)

    return () => {
      clearInterval(progressInterval)
      clearInterval(logInterval)
    }
  }, [])

  // Canvas resize observer
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        setDimensions({
          width: Math.max(clientWidth, 600),
          height: Math.max(clientHeight, 500)
        })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [selectedLeader])

  // =========================================================
  // 1. TOP PERMANENT CORE MEMBERS
  // =========================================================
  const facultyMember = useMemo(() => {
    return (
      team.find((m) => m.name.toLowerCase().includes("shruti")) ||
      team.find((m) => m.category === "Faculty" || getMemberTierLevel(m) === 1) ||
      team[0]
    )
  }, [team])

  const presidentMember = useMemo(() => {
    return (
      team.find((m) => m.role.toLowerCase().includes("president") && !m.role.toLowerCase().includes("vice")) ||
      team.find((m) => m.name === "Kunal Patil") ||
      team[1]
    )
  }, [team])

  const vpMember = useMemo(() => {
    return (
      team.find((m) => m.role.toLowerCase().includes("vice president") || m.name === "Maitri Patel") ||
      team[2]
    )
  }, [team])

  // =========================================================
  // 2. THE THREE LEADERS (MDISMILE, PURNIMA, ABHISHEK)
  // =========================================================
  const ismileLeader = useMemo(() => {
    return team.find((m) => m.name.toLowerCase().includes("ismile")) || null
  }, [team])

  const purnimaLeader = useMemo(() => {
    return team.find((m) => m.name.toLowerCase().includes("purnima")) || null
  }, [team])

  const abhishekLeader = useMemo(() => {
    return team.find((m) => m.name.toLowerCase().includes("abhishek")) || null
  }, [team])

  const threeLeaders = useMemo(() => {
    const list: { key: string; member: TeamMember }[] = []
    if (ismileLeader) list.push({ key: "mdismile", member: ismileLeader })
    if (purnimaLeader) list.push({ key: "purnima", member: purnimaLeader })
    if (abhishekLeader) list.push({ key: "abhishek", member: abhishekLeader })
    return list
  }, [ismileLeader, purnimaLeader, abhishekLeader])

  // Subordinate members lookup for each leader
  const getMembersForLeader = useCallback(
    (leader: TeamMember): TeamMember[] => {
      const leaderName = leader.name.toLowerCase()

      if (leaderName.includes("ismile")) {
        const technicalNames = [
          "aarav sharma",
          "nisha patel",
          "rohan verma",
          "ananya gupta",
          "yash trivedi",
          "siddharth mehta",
          "neha sharma"
        ]
        return team.filter((m) => {
          if (m.name.toLowerCase().includes("ismile")) return false
          if (m.reportsTo) {
            return m.reportsTo.toLowerCase().includes("ismile")
          }
          return technicalNames.includes(m.name.toLowerCase())
        })
      }

      if (leaderName.includes("purnima")) {
        const incubatorNames = [
          "karan shah",
          "rohan das",
          "neha sharma",
          "siddharth mehta",
          "priya joshi",
          "aarav sharma"
        ]
        return team.filter((m) => {
          if (m.name.toLowerCase().includes("purnima")) return false
          if (m.reportsTo) {
            return m.reportsTo.toLowerCase().includes("purnima")
          }
          return incubatorNames.includes(m.name.toLowerCase())
        })
      }

      if (leaderName.includes("abhishek")) {
        const marketingNames = [
          "aaryan patel",
          "kabir mehta",
          "riya patel",
          "sneha iyer",
          "priya joshi",
          "maitri patel"
        ]
        return team.filter((m) => {
          if (m.name.toLowerCase().includes("abhishek")) return false
          if (m.reportsTo) {
            return m.reportsTo.toLowerCase().includes("abhishek")
          }
          return marketingNames.includes(m.name.toLowerCase())
        })
      }

      return []
    },
    [team]
  )

  // Subordinate members for active leader
  const selectedLeaderMembers = useMemo(() => {
    if (!selectedLeader) return []
    const members = getMembersForLeader(selectedLeader)
    if (!searchQuery) return members

    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [selectedLeader, getMembersForLeader, searchQuery])

  // Ring Topology Coordinates for the 3 Leaders (Exact Triangle Vertices)
  const getLeaderRingPosition = (leaderKey: string) => {
    const cx = dimensions.width / 2
    const cy = dimensions.height / 2

    const radiusX = Math.min(dimensions.width * 0.26, 230)
    const radiusY = Math.min(dimensions.height * 0.25, 140)

    if (leaderKey === "mdismile") {
      // Top Vertex of Triangle
      return { x: cx, y: cy - radiusY }
    } else if (leaderKey === "purnima") {
      // Bottom-Left Vertex of Triangle
      return { x: cx - radiusX, y: cy + radiusY * 0.75 }
    } else {
      // Bottom-Right Vertex of Triangle (abhishek)
      return { x: cx + radiusX, y: cy + radiusY * 0.75 }
    }
  }

  // Radial Star Topology Coordinates for Subordinate Members (Spread in a circle around center)
  const getStarMemberPosition = (index: number, total: number) => {
    const cx = dimensions.width / 2
    const cy = dimensions.height / 2

    if (total === 0) return { x: cx, y: cy, angle: 0 }

    // Dynamic radius to fit perfectly in viewport
    const rx = Math.min(340, dimensions.width * 0.35)
    const ry = Math.min(170, dimensions.height * 0.34)

    // Distribute angles evenly starting from top (-PI / 2)
    const angleStep = (2 * Math.PI) / total
    const angle = index * angleStep - Math.PI / 2

    const x = cx + rx * Math.cos(angle)
    const y = cy + ry * Math.sin(angle)

    return { x, y, angle }
  }

  const handleLeaderClick = (member: TeamMember) => {
    if (selectedLeader?.name === member.name) return
    setSelectedLeader(member)
    if (onSelectMember) onSelectMember(member)
  }

  const handleResetToRing = () => {
    setSelectedLeader(null)
    setSearchQuery("")
    setZoomLevel(1)
    setHoveredMemberName(null)
  }

  const getTierBadgeStyle = (tier: number) => {
    switch (tier) {
      case 1:
        return "bg-emerald-950/90 text-emerald-400 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
      case 2:
        return "bg-amber-950/90 text-amber-400 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
      case 3:
        return "bg-cyan-950/90 text-cyan-400 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
      default:
        return "bg-slate-900/90 text-slate-300 border-slate-700"
    }
  }

  // SVG Ring Path connecting 3 Leaders
  const ringPathD = useMemo(() => {
    const pos1 = getLeaderRingPosition("mdismile")
    const pos2 = getLeaderRingPosition("purnima")
    const pos3 = getLeaderRingPosition("abhishek")
    return `M ${pos1.x} ${pos1.y} L ${pos2.x} ${pos2.y} L ${pos3.x} ${pos3.y} Z`
  }, [dimensions])

  return (
    <div className="relative w-full bg-slate-950 text-slate-100 rounded-none border-2 border-slate-800 shadow-[8px_8px_0px_#000] overflow-hidden select-none space-y-4">

      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

      {/* Boot Overlay */}
      <AnimatePresence>
        {booting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4 border-2 border-cyan-500/50"
          >
            <div className="flex items-center gap-2 font-mono text-cyan-400 text-sm font-bold tracking-widest uppercase">
              <Cpu className="size-5 animate-spin text-cyan-400" />
              CODERITHUM_NETWORK_BOOT_v4.2
            </div>

            <div className="w-full max-w-md bg-slate-900 border-2 border-slate-800 p-4 font-mono text-xs text-left space-y-2 shadow-[4px_4px_0px_#000]">
              <div className="flex justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                <span>SYSTEM DIAGNOSTIC</span>
                <span>{bootProgress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
              <div className="text-cyan-300 text-[11px] h-6 flex items-center gap-2 font-mono">
                <span className="inline-block size-2 bg-cyan-400 animate-ping" />
                {bootLogs[bootLogIndex]}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Bar */}
      <div className="relative z-20 border-b border-slate-800/60 bg-transparent p-3 sm:p-4 font-mono space-y-2">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">

          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-cyan-400 font-bold uppercase tracking-widest">
              <span className="size-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
              ● {selectedLeader ? `STAR TOPOLOGY HUB :: ${selectedLeader.name.toUpperCase()}` : "LEADERS RING TOPOLOGY ACTIVE"}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight mt-0.5 flex items-center gap-3">
              CODERITHUM NETWORK
              <span className="text-[10px] font-mono font-normal text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 hidden sm:inline-block">
                {selectedLeader ? `${selectedLeaderMembers.length} CONNECTED NODES` : "3 RING LEADERS"}
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono">
            {selectedLeader && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleResetToRing}
                className="px-2.5 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border-2 border-cyan-500 text-[10px] font-bold uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer transition-all"
              >
                <ArrowLeft className="size-3.5" /> ← BACK TO RING
              </motion.button>
            )}

            <div className="flex border-2 border-slate-800 bg-slate-950 p-0.5 shadow-[2px_2px_0px_#000]">
              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.35))}
                className="p-1 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="size-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.75))}
                className="p-1 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors border-l border-slate-800"
                title="Zoom Out"
              >
                <ZoomOut className="size-3.5" />
              </button>
              <button
                onClick={handleResetToRing}
                className="p-1 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors border-l border-slate-800"
                title="Reset View"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Search Bar Input */}
        {selectedLeader && (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${selectedLeader.name}'s team...`}
              className="w-full h-8 pl-8 pr-4 bg-slate-950 border-2 border-slate-800 text-[11px] font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all shadow-[2px_2px_0px_#000]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 hover:text-white cursor-pointer"
              >
                [CLEAR]
              </button>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 1. PERMANENT CORE & TEAM LEADERSHIP CARDS (RING VIEW ONLY) */}
      {/* ========================================================= */}
      {!selectedLeader && (
        <div className="relative z-20 px-3 sm:px-6 py-2.5 font-mono select-none">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-3 max-w-6xl mx-auto">
            <span className="text-[11px] font-extrabold text-emerald-400 tracking-wider flex items-center gap-2 uppercase">
              <GraduationCap className="size-3.5 text-emerald-400" />
              PERMANENT CORE & DOMAIN LEADERSHIP
            </span>
            <span className="text-[9px] text-slate-400 font-bold bg-slate-800 border border-slate-700 px-2 py-0.5">
              ALWAYS VISIBLE
            </span>
          </div>
          <div className="space-y-5 max-w-6xl mx-auto py-1 px-2">
            
            {/* LEVEL 1: PERMANENT CORE EXECUTIVE BOARD */}
            <div className="space-y-2">
              <div className="text-[9px] text-emerald-400 font-extrabold tracking-widest uppercase text-center w-full">
                ▲ LEVEL 1: PERMANENT CORE EXECUTIVE BOARD
              </div>
              <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-6 sm:gap-10 md:gap-14 w-full">
                <NetworkNodeCard
                  member={facultyMember}
                  badgeText="FACULTY"
                  themeColor="emerald"
                  prefersReducedMotion={prefersReducedMotion}
                  compact={false}
                  isPremium={true}
                />
                <NetworkNodeCard
                  member={presidentMember}
                  badgeText="PRESIDENT"
                  themeColor="amber"
                  prefersReducedMotion={prefersReducedMotion}
                  compact={false}
                  isPremium={true}
                />
                <NetworkNodeCard
                  member={vpMember}
                  badgeText="VICE PRESIDENT"
                  themeColor="cyan"
                  prefersReducedMotion={prefersReducedMotion}
                  compact={false}
                  isPremium={true}
                />
              </div>
            </div>

            {/* INTERACTIVE ARROW TOGGLE FOR LEVEL 2 */}
            <div className="flex flex-col items-center justify-center pt-2 pb-1 border-t border-slate-900">
              <motion.button
                onClick={() => setShowLevel2(prev => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border-2 border-slate-900 bg-slate-950 text-cyan-400 font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-slate-900 transition-all z-30"
              >
                {showLevel2 ? (
                  <>
                    <ChevronUp className="size-3.5 animate-bounce" />
                    [ COLLAPSE DOMAIN LEADS ]
                  </>
                ) : (
                  <>
                    <ChevronDown className="size-3.5 animate-bounce" />
                    [ EXPAND DOMAIN LEADS ]
                  </>
                )}
              </motion.button>
            </div>

            {/* LEVEL 2: CIRCULAR RING TOPOLOGY CARDS (COLLAPSIBLE) */}
            <AnimatePresence>
              {showLevel2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: dimensions.width < 768 ? "auto" : 420, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative w-full bg-transparent overflow-hidden flex flex-col md:block items-center justify-center gap-6 md:gap-0 my-2"
                >
                  {/* SVG CIRCULAR LOOP ELLIPSE PATH & ANIMATED ORBITING DATA PULSE */}
                  <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
                    <motion.ellipse
                      cx="50%"
                      cy="50%"
                      rx="28%"
                      ry="22%"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ duration: 0.5 }}
                    />
                    {!prefersReducedMotion && (
                      <motion.circle
                        r="4"
                        fill="#22d3ee"
                        animate={{
                          cx: ["50%", "78%", "50%", "22%", "50%"],
                          cy: ["28%", "50%", "72%", "50%", "28%"] // Orbit relative to cy = 50%, ry = 22%
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 5.5,
                          ease: "linear"
                        }}
                      />
                    )}
                  </svg>

                  {/* 1. TOP RING NODE: MD ISMILE (CHIEF TECHNICAL LEAD) */}
                  {ismileLeader && (
                    <div className="relative md:absolute md:left-[50%] md:top-[28%] md:-translate-x-1/2 md:-translate-y-1/2 z-10 w-full md:w-auto flex justify-center">
                      <NetworkNodeCard
                        member={ismileLeader}
                        badgeText={ismileLeader.category.toUpperCase()}
                        themeColor="cyan"
                        compact={true}
                        memberCount={getMembersForLeader(ismileLeader).length}
                        onClick={() => handleLeaderClick(ismileLeader)}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>
                  )}

                  {/* 2. BOTTOM-LEFT RING NODE: PURNIMA UPADHYAY (INCUBATOR & OPS LEAD) */}
                  {purnimaLeader && (
                    <div className="relative md:absolute md:left-[22%] md:top-[72%] md:-translate-x-1/2 md:-translate-y-1/2 z-10 w-full md:w-auto flex justify-center">
                      <NetworkNodeCard
                        member={purnimaLeader}
                        badgeText={purnimaLeader.category.toUpperCase()}
                        themeColor="cyan"
                        compact={true}
                        memberCount={getMembersForLeader(purnimaLeader).length}
                        onClick={() => handleLeaderClick(purnimaLeader)}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>
                  )}

                  {/* 3. BOTTOM-RIGHT RING NODE: ABHISHEK KUMAR (BRAND LEAD) */}
                  {abhishekLeader && (
                    <div className="relative md:absolute md:left-[78%] md:top-[72%] md:-translate-x-1/2 md:-translate-y-1/2 z-10 w-full md:w-auto flex justify-center">
                      <NetworkNodeCard
                        member={abhishekLeader}
                        badgeText={abhishekLeader.category.toUpperCase()}
                        themeColor="cyan"
                        compact={true}
                        memberCount={getMembersForLeader(abhishekLeader).length}
                        onClick={() => handleLeaderClick(abhishekLeader)}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {selectedLeader && (
        <>
          {/* Desktop/Tablet interactive SVG Star Topology */}
          <div
            className="hidden md:block relative w-full min-h-[460px] h-[500px] overflow-hidden p-4 transition-all duration-300 select-none"
          >
            <div
              ref={containerRef}
              className="relative w-full h-full transition-transform duration-300 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* SVG CONNECTIONS FOR SELECTED LEADER STAR TOPOLOGY */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {selectedLeaderMembers.map((member, idx) => {
                  const centerPos = { x: dimensions.width / 2, y: dimensions.height / 2 }
                  const memberPos = getStarMemberPosition(idx, selectedLeaderMembers.length)
                  const isHovered = hoveredMemberName === member.name

                  // Branch line connecting from center leader card to team member card
                  const pathD = `M ${centerPos.x} ${centerPos.y} L ${memberPos.x} ${memberPos.y}`

                  return (
                    <g key={`star-branch-${member.name}`}>
                      <motion.path
                        d={pathD}
                        fill="none"
                        stroke={isHovered ? "#22d3ee" : "#3b82f6"}
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        strokeDasharray={isHovered ? "none" : "4 4"}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.7 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.45, delay: idx * 0.05 }}
                      />

                      {!prefersReducedMotion && (
                        <motion.circle
                          r={isHovered ? 3.5 : 2}
                          fill="#22d3ee"
                          animate={{ offsetDistance: ["0%", "100%"] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.0 + (idx % 3) * 0.4,
                            ease: "linear"
                          }}
                          style={{ offsetPath: `path("${pathD}")` }}
                        />
                      )}
                    </g>
                  )
                })}
              </svg>

               {/* SELECTED LEADER DOCKED AT CENTER POSITION */}
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 z-40"
                style={{ left: dimensions.width / 2, top: dimensions.height / 2 }}
              >
                <NetworkNodeCard
                  member={selectedLeader}
                  badgeText={selectedLeader.category.toUpperCase()}
                  themeColor="cyan"
                  isSelected={true}
                  isHub={true}
                  compact={true}
                  memberCount={getMembersForLeader(selectedLeader).length}
                  onClick={() => handleLeaderClick(selectedLeader)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

              {/* ========================================================= */}
              {/* STAR TOPOLOGY SUBORDINATE MEMBERS                         */}
              {/* ========================================================= */}
              <AnimatePresence>
                {selectedLeader && (
                  <motion.div
                    key={`star-network-${selectedLeader.name}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                  >
                    {selectedLeaderMembers.map((member, idx) => {
                      const pos = getStarMemberPosition(idx, selectedLeaderMembers.length)
                      const isHovered = hoveredMemberName === member.name
                      const tier = getMemberTierLevel(member)

                      return (
                        <motion.div
                          key={member.name}
                          initial={{
                            opacity: 0,
                            scale: 0.5,
                            x: dimensions.width / 2 - 90,
                            y: dimensions.height / 2 - 50
                          }}
                          animate={{
                            opacity: 1,
                            scale: isHovered ? 1.08 : 1,
                            x: pos.x - 90,
                            y: pos.y - 50
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 14,
                            delay: prefersReducedMotion ? 0 : idx * 0.05
                          }}
                          onMouseEnter={() => setHoveredMemberName(member.name)}
                          onMouseLeave={() => setHoveredMemberName(null)}
                          onClick={() => {
                            setSelectedMemberModal(member)
                            if (onSelectMember) onSelectMember(member)
                          }}
                          className={`absolute w-44 sm:w-48 p-2.5 bg-slate-950 border-2 cursor-pointer select-none group transition-all duration-200 ${isHovered
                            ? "border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.4)] z-30"
                            : "border-slate-800 bg-slate-950/90 z-20"
                            }`}
                        >
                          {/* Pixel Corners */}
                          <div className="absolute -top-1 -left-1 size-1.5 bg-cyan-400 border border-slate-900" />
                          <div className="absolute -top-1 -right-1 size-1.5 bg-cyan-400 border border-slate-900" />
                          <div className="absolute -bottom-1 -left-1 size-1.5 bg-cyan-400 border border-slate-900" />
                          <div className="absolute -bottom-1 -right-1 size-1.5 bg-cyan-400 border border-slate-900" />

                          <div className="flex items-center gap-2.5 font-mono">
                            <div className="relative size-10 shrink-0 border border-slate-700 bg-slate-100 overflow-hidden shadow-[1px_1px_0px_#000]">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                style={getMemberAvatarStyle(member)}
                                className="w-full h-full object-cover"
                                onError={(e: any) => {
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
                                }}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="text-[11px] font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                                {member.name}
                              </h4>
                              <p className="text-[8px] text-slate-400 line-clamp-2 leading-tight mt-0.5">{member.role}</p>
                            </div>
                          </div>

                          <div className="mt-2 pt-1 border-t border-slate-800/80 flex items-center justify-between font-mono text-[8px]">
                            <span className={`px-1 py-0.5 border text-[7px] uppercase font-bold ${getTierBadgeStyle(tier)}`}>
                              Tier {tier}
                            </span>
                            <span className="text-slate-500 uppercase font-mono">{member.category}</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Mobile responsive grid layout */}
          <div className="block md:hidden px-4 py-4 space-y-4 font-mono select-none">
            <div className="flex flex-col items-center p-4 bg-slate-900/60 border border-slate-800 rounded-none mb-2">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">TEAM HUB</span>
              <div className="text-white font-extrabold text-sm mt-1">{selectedLeader.name}'s Division</div>
              <p className="text-[10px] text-slate-400 mt-1 font-mono text-center">
                Managing {selectedLeaderMembers.length} active node integrations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedLeaderMembers.map((member) => (
                <div
                  key={member.name}
                  onClick={() => {
                    setSelectedMemberModal(member)
                    if (onSelectMember) onSelectMember(member)
                  }}
                  className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 hover:border-cyan-500 transition-colors cursor-pointer"
                >
                  <div className="relative size-12 shrink-0 border border-slate-700 bg-slate-100 overflow-hidden shadow-[1px_1px_0px_#000]">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      style={getMemberAvatarStyle(member)}
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">{member.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate leading-tight">{member.role}</p>
                    <span className="inline-block text-[8px] uppercase font-bold text-cyan-400 border border-cyan-950 bg-cyan-950/40 px-1.5 py-0.5 mt-1">
                      Tier {getMemberTierLevel(member)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Floating Info Drawer on Hover */}
      <AnimatePresence>
        {hoveredMemberName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 z-40 bg-slate-950 border-2 border-cyan-500 p-3 shadow-[4px_4px_0px_#000] font-mono text-xs max-w-xs space-y-1"
          >
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-[10px] uppercase border-b border-slate-800 pb-1">
              <Compass className="size-3.5 animate-spin" /> NODE_INSPECTION :: {hoveredMemberName}
            </div>
            {(() => {
              const m = team.find((item) => item.name === hoveredMemberName)
              if (!m) return null
              return (
                <div className="space-y-0.5 pt-1 text-[10px]">
                  <div className="text-white font-bold">{m.name}</div>
                  <div className="text-cyan-300">{m.role}</div>
                  <div className="text-slate-400 uppercase">{m.category} Division Track</div>
                  {m.reportsTo && (
                    <div className="text-amber-400 text-[9px] pt-1">
                      → Reports to: {m.reportsTo}
                    </div>
                  )}
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Detail Drawer / Modal */}
      <AnimatePresence>
        {selectedMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-slate-950 border-2 border-cyan-500 p-6 shadow-[8px_8px_0px_#000] space-y-5 text-slate-100 font-mono"
            >
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase">
                  <Terminal className="size-4" />
                  MEMBER_NODE_TERMINAL
                </div>
                <button
                  onClick={() => setSelectedMemberModal(null)}
                  className="text-xs text-slate-400 hover:text-white hover:bg-slate-900 px-2 py-1 border border-slate-800 transition-colors cursor-pointer"
                >
                  [CLOSE / ESC]
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative size-20 shrink-0 border-2 border-cyan-500 bg-slate-900 overflow-hidden shadow-[3px_3px_0px_#000]">
                  <img
                    src={selectedMemberModal.avatar}
                    alt={selectedMemberModal.name}
                    style={getMemberAvatarStyle(selectedMemberModal)}
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white tracking-tight">{selectedMemberModal.name}</h3>
                  <p className="text-xs text-cyan-400 font-bold">{selectedMemberModal.role}</p>
                  <span className="inline-block mt-1 text-[9px] uppercase font-bold px-2 py-0.5 border border-slate-700 bg-slate-900 text-slate-300">
                    {selectedMemberModal.category} DIVISION
                  </span>
                </div>
              </div>

              <div className="border-2 border-slate-900 bg-slate-900/60 p-4 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-500">HIERARCHY LEVEL:</span>
                  <span className="text-cyan-400 font-bold">Tier {getMemberTierLevel(selectedMemberModal)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-500">ACADEMIC TERM:</span>
                  <span className="text-slate-200 font-bold">{selectedMemberModal.academicYear || "2026-2027"}</span>
                </div>
                {selectedMemberModal.reportsTo && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">REPORTING LEAD:</span>
                    <span className="text-amber-400 font-bold">→ {selectedMemberModal.reportsTo}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                {selectedMemberModal.github && (
                  <a
                    href={selectedMemberModal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 text-center text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-[2px_2px_0px_#000]"
                  >
                    <Github className="size-4" /> GITHUB
                  </a>
                )}
                {selectedMemberModal.linkedin && (
                  <a
                    href={selectedMemberModal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-blue-950 hover:bg-blue-900 border-2 border-blue-800 text-blue-300 text-center text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-[2px_2px_0px_#000]"
                  >
                    <Linkedin className="size-4" /> LINKEDIN
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedMemberModal(null)}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs border-2 border-slate-900 shadow-[3px_3px_0px_#000] transition-colors cursor-pointer"
              >
                CLOSE TERMINAL
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
