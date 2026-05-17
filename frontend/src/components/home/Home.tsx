import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileText, 
  Play,
  Download,
  Search,
  UserRound,
  Type,
  FileSearch,
  Shield,
  BookOpen
} from "lucide-react";
import { HeroSection } from "@/src/components/ui/hero-section-dark";
import { GlowCard } from "@/src/components/ui/spotlight-card";
import { categories } from "@/src/data/tools";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { getRecentActivities, ActivityLog } from "@/src/lib/activity";
import { exportToPDF } from "@/src/lib/pdf";

const RecentDocuments = () => {
  const [docs, setDocs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const realDocs = getRecentActivities();
    if (realDocs.length > 0) {
      setDocs(realDocs);
    } else {
      setDocs([
        { id: "1", title: "Quarterly_Report_Final.docx", type: "Document", date: "2 hours ago", status: "Humanized", color: "text-emerald-400", bg: "bg-emerald-400/10", timestamp: Date.now() - 7200000 },
        { id: "2", title: "Marketing_Strategy_v2.pdf", type: "PDF", date: "5 hours ago", status: "Detected", color: "text-orange-400", bg: "bg-orange-400/10", timestamp: Date.now() - 18000000 },
        { id: "3", title: "Blog_Post_Draft.txt", type: "Text", date: "Yesterday", status: "Perfected", color: "text-blue-400", bg: "bg-blue-400/10", timestamp: Date.now() - 86400000 }
      ]);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <span className="text-[10px] font-black tracking-[0.3em] text-violet-500 uppercase">Persistence Layer</span>
          <h2 className="text-3xl font-black mt-2 font-display text-white tracking-tighter">Recent Documents</h2>
        </div>
        <button className="text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors flex items-center gap-3 group">
          View Repository <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {docs.map((doc, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlowCard 
              customSize 
              radius={32}
              className="h-full border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all cursor-pointer overflow-hidden shadow-2xl !p-6 rounded-[2rem]"
              glowColor={doc.status === 'Humanized' ? 'emerald' : doc.status === 'Detected' ? 'orange' : 'blue'}
            >
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <FileText className="w-7 h-7 text-white/40 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold truncate mb-1 text-white/90">{doc.title}</h3>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span>{doc.type}</span>
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between relative z-10">
                <span className={cn("text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest", doc.bg, doc.color)}>
                  {doc.status}
                </span>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      exportToPDF(doc.status, `Linguistic forensic metadata verification for ${doc.title}.\nType: ${doc.type}\nInspection Date: ${doc.date}\nStatus: ${doc.status}`, {
                        'File Name': doc.title,
                        'Engine Status': doc.status,
                        'Date Analyzed': doc.date
                      });
                    }}
                    aria-label="Download document" 
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-white/60" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                    <Play className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ToolGrid = () => {
  return (
    <div id="workspace" className="max-w-7xl mx-auto px-6 py-32 relative z-10">
      <div className="text-center mb-32 space-y-4">
        <span className="text-[10px] font-black tracking-[0.4em] text-violet-500 uppercase">Ecosystem Intelligence</span>
        <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">Modular Workspace</h2>
        <p className="text-white/40 max-w-xl mx-auto text-lg font-light leading-relaxed">21+ specialized AI engines orchestrated within a single, cinematic environment designed for professional scale.</p>
      </div>

      <div className="space-y-48">
        {categories.map((category) => (
          <div key={category.id} className="space-y-16">
            <div className="flex items-center gap-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">{category.name}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className={cn(
              "grid gap-8",
              category.id === "intelligence-research" || category.id === "monitoring-security" 
                ? "grid-cols-1 md:grid-cols-2" 
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}>
              {category.tools.map((tool, i) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={tool.route} className="block h-full">
                    <GlowCard 
                      customSize 
                      radius={40}
                      className="h-full border-white/10 min-h-[320px] !p-0 rounded-[2.5rem]"
                      glowColor={
                        category.id === 'writing-language' ? 'blue' :
                        category.id === 'document-creation' ? 'purple' :
                        category.id === 'intelligence-research' ? 'emerald' :
                        category.id === 'document-processing' ? 'fuchsia' : 'orange'
                      }
                    >
                      <div className="relative flex h-full flex-col justify-between overflow-hidden p-10 group transition-all duration-500">
                        <div className="relative flex flex-col gap-8">
                          <div className="flex items-start justify-between">
                            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 shadow-xl">
                              <tool.icon className="w-8 h-8" style={{ color: category.color }} />
                            </div>
                            {tool.badge && (
                              <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 uppercase tracking-widest">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-base text-white/40 leading-relaxed font-light line-clamp-3">
                              {tool.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="mt-8 flex items-center justify-between">
                          <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-all">
                            Initialize Engine <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      <HeroSection 
        title="The Document Intelligence Ecosystem."
        subtitle={{
          regular: "Scale with ",
          gradient: "21+ AI Engines."
        }}
        description="The only high-fidelity writing suite that detects, humanizes, and perfects at surgical precision — all in one unified cinematic workspace."
        ctaText="Enter the Ecosystem — Free"
        ctaHref="#"
      />

      <RecentDocuments />
      <ToolGrid />
    </div>
  );
};
