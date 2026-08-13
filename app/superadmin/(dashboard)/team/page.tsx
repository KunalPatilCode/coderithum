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
  Check
} from "lucide-react"
import TeamHierarchyGraph from "@/components/TeamHierarchyGraph"
import { TeamMember } from "@/types"

export default function TeamManagerPage() {
  const { toast } = useToast()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"roster" | "hierarchy" | "photos">("roster")
  const [view, setView] = useState<"list" | "form">("list")
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // Form Fields
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [category, setCategory] = useState<"Faculty" | "Leadership" | "Technical" | "Design" | "Marketing">("Leadership")
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
  const [photoObjectPos, setPhotoObjectPos] = useState<string>("center 10%")
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_team")
      if (stored) {
        const parsed = JSON.parse(stored)
        const hasAaryan = parsed.some((t: any) => t.name === "Aaryan Patel")
        if (!hasAaryan) {
          const updated = [...parsed, {
            name: "Aaryan Patel",
            role: "Marketing & Outreach (Outreach Lead)",
            category: "Marketing",
            avatar: "/aaryan-patel.png",
            avatarStyle: {
              objectPosition: "center 10%",
              transform: "translateY(18px) scale(1.25)",
            },
            linkedin: "https://linkedin.com",
            academicYear: "2026-2027",
            tierLevel: 3
          }]
          localStorage.setItem("coderithum_team", JSON.stringify(updated))
          setTeam(updated)
        } else {
          setTeam(parsed)
        }
      }
      setLoading(false)
    }
  }, [])

  const saveToStorage = (updatedList: TeamMember[]) => {
    localStorage.setItem("coderithum_team", JSON.stringify(updatedList))
    setTeam(updatedList)
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
    setTierLevel(member.tierLevel || 2)
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
        variant: "success",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newMember: TeamMember = {
      name,
      role,
      category,
      avatar,
      github: github || undefined,
      linkedin: linkedin || undefined,
      academicYear,
      tierLevel,
      reportsTo: reportsTo || undefined
    }

    let updatedList: TeamMember[] = []
    if (editIndex !== null) {
      updatedList = team.map((m, idx) => (idx === editIndex ? { ...m, ...newMember } : m))
      toast({
        title: "Member Updated",
        description: "Roster profiles have been updated successfully.",
        variant: "success",
      })
    } else {
      updatedList = [...team, newMember]
      toast({
        title: "Member Recruited",
        description: "New member profile has been registered in the database.",
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
      setPhotoObjectPos(member.photoPosition.objectPosition || "center 10%")
    } else {
      setPhotoScale(1)
      setPhotoOffsetX(0)
      setPhotoOffsetY(0)
      setPhotoObjectPos("center 10%")
    }
  }

  // Handle Photo Upload via File Input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setTempAvatarUrl(reader.result)
          toast({
            title: "Photo Loaded",
            description: "New image loaded into crop preview.",
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Save Cropped / Offset Photo Settings
  const handleSavePhotoSettings = () => {
    if (photoModalMemberIndex === null) return

    const updated = team.map((m, idx) => {
      if (idx === photoModalMemberIndex) {
        return {
          ...m,
          avatar: tempAvatarUrl,
          photoPosition: {
            scale: photoScale,
            offsetX: photoOffsetX,
            offsetY: photoOffsetY,
            objectPosition: photoObjectPos
          },
          avatarStyle: {
            objectPosition: photoObjectPos,
            transform: `scale(${photoScale}) translate(${photoOffsetX}px, ${photoOffsetY}px)`
          }
        }
      }
      return m
    })

    saveToStorage(updated)
    setPhotoModalMemberIndex(null)
    toast({
      title: "Member Photo Saved",
      description: "Member photo position and crop settings saved.",
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
            className={`flex-1 py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === "roster" ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Users2 className="size-3.5" /> Roster Table ({team.length})
          </button>
          <button
            onClick={() => setActiveTab("hierarchy")}
            className={`flex-1 py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-l-2 border-slate-900 transition-colors cursor-pointer ${
              activeTab === "hierarchy" ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Layers className="size-3.5" /> Visual Hierarchy Graph
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex-1 py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-l-2 border-slate-900 transition-colors cursor-pointer ${
              activeTab === "photos" ? "bg-purple-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <ImageIcon className="size-3.5" /> Photo Deck & Crop Manager
          </button>
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {team.map((m, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-semibold">
                          <div className="flex items-center gap-3">
                            <img 
                              src={m.avatar} 
                              alt={m.name} 
                              className="size-9 rounded-none bg-slate-100 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#000] object-cover shrink-0" 
                              style={m.avatarStyle}
                              onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" }}
                            />
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
                          <Badge variant={m.category === "Faculty" ? "default" : "secondary"}>
                            Tier {m.tierLevel || (m.category === "Faculty" ? 1 : 2)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs font-mono font-bold text-slate-700">{m.academicYear || "2026-2027"}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1.5">
                            <Button 
                              variant="outline" 
                              className="size-8 p-0" 
                              onClick={() => handleOpenPhotoAdjuster(idx)}
                              title="Crop & Adjust Photo"
                            >
                              <Crop className="size-3.5 text-purple-600" />
                            </Button>
                            <Button 
                              variant="secondary" 
                              className="size-8 p-0" 
                              onClick={() => handleOpenEdit(m, idx)}
                              title="Edit Member"
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              className="size-8 p-0" 
                              onClick={() => handleDelete(idx)}
                              title="Remove Member"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          ) : activeTab === "hierarchy" ? (
            <TeamHierarchyGraph team={team} isAdminView={true} />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {team.map((m, idx) => (
                  <Card
                    key={idx}
                    className="p-4 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                      <div className="relative size-14 border-2 border-slate-900 bg-slate-100 shrink-0 shadow-[2px_2px_0px_#000] overflow-hidden">
                        <img
                          src={m.avatar}
                          alt={m.name}
                          style={m.avatarStyle}
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

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Button
                        variant="outline"
                        onClick={() => handleOpenPhotoAdjuster(idx)}
                        className="w-full text-[10px] font-mono font-bold flex items-center justify-center gap-1.5"
                      >
                        <Crop className="size-3 text-purple-600" /> Crop / Position
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeletePhoto(idx)}
                        className="p-2 h-auto shrink-0"
                        title="Reset Photo"
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>

                  </Card>
                ))}
              </div>
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
                    <option value="Marketing">Branding & Social Outreach Tree</option>
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
                <div>
                  <label className={labelClass}>Avatar Path / Image URL</label>
                  <input
                    type="text"
                    required
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className={formInputClass}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

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
                    src={tempAvatarUrl}
                    alt="Preview"
                    style={{
                      objectPosition: photoObjectPos,
                      transform: `scale(${photoScale}) translate(${photoOffsetX}px, ${photoOffsetY}px)`
                    }}
                    className="w-full h-full object-cover transition-all"
                  />
                </div>
                <span className="text-[9px] font-mono text-slate-600 font-bold">{team[photoModalMemberIndex]?.name}</span>
              </div>

              {/* Position & Scale Sliders */}
              <div className="space-y-4 font-mono">
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
                    <span className="text-blue-600">{photoOffsetX}px</span>
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
                    <span className="text-blue-600">{photoOffsetY}px</span>
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
                    <option value="center top">Center Top</option>
                    <option value="center 10%">Center 10% (Face Focus)</option>
                    <option value="center center">Center Center</option>
                    <option value="center 90%">Center Bottom</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Replace Image Upload */}
            <div className="border-t-2 border-slate-900 pt-4 space-y-2 font-mono">
              <label className={labelClass}>Upload / Replace Photo File</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:border-2 file:border-slate-900 file:bg-slate-100 file:font-mono file:text-xs file:font-bold file:cursor-pointer"
                />
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
