import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { LucideIcon, ChevronRight, ArrowRight, Star, Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface FeatureSlide {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ToolHeroProps {
  categoryName: string;
  categoryColor: string;
  toolName: string;
  tagline: string;
  description: string;
  icon: LucideIcon | string;
  features?: FeatureSlide[];
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  toolId?: string;
}

export const ToolHero: React.FC<ToolHeroProps> = ({
  categoryName,
  categoryColor,
  toolName,
  tagline,
  description,
  icon: Icon,
  features = [],
  onPrimaryAction,
  onSecondaryAction,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (features.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const id = React.useId().replace(/:/g, "");

  return (
    <section 
      id={`hero-${id}`}
      className="relative pt-[180px] pb-[120px] overflow-hidden min-h-[90vh] flex items-center justify-center bg-[#050505]"
    >
      <style>{`
        #hero-${id} {
          --tool-color: ${categoryColor};
        }
        .hero-mask-text {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
      `}</style>
      {/* 1. Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Massive Background Text with Gradient Mask */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 0.05, scale: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-[25vw] font-black uppercase tracking-tighter whitespace-nowrap select-none text-white pointer-events-none blur-[2px] hero-mask-text"
          >
            {toolName}
          </motion.h1>
        </div>

        {/* Dynamic Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 150, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-[0.15] bg-[var(--tool-color)]"
        />
        <motion.div 
          animate={{ x: [0, -150, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[180px] opacity-[0.1] bg-[var(--tool-color)]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* LEFT CONTENT: Tool Identity */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
              <span 
                className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border backdrop-blur-md bg-[color-mix(in_srgb,var(--tool-color)_15%,transparent)] text-[var(--tool-color)] border-[color-mix(in_srgb,var(--tool-color)_30%,transparent)]" 
              >
                {categoryName}
              </span>
              <div className="h-px w-12 bg-white/10" />
              <Link to="/" className="text-[10px] font-bold text-white/30 hover:text-white uppercase tracking-[0.2em] transition-colors">Veriscribe</Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-8 mb-10">
              <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center relative group shrink-0">
                <div className="absolute inset-0 blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-700 bg-[var(--tool-color)]" />
                {typeof Icon === 'string' ? (
                  <span className="text-5xl relative z-10">{Icon}</span>
                ) : (
                  <Icon className="w-12 h-12 relative z-10 text-[var(--tool-color)]" />
                )}
              </div>
              <div className="space-y-3">
                <h1 className="text-[64px] md:text-[84px] font-black text-silver-matte leading-[0.85] tracking-tighter font-display">
                  {toolName}
                </h1>
                <p className="text-xl md:text-2xl font-medium text-white/70 tracking-tight">{tagline}</p>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/40 leading-relaxed max-w-xl mb-12">
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5">
              <button 
                onClick={onPrimaryAction}
                className="w-full sm:w-auto px-12 py-6 rounded-[20px] text-white font-bold text-sm uppercase tracking-[0.25em] transition-all duration-500 hover:brightness-110 hover:scale-[1.02] shadow-2xl group flex items-center justify-center gap-4 overflow-hidden relative bg-[var(--tool-color)] shadow-[0_30px_60px_-12px_color-mix(in_srgb,var(--tool-color)_40%,transparent)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">Launch Workspace</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button 
                onClick={onSecondaryAction}
                className="w-full sm:w-auto px-10 py-6 rounded-[20px] bg-white/5 border border-white/10 text-white/60 font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white/10 hover:text-white flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                Core Features
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT: Feature Slideshow Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block perspective-1000"
          >
            <div className="relative w-full aspect-[4/3] rounded-[48px] bg-[#0A0A0B] border border-white/10 p-16 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="h-full flex flex-col justify-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-700">
                    {features[currentSlide] ? (
                      React.createElement(features[currentSlide].icon, { 
                        className: "w-10 h-10", 
                        style: { color: categoryColor } 
                      })
                    ) : (
                      <Sparkles className="w-10 h-10 text-white/20" />
                    )}
                  </div>
                  
                  <h3 className="text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
                    {features[currentSlide]?.title || "Premium Features"}
                  </h3>
                  <p className="text-xl text-white/40 leading-relaxed max-w-md line-clamp-3">
                    {features[currentSlide]?.description || "Experience state-of-the-art AI processing with Veriscribe."}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators - Premium Style */}
              <div className="absolute bottom-16 left-16 flex items-center gap-4">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="relative group py-2"
                  >
                    <div className={cn(
                      "h-1 rounded-full transition-all duration-700 ease-out",
                      i === currentSlide ? "w-12 bg-[var(--tool-color)]" : "w-4 bg-white/10 group-hover:bg-white/20"
                    )}
                    />
                  </button>
                ))}
              </div>

              {/* Holographic Overlays */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
            </div>

            {/* Decorative Premium Ornaments */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-2xl animate-float-slow z-[-1]" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-tr from-white/5 to-transparent border border-white/5 backdrop-blur-xl animate-float z-[-1]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
