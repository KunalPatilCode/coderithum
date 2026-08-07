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

export default function Home() {
  // Navigation State
  const [view, setView] = useState<string>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>("hackathons-album");

  // State Data
  const events = initialEvents;
  const projects = initialProjects;
  const albums = initialAlbums;
  const team = initialTeam;
  const achievements = initialAchievements;

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
            <AboutView team={team} />
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
  );
}
