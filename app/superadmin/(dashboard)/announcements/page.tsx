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
  Bell,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Link as LinkIcon,
  Pin,
  CheckCircle,
  Eye
} from "lucide-react"
import { AnnouncementItem, ClubEvent } from "@/types"
import { initialAnnouncements, initialEvents } from "@/data/mockData"

export default function AnnouncementsManagerPage() {
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([])
  const [events, setEvents] = useState<ClubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "form">("list")
  const [editId, setEditId] = useState<string | null>(null)

  // Form Fields
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [badgeText, setBadgeText] = useState("Announcement")
  const [date, setDate] = useState("August 15, 2026")
  const [linkedEventId, setLinkedEventId] = useState<string>("")
  const [status, setStatus] = useState<"active" | "draft" | "archived">("active")
  const [isPinned, setIsPinned] = useState(false)
  const [priority, setPriority] = useState<"high" | "normal">("normal")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAnn = localStorage.getItem("coderithum_announcements")
      if (storedAnn) {
        try { setAnnouncements(JSON.parse(storedAnn)); } catch { setAnnouncements(initialAnnouncements); }
      } else {
        localStorage.setItem("coderithum_announcements", JSON.stringify(initialAnnouncements))
        setAnnouncements(initialAnnouncements)
      }

      const storedEvents = localStorage.getItem("coderithum_events")
      if (storedEvents) {
        try { setEvents(JSON.parse(storedEvents)); } catch { setEvents(initialEvents); }
      } else {
        setEvents(initialEvents)
      }

      setLoading(false)
    }
  }, [])

  const saveToStorage = (updatedList: AnnouncementItem[]) => {
    localStorage.setItem("coderithum_announcements", JSON.stringify(updatedList))
    setAnnouncements(updatedList)
  }

  const handleOpenAdd = (eventId?: string) => {
    setEditId(null)
    setTitle("")
    setMessage("")
    setBadgeText("Special Announcement")
    setDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
    setLinkedEventId(eventId || (events[0]?.id || ""))
    setStatus("active")
    setIsPinned(false)
    setPriority("normal")
    setView("form")
  }

  const handleOpenEdit = (ann: AnnouncementItem) => {
    setEditId(ann.id)
    setTitle(ann.title)
    setMessage(ann.message)
    setBadgeText(ann.badge)
    setDate(ann.date)
    setLinkedEventId(ann.linkedEventId || "")
    setStatus(ann.status)
    setIsPinned(ann.isPinned)
    setPriority(ann.priority)
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      const updated = announcements.filter(a => a.id !== id)
      saveToStorage(updated)
      toast({
        title: "Announcement Deleted",
        description: "Announcement has been removed from active broadcast lists.",
        variant: "success",
      })
    }
  }

  const handleToggleActive = (ann: AnnouncementItem) => {
    const newStatus = ann.status === "active" ? "draft" : "active"
    const updated = announcements.map(a => a.id === ann.id ? { ...a, status: newStatus as any } : a)
    saveToStorage(updated)
    toast({
      title: newStatus === "active" ? "Announcement Published" : "Draft Saved",
      description: `Announcement is now ${newStatus}.`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const item: AnnouncementItem = {
      id: editId || `ann-${Date.now()}`,
      title,
      message,
      badge: badgeText,
      date,
      linkedEventId: linkedEventId || null,
      status,
      isPinned,
      priority
    }

    let updatedList: AnnouncementItem[] = []
    if (editId) {
      updatedList = announcements.map(a => a.id === editId ? item : a)
      toast({
        title: "Announcement Updated",
        description: "Announcement changes saved successfully.",
        variant: "success",
      })
    } else {
      updatedList = [item, ...announcements]
      toast({
        title: "Announcement Created",
        description: "New announcement broadcast registered and linked with calendar.",
        variant: "success",
      })
    }

    saveToStorage(updatedList)
    setView("list")
  }

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 block font-mono"
  const formInputClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"
  const selectClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono cursor-pointer"

  if (loading) return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading Announcements Deck...</div>

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">

      {/* Header Bar */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase font-mono">
            {view === "list" ? "Calendar & Announcements Sync" : editId ? "Edit Announcement" : "Publish Announcement"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            {view === "list"
              ? "Link announcements directly with calendar events and manage active broadcasts."
              : "Specify headlines, messages, priority, and link to targeted calendar schedule."}
          </p>
        </div>

        {view === "list" ? (
          <Button onClick={() => handleOpenAdd()} className="flex items-center gap-2 bg-blue-600 hover:bg-black text-white">
            <Plus className="size-4" /> Create Announcement
          </Button>
        ) : (
          <Button onClick={() => setView("list")} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="size-4" /> Back to Dashboard
          </Button>
        )}
      </div>

      {/* Main Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {view === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Announcements Table (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <Card className="border-2 border-slate-900 rounded-none overflow-hidden bg-white shadow-[3px_3px_0px_#000]">
                {announcements.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 font-mono text-xs">
                    No announcements broadcasted. Click 'Create Announcement' to link a new alert.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Announcement</TableHead>
                        <TableHead>Linked Event</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {announcements.map((ann) => {
                        const linkedEvt = events.find(e => e.id === ann.linkedEventId)
                        return (
                          <TableRow key={ann.id}>
                            <TableCell className="font-semibold max-w-xs">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  {ann.isPinned && <Pin className="size-3 text-amber-600 fill-amber-600" />}
                                  <span className="text-xs font-bold text-slate-900 font-mono line-clamp-1">{ann.title}</span>
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono line-clamp-2">{ann.message}</div>
                                <div className="flex items-center gap-2 pt-0.5">
                                  <Badge variant="outline" className="text-[9px] font-mono">
                                    {ann.badge}
                                  </Badge>
                                  <span className="text-[9px] text-slate-400 font-mono">{ann.date}</span>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              {linkedEvt ? (
                                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-mono font-bold">
                                  <LinkIcon className="size-3 shrink-0" />
                                  <span className="line-clamp-1">{linkedEvt.title}</span>
                                </div>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-mono">General Broadcast</span>
                              )}
                            </TableCell>

                            <TableCell>
                              <Badge variant={ann.priority === "high" ? "destructive" : "secondary"}>
                                {ann.priority === "high" ? "High Priority" : "Normal"}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              <button
                                onClick={() => handleToggleActive(ann)}
                                className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase border border-slate-900 cursor-pointer ${ann.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                                  }`}
                              >
                                {ann.status}
                              </button>
                            </TableCell>

                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1.5">
                                <Button
                                  variant="secondary"
                                  className="size-8 p-0"
                                  onClick={() => handleOpenEdit(ann)}
                                  title="Edit Announcement"
                                >
                                  <Edit2 className="size-3.5" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="size-8 p-0"
                                  onClick={() => handleDelete(ann.id)}
                                  title="Delete Announcement"
                                >
                                  <Trash2 className="size-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                )}
              </Card>
            </div>

            {/* Side Panel: Calendar Events Overview & Direct Link (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5">
                <Calendar className="size-4 text-blue-600" /> Calendar Schedule Deck
              </h2>

              <Card className="p-4 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-3">
                <p className="text-[10px] text-slate-600 font-mono">
                  Select any calendar event below to broadcast a dedicated announcement banner:
                </p>

                <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                  {events.map((evt) => {
                    const isLinked = announcements.some(a => a.linkedEventId === evt.id && a.status === "active")
                    return (
                      <div
                        key={evt.id}
                        className="p-3 bg-slate-50 border-2 border-slate-900 flex items-start justify-between gap-2 shadow-[1.5px_1.5px_0px_#000]"
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-bold font-mono text-slate-900">{evt.title}</div>
                          <div className="text-[9px] font-mono text-slate-500">{evt.date} • {evt.venue}</div>
                          {isLinked && (
                            <span className="inline-flex items-center gap-1 text-[8px] font-mono text-emerald-600 font-bold uppercase">
                              <CheckCircle className="size-2.5" /> Linked Active Announcement
                            </span>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => handleOpenAdd(evt.id)}
                          className="text-[9px] font-mono font-bold shrink-0 p-1.5 h-auto"
                        >
                          <Plus className="size-3" /> Broadcast
                        </Button>

                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl pb-12">
            <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                <div className="p-1.5 rounded bg-blue-50 text-blue-600 border-2 border-blue-600 shadow-[1.5px_1.5px_0px_#000]">
                  <Bell className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Announcement Broadcast Parameters</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Configure headlines, linked event IDs, priority flags, and tags.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Announcement Title Headline</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. Registrations Open for SIH 2026 Hackathon"
                  />
                </div>
                <div>
                  <label className={labelClass}>Badge / Tag Category</label>
                  <input
                    type="text"
                    required
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. Orientation Special, Hackathon Alert"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Announcement Message / Description</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"
                  placeholder="Enter main announcement message..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t-2 border-slate-900 pt-4">
                <div>
                  <label className={labelClass}>Link to Calendar Event</label>
                  <select
                    value={linkedEventId}
                    onChange={(e) => setLinkedEventId(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">-- General Announcement (No specific event) --</option>
                    {events.map((evt) => (
                      <option key={evt.id} value={evt.id}>
                        {evt.title} ({evt.date})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e: any) => setPriority(e.target.value)}
                    className={selectClass}
                  >
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority (Red Alert Badge)</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Publication Status</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className={selectClass}
                  >
                    <option value="active">Active (Broadcasted on Public Site)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 font-mono text-xs">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="size-4 rounded-none border-2 border-slate-900 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isPinned" className="text-slate-800 font-bold cursor-pointer">
                  Pin to top of public announcement feeds
                </label>
              </div>

            </Card>

            <div className="flex justify-end gap-3 shrink-0">
              <Button type="button" variant="secondary" onClick={() => setView("list")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-black text-white">
                {editId ? "Save Announcement" : "Publish Announcement"}
              </Button>
            </div>
          </form>
        )}
      </div>

    </div>
  )
}
