import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "../Icons";
import { TeamMember } from "../../types";
import InteractiveHeading from "../InteractiveHeading";

interface AboutViewProps {
  team: TeamMember[];
}

export default function AboutView({ team }: AboutViewProps) {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-16 max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        <InteractiveHeading text="Who We Are" as="h2" className="text-xs font-mono tracking-widest text-blue-600 uppercase" />
        <div>
          <InteractiveHeading text="About Coderithum" as="h1" className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight" />
        </div>
        <p className="text-base text-slate-600 leading-relaxed pt-2">
          Coderithum is the premier, innovation-focused student tech club. Founded with the mission to bridge academia with actual industry development pipelines, we train, guide, and empower students to build real software grids, coordinate national events, and design high-impact projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-3 shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all">
          <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To cultivate a self-sustaining ecosystem of developers and researchers who innovate continuously, contributing to open source, enterprise engineering, and cutting-edge publications.
          </p>
        </div>
        <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-3 shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all">
          <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We host weekly code reviews, cloud deployments, and hack sprints. We enable future committees to inherit a strong technical base and build projects directly deployed on modern cloud backends.
          </p>
        </div>
      </div>

      {/* Faculty Section */}
      <div className="space-y-6">
        <InteractiveHeading text="Faculty Advisors" as="h2" className="text-xs font-mono tracking-widest text-blue-600 uppercase" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {team.filter(t => t.category === "Faculty").map((fac, idx) => (
            <div key={idx} className="p-6 rounded-none bg-white border-2 border-slate-900 flex items-center gap-4 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all">
              <img src={fac.avatar} alt={fac.name} className="w-16 h-16 rounded-none object-cover border-2 border-slate-900" />
              <div>
                <h4 className="text-base font-bold text-slate-900">{fac.name}</h4>
                <p className="text-xs text-slate-600 mt-1">{fac.role}</p>
                <a href={fac.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-black mt-2 font-medium">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="space-y-8">
        <InteractiveHeading text="Our Journey Timeline" as="h2" className="text-xs font-mono tracking-widest text-blue-600 uppercase" />
        <div className="relative border-l-2 border-slate-200 pl-6 ml-4 space-y-8">
          {[
            { year: "2024", title: "Club Conception", desc: "Club founded by a small group of open-source enthusiasts, hosting local compiler building sessions." },
            { year: "2025", title: "Smart India Hackathon Triumph", desc: "Our developer cohort secured first place at Smart India Hackathon in smart grid management." },
            { year: "2026", title: "Coderithum Portal Release", desc: "Designed, built, and static-deployed the new visual portfolio portal and resource ecosystem." }
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-none bg-blue-600 border-2 border-white" />
              <div className="text-xs font-mono text-blue-600 uppercase tracking-widest">{item.year}</div>
              <h4 className="text-base font-bold text-slate-900 mt-1">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
