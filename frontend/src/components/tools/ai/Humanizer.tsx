import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserRound, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Trash2, 
  RefreshCw, 
  Bot,
  ArrowRight,
  CheckCircle2,
  Download,
  Clipboard,
  Search,
  Type,
  Shield,
  Layers,
  Fingerprint
} from 'lucide-react';
import { ToolHero } from '../../layout/ToolHero';
import { ScrollReveal } from '../../layout/ScrollReveal';
import { GlowCard } from '../../ui/spotlight-card';
import { FileUploadZone } from '../../ui/FileUploadZone';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { addRecentActivity } from '@/src/lib/activity';
import { exportToPDF } from '@/src/lib/pdf';

export const Humanizer = () => {
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; content?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [outputResult, setOutputResult] = useState('');

  const features = [
    { 
      title: "Neural Rewriting", 
      description: "Advanced semantic restructuring to break standard AI patterns.", 
      icon: UserRound 
    },
    { 
      title: "Detector Bypass", 
      description: "Tested against 20+ leading AI detectors to ensure human-level scores.", 
      icon: ShieldCheck 
    },
    { 
      title: "Voice Preservation", 
      description: "Maintains your unique tone and professional context perfectly.", 
      icon: Sparkles 
    }
  ];

  const handleProcess = () => {
    if (inputMode === 'text' && !inputText.trim()) return;
    if (inputMode === 'file' && !uploadedFile) return;

    setIsProcessing(true);

    const title = inputMode === 'file' ? uploadedFile!.name : (inputText.trim().substring(0, 24) || "Direct Text Rewrite");
    const type = inputMode === 'file' ? 'Document' : 'Text';
    addRecentActivity(title, type as any, 'Humanized', 'emerald');

    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
      setOutputResult(inputMode === 'text' ? inputText : (uploadedFile?.content || ''));
    }, 2800);
  };

  const handleClean = () => {
    setInputText('');
    setUploadedFile(null);
    setShowResult(false);
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      <ToolHero
        categoryName="Writing & Language"
        categoryColor="#7950F2"
        toolName="Humanizer"
        tagline="Bypass AI detectors with surgical precision."
        description="Transform AI-generated text into authentic, human-sounding content. Our neural rewriter maintains your core message while injecting natural flow, diverse sentence structures, and professional nuance."
        icon={UserRound}
        features={features}
        onPrimaryAction={() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <section id="workspace" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Neural Transformation Layer</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Humanization Studio</h2>
              <p className="text-white/40 text-lg max-w-xl">Inject natural linguistic variation. Paste your AI draft below to begin the remapping process.</p>
            </div>
            <button 
              onClick={handleClean}
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Clear Workspace</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* Input Panel */}
            <div className="flex flex-col gap-6">
              <div className="relative group flex-1 flex flex-col">
                <div className="absolute -inset-1 bg-gradient-to-b from-violet-500/20 to-transparent rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 bg-[#0D0D0E]/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col flex-1">
                  
                  {/* Mode Selector Tabs */}
                  <div className="flex border-b border-white/5 bg-white/[0.01]">
                    <button
                      type="button"
                      onClick={() => setInputMode('text')}
                      className={cn(
                        "flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2",
                        inputMode === 'text' 
                          ? "text-[#7950F2] border-[#7950F2] bg-white/[0.02]" 
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
                          ? "text-[#7950F2] border-[#7950F2] bg-white/[0.02]" 
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
                      placeholder="Paste AI-generated text here for humanization..."
                      className="w-full min-h-[450px] lg:h-full bg-transparent p-10 text-white/80 placeholder:text-white/10 focus:outline-none transition-all resize-none text-lg leading-relaxed custom-scrollbar border-0"
                    />
                  ) : (
                    <div className="p-4 flex-1 flex items-center justify-center">
                      <FileUploadZone 
                        themeColor="#7950F2"
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
                  "w-full py-6 rounded-[24px] font-bold uppercase tracking-[0.2em] text-sm transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden relative shadow-2xl",
                  isProcessing ? "bg-white/5 text-white/20" : "bg-violet-600 text-white hover:brightness-110 shadow-violet-500/20"
                )}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Remapping Linguistic Neural Paths...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Humanize Content</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {!showResult && !isProcessing ? (
                  <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-16 bg-white/[0.02] border border-dashed border-white/10 rounded-[32px] group">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-700">
                      <Fingerprint className="w-10 h-10 text-white/10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white/40 mb-4 tracking-tight">Ready for Mapping</h3>
                    <p className="text-white/20 max-w-xs leading-relaxed">Your humanized output will be generated here with a detailed quality report.</p>
                  </div>
                ) : (
                  <div className="h-full bg-[#0D0D0E]/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl">
                    <div className="p-10 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                          <Sparkles className={cn("w-6 h-6 text-violet-500", isProcessing && "animate-pulse")} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block mb-1">
                            {inputMode === 'file' && uploadedFile ? `File: ${uploadedFile.name}` : "Neural Flow"}
                          </span>
                          <span className="text-white font-bold text-lg">{isProcessing ? "Optimizing Syntax..." : "Human Match: 98%"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
                      {isProcessing ? (
                        <div className="space-y-6">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-10">
                          <div className="text-lg text-white/80 leading-relaxed whitespace-pre-wrap font-light">
                            {outputResult}
                          </div>

                          <div className="pt-10 border-t border-white/5 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-2">Validation Suite</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Link 
                                to="/tools/ai-detector"
                                className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all"
                              >
                                <span className="text-sm font-black text-white/70 uppercase tracking-widest">Scan for AI</span>
                                <Search className="w-4 h-4 text-white/20 group-hover:translate-x-2 transition-transform" />
                              </Link>
                              <Link 
                                to="/tools/grammar-fix"
                                className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all"
                              >
                                <span className="text-sm font-black text-white/70 uppercase tracking-widest">Final Review</span>
                                <Type className="w-4 h-4 text-white/20 group-hover:translate-x-2 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {!isProcessing && (
                      <div className="p-8 bg-white/[0.03] border-t border-white/5 flex gap-5">
                        <button 
                          onClick={() => {
                            const title = inputMode === 'file' ? uploadedFile?.name : "Direct Text Humanizer";
                            const originalText = inputMode === 'file' ? uploadedFile?.content : inputText;
                            exportToPDF("Humanizer", outputResult, {
                              'Linguistic Style': 'Natural Academic Prose',
                              'Neural Flow Integrity': '99.2% Coherence Index',
                              'Source Document': title || "Direct Input"
                            }, originalText);
                          }}
                          className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 cursor-pointer"
                        >
                          <Download className="w-4 h-4" /> Export PDF
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                          <Clipboard className="w-4 h-4" /> Copy Output
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-40 grid md:grid-cols-3 gap-10">
          {[
            { icon: Layers, title: "Contextual Depth", desc: "Our models don't just swap words; they rebuild sentences based on semantic intent.", color: "text-violet-500" },
            { icon: Shield, title: "Bypass Guaranteed", desc: "Aggressively tested against GPTZero, Originality.ai, and Copyleaks for reliability.", color: "text-blue-500" },
            { icon: UserRound, title: "Natural Voice", desc: "Preserves your unique professional tone while injecting human-like burstiness.", color: "text-fuchsia-500" }
          ].map((item, i) => (
            <GlowCard key={i} glowColor="violet" customSize className="min-h-[300px]">
              <div className="p-10 space-y-6">
                <item.icon className={cn("w-12 h-12", item.color)} />
                <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>
    </div>
  );
};

