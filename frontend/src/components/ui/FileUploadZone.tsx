import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileUp, FileText, Trash2, Loader2, Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface FileUploadZoneProps {
  onFileLoaded: (text: string, fileName: string, fileSize: string) => void;
  onClear: () => void;
  acceptedTypesLabel?: string;
  themeColor?: string; // e.g. '#3B5BDB' or '#7950F2'
  layoutMode?: 'button' | 'dropzone';
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileLoaded,
  onClear,
  acceptedTypesLabel = "PDF, DOCX",
  themeColor = "#3B5BDB",
  layoutMode = "button",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFile = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    
    if (extension !== "pdf" && extension !== "docx") {
      alert("Invalid file format. Strictly PDF and DOCX files are allowed!");
      return;
    }

    // Format file size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const sizeLabel = `${sizeInMB} MB`;

    // Reset progress
    setIsParsing(true);
    setParseProgress(0);
    setUploadedFile(null);

    // Simulate robust parsing step
    const interval = setInterval(() => {
      setParseProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsParsing(false);
            setUploadedFile({ name: file.name, size: sizeLabel });
            
            // Generate professional mock document content based on extension/filename
            const mockText = generateMockText(file.name, extension);
            onFileLoaded(mockText, file.name, sizeLabel);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleClear = () => {
    setUploadedFile(null);
    setIsParsing(false);
    setParseProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClear();
  };

  const generateMockText = (fileName: string, extension: string): string => {
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    return `[DOCUMENT SOURCE: ${fileName}]
[METADATA: Format ${extension.toUpperCase()} | Size Detected]

This document, titled "${baseName}", represents a comprehensive analysis and synthesis of modern scientific research. In the contemporary digital age, academic and professional workflows are undergoing rapid paradigm shifts. 

The integration of advanced Large Language Models (LLMs) and context-aware natural language processing engines provides research orchestrators with unprecedented efficiency. However, maintaining absolute document trust remains the paramount standard.

Key structural arguments explored in this paper:
1. Architectural integrity in automated data distillation.
2. The balance between synthetic efficiency and unique cognitive voice.
3. The emergence of forensic linguistic checkers to certify original thought.
4. Seamless citation structures as the foundation of academic merit.

In conclusion, the evolution of intellectual document systems must prioritize author authenticity and secure vector-spaced security layers above basic automation shortcuts.`;
  };

  const getThemeColorClass = (color: string) => {
    if (color === "#7950F2") return "text-[#7950F2]";
    if (color === "#059669") return "text-[#059669]";
    return "text-[#3B5BDB]";
  };

  const getThemeBorderClass = (color: string) => {
    if (color === "#7950F2") return "border-violet-500/30";
    if (color === "#059669") return "border-emerald-500/30";
    return "border-blue-500/30";
  };

  const getThemeBgClass = (color: string) => {
    if (color === "#7950F2") return "bg-violet-500/5";
    if (color === "#059669") return "bg-emerald-500/5";
    return "bg-blue-500/5";
  };

  const getProgressWidthClass = (progress: number) => {
    if (progress <= 0) return "w-0";
    if (progress <= 20) return "w-[20%]";
    if (progress <= 40) return "w-[40%]";
    if (progress <= 60) return "w-[60%]";
    if (progress <= 80) return "w-[80%]";
    return "w-full";
  };

  return (
    <div className="w-full">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx"
        className="hidden"
        id="document-file-upload"
        title="Upload document file"
        placeholder="Upload document file"
      />

      <AnimatePresence mode="wait">
        {layoutMode === "dropzone" ? (
          /* ==================== DROPZONE LAYOUT ==================== */
          <div key="dropzone-container" className="w-full min-h-[400px] flex flex-col items-center justify-center p-8">
            {!uploadedFile && !isParsing ? (
              <motion.div
                key="dropzone-empty"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "w-full h-full min-h-[350px] border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center text-center p-12 cursor-pointer transition-all duration-300 relative group overflow-hidden",
                  isDragOver 
                    ? cn("border-solid", getThemeBorderClass(themeColor), getThemeBgClass(themeColor)) 
                    : "border-white/10 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/20"
                )}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FileUp className={cn("w-8 h-8", getThemeColorClass(themeColor))} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Document</h3>
                <p className="text-white/40 text-sm mb-6 max-w-xs leading-relaxed">
                  Support strictly `.pdf` and `.docx` file formats up to 25MB.
                </p>
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
                >
                  Choose Local File
                </button>
              </motion.div>
            ) : isParsing ? (
              <motion.div
                key="dropzone-parsing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full min-h-[350px] border border-white/5 rounded-[24px] bg-white/[0.01] flex flex-col items-center justify-center p-12 relative overflow-hidden"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 relative">
                  <Loader2 className={cn("w-10 h-10 animate-spin", getThemeColorClass(themeColor))} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight uppercase tracking-widest text-xs">Parsing Document Layout</h3>
                <p className="text-white/40 text-sm mb-8">Analyzing semantic segments... {parseProgress}%</p>
                
                {/* Full-width glowing progress line bar */}
                <div className="w-full max-w-md h-[4px] bg-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className={cn("h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 rounded-full", getProgressWidthClass(parseProgress))} 
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dropzone-preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full h-full min-h-[350px] border border-green-500/20 rounded-[24px] bg-white/[0.02] flex flex-col items-center justify-center p-12 relative shadow-2xl shadow-green-500/[0.01]"
              >
                <div className="w-20 h-20 rounded-[24px] bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                  <FileText className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center max-w-sm truncate" title={uploadedFile.name}>
                  {uploadedFile.name}
                </h3>
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-xs text-white/30">{uploadedFile.size}</span>
                  <span className="text-xs text-white/20">•</span>
                  <span className="inline-flex items-center gap-1 text-xs text-green-400 font-bold uppercase tracking-wider">
                    <Check className="w-4 h-4" /> Ready for Scan
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 text-white/40 hover:text-red-400 transition-all cursor-pointer text-xs font-bold uppercase tracking-wider"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Document</span>
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          /* ==================== COMPACT BUTTON LAYOUT ==================== */
          !uploadedFile && !isParsing ? (
            <motion.button
              key="upload-btn"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileUp className={cn("w-4 h-4", getThemeColorClass(themeColor))} />
              <span>Upload Document</span>
              <span className="text-[10px] opacity-40 lowercase font-normal">({acceptedTypesLabel})</span>
            </motion.button>
          ) : isParsing ? (
            <motion.div
              key="parsing-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-6 w-full max-w-md relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <Loader2 className="w-5 h-5 text-violet-500 animate-spin shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Parsing Document Structure</p>
                  <p className="text-[10px] text-white/40">Analyzing semantic pages... {parseProgress}%</p>
                </div>
              </div>
              <div className={cn("absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300", getProgressWidthClass(parseProgress))} />
            </motion.div>
          ) : (
            <motion.div
              key="preview-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 px-5 rounded-2xl bg-white/[0.03] border border-green-500/20 shadow-lg shadow-green-500/[0.02] flex items-center justify-between gap-6 w-full max-w-lg"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
                  <FileText className="w-5 h-5 text-green-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[300px]" title={uploadedFile.name}>
                    {uploadedFile.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-white/30">{uploadedFile.size}</span>
                    <span className="text-[10px] text-white/20">•</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 text-white/40 hover:text-red-400 transition-all shrink-0 cursor-pointer"
                title="Remove File"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};
