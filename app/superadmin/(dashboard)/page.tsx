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
  AlertCircle
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SuperAdminDashboardPage() {
  const [stats, setStats] = useState({
    eventsCount: 0,
    projectsCount: 0,
    teamCount: 0,
    achievementsCount: 0,
  })
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }
  }, [])

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow min-h-0">
        {/* Quick Operations (2 cols) */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
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
              <Link href="/superadmin/events?add=true" className="group p-4 bg-white border-2 border-slate-900 hover:border-blue-600 rounded-none shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] transition-all flex flex-col justify-between h-36">
                <div>
                  <Calendar className="size-5 text-blue-600 mb-2" />
                  <h3 className="text-xs font-bold text-slate-900 font-mono uppercase group-hover:text-blue-600 transition-colors">Publish Event</h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Schedule workshops, hackathons, or orientations for the tech club calendar.</p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-blue-600 font-mono uppercase tracking-wider pt-2">
                  Launch Form <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>

              <Link href="/superadmin/projects?add=true" className="group p-4 bg-white border-2 border-slate-900 hover:border-purple-600 rounded-none shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] transition-all flex flex-col justify-between h-36">
                <div>
                  <Code2 className="size-5 text-purple-600 mb-2" />
                  <h3 className="text-xs font-bold text-slate-900 font-mono uppercase group-hover:text-purple-600 transition-colors">Showcase Project</h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Add student hackathon prototypes or collaborative team project repositories.</p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-purple-600 font-mono uppercase tracking-wider pt-2">
                  Launch Form <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
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

        {/* System Logs / Overview Tips (1 col) */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3 mb-4">
              <div className="p-1.5 rounded bg-amber-50 text-amber-600 border-2 border-amber-600 shadow-[1.5px_1.5px_0px_#000]">
                <AlertCircle className="size-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Console Guidance</h2>
                <p className="text-[9px] text-slate-500 font-mono">Quick operator instructions.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_#000]">
                <p className="text-[9px] font-bold text-slate-700 font-mono uppercase">Local Storage Persistence</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Data is saved inside your browser cache. Clear browser cookies/site data to reset to standard mock files.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_#000]">
                <p className="text-[9px] font-bold text-slate-700 font-mono uppercase">Image Assets</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Provide Unsplash URLs or base64 paths for event and project banner images to render properly.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_#000]">
                <p className="text-[9px] font-bold text-slate-700 font-mono uppercase">GitHub Pages Deploy</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  To publish updates permanently to GitHub Pages, commit the modified `data/mockData.ts` or add a JSON loader if necessary.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
