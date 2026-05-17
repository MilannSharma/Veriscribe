import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface CompanyPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const CompanyPageLayout: React.FC<CompanyPageLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="relative min-h-screen bg-[#050505] pt-32 pb-48 overflow-hidden">
      {/* Cinematic Backgrounds */}
      <div className="film-grain" />
      <div className="bg-grid-theme absolute inset-0 opacity-20" />
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-b from-violet-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <header className="text-center space-y-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-500 mb-6 block">Company / Resources</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-silver-matte mb-8">{title}</h1>
            <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" 
          />
        </header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="prose prose-invert prose-violet max-w-none 
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-lg
            prose-li:text-white/60 prose-strong:text-white prose-strong:font-bold
            space-y-16"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
