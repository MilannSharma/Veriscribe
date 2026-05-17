import React from 'react';
import { categories } from '@/src/data/tools';
import { ToolHero } from '@/src/components/layout/ToolHero';
import { HowItWorks } from '@/src/components/layout/HowItWorks';
import { ScrollReveal } from '@/src/components/layout/ScrollReveal';
import { Layers, RefreshCw, Users, Share2 } from 'lucide-react';
import { GlowCard } from '@/src/components/ui/spotlight-card';

export const AdaptiveDocument: React.FC = () => {
  const currentCategory = categories.find(c => c.name === "Advanced Intelligence");
  const currentTool = currentCategory?.tools.find(t => t.id === "adaptive-document");

  if (!currentTool || !currentCategory) return null;

  const steps = [
    { title: "Write Master Doc", desc: "Create your core content in the adaptive editor.", icon: Layers },
    { title: "AI Generation", desc: "AI auto-generates Expert, Executive, and Student versions.", icon: RefreshCw },
    { title: "Auto-Sync", desc: "Changes to the master document update all versions instantly.", icon: Share2 }
  ];

  return (
    <div>
      <ToolHero 
        toolId="adaptive-document"
        categoryName={currentCategory.name}
        categoryColor={currentCategory.color}
        toolName={currentTool.name}
        tagline={currentTool.tagline}
        description="Write once. AI auto-generates Expert, Executive, Student, and Beginner versions — all linked to your master document and updated automatically."
        icon={currentTool.icon}
      />

      <HowItWorks 
        steps={steps} 
        categoryColor={currentCategory.color} 
        subtitle="One document, multiple perspectives, perfectly synced."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white font-display">Intelligent Adaptation</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Multi-Audience", desc: "Reach everyone from experts to beginners.", icon: <Users className="w-5 h-5" /> },
            { title: "Master Sync", desc: "Edit once, update everywhere.", icon: <RefreshCw className="w-5 h-5" /> },
            { title: "Dynamic Layout", desc: "Formatting adapts to the audience level.", icon: <Layers className="w-5 h-5" /> }
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
