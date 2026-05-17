import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  RefreshCw, 
  ArrowRight,
  Clipboard,
  Download,
  List,
  FileText,
  Link2,
  Globe,
  Library
} from 'lucide-react';
import { ToolHero } from '../../layout/ToolHero';
import { ScrollReveal } from '../../layout/ScrollReveal';
import { GlowCard } from '../../ui/spotlight-card';
import { FileUploadZone } from '../../ui/FileUploadZone';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { addRecentActivity } from '@/src/lib/activity';
import { exportToPDF } from '@/src/lib/pdf';

export const CitationGenerator = () => {
  const [url, setUrl] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; content?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [citationStyle, setCitationStyle] = useState('APA');

  const features = [
    { 
      title: "Auto-Discovery", 
      description: "Paste a URL or DOI and Veriscribe extracts metadata instantly.", 
      icon: Globe 
    },
    { 
      title: "Multi-Style Support", 
      description: "Switch between APA, MLA, Chicago, IEEE, Harvard, and more.", 
      icon: Library 
    },
    { 
      title: "BibTeX Integration", 
      description: "Export directly to BibTeX, RIS, or formatted Word text.", 
      icon: FileText 
    }
  ];

  const handleProcess = () => {
    if (inputMode === 'text' && !url.trim()) return;
    if (inputMode === 'file' && !uploadedFile) return;

    setIsProcessing(true);

    const title = inputMode === 'file' ? uploadedFile!.name : (url.trim().substring(0, 24) || "Direct URL Citation");
    const type = inputMode === 'file' ? 'Document' : 'URL';
    addRecentActivity(title, type as any, 'Cited', 'blue');

    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 1500);
  };

  const handleClean = () => {
    setUrl('');
    setUploadedFile(null);
    setShowResult(false);
  };

  return (
    <div className="bg-[#0a0a0b]">
      <ToolHero
        categoryName="Writing & Language"
        categoryColor="#3B5BDB"
        toolName="Citation Generator"
        tagline="Auto-generate citations in APA, MLA, Chicago, Harvard, IEEE."
        description="Streamline your research with our intelligent citation engine. veriscribe automatically fetches metadata for websites, journals, and books, providing perfectly formatted citations in seconds."
        icon={BookOpen}
        features={features}
        onPrimaryAction={() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <section id="workspace" className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Academic Citation Engine</h2>
              <p className="text-white/40">Enter a URL, DOI, or ISBN to generate a professional citation.</p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {['APA', 'MLA', 'Chicago', 'IEEE', 'Harvard'].map(style => (
                <button
                  key={style}
                  onClick={() => setCitationStyle(style)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
                    citationStyle === style 
                      ? "bg-[#3B5BDB] border-[#3B5BDB] text-white" 
                      : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                  )}
                >
                  {style}
                </button>
              ))}
              <button 
                onClick={handleClean}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Clear Workspace</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 min-h-[500px]">
            {/* Input Panel */}
            <div className="flex flex-col gap-4">
              <div className="relative flex-1 flex flex-col group">
                <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-transparent rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 bg-[#0D0D0E]/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col flex-1">
                  
                  {/* Mode Selector Tabs */}
                  <div className="flex border-b border-white/5 bg-white/[0.01]">
                    <button
                      type="button"
                      onClick={() => setInputMode('text')}
                      className={cn(
                        "flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2",
                        inputMode === 'text' 
                          ? "text-[#3B5BDB] border-[#3B5BDB] bg-white/[0.02]" 
                          : "text-white/40 border-transparent hover:text-white"
                      )}
                    >
                      Direct URL / DOI
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMode('file')}
                      className={cn(
                        "flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2",
                        inputMode === 'file' 
                          ? "text-[#3B5BDB] border-[#3B5BDB] bg-white/[0.02]" 
                          : "text-white/40 border-transparent hover:text-white"
                      )}
                    >
                      Document File (.pdf, .docx)
                    </button>
                  </div>

                  {inputMode === 'text' ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-10 min-h-[300px]">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <Link2 className="w-8 h-8 text-[#3B5BDB]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Paste Source URL</h3>
                      <div className="w-full max-w-md relative">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://example.com/article..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#3B5BDB]/50 transition-all text-center"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex-1 flex items-center justify-center">
                      <FileUploadZone 
                        themeColor="#3B5BDB"
                        layoutMode="dropzone"
                        onFileLoaded={(text, name, size) => setUploadedFile({ name, size, content: text })}
                        onClear={() => setUploadedFile(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleProcess}
                disabled={isProcessing || (inputMode === 'text' ? !url.trim() : !uploadedFile)}
                className={cn(
                  "w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3",
                  isProcessing ? "bg-white/5 text-white/20" : "bg-[#3B5BDB] text-white hover:brightness-110"
                )}
              >
                {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                {isProcessing ? "Fetching Metadata..." : "Generate Citation"}
              </button>
            </div>

            {/* Output Panel */}
            <div className="relative">
              {!showResult && !isProcessing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                  <Library className="w-12 h-12 text-white/10 mb-4" />
                  <h3 className="text-xl font-bold text-white/40 mb-2">Bibliography Preview</h3>
                  <p className="text-white/20">Your citations will appear here ready for export.</p>
                </div>
              )}

              {(showResult || isProcessing) && (
                <div className="h-full bg-[#0D0D0E] border border-white/5 rounded-3xl overflow-hidden flex flex-col">
                  <div className="p-8 bg-white/[0.01] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/30 block">
                          {inputMode === 'file' && uploadedFile ? `File: ${uploadedFile.name}` : "Current Style"}
                        </span>
                        <span className="text-white font-bold">{citationStyle} (7th Edition)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {isProcessing ? (
                      <div className="space-y-4">
                        <div className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 relative group">
                          <p className="text-lg text-white/80 leading-relaxed italic">
                            Doe, J. (2024). <span className="font-bold underline decoration-[#3B5BDB]/50">The Evolution of AI in Modern Document Workflows.</span> Veriscribe Intelligence Journal, 12(3), 45-67. Retrieved from {url}
                          </p>
                          <button 
                            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all"
                            onClick={() => {}}
                            aria-label="Remove citation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 px-2">Next Steps</h4>
                          <Link 
                            to="/tools/plagiarism-check"
                            className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all"
                          >
                            <span className="text-sm font-bold text-white/60">Verify Originality</span>
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isProcessing && (
                    <div className="p-6 bg-white/[0.02] border-t border-white/5 flex gap-4">
                      <button 
                        onClick={() => {
                          const title = inputMode === 'file' ? uploadedFile?.name : "Direct URL/DOI Reference";
                          const originalText = inputMode === 'file' ? uploadedFile?.content : `URL / DOI Reference target entered direct: ${url}`;
                          const citationText = `Doe, J. (2024). The Evolution of AI in Modern Document Workflows. Veriscribe Intelligence Journal, 12(3), 45-67. Retrieved from ${url || 'https://veriscribe.ai/document'}`;
                          const bodyText = `Generated Bibliography Metadata Citation:\n\nStyle: ${citationStyle} (7th Edition)\n\nFull Reference Formatted String:\n${citationText}`;
                          exportToPDF("Citation Generator", bodyText, {
                            'Citation Style': `${citationStyle} (7th Edition)`,
                            'Metadata Source': title || "Direct Input",
                            'Retrieved Origin': url || "Retrieved from vault"
                          }, originalText);
                        }}
                        className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" /> Export PDF
                      </button>
                      <button className="flex-1 py-3 rounded-xl bg-[#3B5BDB] text-white font-bold text-xs uppercase tracking-widest hover:brightness-110 flex items-center justify-center gap-2">
                        <Clipboard className="w-4 h-4" /> Copy Citation
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
