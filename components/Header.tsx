import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../public/logo.png";

interface HeaderProps {
  view: string;
  setView: (view: string) => void;
  setSelectedId: (id: string | null) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  view,
  setView,
  setSelectedId,
  mobileMenuOpen,
  setMobileMenuOpen
}: HeaderProps) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "events", label: "Events" },
    { id: "projects", label: "Projects" },
    { id: "gallery", label: "Gallery" },
    { id: "team", label: "Team" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" }
  ];

  const handleTabClick = (tabId: string) => {
    setView(tabId);
    setSelectedId(null);
    setMobileMenuOpen(false);
  };

  const isActive = (tabId: string) => {
    return (
      view === tabId ||
      (tabId === "events" && view === "event-detail") ||
      (tabId === "projects" && view === "project-detail")
    );
  };

  return (
    <>
      <header className="sticky top-4 z-50 px-4 md:px-6 w-full max-w-7xl mx-auto pointer-events-none">
        <div className="w-full backdrop-blur-md bg-white/85 border-2 border-slate-900/80 px-6 h-14 rounded-full flex items-center justify-between shadow-lg pointer-events-auto">
          <button
            onClick={() => handleTabClick("home")}
            className="flex items-center gap-1.5 group cursor-pointer bg-transparent border-none p-0 flex-row"
          >
            <img 
              src={logo.src} 
              alt="Coderithum Logo" 
              className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-200" 
            />
            <span className="font-bold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
              Coderithum
              <span className="px-2 py-0.5 text-[10px] font-mono font-normal rounded-full bg-blue-50 border border-blue-200 text-blue-600">
                Tech Club
              </span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 uppercase">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`hover:text-black transition-colors cursor-pointer relative py-1 bg-transparent border-none ${
                  isActive(tab.id) ? "text-black" : ""
                }`}
              >
                {tab.label}
                {isActive(tab.id) && (
                  <motion.span
                    layoutId="activeHeaderTab"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 bg-white/95 backdrop-blur-md border-2 border-slate-900 z-40 p-6 flex flex-col gap-4 shadow-2xl md:hidden uppercase font-bold rounded-2xl"
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`text-left text-base py-2 transition-colors bg-transparent border-none cursor-pointer ${
                  isActive(tab.id) ? "text-blue-600" : "text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
