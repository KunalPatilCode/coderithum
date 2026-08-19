import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { ClubEvent } from "../../types";
import InteractiveHeading from "../InteractiveHeading";

interface EventDetailViewProps {
  currentEvent: ClubEvent | undefined;
  setView: (view: string) => void;
}

export default function EventDetailView({ currentEvent, setView }: EventDetailViewProps) {
  if (!currentEvent) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Event not found</h2>
        <button onClick={() => setView("events")} className="mt-4 px-4 py-2 bg-theme text-white rounded-none">
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <motion.div
      key="event-detail"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12 max-w-4xl mx-auto"
    >
      <button onClick={() => setView("events")} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-black transition-colors cursor-pointer">
        <ChevronLeft className="w-4 h-4" /> Back to Events
      </button>

      <div className="w-full h-[320px] rounded-none overflow-hidden relative border-2 border-slate-900 shadow-[6px_6px_0px_#000]">
        <img src={currentEvent.banner} alt={currentEvent.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <InteractiveHeading text={currentEvent.title} as="h1" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" />
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">{currentEvent.description}</div>
          </div>

          {/* Agenda */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Event Agenda</h3>
            <div className="space-y-3 border-l-2 border-slate-200 pl-4 ml-2">
              {currentEvent.agenda.map((agendaItem, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 rounded-none bg-theme" />
                  <p className="text-xs sm:text-sm text-slate-600 font-mono">{agendaItem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Speakers */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Event Speakers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentEvent.speakers.map((spk, idx) => (
                <div key={idx} className="p-4 rounded-none bg-white border-2 border-slate-900 flex items-center gap-3 shadow-[4px_4px_0px_#000]">
                  <img src={spk.avatar} alt={spk.name} className="w-12 h-12 rounded-none object-cover border-2 border-slate-900" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{spk.name}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{spk.role}</div>
                    <div className="text-[10px] text-theme font-mono mt-0.5">{spk.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-900 border-b-2 border-slate-200 pb-3">Logistics</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-theme shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Date</div>
                  <div className="text-xs text-slate-600 mt-0.5">{currentEvent.date}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-theme shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Time</div>
                  <div className="text-xs text-slate-600 mt-0.5">{currentEvent.time}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-theme shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Venue</div>
                  <div className="text-xs text-slate-600 mt-0.5">{currentEvent.venue}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-slate-200 space-y-3">
              {!currentEvent.hideRegistration && (
                currentEvent.type === "upcoming" ? (
                  <button
                    onClick={() => alert("Coming Soon")}
                    className="w-full py-2.5 bg-theme hover:bg-theme-hover text-white rounded-none border-2 border-theme-hover text-xs font-bold flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                  >
                    Register for Event <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="w-full py-2.5 bg-slate-50 text-slate-400 rounded-none text-xs font-bold flex items-center justify-center select-none border-2 border-slate-200">
                    Registration Closed
                  </span>
                )
              )}

              <button
                onClick={() => alert("Coming Soon")}
                className="w-full py-2.5 bg-white border-2 border-slate-900 hover:bg-slate-50 text-slate-700 rounded-none text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
              >
                Share Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
