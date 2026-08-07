import React from "react";
import { motion } from "framer-motion";
import { Info, Calendar, MapPin, ChevronRight, Trophy } from "lucide-react";
import InteractivePixelArt from "../InteractivePixelArt";
import AnimatedCounter from "../AnimatedCounter";
import ClubCalendar from "../ClubCalendar";
import { ClubEvent, ClubProject, ClubAchievement } from "../../types";

interface HomeViewProps {
  events: ClubEvent[];
  projects: ClubProject[];
  achievements: ClubAchievement[];
  totalEventsCount: number;
  totalProjectsCount: number;
  totalMembersCount: number;
  totalAwardsCount: number;
  setView: (view: string) => void;
  setSelectedId: (id: string | null) => void;
}

export default function HomeView({
  events,
  projects,
  achievements,
  totalEventsCount,
  totalProjectsCount,
  totalMembersCount,
  totalAwardsCount,
  setView,
  setSelectedId
}: HomeViewProps) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-24"
    >
      {/* Hero Section - Full Bleed Ice Theme Banner (Restored to top as previous) */}
      <div className="w-screen h-[60vh] min-h-[60vh] relative left-1/2 right-1/2 -translate-x-1/2 bg-white border-b-2 border-slate-900 -mt-[120px] mb-16 overflow-hidden flex justify-center items-center cursor-none">
        {/* Background Canvas */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-90 pointer-events-none">
          <InteractivePixelArt />
        </div>
      </div>

      {/* Announcement & Activity Calendar side-by-side grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Announcement Column (left, taking 5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="p-5 rounded-none bg-blue-50 border-2 border-blue-600/30 flex flex-col justify-between gap-5 shadow-[4px_4px_0px_#000] flex-1">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-none bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-600 shrink-0">
                  <Info className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">Announcement</h3>
                  <p className="text-[10px] text-slate-500 font-mono">GEC Daman Coderithum</p>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Registrations are now open for SIH Sprints and Next.js Web Dev Bootcamp! Secure your spots.
              </p>

              {/* List of upcoming events inside the announcement box */}
              <div className="space-y-2 pt-1.5">
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1">Upcoming Schedule</div>
                {[
                  { title: "Next.js Web Dev Bootcamp", date: "Aug 28-29, 2026", id: "web-dev-bootcamp" },
                  { title: "SIH 2026 Internal Sprints", date: "Sept 18-19, 2026", id: "sih-hackathon-2026" }
                ].map(evt => (
                  <div
                    key={evt.id}
                    onClick={() => { setView("event-detail"); setSelectedId(evt.id); }}
                    className="p-2 bg-white border border-slate-200 hover:border-blue-600 transition-colors flex items-center justify-between gap-3 cursor-pointer group rounded-none"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{evt.title}</div>
                      <div className="text-[9px] text-slate-500 font-mono">{evt.date}</div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <button
                onClick={() => { setView("event-detail"); setSelectedId("sih-hackathon-2026"); }}
                className="w-full py-2 rounded-none bg-blue-600 border-2 border-blue-700 text-white font-bold text-xs shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer text-center"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Column (right, taking 7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <ClubCalendar setView={setView} setSelectedId={setSelectedId} />
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white border-2 border-slate-900 p-8 rounded-none shadow-[6px_6px_0px_#000] backdrop-blur-sm">
        {[
          { target: totalEventsCount, label: "Workshops & Hackathons" },
          { target: totalProjectsCount, label: "Active Tech Projects" },
          { target: totalMembersCount, label: "Dedicated Members" },
          { target: totalAwardsCount, label: "National Achievements" }
        ].map((stat, i) => (
          <div key={i} className="text-center p-4">
            <div className="text-4xl sm:text-5xl font-black text-slate-900">
              <AnimatedCounter target={stat.target} />+
            </div>
            <div className="text-xs sm:text-sm text-slate-600 mt-2 font-mono uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Event Spotlight */}
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Spotlight Event</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">Next Major Tech Workshop</h3>
          </div>
          <button onClick={() => setView("events")} className="text-xs text-blue-600 hover:text-black font-semibold flex items-center gap-1 cursor-pointer">
            <span>View All Events</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {events.filter(e => e.type === "upcoming").slice(0, 1).map(event => (
          <div key={event.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border-2 border-slate-900 rounded-none overflow-hidden group hover:border-slate-900 transition-all shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000]">
            <div className="lg:col-span-6 relative h-[250px] lg:h-auto overflow-hidden group/glitch">
              {/* Base Image */}
              <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent lg:hidden" />

              {/* Red Glitch Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                <img
                  src={event.banner}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover animate-glitch-1 scale-105"
                  style={{ filter: 'hue-rotate(90deg) saturate(2.5)' }}
                />
              </div>

              {/* Blue Glitch Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                <img
                  src={event.banner}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover animate-glitch-2 scale-105"
                  style={{ filter: 'hue-rotate(220deg) saturate(2.5)' }}
                />
              </div>
            </div>
            <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-none text-[10px] font-semibold bg-emerald-50 border-2 border-emerald-200 text-emerald-700 uppercase tracking-wider">Upcoming</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{event.shortDesc}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 justify-between border-t-2 border-slate-200 pt-6">
                <div className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-600" />{event.venue}</div>
                <button
                  onClick={() => { setView("event-detail"); setSelectedId(event.id); }}
                  className="px-4 py-2 bg-blue-50 border-2 border-blue-600 rounded-none text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Projects */}
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Innovation Hub</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">Featured Club Projects</h3>
          </div>
          <button onClick={() => setView("projects")} className="text-xs text-blue-600 hover:text-black font-semibold flex items-center gap-1 cursor-pointer">
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map(project => (
            <div key={project.id} className="p-6 rounded-none bg-white border-2 border-slate-900 hover:border-slate-900 transition-all flex flex-col justify-between space-y-6 shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] group">
              <div className="space-y-4">
                <div className="w-full h-[180px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
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
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{project.shortDesc}</p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-none bg-slate-50 text-[10px] text-slate-700 font-mono border-2 border-slate-200">{tech}</span>
                  ))}
                </div>
                <button
                  onClick={() => { setView("project-detail"); setSelectedId(project.id); }}
                  className="w-full py-2 bg-blue-50 border-2 border-blue-600 rounded-none text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  View Project Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Achievements Preview */}
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Hall of Fame</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">Latest Achievements</h3>
          </div>
          <button onClick={() => setView("achievements")} className="text-xs text-blue-600 hover:text-black font-semibold flex items-center gap-1 cursor-pointer">
            <span>View All Achievements</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.slice(0, 3).map(ach => (
            <div key={ach.id} className="p-6 rounded-none bg-white border-2 border-slate-900 flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-none bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600">
                  <Trophy className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{ach.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{ach.description}</p>
              </div>
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{ach.date}</div>
            </div>
          ))}
        </div>
      </div>



      {/* Sponsors Section */}
      <div className="border-t-2 border-slate-200 pt-16 text-center space-y-6">
        <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">Proudly Supported By</div>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 hover:opacity-80 transition-opacity">
          {["GitHub", "Vercel", "AWS", "Google Cloud", "Meta", "Slack"].map((brand, idx) => (
            <div key={idx} className="text-lg sm:text-xl font-bold text-slate-900 font-mono tracking-tighter">{brand}</div>
          ))}
        </div>
      </div>

      {/* Call To Action */}
      <div className="p-6 sm:p-12 rounded-none bg-white border-2 border-slate-900 text-center space-y-6 max-w-4xl mx-auto shadow-[8px_8px_0px_#000] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.04),transparent_50%)]" />
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Join the Community</h3>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Collaborate on open-source codebases, participate in coding sprints, and build projects with GEC Daman's top student engineers.
        </p>
        <button
          onClick={() => setView("contact")}
          className="px-6 py-3 rounded-none bg-blue-600 border-2 border-blue-700 text-white text-sm font-bold shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
        >
          Get In Touch
        </button>
      </div>
    </motion.div>
  );
}
