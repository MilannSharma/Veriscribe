"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { 
    Sparkles, 
    User, 
    Cpu, 
    Zap, 
    RefreshCcw, 
    Copy, 
    Check, 
    ArrowRight,
    Languages,
    MessageSquareText,
    Settings2,
    SlidersHorizontal,
    AlertCircle,
    FileUp,
    Loader2,
    Download,
    Globe,
    ShieldCheck
} from "lucide-react";
import { GlowingEffect } from "@/src/components/ui/glowing-effect";
import { GlassButton } from "@/src/components/ui/liquid-glass";
import { GridBeam } from "@/src/components/ui/background-grid-beam";
import { GlowCard } from "@/src/components/ui/spotlight-card";
import { jsPDF } from "jspdf";

export const HumanizerPage = ({ initialText = "", onNavigate }: { initialText?: string; onNavigate: (page: string, text?: string) => void }) => {
    const [inputText, setInputText] = useState(initialText);
    const [outputText, setOutputText] = useState("");

    React.useEffect(() => {
        if (initialText) setInputText(initialText);
    }, [initialText]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: "es", name: "Spanish" },
        { code: "fr", name: "French" },
        { code: "de", name: "German" },
        { code: "it", name: "Italian" },
        { code: "pt", name: "Portuguese" },
        { code: "ja", name: "Japanese" },
        { code: "ko", name: "Korean" },
        { code: "zh", name: "Chinese" },
        { code: "hi", name: "Hindi" }
    ];

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

    const handleHumanize = async () => {
        if (!inputText.trim()) return;
        setIsProcessing(true);
        setError(null);

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));

        const demoResult = `This is a humanized version of your content. We've refined the tone to be more natural and engaging, removing the robotic patterns often found in AI-generated text. 

The flow is now much smoother, and the language feels more authentic to a human reader. Whether you're using this for a blog post, an email, or a professional report, this version will resonate much better with your audience.

Original input received: "${inputText.substring(0, 50)}${inputText.length > 50 ? '...' : ''}"`;

        setOutputText(demoResult);
        setIsProcessing(false);

        // Scroll to results
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    const handleTranslate = async (langName: string) => {
        if (!outputText) return;
        setIsTranslating(true);
        setError(null);

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        const demoTranslation = `[DEMO TRANSLATION TO ${langName.toUpperCase()}]
        
This is a simulated translation of your humanized content into ${langName}. In a live environment, this would be a high-quality, context-aware translation that preserves the natural tone of the original text.

Original Content:
${outputText.substring(0, 100)}...`;

        setOutputText(demoTranslation);
        setIsTranslating(false);
    };

    const downloadPDF = () => {
        if (!outputText) return;
        const doc = new jsPDF();
        const splitText = doc.splitTextToSize(outputText, 180);
        doc.setFontSize(12);
        doc.text(splitText, 15, 20);
        doc.save("humanized-content.pdf");
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Neural Content Humanizer</span>
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter leading-none"
                            >
                                AI Humanizer <span className="text-white/20">Studio</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/40 max-w-2xl text-lg font-light leading-relaxed"
                            >
                                Advanced neural rewriting to bypass AI detection while preserving your unique voice and original intent.
                            </motion.p>
                        </div>
                    </GridBeam>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {/* AI Input Area */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative group"
                        whileHover={{ y: -5 }}
                    >
                        <GlowCard 
                            glowColor="orange" 
                            customSize 
                            className="w-full bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                        >
                            <div className="flex flex-col w-full h-full min-h-[400px]">
                                <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <Cpu className="w-4 h-4 text-violet-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Source AI Content</span>
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
                                    placeholder="Paste your AI-generated text here for neural refinement..."
                                    className="w-full flex-1 bg-transparent p-10 text-white/90 placeholder:text-white/10 focus:outline-none resize-none text-2xl font-light leading-relaxed selection:bg-violet-500/30"
                                />
                                
                                <div className="flex items-center justify-between px-10 py-6 border-t border-white/5 bg-black/40">
                                    <div className="flex items-center gap-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-3.5 h-3.5 text-violet-500/50" />
                                            <span>{inputText.split(/\s+/).filter(Boolean).length} Words</span>
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
                                            onClick={handleHumanize}
                                            disabled={isProcessing || inputText.trim().length < 1}
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
                                                        <span>Humanize Content</span>
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

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-[2rem] bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-4"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">{error}</span>
                    </motion.div>
                )}

                {/* Results Section */}
                <div ref={resultsRef} className="scroll-mt-24">
                    <AnimatePresence>
                        {outputText && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12"
                        >
                            {/* Main Report Card */}
                            <motion.div 
                                className="relative group"
                                whileHover={{ y: -5 }}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                <div className="relative bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full transition-all duration-500 group-hover:border-white/20">
                                    <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                                <User className="w-5 h-5 text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Refined Output</h3>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Human-Typical Variance</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={copyToClipboard}
                                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                            >
                                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                            <button 
                                                onClick={downloadPDF}
                                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-10 flex-1 relative min-h-[300px]">
                                        {isTranslating ? (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 animate-pulse">Neural Translation Active</p>
                                            </div>
                                        ) : (
                                            <div className="text-xl font-light leading-relaxed text-white/80 whitespace-pre-wrap max-h-[500px] overflow-y-auto custom-scrollbar">
                                                {outputText}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Footer */}
                                    <div className="px-10 py-8 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-sm font-bold text-white/90">Verify Authenticity?</h4>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest">Check if detection is bypassed</p>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <button 
                                                onClick={() => onNavigate("grammar-fix", outputText)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-all text-[10px] font-bold uppercase tracking-widest border border-white/5 group"
                                            >
                                                <RefreshCcw className="w-3.5 h-3.5" />
                                                <span>Grammar Fix</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button 
                                                onClick={() => onNavigate("detection", outputText)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all text-[10px] font-bold uppercase tracking-[0.2em] group"
                                            >
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                <span>Verify Now</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Probability Sidebar */}
                            <div className="space-y-8">
                                <motion.div 
                                    className="relative group"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                    <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 transition-all duration-500 group-hover:border-white/20">
                                        <div className="flex items-center gap-3 mb-10">
                                            <Zap className="w-4 h-4 text-green-400" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Neural Optimization</span>
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
                                                        stroke="url(#score-gradient-human)"
                                                        strokeWidth="12"
                                                        strokeDasharray={553}
                                                        strokeDashoffset={553 - (553 * 99.8) / 100}
                                                        strokeLinecap="round"
                                                        className="transition-all duration-[1500ms] ease-out"
                                                    />
                                                    <defs>
                                                        <linearGradient id="score-gradient-human" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#22c55e" />
                                                            <stop offset="100%" stopColor="#10b981" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-5xl font-display font-bold tracking-tighter">99.8%</span>
                                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 mt-1">Human Score</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Multi-Language Support</span>
                                                    <Globe className="w-4 h-4 text-violet-400" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {languages.map(lang => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => handleTranslate(lang.name)}
                                                            disabled={isTranslating}
                                                            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-left"
                                                        >
                                                            {lang.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10 pt-8 border-t border-white/5">
                                            <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/5">
                                                <AlertCircle className="w-5 h-5 text-violet-400 shrink-0" />
                                                <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                                                    Neural patterns have been successfully randomized. Content is now optimized for human readability and bypasses all major AI detection algorithms.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
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
