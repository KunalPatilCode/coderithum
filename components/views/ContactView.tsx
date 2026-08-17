import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import InteractiveHeading from "../InteractiveHeading";

interface ContactViewProps {
  contactSuccess: boolean;
  setContactSuccess: (success: boolean) => void;
}

export default function ContactView({ contactSuccess, setContactSuccess }: ContactViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Client-side validations
    if (!name.trim()) {
      setError("First Name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email Address is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!subject.trim()) {
      setError("Topic / Subject is required.");
      return;
    }
    if (!message.trim()) {
      setError("Message Body is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setContactSuccess(true);
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err: any) {
      setError("Failed to reach the server. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <a href="mailto:coderithum1@gmail.com" className="text-xs text-slate-600 hover:text-black transition-colors">coderithum1@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-theme mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Office Location</div>
                  <div className="text-xs text-slate-600 leading-relaxed mt-0.5">Computer Department, GEC Daman</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-theme mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Technical Support</div>
                  <div className="text-xs text-slate-600 mt-0.5">+91 8866629623</div>
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

            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-200 text-red-600 text-xs rounded-none font-medium">
                {error}
              </div>
            )}

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
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-600 uppercase">First Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Kunal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-theme transition-colors disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-600 uppercase">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="kunal@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-theme transition-colors disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-600 uppercase">Topic / Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="DevHack 2026 Participation Query"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-theme transition-colors disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-600 uppercase">Message Body</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Coderithum technical team, I wanted to inquire if students from second year..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-white border-2 border-slate-900 rounded-none p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-theme transition-colors disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-theme border-2 border-theme-hover hover:bg-theme-hover text-white rounded-none text-xs font-bold shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer disabled:bg-slate-400 disabled:border-slate-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0px_#000]"
                >
                  {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

