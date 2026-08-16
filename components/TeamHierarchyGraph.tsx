"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Crown,
  Code,
  Palette,
  Megaphone,
  ChevronDown,
  ChevronRight,
  Search,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Layers
} from "lucide-react"
import { TeamMember, getMemberAvatarStyle, getMemberTierLevel } from "@/types"

interface TeamHierarchyGraphProps {
  team: TeamMember[]
  onSelectMember?: (member: TeamMember) => void
  isAdminView?: boolean
}

const ACADEMIC_YEARS = ["2026-2027", "2025-2026", "2024-2025"]

export default function TeamHierarchyGraph({
  team,
  onSelectMember,
  isAdminView = false,
}: TeamHierarchyGraphProps) {
  const [selectedYear, setSelectedYear] = useState<string>("2026-2027")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMemberModal, setSelectedMemberModal] = useState<TeamMember | null>(null)
  const [collapsedTiers, setCollapsedTiers] = useState<Record<number, boolean>>({})

  // Categorize members into hierarchy tiers based on getMemberTierLevel helper
  const getTierLevel = (member: TeamMember): 1 | 2 | 3 | 4 => {
    return getMemberTierLevel(member)
  }

  // Filter members by year and search query
  const filteredMembers = team.filter((m) => {
    const yearMatches = !m.academicYear || m.academicYear === selectedYear
    const queryMatches =
      !searchQuery ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
    return yearMatches && queryMatches
  })

  const tier1Faculty = filteredMembers.filter((m) => getTierLevel(m) === 1)
  const tier2Execs = filteredMembers.filter((m) => getTierLevel(m) === 2)
  const tier3Leads = filteredMembers.filter((m) => getTierLevel(m) === 3)
  const tier4Members = filteredMembers.filter((m) => getTierLevel(m) === 4)

  const toggleTier = (tier: number) => {
    setCollapsedTiers((prev) => ({ ...prev, [tier]: !prev[tier] }))
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Faculty":
        return "bg-emerald-100 text-emerald-900 border-emerald-900"
      case "Leadership":
        return "bg-amber-100 text-amber-900 border-amber-900"
      case "Technical":
        return "bg-blue-100 text-blue-900 border-blue-900"
      case "Design":
        return "bg-purple-100 text-purple-900 border-purple-900"
      case "Marketing":
        return "bg-rose-100 text-rose-900 border-rose-900"
      default:
        return "bg-slate-100 text-slate-900 border-slate-900"
    }
  }

  const renderNodeCard = (m: TeamMember, level: number) => {
    const avatarSrc = m.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
    const photoStyle = getMemberAvatarStyle(m)

    return (
      <motion.div
        key={m.name}
        whileHover={{ y: -3 }}
        onClick={() => {
          if (onSelectMember) onSelectMember(m)
          setSelectedMemberModal(m)
        }}
        className="relative bg-white border-2 border-slate-900 p-3 rounded-none shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] transition-all cursor-pointer w-56 flex-shrink-0 flex flex-col justify-between"
      >
        {/* Connection node point top */}
        {level > 1 && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-2 border-white rounded-full z-10" />
        )}

        <div className="flex items-center gap-3">
          <div className="relative size-11 overflow-hidden border-2 border-slate-900 shrink-0 bg-slate-100 shadow-[1.5px_1.5px_0px_#000]">
            <img
              src={avatarSrc}
              alt={m.name}
              style={photoStyle}
              className="w-full h-full"
              onError={(e: any) => {
                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate font-mono">{m.name}</h4>
            <p className="text-[10px] text-slate-600 truncate font-mono">{m.role}</p>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between">
          <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 border ${getCategoryBadgeColor(m.category)}`}>
            {m.category}
          </span>
          {m.reportsTo && (
            <span className="text-[8px] font-mono text-slate-400 truncate max-w-[90px]">
              → {m.reportsTo.split(" ")[0]}
            </span>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="w-full space-y-6 select-none">

      {/* Hierarchy Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border-2 border-slate-900 p-4 shadow-[3px_3px_0px_#000]">

        {/* Year Selector Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1">
            <Layers className="size-3.5 text-blue-600" /> Academic Term:
          </span>
          <div className="flex border-2 border-slate-900 bg-slate-100">
            {ACADEMIC_YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${selectedYear === year ? "bg-blue-600 text-white shadow-[1.5px_1.5px_0px_#000]" : "text-slate-700 hover:bg-slate-200"
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roster by name or role..."
            className="w-full h-9 pl-9 pr-3 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all"
          />
        </div>

      </div>

      {/* Visual Hierarchy Graph Viewport */}
      <div className="w-full overflow-x-auto p-6 bg-slate-50 border-2 border-slate-900 shadow-[4px_4px_0px_#000] relative space-y-8 min-h-[450px]">

        {/* Tier 1: Faculty Mentors & Advisors */}
        <div className="space-y-3">
          <button
            onClick={() => toggleTier(1)}
            className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-emerald-800 bg-emerald-50 px-3 py-1 border-2 border-emerald-800 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <GraduationCap className="size-4" />
            <span>Tier 1: Faculty Advisory Board ({tier1Faculty.length})</span>
            {collapsedTiers[1] ? <ChevronRight className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>

          {!collapsedTiers[1] && (
            <div className="flex flex-wrap gap-4 pt-2 justify-start items-center">
              {tier1Faculty.length > 0 ? (
                tier1Faculty.map((m) => renderNodeCard(m, 1))
              ) : (
                <div className="text-[10px] font-mono text-slate-400 italic">No faculty coordinators listed for {selectedYear}.</div>
              )}
            </div>
          )}
        </div>

        {/* Tier Connector Line */}
        <div className="border-t-2 border-dashed border-slate-300 relative my-4">
          <div className="absolute left-1/2 -top-2 -translate-x-1/2 bg-slate-200 text-slate-600 px-2 py-0.5 font-mono text-[8px] uppercase font-bold border border-slate-400">
            Reporting Node Flow
          </div>
        </div>

        {/* Tier 2: Executive Leadership Committee */}
        <div className="space-y-3">
          <button
            onClick={() => toggleTier(2)}
            className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-800 bg-amber-50 px-3 py-1 border-2 border-amber-800 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Crown className="size-4" />
            <span>Tier 2: Student Leadership Committee ({tier2Execs.length})</span>
            {collapsedTiers[2] ? <ChevronRight className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>

          {!collapsedTiers[2] && (
            <div className="flex flex-wrap gap-4 pt-2 justify-start items-center">
              {tier2Execs.length > 0 ? (
                tier2Execs.map((m) => renderNodeCard(m, 2))
              ) : (
                <div className="text-[10px] font-mono text-slate-400 italic">No committee chairs registered.</div>
              )}
            </div>
          )}
        </div>

        {/* Tier Connector Line */}
        <div className="border-t-2 border-dashed border-slate-300 relative my-4" />

        {/* Tier 3: Track & Department Directors / Leads */}
        <div className="space-y-3">
          <button
            onClick={() => toggleTier(3)}
            className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-blue-800 bg-blue-50 px-3 py-1 border-2 border-blue-800 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Code className="size-4" />
            <span>Tier 3: Track Leads & Operations Directors ({tier3Leads.length})</span>
            {collapsedTiers[3] ? <ChevronRight className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>

          {!collapsedTiers[3] && (
            <div className="flex flex-wrap gap-4 pt-2 justify-start items-center">
              {tier3Leads.length > 0 ? (
                tier3Leads.map((m) => renderNodeCard(m, 3))
              ) : (
                <div className="text-[10px] font-mono text-slate-400 italic">No department leads registered.</div>
              )}
            </div>
          )}
        </div>

        {/* Tier 4: Core Team Members */}
        {tier4Members.length > 0 && (
          <>
            <div className="border-t-2 border-dashed border-slate-300 relative my-4" />
            <div className="space-y-3">
              <button
                onClick={() => toggleTier(4)}
                className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-800 bg-slate-100 px-3 py-1 border-2 border-slate-800 shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                <Users className="size-4" />
                <span>Tier 4: Core Team Contributors & Officers ({tier4Members.length})</span>
                {collapsedTiers[4] ? <ChevronRight className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </button>

              {!collapsedTiers[4] && (
                <div className="flex flex-wrap gap-4 pt-2 justify-start items-center">
                  {tier4Members.map((m) => renderNodeCard(m, 4))}
                </div>
              )}
            </div>
          </>
        )}

      </div>

      {/* Member Details Modal */}
      {selectedMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white border-2 border-slate-900 p-6 shadow-[6px_6px_0px_#000] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <span className="text-[9px] font-mono font-bold uppercase text-blue-600 bg-blue-50 border border-blue-600 px-2 py-0.5">
                Hierarchy Node Detail
              </span>
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900"
              >
                [ESC / CLOSE]
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative size-16 overflow-hidden border-2 border-slate-900 bg-slate-100 shadow-[2px_2px_0px_#000] shrink-0">
                <img
                  src={selectedMemberModal.avatar}
                  alt={selectedMemberModal.name}
                  style={getMemberAvatarStyle(selectedMemberModal)}
                  className="w-full h-full"
                  onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" }}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold font-mono text-slate-900">{selectedMemberModal.name}</h3>
                <p className="text-xs font-mono text-blue-600 font-bold mt-0.5">{selectedMemberModal.role}</p>
                <span className="inline-block mt-1 text-[9px] font-mono font-bold uppercase px-2 py-0.5 border border-slate-900 bg-slate-100">
                  {selectedMemberModal.category} Track
                </span>
              </div>
            </div>

            <div className="border-t-2 border-slate-900 pt-3 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Academic Term:</span>
                <span className="font-bold text-slate-900">{selectedMemberModal.academicYear || "2026-2027"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hierarchy Level:</span>
                <span className="font-bold text-slate-900">Tier {getTierLevel(selectedMemberModal)}</span>
              </div>
              {selectedMemberModal.reportsTo && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Reports To:</span>
                  <span className="font-bold text-slate-900">{selectedMemberModal.reportsTo}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="w-full py-2 bg-slate-900 text-white font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0px_#000]"
              >
                Close Node
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
