import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, User, ExternalLink } from "lucide-react";
import { Github } from "../Icons";
import { ClubProject } from "../../types";

interface ProjectDetailViewProps {
  currentProject: ClubProject | undefined;
  setView: (view: string) => void;
}

export default function ProjectDetailView({ currentProject, setView }: ProjectDetailViewProps) {
  if (!currentProject) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Project not found</h2>
        <button onClick={() => setView("projects")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-none">
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <motion.div
      key="project-detail"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12 max-w-4xl mx-auto"
    >
      <button onClick={() => setView("projects")} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-black transition-colors cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> Back to Projects
      </button>

      <div className="w-full h-[320px] rounded-none overflow-hidden relative border-2 border-slate-900 shadow-[6px_6px_0px_#000]">
        <img src={currentProject.banner} alt={currentProject.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{currentProject.title}</h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{currentProject.description}</p>
          </div>

          {/* Tech Stack details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 rounded-none bg-slate-50 text-xs text-slate-700 font-mono border-2 border-slate-200">{tech}</span>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Project Members</h3>
            <div className="flex flex-wrap gap-2">
              {currentProject.team.map((member, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-none bg-slate-50 text-xs font-semibold text-slate-700 border-2 border-slate-200 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-900 border-b-2 border-slate-200 pb-3">Project Metadata</h3>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-slate-900">Mentor</div>
                <div className="text-xs text-slate-600 mt-1">{currentProject.mentor}</div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-slate-200 space-y-3">
              <a
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-none border-2 border-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all"
              >
                <Github className="w-4 h-4" /> Github Repository
              </a>
              <a
                href={currentProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all"
              >
                Live Demonstration <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
