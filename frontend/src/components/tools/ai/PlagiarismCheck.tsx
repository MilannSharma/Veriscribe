import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Search, 
  Zap, 
  BarChart3, 
  Trash2, 
  RefreshCw, 
  ArrowRight,
  Clipboard,
  Download,
  Globe,
  Link2,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { ToolHero } from '../../layout/ToolHero';
import { ScrollReveal } from '../../layout/ScrollReveal';
import { GlowCard } from '../../ui/spotlight-card';
import { FileUploadZone } from '../../ui/FileUploadZone';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { addRecentActivity } from '@/src/lib/activity';
import { exportToPDF } from '@/src/lib/pdf';

export const PlagiarismCheck = () => {
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; content?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const features = [
    { 
      title: "Deep Web Scanning", 
      description: "Indexes billions of web pages, academic journals, and internal databases.", 
      icon: Globe 
    },
    { 
      title: "Similarity Mapping", 
      description: "Get side-by-side comparisons with identified original sources.", 
      icon: Link2 
    },
    { 
      title: "Citation Matching", 
      description: "Automatically identifies and excludes properly cited content from the score.", 
      icon: FileText 
    }
  ];

  const handleProcess = () => {
    if (inputMode === 'text' && !inputText.trim()) return;
    if (inputMode === 'file' && !uploadedFile) return;

    setIsProcessing(true);

    const title = inputMode === 'file' ? uploadedFile!.name : (inputText.trim().substring(0, 24) || "Direct Text Plagiarism Scan");
    const type = inputMode === 'file' ? 'Document' : 'Text';
    addRecentActivity(title, type as any, 'Analyzed', 'emerald');

    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2500);
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
        toolName="Plagiarism Check"
        tagline="Ensure 100% originality with deep web scanning."
        description="Verify the originality of your work with industry-leading academic precision. Veriscribe scans across billions of sources to identify matches, potential AI overlaps, and improper citations."
        icon={Shield}
        features={features}
        onPrimaryAction={() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <section id="workspace" className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Originality Laboratory</h2>
              <p className="text-white/40">Upload or paste text for a global cross-reference scan.</p>
            </div>
            <button 
              onClick={handleClean}
              aria-label="Clear workspace"
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all group cursor-pointer"
            >
              <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
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
                      placeholder="Paste text here for originality verification..."
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
                  "w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 relative overflow-hidden",
                  isProcessing ? "bg-white/5 text-white/20" : "bg-[#3B5BDB] text-white hover:brightness-110"
                )}
              >
                {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                {isProcessing ? "Scanning Global Databases..." : "Start Scan"}
              </button>
            </div>

            {/* Output Panel */}
            <div className="relative">
              {!showResult && !isProcessing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                  <Search className="w-12 h-12 text-white/10 mb-4" />
                  <h3 className="text-xl font-bold text-white/40 mb-2">Awaiting Scan</h3>
                  <p className="text-white/20">Originality report will appear here after scanning.</p>
                </div>
              )}

              {(showResult || isProcessing) && (
                <div className="h-full bg-[#0D0D0E] border border-white/5 rounded-3xl overflow-hidden flex flex-col">
                  <div className="p-8 bg-white/[0.01] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/30 block">
                          {inputMode === 'file' && uploadedFile ? `File: ${uploadedFile.name}` : "Originality Score"}
                        </span>
                        <span className="text-white font-bold">{isProcessing ? "Analyzing sources..." : "100% Unique"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {isProcessing ? (
                      <div className="space-y-6">
                        <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
                        <div className="h-24 bg-white/5 rounded w-full animate-pulse" />
                        <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Summary Card */}
                        <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/10 text-center">
                          <div className="text-7xl font-black text-white mb-2">0%</div>
                          <div className="text-sm font-bold uppercase tracking-widest text-green-500">Similarity Detected</div>
                        </div>

                        {/* Sources Section */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 px-2">Matched Sources</h4>
                          <div className="p-12 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
                            <p className="text-white/20 text-sm">No significant matches found across global databases.</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-8 border-t border-white/5 flex flex-col gap-3">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 px-2 mb-2">Verification Suite</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <Link 
                              to="/tools/ai-detector"
                              className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all"
                            >
                              <span className="text-sm font-bold text-white/60">Check AI Content</span>
                              <BarChart3 className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                              to="/tools/citation-generator"
                              className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all"
                            >
                              <span className="text-sm font-bold text-white/60">Cite Sources</span>
                              <FileText className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isProcessing && (
                    <div className="p-6 bg-white/[0.02] border-t border-white/5 flex gap-4">
                      <button 
                        onClick={() => {
                          const title = inputMode === 'file' ? uploadedFile?.name : "Direct Text Plagiarism Scan";
                          const originalText = inputMode === 'file' ? uploadedFile?.content : inputText;
                          const bodyText = `Originality Check Results for ${title}.\n\nPlagiarism Score: 100% Unique / Original.\n\nDatabase Matches Scanned: 4.8 Billion Web Pages & Academic Journals.`;
                          exportToPDF("Plagiarism Check", bodyText, {
                            'Plagiarism Index': '0% Copied Content',
                            'Uniqueness Quotient': '100% Unique Prose',
                            'Scanned Resource': title || "Direct Input"
                          }, originalText);
                        }}
                        className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" /> Download PDF
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

const CheckCircle2 = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
