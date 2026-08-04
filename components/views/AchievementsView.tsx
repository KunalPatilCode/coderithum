import React from "react";
import { motion } from "framer-motion";
import { Trophy, User, Award } from "lucide-react";
import { ClubAchievement } from "../../types";

interface AchievementsViewProps {
  achievements: ClubAchievement[];
}

export default function AchievementsView({ achievements }: AchievementsViewProps) {
  return (
    <motion.div
      key="achievements"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12"
    >
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Achievements</h2>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Hall of Achievements</h1>
        <p className="text-xs sm:text-sm text-slate-600">Discover awards, SIH trophies, robotics shields, and publications bagged by the club.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map(ach => (
          <div key={ach.id} className="p-6 rounded-none bg-white border-2 border-slate-900 flex items-start gap-4 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all">
            <div className="w-10 h-10 rounded-none bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 justify-between">
                <h4 className="text-base font-bold text-slate-900">{ach.title}</h4>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">{ach.date}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{ach.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-blue-600" />{ach.recipient}</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-blue-600" />{ach.award}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
