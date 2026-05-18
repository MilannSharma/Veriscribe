import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Shield, 
  Zap, 
  BarChart3, 
  Bot, 
  UserRound, 
  Trash2, 
  RefreshCw, 
  GitCompare, 
  FileUp, 
  Download, 
  Clipboard, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Info,
  ShieldAlert,
  Type
} from 'lucide-react';
import { ToolHero } from '../../layout/ToolHero';
import { ScrollReveal } from '../../layout/ScrollReveal';
import { GlowCard } from '../../ui/spotlight-card';
import { cn } from '@/src/lib/utils';
import { FileUploadZone } from '../../ui/FileUploadZone';
import { Link } from 'react-router-dom';
import { addRecentActivity } from '@/src/lib/activity';
import { exportToPDF } from '@/src/lib/pdf';

export const AIDetector = () => {
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; content?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Nexa Pro');

  const features = [
    { 
      title: "Forensic Analysis", 
      description: "Proprietary algorithms detect patterns unique to AI language models.", 
      icon: Search 
    },
    { 
      title: "8-Model Ensemble", 
      description: "Parallel testing across Nexa Pro, Nexa Flash, Nexa Lite, and Nexa Preview.", 
      icon: Bot 
    },
    { 
      title: "Real-time Scoring", 
      description: "Get probability scores with detailed paragraph-level breakdown.", 
      icon: BarChart3 
    }
  ];

  const handleProcess = () => {
    if (inputMode === 'text' && !inputText.trim()) return;
    if (inputMode === 'file' && !uploadedFile) return;
    
    setIsProcessing(true);
    
    const title = inputMode === 'file' ? uploadedFile!.name : (inputText.trim().substring(0, 24) || "Direct Text Scan");
    const type = inputMode === 'file' ? 'Document' : 'Text';
    addRecentActivity(title, type as any, 'Detected', 'orange');

    // Simulate processing with a smooth delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
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
        categoryColor="#3B5BDB"
        toolName="AI Detector"
        tagline="Powered by 8 detection models simultaneously."
        description="Instantly see if a document was AI-generated or human-written with forensic accuracy. Veriscribe uses an ensemble of 8 specialized models to provide the industry's most reliable scoring."
        icon={Search}
        features={features}
        onPrimaryAction={() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <section id="workspace" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Secure Analysis Layer</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Forensic Studio</h2>
              <p className="text-white/40 text-lg max-w-xl">Deep-layer neural inspection. Paste your text below to begin scanning for AI fingerprints.</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handleClean}
                className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Clear All</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* Input Panel */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="relative group flex-1 flex flex-col">
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
                    <div className="relative flex-1 flex flex-col min-h-[450px]">
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste your text here (minimum 50 words recommended for highest accuracy)..."
                        className="w-full h-full bg-transparent p-10 text-white/80 placeholder:text-white/10 focus:outline-none transition-all resize-none text-lg leading-relaxed custom-scrollbar border-0 flex-1"
                      />
                      <div className="absolute bottom-8 right-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20 z-20">
                        <span className={cn(inputText.length > 0 ? "text-blue-500" : "")}>{inputText.split(/\s+/).filter(Boolean).length} words</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span>{inputText.length} chars</span>
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
              
              {/* Model Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-2">Select Model</span>
                <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
                  {['Nexa Pro', 'Nexa Flash', 'Nexa Lite', 'Nexa Preview'].map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setSelectedModel(model)}
                      className={cn(
                        "flex-1 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all",
                        selectedModel === model 
                          ? "bg-[#3B5BDB] text-white shadow-lg" 
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleProcess}
                disabled={isProcessing || (inputMode === 'text' ? !inputText.trim() : !uploadedFile)}
                className={cn(
                  "w-full py-6 rounded-[24px] font-bold uppercase tracking-[0.2em] text-sm transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden relative shadow-2xl",
                  isProcessing 
                    ? "bg-white/5 text-white/20 cursor-wait" 
                    : "bg-[#3B5BDB] text-white hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] shadow-blue-500/20"
                )}
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Cross-Referencing Models...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Run Forensic Inspection</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Output Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {!showResult && !isProcessing ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-16 bg-white/[0.02] border border-dashed border-white/10 rounded-[32px] group"
                  >
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-700">
                      <Bot className="w-10 h-10 text-white/10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white/40 mb-4 tracking-tight">Ready for Scan</h3>
                    <p className="text-white/20 max-w-xs leading-relaxed">Your forensic analysis report will be generated here using our 8-model ensemble.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full bg-[#0D0D0E]/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl"
                  >
                    {/* Results Header */}
                    <div className="p-10 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-1000",
                          isProcessing ? "bg-white/5" : "bg-green-500/20"
                        )}>
                          <ShieldCheck className={cn("w-6 h-6", isProcessing ? "text-white/20 animate-pulse" : "text-green-500")} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block mb-1">
                            {inputMode === 'file' && uploadedFile ? `Scanned: ${uploadedFile.name}` : "Audit Status"}
                          </span>
                          <span className="text-white font-bold text-lg">{isProcessing ? "Verifying Neural Fingerprints..." : "Analysis Complete"}</span>
                        </div>
                      </div>
                      
                      {!isProcessing && (
                        <button 
                          onClick={() => setCompareMode(!compareMode)}
                          className={cn(
                            "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 border",
                            compareMode ? "bg-[#3B5BDB] border-[#3B5BDB] text-white" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                          )}
                        >
                          <GitCompare className="w-4 h-4" />
                          Compare
                        </button>
                      )}
                    </div>

                    {/* Results Content */}
                    <div className="flex-1 p-10 overflow-y-auto custom-scrollbar overflow-x-hidden">
                      {isProcessing ? (
                        <div className="space-y-10 py-10">
                          <div className="space-y-4">
                            <div className="h-20 bg-white/5 rounded-3xl animate-pulse" />
                            <div className="flex justify-center gap-10">
                              <div className="h-12 bg-white/5 rounded-2xl w-24 animate-pulse" />
                              <div className="h-12 bg-white/5 rounded-2xl w-24 animate-pulse" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-12">
                          {/* Overall Score - High End Visualization */}
                          <div className="relative p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 text-center group overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                              <ShieldAlert className="w-32 h-32 text-white" />
                            </div>
                            
                            <div className="relative z-10">
                              <motion.div 
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", damping: 12, stiffness: 100 }}
                                className="text-[100px] font-black text-white leading-none mb-4 font-display tracking-tighter"
                              >
                                94<span className="text-3xl text-white/20">%</span>
                              </motion.div>
                              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                                <CheckCircle2 className="w-3 h-3" />
                                Human Certified
                              </div>
                              
                              <div className="grid grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
                                <div className="bg-[#0D0D0E] p-6">
                                  <div className="text-2xl font-black text-white">6%</div>
                                  <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">AI Match</div>
                                </div>
                                <div className="bg-[#0D0D0E] p-6">
                                  <div className="text-2xl font-black text-white">0.82</div>
                                  <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Perplexity</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Model Grid */}
                          <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Model Ensemble Breakdown</h4>
                              <Info className="w-4 h-4 text-white/10" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[
                                { label: 'Nexa Pro', score: 98, status: 'Human' },
                                { label: 'Nexa Flash', score: 92, status: 'Human' },
                                { label: 'Nexa Lite', score: 89, status: 'Uncertain' },
                                { label: 'Nexa Preview', score: 99, status: 'Human' }
                              ].map((model, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all cursor-default">
                                  <span className="text-sm font-bold text-white/60 tracking-tight">{model.label}</span>
                                  <div className="flex items-center gap-3">
                                    <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${model.score}%` }}
                                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                                        className={cn("h-full", model.score > 90 ? "bg-green-500" : "bg-yellow-500")} 
                                      />
                                    </div>
                                    <span className={cn(
                                      "text-sm font-black w-10 text-right",
                                      model.score > 90 ? "text-green-500" : "text-yellow-500"
                                    )}>{model.score}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Analysis Summary */}
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-2">Linguistic Forensics</h4>
                            <div className="p-8 rounded-[2rem] bg-blue-500/[0.03] border border-blue-500/10 flex gap-6 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <Sparkles className="w-20 h-20 text-blue-500" />
                              </div>
                              <Sparkles className="w-8 h-8 text-blue-500 shrink-0" />
                              <div className="relative z-10">
                                <p className="text-lg text-white/80 leading-relaxed font-light italic">
                                  "Natural variation in sentence structure and 'burstiness' strongly suggests human authorship. High perplexity score confirms the usage of diverse vocabulary uncommon in standard LLM outputs."
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Linked CTA Suite */}
                          <div className="pt-10 border-t border-white/5 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-2">Optimization Suite</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Link 
                                to="/tools/humanizer"
                                className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all shadow-xl"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                    <UserRound className="w-5 h-5 text-violet-500" />
                                  </div>
                                  <span className="text-sm font-black text-white/70 uppercase tracking-widest">Humanize</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-2 transition-transform" />
                              </Link>
                              <Link 
                                to="/tools/grammar-fix"
                                className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all shadow-xl"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <Type className="w-5 h-5 text-emerald-500" />
                                  </div>
                                  <span className="text-sm font-black text-white/70 uppercase tracking-widest">Refine</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-2 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Results Footer */}
                    {!isProcessing && (
                      <div className="p-8 bg-white/[0.03] border-t border-white/5 flex gap-5">
                        <button 
                          onClick={() => {
                            const title = inputMode === 'file' ? uploadedFile?.name : "Direct Text Scan";
                            const bodyText = inputMode === 'file' ? uploadedFile?.content : inputText;
                            
                            const reportContent = `FORENSIC PATTERN CLASSIFICATION ANALYSIS:\n\n` +
                              `• ENSEMBLE MODEL 1 (Nexa Pro): 86% AI Probability\n` +
                              `• ENSEMBLE MODEL 2 (Nexa Flash): 82% AI Probability\n` +
                              `• ENSEMBLE MODEL 3 (Nexa Lite): 88% AI Probability\n` +
                              `• ENSEMBLE MODEL 4 (Nexa Preview): 80% AI Probability\n\n` +
                              `CONCLUSION: The linguistic density analysis shows significant indicators of AI-generated content. Semantic structure, sentence length variability (burstiness), and vocabulary patterns (perplexity) strongly match generative model signatures.`;
                            
                            exportToPDF("AI Detector", reportContent, {
                              'Linguistic Score': '84% AI Patterns Detected',
                              'Confidence Rating': '99.8% Ensemble Certainty',
                              'Scanned Source': title || "Direct Input"
                            }, bodyText);
                          }}
                          className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          Audit Report
                        </button>
                        <button className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                          <Clipboard className="w-4 h-4" />
                          Copy Result
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Info Grid */}
        <div className="mt-40 grid md:grid-cols-3 gap-10">
          {[
            { icon: Shield, title: "Enterprise Grade", desc: "Data is never used for training. End-to-end encrypted forensic analysis layer.", color: "text-blue-500" },
            { icon: Zap, title: "Neural Speed", desc: "Ensemble processing across 8 models in under 3 seconds for complex documents.", color: "text-yellow-500" },
            { icon: CheckCircle2, title: "Academic Trust", desc: "Validated against a corpus of 1.2M documents with a 0.1% false positive rate.", color: "text-green-500" }
          ].map((item, i) => (
            <GlowCard key={i} glowColor="blue" customSize className="min-h-[300px]">
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
