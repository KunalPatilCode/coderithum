import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GalleryAlbum } from "../../types";
import InteractiveHeading from "../InteractiveHeading";

interface GalleryViewProps {
  albums: GalleryAlbum[];
  activeAlbumId: string | null;
  setActiveAlbumId: (id: string | null) => void;
  currentAlbum: GalleryAlbum | undefined;
}

interface StackCardProps {
  item: { url: string; caption: string };
  idx: number;
  N: number;
  scrollYProgress: any;
}

function StackCard({ item, idx, N, scrollYProgress }: StackCardProps) {
  const startEntrance = idx === 0 ? 0 : (idx - 1) / (N - 1);
  const endEntrance = idx === 0 ? 0 : idx / (N - 1);
  
  const startExit = idx / (N - 1);
  const endExit = (idx + 1) / (N - 1);

  // Card 0 starts active. Other cards enter from bottom.
  const translateY = useTransform(
    scrollYProgress,
    idx === 0 ? [0, 1] : [startEntrance, endEntrance],
    idx === 0 ? ["0px", "0px"] : ["600px", "0px"]
  );

  // Cards scale down as subsequent cards overlap them
  const scale = useTransform(
    scrollYProgress,
    idx === N - 1 ? [0, 1] : [startExit, endExit],
    idx === N - 1 ? [1, 1] : [1, 0.94]
  );

  // Cards fade slightly as subsequent cards overlap them
  const opacity = useTransform(
    scrollYProgress,
    idx === N - 1 ? [0, 1] : [startExit, endExit],
    idx === N - 1 ? [1, 1] : [1, 0.8]
  );

  const rotate = idx % 2 === 0 ? -1.5 : 1.5;

  return (
    <motion.div
      style={{ translateY, scale, opacity, rotate, zIndex: idx }}
      className="absolute w-full max-w-xl h-[420px] bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#000] flex flex-col gap-3 rounded-none select-none"
    >
      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
        <span className="text-[9px] font-mono font-bold uppercase text-theme">Image {idx + 1} of {N}</span>
        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Retro Stack</span>
      </div>
      <div className="w-full flex-grow border-2 border-slate-900 overflow-hidden relative">
        <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
      </div>
      <p className="text-[11px] text-slate-700 font-mono font-bold leading-relaxed px-0.5">{item.caption}</p>
    </motion.div>
  );
}

function StickyImageStack({ media }: { media: { url: string; caption: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const N = media.length;

  if (N <= 1) {
    const item = media[0];
    return (
      <div className="w-full max-w-xl mx-auto p-4 rounded-none bg-white border-2 border-slate-900 flex flex-col gap-3 shadow-[4px_4px_0px_#000]">
        <div className="w-full h-[320px] rounded-none border-2 border-slate-900 overflow-hidden">
          <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
        </div>
        <p className="text-xs text-slate-700 font-mono font-bold px-1">{item.caption}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full" 
      style={{ height: `${N * 90}vh` }}
    >
      <div className="sticky top-28 h-[65vh] w-full flex items-center justify-center overflow-hidden">
        {media.map((item, idx) => (
          <StackCard 
            key={idx} 
            item={item} 
            idx={idx} 
            N={N} 
            scrollYProgress={scrollYProgress} 
          />
        ))}
      </div>
    </div>
  );
}

export default function GalleryView({ albums, activeAlbumId, setActiveAlbumId, currentAlbum }: GalleryViewProps) {
  if (!activeAlbumId) {
    return (
      <motion.div
        key="gallery-folders"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="space-y-12"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <InteractiveHeading text="Visual History" as="h2" className="text-xs font-mono tracking-widest text-theme uppercase" />
          <div>
            <InteractiveHeading text="Club Gallery" as="h1" className="text-4xl font-extrabold text-slate-900 tracking-tight" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600">Sneak peek into our hack sprints, annual bootcamps, and workshop grids.</p>
        </div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {albums.map((album) => (
            <motion.div
              key={album.id}
              onClick={() => setActiveAlbumId(album.id)}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group cursor-pointer relative"
            >
              {/* Folder Tab Effect */}
              <div className="absolute top-0 left-4 h-6 w-28 bg-slate-900 rounded-t-sm border-2 border-b-0 border-slate-900 -translate-y-[22px] flex items-center justify-center font-mono text-[9px] font-bold text-white uppercase tracking-wider group-hover:bg-theme group-hover:border-theme transition-colors">
                📂 {album.media.length} items
              </div>
              
              {/* Folder Frame */}
              <div className="bg-white border-2 border-slate-900 p-4 shadow-[5px_5px_0px_#000] group-hover:shadow-[7px_7px_0px_#000] transition-all flex flex-col gap-4 min-h-[300px]">
                {/* Album Cover inside folder preview */}
                <div className="w-full h-[180px] border-2 border-slate-900 overflow-hidden relative">
                  <img
                    src={album.cover}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={album.coverStyle}
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
                </div>
                
                {/* Folder Text Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-slate-900 text-base leading-tight group-hover:text-theme transition-colors line-clamp-2">
                      {album.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">
                      Collection Folder
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                    <span>View Album</span>
                    <span className="text-theme group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="gallery-media"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-slate-900">
        <div>
          <button
            onClick={() => setActiveAlbumId(null)}
            className="mb-4 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all cursor-pointer inline-flex items-center gap-1.5 font-mono"
          >
            ← Back to Folders
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
            📁 {currentAlbum?.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-mono flex flex-wrap items-center gap-2">
            Displaying {currentAlbum?.media.length || 0} items.
            <span className="text-theme font-bold animate-pulse">↓ Scroll down to stack and review pictures</span>
          </p>
        </div>
      </div>

      {currentAlbum && currentAlbum.media.length > 0 ? (
        <StickyImageStack media={currentAlbum.media} />
      ) : (
        <div className="text-center text-slate-500 py-12 font-mono text-xs">
          This folder is currently empty.
        </div>
      )}
    </motion.div>
  );
}
