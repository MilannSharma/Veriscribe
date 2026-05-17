import React from 'react';
import { categories } from '@/src/data/tools';
import { ToolHero } from '@/src/components/layout/ToolHero';
import { HowItWorks } from '@/src/components/layout/HowItWorks';
import { ScrollReveal } from '@/src/components/layout/ScrollReveal';
import { Activity, Search, Brain, FileText, Share2 } from 'lucide-react';
import { GlowCard } from '@/src/components/ui/spotlight-card';

export const MultiSourceIntelligence: React.FC = () => {
  const currentCategory = categories.find(c => c.name === "Advanced Intelligence");
  const currentTool = currentCategory?.tools.find(t => t.id === "multi-source-intelligence");

  if (!currentTool || !currentCategory) return null;

  const steps = [
    { title: "Upload Sources", desc: "Add PDFs, audio, video, URLs, and more.", icon: FileText },
    { title: "AI Modeling", desc: "AI builds a unified knowledge model of your data.", icon: Brain },
    { title: "Ask & Answer", desc: "Get structured answers with source citations.", icon: Search }
  ];

  return (
    <div>
      <ToolHero 
        toolId="multi-source-intelligence"
        categoryName={currentCategory.name}
        categoryColor={currentCategory.color}
        toolName={currentTool.name}
        tagline={currentTool.tagline}
        description="Upload PDFs, audio, video, URLs, and more. AI builds a unified knowledge model. Ask anything. Get structured answers with source citations."
        icon={currentTool.icon}
      />

      <HowItWorks 
        steps={steps} 
        categoryColor={currentCategory.color} 
        subtitle="Unify your knowledge, unlock your data."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white font-display">Intelligent Synthesis</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Unified Model", desc: "Connect disparate data sources instantly.", icon: <Activity className="w-5 h-5" /> },
            { title: "Source Citations", desc: "Every answer is backed by your original data.", icon: <Search className="w-5 h-5" /> },
            { title: "Cross-Format", desc: "AI understands text, audio, and video equally.", icon: <Brain className="w-5 h-5" /> }
          ].map((f, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <GlowCard className="p-8 bg-white/5 border border-white/10 rounded-[24px] h-full shadow-2xl backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-white/40 leading-relaxed">{f.desc}</p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
