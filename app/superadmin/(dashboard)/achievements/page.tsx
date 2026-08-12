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
import { Trophy, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react"

export default function AchievementsManagerPage() {
  const { toast } = useToast()
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "form">("list")
  const [editId, setEditId] = useState<string | null>(null)

  // Form Fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [recipient, setRecipient] = useState("")
  const [award, setAward] = useState("")
  const [iconType, setIconType] = useState<"trophy" | "paper" | "star">("trophy")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_achievements")
      if (stored) {
        setAchievements(JSON.parse(stored))
      }
      setLoading(false)
    }
  }, [])

  const saveToStorage = (updatedList: any[]) => {
    localStorage.setItem("coderithum_achievements", JSON.stringify(updatedList))
    setAchievements(updatedList)
  }

  const handleOpenAdd = () => {
    setEditId(null)
    setTitle("")
    setDescription("")
    setDate("")
    setRecipient("")
    setAward("")
    setIconType("trophy")
    setView("form")
  }

  const handleOpenEdit = (ach: any) => {
    setEditId(ach.id)
    setTitle(ach.title)
    setDescription(ach.description)
    setDate(ach.date)
    setRecipient(ach.recipient)
    setAward(ach.award)
    setIconType(ach.iconType || "trophy")
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this achievement profile? This action cannot be undone.")) {
      const updated = achievements.filter((a) => a.id !== id)
      saveToStorage(updated)
      toast({
        title: "Achievement Deleted",
        description: "Accolade entry has been successfully removed.",
        variant: "success",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    const id = editId || `${slug}-${Date.now().toString().slice(-4)}`

    const newAchievement = {
      id,
      title,
      description,
      date,
      recipient,
      award,
      iconType
    }

    let updatedList = []
    if (editId) {
      updatedList = achievements.map((a) => (a.id === editId ? newAchievement : a))
      toast({
        title: "Achievement Updated",
        description: "Accolade entry changes saved successfully.",
        variant: "success",
      })
    } else {
      updatedList = [newAchievement, ...achievements]
      toast({
        title: "Achievement Logged",
        description: "New accolade has been added to achievements scroll.",
        variant: "success",
      })
    }

    saveToStorage(updatedList)
    setView("list")
  }

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 block"
  const formInputClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"
  const selectClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono cursor-pointer"
  const textareaClass = "w-full min-h-[100px] p-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"

  if (loading) return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading achievements scroll...</div>

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">
      
      {/* Title Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase font-mono">
            {view === "list" ? "Achievements Log" : editId ? "Edit Accolade" : "Record Accolade"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {view === "list" 
              ? "List and showcase competitive code submissions, hackathon prizes, and institute awards." 
              : "Define award name, recipient student, host context, and dates."}
          </p>
        </div>

        {view === "list" ? (
          <Button onClick={handleOpenAdd} className="flex items-center gap-2">
            <Plus className="size-4" /> Add Achievement
          </Button>
        ) : (
          <Button onClick={() => setView("list")} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="size-4" /> Back to Log
          </Button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow min-h-0 overflow-y-auto">
        {view === "list" ? (
          <Card className="border-2 border-slate-900 rounded-none overflow-hidden bg-white shadow-[3px_3px_0px_#000]">
            {achievements.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-xs">
                No achievements recorded. Click 'Add Achievement' to register one.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Award Title / Context</TableHead>
                    <TableHead>Accolade / Trophy</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Date Awarded</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {achievements.map((ach) => (
                    <TableRow key={ach.id}>
                      <TableCell className="font-semibold">
                        <div className="text-slate-900 text-xs font-bold font-mono">{ach.title}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{ach.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600">
                          <Trophy className="size-3.5 shrink-0" />
                          <span>{ach.award}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[11px] text-slate-600 font-mono font-bold">{ach.recipient}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-[11px] text-slate-500 font-mono font-bold">{ach.date}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button 
                            variant="secondary" 
                            className="size-8 p-0" 
                            onClick={() => handleOpenEdit(ach)}
                            title="Edit Accolade"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="size-8 p-0" 
                            onClick={() => handleDelete(ach.id)}
                            title="Delete Accolade"
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
                <div className="p-1.5 rounded bg-amber-50 text-amber-600 border-2 border-amber-600 shadow-[1.5px_1.5px_0px_#000]">
                  <Trophy className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Accolade Details Specification</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Define award recipients, scopes, and badges.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Achievement Name / Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. Smart India Hackathon internal pitching"
                  />
                </div>
                <div>
                  <label className={labelClass}>Accolade Name (Specific Award Title)</label>
                  <input
                    type="text"
                    required
                    value={award}
                    onChange={(e) => setAward(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. 1st Prize Winner / Trophy Winner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Recipient (Team or Student name)</label>
                  <input
                    type="text"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. CodeRhythm Web Dev Team"
                  />
                </div>
                <div>
                  <label className={labelClass}>Date Awarded</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. March 2026"
                  />
                </div>
                <div>
                  <label className={labelClass}>Icon Graphic Type</label>
                  <select
                    value={iconType}
                    onChange={(e: any) => setIconType(e.target.value)}
                    className={selectClass}
                  >
                    <option value="trophy">Trophy Icon</option>
                    <option value="paper">Certificate / Paper Icon</option>
                    <option value="star">Star Badge Icon</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Full Description / Context Outline</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={textareaClass}
                  placeholder="Detail the competition details, problems solved, and the jury evaluation..."
                />
              </div>
            </Card>

            <div className="flex justify-end gap-3 shrink-0">
              <Button type="button" variant="secondary" onClick={() => setView("list")}>
                Cancel
              </Button>
              <Button type="submit">
                {editId ? "Save Accolade Changes" : "Log Accolade"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
