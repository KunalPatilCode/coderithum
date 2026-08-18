import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-none font-bold font-mono tracking-wide transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none border-2 border-slate-900"
  
  const sizes: Record<string, string> = {
    default: "h-10 px-4 py-2 text-xs",
    sm: "h-8 px-2.5 py-1 text-[11px]",
    lg: "h-12 px-6 py-3 text-sm",
    icon: "h-8 w-8 p-0 shrink-0 text-xs"
  }

  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:translate-x-[1px] hover:translate-y-[1px] shadow-[3px_3px_0px_#000] hover:shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]",
    destructive: "bg-red-500 text-white hover:translate-x-[1px] hover:translate-y-[1px] shadow-[3px_3px_0px_#000] hover:shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]",
    outline: "bg-white text-slate-900 hover:translate-x-[1px] hover:translate-y-[1px] shadow-[3px_3px_0px_#000] hover:shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:translate-x-[1px] hover:translate-y-[1px] shadow-[3px_3px_0px_#000] hover:shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]",
    ghost: "border-transparent bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-none hover:translate-none active:translate-none"
  }

  return (
    <button className={`${base} ${sizes[size] || ""} ${variants[variant]} ${className || ""}`} {...props} />
  )
}
