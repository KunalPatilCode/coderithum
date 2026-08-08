import React from "react";
import { motion } from "framer-motion";
import InteractiveHeading from "../InteractiveHeading";

interface Error500ViewProps {
  setView: (view: string) => void;
}

export default function Error500View({ setView }: Error500ViewProps) {
  return (
    <motion.div
      key="500"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-20 max-w-md mx-auto space-y-6 flex flex-col items-center"
    >
      <InteractiveHeading text="500" as="h1" className="text-8xl font-black text-rose-950/40 tracking-tighter" />
      <div>
        <InteractiveHeading text="Segment Fault / Stack Leak" as="h2" className="text-xl font-bold text-slate-900" />
      </div>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
        A mock runtime stack overflow anomaly has occurred. Serverless deployment grids remain unaffected.
      </p>
      <button
        onClick={() => setView("home")}
        className="px-6 py-2.5 bg-slate-800 border-2 border-slate-700 hover:bg-slate-700 text-white rounded-none text-xs font-bold shadow-[3px_3px_0px_#050B14] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#050B14] transition-all cursor-pointer"
      >
        Re-initialize State
      </button>
    </motion.div>
  );
}
