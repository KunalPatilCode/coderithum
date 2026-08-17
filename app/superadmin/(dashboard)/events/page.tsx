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
import { Calendar, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react"
import { broadcastDataChange } from "@/types"

export default function EventsManagerPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "form">("list")
  const [editId, setEditId] = useState<string | null>(null)

  // Form Fields
  const [title, setTitle] = useState("")
  const [banner, setBanner] = useState("")
  const [shortDesc, setShortDesc] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [venue, setVenue] = useState("")
  const [regLink, setRegLink] = useState("")
  const [feedbackLink, setFeedbackLink] = useState("")
  const [type, setType] = useState<"upcoming" | "past">("upcoming")
  const [category, setCategory] = useState<"workshop" | "competition" | "special" | "orientation">("workshop")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_events")
      if (stored) {
        setEvents(JSON.parse(stored))
      }
      setLoading(false)
    }
  }, [])

  // Auto trigger form if query parameter is present (e.g. ?add=true from Dashboard Quick Actions)
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      handleOpenAdd()
    }
  }, [searchParams])

  const saveToStorage = (updatedList: any[]) => {
    setEvents(updatedList)
    broadcastDataChange("coderithum_events", updatedList)
  }

  const handleOpenAdd = () => {
    setEditId(null)
    setTitle("")
    setBanner("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80")
    setShortDesc("")
    setDescription("")
    setDate("")
    setTime("")
    setVenue("")
    setRegLink("")
    setFeedbackLink("")
    setType("upcoming")
    setCategory("workshop")
    setView("form")
  }

  const handleOpenEdit = (evt: any) => {
    setEditId(evt.id)
    setTitle(evt.title)
    setBanner(evt.banner)
    setShortDesc(evt.shortDesc)
    setDescription(evt.description)
    setDate(evt.date)
    setTime(evt.time)
    setVenue(evt.venue)
    setRegLink(evt.regLink || "")
    setFeedbackLink(evt.feedbackLink || "")
    setType(evt.type)
    setCategory(evt.category || "workshop")
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      const updated = events.filter((e) => e.id !== id)
      saveToStorage(updated)
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
        variant: "success",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    const id = editId || `${slug}-${Date.now().toString().slice(-4)}`

    const newEvent = {
      id,
      title,
      banner,
      shortDesc,
      description,
      date,
      time,
      venue,
      regLink,
      feedbackLink,
      type,
      category,
      agenda: [],
      speakers: []
    }

    let updatedList = []
    if (editId) {
      updatedList = events.map((e) => (e.id === editId ? newEvent : e))
      toast({
        title: "Event Updated",
        description: "Changes to the event were saved successfully.",
        variant: "success",
      })
    } else {
      updatedList = [newEvent, ...events]
      toast({
        title: "Event Created",
        description: "New event has been added to the calendar roadmap.",
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

  if (loading) return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading events stack...</div>

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">

      {/* Title Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase font-mono">
            {view === "list" ? "Events Manager" : editId ? "Edit Event" : "Create Event"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {view === "list"
              ? "Schedule workshops, hackathons, orientations, and other club events."
              : "Fill out the fields to publish or modify the event details."}
          </p>
        </div>

        {view === "list" ? (
          <Button onClick={handleOpenAdd} className="flex items-center gap-2">
            <Plus className="size-4" /> Add Event
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
            {events.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-xs">
                No events currently configured. Click 'Add Event' to create one.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Details</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date / Venue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((evt) => (
                    <TableRow key={evt.id}>
                      <TableCell className="font-semibold">
                        <div className="text-slate-900 text-xs font-bold font-mono">{evt.title}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{evt.shortDesc}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={evt.type === "upcoming" ? "success" : "secondary"}>
                          {evt.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{evt.category || "General"}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-[11px] text-slate-600 font-bold font-mono">{evt.date}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-bold font-mono">{evt.venue}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button
                            variant="secondary"
                            className="size-8 p-0"
                            onClick={() => handleOpenEdit(evt)}
                            title="Edit Event"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            className="size-8 p-0"
                            onClick={() => handleDelete(evt.id)}
                            title="Delete Event"
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
                  <Calendar className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Event Meta Specifications</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Define names, categories, and paths.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Event Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g., Smart India Hackathon internal pitching"
                  />
                </div>
                <div>
                  <label className={labelClass}>Banner Image (Unsplash / absolute URL)</label>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Status Type</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className={selectClass}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className={selectClass}
                  >
                    <option value="workshop">Workshop</option>
                    <option value="competition">Competition</option>
                    <option value="orientation">Orientation</option>
                    <option value="special">Special</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Venue Location</label>
                  <input
                    type="text"
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. Seminar Hall, GEC Daman"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Event Date</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g., September 19, 2026"
                  />
                </div>
                <div>
                  <label className={labelClass}>Event Time Frame</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g., 10:00 AM - 04:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Short Pitch/Description (Single line card summary)</label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className={formInputClass}
                  placeholder="Summarize the event in one snappy sentence"
                />
              </div>

              <div>
                <label className={labelClass}>Full Description / Schedule Detail</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={textareaClass}
                  placeholder="Elaborate on domain tracks, syllabus, prerequisites..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 border-slate-900 pt-4">
                <div>
                  <label className={labelClass}>External Registration Link</label>
                  <input
                    type="text"
                    value={regLink}
                    onChange={(e) => setRegLink(e.target.value)}
                    className={formInputClass}
                    placeholder="https://gecdaman.org.in/register..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Feedback Survey Link</label>
                  <input
                    type="text"
                    value={feedbackLink}
                    onChange={(e) => setFeedbackLink(e.target.value)}
                    className={formInputClass}
                    placeholder="https://gecdaman.org.in/feedback..."
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-3 shrink-0">
              <Button type="button" variant="secondary" onClick={() => setView("list")}>
                Cancel
              </Button>
              <Button type="submit">
                {editId ? "Save Event Changes" : "Publish to Roadmap"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
