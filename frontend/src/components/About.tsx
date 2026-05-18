"use client";

import React, { useRef } from "react";
import { 
  Shield, Globe, Sparkles, Heart, Cpu, Lock, Eye, FileText, ArrowRight, Zap, Crown, Star, Linkedin
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/src/lib/utils";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  
  // Hero Scroll
  const { scrollYProgress: heroScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "center start"]
  });
  
  // Section 2 Scroll
  const { scrollYProgress: section2Scroll } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"]
  });

  // Section 3 Scroll
  const { scrollYProgress: section3Scroll } = useScroll({
    target: section3Ref,
    offset: ["start end", "end start"]
  });

  const smoothHero = useSpring(heroScroll, { stiffness: 100, damping: 30 });
  const smoothSection2 = useSpring(section2Scroll, { stiffness: 100, damping: 30 });
  const smoothSection3 = useSpring(section3Scroll, { stiffness: 100, damping: 30 });

  // 3D Transform values based on scroll
  const heroRotateX = useTransform(smoothHero, [0, 1], [0, 15]);
  const heroScale = useTransform(smoothHero, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(smoothHero, [0, 0.8], [1, 0]);

  const section2RotateX = useTransform(smoothSection2, [0, 0.5, 1], [15, 0, -15]);
  const section2Scale = useTransform(smoothSection2, [0, 0.5, 1], [0.9, 1, 0.9]);
  
  const section3RotateY = useTransform(smoothSection3, [0, 0.5, 1], [-15, 0, 15]);
  const section3Scale = useTransform(smoothSection3, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030303] text-white overflow-hidden [perspective:1000px]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(3,3,3,1)_100%)] pointer-events-none" />
      <div className="film-grain" />
      <div className="bg-grid-theme opacity-20" />

      {/* 1. Stunning 3D Hero Section */}
      <motion.section 
        style={{ 
          rotateX: heroRotateX,
          scale: heroScale,
          opacity: heroOpacity,
          transformStyle: "preserve-3d"
        }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      >
        {/* Floating 3D Elements */}
        <motion.div 
          animate={{ 
            rotateY: [0, 360],
            rotateX: [0, 360],
            y: [-10, 10, -10]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-pink-500/20 blur-xl rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ 
            rotateY: [360, 0],
            rotateZ: [0, 360],
            y: [10, -10, 10]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 blur-xl rounded-full pointer-events-none"
        />

        <div className="relative z-10 space-y-6 max-w-5xl [transform:translateZ(50px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs font-bold uppercase tracking-[0.5em] text-violet-400"
          >
            Veriscribe
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-8xl font-black font-display tracking-tighter bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
          >
            Intelligence, Redefined.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
          >
            Veriscribe is built to bridge the gap between our high-accuracy multi-model system and human creativity, providing structured intelligence and precise document tracking.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <button className="btn-modern-light flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest group mx-auto">
              Join Our Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Scroll to Explore</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </motion.section>

      {/* 2. 3D Scroll Section - Values (Original Content) */}
      <motion.section 
        ref={section2Ref}
        style={{ 
          rotateX: section2RotateX,
          scale: section2Scale,
          transformStyle: "preserve-3d"
        }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32"
      >
        <div className="max-w-7xl mx-auto w-full space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-400">Our Core Values</span>
            <h2 className="text-5xl font-bold tracking-tight">The Principles That Guide Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Intelligence First", desc: "We believe our proprietary multi-model system should empower human creativity, not replace it. Our tools are designed to be your most powerful ally." },
              { icon: Eye, title: "Radical Transparency", desc: "We are open about how our models work and how we handle your data. Trust is our most valuable asset." },
              { icon: Lock, title: "Privacy by Design", desc: "Your documents are your business. We implement enterprise-grade security at every layer of our platform." },
              { icon: Heart, title: "Human-Centric", desc: "Technology is only useful if it solves real human problems. We build for the people behind the documents." }
            ].map((item, i) => (
              <div 
                key={i}
                className="premium-depth-card p-10 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-start gap-6 group hover:bg-white/[0.07] transition-all duration-500 [transform:translateZ(30px)]"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. 3D Scroll Section - Story (Original Content) */}
      <motion.section 
        ref={section3Ref}
        style={{ 
          rotateY: section3RotateY,
          scale: section3Scale,
          transformStyle: "preserve-3d"
        }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 [transform:translateZ(40px)]">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-blue-400">Our Journey</span>
            <h2 className="text-5xl font-bold tracking-tight leading-tight">The Veriscribe Story</h2>
            <div className="space-y-4 text-white/60 text-lg font-light leading-relaxed">
              <p>Founded in 2023, Veriscribe began with a simple observation: as complex content became more prevalent, the tools to understand and refine it were lagging behind.</p>
              <p>We saw students struggling with detection false positives, writers losing their unique voice to generic outputs, and businesses overwhelmed by the sheer volume of multi-source data.</p>
              <p>Our team came together to build a platform that doesn't just detect or generate text—it understands the nuance of human communication using our high-accuracy multi-model system.</p>
            </div>
            
            <div className="pt-6 flex flex-col gap-4">
              <div>
                <div className="text-white font-bold text-xl">Milan Sharma</div>
                <div className="text-white/40 text-sm">Founder, Nexa Technologies</div>
              </div>
              <a href="https://in.linkedin.com/in/milansharma01" target="_blank" rel="noopener noreferrer" className="btn-modern-light flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider w-fit">
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
          
          <div className="relative [transform:translateZ(20px)]">
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/5 p-4 bg-white/5">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Veriscribe Team" 
                className="w-full h-full object-cover rounded-[2rem] opacity-70 group-hover:scale-105 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white text-lg font-medium italic">"Building the future of human-intelligent collaboration."</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Final CTA Section (PRESERVED AS REQUESTED) */}
      <div className="relative max-w-7xl mx-auto px-6 space-y-64 pb-32">
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-24"
        >
          <div className="cta-card-inner premium-depth-card p-4 md:p-8 rounded-[4rem] text-center space-y-2 overflow-hidden relative border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="text-6xl md:text-8xl font-black tracking-tighter text-white font-display flex justify-center mb-4">
                {"Veriscribe".split("").map((letter, i) => (
                  <span key={i} className="logo-letter inline-block">{letter}</span>
                ))}
              </span>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-white/20 pb-4">
                The High-Accuracy Multi-Model Doc Editor / Converter / Detector / and more
              </p>
              <div className="absolute -top-16 left-0 right-0 pointer-events-none select-none overflow-hidden h-48 flex items-center justify-center">
                <h1 className="text-7xl md:text-[10rem] lg:text-[14rem] font-black uppercase tracking-[0.1em] text-silver-matte opacity-10 whitespace-nowrap">
                  Veriscribe
                </h1>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-silver-matte leading-tight max-w-4xl mx-auto relative z-20">
                Transform your workflow today.
              </h2>
              <p className="text-white/40 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                Join thousands of users who have revolutionized their document processing with Veriscribe's state-of-the-art AI models.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-10 relative z-10">
              <div className="flex items-center gap-6 w-full max-w-sm">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] whitespace-nowrap">Download Now</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <a href="#" className="btn-modern-light flex items-center gap-4 px-10 py-5 rounded-[1.5rem] group hover:scale-105 transition-all">
                  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 384 512">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[11px] font-bold tracking-[0.2em] text-neutral-500 uppercase mb-[-2px]">Download on the</div>
                    <div className="text-2xl font-bold leading-none tracking-tight">App Store</div>
                  </div>
                </a>
                <a href="#" className="btn-modern-dark flex items-center gap-4 px-10 py-5 rounded-[1.5rem] group hover:scale-105 transition-all">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-[-2px]">Get it on</div>
                    <div className="text-2xl font-bold leading-none tracking-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
