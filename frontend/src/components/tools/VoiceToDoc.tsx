import React from 'react';
import { categories } from '@/src/data/tools';
import { ToolHero } from '@/src/components/layout/ToolHero';
import { HowItWorks } from '@/src/components/layout/HowItWorks';
import { ScrollReveal } from '@/src/components/layout/ScrollReveal';
import { Mic, FileText, Sparkles, Wand2 } from 'lucide-react';
import { GlowCard } from '@/src/components/ui/spotlight-card';

export const VoiceToDoc: React.FC = () => {
  const currentCategory = categories.find(c => c.name === "Voice & Audio");
  const currentTool = currentCategory?.tools.find(t => t.id === "voice-to-doc");

  if (!currentTool || !currentCategory) return null;

  const steps = [
    { title: "Start Recording", desc: "Speak naturally or upload an existing audio file.", icon: Mic },
    { title: "AI Transcription", desc: "Our models convert speech to text with 99% accuracy.", icon: Sparkles },
    { title: "Smart Formatting", desc: "AI identifies the document type and applies professional styling.", icon: Wand2 }
  ];

  return (
    <div>
      <ToolHero 
        toolId="voice-to-doc"
        categoryName={currentCategory.name}
        categoryColor={currentCategory.color}
        toolName={currentTool.name}
        tagline={currentTool.tagline}
        description="Speak or paste a transcript. AI identifies the document type, fills the correct template, and builds a fully formatted professional document."
        icon={currentTool.icon}
      />

      <HowItWorks 
        steps={steps} 
        categoryColor={currentCategory.color} 
        subtitle="Transform your voice into professional documents in seconds."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white font-display">Why Voice-to-Doc?</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "10x Faster", desc: "Draft documents at the speed of thought.", icon: <Sparkles className="w-5 h-5" /> },
            { title: "Auto-Template", desc: "AI picks the right format for your content.", icon: <FileText className="w-5 h-5" /> },
            { title: "Multi-Language", desc: "Support for 50+ languages and accents.", icon: <Mic className="w-5 h-5" /> }
          ].map((f, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <GlowCard className="p-8 bg-white/5 border border-white/10 rounded-[24px] h-full shadow-2xl backdrop-blur-sm group hover:border-white/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white/10 transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">{f.title}</h3>
                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{f.desc}</p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
