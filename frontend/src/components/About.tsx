"use client";

import React, { useEffect, useRef } from "react";
import { 
  Shield, Globe, Sparkles, Heart, Cpu, Lock, Eye, FileText, ArrowRight
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/src/lib/utils";
import { CinematicHero } from "@/src/components/ui/cinematic-landing-hero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { label: "Documents Processed", value: "50M+", icon: FileText, color: "text-blue-400" },
  { label: "Global Users", value: "2M+", icon: Globe, color: "text-emerald-400" },
  { label: "AI Models", value: "12+", icon: Cpu, color: "text-violet-400" },
  { label: "Security Score", value: "99.9%", icon: Shield, color: "text-fuchsia-400" },
];

const VALUES = [
  { 
    title: "Intelligence First", 
    description: "We believe AI should empower human creativity, not replace it. Our tools are designed to be your most powerful ally.",
    icon: Sparkles,
    color: "violet"
  },
  { 
    title: "Radical Transparency", 
    description: "We are open about how our models work and how we handle your data. Trust is our most valuable asset.",
    icon: Eye,
    color: "emerald"
  },
  { 
    title: "Privacy by Design", 
    description: "Your documents are your business. We implement enterprise-grade security at every layer of our platform.",
    icon: Lock,
    color: "blue"
  },
  { 
    title: "Human-Centric", 
    description: "Technology is only useful if it solves real human problems. We build for the people behind the documents.",
    icon: Heart,
    color: "fuchsia"
  },
];

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smooth Section Parallax & Scale
      const sections = gsap.utils.toArray(".about-section");
      sections.forEach((section: any) => {
        gsap.fromTo(section, 
          { y: 100, opacity: 0, scale: 0.95, filter: "blur(10px)" },
          { 
            y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // 2. Stats Cards: 3D Tilt & Staggered Reveal
      const statCards = gsap.utils.toArray(".stat-card");
      statCards.forEach((card: any, i: number) => {
        const valElement = card.querySelector(".stat-value");
        const finalValue = STATS[i].value;
        const numericPart = parseInt(finalValue);
        const suffix = finalValue.replace(/[0-9.]/g, "");
        
        const counter = { val: 0 };

        gsap.fromTo(card, 
          { y: 60, opacity: 0, rotationX: -20, transformPerspective: 1000 },
          { 
            y: 0, opacity: 1, rotationX: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              onEnter: () => {
                gsap.to(counter, {
                  val: numericPart,
                  duration: 2.5,
                  ease: "expo.out",
                  onUpdate: () => {
                    if (valElement) valElement.textContent = Math.round(counter.val) + suffix;
                  }
                });
              }
            }
          }
        );

        // Desktop Mouse Tilt
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotationY: x * 15,
            rotationX: -y * 15,
            scale: 1.05,
            duration: 0.6,
            ease: "power2.out"
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.3)" });
        });
      });

      // 3. Story Section: Parallax Image & Text Stagger
      gsap.fromTo(".story-image", 
        { scale: 1.2, y: 50 },
        { 
          scale: 1, y: -50,
          scrollTrigger: {
            trigger: ".story-image",
            scrub: true,
            start: "top bottom",
            end: "bottom top"
          }
        }
      );

      gsap.from(".story-content > *", {
        x: -50,
        opacity: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".story-content",
          start: "top 80%"
        }
      });

      // 4. Value Cards: Advanced Stagger
      const valueCards = gsap.utils.toArray(".value-card");
      valueCards.forEach((card: any, i: number) => {
        gsap.fromTo(card, 
          { x: i % 2 === 0 ? -100 : 100, opacity: 0, rotationZ: i % 2 === 0 ? -5 : 5 },
          { 
            x: 0, opacity: 1, rotationZ: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        );
      });

      // 5. Final CTA Card: Reveal & Glow
      gsap.fromTo(".cta-card-inner", 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, opacity: 1,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".cta-card-inner",
            start: "top 90%"
          }
        }
      );


 
       // 4. Story Image Parallax
       gsap.to(".story-image", {
         y: -50,
         ease: "none",
         scrollTrigger: {
           trigger: ".story-image-wrapper",
           start: "top bottom",
           end: "bottom top",
           scrub: true
         }
       });
 
       // 5. Logo Letters Continuous Animation
       const logoTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
       logoTl.to(".logo-letter", {
         y: -20,
         scale: 1.1,
         filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
         duration: 0.8,
         stagger: {
           each: 0.1,
           repeat: 1,
           yoyo: true
         },
         ease: "power2.inOut"
       });
 
     }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Cinematic Backgrounds */}
      <div className="film-grain" />
      <div className="bg-grid-theme" />

      {/* 1. Cinematic Hero Section */}
      <CinematicHero 
        brandName="Veriscribe"
        tagline1="Refining The Future"
        tagline2=""
        cardHeading="Intelligence, redefined."
        cardDescription={<><span className="text-white font-semibold">Veriscribe</span> is built to bridge the gap between AI and human creativity, providing structured intelligence and precise document tracking.</>}
        metricValue={50}
        metricLabel="Million Docs"
        showCTA={false}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 space-y-64">
        
        {/* 2. Stats Grid */}
        <section className="about-section stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card premium-depth-card p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 group transition-all duration-500 hover:scale-[1.02]">
              <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500", stat.color)}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="stat-value text-5xl font-bold tracking-tight text-silver-matte">0</div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">{stat.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* 3. Story Section */}
        <section className="about-section grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="story-content space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-silver-matte leading-tight">The Veriscribe Story</h2>
            <div className="space-y-6 text-white/60 text-xl leading-relaxed font-light">
              <p>Founded in 2023, Veriscribe began with a simple observation: as AI content became more prevalent, the tools to understand and refine it were lagging behind.</p>
              <p>We saw students struggling with AI detection false positives, writers losing their unique voice to generic LLM outputs, and businesses overwhelmed by the sheer volume of multi-source data.</p>
              <p>Our team of AI researchers and product designers came together to build a platform that doesn't just detect or generate text—it understands the nuance of human communication.</p>
            </div>
            <button className="btn-modern-light flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest group">
              Join Our Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="relative">
            <div className="story-image-wrapper aspect-square rounded-[4rem] premium-depth-card overflow-hidden group border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Veriscribe Team" 
                className="story-image w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <p className="text-white font-medium text-xl italic leading-relaxed">"We're not just building tools; we're building the future of how humans and AI collaborate on the written word."</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-white/20" />
                  <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Alex Rivers, Founder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Values Section */}
        <section className="about-section space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-silver-matte">Our Core Values</h2>
            <p className="text-white/40 max-w-3xl mx-auto text-xl font-light leading-relaxed">The principles that guide every feature we build and every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, i) => (
              <div key={i} className="value-card premium-depth-card p-10 rounded-[3rem] space-y-8 group hover:translate-y-[-10px] transition-all duration-500 border border-white/5">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500",
                  value.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                  value.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                  value.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-fuchsia-500/10 text-fuchsia-400'
                )}>
                  <value.icon className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight text-white">{value.title}</h3>
                  <p className="text-[16px] text-white/40 leading-relaxed font-light">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Final CTA Section */}
        <section className="about-section pt-24 pb-24">
          <div className="cta-card-inner premium-depth-card p-4 md:p-8 rounded-[4rem] text-center space-y-2 overflow-hidden relative border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="text-6xl md:text-8xl font-black tracking-tighter text-white font-display flex justify-center mb-4">
                {"Veriscribe".split("").map((letter, i) => (
                  <span key={i} className="logo-letter inline-block">{letter}</span>
                ))}
              </span>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-white/20 pb-4">
                The AI Powered Doc Editor / Converter / Detector / and more
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
      </section>

      </div>
    </div>
  );
};
