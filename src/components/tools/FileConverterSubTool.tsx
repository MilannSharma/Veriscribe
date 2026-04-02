import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '@/src/data/tools';
import { ToolHero } from '@/src/components/layout/ToolHero';
import { HowItWorks } from '@/src/components/layout/HowItWorks';
import { ScrollReveal } from '@/src/components/layout/ScrollReveal';
import { FileUp, RefreshCw, Download, FileText, FileCode, FileImage } from 'lucide-react';
import { GlowCard } from '@/src/components/ui/spotlight-card';

export const FileConverterSubTool: React.FC = () => {
  const { subSlug } = useParams();
  const currentCategory = categories.find(c => c.name === "Utility & Management");
  const currentTool = currentCategory?.tools.find(t => t.id === "file-converter");

  if (!currentTool || !currentCategory) return null;

  // Format subSlug for display (e.g., pdf-to-word -> PDF to Word)
  const formatSlug = (slug: string) => {
    return slug.split('-').map(word => word.toUpperCase()).join(' ');
  };

  const toolName = subSlug ? formatSlug(subSlug) : currentTool.name;

  const steps = [
    { title: "Upload File", desc: "Select the file you want to convert.", icon: FileUp },
    { title: "AI Conversion", desc: "Our engine processes your file with zero quality loss.", icon: RefreshCw },
    { title: "Download", desc: "Get your converted file instantly.", icon: Download }
  ];

  return (
    <div>
      <ToolHero 
        isCompact
        categoryName={currentCategory.name}
        categoryColor={currentCategory.color}
        toolName={toolName}
        tagline={`Fast, secure, and high-quality ${toolName} conversion.`}
        description="Convert any file to any other format. 40+ conversion types. No quality loss, no file size limits, no watermarks."
        icon={currentTool.icon}
      />

      {/* Conversion Workspace (Simplified) */}
      <section className="py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-white/5 p-12 rounded-[32px] border border-white/10 shadow-2xl text-center backdrop-blur-sm">
            <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 group hover:scale-110 transition-transform duration-500">
              <FileUp className="w-12 h-12 text-white/40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-display">Select your file</h3>
            <p className="text-white/40 mb-10 text-lg">Drag and drop your file here or click to browse.</p>
            <button 
              className="px-12 py-5 rounded-2xl text-white font-bold text-lg hover:brightness-110 transition-all shadow-2xl uppercase tracking-widest"
              style={{ backgroundColor: currentCategory.color }}
            >
              Choose File
            </button>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
              Supported formats: PDF, DOCX, TXT, JPG, PNG, and more.
            </p>
          </div>
        </div>
      </section>

      <HowItWorks 
        steps={steps} 
        categoryColor={currentCategory.color} 
        subtitle="Professional file conversion in seconds."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white font-display">Why Veriscribe Converter?</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Zero Quality Loss", desc: "Perfect formatting and resolution every time.", icon: <FileText className="w-5 h-5" /> },
            { title: "Privacy Guaranteed", desc: "Files are deleted automatically after 1 hour.", icon: <FileCode className="w-5 h-5" /> },
            { title: "Batch Processing", desc: "Convert multiple files at once with high speed.", icon: <FileImage className="w-5 h-5" /> }
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
