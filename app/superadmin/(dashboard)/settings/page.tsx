"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Key, EyeOff, Eye } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [adminEmail, setAdminEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("coderithum_admin_email") || "admin@coderithum.com"
      setAdminEmail(email)
      setLoading(false)
    }
  }, [])

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (typeof window === "undefined") return

    const actualPassword = localStorage.getItem("coderithum_admin_password") || "admin"

    if (currentPassword !== actualPassword) {
      toast({
        title: "Validation Error",
        description: "The current password entered is incorrect.",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "The new passwords do not match.",
        variant: "destructive",
      })
      return
    }

    localStorage.setItem("coderithum_admin_email", adminEmail)
    if (newPassword) {
      localStorage.setItem("coderithum_admin_password", newPassword)
    }

    toast({
      title: "Settings Saved",
      description: "Super Admin credentials have been updated successfully.",
      variant: "success",
    })

    setCurrentPassword("")
    newPassword && setNewPassword("")
    confirmPassword && setConfirmPassword("")
  }

  if (loading) return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading console settings...</div>

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block"
  const inputClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden text-slate-900 select-none min-h-0">
      
      {/* Title */}
      <div className="shrink-0">
        <h1 className="text-xl font-black text-slate-900 tracking-wide font-mono uppercase">SYSTEM SETTINGS</h1>
        <p className="text-xs text-slate-500 mt-0.5">Control administrative accounts and portal access keys.</p>
      </div>

      {/* Grid Container */}
      <div className="flex-grow max-w-2xl min-h-0 overflow-y-auto">
        <form onSubmit={handleSaveCredentials}>
          <Card className="p-6 bg-white border-2 border-slate-900 rounded-none shadow-[4px_4px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3 mb-6">
              <div className="p-1.5 rounded bg-blue-50 text-blue-600 border-2 border-blue-600 shadow-[1.5px_1.5px_0px_#000]">
                <Shield className="size-4.5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Super Admin Access Control</h2>
                <p className="text-[9px] text-slate-500 font-mono">Change console credentials for security.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Admin Email Address</label>
                <input 
                  type="email" 
                  className={inputClass} 
                  value={adminEmail} 
                  onChange={(e) => setAdminEmail(e.target.value)} 
                  required
                  placeholder="admin@coderithum.com" 
                />
              </div>

              <div className="border-t-2 border-slate-900 pt-4 my-2" />

              <div>
                <label className={labelClass}>Current Password (Required to authorize changes)</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className={inputClass} 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    required
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-black cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>New Password (Leave blank to keep current)</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className={inputClass} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="••••••••" 
                  />
                </div>
                <div>
                  <label className={labelClass}>Confirm New Password</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className={inputClass} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 mt-6 border-t-2 border-slate-900">
              <Button type="submit" variant="default">
                Update Access Credentials
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  )
}

