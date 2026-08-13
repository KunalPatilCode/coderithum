"use client"

import React, { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Palette, 
  Sparkles, 
  Eye, 
  Save, 
  RotateCcw, 
  Type, 
  Layers, 
  Image as ImageIcon,
  Maximize2,
  X
} from "lucide-react"
import { HeroThemeConfig } from "@/types"
import { initialHeroConfig } from "@/data/mockData"
import InteractivePixelArt from "@/components/InteractivePixelArt"
import CoderithumLogoSvg from "@/components/CoderithumLogoSvg"

const THEME_PRESETS: { id: string; name: string; description: string; config: HeroThemeConfig }[] = [
  {
    id: "ice-canvas",
    name: "Default Ice Canvas",
    description: "Classic CodeRhythm pixel art canvas with clean ice-blue accent styling.",
    config: {
      presetId: "ice-canvas",
      badgeText: "GEC Daman CodeRhythm",
      title: "Empowering Developers & Tech Innovators",
      highlightTitle: "CodeRhythm 2026-2027",
      subtitle: "Registrations are now open for the CodeRhythm Academic Year 2026-2027! Join workshops, hackathons, and open-source project sprints.",
      primaryCtaText: "Register Now",
      primaryCtaLink: "registration-orientation-2026",
      secondaryCtaText: "Explore Events",
      secondaryCtaLink: "events",
      backgroundStyle: "pixel-art",
      accentColor: "#2563eb",
      layoutStyle: "full-bleed",
      bannerImage: "",
      showUpcomingList: true,
    }
  },
  {
    id: "sih-spotlight",
    name: "SIH & Hackathon Spotlight",
    description: "Cyber grid background with vibrant emerald accents tailored for Hackathons.",
    config: {
      presetId: "sih-spotlight",
      badgeText: "SIH 2026 Grand Finale Focus",
      title: "Smart India Hackathon & Hackathon Sprints",
      highlightTitle: "SIH 2026 Finalists",
      subtitle: "Join the elite student developer cohort representing GEC Daman. Pitch problem statements and build real-world software solutions.",
      primaryCtaText: "View SIH Team",
      primaryCtaLink: "achievements",
      secondaryCtaText: "Hackathon Calendar",
      secondaryCtaLink: "events",
      backgroundStyle: "cyber-grid",
      accentColor: "#059669",
      layoutStyle: "split",
      bannerImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      showUpcomingList: true,
    }
  },
  {
    id: "achievements-showcase",
    name: "Achievements & Awards Showcase",
    description: "Cosmic particles canvas with rich gold/amber accents celebrating student wins.",
    config: {
      presetId: "achievements-showcase",
      badgeText: "Hall of Excellence",
      title: "Celebrating Innovation & Hackathon Trophies",
      highlightTitle: "National Trophy Winners",
      subtitle: "Discover how GEC Daman Coderithum members won national hackathons, coding contests, and robotics competitions.",
      primaryCtaText: "Explore Achievements",
      primaryCtaLink: "achievements",
      secondaryCtaText: "Meet the Team",
      secondaryCtaLink: "team",
      backgroundStyle: "cosmic-particles",
      accentColor: "#d97706",
      layoutStyle: "centered",
      bannerImage: "",
      showUpcomingList: false,
    }
  },
  {
    id: "orientation-clubs",
    name: "Orientation & Club Membership",
    description: "Gradient wave canvas with deep violet accents for recruitments & onboarding.",
    config: {
      presetId: "orientation-clubs",
      badgeText: "Recruitment Season 2026-2027",
      title: "Join GEC Daman's Flagship Tech Club",
      highlightTitle: "Member Registration",
      subtitle: "Become part of the official developer community. Access computational labs, expert mentors, and project sprints.",
      primaryCtaText: "Join CodeRhythm",
      primaryCtaLink: "registration-orientation-2026",
      secondaryCtaText: "About the Club",
      secondaryCtaLink: "about",
      backgroundStyle: "gradient-wave",
      accentColor: "#7c3aed",
      layoutStyle: "split",
      bannerImage: "",
      showUpcomingList: true,
    }
  },
  {
    id: "makarsankranti",
    name: "Makar Sankranti",
    description: "Colorful kites pixel-art themed background with golden amber accents.",
    config: {
      presetId: "makarsankranti",
      badgeText: "Festival Theme",
      title: "Happy Makar Sankranti",
      highlightTitle: "Makar Sankranti",
      subtitle: "Wishing you a sky full of kites and a heart full of happiness!",
      primaryCtaText: "Register Now",
      primaryCtaLink: "registration-orientation-2026",
      secondaryCtaText: "Explore Events",
      secondaryCtaLink: "events",
      backgroundStyle: "pixel-art",
      accentColor: "#d97706",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_makarsankranti.jpg",
      showUpcomingList: true,
    }
  },
  {
    id: "dussehra",
    name: "Dussehra",
    description: "Vibrant pixel-art background of Lord Rama & Ravana with warm rose accents.",
    config: {
      presetId: "dussehra",
      badgeText: "Festival Theme",
      title: "Happy Dussehra",
      highlightTitle: "Dussehra",
      subtitle: "May this festive season bring you good health, prosperity, and success!",
      primaryCtaText: "Register Now",
      primaryCtaLink: "registration-orientation-2026",
      secondaryCtaText: "Explore Events",
      secondaryCtaLink: "events",
      backgroundStyle: "pixel-art",
      accentColor: "#e11d48",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_dussehra.jpg",
      showUpcomingList: true,
    }
  },
  {
    id: "christmas",
    name: "Christmas",
    description: "Santa Claus sleigh & snowy pixel art forest theme with clean blue accents.",
    config: {
      presetId: "christmas",
      badgeText: "Festival Theme",
      title: "Merry Christmas",
      highlightTitle: "Christmas",
      subtitle: "Wishing you peace, joy, and a very Merry Christmas!",
      primaryCtaText: "Register Now",
      primaryCtaLink: "registration-orientation-2026",
      secondaryCtaText: "Explore Events",
      secondaryCtaLink: "events",
      backgroundStyle: "pixel-art",
      accentColor: "#2563eb",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_christmas.jpg",
      showUpcomingList: true,
    }
  },
  {
    id: "holi",
    name: "Holi",
    description: "Splashes of color, water gun pixel-art theme with rich violet accents.",
    config: {
      presetId: "holi",
      badgeText: "Festival Theme",
      title: "Happy Holi",
      highlightTitle: "Holi",
      subtitle: "Celebrate the festival of colors with joy, love, and vibrant energy!",
      primaryCtaText: "Register Now",
      primaryCtaLink: "registration-orientation-2026",
      secondaryCtaText: "Explore Events",
      secondaryCtaLink: "events",
      backgroundStyle: "pixel-art",
      accentColor: "#7c3aed",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_holi.jpg",
      showUpcomingList: true,
    }
  },
  {
    id: "diwali",
    name: "Diwali",
    description: "Traditional diyas, crackers & temple pixel-art theme with warm amber accents.",
    config: {
      presetId: "diwali",
      badgeText: "Festival Theme",
      title: "Happy Diwali",
      highlightTitle: "Diwali",
      subtitle: "May the festival of lights bring brightness, warmth, and joy to your life!",
      primaryCtaText: "Register Now",
      primaryCtaLink: "registration-orientation-2026",
      secondaryCtaText: "Explore Events",
      secondaryCtaLink: "events",
      backgroundStyle: "pixel-art",
      accentColor: "#d97706",
      layoutStyle: "full-bleed",
      bannerImage: "/theme_diwali.jpg",
      showUpcomingList: true,
    }
  }
]

