import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center border-2 border-slate-900 px-2 py-0.5 text-[10px] font-bold font-mono uppercase tracking-wider select-none shadow-[1.5px_1.5px_0px_#000]"
  const variants: Record<string, string> = {
    default: "bg-blue-50 text-blue-600",
    secondary: "bg-slate-100 text-slate-700",
    destructive: "bg-red-50 text-red-600",
    outline: "bg-white text-slate-800",
    success: "bg-emerald-50 text-emerald-600"
  }
  return (
    <span className={`${base} ${variants[variant]} ${className || ""}`} {...props} />
  )
}
