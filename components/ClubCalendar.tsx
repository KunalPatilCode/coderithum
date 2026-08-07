"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, ExternalLink } from "lucide-react";

interface CalendarEventItem {
  id: string;
  title: string;
  dateStr: string;
  days: number[];
  month: number; // 0-indexed
  year: number;
  time: string;
  venue: string;
  type: "upcoming" | "past";
}

const calendarEvents: CalendarEventItem[] = [
  {
    id: "web-dev-bootcamp",
    title: "Next.js Web Dev Bootcamp",
    dateStr: "August 28-29, 2026",
    days: [28, 29],
    month: 7, // August
    year: 2026,
    time: "10:00 AM - 04:30 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming"
  },
  {
    id: "sih-hackathon-2026",
    title: "SIH Internal Hackathon Sprints",
    dateStr: "September 18-19, 2026",
    days: [18, 19],
    month: 8, // September
    year: 2026,
    time: "10:00 AM onwards",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming"
  },
  {
    id: "docker-kubernetes-basics",
    title: "Intro to Docker & Clouds",
    dateStr: "March 15, 2026",
    days: [15],
    month: 2, // March
    year: 2026,
    time: "02:00 PM - 05:00 PM",
    venue: "Server Lab, GEC Daman",
    type: "past"
  }
];

const developerQuotes = [
  "No events today. Perfect time to fix some bugs and write clean code!",
  "Day of pure coding. Run your test suites and clean up that technical debt.",
  "Nothing scheduled. Time to work on your open-source pull requests!",
  "Code runs like wind today. Sip some coffee and optimize your rendering logic.",
  "System idle. How about reading some Next.js documentation today?",
  "Quiet day. Let's design a new database schema or write some integration tests."
];

export default function ClubCalendar({
  setView,
  setSelectedId
}: {
  setView: (view: string) => void;
  setSelectedId: (id: string | null) => void;
}) {
  // Start on August 2026 (contains the Next.js bootcamp)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 1));
  const [selectedDay, setSelectedDay] = useState<number>(28); // Select 28th by default

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(1);
  };

  // Get total days in month and starting day index
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 1 = Mon...

  // Days array representation
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < startDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    calendarCells.push(d);
  }

  // Find events for the current month and day
  const eventsInMonth = calendarEvents.filter(e => e.month === currentMonth && e.year === currentYear);
  const selectedDayEvent = eventsInMonth.find(e => e.days.includes(selectedDay));

  // Git contribution graph mock values for aesthetic
  const getContributionColor = (day: number) => {
    const val = (day * 13 + 7) % 5;
    if (val === 0) return "bg-slate-100";
    if (val === 1) return "bg-blue-100";
    if (val === 2) return "bg-blue-300";
    if (val === 3) return "bg-blue-500";
    return "bg-blue-600";
  };

  // Get a stable mock quote for non-event days
  const quoteIndex = (selectedDay * 7 + currentMonth * 3) % developerQuotes.length;
  const quote = developerQuotes[quoteIndex];

  return (
    <div className="max-w-2xl mx-auto w-full bg-white border-2 border-slate-900 p-4 sm:p-5 shadow-[4px_4px_0px_#000] relative overflow-hidden h-full flex flex-col justify-between">
      {/* Decorative dots grid header background */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-5 items-stretch flex-1">
        
        {/* Left Side: Calendar View */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase font-mono">
                {monthNames[currentMonth]} {currentYear}
              </h4>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={handlePrevMonth}
                className="p-1 border-2 border-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-[1.5px_1.5px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#000] cursor-pointer"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1 border-2 border-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-[1.5px_1.5px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#000] cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 text-center gap-1 text-[9px] font-bold font-mono text-slate-400 uppercase tracking-wider">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="py-0.5">{day}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="aspect-square bg-slate-50 border border-slate-100 opacity-20" />;
              }

              // Check if this day has an event
              const dayEvent = eventsInMonth.find(e => e.days.includes(day));
              const isSelected = selectedDay === day;
              
              let cellClass = "bg-white text-slate-800 border-slate-200 hover:bg-slate-50";
              if (dayEvent) {
                cellClass = dayEvent.type === "upcoming"
                  ? "bg-blue-50 text-blue-600 border-blue-500 font-bold hover:bg-blue-100"
                  : "bg-slate-50 text-slate-600 border-slate-400 font-bold hover:bg-slate-100";
              }
              if (isSelected) {
                cellClass = dayEvent
                  ? "bg-blue-600 text-white border-slate-900 font-extrabold shadow-[1.5px_1.5px_0px_#000]"
                  : "bg-slate-900 text-white border-slate-900 font-bold shadow-[1.5px_1.5px_0px_#000]";
              }

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square border-2 text-[10px] sm:text-xs font-mono flex flex-col items-center justify-center relative cursor-pointer transition-all ${cellClass}`}
                >
                  <span>{day}</span>
                  {dayEvent && !isSelected && (
                    <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${dayEvent.type === "upcoming" ? "bg-blue-600" : "bg-slate-500"}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Contribution Graph Footer */}
          <div className="pt-3 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
              Club pulse:
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-[8px] font-mono text-slate-400">Less</span>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className={`w-2 h-2 border border-slate-200 ${getContributionColor(i)}`} />
              ))}
              <span className="text-[8px] font-mono text-slate-400">More</span>
            </div>
          </div>

        </div>

        {/* Right Side: Event Details / Coding Quote */}
        <div className="w-full md:w-[210px] bg-slate-50 border-2 border-slate-900 p-4 flex flex-col justify-between space-y-4 shadow-[2px_2px_0px_#000]">
          
          {selectedDayEvent ? (
            <div className="space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-1.5 py-0.5 text-[8px] font-bold font-mono border uppercase tracking-wider ${
                    selectedDayEvent.type === "upcoming" 
                      ? "bg-blue-50 border-blue-200 text-blue-700" 
                      : "bg-slate-100 border-slate-300 text-slate-600"
                  }`}>
                    {selectedDayEvent.type === "upcoming" ? "Upcoming" : "Past"}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">{selectedDayEvent.dateStr}</span>
                </div>
                
                <h5 className="text-xs font-bold text-slate-900 leading-snug">{selectedDayEvent.title}</h5>
                
                <div className="space-y-1.5 pt-1 font-mono text-[10px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>{selectedDayEvent.time}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" />
                    <span>{selectedDayEvent.venue}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setView("event-detail");
                  setSelectedId(selectedDayEvent.id);
                }}
                className="w-full py-1.5 bg-blue-600 hover:bg-black text-white text-[9px] font-bold font-mono border-2 border-blue-700 flex items-center justify-center gap-1 shadow-[1.5px_1.5px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
              >
                Inspect Agenda <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  Day Detail
                </div>
                <h5 className="text-xs font-bold text-slate-900 font-mono">
                  Day {selectedDay} of {monthNames[currentMonth]}
                </h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-mono italic border-l-2 border-slate-300 pl-2.5 py-0.5">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-slate-200 pt-3 text-center">
                <span className="text-[9px] font-mono text-slate-400 leading-tight block">
                  Select highlighted days.
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
