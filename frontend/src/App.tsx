import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/home/Home";
import { ToolDetail } from "./components/tools/ToolDetail";
import { FileConverter } from "./components/tools/FileConverter";
import { FileConverterSubTool } from "./components/tools/FileConverterSubTool";
import { VoiceToDoc } from "./components/tools/VoiceToDoc";
import { AdaptiveDocument } from "./components/tools/AdaptiveDocument";
import { MultiSourceIntelligence } from "./components/tools/MultiSourceIntelligence";
import { About } from "./components/About";

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          
          {/* Special Tool Pages */}
          <Route path="/tools/file-converter" element={<FileConverter />} />
          <Route path="/tools/file-converter/:subSlug" element={<FileConverterSubTool />} />
          <Route path="/tools/voice-to-doc" element={<VoiceToDoc />} />
          <Route path="/tools/adaptive-document" element={<AdaptiveDocument />} />
          <Route path="/tools/multi-source-intelligence" element={<MultiSourceIntelligence />} />
          
          {/* Standard Tool Pages */}
          <Route path="/tools/:toolId" element={<ToolDetail />} />
          
          <Route path="/about" element={<About />} />
          
          {/* Fallback for specific routes mentioned in Navbar but not yet fully implemented as unique pages */}
          <Route path="/detection" element={<ToolDetail />} />
          <Route path="/humanizer" element={<ToolDetail />} />
          <Route path="/grammar-fix" element={<ToolDetail />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
