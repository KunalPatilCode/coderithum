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
import { Image, Plus, Edit2, Trash2, ArrowLeft, ArrowUpRight } from "lucide-react"

export default function GalleryManagerPage() {
  const { toast } = useToast()
  const [albums, setAlbums] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "form" | "photos">("list")
  const [editId, setEditId] = useState<string | null>(null)

  // Current active album for media additions
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null)

  // Album Form Fields
  const [name, setName] = useState("")
  const [cover, setCover] = useState("")

  // Photo Add Form Fields
  const [photoUrl, setPhotoUrl] = useState("")
  const [photoCaption, setPhotoCaption] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_albums")
      if (stored) {
        const parsed = JSON.parse(stored)
        const updated = parsed.map((album: any) => {
          if (album.id === "hackathons-album") {
            return {
              ...album,
              name: "sih Grand finalist team 2025 Multimedia",
              cover: "/sih_2025_cover.jpg",
              media: [
                {
                  url: "/sih_2025_1.jpg",
                  caption: "Team CodeRhythm traveling to the Smart India Hackathon 2025 Grand Finale.",
                },
                {
                  url: "/sih_2025_2.jpg",
                  caption: "Team members displaying their official SIH 2025 Student Participant badges.",
                },
                {
                  url: "/sih_2025_3.jpg",
                  caption: "Celebrating on stage with the SIH 2025 Software Edition Finalist certificates.",
                },
                {
                  url: "/sih_2025_4.jpg",
                  caption: "CodeRhythm presenting their software prototype to the evaluation panel.",
                },
                {
                  url: "/sih_2025_5.jpg",
                  caption: "Smart India Hackathon 2025 group photo at Aryabhata Auditorium.",
                },
              ]
            }
          }
          return album
        })
        localStorage.setItem("coderithum_albums", JSON.stringify(updated))
        setAlbums(updated)
      }
      setLoading(false)
    }
  }, [])

  const saveToStorage = (updatedList: any[]) => {
    localStorage.setItem("coderithum_albums", JSON.stringify(updatedList))
    setAlbums(updatedList)
  }

  const handleOpenAddAlbum = () => {
    setEditId(null)
    setName("")
    setCover("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80")
    setView("form")
  }

  const handleOpenEditAlbum = (album: any) => {
    setEditId(album.id)
    setName(album.name)
    setCover(album.cover)
    setView("form")
  }

  const handleDeleteAlbum = (id: string) => {
    if (confirm("Are you sure you want to delete this album and all its images? This action is permanent.")) {
      const updated = albums.filter((a) => a.id !== id)
      saveToStorage(updated)
      toast({
        title: "Album Deleted",
        description: "The gallery album has been deleted successfully.",
        variant: "success",
      })
    }
  }

  const handleSubmitAlbum = (e: React.FormEvent) => {
    e.preventDefault()

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    const id = editId || `${slug}-${Date.now().toString().slice(-4)}`

    const targetAlbum = albums.find((a) => a.id === editId)
    const media = targetAlbum ? targetAlbum.media : []

    const newAlbum = {
      id,
      name,
      cover,
      media
    }

    let updatedList = []
    if (editId) {
      updatedList = albums.map((a) => (a.id === editId ? newAlbum : a))
      toast({
        title: "Album Updated",
        description: "Album cover and settings updated.",
        variant: "success",
      })
    } else {
      updatedList = [newAlbum, ...albums]
      toast({
        title: "Album Created",
        description: "New album registered. Start uploading photos!",
        variant: "success",
      })
    }

    saveToStorage(updatedList)
    setView("list")
  }

  const handleOpenPhotos = (id: string) => {
    setSelectedAlbumId(id)
    setPhotoUrl("")
    setPhotoCaption("")
    setView("photos")
  }

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAlbumId) return

    const updated = albums.map((album) => {
      if (album.id === selectedAlbumId) {
        return {
          ...album,
          media: [
            ...album.media,
            { url: photoUrl, caption: photoCaption }
          ]
        }
      }
      return album
    })

    saveToStorage(updated)
    toast({
      title: "Photo Uploaded",
      description: "New image has been appended to the album gallery.",
      variant: "success",
    })

    setPhotoUrl("")
    setPhotoCaption("")
  }

  const handleDeletePhoto = (photoIdx: number) => {
    if (!selectedAlbumId) return
    if (!confirm("Are you sure you want to remove this photo?")) return

    const updated = albums.map((album) => {
      if (album.id === selectedAlbumId) {
        return {
          ...album,
          media: album.media.filter((_: any, idx: number) => idx !== photoIdx)
        }
      }
      return album
    })

    saveToStorage(updated)
    toast({
      title: "Photo Deleted",
      description: "Photo has been removed from this album.",
      variant: "success",
    })
  }

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 block"
  const formInputClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"

  if (loading) return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading gallery albums...</div>

  const activeAlbum = albums.find((a) => a.id === selectedAlbumId)

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">

      {/* Title Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase font-mono">
            {view === "list"
              ? "Gallery Manager"
              : view === "form"
                ? (editId ? "Edit Album Settings" : "Create Album")
                : `Manage Album: ${activeAlbum?.name || ""}`}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {view === "list"
              ? "Organize student event photograph scrolls and hackathon project mock snaps."
              : view === "form"
                ? "Change the album name and select a cover image."
                : "Review uploaded photo snap collections and add new ones below."}
          </p>
        </div>

        {view === "list" ? (
          <Button onClick={handleOpenAddAlbum} className="flex items-center gap-2">
            <Plus className="size-4" /> Create Album
          </Button>
        ) : (
          <Button onClick={() => setView("list")} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="size-4" /> Back to Albums
          </Button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow min-h-0 overflow-y-auto">
        {view === "list" ? (
          <Card className="border-2 border-slate-900 rounded-none overflow-hidden bg-white shadow-[3px_3px_0px_#000]">
            {albums.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-xs">
                No albums currently registered. Click 'Create Album' to begin.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Album Name</TableHead>
                    <TableHead>Cover Art</TableHead>
                    <TableHead>Items Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {albums.map((album) => (
                    <TableRow key={album.id}>
                      <TableCell className="font-semibold">
                        <div className="text-slate-900 text-xs font-bold font-mono">{album.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {album.id}</div>
                      </TableCell>
                      <TableCell>
                        <img
                          src={album.cover}
                          alt={album.name}
                          className="w-12 h-8 rounded-none border-2 border-slate-900 object-cover shrink-0"
                          onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=120&q=80" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-semibold">
                          {(album.media || []).length} photos
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button
                            variant="secondary"
                            className="flex items-center gap-1.5 h-8 text-[10px]"
                            onClick={() => handleOpenPhotos(album.id)}
                            title="Manage Photos"
                          >
                            Add/Edit Photos
                            <ArrowUpRight className="size-3" />
                          </Button>
                          <Button
                            variant="secondary"
                            className="size-8 p-0"
                            onClick={() => handleOpenEditAlbum(album)}
                            title="Edit Album Settings"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            className="size-8 p-0"
                            onClick={() => handleDeleteAlbum(album.id)}
                            title="Delete Album"
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
        ) : view === "form" ? (
          <form onSubmit={handleSubmitAlbum} className="space-y-6 max-w-2xl pb-12">
            <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                <div className="p-1.5 rounded bg-blue-50 text-blue-600 border-2 border-blue-600 shadow-[1.5px_1.5px_0px_#000]">
                  <Image className="size-4.5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Album Setup Settings</h2>
                  <p className="text-[9px] text-slate-500 font-mono">Configure details and album categories.</p>
                </div>
              </div>

              <div>
                <label className={labelClass}>Album Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={formInputClass}
                  placeholder="e.g. SIH Hackathon 2026 Snapscroll"
                />
              </div>

              <div>
                <label className={labelClass}>Cover Image URL (Unsplash path/base64)</label>
                <input
                  type="text"
                  required
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  className={formInputClass}
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>
            </Card>

            <div className="flex justify-end gap-3 shrink-0">
              <Button type="button" variant="secondary" onClick={() => setView("list")}>
                Cancel
              </Button>
              <Button type="submit">
                {editId ? "Save Album Details" : "Create Album"}
              </Button>
            </div>
          </form>
        ) : (
          /* Manage photos inside selected album */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
            {/* Upload form (1 col) */}
            <Card className="p-5 h-fit bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] flex flex-col justify-between">
              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-2 mb-4">
                  <div className="p-1.5 rounded bg-blue-50 text-blue-600 border-2 border-blue-600 shadow-[1.5px_1.5px_0px_#000]">
                    <Plus className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Add Photo</h2>
                    <p className="text-[9px] text-slate-500 font-mono">Attach a new image to this scroll.</p>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Image URL</label>
                  <input
                    type="url"
                    className={formInputClass}
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    required
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className={labelClass}>Caption (A short title or description)</label>
                  <input
                    type="text"
                    className={formInputClass}
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    required
                    placeholder="e.g. Teams brainstorming during SIH Round 1"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" className="w-full">
                    Upload Photo
                  </Button>
                </div>
              </form>
            </Card>

            {/* Photos List (2 cols) */}
            <Card className="lg:col-span-2 p-5 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000]">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono border-b-2 border-slate-900 pb-2 mb-4">
                Current Photos ({(activeAlbum?.media || []).length})
              </h2>

              {(activeAlbum?.media || []).length === 0 ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs">
                  This album is empty. Upload a photo on the left panel to begin.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {activeAlbum?.media.map((mediaItem: any, idx: number) => (
                    <div key={idx} className="relative group rounded-none overflow-hidden border-2 border-slate-900 bg-white flex flex-col justify-between shadow-[2px_2px_0px_#000]">
                      <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
                        <img
                          src={mediaItem.url}
                          alt={mediaItem.caption}
                          className="w-full h-full object-cover"
                          onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=120&q=80" }}
                        />
                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(idx)}
                          className="absolute top-2 right-2 bg-red-600 text-white border-2 border-slate-900 rounded-none p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700 shadow-md shadow-black/20"
                          title="Delete Photo"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <div className="p-2.5">
                        <p className="text-[10px] text-slate-800 font-bold font-mono line-clamp-2">{mediaItem.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}





