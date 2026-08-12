"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { SuperAdminSidebar } from "@/components/superadmin/sidebar"
import { Menu, X, Bell, ChevronDown, LogOut, Settings } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  const isSingleScreen = pathname === "/superadmin" || pathname === "/superadmin/" || pathname === "/superadmin/settings"

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("coderithum_admin_logged_in") === "true"
      if (!isLoggedIn) {
        router.push("/superadmin/login")
      } else {
        setAuthorized(true)
      }
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("coderithum_admin_logged_in")
      document.cookie = "jv_superadmin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax"
      router.push("/superadmin/login")
    }
  }

  if (!authorized) {
    return (
      <div className="h-screen w-screen bg-white bg-grid-pattern flex items-center justify-center">
        <div className="bg-white border-2 border-slate-900 p-6 rounded-none shadow-[4px_4px_0px_#000] text-slate-900 font-mono text-xs uppercase tracking-widest font-bold">
          Verifying Session...
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-slate-900">
      {/* Desktop Sidebar (Docked Icon Bar) */}
      <div className="hidden md:flex">
        <SuperAdminSidebar className="h-full border-r-2 border-slate-900 bg-white" />
      </div>

      {/* Mobile Drawer Navigation Backdrop & Sheet */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Blur Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white border-r-2 border-slate-900 pt-5 pb-4 animate-in slide-in-from-left duration-300">
            {/* Close Button Inside Drawer */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-none border-2 border-slate-900 bg-white text-slate-800 hover:text-black hover:bg-slate-50 transition-colors shadow-[2px_2px_0px_#000]"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 h-full overflow-y-auto" onClick={() => setSidebarOpen(false)}>
              <SuperAdminSidebar className="w-full border-r-0 h-full bg-white" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex h-20 items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b-2 border-slate-900 shrink-0 select-none">
          {/* System Environment Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 bg-blue-50 border-2 border-blue-600 px-3 py-1.5 rounded-none uppercase shadow-[2px_2px_0px_#000]">
              CR PORTAL DECK
            </span>
            <span className="text-[9px] font-mono text-slate-500 font-bold">
              ENV: PRODUCTION // V1.0.2
            </span>
          </div>

          {/* Notifications and Profile triggers */}
          <div className="flex items-center gap-4">
            {/* User Avatar Card Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-3 py-1.5 rounded-none bg-white border-2 border-slate-900 hover:bg-slate-50 shadow-[2px_2px_0px_#000] transition-all select-none cursor-pointer"
              >
                <div className="relative">
                  <div className="size-8 rounded-none bg-slate-100 border-2 border-slate-900 text-slate-900 flex items-center justify-center font-bold text-xs font-mono">
                    A
                  </div>
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <ChevronDown className={`h-3.5 w-3.5 text-slate-600 hover:text-black transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  {/* Backdrop click closer */}
                  <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-slate-900 rounded-none py-2 shadow-[4px_4px_0px_#000] z-40 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b-2 border-slate-900 text-slate-500">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Active User</p>
                      <p className="text-slate-900 mt-0.5 truncate text-[11px] font-mono font-bold">admin@coderithum.com</p>
                    </div>
                    
                    <Link 
                      href="/superadmin/settings" 
                      className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings className="size-3.5 text-blue-600" />
                      System Settings
                    </Link>
                    
                    <div className="border-t-2 border-slate-900 mt-1 pt-1">
                      <button 
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="size-3.5 text-red-500" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="flex md:hidden h-16 items-center justify-between px-6 bg-slate-50 border-b-2 border-slate-900 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-none border-2 border-slate-900 bg-white text-slate-800 hover:text-black hover:bg-slate-50 transition-colors shadow-[2px_2px_0px_#000]"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <Logo className="h-6 w-auto text-blue-600" />
          </div>
          <div className="size-8 rounded-none bg-slate-100 border-2 border-slate-900 text-slate-900 flex items-center justify-center font-bold text-xs font-mono">
            A
          </div>
        </header>

        {/* Dynamic viewport layout */}
        <div className={`flex-1 p-4 md:p-6 bg-white bg-grid-pattern min-h-0 ${
          isSingleScreen ? "flex flex-col overflow-hidden" : "overflow-y-auto"
        }`}>
          {children}
        </div>
      </div>
    </div>
    </div>
  )
}
