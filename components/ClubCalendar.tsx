"use client";

import React, { useState, useEffect } from "react";

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
  category: "workshop" | "competition" | "special" | "orientation";
}

const calendarEvents: CalendarEventItem[] = [
  {
    id: "registration-orientation-2026",
    title: "Club Member Registration & Orientation",
    dateStr: "August 15, 2026",
    days: [15],
    month: 7, // August
    year: 2026,
    time: "10:00 AM - 01:00 PM",
    venue: "Main Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "orientation"
  },
  {
    id: "git-github-basics-2026",
    title: "Git & GitHub Basics + Team Formation",
    dateStr: "August 29, 2026",
    days: [29],
    month: 7, // August
    year: 2026,
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, Computer Dept",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "problem-solving-workshop-2026",
    title: "Problem Solving & Brainstorming Workshop",
    dateStr: "September 5, 2026",
    days: [5],
    month: 8, // September
    year: 2026,
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "internal-sih-pitching-2026",
    title: "Internal SIH Hackathon & Idea Pitching",
    dateStr: "September 19, 2026",
    days: [19],
    month: 8, // September
    year: 2026,
    time: "10:00 AM onwards",
    venue: "Main Tech Lab & Seminar Hall",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "engineering-day-tech-2026",
    title: "Engineering Day Tech Session / PPT & Pitch Guidance",
    dateStr: "September 30, 2026",
    days: [30],
    month: 8, // September
    year: 2026,
    time: "02:00 PM - 05:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "web-dev-bootcamp-2026",
    title: "Web Development Bootcamp (HTML, CSS, JS)",
    dateStr: "October 3, 2026",
    days: [3],
    month: 9, // October
    year: 2026,
    time: "10:00 AM - 04:30 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "mini-project-sprint-2026",
    title: "Mini Project Build Sprint",
    dateStr: "October 17, 2026",
    days: [17],
    month: 9, // October
    year: 2026,
    time: "10:00 AM - 05:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "group-discussion-review-2026",
    title: "Group Discussion & Code Review",
    dateStr: "October 31, 2026",
    days: [31],
    month: 9, // October
    year: 2026,
    time: "10:00 AM - 01:00 PM",
    venue: "Computer Seminar Room, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "ai-prompt-eng-workshop-2026",
    title: "AI & Prompt Engineering Workshop",
    dateStr: "November 7, 2026",
    days: [7],
    month: 10, // November
    year: 2026,
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "cybersec-hacking-challenge-2026",
    title: "Cybersecurity Basics & Hacking Challenge",
    dateStr: "November 21, 2026",
    days: [21],
    month: 10, // November
    year: 2026,
    time: "10:00 AM - 02:00 PM",
    venue: "Server Lab, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "resume-portfolio-session-2026",
    title: "Resume, LinkedIn & Portfolio Building",
    dateStr: "November 29, 2026",
    days: [29],
    month: 10, // November
    year: 2026,
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "gsoc-open-source-guide-2026",
    title: "GSoC & Open Source Contribution Guidance",
    dateStr: "December 5, 2026",
    days: [5],
    month: 11, // December
    year: 2026,
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "open-source-sprint-2026",
    title: "Open Source Sprint: GitHub PRs",
    dateStr: "December 19, 2026",
    days: [19],
    month: 11, // December
    year: 2026,
    time: "10:00 AM - 04:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "semester-showcase-review-2026",
    title: "Semester Project Showcase & Club Review",
    dateStr: "December 31, 2026",
    days: [31],
    month: 11, // December
    year: 2026,
    time: "10:00 AM - 02:00 PM",
    venue: "Main Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "ideathon-announcement-2027",
    title: "Ideathon 2027: Theme & Rules Release",
    dateStr: "January 2, 2027",
    days: [2],
    month: 0, // January
    year: 2027,
    time: "10:00 AM - 12:30 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "ideathon-conduct-2027",
    title: "Ideathon Conduct: Pitching Round",
    dateStr: "January 16, 2027",
    days: [16],
    month: 0, // January
    year: 2027,
    time: "09:30 AM onwards",
    venue: "Main Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "jury-feedback-presentation-2027",
    title: "Jury Feedback & Ideathon Winners",
    dateStr: "January 30, 2027",
    days: [30],
    month: 0, // January
    year: 2027,
    time: "10:00 AM - 01:30 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "dsa-cp-workshop-2027",
    title: "DSA & Competitive Programming Workshop",
    dateStr: "February 6, 2027",
    days: [6],
    month: 1, // February
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "coding-contest-2027",
    title: "CodeRhythm Coding Contest 2027",
    dateStr: "February 20, 2027",
    days: [20],
    month: 1, // February
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Computer Labs, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "solution-discussion-optimization-2027",
    title: "Solution Discussion & CP Optimization",
    dateStr: "February 27, 2027",
    days: [27],
    month: 1, // February
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "app-dev-workshop-2027",
    title: "App Development Workshop: Flutter",
    dateStr: "March 6, 2027",
    days: [6],
    month: 2, // March
    year: 2027,
    time: "10:00 AM - 04:30 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "build-mini-app-challenge-2027",
    title: "Build-a-Mini-App Hackathon Challenge",
    dateStr: "March 20, 2027",
    days: [20],
    month: 2, // March
    year: 2027,
    time: "10:00 AM - 05:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "uiux-review-deployment-2027",
    title: "UI/UX Review & App Deployment Guidance",
    dateStr: "March 27, 2027",
    days: [27],
    month: 2, // March
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "backend-database-integration-2027",
    title: "Backend & Database Integration",
    dateStr: "April 3, 2027",
    days: [3],
    month: 3, // April
    year: 2027,
    time: "10:00 AM - 04:30 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "fullstack-mini-hackathon-2027",
    title: "Full-Stack Mini Hackathon",
    dateStr: "April 17, 2027",
    days: [17],
    month: 3, // April
    year: 2027,
    time: "09:30 AM onwards",
    venue: "Main Tech Lab, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "industry-expert-alumni-interaction-2027",
    title: "Industry Expert & Alumni Interaction",
    dateStr: "April 29, 2027",
    days: [29],
    month: 3, // April
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Main Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "placement-web-react-session-2027",
    title: "Placement Prep: Web & React Session",
    dateStr: "May 1, 2027",
    days: [1],
    month: 4, // May
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "mock-interviews-quiz-challenge-2027",
    title: "Mock Interviews & Tech Quiz Sprint",
    dateStr: "May 15, 2027",
    days: [15],
    month: 4, // May
    year: 2027,
    time: "10:00 AM - 04:00 PM",
    venue: "Seminar Rooms, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "career-guidance-internship-prep-2027",
    title: "Career Guidance & Internship Prep",
    dateStr: "May 29, 2027",
    days: [29],
    month: 4, // May
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "advanced-github-apis-deployment-2027",
    title: "Advanced GitHub, APIs & Cloud Deployment",
    dateStr: "June 5, 2027",
    days: [5],
    month: 5, // June
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "community-contribution-sprint-2027",
    title: "Community Contribution Sprint",
    dateStr: "June 19, 2027",
    days: [19],
    month: 5, // June
    year: 2027,
    time: "10:00 AM - 05:00 PM",
    venue: "Computational Lab, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "annual-documentation-report-prep-2027",
    title: "Annual Tech Documentation & Reporting",
    dateStr: "June 30, 2027",
    days: [30],
    month: 5, // June
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Computer Seminar Room, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "sih-2027-awareness-team-formation",
    title: "SIH 2027 Awareness & Team Formation",
    dateStr: "July 3, 2027",
    days: [3],
    month: 6, // July
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "internal-sih-hackathon-prototype-2027",
    title: "Internal SIH Hackathon & Prototypes",
    dateStr: "July 17, 2027",
    days: [17],
    month: 6, // July
    year: 2027,
    time: "09:30 AM onwards",
    venue: "Main Tech Lab & Seminar Hall",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "mentor-review-presentation-improvement-2027",
    title: "Mentor Review & Pitch Presentation",
    dateStr: "July 31, 2027",
    days: [31],
    month: 6, // July
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "special"
  },
  {
    id: "annual-project-expo-techfest-2027",
    title: "Annual Project Expo & TechFest 2027",
    dateStr: "August 7, 2027",
    days: [7],
    month: 7, // August
    year: 2027,
    time: "09:00 AM - 05:00 PM",
    venue: "GEC Daman Campus Exhibition Hall",
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "core-team-evaluation-leadership-handover-2027",
    title: "Core Team Evaluation & Leadership Handover",
    dateStr: "August 21, 2027",
    days: [21],
    month: 7, // August
    year: 2027,
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    type: "upcoming",
    category: "competition"
  },
  {
    id: "certificate-distribution-celebration-2027",
    title: "Certificate Distribution & Celebration Meet",
    dateStr: "August 28, 2027",
    days: [28],
    month: 7, // August
    year: 2027,
    time: "11:00 AM - 03:00 PM",
    venue: "GEC Daman Campus Seminar Hall",
    type: "upcoming",
    category: "special"
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
    type: "past",
    category: "workshop"
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
  const [eventsList, setEventsList] = useState<CalendarEventItem[]>(calendarEvents);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("coderithum_events");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Convert string dates to CalendarEventItem structure
          const formatted: CalendarEventItem[] = parsed.map((e: any) => {
            const d = new Date(e.date);
            const validDate = !isNaN(d.getTime());
            return {
              id: e.id,
              title: e.title,
              dateStr: e.date,
              days: validDate ? [d.getDate()] : [15],
              month: validDate ? d.getMonth() : 7,
              year: validDate ? d.getFullYear() : 2026,
              time: e.time || "10:00 AM - 01:00 PM",
              venue: e.venue || "GEC Daman",
              type: e.type || "upcoming",
              category: e.category || "workshop",
            };
          });

          // Merge without duplicates
          const existingIds = new Set(formatted.map(f => f.id));
          const merged = [
            ...formatted,
            ...calendarEvents.filter(ce => !existingIds.has(ce.id))
          ];
          setEventsList(merged);
        } catch {}
      }
    }
  }, []);

  // Start on August 2026 (contains the orientation)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 1));
  const [selectedDay, setSelectedDay] = useState<number>(15); // Select 15th by default

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
  const eventsInMonth = eventsList.filter(e => e.month === currentMonth && e.year === currentYear);
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
                if (dayEvent.category === "orientation") {
                  cellClass = "bg-rose-50 text-rose-600 border-rose-400 font-bold hover:bg-rose-100";
                } else if (dayEvent.category === "workshop") {
                  cellClass = "bg-violet-50 text-violet-600 border-violet-400 font-bold hover:bg-violet-100";
                } else if (dayEvent.category === "competition") {
                  cellClass = "bg-amber-50 text-amber-600 border-amber-400 font-bold hover:bg-amber-100";
                } else if (dayEvent.category === "special") {
                  cellClass = "bg-emerald-50 text-emerald-600 border-emerald-400 font-bold hover:bg-emerald-100";
                } else {
                  cellClass = "bg-blue-50 text-blue-600 border-blue-400 font-bold hover:bg-blue-100";
                }
              }
              if (isSelected) {
                if (dayEvent) {
                  if (dayEvent.category === "orientation") {
                    cellClass = "bg-rose-600 text-white border-slate-900 font-extrabold shadow-[1.5px_1.5px_0px_#000]";
                  } else if (dayEvent.category === "workshop") {
                    cellClass = "bg-violet-600 text-white border-slate-900 font-extrabold shadow-[1.5px_1.5px_0px_#000]";
                  } else if (dayEvent.category === "competition") {
                    cellClass = "bg-amber-600 text-white border-slate-900 font-extrabold shadow-[1.5px_1.5px_0px_#000]";
                  } else if (dayEvent.category === "special") {
                    cellClass = "bg-emerald-600 text-white border-slate-900 font-extrabold shadow-[1.5px_1.5px_0px_#000]";
                  } else {
                    cellClass = "bg-blue-600 text-white border-slate-900 font-extrabold shadow-[1.5px_1.5px_0px_#000]";
                  }
                } else {
                  cellClass = "bg-slate-900 text-white border-slate-900 font-bold shadow-[1.5px_1.5px_0px_#000]";
                }
              }

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square border-2 text-[10px] sm:text-xs font-mono flex flex-col items-center justify-center relative cursor-pointer transition-all ${cellClass}`}
                >
                  <span>{day}</span>
                  {dayEvent && !isSelected && (
                    <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                      dayEvent.category === "orientation" ? "bg-rose-600" :
                      dayEvent.category === "workshop" ? "bg-violet-600" :
                      dayEvent.category === "competition" ? "bg-amber-600" :
                      dayEvent.category === "special" ? "bg-emerald-600" :
                      "bg-blue-600"
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar Color Legend */}
          <div className="pt-3 border-t-2 border-slate-200 flex flex-wrap justify-start gap-x-2.5 gap-y-1">
            <div className="flex items-center gap-1 text-[8px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Orientation
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600" /> Workshop
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Activity
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Special
            </div>
          </div>

          {/* Dynamic Contribution Graph Footer */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
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
                    selectedDayEvent.category === "orientation" ? "bg-rose-50 border-rose-200 text-rose-700" :
                    selectedDayEvent.category === "workshop" ? "bg-violet-50 border-violet-200 text-violet-700" :
                    selectedDayEvent.category === "competition" ? "bg-amber-50 border-amber-200 text-amber-700" :
                    selectedDayEvent.category === "special" ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                    "bg-blue-50 border-blue-200 text-blue-700"
                  }`}>
                    {selectedDayEvent.category || selectedDayEvent.type}
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
