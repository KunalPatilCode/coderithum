import React from "react";
import { motion } from "framer-motion";
import { TeamMember } from "../../types";
import InteractiveHeading from "../InteractiveHeading";
import CoderithumNetwork from "../CoderithumNetwork";

interface TeamViewProps {
  team: TeamMember[];
}

export default function TeamView({ team }: TeamViewProps) {
  return (
    <motion.div
      key="team"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-4"
    >
      {/* Horizontal Flex Dashboard Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-3 gap-3">
        <div className="space-y-0.5">
          <InteractiveHeading text="Ecosystem Core" as="h2" className="text-[10px] font-mono tracking-widest text-theme uppercase" />
          <InteractiveHeading text="Organizational Structure" as="h1" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight" />
          <p className="text-xs text-slate-500 font-medium">Explore Coderithum's leadership hierarchy and technical domain subtrees.</p>
        </div>
      </div>

      <CoderithumNetwork team={team} />
    </motion.div>
  );
}
