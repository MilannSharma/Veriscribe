import { 
  Search, 
  UserRound, 
  Type, 
  FileSearch, 
  Shield, 
  BookOpen, 
  FileEdit, 
  FilePlus, 
  Mic, 
  Lightbulb, 
  RefreshCw, 
  Brain, 
  FileText, 
  BarChart3, 
  Scale, 
  Repeat, 
  ClipboardCheck, 
  GitCompare, 
  History, 
  Zap, 
  Bell, 
  LineChart, 
  ShieldAlert, 
  Bot
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  description: string;
  route: string;
  badge?: string;
  hasSubTools?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    id: "writing-language",
    name: "Writing & Language Tools",
    color: "#3B5BDB",
    tools: [
      {
        id: "ai-detector",
        name: "AI Detector",
        icon: Search,
        tagline: "Powered by 8 detection models simultaneously.",
        description: "Instantly see if a document was AI-generated or human-written with forensic accuracy.",
        route: "/tools/ai-detector"
      },
      {
        id: "humanizer",
        name: "Humanizer",
        icon: UserRound,
        tagline: "Bypass AI detectors with surgical precision.",
        description: "Refine AI-generated text to sound natural, professional, and authentic while preserving your voice.",
        route: "/tools/humanizer"
      },
      {
        id: "grammar-fix",
        name: "Grammar Fix",
        icon: Type,
        tagline: "Beyond spelling — style, tone, and flow.",
        description: "Advanced grammar and style correction that goes beyond basic spell-checking.",
        route: "/tools/grammar-fix"
      },
      {
        id: "ai-summarizer",
        name: "AI Summarizer",
        icon: FileSearch,
        tagline: "Condense long documents into key insights instantly.",
        description: "Summarize complex documents into concise, actionable insights in seconds.",
        route: "/tools/ai-summarizer"
      },
      {
        id: "plagiarism-check",
        name: "Plagiarism Check",
        icon: Shield,
        tagline: "Ensure 100% originality with deep web scanning.",
        description: "Comprehensive plagiarism detection across billions of web pages and academic papers.",
        route: "/tools/plagiarism-check"
      },
      {
        id: "citation-generator",
        name: "Citation Generator",
        icon: BookOpen,
        tagline: "Auto-generate citations in APA, MLA, Chicago, Harvard, IEEE.",
        description: "Quickly generate accurate citations for any source in multiple academic formats.",
        route: "/tools/citation-generator"
      }
    ]
  },
  {
    id: "document-creation",
    name: "Document Creation Tools",
    color: "#7950F2",
    tools: [
      {
        id: "doc-editor",
        name: "Doc Editor",
        icon: FileEdit,
        tagline: "Professional workspace for every file type.",
        description: "A powerful, intuitive editor designed for professional document creation.",
        route: "/tools/doc-editor"
      },
      {
        id: "doc-studio",
        name: "Doc Studio",
        icon: FilePlus,
        tagline: "Generate structured documents from simple prompts.",
        description: "AI-powered document generation that builds full structures from your ideas.",
        route: "/tools/doc-studio"
      },
      {
        id: "voice-to-doc",
        name: "Voice to Doc",
        icon: Mic,
        tagline: "Speak your idea — AI builds the complete formatted document.",
        description: "Convert your spoken thoughts directly into professionally formatted documents.",
        route: "/tools/voice-to-doc"
      },
      {
        id: "smart-notes",
        name: "Smart Notes",
        icon: Lightbulb,
        tagline: "Quick thoughts, captured instantly and organised by AI.",
        description: "Capture and organize your ideas with AI-powered categorization and search.",
        route: "/tools/smart-notes"
      },
      {
        id: "adaptive-document",
        name: "Adaptive Document",
        icon: RefreshCw,
        tagline: "Write once, auto-generate Expert, Executive, Student versions.",
        description: "Automatically adapt your content for different audiences and expertise levels.",
        route: "/tools/adaptive-document"
      }
    ]
  },
  {
    id: "intelligence-research",
    name: "Intelligence & Research Tools",
    color: "#0891B2",
    tools: [
      {
        id: "multi-source-intelligence",
        name: "Multi-Source Intelligence",
        icon: Brain,
        tagline: "Upload PDFs, audio, video, URLs — AI learns from everything.",
        description: "A unified intelligence engine that processes and connects information from multiple sources.",
        route: "/tools/multi-source-intelligence"
      },
      {
        id: "exam-paper-builder",
        name: "Exam Paper Builder",
        icon: FileText,
        tagline: "Textbooks to exam-ready papers with answer keys.",
        description: "Generate comprehensive exam papers and answer keys from your study materials.",
        route: "/tools/exam-paper-builder"
      },
      {
        id: "narrative-report-writer",
        name: "Narrative Report Writer",
        icon: BarChart3,
        tagline: "Upload data — get a full written business report.",
        description: "Transform raw data into professional, narrative-driven business reports.",
        route: "/tools/narrative-report-writer"
      },
      {
        id: "contract-negotiation-coach",
        name: "Contract Negotiation Coach",
        icon: Scale,
        tagline: "Upload any contract, get AI negotiation intelligence.",
        description: "AI-driven contract analysis and negotiation strategies for better legal outcomes.",
        route: "/tools/contract-negotiation-coach"
      }
    ]
  },
  {
    id: "document-processing",
    name: "Document Processing Tools",
    color: "#059669",
    tools: [
      {
        id: "file-converter",
        name: "File Converter",
        icon: Repeat,
        tagline: "Convert any file to any format. 40+ conversions. No limits.",
        description: "Fast, high-quality file conversion supporting over 40 different formats.",
        route: "/tools/file-converter",
        badge: "40+ Tools Inside \u2192",
        hasSubTools: true
      },
      {
        id: "smart-form-extractor",
        name: "Smart Form Extractor",
        icon: ClipboardCheck,
        tagline: "Upload any form — AI extracts every field perfectly.",
        description: "Automated field extraction from any physical or digital form with high accuracy.",
        route: "/tools/smart-form-extractor"
      },
      {
        id: "version-reconciler",
        name: "Document Version Reconciler",
        icon: GitCompare,
        tagline: "Two versions in, plain-English change summary out.",
        description: "Compare document versions and get a clear, human-readable summary of changes.",
        route: "/tools/version-reconciler"
      },
      {
        id: "document-archaeology",
        name: "Document Archaeology",
        icon: History,
        tagline: "Reconstruct the full history and reasoning behind any document.",
        description: "Uncover the evolution and context of any document through deep AI analysis.",
        route: "/tools/document-archaeology"
      },
      {
        id: "document-resurrector",
        name: "Document Resurrector",
        icon: Zap,
        tagline: "Your abandoned drafts, completed by AI.",
        description: "Breathe new life into your unfinished drafts with AI-powered completion.",
        route: "/tools/document-resurrector"
      }
    ]
  },
  {
    id: "monitoring-security",
    name: "Monitoring & Security Tools",
    color: "#DC2626",
    tools: [
      {
        id: "staleness-monitor",
        name: "Staleness Monitor",
        icon: Bell,
        tagline: "Never share an outdated document again.",
        description: "Real-time monitoring that alerts you when your documents become outdated.",
        route: "/tools/staleness-monitor"
      },
      {
        id: "document-analytics",
        name: "Document Analytics",
        icon: LineChart,
        tagline: "Every shared document becomes a tracked asset.",
        description: "Track engagement and performance for every document you share.",
        route: "/tools/document-analytics"
      },
      {
        id: "confidence-scorer",
        name: "Confidence Scorer & Trust Shield",
        icon: ShieldAlert,
        tagline: "Every AI answer cited. Every document scanned and trusted.",
        description: "Verify the accuracy and reliability of AI-generated content with cited sources.",
        route: "/tools/confidence-scorer"
      },
      {
        id: "knowledge-interview-bot",
        name: "Knowledge Interview Bot",
        icon: Bot,
        tagline: "AI interviews you \u2014 builds the professional document for you.",
        description: "An interactive AI that interviews you to gather information and build documents.",
        route: "/tools/knowledge-interview-bot"
      }
    ]
  }
];
