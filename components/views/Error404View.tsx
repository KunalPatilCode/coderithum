import React from "react";
import { motion } from "framer-motion";
import InteractiveHeading from "../InteractiveHeading";

interface Error404ViewProps {
  setView: (view: string) => void;
}

export default function Error404View({ setView }: Error404ViewProps) {
  return (
    <motion.div
      key="404"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-20 max-w-md mx-auto space-y-6 flex flex-col items-center"
    >
      <InteractiveHeading text="404" as="h1" className="text-8xl font-black text-slate-800 tracking-tighter" />
      <div>
        <InteractiveHeading text="Compilation Address Missing" as="h2" className="text-xl font-bold text-slate-900" />
      </div>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
        The path index pointer has returned null. Verify that the requested folder structure exists in the static repository.
      </p>
      <button
        onClick={() => setView("home")}
        className="px-6 py-2.5 bg-blue-600 border-2 border-blue-700 hover:bg-blue-500 text-white rounded-none text-xs font-bold shadow-[3px_3px_0px_#050B14] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#050B14] transition-all cursor-pointer"
      >
        Return to Index Grid
      </button>
    </motion.div>
  );
}
