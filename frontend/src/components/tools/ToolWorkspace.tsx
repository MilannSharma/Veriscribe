import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { 
  FileUp, 
  Clipboard, 
  Search, 
  UserRound, 
  Type, 
  Shield, 
  Download,
  Copy,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Sparkles,
  Trash2,
  RefreshCw,
  GitCompare,
  BarChart3,
  Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolWorkspaceProps {
  toolId: string;
  categoryColor: string;
}

type InputMode = 'paste' | 'upload';

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({ toolId, categoryColor }) => {
  const [inputMode, setInputMode] = useState<InputMode>('paste');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [loadingText, setLoadingText] = useState('Analyzing content...');
  const [selectedModel, setSelectedModel] = useState<'fast' | 'pro' | 'preview'>('pro');
  const [viewMode, setViewMode] = useState<'output' | 'compare'>('output');

  // Rotation for loading text
  useEffect(() => {
    if (isProcessing) {
      const texts = [
        "Analyzing syntax and structure...",
        "Running forensic AI models...",
        "Evaluating perplexity & burstiness...",
        "Generating humanized variations...",
        "Almost there..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleProcess = () => {
    if (!inputText && inputMode === 'paste') return;
    setIsProcessing(true);
    setResults(null);
    
    // Simulate high-end processing
    setTimeout(() => {
      setIsProcessing(false);
      setResults({
        score: 84,
        humanScore: 16,
        originalText: inputText,
        outputContent: toolId === 'humanizer' ? "The weather was exceptionally pleasant yesterday. I spent a long time strolling through the gardens, enjoying the gentle breeze." : inputText,
        stats: [
          { label: "GPTZero", value: 92, status: "High Risk" },
          { label: "Turnitin", value: 78, status: "Moderate" },
          { label: "Originality.ai", value: 88, status: "High Risk" }
        ],
        paragraphs: [
          { text: inputText.split('\n')[0] || "Sample text paragraph being analyzed.", score: 85, status: "Likely AI" },
          { text: "Detailed analysis suggests robotic sentence structure and low variance.", score: 12, status: "Natural" }
        ]
      });
    }, 4500);
  };

  const clearInput = () => {
    setInputText('');
    setResults(null);
  };

  const getButtonLabel = () => {
    switch (toolId) {
      case 'ai-detector': return "Run AI Detection";
      case 'humanizer': return "Convert to Human";
      case 'grammar-fix': return "Fix All Grammar";
      case 'ai-summarizer': return "Generate Summary";
      case 'plagiarism-check': return "Check Originality";
      default: return "Process Content";
    }
  };

  const id = React.useId().replace(/:/g, "");

  return (
    <section 
      id={`workspace-${id}`}
      className="py-[100px] relative"
    >
      <style>{`
        #workspace-${id} {
          --tool-color: ${categoryColor};
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Workspace Container */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          
          {/* 1. INPUT PANEL */}
          <div className="flex flex-col h-full bg-[#0D0D0F] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 relative z-10">
              <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
                <button 
                  onClick={() => setInputMode('paste')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2",
                    inputMode === 'paste' ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"
                  )}
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  Paste
                </button>
                <button 
                  onClick={() => setInputMode('upload')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2",
                    inputMode === 'upload' ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"
                  )}
                >
                  <FileUp className="w-3.5 h-3.5" />
                  Upload
                </button>
              </div>

              <button 
                onClick={clearInput}
                aria-label="Clear input"
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all group"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Input Content */}
            <div className="flex-1 p-6 relative z-10">
              <AnimatePresence mode="wait">
                {inputMode === 'paste' ? (
                  <motion.div key="paste" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full relative">
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter your content here..."
                      className="w-full h-full min-h-[350px] bg-transparent border-none text-lg text-white/80 leading-relaxed placeholder:text-white/10 focus:ring-0 resize-none font-sans"
                    />
                    <div className="absolute bottom-0 right-0 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                      <span>{inputText.split(/\s+/).filter(x => x).length} Words</span>
                      <span>{inputText.length} Chars</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="upload" 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-[350px] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center group hover:bg-white/[0.02] transition-all"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileUp className="w-6 h-6 text-white/30" />
                    </div>
                    <p className="text-sm font-bold text-white/60">Drop file here or click to browse</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Action */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Intelligence Level</span>
                  <div className="flex gap-1">
                    {['PRO', 'ULTRA'].map(m => (
                      <button 
                        key={m} 
                        onClick={() => setSelectedModel(m === 'PRO' ? 'pro' : 'preview')}
                        className={cn(
                          "px-3 py-1 rounded-md text-[9px] font-black border transition-all",
                          (selectedModel === 'pro' && m === 'PRO') || (selectedModel === 'preview' && m === 'ULTRA') 
                            ? "bg-white text-black border-white" 
                            : "text-white/30 border-white/5 hover:border-white/20"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleProcess}
                disabled={isProcessing || !inputText}
                className="w-full py-5 rounded-[20px] text-white font-black text-sm uppercase tracking-[0.3em] transition-all duration-500 overflow-hidden relative group disabled:opacity-30 bg-[var(--tool-color)] shadow-[0_20px_40px_color-mix(in_srgb,var(--tool-color)_40%,transparent)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{loadingText}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    {getButtonLabel()}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* 2. OUTPUT PANEL */}
          <div className="flex flex-col h-full bg-[#0D0D0F] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {!results && !isProcessing ? (
                <motion.div 
                  key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8">
                    <Bot className="w-10 h-10 text-white/10" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">System Ready</h3>
                  <p className="text-sm text-white/30 leading-relaxed max-w-[280px]">Input text to begin forensic analysis and humanization.</p>
                </motion.div>
              ) : isProcessing ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 p-8">
                  <div className="space-y-6">
                    {[90, 70, 85, 40].map((w, i) => (
                      <div key={i} className="h-4 bg-white/5 rounded-lg overflow-hidden relative">
                        <motion.div 
                          animate={{ x: ['-100%', '200%'] }} 
                          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.2 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
                  
                  {/* Results Header: Score */}
                  <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Confidence Score</h4>
                      <div className="text-5xl font-black font-display text-silver-matte text-[var(--tool-color)]">
                        {results.score}%
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setViewMode('output')}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                          viewMode === 'output' ? "bg-white text-black border-white" : "text-white/30 border-white/5"
                        )}
                      >
                        Output
                      </button>
                      <button 
                        onClick={() => setViewMode('compare')}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                          viewMode === 'compare' ? "bg-white text-black border-white" : "text-white/30 border-white/5"
                        )}
                      >
                        Compare
                      </button>
                    </div>
                  </div>

                  {/* Detailed Analysis / Comparisons */}
                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {viewMode === 'output' ? (
                      <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                          {results.stats.map((stat: any) => (
                            <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                              <span className="text-[9px] font-black uppercase tracking-widest text-white/20 block mb-2">{stat.label}</span>
                              <span className="text-lg font-bold text-white block">{stat.value}%</span>
                            </div>
                          ))}
                        </div>

                        {/* Output Content */}
                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 relative">
                          <div className="absolute top-4 right-4 flex gap-2">
                             <button aria-label="Copy output content" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                               <Copy className="w-3.5 h-3.5 text-white/30" />
                             </button>
                          </div>
                          <p className="text-[16px] text-white/70 leading-[1.8]">{results.outputContent}</p>
                        </div>

                        {/* Breakdown */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block">Paragraph Breakdown</span>
                          {results.paragraphs.map((p: any, i: number) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 items-center">
                              <div className={cn("w-2 h-2 rounded-full", p.score > 50 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]")} />
                              <p className="flex-1 text-xs text-white/40 truncate">{p.text}</p>
                              <span className="text-[10px] font-black text-white/20">{p.score}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-8 h-full">
                        <div className="space-y-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-red-400/50 block">Original AI Content</span>
                          <p className="text-sm text-white/30 leading-relaxed italic">{results.originalText}</p>
                        </div>
                        <div className="space-y-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/50 block">Humanized Output</span>
                          <p className="text-sm text-white/80 leading-relaxed">{results.outputContent}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Related Actions */}
                  <div className="p-8 bg-white/[0.02] border-t border-white/5">
                    <div className="flex flex-wrap gap-3">
                      <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                        <Download className="w-4 h-4" /> Download PDF
                      </button>
                      {toolId === 'grammar-fix' && (
                        <Link to="/tools/ai-detector" className="px-6 py-3 rounded-xl bg-violet-600/20 border border-violet-500/20 text-xs font-bold text-violet-400 hover:bg-violet-600/30 transition-all flex items-center gap-2">
                          <Search className="w-4 h-4" /> Check for AI
                        </Link>
                      )}
                      {toolId === 'ai-detector' && (
                        <Link to="/tools/humanizer" className="px-6 py-3 rounded-xl bg-emerald-600/20 border border-emerald-500/20 text-xs font-bold text-emerald-400 hover:bg-emerald-600/30 transition-all flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Humanize Text
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
