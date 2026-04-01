import React from 'react';
import { categories } from '@/src/data/tools';
import { ToolHero } from '@/src/components/layout/ToolHero';
import { HowItWorks } from '@/src/components/layout/HowItWorks';
import { ScrollReveal } from '@/src/components/layout/ScrollReveal';
import { FileUp, RefreshCw, Download, FileText, FileCode, FileImage, ArrowRight } from 'lucide-react';
import { GlowCard } from '@/src/components/ui/spotlight-card';
import { Link } from 'react-router-dom';

export const FileConverter: React.FC = () => {
  const currentCategory = categories.find(c => c.name === "Utility & Management");
  const currentTool = currentCategory?.tools.find(t => t.id === "file-converter");

  if (!currentTool || !currentCategory) return null;

  const steps = [
    { title: "Select Format", desc: "Choose your input and output formats.", icon: FileText },
    { title: "Upload File", desc: "Select the file you want to convert.", icon: FileUp },
    { title: "Download", desc: "Get your converted file instantly.", icon: Download }
  ];

  const subTools = [
    { name: "PDF to Word", slug: "pdf-to-word", icon: <FileText className="w-5 h-5" /> },
    { name: "Word to PDF", slug: "word-to-pdf", icon: <FileText className="w-5 h-5" /> },
    { name: "JPG to PNG", slug: "jpg-to-png", icon: <FileImage className="w-5 h-5" /> },
    { name: "PNG to JPG", slug: "png-to-jpg", icon: <FileImage className="w-5 h-5" /> },
    { name: "Excel to PDF", slug: "excel-to-pdf", icon: <FileCode className="w-5 h-5" /> },
    { name: "PDF to Excel", slug: "pdf-to-excel", icon: <FileCode className="w-5 h-5" /> }
  ];

  return (
    <div>
      <ToolHero 
        categoryName={currentCategory.name}
        categoryColor={currentCategory.color}
        toolName={currentTool.name}
        tagline={currentTool.tagline}
        description="Convert any file to any other format. 40+ conversion types. No quality loss, no file size limits, no watermarks."
        icon={currentTool.icon}
      />

      {/* Sub-Tools Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white font-display">Popular Conversions</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subTools.map((st, i) => (
              <ScrollReveal key={st.slug} delay={i * 50}>
                <Link 
                  to={`/tools/file-converter/${st.slug}`}
                  className="group p-8 bg-white/5 border border-white/10 rounded-[24px] flex items-center justify-between hover:border-white/20 transition-all backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {st.icon}
                    </div>
                    <span className="font-bold text-white">{st.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              </ScrollReveal>
            ))}
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
              <GlowCard className="p-8 bg-white/5 border border-white/10 rounded-[24px] h-full shadow-2xl backdrop-blur-sm group hover:border-white/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white/10 transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{f.title}</h3>
                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{f.desc}</p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
