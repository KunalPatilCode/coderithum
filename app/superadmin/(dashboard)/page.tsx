"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Calendar,
  Code2,
  Users2,
  Trophy,
  ArrowRight,
  Plus,
  Activity,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Bell
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { initialHeroConfig } from "@/data/mockData"
import { Palette, Save } from "lucide-react"

export default function SuperAdminDashboardPage() {
  const { toast } = useToast()
  const [stats, setStats] = useState({
    eventsCount: 0,
    projectsCount: 0,
    teamCount: 0,
    achievementsCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [heroConfig, setHeroConfig] = useState<any>(initialHeroConfig)

  const presets: Record<string, any> = {
    "ice-canvas": {
      presetId: "ice-canvas",
      badgeText: "GEC Daman CodeRhythm",
      title: "Empowering Developers & Tech Innovators",
      highlightTitle: "CodeRhythm 2026-2027",
      subtitle: "Registrations are now open for the CodeRhythm Academic Year 2026-2027! Join workshops, hackathons, and open-source project sprints.",
      backgroundStyle: "pixel-art",
      accentColor: "#2563eb",
      layoutStyle: "full-bleed",
      bannerImage: "",
      showUpcomingList: true
    },
    "makarsankranti": {
      presetId: "makarsankranti",
      badgeText: "Festival Theme",
      title: "Happy Makar Sankranti",
      highlightTitle: "Makar Sankranti",
      subtitle: "Wishing you a sky full of kites and a heart full of happiness!",
      backgroundStyle: "pixel-art",
      accentColor: "#d97706",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_makarsankranti.jpg",
      showUpcomingList: true
    },
    "dussehra": {
      presetId: "dussehra",
      badgeText: "Festival Theme",
      title: "Happy Dussehra",
      highlightTitle: "Dussehra",
      subtitle: "May this festive season bring you good health, prosperity, and success!",
      backgroundStyle: "pixel-art",
      accentColor: "#e11d48",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_dussehra.jpg",
      showUpcomingList: true
    },
    "christmas": {
      presetId: "christmas",
      badgeText: "Festival Theme",
      title: "Merry Christmas",
      highlightTitle: "Christmas",
      subtitle: "Wishing you peace, joy, and a very Merry Christmas!",
      backgroundStyle: "pixel-art",
      accentColor: "#2563eb",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_christmas.jpg",
      showUpcomingList: true
    },
    "holi": {
      presetId: "holi",
      badgeText: "Festival Theme",
      title: "Happy Holi",
      highlightTitle: "Holi",
      subtitle: "Celebrate the festival of colors with joy, love, and vibrant energy!",
      backgroundStyle: "pixel-art",
      accentColor: "#7c3aed",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_holi.jpg",
      showUpcomingList: true
    },
    "diwali": {
      presetId: "diwali",
      badgeText: "Festival Theme",
      title: "Happy Diwali",
      highlightTitle: "Diwali",
      subtitle: "May the festival of lights bring brightness, warmth, and joy to your life!",
      backgroundStyle: "pixel-art",
      accentColor: "#d97706",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_diwali.jpg",
      showUpcomingList: true
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Helper function to get array length from localStorage
      const getCount = (key: string) => {
        try {
          const item = localStorage.getItem(key)
          return item ? JSON.parse(item).length : 0
        } catch {
          return 0
        }
      }

      setStats({
        eventsCount: getCount("coderithum_events"),
        projectsCount: getCount("coderithum_projects"),
        teamCount: getCount("coderithum_team"),
        achievementsCount: getCount("coderithum_achievements"),
      })

      const storedHero = localStorage.getItem("coderithum_hero_config")
      if (storedHero) {
        try {
          setHeroConfig(JSON.parse(storedHero))
        } catch {
          setHeroConfig(initialHeroConfig)
        }
      }

      setLoading(false)
    }
  }, [])

  const handleApplyPreset = (presetId: string) => {
    const selectedPreset = presets[presetId]
    if (selectedPreset) {
      setHeroConfig(selectedPreset)
      toast({
        title: "Preset Selected",
        description: `Theme preset applied. Click 'Save Config' to publish changes.`,
        variant: "success",
      })
    }
  }

  const handleSaveHero = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("coderithum_hero_config", JSON.stringify(heroConfig))
      toast({
        title: "Hero Config Saved!",
        description: "Homepage theme and hero configuration updated successfully.",
        variant: "success",
      })
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-slate-600 font-mono text-xs">
        Loading metrics deck...
      </div>
    )
  }

  const labelClass = "text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-0.5 block"

  const cards = [
    {
      title: "Total Events",
      value: stats.eventsCount,
      icon: Calendar,
      colorClass: "text-blue-600 bg-blue-50 border-slate-900 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] rounded-none",
      href: "/superadmin/events",
    },
    {
      title: "Active Projects",
      value: stats.projectsCount,
      icon: Code2,
      colorClass: "text-purple-600 bg-purple-50 border-slate-900 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] rounded-none",
      href: "/superadmin/projects",
    },
    {
      title: "Team Members",
      value: stats.teamCount,
      icon: Users2,
      colorClass: "text-emerald-600 bg-emerald-50 border-slate-900 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] rounded-none",
      href: "/superadmin/team",
    },
    {
      title: "Achievements Awarded",
      value: stats.achievementsCount,
      icon: Trophy,
      colorClass: "text-amber-600 bg-amber-50 border-slate-900 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] rounded-none",
      href: "/superadmin/achievements",
    },
  ]

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">
      {/* Title Bar */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
            System Workspace // Control Console
          </p>
          <h1 className="text-xl font-black text-slate-900 tracking-tight -mt-0.5">Welcome, Operator</h1>
        </div>
        <div className="text-[9px] font-mono font-bold tracking-widest text-emerald-700 bg-emerald-50 border-2 border-emerald-600 px-3 py-1.5 rounded-none uppercase shadow-[2px_2px_0px_#000]">
          ● Secure Session Connected
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.title} href={card.href} className="block">
              <Card className={`p-4 border-2 flex items-center gap-4 transition-all duration-300 ${card.colorClass}`}>
                <div className="p-2.5 rounded-none bg-white border-2 border-slate-900 shrink-0">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className={labelClass}>{card.title}</p>
                  <h3 className="font-mono text-xl font-black text-slate-900 leading-none mt-0.5">
                    {card.value}
                  </h3>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-6 flex-grow min-h-0">
        {/* Quick Operations */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3 mb-4">
              <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 border-2 border-emerald-600 shadow-[1.5px_1.5px_0px_#000]">
                <Activity className="size-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Core Quick-Actions</h2>
                <p className="text-[9px] text-slate-500 font-mono">Direct shortcuts to add items immediately.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <Link href="/superadmin/announcements" className="group p-4 bg-white border-2 border-slate-900 hover:border-emerald-600 rounded-none shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] transition-all flex flex-col justify-between h-36">
                <div>
                  <Bell className="size-5 text-emerald-600 mb-2" />
                  <h3 className="text-xs font-bold text-slate-900 font-mono uppercase group-hover:text-emerald-600 transition-colors">Calendar & Announcements</h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Link active announcements directly with calendar events and priority flags.</p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 font-mono uppercase tracking-wider pt-2">
                  Manage Announcements <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>

              <Link href="/superadmin/events?add=true" className="group p-4 bg-white border-2 border-slate-900 hover:border-purple-600 rounded-none shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] transition-all flex flex-col justify-between h-36">
                <div>
                  <Calendar className="size-5 text-purple-600 mb-2" />
                  <h3 className="text-xs font-bold text-slate-900 font-mono uppercase group-hover:text-purple-600 transition-colors">Publish Event</h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Schedule workshops, hackathons, or orientations for the tech club calendar.</p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-purple-600 font-mono uppercase tracking-wider pt-2">
                  Launch Form <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>

              <Link href="/superadmin/team" className="group p-4 bg-white border-2 border-slate-900 hover:border-amber-600 rounded-none shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] transition-all flex flex-col justify-between h-36">
                <div>
                  <Users2 className="size-5 text-amber-600 mb-2" />
                  <h3 className="text-xs font-bold text-slate-900 font-mono uppercase group-hover:text-amber-600 transition-colors">Team Hierarchy & Photos</h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Manage yearly team tree graphs, hierarchy tiers, and member photo cropping.</p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-amber-600 font-mono uppercase tracking-wider pt-2">
                  Open Team Deck <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </div>

          </div>

          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-600 rounded-none flex items-center gap-3 text-slate-800 shadow-[2px_2px_0px_#000]">
            <ShieldCheck className="size-5 text-blue-600 shrink-0" />
            <p className="text-[10px] text-slate-600 leading-normal font-semibold">
              You are logged in as <span className="font-mono text-blue-700 font-bold">admin@coderithum.com</span>. Any operations performed here will modify client-side local cache directly, and compile dynamically onto static views.
            </p>
          </div>
        </Card>


      </div>
    </div>
  )
}
