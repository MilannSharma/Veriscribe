import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Merge, Scissors, Trash2, Copy, Grid, Scan, 
  Zap, Wrench, Languages, Image, FileOutput, FileInput, 
  RotateCw, Crop, Hash, Stamp, FormInput, Lock, Unlock, 
  PenTool, EyeOff, GitCompare, Brain, MessageSquare, 
  Workflow, ArrowRight, Sparkles, Star
} from 'lucide-react';
import { ToolHero } from '../../layout/ToolHero';
import { GlowCard } from '../../ui/spotlight-card';
import { Link } from 'react-router-dom';

const toolCategories = [
  {
    category: "ORGANIZE PDF",
    icon: Grid,
    tools: [
      { name: "Merge PDF", icon: Merge },
      { name: "Split PDF", icon: Scissors },
      { name: "Split PDF (Smart)", icon: Scissors, badge: "New" },
      { name: "Remove pages", icon: Trash2 },
      { name: "Extract pages", icon: Copy },
      { name: "Organize PDF", icon: Grid },
      { name: "Scan to PDF", icon: Scan },
    ]
  },
  {
    category: "OPTIMIZE PDF",
    icon: Zap,
    tools: [
      { name: "Compress PDF", icon: Zap },
      { name: "Repair PDF", icon: Wrench },
      { name: "OCR PDF", icon: Languages },
    ]
  },
  {
    category: "CONVERT TO PDF",
    icon: FileInput,
    tools: [
      { name: "JPG to PDF", icon: Image },
      { name: "Word to PDF", icon: FileText },
      { name: "PowerPoint to PDF", icon: FileText },
      { name: "Excel to PDF", icon: FileText },
      { name: "HTML to PDF", icon: FileText },
      { name: "Web to PDF", icon: FileText, badge: "New" },
      { name: "Image to PDF", icon: Image, badge: "New" },
    ]
  },
  {
    category: "CONVERT FROM PDF",
    icon: FileOutput,
    tools: [
      { name: "PDF to JPG", icon: Image },
      { name: "PDF to Word", icon: FileText },
      { name: "PDF to Word (OCR)", icon: FileText, badge: "New" },
      { name: "PDF to PowerPoint", icon: FileText },
      { name: "PDF to Excel", icon: FileText },
      { name: "PDF to Excel (OCR)", icon: FileText, badge: "New" },
      { name: "PDF to PDF/A", icon: FileText },
    ]
  },
  {
    category: "EDIT PDF",
    icon: PenTool,
    tools: [
      { name: "Edit PDF", icon: PenTool },
      { name: "Rotate PDF", icon: RotateCw },
      { name: "Crop PDF", icon: Crop },
      { name: "Add page numbers", icon: Hash },
      { name: "Add watermark", icon: Stamp },
      { name: "PDF Forms", icon: FormInput },
      { name: "Reorder PDF pages", icon: Grid, badge: "New" },
      { name: "Remove PDF pages", icon: Trash2, badge: "New" },
    ]
  },
  {
    category: "PDF SECURITY",
    icon: Lock,
    tools: [
      { name: "Unlock PDF", icon: Unlock },
      { name: "Protect PDF", icon: Lock },
      { name: "Sign PDF", icon: PenTool },
      { name: "Redact PDF", icon: EyeOff },
      { name: "Compare PDF", icon: GitCompare },
    ]
  },
  {
    category: "PDF INTELLIGENCE",
    icon: Brain,
    tools: [
      { name: "AI Summarizer", icon: Brain },
      { name: "AI Summarizer (Advanced)", icon: Brain, badge: "New" },
      { name: "Translate PDF", icon: Languages, badge: "New" },
      { name: "Translate PDF (Advanced)", icon: Languages, badge: "New" },
      { name: "Chat with PDF", icon: MessageSquare, badge: "New" },
    ]
  },
  {
    category: "WORKFLOW & AUTOMATION",
    icon: Workflow,
    tools: [
      { name: "Workflows / Custom Automation", icon: Workflow, badge: "New" },
    ]
  }
];

export const DocEditorSuite = () => {
  return (
    <div className="bg-[#050505] min-h-screen">
      <ToolHero
        categoryName="Document Creation"
        categoryColor="#7950F2"
        toolName="Doc Editor Suite"
        tagline="32+ powerful tools to organize, optimize, convert, and edit PDFs."
        description="The complete workspace for all your PDF needs. High accuracy, multi-model intelligence, and forensic security."
        icon={FileText}
        features={[
          { title: "32+ Tools", description: "Everything you need to handle PDFs.", icon: Star },
          { title: "Multi-Model AI", description: "Powered by Nexa intelligence.", icon: Sparkles },
          { title: "Enterprise Security", description: "Your data is always protected.", icon: Lock }
        ]}
        onPrimaryAction={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <section id="tools-grid" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="space-y-24">
          {toolCategories.map((cat, i) => (
            <div key={i} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <cat.icon className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{cat.category}</h2>
                  <p className="text-white/40 text-sm mt-0.5">{cat.tools.length} tools available</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cat.tools.map((tool, j) => (
                  <GlowCard 
                    key={j} 
                    glowColor="violet" 
                    customSize 
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group flex flex-col justify-between h-full cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <tool.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-white group-hover:text-white transition-colors flex items-center gap-2">
                          {tool.name}
                          {tool.badge && (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-400">
                              {tool.badge}
                            </span>
                          )}
                        </h3>
                        <p className="text-white/30 text-xs font-medium uppercase tracking-wider">Veriscribe Tool</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover:text-white transition-colors mt-6">
                      Launch <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
