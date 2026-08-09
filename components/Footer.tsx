"use client";

import React from "react";
import { Github, Linkedin } from "./Icons";
import CoderithumLogoSvg from "./CoderithumLogoSvg";
import ClickSoundManager from "./ClickSoundManager";

interface FooterProps {
  setView: (view: string) => void;
  setSelectedId: (id: string | null) => void;
}

export default function Footer({ setView, setSelectedId }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setView(tabId);
    setSelectedId(null);
  };

  return (
    <footer className="border-t-2 border-slate-900 py-5 md:py-6 px-6 bg-white text-xs text-slate-600 relative z-10 font-mono">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <CoderithumLogoSvg className="w-5 h-5 object-contain" />
              <span className="font-bold text-slate-900 text-sm">Coderithum Tech Club</span>
            </div>
            <p className="max-w-xs leading-snug text-slate-600">
              Official student computing division showcasing innovation, annual events, and collaborative codebases.
            </p>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <h4 className="text-slate-900 text-sm font-bold">Quick Navigation</h4>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleNavClick("home")}
                className="text-left hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0 text-slate-600 text-xs font-mono"
              >
                Index Grid
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="text-left hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0 text-slate-600 text-xs font-mono"
              >
                Our Journey
              </button>
              <button
                onClick={() => handleNavClick("events")}
                className="text-left hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0 text-slate-600 text-xs font-mono"
              >
                Events Board
              </button>
              <button
                onClick={() => handleNavClick("projects")}
                className="text-left hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0 text-slate-600 text-xs font-mono"
              >
                Tech Projects
              </button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <h4 className="text-slate-900 text-sm font-bold">Developer Utilities</h4>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleNavClick("404-test")}
                className="text-left hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0 text-slate-600 text-xs font-mono"
              >
                View Mock 404 View
              </button>
              <button
                onClick={() => handleNavClick("500-test")}
                className="text-left hover:text-black transition-colors cursor-pointer bg-transparent border-none p-0 text-slate-600 text-xs font-mono"
              >
                View Mock 500 View
              </button>
              <a
                href="https://github.com/KunalPatilCode/coderithum"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors flex items-center gap-1.5 text-slate-600"
              >
                <Github className="w-3.5 h-3.5" /> Code Repository
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-slate-200 pt-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Coderithum. All rights reserved. Open source under MIT license.</p>
          <div className="flex flex-wrap items-center justify-end gap-4 text-slate-500">
            <ClickSoundManager />
            <span className="h-4 w-px bg-slate-300 hidden sm:inline-block" />
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/KunalPatilCode/coderithum" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" title="GitHub Repository">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
