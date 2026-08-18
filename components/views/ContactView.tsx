import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import InteractiveHeading from "../InteractiveHeading";

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
        <InteractiveHeading text="Get In Touch" as="h2" className="text-xs font-mono tracking-widest text-theme uppercase" />
        <div>
          <InteractiveHeading text="Contact Coderithum" as="h1" className="text-4xl font-extrabold text-slate-900 tracking-tight" />
        </div>
        <p className="text-xs sm:text-sm text-slate-600">Have questions about upcoming sprints? Drop us a query or visit the campus block.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Left Panel Contact Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 rounded-none bg-white border-2 border-slate-900 space-y-6 shadow-[6px_6px_0px_#000]">
            <h3 className="text-base font-bold text-slate-900 border-b-2 border-slate-200 pb-3">Club Info</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-theme mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Email Address</div>
                  <a href="mailto:coderithum.tech@gmail.com" className="text-xs text-slate-600 hover:text-black transition-colors">coderithum.tech@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-theme mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Office Location</div>
                  <div className="text-xs text-slate-600 leading-relaxed mt-0.5">Tech Lab 402, Computer Science Block, Main University Campus</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-theme mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Technical Support</div>
                  <div className="text-xs text-slate-600 mt-0.5">+91 98765 43210</div>
                </div>
              </div>
            </div>
          </div>

          {/* Government Engineering College, Daman Map */}
          <div className="w-full h-[220px] rounded-none border-2 border-slate-900 overflow-hidden shadow-[6px_6px_0px_#000]">
            <iframe
              src="https://www.google.com/maps?q=Government+Engineering+College,+Daman&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Government Engineering College, Daman"
            />
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
                    <input required type="text" placeholder="First Name" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-theme transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-600 uppercase">Email Address</label>
                    <input required type="email" placeholder="example@domain.com" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-theme transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-600 uppercase">Topic / Subject</label>
                  <input required type="text" placeholder="DevHack 2026 Participation Query" className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-theme transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-600 uppercase">Message Body</label>
                  <textarea required rows={4} placeholder="Hi Coderithum technical team, I wanted to inquire if students from second year..." className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-theme transition-colors" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-theme border-2 border-theme-hover hover:bg-theme-hover text-white rounded-none text-xs font-bold shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
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
