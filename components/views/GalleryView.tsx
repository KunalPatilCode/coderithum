import React from "react";
import { motion } from "framer-motion";
import { GalleryAlbum } from "../../types";
import InteractiveHeading from "../InteractiveHeading";

interface GalleryViewProps {
  albums: GalleryAlbum[];
  activeAlbumId: string | null;
  setActiveAlbumId: (id: string | null) => void;
  currentAlbum: GalleryAlbum | undefined;
}

export default function GalleryView({ albums, activeAlbumId, setActiveAlbumId, currentAlbum }: GalleryViewProps) {
  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-12"
    >
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <InteractiveHeading text="Visual History" as="h2" className="text-xs font-mono tracking-widest text-blue-600 uppercase" />
        <div>
          <InteractiveHeading text="Club Gallery" as="h1" className="text-4xl font-extrabold text-slate-900 tracking-tight" />
        </div>
        <p className="text-xs sm:text-sm text-slate-600">Sneak peek into our hack sprints, annual bootcamps, and workshop grids.</p>
      </div>

      {/* Album Selectors */}
      <div className="flex justify-center flex-wrap gap-3">
        {albums.map(album => (
          <button
            key={album.id}
            onClick={() => setActiveAlbumId(album.id)}
            className={`px-4 py-2 rounded-none text-xs font-bold border-2 transition-all cursor-pointer shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] ${activeAlbumId === album.id
                ? "bg-blue-50 border-blue-600 text-blue-600"
                : "bg-white border-slate-900 text-slate-700 hover:text-black"
              }`}
          >
            {album.name}
          </button>
        ))}
      </div>

      {/* Active Album Media Grid */}
      {currentAlbum ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {currentAlbum.media.map((item, idx) => (
            <div key={idx} className="p-4 rounded-none bg-white border-2 border-slate-900 flex flex-col gap-4 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all group">
              <div className="w-full h-[220px] rounded-none border-2 border-slate-900 overflow-hidden relative group/glitch">
                {/* Base Image */}
                <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover/glitch:scale-105" />

                {/* Red Glitch Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                  <img
                    src={item.url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover animate-glitch-1 scale-105"
                    style={{ filter: 'hue-rotate(90deg) saturate(2.5)' }}
                  />
                </div>

                {/* Blue Glitch Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover/glitch:opacity-85 pointer-events-none transition-opacity duration-150 mix-blend-screen">
                  <img
                    src={item.url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover animate-glitch-2 scale-105"
                    style={{ filter: 'hue-rotate(220deg) saturate(2.5)' }}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed px-1 font-mono">{item.caption}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500 py-12">No media albums found.</div>
      )}
    </motion.div>
  );
}
