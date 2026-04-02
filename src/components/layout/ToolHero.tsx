import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { LucideIcon, ChevronRight, ArrowRight, Play, Mic, Layers, Share2, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolHeroProps {
  categoryName: string;
  categoryColor: string;
  toolName: string;
  tagline: string;
  description: string;
  icon: LucideIcon | string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  isCompact?: boolean;
  toolId?: string;
}

export const ToolHero: React.FC<ToolHeroProps> = ({
  categoryName,
  categoryColor,
  toolName,
  tagline,
  description,
  icon: Icon,
  onPrimaryAction,
  onSecondaryAction,
  isCompact = false,
  toolId
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  // Special Visuals for Part 6
  const renderSpecialVisual = () => {
    if (toolId === 'voice-to-doc') {
      return (
        <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-1 h-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [8, 24, 12, 32, 8] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
              className="w-1 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
          ))}
          <span className="ml-4 text-xs font-bold uppercase tracking-widest animate-pulse" style={{ color: categoryColor }}>
            Listening...
          </span>
        </motion.div>
      );
    }
    if (toolId === 'adaptive-document') {
      return (
        <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-4">
          {['Expert', 'Executive', 'Student'].map((v, i) => (
            <div key={v} className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold border transition-all duration-300",
              i === 0 ? "bg-white border-violet-200 shadow-sm" : "bg-transparent border-transparent opacity-40"
            )}
            style={i === 0 ? { color: categoryColor, borderColor: `${categoryColor}40` } : {}}
            >
              {v}
            </div>
          ))}
        </motion.div>
      );
    }
    if (toolId === 'multi-source-intelligence') {
      return (
        <motion.div variants={itemVariants} className="mt-8 relative h-12 w-full max-w-[200px] mx-auto">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                x: [0, (i % 2 === 0 ? 40 : -40), 0],
                y: [0, (i < 2 ? 20 : -20), 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center"
            >
              <Activity className="w-4 h-4" style={{ color: categoryColor }} />
            </motion.div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  if (isCompact) {
    return (
      <section className="relative pt-[120px] pb-[60px] overflow-hidden">
        {/* Solid Category Color Background (5% opacity) */}
        <div className="absolute inset-0 z-0" style={{ backgroundColor: `${categoryColor}08` }} />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex-1 text-center md:text-left">
              <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 justify-center md:justify-start">
                <Link to="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 text-white/20" />
                <span style={{ color: categoryColor }}>{categoryName}</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-sm">
                  {typeof Icon === 'string' ? (
                    <span className="text-2xl">{Icon}</span>
                  ) : (
                    <Icon className="w-6 h-6" style={{ color: categoryColor }} />
                  )}
                </div>
                <h1 className="text-[32px] md:text-[40px] font-bold text-white leading-tight font-display">
                  {toolName}
                </h1>
              </motion.div>
              
              <motion.p variants={itemVariants} className="text-[16px] text-white/40 max-w-[600px]">
                {tagline}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={onPrimaryAction}
                className="px-8 py-3 rounded-[10px] text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                style={{ backgroundColor: categoryColor, boxShadow: `0 8px 20px ${categoryColor}30` }}
              >
                Get Started
              </button>
              <button 
                onClick={onSecondaryAction}
                className="px-8 py-3 rounded-[10px] bg-white/5 border border-white/10 text-white/60 font-bold text-sm hover:bg-white/10 transition-all"
              >
                How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-[140px] pb-[100px] overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.15]"
          style={{ backgroundColor: categoryColor }}
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-[0.15]"
          style={{ backgroundColor: categoryColor }}
        />
      </div>

      <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Category Badge */}
          <motion.div 
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 inline-flex items-center gap-2"
            style={{ backgroundColor: `${categoryColor}15`, color: categoryColor, border: `1px solid ${categoryColor}30` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryColor }} />
            {categoryName}
          </motion.div>

          {/* Tool Icon */}
          <motion.div 
            variants={itemVariants}
            className="w-20 h-20 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative group"
          >
            <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" style={{ backgroundColor: categoryColor }} />
            {typeof Icon === 'string' ? (
              <span className="text-[52px] leading-none relative z-10">{Icon}</span>
            ) : (
              <Icon className="w-10 h-10 relative z-10" style={{ color: categoryColor }} />
            )}
          </motion.div>

          {/* Tool Name */}
          <motion.h1 
            variants={itemVariants}
            className="text-[40px] md:text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-6 font-display"
          >
            {toolName}
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            variants={itemVariants}
            className="text-[18px] md:text-[22px] font-medium text-white/60 mb-4"
          >
            {tagline}
          </motion.p>

          {/* Short Description */}
          <motion.p 
            variants={itemVariants}
            className="text-[16px] md:text-[17px] text-white/40 leading-[1.7] max-w-[700px] mb-10"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button 
              onClick={onPrimaryAction}
              className="w-full sm:w-auto px-10 py-4 rounded-[12px] text-white font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:brightness-110 hover:scale-[1.02] shadow-xl"
              style={{ backgroundColor: categoryColor, boxShadow: `0 10px 30px ${categoryColor}40` }}
            >
              Get Started
            </button>
            <button 
              onClick={onSecondaryAction}
              className="w-full sm:w-auto px-10 py-4 rounded-[12px] bg-white/5 border border-white/10 text-white/60 font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:bg-white/10 hover:border-white/20"
            >
              How It Works
            </button>
          </motion.div>

          {/* Special Visuals */}
          {renderSpecialVisual()}
        </motion.div>
      </div>
    </section>
  );
};
