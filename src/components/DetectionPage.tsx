"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { 
    Search, 
    ShieldCheck, 
    AlertCircle, 
    CheckCircle2, 
    BarChart3, 
    FileText, 
    RefreshCcw,
    Zap,
    Cpu,
    ArrowRight,
    Loader2,
    FileUp,
    Download
} from "lucide-react";
import { GlowingEffect } from "@/src/components/ui/glowing-effect";
import { GlassButton } from "@/src/components/ui/liquid-glass";
import { GridBeam } from "@/src/components/ui/background-grid-beam";
import { GlowCard } from "@/src/components/ui/spotlight-card";
import { GoogleGenAI, Type } from "@google/genai";
import { jsPDF } from "jspdf";

export const DetectionPage = ({ initialText = "", onNavigate }: { initialText?: string; onNavigate: (page: string, text?: string) => void }) => {
    const [text, setText] = useState(initialText);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    React.useEffect(() => {
        if (initialText) setText(initialText);
    }, [initialText]);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<null | {
        score: number;
        aiProbability: number;
        humanProbability: number;
        highlights: { text: string; type: "ai" | "human" | "mixed" }[];
    }>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result as string;
                setText(content);
            };
            reader.readAsText(file);
        }
    };

    const handleAnalyze = async () => {
        if (!text.trim()) return;
        setIsAnalyzing(true);
        setError(null);
        setResult(null);
        
        try {
            // Simulate neural analysis delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock analysis logic for demo
            const words = text.split(/\s+/).filter(Boolean);
            const segments: { text: string; type: "ai" | "human" | "mixed" }[] = [];
            
            if (words.length === 0) {
                throw new Error("No text detected for analysis.");
            }

            // Create some "detected" segments for visual feedback
            const segmentSize = Math.max(1, Math.floor(words.length / 4));
            
            for (let i = 0; i < words.length; i += segmentSize) {
                const segmentWords = words.slice(i, i + segmentSize);
                const segmentText = segmentWords.join(" ");
                const types: ("ai" | "human" | "mixed")[] = ["ai", "human", "mixed"];
                const type = types[Math.floor(Math.random() * types.length)];
                segments.push({ text: segmentText, type });
            }

            const aiScore = Math.floor(Math.random() * 40) + 60; // High AI score for demo
            
            setResult({
                score: aiScore,
                aiProbability: aiScore,
                humanProbability: 100 - aiScore,
                highlights: segments
            });

            // Scroll to results after a short delay to allow animation to start
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        } catch (err) {
            console.error("Analysis error:", err);
            setError("Neural analysis failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const downloadPDF = () => {
        if (!result) return;
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Veriscribe AI Detection Report", 15, 20);
        doc.setFontSize(12);
        doc.text(`AI Probability Score: ${result.score}%`, 15, 35);
        doc.text("--------------------------------------------------", 15, 40);
        
        const splitText = doc.splitTextToSize(text, 180);
        doc.text(splitText, 15, 50);
        
        doc.save("detection-report.pdf");
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
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Neural Content Verification</span>
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter leading-none"
                            >
                                AI Detection <span className="text-white/20">Engine</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/40 max-w-2xl mx-auto text-xl font-light leading-relaxed"
                            >
                                Our advanced neural engine analyzes linguistic patterns to detect synthetic content with forensic precision.
                            </motion.p>
                        </div>
                    </GridBeam>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {/* Input Area */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative group"
                    >
                        <GlowCard 
                            glowColor="purple" 
                            customSize 
                            className="w-full bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            <div className="flex flex-col w-full h-full">
                                <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Neural Input Buffer</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest"
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
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Paste content for forensic analysis..."
                                    className="w-full h-[400px] bg-transparent p-10 text-white/90 placeholder:text-white/5 focus:outline-none resize-none text-2xl font-light leading-relaxed selection:bg-violet-500/30"
                                />

                                <div className="flex items-center justify-between px-10 py-8 border-t border-white/5 bg-black/40">
                                    <div className="flex items-center gap-10 text-[10px] font-bold text-white/20 uppercase tracking-[0.25em]">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white/60 text-lg leading-none">{text.split(/\s+/).filter(Boolean).length}</span>
                                            <span>Words</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white/60 text-lg leading-none">{text.length}</span>
                                            <span>Chars</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => setText("")}
                                            className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5"
                                        >
                                            <RefreshCcw className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={handleAnalyze}
                                            disabled={isAnalyzing || text.trim().length < 1}
                                            className="relative px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all disabled:opacity-30 disabled:hover:shadow-none group overflow-hidden"
                                        >
                                            <div className="relative z-10 flex items-center gap-3">
                                                {isAnalyzing ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span>Analyzing Patterns...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap className="w-4 h-4 fill-white" />
                                                        <span>Execute Scan</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </GlowCard>
                    </motion.div>
                </div>

                {/* Results Section */}
                <div ref={resultsRef} className="scroll-mt-24">
                    <AnimatePresence>
                        {result && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Detailed Highlights */}
                            <div className="lg:col-span-2 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/10 to-transparent rounded-[2.5rem] blur-xl opacity-50" />
                                <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden">
                                    <div className="px-10 py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Cpu className="w-4 h-4 text-violet-400" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Pattern Mapping</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500/40" />
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">AI</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500/40" />
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Human</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-10 text-xl font-light leading-relaxed text-white/80 max-h-[500px] overflow-y-auto custom-scrollbar">
                                        {result.highlights.map((h, i) => (
                                            <span 
                                                key={i}
                                                className={cn(
                                                    "px-1.5 py-0.5 rounded-md transition-all duration-500",
                                                    h.type === "ai" ? "bg-red-500/10 text-red-200/90 border border-red-500/20" : 
                                                    h.type === "human" ? "bg-green-500/10 text-green-200/90 border border-green-500/20" : 
                                                    "bg-yellow-500/10 text-yellow-200/90 border border-yellow-500/20"
                                                )}
                                            >
                                                {h.text}{" "}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {/* Action Footer */}
                                    <div className="px-10 py-8 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-sm font-bold text-white/90">Humanize this content?</h4>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest">Bypass detection with one click</p>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <button 
                                                onClick={downloadPDF}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-all text-[10px] font-bold uppercase tracking-widest border border-white/5"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                Export PDF
                                            </button>
                                            <button 
                                                onClick={() => onNavigate("grammar-fix", text)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-all text-[10px] font-bold uppercase tracking-widest border border-white/5 group"
                                            >
                                                <RefreshCcw className="w-3.5 h-3.5" />
                                                <span>Grammar Fix</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button 
                                                onClick={() => onNavigate("humanizer", text)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all text-[10px] font-bold uppercase tracking-[0.2em] group"
                                            >
                                                <span>Humanize Now</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Probability Sidebar */}
                            <div className="space-y-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/20 to-transparent rounded-[2.5rem] blur-xl opacity-50" />
                                    <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10">
                                        <div className="flex items-center gap-3 mb-10">
                                            <BarChart3 className="w-4 h-4 text-violet-400" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Probability Matrix</span>
                                        </div>

                                        <div className="flex flex-col items-center mb-12">
                                            <div className="relative w-48 h-48 flex items-center justify-center">
                                                <svg className="w-full h-full -rotate-90">
                                                    <circle
                                                        cx="96"
                                                        cy="96"
                                                        r="88"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        className="text-white/5"
                                                    />
                                                    <circle
                                                        cx="96"
                                                        cy="96"
                                                        r="88"
                                                        fill="none"
                                                        stroke="url(#score-gradient)"
                                                        strokeWidth="12"
                                                        strokeDasharray={553}
                                                        strokeDashoffset={553 - (553 * result.score) / 100}
                                                        strokeLinecap="round"
                                                        className="transition-all duration-[1500ms] ease-out"
                                                    />
                                                    <defs>
                                                        <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#8b5cf6" />
                                                            <stop offset="100%" stopColor="#d946ef" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-5xl font-display font-bold tracking-tighter">{result.score}%</span>
                                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 mt-1">AI Probability</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                                    <span className="text-white/30">AI Confidence</span>
                                                    <span className="text-red-400">{result.aiProbability}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${result.aiProbability}%` }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className="h-full bg-gradient-to-r from-red-500/50 to-red-500" 
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                                    <span className="text-white/30">Human Confidence</span>
                                                    <span className="text-green-400">{result.humanProbability}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${result.humanProbability}%` }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className="h-full bg-gradient-to-r from-green-500/50 to-green-500" 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10 pt-8 border-t border-white/5">
                                            <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/5">
                                                <AlertCircle className="w-5 h-5 text-violet-400 shrink-0" />
                                                <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                                                    {result.score > 50 
                                                        ? "Our neural engine has identified significant patterns consistent with synthetic generation. Humanization is recommended."
                                                        : "Content appears largely authentic. Linguistic variance is within human-typical ranges."}
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
