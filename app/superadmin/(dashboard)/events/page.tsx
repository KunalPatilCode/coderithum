"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
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
import { Calendar, Plus, Edit2, Trash2, ArrowLeft, Users, MapPin, ListChecks } from "lucide-react"
import { broadcastDataChange } from "@/types"

export default function EventsManagerPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "form">("list")
  const [editId, setEditId] = useState<string | null>(null)

  // Form Fields - Basic Details
  const [title, setTitle] = useState("")
  const [banner, setBanner] = useState("")
  const [shortDesc, setShortDesc] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<"upcoming" | "past">("upcoming")
  const [category, setCategory] = useState<"workshop" | "competition" | "special" | "orientation">("workshop")

  // Form Fields - 1. Logistics & Registration Settings
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [venue, setVenue] = useState("")
  const [regLink, setRegLink] = useState("")
  const [feedbackLink, setFeedbackLink] = useState("")
  const [hideRegistration, setHideRegistration] = useState(false)

  // Form Fields - 2. Event Agenda Timeline
  const [agenda, setAgenda] = useState<string[]>([])
  const [newAgendaItem, setNewAgendaItem] = useState("")

  // Form Fields - 3. Event Speakers
  const [speakers, setSpeakers] = useState<{ name: string; role: string; company: string; avatar: string }[]>([])
  const [spkName, setSpkName] = useState("")
  const [spkRole, setSpkRole] = useState("")
  const [spkCompany, setSpkCompany] = useState("")
  const [spkAvatar, setSpkAvatar] = useState("")

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
    setHideRegistration(false)
    setType("upcoming")
    setCategory("workshop")
    setAgenda([
      "10:00 AM - Keynote Address & Welcome Session",
      "11:30 AM - Core Workshop / Hands-on Activity",
      "01:00 PM - Q&A and Networking"
    ])
    setSpeakers([])
    setSpkName("")
    setSpkRole("")
    setSpkCompany("")
    setSpkAvatar("")
    setNewAgendaItem("")
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
    setHideRegistration(Boolean(evt.hideRegistration))
    setType(evt.type)
    setCategory(evt.category || "workshop")
    setAgenda(Array.isArray(evt.agenda) ? evt.agenda : [])
    setSpeakers(Array.isArray(evt.speakers) ? evt.speakers : [])
    setSpkName("")
    setSpkRole("")
    setSpkCompany("")
    setSpkAvatar("")
    setNewAgendaItem("")
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
    const existingEvt = editId ? events.find((e) => e.id === editId) : null

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
      hideRegistration,
      type,
      category,
      agenda: agenda.filter((item: string) => item.trim() !== ""),
      speakers: speakers.filter((spk: any) => spk.name.trim() !== ""),
      gallery: existingEvt?.gallery || []
    }

    let updatedList = []
    if (editId) {
      updatedList = events.map((e) => (e.id === editId ? newEvent : e))
      toast({
        title: "Event Saved",
        description: "Event logistics, agenda, and speaker profiles saved successfully.",
        variant: "success",
      })
    } else {
      updatedList = [newEvent, ...events]
      toast({
        title: "Event Created",
        description: "New event has been published to the roadmap.",
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
              : "Manage event details, agenda timeline, speakers, and logistics."}
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
                    <TableHead>Agenda / Speakers</TableHead>
                    <TableHead>Date / Venue</TableHead>
                    <TableHead className="text-right font-bold uppercase tracking-wider font-mono text-[11px] text-slate-700">ACTIONS</TableHead>
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
                        <div className="text-[10px] font-mono text-slate-600 font-bold">
                          Agenda: {Array.isArray(evt.agenda) ? evt.agenda.length : 0} items
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          Speakers: {Array.isArray(evt.speakers) ? evt.speakers.length : 0} profiles
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-[11px] text-slate-600 font-bold font-mono">{evt.date}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-bold font-mono">{evt.venue}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleOpenEdit(evt)}
                            className="flex items-center gap-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_#000]"
                            title="Edit Event"
                          >
                            <Edit2 className="size-3.5 text-blue-600" />
                            <span>Edit</span>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(evt.id)}
                            className="flex items-center gap-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_#000]"
                            title="Remove Event"
                          >
                            <Trash2 className="size-3.5" />
                            <span>Remove</span>
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

            {/* Basic Meta Specifications */}
            <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                <div className="p-1.5 rounded bg-blue-50 text-blue-600 border-2 border-blue-600 shadow-[1.5px_1.5px_0px_#000]">
                  <Calendar className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Basic Event Info</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Title, category, banner, and overall descriptions.</p>
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
                    placeholder="e.g., Coderithum Club Orientation & Interview Session 2026"
                  />
                </div>
                <div>
                  <label className={labelClass}>Banner Image (Absolute / Unsplash URL)</label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className={labelClass}>Short Pitch/Description (Card summary)</label>
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
                <label className={labelClass}>Full Detailed Overview</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={textareaClass}
                  placeholder="Elaborate on domain tracks, rules, and event guidelines..."
                />
              </div>
            </Card>

            {/* 1. Logistics & Registration Control Card */}
            <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                <div className="p-1.5 rounded bg-amber-50 text-amber-600 border-2 border-amber-600 shadow-[1.5px_1.5px_0px_#000]">
                  <MapPin className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">1. Logistics & Registration Control</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Manage venue, dates, timing, and registration button visibility.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Event Date</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g., August 29, 2026"
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
                <div>
                  <label className={labelClass}>Venue Location</label>
                  <input
                    type="text"
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className={formInputClass}
                    placeholder="e.g. Main Seminar Hall, GEC Daman"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
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

              <div className="p-3 bg-slate-50 border-2 border-slate-900 flex items-center justify-between mt-2">
                <div>
                  <div className="text-xs font-bold text-slate-900 font-mono">Registration Button Visibility</div>
                  <div className="text-[10px] text-slate-500 font-mono">Toggle to show or completely hide the "Register" button on event cards & detail pages.</div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hideRegistration}
                    onChange={(e) => setHideRegistration(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded-none border-2 border-slate-900 cursor-pointer"
                  />
                  <span className="text-xs font-bold font-mono text-slate-900">
                    {hideRegistration ? "Registration Hidden" : "Registration Active"}
                  </span>
                </label>
              </div>
            </Card>

            {/* 2. Event Agenda Timeline Manager Card */}
            <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 border-2 border-emerald-600 shadow-[1.5px_1.5px_0px_#000]">
                  <ListChecks className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">2. Event Agenda Timeline</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Define step-by-step sessions, start times, and activities.</p>
                </div>
              </div>

              {/* Current Agenda Items List */}
              <div className="space-y-2">
                {agenda.length === 0 ? (
                  <div className="p-4 border-2 border-dashed border-slate-200 text-center text-xs text-slate-400 font-mono">
                    No agenda items added yet. Add timeline milestones below.
                  </div>
                ) : (
                  agenda.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 w-6 shrink-0">#{idx + 1}</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...agenda];
                          updated[idx] = e.target.value;
                          setAgenda(updated);
                        }}
                        className={formInputClass}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        className="size-11 shrink-0 p-0"
                        onClick={() => setAgenda(agenda.filter((_, i) => i !== idx))}
                        title="Remove Agenda Item"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Add Agenda Item Form */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  value={newAgendaItem}
                  onChange={(e) => setNewAgendaItem(e.target.value)}
                  className={formInputClass}
                  placeholder="e.g., 10:00 AM - Stage 1: ORIENTATION - Vision, teams, opportunities"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newAgendaItem.trim()) {
                        setAgenda([...agenda, newAgendaItem.trim()]);
                        setNewAgendaItem("");
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (newAgendaItem.trim()) {
                      setAgenda([...agenda, newAgendaItem.trim()]);
                      setNewAgendaItem("");
                    }
                  }}
                  className="h-11 shrink-0 flex items-center gap-1.5"
                >
                  <Plus className="size-4" /> Add Item
                </Button>
              </div>
            </Card>

            {/* 3. Event Speakers Manager Card */}
            <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                <div className="p-1.5 rounded bg-purple-50 text-purple-600 border-2 border-purple-600 shadow-[1.5px_1.5px_0px_#000]">
                  <Users className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">3. Event Speakers & Guests</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Feature keynote speakers, mentors, and guest profiles.</p>
                </div>
              </div>

              {/* Speakers List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {speakers.length === 0 ? (
                  <div className="md:col-span-2 p-4 border-2 border-dashed border-slate-200 text-center text-xs text-slate-400 font-mono">
                    No speakers added for this event. Use the form below to attach speaker profiles.
                  </div>
                ) : (
                  speakers.map((spk, idx) => (
                    <div key={idx} className="p-3 bg-white border-2 border-slate-900 flex items-center justify-between gap-3 shadow-[2px_2px_0px_#000]">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={spk.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"}
                          alt={spk.name}
                          className="w-10 h-10 border-2 border-slate-900 object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate font-mono">{spk.name}</div>
                          <div className="text-[10px] text-slate-500 truncate font-mono">{spk.role} • {spk.company}</div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        className="size-8 shrink-0 p-0"
                        onClick={() => setSpeakers(speakers.filter((_, i) => i !== idx))}
                        title="Remove Speaker"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Add Speaker Form */}
              <div className="p-4 bg-slate-50 border-2 border-slate-900 space-y-3 pt-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Add Speaker Profile</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Speaker Name</label>
                    <input
                      type="text"
                      value={spkName}
                      onChange={(e) => setSpkName(e.target.value)}
                      className={formInputClass}
                      placeholder="e.g., Dr. Avinash R. Chaudhari"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Role / Designation</label>
                    <input
                      type="text"
                      value={spkRole}
                      onChange={(e) => setSpkRole(e.target.value)}
                      className={formInputClass}
                      placeholder="e.g., Principal / Technical Lead"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Organization / Institution</label>
                    <input
                      type="text"
                      value={spkCompany}
                      onChange={(e) => setSpkCompany(e.target.value)}
                      className={formInputClass}
                      placeholder="e.g., GEC Daman"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Avatar Image URL</label>
                    <input
                      type="text"
                      value={spkAvatar}
                      onChange={(e) => setSpkAvatar(e.target.value)}
                      className={formInputClass}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    if (spkName.trim()) {
                      setSpeakers([
                        ...speakers,
                        {
                          name: spkName.trim(),
                          role: spkRole.trim() || "Speaker",
                          company: spkCompany.trim() || "GEC Daman",
                          avatar: spkAvatar.trim() || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
                        }
                      ]);
                      setSpkName("");
                      setSpkRole("");
                      setSpkCompany("");
                      setSpkAvatar("");
                    }
                  }}
                  className="flex items-center gap-1.5"
                >
                  <Plus className="size-4" /> Add Speaker
                </Button>
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
