import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileUp, 
  Download, 
  Check, 
  ArrowRight, 
  Copy,
  Sparkles,
  Loader2,
  AlertCircle,
  Search,
  User,
  Zap,
  RefreshCcw,
  Cpu,
  PenTool,
  SpellCheck,
  Eraser,
  FileText
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { jsPDF } from "jspdf";
import { cn } from "@/src/lib/utils";
import { GridBeam } from "@/src/components/ui/background-grid-beam";
import { GlowCard } from "@/src/components/ui/spotlight-card";

export const GrammarFixPage = ({ initialText = "", onNavigate }: { initialText?: string; onNavigate: (page: string, text?: string) => void }) => {
  const [inputText, setInputText] = useState(initialText);
  const [correctedText, setCorrectedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [diffs, setDiffs] = useState<{ type: "equal" | "delete" | "insert", value: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInputText(content);
      };
      reader.readAsText(file);
    }
  };

  const processGrammar = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const prompt = `Act as a professional editor. Fix the grammar, spelling, and punctuation of the following text. Maintain the original tone and style. Return ONLY the corrected text without any explanations or preamble.\n\nText: ${inputText}`;
      
      const result = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: [{ parts: [{ text: prompt }] }]
      });
      const text = result.text || "";
      setCorrectedText(text);
      
      // Simple diff logic (word by word for better visualization)
      const originalWords = inputText.split(/\s+/);
      const correctedWords = text.split(/\s+/);
      
      // For a real production app, we'd use a library like 'diff'
      // Here we'll do a basic comparison for highlighting
      const newDiffs: { type: "equal" | "delete" | "insert", value: string }[] = [];
      
      // This is a very simplified diff for demonstration
      // In a real scenario, we'd use a proper LCS algorithm
      let i = 0, j = 0;
      while (i < originalWords.length || j < correctedWords.length) {
        if (i < originalWords.length && j < correctedWords.length && originalWords[i] === correctedWords[j]) {
          newDiffs.push({ type: "equal", value: originalWords[i] + " " });
          i++; j++;
        } else {
          if (i < originalWords.length) {
            newDiffs.push({ type: "delete", value: originalWords[i] + " " });
            i++;
          }
          if (j < correctedWords.length) {
            newDiffs.push({ type: "insert", value: correctedWords[j] + " " });
            j++;
          }
        }
      }
      setDiffs(newDiffs);

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

    } catch (error) {
      console.error("Error processing grammar:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(correctedText, 180);
    doc.text(splitText, 15, 20);
    doc.save("corrected-text.pdf");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(correctedText);
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 pb-24 px-6"
    >
        <div className="max-w-7xl mx-auto">
            <div className="relative mb-16 rounded-[3rem] overflow-hidden border border-white/5">
                <GridBeam className="py-20 px-10">
                    <div className="flex flex-col items-center text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                        >
                            <PenTool className="w-3.5 h-3.5" />
                            <span>Neural Grammar Refinement</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter leading-none"
                        >
                            Grammar <span className="text-white/20">Fix</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/40 max-w-2xl text-lg font-light leading-relaxed"
                        >
                            Surgical precision in correcting syntax, punctuation, and linguistic flow using advanced neural models.
                        </motion.p>
                    </div>
                </GridBeam>
            </div>

            <div className="grid grid-cols-1 gap-12">
                {/* Input Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative group"
                >
                    <GlowCard 
                        glowColor="blue" 
                        customSize 
                        className="w-full bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col w-full h-full min-h-[400px]">
                            <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <Cpu className="w-4 h-4 text-violet-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Source Text</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-[11px] font-bold uppercase tracking-widest"
                                    >
                                        <FileUp className="w-3.5 h-3.5" />
                                        Upload
                                    </button>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleFileUpload} 
                                        className="hidden" 
                                        accept=".txt,.doc,.docx"
                                    />
                                </div>
                            </div>

                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Paste your text here for neural grammar refinement..."
                                className="w-full flex-1 bg-transparent p-10 text-white/90 placeholder:text-white/10 focus:outline-none resize-none text-2xl font-light leading-relaxed selection:bg-violet-500/30"
                            />
                            
                            <div className="flex items-center justify-between px-10 py-6 border-t border-white/5 bg-black/40">
                                <div className="flex items-center gap-8 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-3.5 h-3.5 text-violet-500/50" />
                                        <span>{wordCount} Words</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Search className="w-3.5 h-3.5 text-violet-500/50" />
                                        <span>{charCount} Chars</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => setInputText("")}
                                        className="p-3 rounded-full hover:bg-white/5 text-white/20 hover:text-white/60 transition-all border border-white/5"
                                    >
                                        <RefreshCcw className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={processGrammar}
                                        disabled={isProcessing || !inputText.trim()}
                                        className="relative px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all disabled:opacity-30 disabled:hover:shadow-none group overflow-hidden"
                                    >
                                        <div className="relative z-10 flex items-center gap-3">
                                            {isProcessing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4" />
                                                    <span>Fix with Veriscribe</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </GlowCard>
                </motion.div>
            </div>

        {/* Output Card */}
        <div ref={resultsRef} className="scroll-mt-24">
          <AnimatePresence>
            {correctedText && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12"
              >
                {/* Main Report Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
                  <div className="relative bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full">
                    <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Corrected Version</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Neural Refinement Applied</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={copyToClipboard}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={downloadPDF}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-10 flex-1 text-xl font-light leading-relaxed text-white/80 max-h-[500px] overflow-y-auto custom-scrollbar">
                      {correctedText}
                    </div>

                    {/* Action Footer */}
                    <div className="px-10 py-8 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-bold text-white/90">Next Steps?</h4>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Verify or humanize your result</p>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <button 
                          onClick={() => onNavigate("detection", correctedText)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-all text-[10px] font-bold uppercase tracking-widest border border-white/5 group"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>AI Detection</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                          onClick={() => onNavigate("humanizer", correctedText)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all text-[10px] font-bold uppercase tracking-[0.2em] group"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Humanize Result</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Probability Sidebar (Visual Diff) */}
                <div className="space-y-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/20 to-transparent rounded-[2.5rem] blur-xl opacity-50" />
                    <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10">
                      <div className="flex items-center gap-3 mb-10">
                        <Search className="w-4 h-4 text-violet-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Visual Diff Analysis</span>
                      </div>

                      <div className="p-6 rounded-[2rem] bg-black/40 border border-white/5 text-sm font-light leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
                        {diffs.map((diff, idx) => (
                          <span 
                            key={idx} 
                            className={cn(
                              diff.type === "delete" && "bg-red-500/20 text-red-400 line-through mx-0.5 px-1 rounded",
                              diff.type === "insert" && "bg-green-500/20 text-green-400 mx-0.5 px-1 rounded font-medium",
                              diff.type === "equal" && "text-white/60"
                            )}
                          >
                            {diff.value}
                          </span>
                        ))}
                      </div>

                      <div className="mt-10 pt-8 border-t border-white/5">
                        <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/5">
                          <AlertCircle className="w-5 h-5 text-violet-400 shrink-0" />
                          <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                            Linguistic corrections have been applied. The visual diff highlights removals (red) and neural insertions (green).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto px-4 pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              Note: Use this tool wisely. No illegal activity is allowed. VeriScribe is not responsible.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
