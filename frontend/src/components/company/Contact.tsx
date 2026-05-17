import React, { useState } from "react";
import { motion } from "framer-motion";
import { CompanyPageLayout } from "./CompanyPageLayout";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <CompanyPageLayout 
      title="Connect with us."
      subtitle="Have questions? Our team is here to help you navigate the Veriscribe ecosystem."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">Get in touch</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Whether you're looking for enterprise solutions, technical support, or just want to say hello, we're all ears.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-violet-500/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-violet-600/10 flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Email us</p>
                <p className="text-xl font-bold text-white">hello@veriscribe.ai</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-indigo-500/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Support</p>
                <p className="text-xl font-bold text-white">support@veriscribe.ai</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-fuchsia-500/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-600/10 flex items-center justify-center border border-fuchsia-500/20 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-fuchsia-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Office</p>
                <p className="text-xl font-bold text-white">Digital Nomad, World</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="premium-depth-card p-10 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-violet-600/20 flex items-center justify-center border border-violet-500/20 mx-auto">
                <Send className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-3xl font-bold text-white">Message Sent.</h3>
              <p className="text-white/40 max-w-[240px] mx-auto text-sm leading-relaxed">
                Our team will review your inquiry and get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-[10px] font-black uppercase tracking-widest text-violet-400 hover:text-white transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-violet-500/50 transition-all resize-none"
                />
              </div>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </CompanyPageLayout>
  );
};
