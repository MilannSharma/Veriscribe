import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, FileSpreadsheet, Presentation, BookOpen, File, 
  UserSquare, Plus, Clock, Search, Filter, MoreVertical, 
  ArrowRight, Sparkles, Star, Shield
} from 'lucide-react';
import { ToolHero } from '../../layout/ToolHero';
import { GlowCard } from '../../ui/spotlight-card';
import { cn } from '@/src/lib/utils';

const docFormats = [
  { name: "Word Document", icon: FileText, color: "text-blue-500", desc: "Standard professional documents" },
  { name: "Excel Sheet", icon: FileSpreadsheet, color: "text-green-500", desc: "Data and analysis sheets" },
  { name: "PowerPoint", icon: Presentation, color: "text-orange-500", desc: "Presentations and decks" },
  { name: "Research Paper", icon: BookOpen, color: "text-purple-500", desc: "Academic formatted papers" },
  { name: "PDF Document", icon: File, color: "text-red-500", desc: "Portable document format" },
  { name: "Resume / CV", icon: UserSquare, color: "text-emerald-500", desc: "Professional resumes" },
];

const recentDocs = [
  { name: "Quarterly Report Q1.docx", type: "Word", date: "2 hours ago", size: "1.2 MB" },
  { name: "Financial Projection.xlsx", type: "Excel", date: "Yesterday", size: "2.4 MB" },
  { name: "AI Research Paper.pdf", type: "PDF", date: "3 days ago", size: "4.1 MB" },
  { name: "Product Pitch Deck.pptx", type: "PPT", date: "1 week ago", size: "12.5 MB" },
  { name: "Resume Milan Sharma.pdf", type: "PDF", date: "2 weeks ago", size: "0.8 MB" },
  { name: "Project Timeline.xlsx", type: "Excel", date: "3 weeks ago", size: "1.5 MB" },
  { name: "Meeting Notes.docx", type: "Word", date: "1 month ago", size: "0.5 MB" },
];

export const DocStudio = () => {
  const [showAllDocs, setShowAllDocs] = React.useState(false);
  const displayedDocs = showAllDocs ? recentDocs : recentDocs.slice(0, 4);
  return (
    <div className="bg-[#050505] min-h-screen">
      <ToolHero
        categoryName="Document Creation"
        categoryColor="#7950F2"
        toolName="Doc Studio"
        tagline="Generate structured documents from simple prompts."
        description="Select a format to start creating, or continue working on your recent documents."
        icon={FileText}
        features={[
          { title: "Multi-Format", description: "Support for Word, Excel, PPT, and more.", icon: Star },
          { title: "AI Generation", description: "Build full structures from prompts.", icon: Sparkles },
          { title: "Secure Storage", description: "Your drafts are always safe.", icon: Shield }
        ]}
        onPrimaryAction={() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <section id="workspace" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="space-y-20">
          
          {/* Create New Document Section */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-violet-400">Create New</span>
                <h2 className="text-4xl font-bold text-white tracking-tight">Document Formats</h2>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <input 
                    type="text" 
                    placeholder="Search templates..." 
                    className="pl-12 pr-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {docFormats.map((format, i) => (
                <GlowCard 
                  key={i} 
                  glowColor="violet" 
                  customSize 
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      <format.icon className={cn("w-6 h-6", format.color)} />
                    </div>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="Create new document">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{format.name}</h3>
                  <p className="text-white/40 text-sm">{format.desc}</p>
                </GlowCard>
              ))}
            </div>
          </div>

          {/* Recent Documents Section */}
          <div className="space-y-8">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-violet-400">Continue Working</span>
                <h2 className="text-4xl font-bold text-white tracking-tight">Recent Documents</h2>
              </div>
              <button 
                onClick={() => setShowAllDocs(!showAllDocs)}
                className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
              >
                {showAllDocs ? "Show Less" : "View All"} <ArrowRight className={cn("w-4 h-4 transition-transform", showAllDocs ? "rotate-90" : "")} />
              </button>
            </div>

            <div className="bg-[#0D0D0E] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-12 gap-4 px-8 py-4 border-b border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-white/30">
                <div className="col-span-6">Document Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Last Modified</div>
                <div className="col-span-1">Size</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              <div className="divide-y divide-white/5">
                {displayedDocs.map((doc, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-white/[0.01] transition-colors group">
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                        <FileText className="w-5 h-5 text-white/40 group-hover:text-violet-500 transition-colors" />
                      </div>
                      <div>
                        <span className="text-white font-bold block group-hover:text-white transition-colors">{doc.name}</span>
                        <span className="text-white/20 text-xs mt-0.5 block">Stored in Cloud</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">{doc.type}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-white/40 text-sm">
                      <Clock className="w-4 h-4 text-white/20" />
                      {doc.date}
                    </div>
                    <div className="col-span-1 text-white/40 text-sm">
                      {doc.size}
                    </div>
                    <div className="col-span-1 text-right">
                      <button className="text-white/20 hover:text-white transition-colors p-2" aria-label="More actions">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
