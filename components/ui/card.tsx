import * as React from "react"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-none border-2 border-slate-900 bg-white text-slate-900 shadow-[3px_3px_0px_#000] transition-colors ${className || ""
        }`}
      {...props}
    />
  )
}
