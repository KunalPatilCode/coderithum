"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
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
import { Code2, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react"
import { broadcastDataChange } from "@/types"

export default function ProjectsManagerPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "form">("list")
  const [editId, setEditId] = useState<string | null>(null)

  // Form Fields
  const [title, setTitle] = useState("")
  const [banner, setBanner] = useState("")
  const [shortDesc, setShortDesc] = useState("")
  const [description, setDescription] = useState("")
  const [techStackInput, setTechStackInput] = useState("") // comma separated
  const [github, setGithub] = useState("")
  const [demo, setDemo] = useState("")
  const [mentor, setMentor] = useState("")
  const [teamInput, setTeamInput] = useState("") // comma separated

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_projects")
      if (stored) {
        setProjects(JSON.parse(stored))
      }
      setLoading(false)
    }
  }, [])

  // Auto trigger form if query parameter is present
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      handleOpenAdd()
    }
  }, [searchParams])

  const saveToStorage = (updatedList: any[]) => {
    setProjects(updatedList)
    broadcastDataChange("coderithum_projects", updatedList)
  }

  const handleOpenAdd = () => {
    setEditId(null)
    setTitle("")
    setBanner("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80")
    setShortDesc("")
    setDescription("")
    setTechStackInput("")
    setGithub("")
    setDemo("")
    setMentor("")
    setTeamInput("")
    setView("form")
  }

  const handleOpenEdit = (proj: any) => {
    setEditId(proj.id)
    setTitle(proj.title)
    setBanner(proj.banner)
    setShortDesc(proj.shortDesc)
    setDescription(proj.description)
    setTechStackInput((proj.techStack || []).join(", "))
    setGithub(proj.github || "")
    setDemo(proj.demo || "")
    setMentor(proj.mentor || "")
    setTeamInput((proj.team || []).join(", "))
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      const updated = projects.filter((p) => p.id !== id)
      saveToStorage(updated)
      toast({
        title: "Project Deleted",
        description: "The project has been successfully removed from showcase.",
        variant: "success",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    const id = editId || `${slug}-${Date.now().toString().slice(-4)}`

    const parsedTechStack = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    const parsedTeam = teamInput
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m.length > 0)

    const newProject = {
      id,
      title,
      banner,
      shortDesc,
      description,
      techStack: parsedTechStack,
      github,
      demo,
      mentor,
      team: parsedTeam,
      gallery: []
    }

    let updatedList = []
    if (editId) {
      updatedList = projects.map((p) => (p.id === editId ? newProject : p))
      toast({
        title: "Project Updated",
        description: "Changes to the project were saved successfully.",
        variant: "success",
      })
    } else {
      updatedList = [newProject, ...projects]
      toast({
        title: "Project Added",
        description: "New project has been published to the portfolio showcase.",
        variant: "success",
      })
    }

    saveToStorage(updatedList)
    setView("list")
  }

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 block"
  const formInputClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"
  const textareaClass = "w-full min-h-[100px] p-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"

  if (loading) return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading projects portfolio...</div>

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">

      {/* Title Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase font-mono">
            {view === "list" ? "Projects Manager" : editId ? "Edit Project" : "Showcase Project"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {view === "list"
              ? "List, verify, and publish developer achievements and student-led software models."
              : "Provide technical specs, code links, and core developers to add to showcase."}
          </p>
        </div>

        {view === "list" ? (
          <Button onClick={handleOpenAdd} className="flex items-center gap-2">
            <Plus className="size-4" /> Showcase Project
          </Button>
        ) : (
          <Button onClick={() => setView("list")} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="size-4" /> Back to List
          </Button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow min-h-0 overflow-y-auto">
        {view === "list" ? (
          <Card className="border-2 border-slate-900 rounded-none overflow-hidden bg-white shadow-[3px_3px_0px_#000]">
            {projects.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-xs">
                No projects currently showcased. Click 'Showcase Project' to submit one.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Showcase</TableHead>
                    <TableHead>Technologies Used</TableHead>
                    <TableHead>Team Members</TableHead>
                    <TableHead>Advising Mentor</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((proj) => (
                    <TableRow key={proj.id}>
                      <TableCell className="font-semibold">
                        <div className="text-slate-900 text-xs font-bold font-mono">{proj.title}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{proj.shortDesc}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(proj.techStack || []).slice(0, 3).map((stack: string) => (
                            <Badge key={stack} variant="outline" className="text-[9px] py-0">
                              {stack}
                            </Badge>
                          ))}
                          {(proj.techStack || []).length > 3 && (
                            <Badge variant="secondary" className="text-[9px] py-0">
                              +{proj.techStack.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-[11px] text-slate-600 font-bold font-mono line-clamp-1">
                          {(proj.team || []).join(", ")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[11px] text-slate-500 font-bold font-mono">{proj.mentor || "Self-guided"}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button
                            variant="secondary"
                            className="size-8 p-0"
                            onClick={() => handleOpenEdit(proj)}
                            title="Edit Project"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            className="size-8 p-0"
                            onClick={() => handleDelete(proj.id)}
                            title="Delete Project"
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
                <div className="p-1.5 rounded bg-blue-50 text-blue-600 border-2 border-blue-600 shadow-[1.5px_1.5px_0px_#000]">
                  <Code2 className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Technical Specifications</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Configure code connections, names, and stacks.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Project Name</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. Smart Plant Irrigation system"
                  />
                </div>
                <div>
                  <label className={labelClass}>Banner Image (Absolute url path)</label>
                  <input
                    type="text"
                    required
                    value={banner}
                    onChange={(e) => setBanner(e.target.value)}
                    className={formInputClass}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Tech Stack (Comma-separated list of frameworks/tools)</label>
                <input
                  type="text"
                  required
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  className={formInputClass}
                  placeholder="e.g. React Native, IoT, Node.js, Arduino"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>GitHub Code Repository URL</label>
                  <input
                    type="url"
                    required
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className={formInputClass}
                    placeholder="https://github.com/coderithum/..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Live Demo Host Link</label>
                  <input
                    type="url"
                    value={demo}
                    onChange={(e) => setDemo(e.target.value)}
                    className={formInputClass}
                    placeholder="https://project-demo.vercel.app"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Advising Professor/Mentor (Optional)</label>
                  <input
                    type="text"
                    value={mentor}
                    onChange={(e) => setMentor(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g., Mrs. Hemali J. Damania"
                  />
                </div>
                <div>
                  <label className={labelClass}>Project Contributors / Team Members (Comma-separated list)</label>
                  <input
                    type="text"
                    required
                    value={teamInput}
                    onChange={(e) => setTeamInput(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. Md Ismile, Aarav Sharma, Maitri Patel"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Snappy Summary (Single line display overview)</label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className={formInputClass}
                  placeholder="Briefly pitch what this project solves in one sentence"
                />
              </div>

              <div>
                <label className={labelClass}>Full Project Description / Architecture Outline</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={textareaClass}
                  placeholder="Detail the algorithm, database design, problems encountered, and solutions engineered..."
                />
              </div>
            </Card>

            <div className="flex justify-end gap-3 shrink-0">
              <Button type="button" variant="secondary" onClick={() => setView("list")}>
                Cancel
              </Button>
              <Button type="submit">
                {editId ? "Save Project Details" : "Publish to Showcase"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
