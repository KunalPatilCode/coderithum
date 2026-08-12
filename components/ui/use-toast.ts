import { useState, useEffect } from "react"

export interface ToastProps {
  title: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

export function useToast() {
  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    if (typeof window === "undefined") return

    // Find or create toast container
    let container = document.getElementById("coderithum-toast-container")
    if (!container) {
      container = document.createElement("div")
      container.id = "coderithum-toast-container"
      container.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      document.body.appendChild(container)
    }

    // Create individual toast element
    const toastEl = document.createElement("div")
    toastEl.className = `p-4 rounded-none border-2 border-slate-900 shadow-[3px_3px_0px_#000] flex flex-col gap-0.5 pointer-events-auto transform translate-y-2 opacity-0 transition-all duration-300 font-sans cursor-pointer`
    
    // Set colors based on variant
    if (variant === "destructive") {
      toastEl.className += " bg-red-50 text-red-600"
    } else if (variant === "success") {
      toastEl.className += " bg-emerald-50 text-emerald-600"
    } else {
      toastEl.className += " bg-white text-slate-900"
    }

    // Contents
    const titleEl = document.createElement("div")
    titleEl.className = "text-[11px] font-black uppercase tracking-wider font-mono"
    titleEl.textContent = title
    toastEl.appendChild(titleEl)

    if (description) {
      const descEl = document.createElement("div")
      descEl.className = "text-[11px] text-slate-500 font-medium"
      descEl.textContent = description
      toastEl.appendChild(descEl)
    }

    // Append and trigger animation
    container.appendChild(toastEl)
    
    // Force reflow
    toastEl.offsetHeight

    // Animate in
    toastEl.classList.remove("translate-y-2", "opacity-0")

    // Dismiss trigger
    const dismiss = () => {
      toastEl.classList.add("translate-y-2", "opacity-0")
      setTimeout(() => {
        if (toastEl.parentNode === container) {
          container.removeChild(toastEl)
        }
        if (container.childNodes.length === 0) {
          document.body.removeChild(container)
        }
      }, 300)
    }

    // Click to dismiss
    toastEl.addEventListener("click", dismiss)

    // Auto dismiss after 4 seconds
    setTimeout(dismiss, 4000)
  }

  return { toast }
}
