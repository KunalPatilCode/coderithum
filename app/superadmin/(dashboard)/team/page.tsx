"use client"

import React, { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table"
import { Users2, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react"

export default function TeamManagerPage() {
  const { toast } = useToast()
  const [team, setTeam] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "form">("list")
  const [editIndex, setEditIndex] = useState<number | null>(null) // Since name might change, track by list index

  // Form Fields
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [category, setCategory] = useState<"Faculty" | "Leadership" | "Technical" | "Design" | "Marketing">("Leadership")
  const [avatar, setAvatar] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_team")
      if (stored) {
        setTeam(JSON.parse(stored))
      }
      setLoading(false)
    }
  }, [])

  const saveToStorage = (updatedList: any[]) => {
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
    setView("form")
  }

  const handleOpenEdit = (member: any, index: number) => {
    setEditIndex(index)
    setName(member.name)
    setRole(member.role)
    setCategory(member.category || "Leadership")
    setAvatar(member.avatar)
    setGithub(member.github || "")
    setLinkedin(member.linkedin || "")
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

    const newMember = {
      name,
      role,
      category,
      avatar,
      github: github || undefined,
      linkedin: linkedin || undefined
    }

    let updatedList = []
    if (editIndex !== null) {
      updatedList = team.map((m, idx) => (idx === editIndex ? newMember : m))
      toast({
        title: "Member Updated",
        description: " Roster profiles have been updated successfully.",
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

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 block"
  const formInputClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"
  const selectClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono cursor-pointer"

  if (loading) return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading team roster...</div>

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">
      
      {/* Title Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase font-mono">
            {view === "list" ? "Team Roster Manager" : editIndex !== null ? "Edit Member Profile" : "Register Member"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {view === "list" 
              ? "Manage committee chairs, technical directors, faculty coordinators, and operations leads." 
              : "Provide avatar, role designation, department track, and social links."}
          </p>
        </div>

        {view === "list" ? (
          <Button onClick={handleOpenAdd} className="flex items-center gap-2">
            <Plus className="size-4" /> Add Member
          </Button>
        ) : (
          <Button onClick={() => setView("list")} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="size-4" /> Back to Roster
          </Button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow min-h-0 overflow-y-auto">
        {view === "list" ? (
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
                    <TableHead>Track Category</TableHead>
                    <TableHead>Social Links</TableHead>
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
                            className="size-8 rounded-none bg-slate-100 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#000] object-cover shrink-0" 
                            onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" }}
                          />
                          <div className="text-slate-900 text-xs font-bold font-mono">{m.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[11px] text-slate-600 font-mono font-bold">{m.role}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={m.category === "Faculty" ? "default" : "secondary"}>
                          {m.category || "Committee"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono font-bold">
                          {m.github && <span className="text-blue-600">GitHub</span>}
                          {m.linkedin && <span className="text-emerald-600">LinkedIn</span>}
                          {!m.github && !m.linkedin && <span>—</span>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
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
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl pb-12">
            <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 border-2 border-emerald-600 shadow-[1.5px_1.5px_0px_#000]">
                  <Users2 className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Roster Profile Specifications</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Define names, roles, and media hooks.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>FullName</label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className={labelClass}>Avatar Path / Unsplash Profile URL</label>
                  <input
                    type="text"
                    required
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className={formInputClass}
                    placeholder="https://images.unsplash.com/photo-..."
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
              <Button type="submit">
                {editIndex !== null ? "Save Profile Changes" : "Recruit Member"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
