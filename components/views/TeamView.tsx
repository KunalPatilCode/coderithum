import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin } from "../Icons";
import { TeamMember } from "../../types";
import InteractiveHeading from "../InteractiveHeading";

interface TeamViewProps {
  team: TeamMember[];
}

export default function TeamView({ team }: TeamViewProps) {
  const [activeDomainId, setActiveDomainId] = useState<string>("ai");

  const domains = [
    { id: "ai", title: "AI & GenAI", icon: "🤖", key: "ai_lead", desc: "LLMs, Neural Networks, Vision AI & Prompt Engineering" },
    { id: "fullstack", title: "Full Stack Development", icon: "💻", key: "fullstack_lead", desc: "React, Next.js, Node.js & Distributed Web Backends" },
    { id: "mobile", title: "Mobile App Development", icon: "📱", key: "mobile_lead", desc: "Flutter, React Native & Native Mobile Apps" },
    { id: "cloud", title: "Cloud & DevOps", icon: "☁️", key: "cloud_lead", desc: "AWS, Kubernetes, Docker & CI/CD Pipelines" },
    { id: "cyber", title: "Cybersecurity", icon: "🔒", key: "cyber_lead", desc: "Ethical Hacking, Network Security & Pen Testing" },
    { id: "uiux", title: "UI/UX & Product Design", icon: "🎨", key: "uiux_lead", desc: "Figma Prototyping, Design Systems & User Research" },
    { id: "datascience", title: "Data Science", icon: "📊", key: "datascience_lead", desc: "Predictive Analytics, Data Pipelines & Machine Learning" },
    { id: "robotics", title: "Robotics & IoT", icon: "⚙️", key: "robotics_lead", desc: "Embedded Hardware, ROS, ESP32 & Sensors" }
  ];

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];

  const renderNode = (title: string, memberKey?: string, delay: number = 0, compact: boolean = false) => {
    const member = memberKey ? team.find(t => {
      if (memberKey === "faculty") return t.category === "Faculty";
      if (memberKey === "president") return t.role.includes("President") && !t.role.includes("Vice");
      if (memberKey === "vp") return t.role.includes("Vice President");
      if (memberKey === "tech_dir" || memberKey === "tech_lead") return (t.role.includes("Technical Lead") || t.role.includes("Technical Director") || t.role.includes("Technical Team Lead")) && !t.role.includes("President");
      if (memberKey === "incubator_lead") return t.role.includes("Cybersecurity Head") || t.role.includes("Incubator & Ops");
      if (memberKey === "brand_lead") return t.role.includes("Marketing & Outreach");
      if (memberKey === "outreach_lead") return t.role.includes("Graphics & UI") || t.role.includes("Outreach Lead");

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
      return (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          whileHover={{
            y: -4,
            scale: 1.02,
            transition: { duration: 0.15 }
          }}
          className={`w-full ${compact ? 'max-w-[240px] p-3.5' : 'max-w-[300px] p-5'} mx-auto bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] flex flex-col items-center text-center space-y-2.5 transition-all select-none z-10`}
        >
          <div className={`${compact ? 'w-16 h-16' : 'w-24 h-24'} rounded-full overflow-hidden border-2 border-slate-900 bg-slate-100 shrink-0 shadow flex items-center justify-center`}>
            <img
              src={member.avatar}
              alt={member.name}
              className={`w-full h-full object-cover ${member.avatarClassName || ""}`}
              style={member.avatarStyle}
            />
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-blue-600 uppercase tracking-wider line-clamp-1">{title}</div>
            <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-black text-slate-900 mt-0.5`}>{member.name}</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">{member.role}</p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors p-0.5">
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors p-0.5">
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
        className={`w-full ${compact ? 'max-w-[220px] p-3 h-20' : 'max-w-[280px] p-4 h-24'} mx-auto bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center text-center justify-center`}
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
      </div>

      {/* Main Organizational Tree */}
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
              {renderNode("Technical Lead", "tech_lead", 1.4)}
              {renderArrow(1.55)}

              <div className="bg-slate-50 border-2 border-slate-900 p-3 shadow-[4px_4px_0px_#000] text-center mb-3">
                <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">8 Domain Specializations</div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">AI, Fullstack, Mobile, Cloud, Cyber, UI/UX, Data, Robotics</div>
              </div>
            </div>

            {/* Column 2: Incubator & Ops Division */}
            <div className="flex flex-col">
              {renderNode("Incubator & Ops Lead", "incubator_lead", 1.4)}
              {renderArrow(1.55)}
              {renderNode("Functional Leads (Research, Startup)", undefined, 1.7)}
              {renderArrow(1.85)}
              {renderNode("Incubator Teams / Research Fellows", undefined, 2.0)}
            </div>

            {/* Column 3: Community & Brand Division */}
            <div className="flex flex-col">
              {renderNode("Community & Brand Lead", "brand_lead", 1.4)}
              {renderArrow(1.55)}
              {renderNode("Outreach Leads (Design, Event...)", "outreach_lead", 1.7)}
              {renderArrow(1.85)}
              {renderNode("Operations Core (Media, HR, Fin)", undefined, 2.0)}
            </div>

          </div>

        </div>
      </div>

      {/* 8 Technical Domain Subtrees Section */}
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2">
          <InteractiveHeading text="Technical Division Breakdown" as="h2" className="text-xs font-mono tracking-widest text-blue-600 uppercase" />
          <div>
            <InteractiveHeading text="8 Technical Domain Trees" as="h3" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600">Select any domain to view its dedicated leadership and developer hierarchy tree.</p>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {domains.map((dom) => {
            const isActive = dom.id === activeDomainId;
            return (
              <button
                key={dom.id}
                onClick={() => setActiveDomainId(dom.id)}
                className={`p-3 border-2 border-slate-900 text-left transition-all flex items-center gap-3 ${isActive
                    ? "bg-blue-600 text-white shadow-[4px_4px_0px_#000] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white text-slate-900 hover:bg-slate-50 shadow-[2px_2px_0px_#000]"
                  }`}
              >
                <span className="text-xl">{dom.icon}</span>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate">{dom.title}</div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>Domain Subtree</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Tree Display */}
        <div className="bg-white border-2 border-slate-900 p-6 shadow-[6px_6px_0px_#000]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center py-4 space-y-4"
            >
              <div className="text-center max-w-lg mb-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-mono font-bold rounded-full border border-blue-300 mb-2">
                  {activeDomain.icon} {activeDomain.title} Division
                </span>
                <p className="text-xs text-slate-600">{activeDomain.desc}</p>
              </div>

              {/* Subtree Level 1: Domain Lead */}
              {renderNode(`${activeDomain.title} Lead`, activeDomain.key, 0.1)}
              {renderArrow(0.25)}

              {/* Subtree Level 2: Project Managers */}
              {renderNode(`${activeDomain.title} Project Manager`, undefined, 0.4, true)}
              {renderArrow(0.55)}

              {/* Subtree Level 3 & 4 Grid: Senior & Junior Developers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                <div>
                  {renderNode("Senior Developers", undefined, 0.7, true)}
                </div>
                <div>
                  {renderNode("Junior Cohort & Contributors", undefined, 0.85, true)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </motion.div>
  );
}
