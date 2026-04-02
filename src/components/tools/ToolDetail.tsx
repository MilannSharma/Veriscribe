import { useParams, Link } from "react-router-dom";
import { categories, Tool, Category } from "@/src/data/tools";
import { 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Zap, 
  ShieldCheck,
  Layout,
  FileText,
  Sparkles,
  Search,
  Brain,
  Repeat,
  History,
  Bell,
  LineChart,
  ShieldAlert,
  Bot,
  FileSearch,
  Shield,
  BookOpen,
  Type,
  UserRound,
  Mic,
  Lightbulb,
  RefreshCw,
  BarChart3,
  Scale,
  ClipboardCheck,
  GitCompare
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { GlowCard } from "@/src/components/ui/spotlight-card";
import { ToolHero } from "@/src/components/layout/ToolHero";
import { HowItWorks } from "@/src/components/layout/HowItWorks";
import { ScrollReveal } from "@/src/components/layout/ScrollReveal";
import { ToolWorkspace } from "@/src/components/tools/ToolWorkspace";

export const ToolDetail = () => {
  const { toolId } = useParams();
  
  let currentTool: Tool | undefined;
  let currentCategory: Category | undefined;

  for (const cat of categories) {
    const tool = cat.tools.find(t => t.id === toolId);
    if (tool) {
      currentTool = tool;
      currentCategory = cat;
      break;
    }
  }

  if (!currentTool || !currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <Link to="/" className="text-violet-500 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const relatedTools = currentCategory.tools.filter(t => t.id !== toolId).slice(0, 3);

  const getToolDescription = (id: string) => {
    const descriptions: Record<string, string> = {
      'ai-detector': "Runs 8 independent detection models in parallel to give you a forensic-level AI vs Human confidence score — paragraph by paragraph, with exportable reports.",
      'humanizer': "Rewrites AI-generated text to pass every major detector — GPTZero, Turnitin, Originality.ai — while preserving your original meaning, tone, and voice.",
      'grammar-fix': "Goes beyond spellcheck. Fixes grammar, improves style, rewrites for tone, and scores your readability — all with inline suggestions you can accept or reject.",
      'ai-summarizer': "Condenses any document, URL, or pasted text into a clean, accurate summary. Choose brief, standard, or detailed — in prose or bullet-point format.",
      'plagiarism-check': "Scans your text against billions of web pages and academic sources. Shows exact matched passages, source URLs, and your overall originality score.",
      'citation-generator': "Auto-generates accurate citations from any URL, DOI, or ISBN. Supports APA, MLA, Chicago, Harvard, IEEE, Vancouver, and more.",
      'doc-editor': "A professional editing workspace for every major file format. Open, edit, annotate, and export — with revision history and real-time grammar assist.",
      'doc-studio': "Describe your document in plain language. AI builds the full structure — headings, sections, tables, and formatting — ready to edit and export.",
      'voice-to-doc': "Speak or paste a transcript. AI identifies the document type, fills the correct template, and builds a fully formatted professional document.",
      'smart-notes': "Capture thoughts fast via text, voice, or image. AI organises them, links related notes, and converts clusters into full documents with one click.",
      'adaptive-document': "Write once. AI auto-generates Expert, Executive, Student, and Beginner versions — all linked to your master document and updated automatically.",
      'multi-source-intelligence': "Upload PDFs, audio, video, URLs, and more. AI builds a unified knowledge model. Ask anything. Get structured answers with source citations.",
      'exam-paper-builder': "Upload textbooks, past papers, or notes. AI generates a complete, formatted exam paper — MCQ, essay, short answer — with a separate answer key.",
      'narrative-report-writer': "Upload any CSV or data file. AI writes a complete business report — executive summary, analysis, trend commentary, and recommendations included.",
      'contract-negotiation-coach': "Upload any contract. AI flags risky clauses, predicts counterparty pushback, suggests improved wording, and lets you practice negotiation with AI.",
      'file-converter': "Convert any file to any other format. 40+ conversion types. No quality loss, no file size limits, no watermarks.",
      'smart-form-extractor': "Upload any form — scanned, digital, or handwritten. AI reads every field, extracts label-value pairs, and exports as JSON, CSV, or Excel.",
      'version-reconciler': "Upload two versions of any document. AI produces a plain-English change summary, highlights high-risk edits, and exports a full diff report.",
      'document-archaeology': "AI links all versions, comments, and edits across your document history. Understand what changed, who changed it, and why.",
      'document-resurrector': "AI scans your library for abandoned drafts, shows completeness scores, and generates a full completion in your original tone and style.",
      'staleness-monitor': "Connects to Google Drive and Notion. Watches your source references and alerts you the moment linked content changes — before you share.",
      'document-analytics': "Every shared document becomes a tracked asset. See who read it, how long they spent on each section, where they dropped off, and AI improvement tips.",
      'confidence-scorer': "Every AI answer is backed by a cited confidence score. Every uploaded file is scanned for malicious content and given a verified Trust Shield badge.",
      'knowledge-interview-bot': "AI interviews you with intelligent, adaptive questions. Structures your answers into a polished professional document — SOP, manual, report, or knowledge base."
    };
    return descriptions[id] || currentTool?.description;
  };

  const getToolSteps = (id: string) => {
    const allSteps: Record<string, any[]> = {
      'ai-detector': [
        { title: "Upload or Paste", desc: "Add text or upload any document", icon: "⬆️" },
        { title: "8 Models Analyze", desc: "All detection models run in parallel", icon: "🧠" },
        { title: "Get Full Report", desc: "See AI%, paragraph breakdown, and model results", icon: "📊" }
      ],
      'humanizer': [
        { title: "Upload or Paste", desc: "Add your AI-generated content", icon: "⬆️" },
        { title: "AI Rewrites", desc: "Chosen intensity applied, voice preserved", icon: "✍️" },
        { title: "Passes Detectors", desc: "Download or send to Doc Editor", icon: "✅" }
      ],
      'grammar-fix': [
        { title: "Paste Your Text", desc: "Add any document or text", icon: "⬆️" },
        { title: "AI Fixes & Suggests", desc: "Grammar, style, tone, and flow improved", icon: "✅" },
        { title: "Accept & Export", desc: "Review suggestions, accept all, download", icon: "📥" }
      ],
      'ai-summarizer': [
        { title: "Add Content", desc: "Paste text, upload a file, or enter a URL", icon: "⬆️" },
        { title: "AI Condenses", desc: "Extracts key points and entities", icon: "📋" },
        { title: "Get Your Summary", desc: "Download in DOCX, PDF, or TXT", icon: "📤" }
      ],
      'plagiarism-check': [
        { title: "Upload or Paste", desc: "Add the text you want to check", icon: "⬆️" },
        { title: "Deep Web Scan", desc: "Billions of sources scanned in seconds", icon: "🌐" },
        { title: "Originality Report", desc: "See matched sources, percentages, highlights", icon: "📄" }
      ],
      'citation-generator': [
        { title: "Enter Source", desc: "Paste URL, DOI, ISBN, or fill manually", icon: "🔗" },
        { title: "AI Fetches Data", desc: "Title, author, date, publisher auto-filled", icon: "🤖" },
        { title: "Get Citation", desc: "Format in any style, copy or export", icon: "📚" }
      ]
    };
    return allSteps[id] || [
      { title: "Upload", desc: "Drag and drop your document or paste your text into the workspace.", icon: <FileText className="w-6 h-6" /> },
      { title: "Process", desc: "Our AI models analyze and refine your content in real-time.", icon: <Zap className="w-6 h-6" /> },
      { title: "Download", desc: "Export your perfected document in your preferred format.", icon: <CheckCircle2 className="w-6 h-6" /> }
    ];
  };

  const writingTools = ['ai-detector', 'humanizer', 'grammar-fix', 'ai-summarizer', 'plagiarism-check', 'citation-generator'];
  const isWritingTool = writingTools.includes(currentTool.id);

  const features = [
    { title: "Forensic Accuracy", desc: "Deep analysis powered by 8+ specialized AI models.", icon: <ShieldCheck className="w-5 h-5" /> },
    { title: "Real-time Processing", desc: "Get results in seconds, not minutes.", icon: <Zap className="w-5 h-5" /> },
    { title: "Privacy First", desc: "Your data is encrypted and never stored without permission.", icon: <ShieldCheck className="w-5 h-5" /> },
    { title: "Format Preservation", desc: "Keep your original layout and styling intact.", icon: <Layout className="w-5 h-5" /> }
  ];

  const useCases = [
    { title: "Students", desc: "Perfect your essays and ensure academic integrity.", icon: <Users className="w-5 h-5" /> },
    { title: "Content Creators", desc: "Scale your content production while maintaining a human touch.", icon: <Sparkles className="w-5 h-5" /> },
    { title: "HR Teams", desc: "Screen documents and verify authenticity instantly.", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <ToolHero 
        categoryName={currentCategory.name}
        categoryColor={currentCategory.color}
        toolName={currentTool.name}
        tagline={currentTool.tagline}
        description={getToolDescription(currentTool.id)}
        icon={currentTool.icon}
        onPrimaryAction={() => {
          const workspace = document.getElementById('workspace');
          if (workspace) workspace.scrollIntoView({ behavior: 'smooth' });
        }}
        onSecondaryAction={() => {
          const howItWorks = document.getElementById('how-it-works');
          if (howItWorks) howItWorks.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Workspace Section (Writing Tools Only) */}
      {isWritingTool && (
        <div id="workspace">
          <ToolWorkspace toolId={currentTool.id} categoryColor={currentCategory.color} />
        </div>
      )}

      {/* How It Works Section */}
      <div id="how-it-works">
        <HowItWorks 
          steps={getToolSteps(currentTool.id)} 
          categoryColor={currentCategory.color}
          subtitle={`Experience the power of ${currentTool.name} in three simple steps.`}
        />
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-[80px] border-t border-white/10">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="h-full">
                <GlowCard 
                    glowColor="blue"
                    customSize
                    className="p-8 rounded-[24px] bg-white/5 border border-white/10 hover:border-white/20 transition-all group h-full shadow-2xl backdrop-blur-sm"
                >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                        {feature.icon}
                    </div>
                    <h3 className="text-[18px] font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-[15px] text-white/40 leading-relaxed">{feature.desc}</p>
                </GlowCard>
            </div>
          ))}
        </ScrollReveal>
      </div>

      {/* Use Cases */}
      <div className="max-w-7xl mx-auto px-6 py-[80px] border-t border-white/10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-[30px] font-bold text-white font-display">Who uses this?</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, i) => (
            <ScrollReveal 
                key={i} 
                delay={i * 100}
                className="p-8 rounded-[24px] bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/[0.08] transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                {useCase.icon}
              </div>
              <h3 className="text-[18px] font-bold text-white mb-4">{useCase.title}</h3>
              <p className="text-[15px] text-white/40 leading-relaxed">{useCase.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA Repeat */}
      <ScrollReveal className="max-w-7xl mx-auto px-6 py-[80px] border-t border-white/10 text-center">
        <h2 className="text-[30px] md:text-[40px] font-bold text-white mb-8 font-display">Ready to {currentTool.name.toLowerCase()}?</h2>
        <button 
          onClick={() => {
            const workspace = document.getElementById('workspace');
            if (workspace) workspace.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-12 py-5 rounded-2xl text-white font-bold text-lg hover:brightness-110 transition-all shadow-2xl uppercase tracking-widest"
          style={{ backgroundColor: currentCategory.color }}
        >
          Get Started
        </button>
      </ScrollReveal>

      {/* Related Tools */}
      <div className="max-w-7xl mx-auto px-6 py-[80px] border-t border-white/10">
        <ScrollReveal className="mb-12">
          <h2 className="text-[24px] font-bold text-white font-display">Related Tools</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedTools.map((tool, i) => (
            <ScrollReveal
                key={tool.id}
                delay={i * 100}
            >
                <Link to={tool.route} className="group block p-8 rounded-[24px] bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <tool.icon className="w-6 h-6" style={{ color: currentCategory?.color }} />
                        </div>
                        <h3 className="font-bold text-white">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-white/40 mb-6 line-clamp-2 leading-relaxed">{tool.tagline}</p>
                    <div className="flex items-center text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">
                        Get Started <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>

    </motion.div>
  );
};
