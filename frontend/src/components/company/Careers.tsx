import React from "react";
import { CompanyPageLayout } from "./CompanyPageLayout";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock } from "lucide-react";

const JOBS = [
  {
    title: "Senior AI Research Engineer",
    department: "Engineering",
    location: "Remote / London",
    type: "Full-time"
  },
  {
    title: "Lead Product Designer",
    department: "Design",
    location: "Remote / New York",
    type: "Full-time"
  },
  {
    title: "Backend Infrastructure Architect",
    department: "Engineering",
    location: "Remote / Berlin",
    type: "Full-time"
  }
];

export const Careers = () => {
  return (
    <CompanyPageLayout 
      title="Join the Engine."
      subtitle="Help us build the next generation of document intelligence. We're looking for world-class talent to redefine the future of writing."
    >
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-12">Open Positions</h2>
        <div className="grid grid-cols-1 gap-6">
          {JOBS.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group premium-depth-card p-8 rounded-3xl border border-white/5 hover:border-violet-500/20 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-violet-500">{job.department}</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors">{job.title}</h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-violet-600 group-hover:border-violet-500 transition-all">
                  <Briefcase className="w-5 h-5 text-white/40 group-hover:text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 p-12 rounded-[3rem] bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border border-white/5 text-center space-y-8">
          <h2 className="text-3xl font-bold text-white">Don't see a role for you?</h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
            We're always looking for passionate individuals. Send us an open application and let's talk about the future.
          </p>
          <button className="px-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.05] transition-transform">
            Send Open Application
          </button>
        </div>
      </div>
    </CompanyPageLayout>
  );
};
