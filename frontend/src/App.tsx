import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/home/Home";
import { ToolDetail } from "./components/tools/ToolDetail";
import { AIDetector } from "./components/tools/ai/AIDetector";
import { Humanizer } from "./components/tools/ai/Humanizer";
import { GrammarFix } from "./components/tools/ai/GrammarFix";
import { AISummarizer } from "./components/tools/ai/AISummarizer";
import { PlagiarismCheck } from "./components/tools/ai/PlagiarismCheck";
import { CitationGenerator } from "./components/tools/ai/CitationGenerator";
import { FileConverter } from "./components/tools/processing/FileConverter";
import { FileConverterSubTool } from "./components/tools/processing/FileConverterSubTool";
import { VoiceToDoc } from "./components/tools/doc/VoiceToDoc";
import { AdaptiveDocument } from "./components/tools/doc/AdaptiveDocument";
import { MultiSourceIntelligence } from "./components/tools/intelligence/MultiSourceIntelligence";
import { About } from "./components/About";
import { Blog } from "./components/company/Blog";
import { Careers } from "./components/company/Careers";
import { Contact } from "./components/company/Contact";
import { Privacy } from "./components/company/Privacy";
import { Terms } from "./components/company/Terms";
import { Cookies } from "./components/company/Cookies";
import { BlogPostDetail } from "./components/company/BlogPostDetail";

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          
          {/* Writing & Language Tools (Remade) */}
          <Route path="/tools/ai-detector" element={<AIDetector />} />
          <Route path="/tools/humanizer" element={<Humanizer />} />
          <Route path="/tools/grammar-fix" element={<GrammarFix />} />
          <Route path="/tools/ai-summarizer" element={<AISummarizer />} />
          <Route path="/tools/plagiarism-check" element={<PlagiarismCheck />} />
          <Route path="/tools/citation-generator" element={<CitationGenerator />} />
          
          {/* Document Creation Tools */}
          <Route path="/tools/voice-to-doc" element={<VoiceToDoc />} />
          <Route path="/tools/adaptive-document" element={<AdaptiveDocument />} />
          
          {/* Processing Tools */}
          <Route path="/tools/file-converter" element={<FileConverter />} />
          <Route path="/tools/file-converter/:subSlug" element={<FileConverterSubTool />} />
          
          {/* Intelligence & Research Tools */}
          <Route path="/tools/multi-source-intelligence" element={<MultiSourceIntelligence />} />
          
          {/* Standard Tool Pages (Generic Fallback) */}
          <Route path="/tools/:toolId" element={<ToolDetail />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          
          {/* Legacy/Quick-link routes */}
          <Route path="/detection" element={<AIDetector />} />
          <Route path="/humanizer-tool" element={<Humanizer />} />
          <Route path="/grammar-checker" element={<GrammarFix />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
