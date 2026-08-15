import * as React from "react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-none border-2 border-slate-900 bg-white px-3 py-2 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono ${className || ""
        }`}
      {...props}
    />
  )
}
