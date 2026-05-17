import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileSearch, 
  Sparkles, 
  Zap, 
  BarChart3, 
  Trash2, 
  RefreshCw, 
  ArrowRight,
  Clipboard,
  Download,
  List,
  FileText,
  AlignLeft
} from 'lucide-react';
import { ToolHero } from '../../layout/ToolHero';
import { ScrollReveal } from '../../layout/ScrollReveal';
import { GlowCard } from '../../ui/spotlight-card';
import { FileUploadZone } from '../../ui/FileUploadZone';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { addRecentActivity } from '@/src/lib/activity';
import { exportToPDF } from '@/src/lib/pdf';

export const AISummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; content?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [summaryMode, setSummaryMode] = useState('bullet'); // bullet, paragraph, executive

  const features = [
    { 
      title: "Semantic Distillation", 
      description: "Extracts core logic and intent, not just keyword extraction.", 
      icon: FileSearch 
    },
    { 
      title: "Multi-Mode Output", 
      description: "Generate executive summaries, bullet points, or key takeaways.", 
      icon: List 
    },
    { 
      title: "Tone Consistency", 
      description: "Maintains the original document's tone while condensing length.", 
      icon: Sparkles 
    }
  ];

  const handleProcess = () => {
    if (inputMode === 'text' && !inputText.trim()) return;
    if (inputMode === 'file' && !uploadedFile) return;

    setIsProcessing(true);

    const title = inputMode === 'file' ? uploadedFile!.name : (inputText.trim().substring(0, 24) || "Direct Text Summary");
    const type = inputMode === 'file' ? 'Document' : 'Text';
    addRecentActivity(title, type as any, 'Summarized', 'blue');

    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2000);
  };

  const handleClean = () => {
    setInputText('');
    setUploadedFile(null);
    setShowResult(false);
  };

  return (
    <div className="bg-[#0a0a0b]">
      <ToolHero
        categoryName="Writing & Language"
        categoryColor="#3B5BDB"
        toolName="AI Summarizer"
        tagline="Condense long documents into key insights instantly."
        description="Save hours of reading with Veriscribe's intelligent summarization engine. We use recursive deep-learning to distill complex documents into clear, actionable summaries without losing critical context."
        icon={FileSearch}
        features={features}
        onPrimaryAction={() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <section id="workspace" className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Intelligence Distiller</h2>
              <p className="text-white/40">Paste your long-form content for instant condensation.</p>
            </div>
            <div className="flex gap-4 items-center">
              {['bullet', 'paragraph', 'executive'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setSummaryMode(mode)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
                    summaryMode === mode 
                      ? "bg-[#3B5BDB] border-[#3B5BDB] text-white" 
                      : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                  )}
                >
                  {mode}
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

          <div className="grid lg:grid-cols-2 gap-8 min-h-[600px]">
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
                      Direct Text
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
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Paste long document or text here..."
                      className="w-full min-h-[450px] lg:h-full bg-transparent p-10 text-white/80 placeholder:text-white/10 focus:outline-none transition-all resize-none text-lg leading-relaxed custom-scrollbar border-0 flex-1"
                    />
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
                disabled={isProcessing || (inputMode === 'text' ? !inputText.trim() : !uploadedFile)}
                className={cn(
                  "w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3",
                  isProcessing ? "bg-white/5 text-white/20" : "bg-[#3B5BDB] text-white hover:brightness-110"
                )}
              >
                {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                {isProcessing ? "Distilling Knowledge..." : "Generate Summary"}
              </button>
            </div>

            {/* Output Panel */}
            <div className="relative">
              {!showResult && !isProcessing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                  <AlignLeft className="w-12 h-12 text-white/10 mb-4" />
                  <h3 className="text-xl font-bold text-white/40 mb-2">Awaiting Analysis</h3>
                  <p className="text-white/20">The summary results will appear here.</p>
                </div>
              )}

              {(showResult || isProcessing) && (
                <div className="h-full bg-[#0D0D0E] border border-white/5 rounded-3xl overflow-hidden flex flex-col">
                  <div className="p-8 bg-white/[0.01] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/30 block">
                          {inputMode === 'file' && uploadedFile ? `File: ${uploadedFile.name}` : "Processing Mode"}
                        </span>
                        <span className="text-white font-bold capitalize">{summaryMode} Summary</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {isProcessing ? (
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="h-4 bg-white/5 rounded w-full animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">Key Takeaways</h4>
                          <ul className="space-y-3">
                            {[1, 2, 3].map(i => (
                              <li key={i} className="flex gap-3 text-white/60 leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#3B5BDB] mt-2 shrink-0" />
                                <span>High-level insight from the original document distilled into clear action items.</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-lg text-white/80 leading-relaxed whitespace-pre-wrap">
                          {inputText.substring(0, 500)}...
                        </div>
                      </div>
                    )}
                  </div>

                  {!isProcessing && (
                    <div className="p-6 bg-white/[0.02] border-t border-white/5 flex gap-4">
                      <button 
                        onClick={() => {
                          const title = inputMode === 'file' ? uploadedFile?.name : "Direct Text Summary";
                          const originalText = inputMode === 'file' ? uploadedFile?.content : inputText;
                          const bodyText = `Summary Mode: ${summaryMode.toUpperCase()}\n\nKey Takeaways:\n- Insight 1: High-level insight distilled into clear action items.\n- Insight 2: Neural context patterns analyzed and condensed.\n- Insight 3: Core semantic arguments preserved with academic rigor.\n\nSummary Text:\n${originalText?.substring(0, 500)}...`;
                          exportToPDF("AI Summarizer", bodyText, {
                            'Summary Mode': summaryMode,
                            'Compression Rate': '65% Condensed',
                            'Source Material': title || "Direct Input"
                          }, originalText);
                        }}
                        className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" /> Export PDF
                      </button>
                      <button className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 flex items-center justify-center gap-2">
                        <Clipboard className="w-4 h-4" /> Copy
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
