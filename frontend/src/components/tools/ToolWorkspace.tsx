import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { 
  FileUp, 
  Clipboard, 
  Search, 
  UserRound, 
  Type, 
  FileSearch, 
  Shield, 
  BookOpen,
  Download,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  ArrowRight
} from 'lucide-react';

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
  const [loadingText, setLoadingText] = useState('Analyzing your document...');
  const [selectedModel, setSelectedModel] = useState<'fast' | 'pro' | 'preview'>('pro');

  // Loading text rotation
  useEffect(() => {
    if (isProcessing) {
      const texts = [
        "Analyzing your document...",
        "Running AI detection models...",
        "Processing complete..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleProcess = () => {
    if (!inputText && inputMode === 'paste') return;
    setIsProcessing(true);
    setResults(null);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setResults({
        score: 72,
        humanScore: 28,
        paragraphs: [
          { text: "This is a sample paragraph that might be flagged as AI generated.", score: 85 },
          { text: "This is another paragraph that looks more human-written.", score: 15 }
        ]
      });
    }, 4000);
  };

  const getButtonLabel = () => {
    switch (toolId) {
      case 'ai-detector': return "🔍 Detect AI Content";
      case 'humanizer': return "✍️ Humanize Text";
      case 'grammar-fix': return "✅ Fix Grammar";
      case 'ai-summarizer': return "📋 Summarize Now";
      case 'plagiarism-check': return "🛡️ Check Originality";
      case 'citation-generator': return "📚 Generate Citation";
      default: return "Process Now";
    }
  };

  const getEmptyStateHint = () => {
    switch (toolId) {
      case 'ai-detector': return "Paste or upload your text to begin detection";
      case 'humanizer': return "Your humanized text will appear here";
      case 'grammar-fix': return "Fixed text with tracked changes will appear here";
      case 'ai-summarizer': return "Your summary will appear here";
      case 'plagiarism-check': return "Originality report and matched sources will appear here";
      case 'citation-generator': return "Your formatted citation will appear here";
      default: return "Results will appear here";
    }
  };

  return (
    <section className="py-[60px] md:py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[4%]">
          
          {/* LEFT PANEL - INPUT */}
          <div className="w-full lg:w-[48%] bg-white/5 border border-white/10 rounded-[24px] p-6 shadow-2xl backdrop-blur-sm">
            {/* Input Mode Tabs */}
            <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-xl">
              <button 
                onClick={() => setInputMode('paste')}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2",
                  inputMode === 'paste' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
                )}
              >
                <Clipboard className="w-4 h-4" />
                Paste Text
              </button>
              <button 
                onClick={() => setInputMode('upload')}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2",
                  inputMode === 'upload' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
                )}
              >
                <FileUp className="w-4 h-4" />
                Upload File
              </button>
            </div>

            {/* Input Area */}
            <AnimatePresence mode="wait">
              {inputMode === 'paste' ? (
                <motion.div 
                  key="paste"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative"
                >
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your text here or start typing..."
                    className="w-full min-h-[280px] max-h-[500px] p-5 bg-white/[0.03] border border-white/10 rounded-2xl text-[15px] text-white leading-[1.8] placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300 resize-y font-sans"
                  />
                  <div className="absolute bottom-4 right-4 text-[11px] font-bold tracking-widest text-white/20 uppercase">
                    {inputText.length.toLocaleString()} characters
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="h-[280px] border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02] flex flex-col items-center justify-center group hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      <FileUp className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[16px] font-bold text-white">Drag your file here</p>
                    <p className="text-[14px] text-white/40 my-1">or</p>
                    <button className="mt-2 px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all">
                      Browse Files
                    </button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['PDF', 'DOCX', 'TXT'].map(ext => (
                      <span key={ext} className="bg-white/5 px-3 py-1 rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">
                        {ext}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Model Selector & Options */}
            <div className="mt-6 space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold mb-3 block">Select Model</label>
                <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-xl">
                  {[
                    { id: 'fast', label: 'Fast', desc: 'Speed focus' },
                    { id: 'pro', label: 'Pro', desc: 'High accuracy' },
                    { id: 'preview', label: 'Preview', desc: 'Next-gen' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m.id as any)}
                      className={cn(
                        "flex flex-col items-center py-2 rounded-lg transition-all duration-200",
                        selectedModel === m.id ? "bg-white/10 text-white shadow-sm" : "text-white/20 hover:text-white/40"
                      )}
                    >
                      <span className="text-xs font-bold">{m.label}</span>
                      <span className="text-[9px] opacity-60 font-medium">{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Deep Scan</span>
                    <span className="text-[11px] text-white/40">Enhanced multi-layer analysis</span>
                  </div>
                  <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer group">
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white/40 rounded-full shadow-sm group-hover:bg-white/60 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button 
              onClick={handleProcess}
              disabled={isProcessing || (!inputText && inputMode === 'paste')}
              className={cn(
                "w-full h-[56px] mt-6 rounded-2xl text-white font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group relative",
                (isProcessing || (!inputText && inputMode === 'paste')) ? "opacity-40 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
              )}
              style={{ 
                backgroundColor: categoryColor,
                boxShadow: (!isProcessing && inputText) ? `0 10px 30px ${categoryColor}40` : 'none'
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">{getButtonLabel()}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* RIGHT PANEL - OUTPUT */}
          <div className="w-full lg:w-[48%] bg-white/5 border border-white/10 rounded-[24px] p-6 shadow-2xl backdrop-blur-sm min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {!isProcessing && !results ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <div className="text-[32px] animate-pulse">✨</div>
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-2">Ready to Analyze</h3>
                  <p className="text-[14px] text-white/40 max-w-[280px] leading-relaxed">{getEmptyStateHint()}</p>
                </motion.div>
              ) : isProcessing ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-center"
                >
                  <div className="space-y-6 mb-12">
                    {[100, 85, 92, 60].map((w, i) => (
                      <div key={i} className="h-3 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: i * 0.2 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        />
                        <div className="h-full bg-white/[0.02]" style={{ width: `${w}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40 animate-pulse">{loadingText}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Result Header */}
                  <div className="text-center mb-10 p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 blur-3xl" style={{ backgroundColor: categoryColor }} />
                    <div className="relative z-10">
                      <div className="text-[64px] font-bold leading-none mb-2 font-display" style={{ color: categoryColor }}>
                        {results.score}%
                      </div>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                        AI Content Probability
                      </div>
                    </div>
                  </div>

                  {/* Paragraph Breakdown */}
                  <div className="space-y-4 flex-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold block">Detailed Analysis</label>
                    {results.paragraphs.map((p: any, i: number) => (
                      <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 group hover:bg-white/[0.05] transition-all duration-300">
                        <p className="text-[15px] text-white/80 leading-relaxed mb-4">{p.text}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.score > 50 ? '#EF4444' : '#10B981' }} />
                            <span className={cn(
                              "text-[11px] font-bold uppercase tracking-widest",
                              p.score > 50 ? "text-red-400" : "text-emerald-400"
                            )}>
                              {p.score > 50 ? 'Likely AI' : 'Likely Human'}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-white/20">{p.score}% Match</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-white/60 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5">
                      <Download className="w-4 h-4" />
                      Report
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-white/60 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5">
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}} />
    </section>
  );
};
