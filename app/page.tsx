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
import RuleBookView from "../components/views/RuleBookView";
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
  initialAchievements,
  initialHeroConfig
} from "../data/mockData";
import LogoLoader from "../components/LogoLoader";

const getThemeShades = (hex: string) => {
  let hover = "#1d4ed8";
  let light = "#eff6ff";
  
  if (hex === "#2563eb") { // Blue
    hover = "#1d4ed8";
    light = "#eff6ff";
  } else if (hex === "#059669") { // Emerald
    hover = "#047857";
    light = "#ecfdf5";
  } else if (hex === "#7c3aed") { // Violet
    hover = "#6d28d9";
    light = "#f5f3ff";
  } else if (hex === "#d97706") { // Amber
    hover = "#b45309";
    light = "#fffbeb";
  } else if (hex === "#e11d48") { // Rose
    hover = "#be123c";
    light = "#fff1f2";
  } else {
    // Custom hex fallback
    hover = hex;
    light = `${hex}10`;
  }
  return { hover, light };
};

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
  const [heroConfig, setHeroConfig] = useState<any>(initialHeroConfig);

  // Update theme colors dynamically on the document root when heroConfig changes
  useEffect(() => {
    if (typeof window !== "undefined" && heroConfig?.accentColor) {
      const hex = heroConfig.accentColor;
      const { hover, light } = getThemeShades(hex);
      document.documentElement.style.setProperty('--theme-color', hex);
      document.documentElement.style.setProperty('--theme-color-hover', hover);
      document.documentElement.style.setProperty('--theme-color-light', light);
    }
  }, [heroConfig]);

  // Load from localStorage on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHero = localStorage.getItem("coderithum_hero_config");
      if (storedHero) {
        setHeroConfig(JSON.parse(storedHero));
      } else {
        localStorage.setItem("coderithum_hero_config", JSON.stringify(initialHeroConfig));
        setHeroConfig(initialHeroConfig);
      }

      const storedEvents = localStorage.getItem("coderithum_events");
      if (storedEvents) {
        try {
          const parsed = JSON.parse(storedEvents);
          const orientationEvt = parsed.find((e: any) => e.id === "registration-orientation-2026");
          if (!orientationEvt || !orientationEvt.hideRegistration || orientationEvt.date !== "August 29, 2026" || !orientationEvt.description?.includes("Key Highlights")) {
            localStorage.setItem("coderithum_events", JSON.stringify(initialEvents));
            setEvents(initialEvents);
          } else {
            setEvents(parsed);
          }
        } catch {
          localStorage.setItem("coderithum_events", JSON.stringify(initialEvents));
          setEvents(initialEvents);
        }
      } else {
        localStorage.setItem("coderithum_events", JSON.stringify(initialEvents));
        setEvents(initialEvents);
      }

      const storedProjects = localStorage.getItem("coderithum_projects");
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects);
        const hasZebra = parsed.some((p: any) => p.id.includes("zebra"));
        const hasZebraThumbV2 = parsed.some((p: any) => p.banner && p.banner.includes("zebra-thumbnail-v2"));
        if (!hasZebra || !hasZebraThumbV2) {
          localStorage.setItem("coderithum_projects", JSON.stringify(initialProjects));
          setProjects(initialProjects);
        } else {
          setProjects(parsed);
        }
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
                objectPosition: "center 15%",
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
        const hasShruty = parsed.some((t: any) => t.name.includes("Shruty"));
        const hasAvinash = parsed.some((t: any) => t.name.includes("Avinash"));
        if (!hasShruty || !hasAvinash) {
          localStorage.setItem("coderithum_team", JSON.stringify(initialTeam));
          setTeam(initialTeam);
        } else {
          const sanitized = parsed.map((t: any) => {
            let role = t.role || "";
            let category = t.category || "";
            if (role.includes("Marketing") || role.includes("Digital Media and Outreach")) {
              role = role
                .replace("Marketing & Outreach", "Digital Media & Outreach Team")
                .replace("Digital Media and Outreach", "Digital Media & Outreach Team");
            }
            if (role.includes("Incubator") || role.includes("Operational Lead")) {
              role = role
                .replace("Incubator & Ops Lead", "Operations Lead")
                .replace("Incubator & Operations Lead", "Operations Lead")
                .replace("Incubator Operations Lead", "Operations Lead")
                .replace("Operational Lead", "Operations Lead");
            }
            if (role.includes("Chief")) {
              role = role
                .replace("Chief Technical Lead", "Technical Lead")
                .replace("Chief Technology Lead", "Technical Lead")
                .replace("Chief Tech Lead", "Tech Lead");
            }
            if (role.includes("Patron")) {
              role = role
                .replace("Principal & Chief Patron", "Principal")
                .replace("Principal and Chief Patron", "Principal");
            }
            if (category === "Marketing") {
              category = "Digital Media & Outreach Team";
            }
            return { ...t, role, category };
          });
          localStorage.setItem("coderithum_team", JSON.stringify(sanitized));
          setTeam(sanitized);
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

    const syncAllPublicData = () => {
      if (typeof window === "undefined") return;
      try {
        const storedHero = localStorage.getItem("coderithum_hero_config");
        if (storedHero) setHeroConfig(JSON.parse(storedHero));

        const storedEvents = localStorage.getItem("coderithum_events");
        if (storedEvents) setEvents(JSON.parse(storedEvents));

        const storedProjects = localStorage.getItem("coderithum_projects");
        if (storedProjects) setProjects(JSON.parse(storedProjects));

        const storedAlbums = localStorage.getItem("coderithum_albums");
        if (storedAlbums) setAlbums(JSON.parse(storedAlbums));

        const storedTeam = localStorage.getItem("coderithum_team");
        if (storedTeam) setTeam(JSON.parse(storedTeam));

        const storedAchievements = localStorage.getItem("coderithum_achievements");
        if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
      } catch (err) {
        console.error("Error synchronizing public data:", err);
      }
    };

    window.addEventListener("storage", syncAllPublicData);
    window.addEventListener("coderithum_data_sync", syncAllPublicData);
    window.addEventListener("team_updated", syncAllPublicData);
    window.addEventListener("events_updated", syncAllPublicData);
    window.addEventListener("projects_updated", syncAllPublicData);
    window.addEventListener("albums_updated", syncAllPublicData);

    return () => {
      window.removeEventListener("storage", syncAllPublicData);
      window.removeEventListener("coderithum_data_sync", syncAllPublicData);
      window.removeEventListener("team_updated", syncAllPublicData);
      window.removeEventListener("events_updated", syncAllPublicData);
      window.removeEventListener("projects_updated", syncAllPublicData);
      window.removeEventListener("albums_updated", syncAllPublicData);
    };
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
                heroConfig={heroConfig}
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

            {view === "rulebook" && (
              <RuleBookView />
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
