import React from "react"
import CoderithumLogoSvg from "../CoderithumLogoSvg"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <div className="size-8">
        <CoderithumLogoSvg />
      </div>
      <span className="font-bold text-sm tracking-wider text-slate-900 uppercase font-mono">
        Code<span className="text-blue-600">Rhythm</span>
      </span>
    </div>
  )
}
