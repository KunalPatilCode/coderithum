import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "../Icons";
import { TeamMember, getMemberAvatarStyle } from "../../types";
import InteractiveHeading from "../InteractiveHeading";
import TeamHierarchyGraph from "../TeamHierarchyGraph";
import { Layers, LayoutGrid } from "lucide-react";

interface TeamViewProps {
  team: TeamMember[];
}

export default function TeamView({ team }: TeamViewProps) {
  const [viewMode, setViewMode] = useState<"org" | "graph">("org");

  const domains = [
    { id: "ai", title: "AI & GenAI", icon: "🤖", key: "ai_lead", desc: "LLMs, Neural Networks, Vision AI & Prompt Engineering" },
    { id: "fullstack", title: "Full Stack Development", icon: "💻", key: "fullstack_lead", desc: "React, Next.js, Node.js & Distributed Web Backends" },
    { id: "mobile", title: "Mobile App Development", icon: "📱", key: "mobile_lead", desc: "Flutter, React Native & Native Mobile Apps" },
    { id: "cloud", title: "Cloud & DevOps", icon: "☁️", key: "cloud_lead", desc: "AWS, Kubernetes, Docker & CI/CD Pipelines" },
    { id: "cyber", title: "Cybersecurity", icon: "🔒", key: "cyber_lead", desc: "Ethical Hacking, Network Security & Pen Testing" },
    { id: "uiux", title: "UI/UX & Product Design", icon: "🎨", key: "uiux_lead", desc: "Figma Prototyping, Design Systems & User Research" },
    { id: "datascience", title: "Data Science", icon: "📊", key: "datascience_lead", desc: "Predictive Analytics, Data Pipelines & Machine Learning" }
  ];


  const renderNode = (title: string, memberKey?: string, delay: number = 0, compact: boolean = false) => {
    const member = memberKey ? team.find(t => {
      if (memberKey === "faculty") return t.category === "Faculty";
      if (memberKey === "president") return t.role.includes("President") && !t.role.includes("Vice");
      if (memberKey === "vp") return t.role.includes("Vice President");
      if (memberKey === "tech_dir" || memberKey === "tech_lead") return (t.role.includes("Technical Lead") || t.role.includes("Technical Director") || t.role.includes("Technical Team Lead")) && !t.role.includes("President");
      if (memberKey === "incubator_lead") return t.role.includes("Cybersecurity Head") || t.role.includes("Incubator & Ops");
      if (memberKey === "brand_lead") return t.role.includes("Brand Lead") || (t.role.includes("Marketing & Outreach") && !t.role.includes("Outreach Lead"));
      if (memberKey === "outreach_lead") return t.role.includes("Outreach Lead") || t.role.includes("Graphics & UI");
      if (memberKey === "research_lead") return t.role.includes("Data Science") || t.role.includes("AI & GenAI") || t.role.includes("Technical Lead");
      if (memberKey === "startup_lead") return t.role.includes("Club President") || t.role.includes("Vice President") || t.role.includes("Incubator & Ops");
      if (memberKey === "incubator_team") return t.role.includes("Incubator & Ops") || t.role.includes("Data Science") || t.role.includes("Technical Lead");
      if (memberKey === "operations_core") return t.role.includes("Marketing & Outreach") || t.role.includes("Incubator & Ops") || t.role.includes("Faculty Coordinator");
      if (memberKey === "community_growth") return t.role.includes("Marketing & Outreach") || t.role.includes("President") || t.role.includes("Vice President");

      // New Incubator & Ops boxes
      if (memberKey === "product_mgmt") return t.role.includes("Product Management");
      if (memberKey === "ipr_support") return t.role.includes("IPR");
      if (memberKey === "treasury_resource") return t.role.includes("Treasury");

      // New Community & Brand boxes
      if (memberKey === "creative_design") return t.role.includes("Creative & Design");
      if (memberKey === "pr_relations") return t.role.includes("Public Relations");
      if (memberKey === "sponsorship_relations") return t.role.includes("Sponsorship");

      // 8 Domain Keys
      if (memberKey === "ai_lead") return t.role.includes("AI & GenAI") || t.role.includes("AI Lead");
      if (memberKey === "fullstack_lead") return t.role.includes("Fullstack") || t.role.includes("Full Stack");
      if (memberKey === "mobile_lead") return t.role.includes("Mobile App");
      if (memberKey === "cloud_lead") return t.role.includes("Cloud & DevOps");
      if (memberKey === "cyber_lead") return t.role.includes("Cybersecurity");
      if (memberKey === "uiux_lead") return t.role.includes("UI/UX & Product Design") || t.role.includes("Product Design");
      if (memberKey === "datascience_lead") return t.role.includes("Data Science");
      if (memberKey === "robotics_lead") return t.role.includes("Robotics & IoT") || t.role.includes("IoT");
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
      const photoStyle = getMemberAvatarStyle(member);

      return (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          whileHover={{
            y: -3,
            scale: 1.02,
            transition: { duration: 0.15 }
          }}
          className={`w-full ${compact ? 'max-w-[190px] h-[210px] p-3' : 'max-w-[230px] h-[235px] p-4'} mx-auto bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] flex flex-col items-center justify-between text-center transition-all select-none z-10 shrink-0`}
        >
          <div className={`${compact ? 'w-14 h-14' : 'w-20 h-20'} rounded-none overflow-hidden border-2 border-slate-900 bg-slate-100 shrink-0 shadow-[2px_2px_0px_#000] flex items-center justify-center transition-transform hover:scale-105`}>
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full"
              style={photoStyle}
            />
          </div>
          <div className="my-auto w-full flex flex-col items-center text-center">
            <div className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider line-clamp-1 truncate w-full px-1">{title}</div>
            <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-black text-slate-900 mt-0.5 tracking-tight leading-snug line-clamp-1 truncate w-full px-1`}>{member.name}</h4>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium line-clamp-2 leading-tight h-[26px] flex items-center justify-center text-center w-full px-1">{member.role}</p>
          </div>
          <div className="w-full mt-auto pt-2 border-t border-slate-200 flex items-center justify-center gap-2 shrink-0 h-7">
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-1 rounded transition-colors" title="GitHub">
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 hover:bg-slate-100 p-1 rounded transition-colors" title="LinkedIn">
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
        className={`w-full ${compact ? 'max-w-[190px] h-[210px] p-3' : 'max-w-[230px] h-[235px] p-4'} mx-auto bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center text-center justify-center shrink-0`}
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
      className="space-y-16"
    >
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <InteractiveHeading text="Ecosystem Core" as="h2" className="text-xs font-mono tracking-widest text-blue-600 uppercase" />
        <div>
          <InteractiveHeading text="Organizational Structure" as="h1" className="text-4xl font-extrabold text-slate-900 tracking-tight" />
        </div>
        <p className="text-xs sm:text-sm text-slate-600">Explore Coderithum's leadership hierarchy and technical domain subtrees.</p>

        {/* View Mode Toggle Buttons */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex border-2 border-slate-900 bg-white shadow-[3px_3px_0px_#000]">
            <button
              onClick={() => setViewMode("org")}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${viewMode === "org" ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
                }`}
            >
              <LayoutGrid className="size-3.5" /> Org Chart View
            </button>
            <button
              onClick={() => setViewMode("graph")}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-l-2 border-slate-900 transition-colors cursor-pointer ${viewMode === "graph" ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"
                }`}
            >
              <Layers className="size-3.5" /> Visual Hierarchy Graph
            </button>
          </div>
        </div>
      </div>

      {viewMode === "graph" ? (
        <TeamHierarchyGraph team={team} />
      ) : (
        /* Main Organizational Tree */
        <div className="w-full max-w-6xl mx-auto p-6 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#000] space-y-8 overflow-x-auto">

          <div className="min-w-[850px] flex flex-col items-center py-4">

            {/* Level 1: Faculty Mentor */}
            {renderNode("Faculty Mentor", "faculty", 0.1)}
            {renderArrow(0.25)}

            {/* Level 2: President */}
            {renderNode("President", "president", 0.4)}
            {renderArrow(0.55)}

            {/* Level 3: Vice President */}
            {renderNode("Vice President", "vp", 0.7)}

            {/* VP to Division Connection Lines */}
            <div className="flex flex-col items-center w-full mt-2">
              <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.85, duration: 0.2 }} className="origin-top w-[3px] h-6 bg-slate-900" />
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.05, duration: 0.3 }} className="origin-center w-[70%] h-[3px] bg-slate-900" />
              <div className="flex justify-between w-[70%] h-6">
                <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
                <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
                <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.35, duration: 0.2 }} className="origin-top w-[3px] h-full bg-slate-900" />
              </div>
            </div>

            {/* Columns Grid */}
            <div className="grid grid-cols-3 gap-8 w-full mt-2">

              {/* Column 1: Technical Division */}
              <div className="flex flex-col items-center">
                {renderNode("Technical Director", "tech_dir", 1.4)}
                {renderArrow(1.55)}

                <div className="flex flex-col items-center w-full">
                  <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.8, duration: 0.2 }} className="origin-top w-[3px] h-6 bg-slate-900" />
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.0, duration: 0.25 }} className="origin-center w-full h-[3px] bg-slate-900" />
                  <div className="w-full mt-3 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {domains.map((domain, index) => (
                        <div key={domain.id} className="w-full">
                          {renderNode(domain.title, domain.key, 2.1 + index * 0.08, true)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Incubator & Ops Division */}
              <div className="flex flex-col items-center">
                {renderNode("Incubator & Ops Lead", "incubator_lead", 1.4)}
                {renderArrow(1.55)}
                <div className="flex flex-col items-center w-full">
                  <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.8, duration: 0.2 }} className="origin-top w-[3px] h-6 bg-slate-900" />
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.0, duration: 0.25 }} className="origin-center w-full h-[3px] bg-slate-900" />
                  <div className="w-full mt-3 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {renderNode("Research Leads", "research_lead", 2.1, true)}
                      {renderNode("Startup Leads", "startup_lead", 2.18, true)}
                      {renderNode("Incubator Teams / Research Fellows", "incubator_team", 2.26, true)}
                      {renderNode("Product Management Leads", "product_mgmt", 2.34, true)}
                      {renderNode("IPR & Patent Support", "ipr_support", 2.42, true)}
                      {renderNode("Treasury & Resource Leads", "treasury_resource", 2.5, true)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Community & Brand Division */}
              <div className="flex flex-col items-center">
                {renderNode("Community & Brand Lead", "brand_lead", 1.4)}
                {renderArrow(1.55)}
                <div className="flex flex-col items-center w-full">
                  <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.8, duration: 0.2 }} className="origin-top w-[3px] h-6 bg-slate-900" />
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.0, duration: 0.25 }} className="origin-center w-full h-[3px] bg-slate-900" />
                  <div className="w-full mt-3 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {renderNode("Outreach Leads (Design, Event...)", "outreach_lead", 2.1, true)}
                      {renderNode("Operations Core (Media, HR, Fin)", "operations_core", 2.18, true)}
                      {renderNode("Community & Growth Teams", "community_growth", 2.26, true)}
                      {renderNode("Creative & Design Leads", "creative_design", 2.34, true)}
                      {renderNode("Public Relations Leads", "pr_relations", 2.42, true)}
                      {renderNode("Sponsorship & Corporate Relations", "sponsorship_relations", 2.5, true)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </motion.div>
  );
}

