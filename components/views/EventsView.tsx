import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { ClubEvent } from "../../types";
import InteractiveHeading from "../InteractiveHeading";

interface EventsViewProps {
  events: ClubEvent[];
  setView: (view: string) => void;
  setSelectedId: (id: string | null) => void;
}

export default function EventsView({ events, setView, setSelectedId }: EventsViewProps) {
  const handleEventClick = (id: string) => {
    setView("event-detail");
    setSelectedId(id);
  };

  return (
    <motion.div
      key="events"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-16"
    >
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <InteractiveHeading text="Interactive Timeline" as="h2" className="text-xs font-mono tracking-widest text-theme uppercase" />
        <div>
          <InteractiveHeading text="Workshops & Hackathons" as="h1" className="text-4xl font-extrabold text-slate-900 tracking-tight" />
        </div>
        <p className="text-xs sm:text-sm text-slate-600">Join our upcoming masterclasses or inspect past workshop agendas and resources.</p>
      </div>

      {/* Upcoming Events Grid */}
      <div className="space-y-8">
        <h3 className="text-base font-mono text-slate-900 tracking-wider uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
          Upcoming Innovation Sprints
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.filter(e => e.type === "upcoming").map(event => (
            <div 
              key={event.id} 
              onClick={() => handleEventClick(event.id)}
              className="p-6 rounded-none bg-white border-2 border-slate-900 hover:border-slate-900 transition-all flex flex-col justify-between space-y-6 shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-full h-[180px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
                  {/* Base Image */}
                  <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105" />
                  
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
                <div className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-theme transition-colors">{event.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{event.shortDesc}</p>
              </div>
              <div className="flex items-center justify-between border-t-2 border-slate-200 pt-4">
                <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.venue}</div>
                <button
                  onClick={() => handleEventClick(event.id)}
                  className="px-4 py-2 bg-theme-light border-2 border-theme rounded-none text-xs font-bold text-theme hover:bg-theme hover:text-white transition-all shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                >
                  {event.hideRegistration ? "View Details" : "Details & Reg"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events Grid */}
      <div className="space-y-8">
        <h3 className="text-base font-mono text-slate-900 tracking-wider uppercase">Past Training Camps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.filter(e => e.type === "past").map(event => (
            <div 
              key={event.id} 
              onClick={() => handleEventClick(event.id)}
              className="p-6 rounded-none bg-white border-2 border-slate-900 flex flex-col justify-between space-y-6 opacity-95 hover:opacity-100 transition-all shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-full h-[180px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
                  <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105 filter grayscale group-hover/glitch:grayscale-0" />

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
                <div className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-theme transition-colors">{event.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{event.shortDesc}</p>
              </div>
              <div className="flex items-center justify-between border-t-2 border-slate-200 pt-4">
                <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.venue}</div>
                <button
                  onClick={() => handleEventClick(event.id)}
                  className="px-4 py-2 bg-theme-light border-2 border-theme rounded-none text-xs font-bold text-theme hover:bg-theme hover:text-white transition-all shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                >
                  View Agenda
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
