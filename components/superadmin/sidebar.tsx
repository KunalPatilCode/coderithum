import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Sparkles,
  Calendar,
  Bell,
  Code2,
  Users2,
  Trophy,
  Image,
  Settings,
  HelpCircle
} from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function SuperAdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  const navItems = [
    { name: "Overview", href: "/superadmin", icon: LayoutDashboard },
    { name: "Hero Theme Manager", href: "/superadmin/hero", icon: Sparkles },
    { name: "Events Manager", href: "/superadmin/events", icon: Calendar },
    { name: "Announcements & Sync", href: "/superadmin/announcements", icon: Bell },
    { name: "Projects Manager", href: "/superadmin/projects", icon: Code2 },
    { name: "Team & Hierarchy", href: "/superadmin/team", icon: Users2 },
    { name: "Achievements Manager", href: "/superadmin/achievements", icon: Trophy },
    { name: "Gallery Manager", href: "/superadmin/gallery", icon: Image },
    { name: "System Settings", href: "/superadmin/settings", icon: Settings },
  ]


  return (
    <aside className={`w-64 flex flex-col h-full border-r-2 border-slate-900 bg-white ${className || ""}`}>
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b-2 border-slate-900 bg-slate-50 shrink-0">
        <Logo />
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-none font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive
                  ? "bg-blue-600 text-white border-2 border-slate-900 shadow-[3px_3px_0px_#000]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-2 border-transparent hover:border-slate-900"
                }`}
            >
              <Icon className={`size-4 ${isActive ? "text-white" : "text-slate-500"}`} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t-2 border-slate-900 bg-slate-50 shrink-0">
        <div className="flex items-center gap-3 p-3 rounded-none bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
          <HelpCircle className="size-4.5 text-slate-400" />
          <div>
            <p className="text-[9px] font-bold text-slate-700 font-mono">OPERATOR HELPDESK</p>
            <p className="text-[8px] text-slate-400 font-mono mt-0.5">V1.0.2 // STABLE</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
