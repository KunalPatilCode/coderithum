import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

interface ContactViewProps {
  contactSuccess: boolean;
  setContactSuccess: (success: boolean) => void;
}

export default function ContactView({ contactSuccess, setContactSuccess }: ContactViewProps) {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-16"
    >
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-xs font-mono tracking-widest text-blue-600 uppercase">Get In Touch</h2>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Contact Coderithum</h1>
        <p className="text-xs sm:text-sm text-slate-600">Have questions about upcoming sprints? Drop us a query or visit the campus block.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Left Panel Contact Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
            <h3 className="text-base font-bold text-slate-900 border-b-2 border-slate-200 pb-3">Club Info</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Email Address</div>
                  <a href="mailto:coderithum.tech@gmail.com" className="text-xs text-slate-600 hover:text-black transition-colors">coderithum.tech@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Office Location</div>
                  <div className="text-xs text-slate-600 leading-relaxed mt-0.5">Tech Lab 402, Computer Science Block, Main University Campus</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Technical Support</div>
                  <div className="text-xs text-slate-600 mt-0.5">+91 98765 43210</div>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Mock map */}
          <div className="w-full h-[220px] rounded-none border-2 border-slate-900 overflow-hidden relative group shadow-[6px_6px_0px_#000]">
            <div className="absolute inset-0 bg-white bg-grid-pattern opacity-80 flex items-center justify-center">
              <div className="text-center space-y-2 z-10">
                <MapPin className="w-8 h-8 text-blue-600 animate-bounce mx-auto" />
                <div className="text-xs font-mono text-slate-900">CS Block Tech Lab (Campus Map Grid)</div>
                <div className="text-[10px] text-slate-500">12.9716° N, 77.5946° E</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Panel Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
            <h3 className="text-lg font-bold text-slate-900">Send us a direct message</h3>

            {contactSuccess ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-none bg-emerald-50 border-2 border-emerald-200 text-center space-y-4"
              >
                <div className="w-10 h-10 rounded-none bg-emerald-100 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Message Dispatched!</h4>
                <p className="text-xs text-slate-600">Thank you for writing. Our Technical Board will review your query and write back shortly.</p>
                <button
                  onClick={() => setContactSuccess(false)}
                  className="px-4 py-2 bg-emerald-600 border-2 border-emerald-700 hover:bg-emerald-500 text-white rounded-none text-xs font-semibold shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-600 uppercase">First Name</label>
                    <input required type="text" placeholder="Kunal" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-600 uppercase">Email Address</label>
                    <input required type="email" placeholder="kunal@example.com" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-600 uppercase">Topic / Subject</label>
                  <input required type="text" placeholder="DevHack 2026 Participation Query" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-600 uppercase">Message Body</label>
                  <textarea required rows={4} placeholder="Hi Coderithum technical team, I wanted to inquire if students from second year..." className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 border-2 border-blue-700 hover:bg-blue-500 text-white rounded-none text-xs font-bold shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