const ACCENT_COLORS = [
  { name: "Blue", hex: "#2563eb", bg: "bg-blue-600" },
  { name: "Emerald", hex: "#059669", bg: "bg-emerald-600" },
  { name: "Violet", hex: "#7c3aed", bg: "bg-violet-600" },
  { name: "Amber", hex: "#d97706", bg: "bg-amber-600" },
  { name: "Rose", hex: "#e11d48", bg: "bg-rose-600" },
]

export default function HeroThemeManagerPage() {
  const { toast } = useToast()
  const [config, setConfig] = useState<HeroThemeConfig>(initialHeroConfig)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"preset" | "customize">("preset")
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_hero_config")
      if (stored) {
        try {
          setConfig(JSON.parse(stored))
        } catch {
          setConfig(initialHeroConfig)
        }
      }
      setLoading(false)
    }
  }, [])

  const handleApplyPreset = (preset: typeof THEME_PRESETS[0]) => {
    setConfig(preset.config)
    toast({
      title: "Preset Selected",
      description: `Applied '${preset.name}'. Click 'Save Hero Config' to publish changes.`,
      variant: "success",
    })
  }

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("coderithum_hero_config", JSON.stringify(config))
      toast({
        title: "Hero Theme Saved!",
        description: "Public landing hero configuration updated successfully.",
        variant: "success",
      })
    }
  }

  const handleReset = () => {
    setConfig(initialHeroConfig)
    if (typeof window !== "undefined") {
      localStorage.setItem("coderithum_hero_config", JSON.stringify(initialHeroConfig))
    }
    toast({
      title: "Reset to Default",
      description: "Hero theme restored to default Ice Canvas settings.",
    })
  }

  const labelClass = "text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 block font-mono"
  const formInputClass = "w-full h-10 px-3 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"
  const selectClass = "w-full h-10 px-3 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono cursor-pointer"

  if (loading) {
    return <div className="text-center py-12 text-slate-600 font-mono text-xs">Loading Hero Theme Engine...</div>
  }

  return (
    <div className="h-full flex flex-col gap-6 text-slate-900 min-h-0">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-wide uppercase font-mono">
            Hero Theme Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            Select theme presets, customize text & background canvases, and publish hero changes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleReset} variant="outline" className="flex items-center gap-1.5">
            <RotateCcw className="size-3.5" /> Reset
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-1.5 bg-blue-600 hover:bg-black text-white">
            <Save className="size-3.5" /> Save Hero Config
          </Button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto pb-12">
        
        {/* Left Column: Configuration Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Tab Switcher */}
          <div className="flex border-2 border-slate-900 bg-white shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => setActiveTab("preset")}
              className={`flex-1 py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "preset"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Sparkles className="size-3.5" /> Presets Gallery
            </button>
            <button
              onClick={() => setActiveTab("customize")}
              className={`flex-1 py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border-l-2 border-slate-900 cursor-pointer ${
                activeTab === "customize"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Palette className="size-3.5" /> Customizer Settings
            </button>
          </div>

          {activeTab === "preset" ? (
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">Select Theme Preset</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = config.presetId === preset.id
                  return (
                    <Card
                      key={preset.id}
                      onClick={() => handleApplyPreset(preset)}
                      className={`p-4 border-2 border-slate-900 rounded-none cursor-pointer transition-all ${
                        isSelected 
                          ? "bg-blue-50/80 shadow-[4px_4px_0px_#000] ring-2 ring-blue-600" 
                          : "bg-white shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <Badge variant={isSelected ? "default" : "secondary"}>
                          {isSelected ? "Active Preset" : "Preset"}
                        </Badge>
                        <div 
                          className="size-4 rounded-full border border-slate-900"
                          style={{ backgroundColor: preset.config.accentColor }}
                        />
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase font-mono mt-3">{preset.name}</h3>
                      <p className="text-[10px] text-slate-600 font-mono mt-1 leading-relaxed">{preset.description}</p>
                      
                      <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] font-mono text-slate-500">
                        <span>Canvas: {preset.config.backgroundStyle}</span>
                        <span>Layout: {preset.config.layoutStyle}</span>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Text & Badges Customization */}
              <Card className="p-5 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2 text-xs font-bold font-mono uppercase text-slate-900">
                  <Type className="size-4 text-blue-600" /> Header Text & Badges
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Top Tag / Badge Label</label>
                    <input
                      type="text"
                      value={config.badgeText}
                      onChange={(e) => setConfig({ ...config, badgeText: e.target.value, presetId: "custom" })}
                      className={formInputClass}
                      placeholder="e.g. GEC Daman CodeRhythm"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Highlight Title Line</label>
                    <input
                      type="text"
                      value={config.highlightTitle}
                      onChange={(e) => setConfig({ ...config, highlightTitle: e.target.value, presetId: "custom" })}
                      className={formInputClass}
                      placeholder="e.g. CodeRhythm 2026-2027"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Main Title Heading</label>
                  <input
                    type="text"
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value, presetId: "custom" })}
                    className={formInputClass}
                    placeholder="e.g. Empowering Developers & Tech Innovators"
                  />
                </div>

                <div>
                  <label className={labelClass}>Subtitle Description Text</label>
                  <textarea
                    rows={3}
                    value={config.subtitle}
                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value, presetId: "custom" })}
                    className="w-full p-3 rounded-none bg-white border-2 border-slate-900 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-0 transition-all font-mono"
                    placeholder="Enter subtitle description..."
                  />
                </div>
              </Card>

              {/* Visual Style & Color Customization */}
              <Card className="p-5 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2 text-xs font-bold font-mono uppercase text-slate-900">
                  <Palette className="size-4 text-emerald-600" /> Background Canvas & Colors
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Interactive Canvas Renderer</label>
                    <select
                      value={config.backgroundStyle}
                      onChange={(e: any) => setConfig({ ...config, backgroundStyle: e.target.value, presetId: "custom" })}
                      className={selectClass}
                    >
                      <option value="pixel-art">Pixel Art Retro Grid</option>
                      <option value="cyber-grid">Cyber Grid & Matrix Glow</option>
                      <option value="cosmic-particles">Cosmic Particles Canvas</option>
                      <option value="gradient-wave">Dynamic Gradient Wave</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Banner Layout Arrangement</label>
                    <select
                      value={config.layoutStyle}
                      onChange={(e: any) => setConfig({ ...config, layoutStyle: e.target.value, presetId: "custom" })}
                      className={selectClass}
                    >
                      <option value="full-bleed">Full Bleed Immersive Banner</option>
                      <option value="split">Split Layout (Text & Card Grid)</option>
                      <option value="centered">Centered Hero Statement</option>
                      <option value="minimal">Minimal Compact Banner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Accent Theme Color Palette</label>
                  <div className="flex items-center gap-3 pt-1">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setConfig({ ...config, accentColor: c.hex, presetId: "custom" })}
                        className={`flex items-center gap-2 px-3 py-1.5 border-2 border-slate-900 text-xs font-mono font-bold transition-all cursor-pointer shadow-[1.5px_1.5px_0px_#000] ${
                          config.accentColor === c.hex ? "bg-slate-900 text-white" : "bg-white text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`size-3.5 rounded-full border border-white ${c.bg}`} />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Custom Background Image URL (Optional)</label>
                  <input
                    type="text"
                    value={config.bannerImage}
                    onChange={(e) => setConfig({ ...config, bannerImage: e.target.value, presetId: "custom" })}
                    className={formInputClass}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </Card>

              {/* Call-to-Actions (CTAs) */}
              <Card className="p-5 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_#000] space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2 text-xs font-bold font-mono uppercase text-slate-900">
                  <Layers className="size-4 text-purple-600" /> Buttons & Action Triggers
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Primary Button Text</label>
                    <input
                      type="text"
                      value={config.primaryCtaText}
                      onChange={(e) => setConfig({ ...config, primaryCtaText: e.target.value, presetId: "custom" })}
                      className={formInputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Primary Target View / Event ID</label>
                    <input
                      type="text"
                      value={config.primaryCtaLink}
                      onChange={(e) => setConfig({ ...config, primaryCtaLink: e.target.value, presetId: "custom" })}
                      className={formInputClass}
                      placeholder="e.g. registration-orientation-2026 or events"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Secondary Button Text</label>
                    <input
                      type="text"
                      value={config.secondaryCtaText}
                      onChange={(e) => setConfig({ ...config, secondaryCtaText: e.target.value, presetId: "custom" })}
                      className={formInputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Secondary Target View</label>
                    <input
                      type="text"
                      value={config.secondaryCtaLink}
                      onChange={(e) => setConfig({ ...config, secondaryCtaLink: e.target.value, presetId: "custom" })}
                      className={formInputClass}
                      placeholder="e.g. events or achievements"
                    />
                  </div>
                </div>
              </Card>

            </div>
          )}

        </div>

        {/* Right Column: Real-Time Admin Neubrutalist Live Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5">
              <Eye className="size-4 text-blue-600" /> Live Admin Preview
            </h2>
            <Badge variant="outline" className="font-mono text-[9px] uppercase">
              {config.presetId}
            </Badge>
          </div>

          <div className="sticky top-4">
            <Card className="border-2 border-slate-900 bg-white shadow-[4px_4px_0px_#000] rounded-none overflow-hidden">
              
              {/* Preview Canvas Header */}
              <div className="p-3 bg-slate-100 border-b-2 border-slate-900 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-700 uppercase">Interactive Banner Preview</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFullScreen(true)}
                    className="flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono font-bold bg-white text-slate-900 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#000] hover:bg-slate-50 transition-all cursor-pointer hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#000]"
                  >
                    <Maximize2 className="size-2.5" /> Full Screen
                  </button>
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* Dynamic Hero Banner Body */}
              <div className="relative min-h-[320px] bg-slate-900 text-white p-6 flex flex-col justify-between overflow-hidden">
                
                {/* Background Render Mode */}
                {config.backgroundStyle === "pixel-art" && (
                  <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                    <InteractivePixelArt presetId={config.presetId} bannerImage={config.bannerImage} />
                  </div>
                )}

                {config.backgroundStyle === "cyber-grid" && (
                  <div 
                    className="absolute inset-0 z-0 opacity-25 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
                    style={{ backgroundColor: "#090d16" }}
                  />
                )}

                {config.backgroundStyle === "cosmic-particles" && (
                  <div 
                    className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40"
                  />
                )}

                {config.backgroundStyle === "gradient-wave" && (
                  <div 
                    className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-violet-950 via-slate-900 to-blue-950"
                  />
                )}

                {/* Optional Banner Image Overlay */}
                {config.bannerImage && (
                  <div 
                    className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: `url(${config.bannerImage})` }}
                  />
                )}

                {/* Banner Content Layer */}
                <div className="relative z-10 space-y-4">
                  <div className="inline-block px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-white border border-white/30 shadow-[2px_2px_0px_#000]" style={{ backgroundColor: config.accentColor }}>
                    {config.badgeText || "CODERITHUM"}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white/80 font-mono">
                      {config.title}
                    </h3>
                    <h2 className="text-lg font-black text-white uppercase tracking-wide font-mono mt-0.5">
                      {config.highlightTitle}
                    </h2>
                  </div>

                  <p className="text-[11px] text-slate-300 font-mono leading-relaxed max-w-sm line-clamp-3">
                    {config.subtitle}
                  </p>
                </div>

                {/* Banner CTA Footer */}
                <div className="relative z-10 pt-6 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-xs font-mono font-bold text-white uppercase border border-slate-900 shadow-[2px_2px_0px_#000]"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    {config.primaryCtaText || "Primary CTA"}
                  </button>
                  {config.secondaryCtaText && (
                    <button
                      type="button"
                      className="px-3 py-1.5 text-xs font-mono font-bold bg-white text-slate-900 uppercase border border-slate-900 shadow-[2px_2px_0px_#000]"
                    >
                      {config.secondaryCtaText}
                    </button>
                  )}
                </div>

              </div>

              <div className="p-3 bg-slate-50 border-t-2 border-slate-900 text-[10px] font-mono text-slate-500">
                Live rendering on <code className="text-blue-600 font-bold">http://localhost:3000</code>
              </div>

            </Card>
          </div>

        </div>

      </div>

      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col justify-center items-center overflow-hidden">
          {/* Background Live Canvas */}
          <div className="absolute inset-0 w-full h-full z-0 opacity-100 pointer-events-none bg-white">
            <InteractivePixelArt presetId={config.presetId} bannerImage={config.bannerImage} />
          </div>

          {/* Top Header Overlay mimicking real header */}
          <div className="absolute top-4 left-4 right-4 z-20 px-4 md:px-6 w-full max-w-7xl mx-auto pointer-events-none">
            <div className="w-full backdrop-blur-md bg-white/90 border border-slate-400/80 px-5 md:px-7 h-14 rounded-full flex items-center justify-between shadow-md pointer-events-auto">
              <div className="flex items-center gap-2.5">
                <CoderithumLogoSvg className="w-6 h-6 object-contain" />
                <span className="font-bold text-sm md:text-base tracking-tight text-slate-900 flex items-center gap-1.5 font-mono">
                  Coderithum
                  <span className="px-2 py-0.5 text-[10px] font-mono font-normal rounded-full bg-blue-50 border border-blue-200 text-blue-600">
                    Tech Club
                  </span>
                </span>
              </div>

              {/* Replica Nav Links */}
              <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-mono font-bold text-slate-700">
                <span className="text-slate-900 border-b-2 border-blue-600 pb-0.5 cursor-pointer">Home</span>
                <span className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">About</span>
                <span className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Events</span>
                <span className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Projects</span>
                <span className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Gallery</span>
                <span className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Team</span>
                <span className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Achievements</span>
                <span className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Contact</span>
              </nav>

              {/* Close Button placed inside the header capsule */}
              <button
                type="button"
                onClick={() => setIsFullScreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold bg-slate-900 hover:bg-black text-white rounded-full transition-all cursor-pointer border-none"
              >
                <X className="size-3.5" /> Close Preview
              </button>
            </div>
          </div>

          {/* Hero Content aligned exactly like home view */}
          <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center space-y-6">
            <div className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest text-white border border-white/30 shadow-[3px_3px_0px_#000]" style={{ backgroundColor: config.accentColor }}>
              {config.badgeText || "CODERITHUM"}
            </div>
            
            <div className="space-y-2">
              <h1 className="text-xl md:text-3xl font-black text-white/90 font-mono max-w-2xl leading-tight">
                {config.title}
              </h1>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider font-mono">
                {config.highlightTitle}
              </h2>
            </div>

            <p className="text-xs md:text-sm text-slate-300 font-mono leading-relaxed max-w-xl">
              {config.subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                className="px-6 py-2.5 text-xs md:text-sm font-mono font-bold text-white uppercase border-2 border-slate-900 shadow-[3px_3px_0px_#000]"
                style={{ backgroundColor: config.accentColor }}
              >
                {config.primaryCtaText || "Register Now"}
              </button>
              {config.secondaryCtaText && (
                <button
                  type="button"
                  className="px-6 py-2.5 text-xs md:text-sm font-mono font-bold bg-white text-slate-900 uppercase border-2 border-slate-900 shadow-[3px_3px_0px_#000]"
                >
                  {config.secondaryCtaText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
