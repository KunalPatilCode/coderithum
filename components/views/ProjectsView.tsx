import React from "react";
import { motion } from "framer-motion";
import { ClubProject } from "../../types";
import InteractiveHeading from "../InteractiveHeading";

interface ProjectsViewProps {
  projects: ClubProject[];
  setView: (view: string) => void;
  setSelectedId: (id: string | null) => void;
}

export default function ProjectsView({ projects, setView, setSelectedId }: ProjectsViewProps) {
  const handleProjectClick = (id: string) => {
    setView("project-detail");
    setSelectedId(id);
  };

  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-16"
    >
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <InteractiveHeading text="Innovation Hub" as="h2" className="text-xs font-mono tracking-widest text-theme uppercase" />
        <div>
          <InteractiveHeading text="Technical Projects" as="h1" className="text-4xl font-extrabold text-slate-900 tracking-tight" />
        </div>
        <p className="text-xs sm:text-sm text-slate-600">Discover open-source packages, network grids, and AI agents fully built by club members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(project => (
          <div 
            key={project.id} 
            onClick={() => handleProjectClick(project.id)}
            className="p-6 rounded-none bg-white border-2 border-slate-900 transition-all flex flex-col justify-between space-y-6 shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] group relative cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-full h-[200px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
                {/* Base Image */}
                <img src={project.banner} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105" />

                {/* Red Glitch Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                  <img
                    src={project.banner}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover animate-glitch-1 scale-105"
                    style={{ filter: 'hue-rotate(90deg) saturate(2.5)' }}
                  />
                </div>

                {/* Blue Glitch Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                  <img
                    src={project.banner}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover animate-glitch-2 scale-105"
                    style={{ filter: 'hue-rotate(220deg) saturate(2.5)' }}
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-900 group-hover:text-theme transition-colors">{project.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{project.shortDesc}</p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-none bg-slate-50 text-[10px] text-slate-700 font-mono border-2 border-slate-200">{tech}</span>
                ))}
              </div>
              <button
                onClick={() => handleProjectClick(project.id)}
                className="w-full py-2.5 bg-theme-light border-2 border-theme rounded-none text-xs font-bold text-theme hover:bg-theme hover:text-white transition-all shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                View Project Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
