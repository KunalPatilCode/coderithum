import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "../Icons";
import { TeamMember } from "../../types";

interface TeamViewProps {
  team: TeamMember[];
}

export default function TeamView({ team }: TeamViewProps) {
  const renderNode = (title: string, memberKey?: string, delay: number = 0) => {
    const member = memberKey ? team.find(t => {
      if (memberKey === "faculty") return t.category === "Faculty";
      if (memberKey === "president") return t.role.includes("President") && !t.role.includes("Vice");
      if (memberKey === "vp") return t.role.includes("Vice President");
      if (memberKey === "tech_dir") return t.role.includes("Technical Team Lead") || t.role.includes("Technical Director");
      if (memberKey === "incubator_lead") return t.role.includes("Cybersecurity Head") || t.role.includes("Incubator & Ops");
      if (memberKey === "brand_lead") return t.role.includes("Marketing & Outreach");
      if (memberKey === "outreach_lead") return t.role.includes("Graphics & UI") || t.role.includes("Outreach Lead");
      return false;
    }) : null;

    const variants = {
      hidden: { opacity: 0, y: 15, scale: 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay, type: "spring" as const, stiffness: 120, damping: 14 }
      }
    };

    if (member) {
      return (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          whileHover={{
            y: -5,
            x: -2,
            scale: 1.02,
            transition: { duration: 0.15 }
          }}
          className="w-full max-w-[280px] mx-auto p-4 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] flex flex-col items-center text-center space-y-3 transition-shadow select-none z-10"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-900 bg-slate-100 shrink-0 shadow">
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">{title}</div>
            <h4 className="text-sm font-black text-slate-900 mt-1">{member.name}</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">{member.role}</p>
          </div>
          <div className="flex items-center gap-2">
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors p-1">
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors p-1">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.01 }}
        className="w-full max-w-[280px] mx-auto p-4 bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center text-center justify-center h-24"
      >
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">{title}</div>
        <div className="text-[10px] text-slate-400 font-mono mt-1">Vacant / Cohort Core</div>
      </motion.div>
    );
  };

  const renderArrow = (delay: number = 0) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="flex justify-center my-2"
    >
      <svg className="w-4 h-6 text-slate-900 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.div>
  );

  return (
    <motion.div
      key="team"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12"
    >
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Ecosystem Core</h2>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Organizational Structure</h1>
        <p className="text-xs sm:text-sm text-slate-600">Explore Coderithum's board hierarchy, branching from faculty guidance to developers.</p>
      </div>

      {/* Dynamic Organizational Tree */}
      <div className="w-full max-w-5xl mx-auto p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] space-y-8 overflow-x-auto">
        <div className="min-w-[760px] flex flex-col items-center py-4">

          {/* Level 1: Faculty Mentor */}
          {renderNode("Faculty Mentor", "faculty", 0.1)}
          {renderArrow(0.25)}

          {/* Level 2: President */}
          {renderNode("President", "president", 0.4)}
          {renderArrow(0.55)}

          {/* Level 3: Vice President */}
          {renderNode("Vice President", "vp", 0.7)}

          {/* VP to Column Connection Line */}
          <div className="flex flex-col items-center w-full mt-2">
            <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.85, duration: 0.2 }} className="origin-top w-[3px] h-6 bg-slate-900" />
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.05, duration: 0.3 }} className="origin-center w-[66%] h-[3px] bg-slate-900" />
            <div className="flex justify-between w-[66%] h-6">
              <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
              <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
              <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
            </div>
          </div>

          {/* Columns Grid */}
          <div className="grid grid-cols-3 gap-6 w-full mt-2">

            {/* Column 1: Technical Division */}
            <div className="flex flex-col">
              {renderNode("Technical Director", "tech_dir", 1.55)}
              {renderArrow(1.7)}
              {renderNode("Domain Leads (AI, Web, Cloud...)", undefined, 1.85)}
              {renderArrow(2.0)}
              {renderNode("Project Managers / Tech Leads", undefined, 2.15)}
              {renderArrow(2.3)}
              {renderNode("Senior Developers", undefined, 2.45)}
              {renderArrow(2.6)}
              {renderNode("Junior Developers", undefined, 2.75)}
            </div>

            {/* Column 2: Incubator & Ops Division */}
            <div className="flex flex-col">
              {renderNode("Incubator & Ops Lead", "incubator_lead", 1.55)}
              {renderArrow(1.7)}
              {renderNode("Functional Leads (Research, Startup)", undefined, 1.85)}
              {renderArrow(2.0)}
              {renderNode("Incubator Teams / Research Fellows", undefined, 2.15)}
            </div>

            {/* Column 3: Community & Brand Division */}
            <div className="flex flex-col">
              {renderNode("Community & Brand Lead", "brand_lead", 1.55)}
              {renderArrow(1.7)}
              {renderNode("Outreach Leads (Design, Event...)", "outreach_lead", 1.85)}
              {renderArrow(2.0)}
              {renderNode("Operations Core (Media, HR, Fin)", undefined, 2.15)}
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}
