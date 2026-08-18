"use client"

import React, { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table"
import {
  Users2,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  Layers,
  Sliders,
  Upload,
  RotateCcw,
  Crop,
  Eye,
  Check,
  Search,
  X,
  Camera,
  Pencil
} from "lucide-react"
import TeamHierarchyGraph from "@/components/TeamHierarchyGraph"
import { TeamMember, getMemberAvatarStyle, broadcastDataChange, getMemberTierLevel } from "@/types"

export default function TeamManagerPage() {
  const { toast } = useToast()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"roster" | "hierarchy" | "photos">("roster")
  const [view, setView] = useState<"list" | "form">("list")
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  // Pagination State
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Form Fields
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [category, setCategory] = useState<"Faculty" | "Leadership" | "Technical" | "Design" | "Marketing" | "Digital Media & Outreach Team">("Leadership")
  const [avatar, setAvatar] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [academicYear, setAcademicYear] = useState("2026-2027")
  const [tierLevel, setTierLevel] = useState<1 | 2 | 3 | 4>(2)
  const [reportsTo, setReportsTo] = useState("")

  // Photo Crop Modal State
  const [photoModalMemberIndex, setPhotoModalMemberIndex] = useState<number | null>(null)
  const [photoScale, setPhotoScale] = useState<number>(1)
  const [photoOffsetX, setPhotoOffsetX] = useState<number>(0)
  const [photoOffsetY, setPhotoOffsetY] = useState<number>(0)
  const [photoObjectPos, setPhotoObjectPos] = useState<string>("center center")
  const [photoObjectFit, setPhotoObjectFit] = useState<"cover" | "contain">("contain")
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_team")
      if (stored) {
        try {
          const parsed: TeamMember[] = JSON.parse(stored)
          const sanitized = parsed.map(m => {
            let role = m.role || ""
            let category = m.category || ""
            if (role.includes("Marketing") || role.includes("Digital Media and Outreach")) {
              role = role
                .replace("Marketing & Outreach", "Digital Media & Outreach Team")
                .replace("Digital Media and Outreach", "Digital Media & Outreach Team")
            }
            if (role.includes("Incubator") || role.includes("Operational Lead")) {
              role = role
                .replace("Incubator & Ops Lead", "Operations Lead")
                .replace("Incubator & Operations Lead", "Operations Lead")
                .replace("Incubator Operations Lead", "Operations Lead")
                .replace("Operational Lead", "Operations Lead")
            }
            if (role.includes("Chief")) {
              role = role
                .replace("Chief Technical Lead", "Technical Lead")
                .replace("Chief Technology Lead", "Technical Lead")
                .replace("Chief Tech Lead", "Tech Lead")
            }
            if (role.includes("Patron")) {
              role = role
                .replace("Principal & Chief Patron", "Principal")
                .replace("Principal and Chief Patron", "Principal")
            }
            if (category === "Marketing") {
              category = "Digital Media & Outreach Team" as const
            }
            let updatedMember = { ...m, role, category }
            if (m.name === "Kunal Patil" && m.avatarStyle?.transform?.includes("-46px")) {
              updatedMember = {
                ...updatedMember,
                photoPosition: { scale: 1.25, offsetX: 0, offsetY: 0, objectPosition: "center 10%" },
                avatarStyle: { objectPosition: "center 10%", transform: "scale(1.25) translate(0%, 0%)" }
              }
            }
            return updatedMember
          })
          const hasAaryan = sanitized.some((t: any) => t.name === "Aaryan Patel")
          if (!hasAaryan) {
            const updated: TeamMember[] = [...sanitized, {
              name: "Aaryan Patel",
              role: "Digital Media & Outreach Team (Outreach Lead)",
              category: "Digital Media & Outreach Team" as const,
              avatar: "/aaryan-patel.png",
              photoPosition: { scale: 1.2, offsetX: 0, offsetY: 5, objectPosition: "center 10%" },
              avatarStyle: { objectPosition: "center 10%", transform: "scale(1.2) translate(0%, 5%)" },
              linkedin: "https://linkedin.com",
              academicYear: "2026-2027",
              tierLevel: 3
            }]
            saveToStorage(updated)
          } else {
            saveToStorage(sanitized)
            setTeam(sanitized)
          }
        } catch (err) {
          console.error("Failed parsing stored team:", err)
        }
      }
      setLoading(false)
    }
  }, [])

  const saveToStorage = (updatedList: TeamMember[]) => {
    setTeam(updatedList)
    broadcastDataChange("coderithum_team", updatedList)
  }

  const handleOpenAdd = () => {
    setEditIndex(null)
    setName("")
    setRole("")
    setCategory("Leadership")
    setAvatar("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80")
    setGithub("")
    setLinkedin("")
    setAcademicYear("2026-2027")
    setTierLevel(2)
    setReportsTo("")
    setView("form")
  }

  const handleOpenEdit = (member: TeamMember, index: number) => {
    setEditIndex(index)
    setName(member.name)
    setRole(member.role)
    setCategory(member.category || "Leadership")
    setAvatar(member.avatar)
    setGithub(member.github || "")
    setLinkedin(member.linkedin || "")
    setAcademicYear(member.academicYear || "2026-2027")
    setTierLevel(getMemberTierLevel(member))
    setReportsTo(member.reportsTo || "")
    setView("form")
  }

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to remove this member from the team roster?")) {
      const updated = team.filter((_, idx) => idx !== index)
      saveToStorage(updated)
      toast({
        title: "Member Removed",
        description: "Member has been successfully removed from team configurations.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const defaultAvatar = avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
    const existing = editIndex !== null ? team[editIndex] : null

    const hasSameAvatar = existing && existing.avatar === defaultAvatar
    const defaultPosition = {
      scale: 1.0,
      offsetX: 0,
      offsetY: 0,
      objectPosition: "center center",
      objectFit: "contain" as const
    }
    const defaultStyle = {
      objectFit: "contain" as const,
      objectPosition: "center center",
      transform: "scale(1.0) translate(0%, 0%)",
      transformOrigin: "center center"
    }

    const newMember: TeamMember = {
      name,
      role,
      category,
      avatar: defaultAvatar,
      github: github || undefined,
      linkedin: linkedin || undefined,
      academicYear,
      tierLevel,
      reportsTo: reportsTo || undefined,
      photoPosition: hasSameAvatar ? (existing.photoPosition || defaultPosition) : defaultPosition,
      avatarStyle: hasSameAvatar ? (existing.avatarStyle || defaultStyle) : defaultStyle,
    }

    let updatedList: TeamMember[] = []
    if (editIndex !== null) {
      updatedList = team.map((m, idx) => (idx === editIndex ? { ...existing, ...newMember } : m))
      toast({
        title: "Member Updated",
        description: "Roster profile updated. Changes reflected on public website.",
        variant: "success",
      })
    } else {
      updatedList = [...team, newMember]
      toast({
        title: "Member Recruited",
        description: "New member profile registered and synchronized with public website.",
        variant: "success",
      })
    }

    saveToStorage(updatedList)
    setView("list")
  }

  // Open Crop/Photo Adjuster Modal
  const handleOpenPhotoAdjuster = (index: number) => {
    const member = team[index]
    setPhotoModalMemberIndex(index)
    setTempAvatarUrl(member.avatar)
    if (member.photoPosition) {
      setPhotoScale(member.photoPosition.scale || 1)
      setPhotoOffsetX(member.photoPosition.offsetX || 0)
      setPhotoOffsetY(member.photoPosition.offsetY || 0)
      setPhotoObjectPos(member.photoPosition.objectPosition || "center center")
      setPhotoObjectFit(member.photoPosition.objectFit === "cover" ? "cover" : "contain")
    } else {
      setPhotoScale(1)
      setPhotoOffsetX(0)
      setPhotoOffsetY(0)
      setPhotoObjectPos("center center")
      setPhotoObjectFit("contain")
    }
  }

  // Handle Photo Upload via File Input with Exact Aspect Ratio Preservation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetMemberIndex?: number | null) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const rawResult = event.target?.result
      if (typeof rawResult !== "string") return

      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const maxDim = 450
        let width = img.width
        let height = img.height

        // Preserve 100% exact original aspect ratio (no bottom cropping!)
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")

        let finalUrl = rawResult
        if (ctx) {
          const isPng = file.type === "image/png" || file.type === "image/webp" || (file.name && (file.name.toLowerCase().endsWith(".png") || file.name.toLowerCase().endsWith(".webp")))
          if (!isPng) {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, width, height)
          } else {
            ctx.clearRect(0, 0, width, height)
          }

          // Draw complete original photo without clipping top or bottom
          ctx.drawImage(img, 0, 0, width, height)
          finalUrl = isPng ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", 0.9)
        }

        // 1. Update live preview state in Crop Modal & reset offsets to contain full length
        setTempAvatarUrl(finalUrl)
        setPhotoScale(1.0)
        setPhotoOffsetX(0)
        setPhotoOffsetY(0)
        setPhotoObjectPos("center center")
        setPhotoObjectFit("contain")

        // 2. Update form state if in Registration/Edit Form view
        if (view === "form") {
          setAvatar(finalUrl)
        }

        // 3. Direct replacement for specific member index
        if (targetMemberIndex !== undefined && targetMemberIndex !== null && targetMemberIndex >= 0) {
          const updated = team.map((m, idx) => (idx === targetMemberIndex ? {
            ...m,
            avatar: finalUrl,
            photoPosition: { scale: 1.0, offsetX: 0, offsetY: 0, objectPosition: "center center", objectFit: "contain" as const },
            avatarStyle: { objectFit: "contain" as const, objectPosition: "center center", transform: "scale(1.0) translate(0%, 0%)", transformOrigin: "center center" }
          } : m))
          saveToStorage(updated)
        }

        toast({
          title: "Full Photo Uploaded",
          description: "Exact uploaded photo length preserved without bottom cropping.",
          variant: "success",
        })
      }

      img.onerror = () => {
        setTempAvatarUrl(rawResult)
        setPhotoScale(1.0)
        setPhotoOffsetX(0)
        setPhotoOffsetY(0)
        setPhotoObjectFit("contain")
        if (view === "form") setAvatar(rawResult)
        if (targetMemberIndex !== undefined && targetMemberIndex !== null && targetMemberIndex >= 0) {
          const updated = team.map((m, idx) => (idx === targetMemberIndex ? { ...m, avatar: rawResult } : m))
          saveToStorage(updated)
        }
      }

      img.src = rawResult
    }

    reader.onerror = () => {
      toast({
        title: "File Read Error",
        description: "Failed reading the selected photo file.",
        variant: "destructive",
      })
    }

    reader.readAsDataURL(file)
    e.target.value = ""
  }

  // Save Cropped / Offset Photo Settings
  const handleSavePhotoSettings = () => {
    if (photoModalMemberIndex === null) return

    const updated = team.map((m, idx) => {
      if (idx === photoModalMemberIndex) {
        return {
          ...m,
          avatar: tempAvatarUrl || m.avatar,
          photoPosition: {
            scale: photoScale,
            offsetX: photoOffsetX,
            offsetY: photoOffsetY,
            objectPosition: photoObjectPos,
            objectFit: photoObjectFit
          },
          avatarStyle: {
            objectFit: photoObjectFit,
            objectPosition: photoObjectPos,
            transform: `scale(${photoScale}) translate(${photoOffsetX}%, ${photoOffsetY}%)`,
            transformOrigin: "center center"
          }
        }
      }
      return m
    })

    saveToStorage(updated)
    setPhotoModalMemberIndex(null)
    toast({
      title: "Member Photo Saved",
      description: "Full photo length and position settings saved successfully.",
      variant: "success",
    })
  }

  const handleDeletePhoto = (index: number) => {
    const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
    const updated = team.map((m, idx) => {
      if (idx === index) {
        return {
          ...m,
          avatar: defaultAvatar,
          photoPosition: undefined,
          avatarStyle: undefined
        }
      }
      return m
    })
    saveToStorage(updated)
    toast({
      title: "Photo Reset",
      description: "Member photo reset to default vector avatar.",
    })
  }

  const uniqueRoles = Array.from(new Set(team.map(m => m.role).filter(Boolean))).sort()

  const filteredTeam = team.filter((m) => {
    const q = searchQuery.trim().toLowerCase()
    const matchesSearch = !q ||
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      (m.academicYear && m.academicYear.toLowerCase().includes(q))

    const matchesCategory = categoryFilter === "all" || m.category.toLowerCase() === categoryFilter.toLowerCase()

    const matchesRole = roleFilter === "all" || m.role.toLowerCase() === roleFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesRole
  })

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 block font-mono"
  const formInputClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"
  const selectClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono cursor-pointer"

  if (loading) return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading team roster...</div>

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">

      {/* Title & Navigation Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase font-mono">
            {view === "list" ? "Team Roster & Hierarchy Manager" : editIndex !== null ? "Edit Member Profile" : "Register Member"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            Manage student chairs, faculty coordinators, yearly team tree graphs, and member photo cropping.
          </p>
        </div>

        {view === "list" ? (
          <Button onClick={handleOpenAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-black text-white">
            <Plus className="size-4" /> Add Member
          </Button>
        ) : (
          <Button onClick={() => setView("list")} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="size-4" /> Back to Roster
          </Button>
        )}
      </div>

      {/* Primary Tab Switcher */}
      {view === "list" && (
        <div className="flex border-2 border-slate-900 bg-white shadow-[2px_2px_0px_#000] shrink-0">
          <button
            onClick={() => setActiveTab("roster")}
            className={`flex-1 py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${activeTab === "roster" ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
          >
            <Users2 className="size-3.5" /> Roster Table ({team.length})
          </button>
          <button
            onClick={() => setActiveTab("hierarchy")}
            className={`flex-1 py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-l-2 border-slate-900 transition-colors cursor-pointer ${activeTab === "hierarchy" ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
          >
            <Layers className="size-3.5" /> Visual Hierarchy Graph
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex-1 py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-l-2 border-slate-900 transition-colors cursor-pointer ${activeTab === "photos" ? "bg-purple-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
          >
            <ImageIcon className="size-3.5" /> Photo Deck & Crop Manager
          </button>
        </div>
      )}

      {/* Search Member & Dropdown Filter Control Bar */}
      {view === "list" && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-50 border-2 border-slate-900 shadow-[2.5px_2.5px_0px_#000] shrink-0 font-mono">

          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member by name, designation, track, or term..."
              className="w-full h-9 pl-9 pr-8 bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"
                title="Clear search text"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Dropdown Filters: Track & Role Designation */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0">

            {/* Track Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 px-2.5 bg-white border-2 border-slate-900 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 font-mono cursor-pointer"
              title="Filter by Track Category"
            >
              <option value="all">All Tracks</option>
              <option value="Faculty">Faculty Coordinator</option>
              <option value="Leadership">Leadership</option>
              <option value="Technical">Technical</option>
              <option value="Design">Design</option>
              <option value="Digital Media & Outreach Team">Digital Media & Outreach Team</option>
            </select>

            {/* Role Filter Dropdown */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-9 px-2.5 bg-white border-2 border-slate-900 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 font-mono cursor-pointer max-w-[200px] truncate"
              title="Filter by Role Designation"
            >
              <option value="all">All Roles ({uniqueRoles.length})</option>
              {uniqueRoles.map((r, rIdx) => (
                <option key={rIdx} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* Reset Filters Button */}
            {(searchQuery || categoryFilter !== "all" || roleFilter !== "all") && (
              <Button
                variant="outline"
                onClick={() => { setSearchQuery(""); setCategoryFilter("all"); setRoleFilter("all"); }}
                className="h-9 px-2 text-[10px] font-bold text-slate-600 hover:text-black flex items-center gap-1 shrink-0"
                title="Reset All Search & Dropdown Filters"
              >
                <RotateCcw className="size-3" /> Reset
              </Button>
            )}

            <span className="text-[10px] font-bold text-slate-700 bg-white border-2 border-slate-900 px-2.5 py-1.5 shrink-0 shadow-[1px_1px_0px_#000]">
              {filteredTeam.length} / {team.length} Members
            </span>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <div className="flex-grow min-h-0 overflow-y-auto">
        {view === "list" ? (
          activeTab === "roster" ? (
            <Card className="border-2 border-slate-900 rounded-none overflow-hidden bg-white shadow-[3px_3px_0px_#000]">
              {team.length === 0 ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs">
                  No team profiles configured. Click 'Add Member' to record roster details.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role Designation</TableHead>
                      <TableHead>Hierarchy Tier</TableHead>
                      <TableHead>Academic Term</TableHead>
                      <TableHead className="text-center font-bold uppercase tracking-wider font-mono text-[11px] text-slate-700">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeam.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-slate-500 font-mono text-xs">
                          No team members match your search query "{searchQuery}".
                        </TableCell>
                      </TableRow>
                    ) : (
                      (() => {
                        const totalPages = Math.ceil(filteredTeam.length / (itemsPerPage || 1)) || 1
                        const activePage = Math.min(currentPage, totalPages)
                        const paginatedTeam = itemsPerPage === 100 ? filteredTeam : filteredTeam.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)

                        return paginatedTeam.map((m) => {
                          const originalIndex = team.findIndex(t => t.name === m.name && t.role === m.role)
                          const targetIdx = originalIndex >= 0 ? originalIndex : 0
                          const photoStyle = getMemberAvatarStyle(m)

                          return (
                            <TableRow key={m.name + targetIdx}>
                              <TableCell className="font-semibold">
                                <div className="flex items-center gap-3">
                                  <div className="relative size-10 overflow-hidden rounded-none bg-slate-100 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#000] shrink-0">
                                    <img
                                      src={m.avatar}
                                      alt={m.name}
                                      className="w-full h-full object-cover"
                                      style={photoStyle}
                                      onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" }}
                                    />
                                  </div>
                                  <div>
                                    <div className="text-slate-900 text-xs font-bold font-mono">{m.name}</div>
                                    <div className="text-[9px] text-slate-500 font-mono">{m.category} Track</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-[11px] text-slate-600 font-mono font-bold">{m.role}</span>
                              </TableCell>
                              <TableCell>
                                <Badge variant={getMemberTierLevel(m) === 1 ? "default" : "secondary"}>
                                  Tier {getMemberTierLevel(m)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span className="text-xs font-mono font-bold text-slate-700">{m.academicYear || "2026-2027"}</span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOpenPhotoAdjuster(targetIdx)}
                                    className="flex items-center gap-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_#000]"
                                    title="Crop & Adjust Photo"
                                  >
                                    <Camera className="size-3.5 text-blue-600" />
                                    <span>Photo</span>
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleOpenEdit(m, targetIdx)}
                                    className="flex items-center gap-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_#000]"
                                    title="Edit Member"
                                  >
                                    <Edit2 className="size-3.5 text-blue-600" />
                                    <span>Edit</span>
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(targetIdx)}
                                    className="flex items-center gap-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_#000]"
                                    title="Remove Member"
                                  >
                                    <Trash2 className="size-3.5" />
                                    <span>Remove</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      })()
                    )}
                  </TableBody>
                </Table>
              )}

              {/* Pagination & Rows Per Page Dropdown matching screenshot */}
              {filteredTeam.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 border-t-2 border-slate-900 bg-slate-50 font-mono">
                  <span className="text-[11px] text-slate-600 font-semibold">
                    Showing {filteredTeam.length > 0 ? (Math.min(currentPage, Math.ceil(filteredTeam.length / (itemsPerPage || 1)) || 1) - 1) * itemsPerPage + 1 : 0} to {Math.min(Math.min(currentPage, Math.ceil(filteredTeam.length / (itemsPerPage || 1)) || 1) * itemsPerPage, filteredTeam.length)} of {filteredTeam.length} members
                  </span>

                  <div className="flex items-center gap-3">
                    {Math.ceil(filteredTeam.length / (itemsPerPage || 1)) > 1 && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          disabled={currentPage <= 1}
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className="h-8 px-2 text-xs font-mono font-bold"
                        >
                          Prev
                        </Button>
                        <span className="text-xs font-bold font-mono px-2 text-slate-800">
                          {Math.min(currentPage, Math.ceil(filteredTeam.length / (itemsPerPage || 1)) || 1)} / {Math.ceil(filteredTeam.length / (itemsPerPage || 1))}
                        </span>
                        <Button
                          variant="outline"
                          disabled={currentPage >= Math.ceil(filteredTeam.length / (itemsPerPage || 1))}
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTeam.length / (itemsPerPage || 1))))}
                          className="h-8 px-2 text-xs font-mono font-bold"
                        >
                          Next
                        </Button>
                      </div>
                    )}

                    {/* Rows per page selector matching user screenshot */}
                    <select
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      className="h-8 px-3 rounded-lg border-2 border-slate-900 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 font-mono shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                    >
                      <option value={5}>5 per page</option>
                      <option value={10}>10 per page</option>
                      <option value={25}>25 per page</option>
                      <option value={100}>All per page</option>
                    </select>
                  </div>
                </div>
              )}
            </Card>
          ) : activeTab === "hierarchy" ? (
            <TeamHierarchyGraph team={filteredTeam} isAdminView={true} />
          ) : (
            /* Photo Management & Crop Grid */
            <div className="space-y-4 pb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
                  Team Member Photo Deck & Crop Adjuster
                </h2>
                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  Click any avatar to crop, upload replacement, or adjust position offset.
                </span>
              </div>

              {filteredTeam.length === 0 ? (
                <div className="p-8 text-center text-slate-500 font-mono text-xs border-2 border-slate-900 bg-white">
                  No member photo cards match search query "{searchQuery}".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredTeam.map((m) => {
                    const originalIndex = team.findIndex(t => t.name === m.name && t.role === m.role)
                    const targetIdx = originalIndex >= 0 ? originalIndex : 0
                    const cardPhotoStyle = getMemberAvatarStyle(m)

                    return (
                      <Card
                        key={m.name + targetIdx}
                        className="p-4 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                          <div className="relative size-14 border-2 border-slate-900 bg-slate-100 shrink-0 shadow-[2px_2px_0px_#000] overflow-hidden">
                            <img
                              src={m.avatar}
                              alt={m.name}
                              style={cardPhotoStyle}
                              className="w-full h-full object-cover"
                              onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-slate-900 font-mono truncate">{m.name}</h4>
                            <p className="text-[10px] text-slate-500 font-mono truncate">{m.role}</p>
                            <Badge variant="outline" className="text-[8px] font-mono mt-1">
                              {m.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 pt-1">
                          <Button
                            variant="outline"
                            onClick={() => handleOpenPhotoAdjuster(targetIdx)}
                            className="flex-1 text-[9.5px] font-mono font-bold flex items-center justify-center gap-1 py-1 h-8"
                            title="Adjust Zoom & Position"
                          >
                            <Crop className="size-3 text-purple-600" /> Crop
                          </Button>

                          <label
                            className="flex-1 text-[9.5px] font-mono font-bold text-blue-600 cursor-pointer border-2 border-slate-900 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors shadow-[1px_1px_0px_#000] flex items-center justify-center gap-1 py-1 h-8 px-2"
                            title="Upload Replacement Image File"
                          >
                            <Upload className="size-3" /> Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, targetIdx)}
                              className="hidden"
                            />
                          </label>

                          <Button
                            variant="destructive"
                            onClick={() => handleDeletePhoto(targetIdx)}
                            className="size-8 p-0 shrink-0"
                            title="Reset Photo to Default"
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>

                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )
        ) : (
          /* Member Registration & Edit Form */
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl pb-12">
            <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 border-2 border-emerald-600 shadow-[1.5px_1.5px_0px_#000]">
                  <Users2 className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Roster Profile Specifications</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Define names, designated role, academic term, and hierarchy reporting.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. Kunal Patil"
                  />
                </div>
                <div>
                  <label className={labelClass}>Designated Role</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. AI & GenAI Lead / Club President"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Category Track</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className={selectClass}
                  >
                    <option value="Faculty">Faculty Coordinator</option>
                    <option value="Leadership">Student Leadership Committee</option>
                    <option value="Technical">Technical Operations Tree</option>
                    <option value="Design">Creative & UI/UX Design Tree</option>
                    <option value="Digital Media & Outreach Team">Digital Media & Outreach Team Tree</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Academic Term</label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className={selectClass}
                  >
                    <option value="2026-2027">2026-2027 (Current)</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Hierarchy Tier Level</label>
                  <select
                    value={tierLevel}
                    onChange={(e: any) => setTierLevel(Number(e.target.value) as any)}
                    className={selectClass}
                  >
                    <option value={1}>Tier 1: Faculty Advisory Board</option>
                    <option value={2}>Tier 2: Student Leadership Committee</option>
                    <option value={3}>Tier 3: Track Leads & Directors</option>
                    <option value={4}>Tier 4: Core Team Contributors</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1: Avatar URL & File Upload with Clean Aligned Preview */}
                <div>
                  <label className={labelClass}>Avatar Image & Photo Upload</label>
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 border-2 border-slate-900 bg-slate-100 shrink-0 shadow-[2px_2px_0px_#000] overflow-hidden">
                      <img
                        src={avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                        alt="Form Preview"
                        className="w-full h-full"
                        style={editIndex !== null && team[editIndex] ? getMemberAvatarStyle(team[editIndex]) : { objectFit: "contain" }}
                        onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" }}
                      />
                    </div>
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <input
                        type="text"
                        required
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className={formInputClass}
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] font-mono font-bold text-blue-600 cursor-pointer border-2 border-slate-900 bg-blue-50 px-2.5 py-1 hover:bg-blue-600 hover:text-white transition-colors shadow-[1px_1px_0px_#000] flex items-center gap-1 shrink-0">
                          <Upload className="size-3" /> Upload File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[9px] font-mono text-slate-500 truncate">Supports JPG, PNG, WebP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Reports To Supervisor Field */}
                <div className="flex flex-col justify-between">
                  <div>
                    <label className={labelClass}>Reports To Supervisor (Optional)</label>
                    <input
                      type="text"
                      value={reportsTo}
                      onChange={(e) => setReportsTo(e.target.value)}
                      className={formInputClass}
                      placeholder="e.g. Club President or Faculty Advisor"
                    />
                  </div>
                  <p className="text-[9px] font-mono text-slate-500 mt-1">Specify direct manager or lead for visual hierarchy reporting tree.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 border-slate-900 pt-4">
                <div>
                  <label className={labelClass}>GitHub Profile URL (Optional)</label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className={formInputClass}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className={labelClass}>LinkedIn Network Link (Optional)</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={formInputClass}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-3 shrink-0">
              <Button type="button" variant="secondary" onClick={() => setView("list")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-black text-white">
                {editIndex !== null ? "Save Profile Changes" : "Recruit Member"}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Interactive Photo Crop & Offset Adjuster Modal */}
      {photoModalMemberIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white border-2 border-slate-900 p-6 shadow-[8px_8px_0px_#000] space-y-5 animate-in zoom-in-95 duration-150">

            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Crop className="size-4 text-purple-600" />
                <h3 className="text-xs font-bold uppercase font-mono text-slate-900">
                  Interactive Photo Crop & Offset Adjuster
                </h3>
              </div>
              <button
                onClick={() => setPhotoModalMemberIndex(null)}
                className="text-xs font-mono font-bold text-slate-500 hover:text-black"
              >
                [CANCEL]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

              {/* Live Preview Card */}
              <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-slate-50 border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-500">Live Frame Preview</span>
                <div className="relative size-24 border-2 border-slate-900 bg-white overflow-hidden shadow-[2px_2px_0px_#000]">
                  <img
                    key={tempAvatarUrl}
                    src={tempAvatarUrl}
                    alt="Preview"
                    style={{
                      objectFit: photoObjectFit,
                      objectPosition: photoObjectPos,
                      transform: `scale(${photoScale}) translate(${photoOffsetX}%, ${photoOffsetY}%)`,
                      transformOrigin: "center center"
                    }}
                    className="w-full h-full transition-all"
                    onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" }}
                  />
                </div>
                <span className="text-[9px] font-mono text-slate-600 font-bold">{team[photoModalMemberIndex]?.name}</span>
              </div>

              {/* Position & Scale Sliders */}
              <div className="space-y-4 font-mono">
                <div>
                  <label className={labelClass}>Photo Display Mode</label>
                  <select
                    value={photoObjectFit}
                    onChange={(e: any) => setPhotoObjectFit(e.target.value)}
                    className={selectClass}
                  >
                    <option value="contain">Full Photo (Exact Length - No Bottom Crop)</option>
                    <option value="cover">Fill Square Frame (Edge to Edge)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 flex justify-between">
                    <span>Zoom / Scale Factor</span>
                    <span className="text-blue-600">{photoScale.toFixed(2)}x</span>
                  </label>
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.05"
                    value={photoScale}
                    onChange={(e) => setPhotoScale(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 flex justify-between">
                    <span>Horizontal Offset X</span>
                    <span className="text-blue-600">{photoOffsetX}%</span>
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={photoOffsetX}
                    onChange={(e) => setPhotoOffsetX(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold uppercase text-slate-500 flex justify-between">
                    <span>Vertical Offset Y</span>
                    <span className="text-blue-600">{photoOffsetY}%</span>
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={photoOffsetY}
                    onChange={(e) => setPhotoOffsetY(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className={labelClass}>Focal Alignment</label>
                  <select
                    value={photoObjectPos}
                    onChange={(e) => setPhotoObjectPos(e.target.value)}
                    className={selectClass}
                  >
                    <option value="center center">Center Center</option>
                    <option value="center top">Center Top</option>
                    <option value="center 10%">Center 10% (Face Focus)</option>
                    <option value="center 90%">Center Bottom</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => { setPhotoScale(1); setPhotoOffsetX(0); setPhotoOffsetY(0); setPhotoObjectPos("center center"); setPhotoObjectFit("contain"); }}
                    className="text-[9px] font-mono font-bold bg-slate-100 hover:bg-slate-200 border border-slate-900 px-2 py-1"
                  >
                    Reset Offsets
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPhotoScale(1.3); setPhotoOffsetX(0); setPhotoOffsetY(0); setPhotoObjectPos("center center"); setPhotoObjectFit("cover"); }}
                    className="text-[9px] font-mono font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-700 px-2 py-1"
                  >
                    Face Zoom
                  </button>
                </div>
              </div>

            </div>

            {/* Replace Image Upload */}
            <div className="border-t-2 border-slate-900 pt-4 space-y-2 font-mono">
              <label className={labelClass}>Upload / Replace Photo File</label>
              <div className="flex items-center gap-3">
                <label className="text-xs font-mono font-bold text-blue-600 cursor-pointer border-2 border-slate-900 bg-blue-50 px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors shadow-[1.5px_1.5px_0px_#000] flex items-center gap-1.5">
                  <Upload className="size-3.5" /> Choose New Photo File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="hidden"
                  />
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {tempAvatarUrl.startsWith("data:") ? "✓ New custom image loaded" : "Supports JPG, PNG, WebP"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t-2 border-slate-900 pt-4 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setPhotoModalMemberIndex(null)}>
                Cancel
              </Button>
              <Button onClick={handleSavePhotoSettings} className="bg-purple-600 hover:bg-black text-white flex items-center gap-1.5">
                <Check className="size-4" /> Save Photo Position
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
