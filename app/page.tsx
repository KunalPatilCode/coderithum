"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalRocketCursor from "../components/GlobalRocketCursor";
import TextMarqueeAnimation from "../components/TextMarqueeAnimation";

// Views
import HomeView from "../components/views/HomeView";
import AboutView from "../components/views/AboutView";
import EventsView from "../components/views/EventsView";
import EventDetailView from "../components/views/EventDetailView";
import ProjectsView from "../components/views/ProjectsView";
import ProjectDetailView from "../components/views/ProjectDetailView";
import GalleryView from "../components/views/GalleryView";
import TeamView from "../components/views/TeamView";
import AchievementsView from "../components/views/AchievementsView";
import ContactView from "../components/views/ContactView";
import Error404View from "../components/views/Error404View";
import Error500View from "../components/views/Error500View";

// Data
import {
  initialEvents,
  initialProjects,
  initialAlbums,
  initialTeam,
  initialAchievements
} from "../data/mockData";
import LogoLoader from "../components/LogoLoader";

export default function Home() {
  // Navigation & Loading State
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [view, setView] = useState<string>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);

  // State Data using React state for dynamic reactivity
  const [events, setEvents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);

  // Load from localStorage on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEvents = localStorage.getItem("coderithum_events");
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        localStorage.setItem("coderithum_events", JSON.stringify(initialEvents));
        setEvents(initialEvents);
      }

      const storedProjects = localStorage.getItem("coderithum_projects");
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        localStorage.setItem("coderithum_projects", JSON.stringify(initialProjects));
        setProjects(initialProjects);
      }

      const storedAlbums = localStorage.getItem("coderithum_albums");
      if (storedAlbums) {
        const parsed = JSON.parse(storedAlbums);
        const updated = parsed.map((album: any) => {
          if (album.id === "hackathons-album") {
            return {
              ...album,
              name: "sih Grand finalist team 2025 Multimedia",
              cover: "/sih_2025_cover.jpg",
              coverStyle: {
                objectPosition: "center 10%",
              },
              media: [
                {
                  url: "/sih_2025_1.jpg",
                  caption: "Team CodeRhythm traveling to the Smart India Hackathon 2025 Grand Finale.",
                },
                {
                  url: "/sih_2025_2.jpg",
                  caption: "Team members displaying their official SIH 2025 Student Participant badges.",
                },
                {
                  url: "/sih_2025_3.jpg",
                  caption: "Celebrating on stage with the SIH 2025 Software Edition Finalist certificates.",
                },
                {
                  url: "/sih_2025_4.jpg",
                  caption: "CodeRhythm presenting their software prototype to the evaluation panel.",
                },
                {
                  url: "/sih_2025_5.jpg",
                  caption: "Smart India Hackathon 2025 group photo at Aryabhata Auditorium.",
                },
                {
                  url: "/sih_2025_6.jpg",
                  caption: "Team members collaborating and writing code during the 36-hour hackathon sprint.",
                },
                {
                  url: "/sih_2025_7.jpg",
                  caption: "Developing the frontend application and backend endpoints in the coding arena.",
                },
                {
                  url: "/sih_2025_8.jpg",
                  caption: "Team Multimedia posing together with their laptops in the SIH work lab.",
                },
                {
                  url: "/sih_2025_9.jpg",
                  caption: "Walkthrough of screens and features for the judges during the evaluation rounds.",
                },
                {
                  url: "/sih_2025_10.jpg",
                  caption: "Final integrations and testing of the system next to the team banner.",
                },
              ]
            };
          }
          return album;
        });
        localStorage.setItem("coderithum_albums", JSON.stringify(updated));
        setAlbums(updated);
      } else {
        localStorage.setItem("coderithum_albums", JSON.stringify(initialAlbums));
        setAlbums(initialAlbums);
      }

      const storedTeam = localStorage.getItem("coderithum_team");
      if (storedTeam) {
        const parsed = JSON.parse(storedTeam);
        const hasAaryan = parsed.some((t: any) => t.name === "Aaryan Patel");
        if (!hasAaryan) {
          const updated = [...parsed, {
            name: "Aaryan Patel",
            role: "Marketing & Outreach (Outreach Lead)",
            category: "Marketing",
            avatar: "/aaryan-patel.png",
            avatarStyle: {
              objectPosition: "center 10%",
              transform: "translateY(18px) scale(1.25)",
            },
            linkedin: "https://linkedin.com",
          }];
          localStorage.setItem("coderithum_team", JSON.stringify(updated));
          setTeam(updated);
        } else {
          const updated = parsed.map((t: any) => {
            if (t.name === "Aaryan Patel") {
              return {
                ...t,
                avatar: "/aaryan-patel.png",
                avatarStyle: {
                  objectPosition: "center 10%",
                  transform: "translateY(18px) scale(1.25)",
                }
              };
            }
            return t;
          });
          localStorage.setItem("coderithum_team", JSON.stringify(updated));
          setTeam(updated);
        }
      } else {
        localStorage.setItem("coderithum_team", JSON.stringify(initialTeam));
        setTeam(initialTeam);
      }

      const storedAchievements = localStorage.getItem("coderithum_achievements");
      if (storedAchievements) {
        setAchievements(JSON.parse(storedAchievements));
      } else {
        localStorage.setItem("coderithum_achievements", JSON.stringify(initialAchievements));
        setAchievements(initialAchievements);
      }
    }
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view, selectedId]);

  // Selected Detail Object Resolvers
  const currentEvent = events.find(e => e.id === selectedId);
  const currentProject = projects.find(p => p.id === selectedId);
  const currentAlbum = albums.find(a => a.id === activeAlbumId);

  // Statistics Calculated Dynamically
  const totalEventsCount = events.length;
  const totalProjectsCount = projects.length;
  const totalMembersCount = team.length;
  const totalAwardsCount = achievements.length;

  return (
    <>
      {showLoader && <LogoLoader onComplete={() => setShowLoader(false)} />}
      <div className="min-h-screen bg-transparent text-slate-900 font-sans antialiased selection:bg-blue-200 selection:text-blue-900">

      {/* Decorative Glow Elements */}
      <div className="absolute top-[800px] left-[10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[400px] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <Header
        view={view}
        setView={setView}
        setSelectedId={setSelectedId}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Body Content Views */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 min-h-[75vh]">
        <AnimatePresence mode="wait">

          {view === "home" && (
            <HomeView
              events={events}
              projects={projects}
              achievements={achievements}
              totalEventsCount={totalEventsCount}
              totalProjectsCount={totalProjectsCount}
              totalMembersCount={totalMembersCount}
              totalAwardsCount={totalAwardsCount}
              setView={setView}
              setSelectedId={setSelectedId}
            />
          )}

          {view === "about" && (
            <AboutView team={team} setView={setView} />
          )}

          {view === "events" && (
            <EventsView
              events={events}
              setView={setView}
              setSelectedId={setSelectedId}
            />
          )}

          {view === "event-detail" && (
            <EventDetailView
              currentEvent={currentEvent}
              setView={setView}
            />
          )}

          {view === "projects" && (
            <ProjectsView
              projects={projects}
              setView={setView}
              setSelectedId={setSelectedId}
            />
          )}

          {view === "project-detail" && (
            <ProjectDetailView
              currentProject={currentProject}
              setView={setView}
            />
          )}

          {view === "gallery" && (
            <GalleryView
              albums={albums}
              activeAlbumId={activeAlbumId}
              setActiveAlbumId={setActiveAlbumId}
              currentAlbum={currentAlbum}
            />
          )}

          {view === "team" && (
            <TeamView team={team} />
          )}

          {view === "achievements" && (
            <AchievementsView achievements={achievements} />
          )}

          {view === "contact" && (
            <ContactView
              contactSuccess={contactSuccess}
              setContactSuccess={setContactSuccess}
            />
          )}

          {view === "404-test" && (
            <Error404View setView={setView} />
          )}

          {view === "500-test" && (
            <Error500View setView={setView} />
          )}

        </AnimatePresence>
      </main>

      {/* Text Marquee Animation */}
      <TextMarqueeAnimation />

      {/* General Footer */}
      <Footer setView={setView} setSelectedId={setSelectedId} />

      {/* Custom Rocket Cursor */}
      <GlobalRocketCursor />

    </div>
    </>
  );
}
