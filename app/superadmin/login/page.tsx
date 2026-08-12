"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, Loader2, ArrowRight, ShieldAlert } from "lucide-react"

export default function SuperAdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("coderithum_admin_logged_in") === "true"
      if (isLoggedIn) {
        router.push("/superadmin")
      }
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    // Simulate database lookup latency
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("coderithum_admin_email") || "admin@coderithum.com"
      const storedPassword = localStorage.getItem("coderithum_admin_password") || "admin"

      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("coderithum_admin_logged_in", "true")
        // Set cookie so other layers can read it if needed
        document.cookie = "jv_superadmin_token=session_active; path=/; max-age=86400; SameSite=Lax"
        router.push("/superadmin")
        router.refresh()
      } else {
        setError("Invalid email address or security credentials.")
        setIsSubmitting(false)
      }
    }
  }

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block"
  const inputClass = "w-full h-11 px-4 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"

  return (
    <div className="min-h-screen bg-white bg-grid-pattern flex flex-col items-center justify-center p-6 text-slate-900 selection:bg-blue-100 selection:text-slate-900">
      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border-2 border-slate-900 p-8 rounded-none shadow-[6px_6px_0px_#000]"
        >
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 bg-blue-50 border-2 border-blue-600 px-3 py-1.5 rounded-none uppercase mb-4 shadow-[2px_2px_0px_#000]">
              JVS COMMAND DECK
            </span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Console Authorization</h1>
            <p className="text-[11px] text-slate-500 font-mono mt-1 text-center">
              Restricted access — CodeRhythm operations only.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Administrator Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="admin@coderithum.com"
                />
                <Mail className="absolute right-4 top-3.5 size-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Security Credentials</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
                <Lock className="absolute right-4 top-3.5 size-4 text-slate-400" />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-none border-2 border-red-600 bg-red-50 p-3 text-[10px] text-red-600 font-mono shadow-[2px_2px_0px_#000]"
              >
                <ShieldAlert className="size-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-none bg-blue-600 border-2 border-slate-900 py-3.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] disabled:opacity-50 transition-all duration-300 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Verifying Identity...</span>
                </>
              ) : (
                <>
                  <span>Authorize Session</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
        </motion.div>
      </div>
    </div>
  )
}
