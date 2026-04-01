import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileText, 
  Play,
  Download
} from "lucide-react";
import GlassmorphismTrustHero from "@/src/components/ui/glassmorphism-trust-hero";
import { GlowCard } from "@/src/components/ui/spotlight-card";
import { categories } from "@/src/data/tools";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

const RecentDocuments = () => {
  // In a real app, this would check if user is logged in
  const isLoggedIn = true; 

  if (!isLoggedIn) return null;

  const docs = [
    { title: "Quarterly_Report_Final.docx", type: "Document", date: "2 hours ago", status: "Humanized", color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Marketing_Strategy_v2.pdf", type: "PDF", date: "5 hours ago", status: "Detected", color: "text-orange-400", bg: "bg-orange-400/10" },
    { title: "Blog_Post_Draft.txt", type: "Text", date: "Yesterday", status: "Perfected", color: "text-blue-400", bg: "bg-blue-400/10" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative z-10 -mt-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold tracking-widest text-violet-500 uppercase">Resume Work</span>
          <h2 className="text-2xl font-bold mt-2 font-display">Recent Documents</h2>
        </div>
        <button className="text-sm font-medium text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {docs.map((doc, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold truncate mb-1">{doc.title}</h3>
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between relative z-10">
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", doc.bg, doc.color)}>
                {doc.status}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><FileText className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><Download className="w-3.5 h-3.5" /></button>
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                  <Play className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ToolGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="text-center mb-24">
        <span className="text-xs font-bold tracking-widest text-violet-500 uppercase">Powerful Tools for Modern Writing</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 font-display">Intelligent Workspace</h2>
        <p className="text-white/40 max-w-2xl mx-auto">Everything you need to create, refine, and protect your content in one place.</p>
      </div>

      <div className="space-y-32">
        {categories.map((category) => (
          <div key={category.id} className="space-y-12">
            <div className="flex flex-col items-center text-center">
              <span 
                className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
                style={{ backgroundColor: `${category.color}20`, color: category.color, border: `1px solid ${category.color}40` }}
              >
                {category.name}
              </span>
            </div>

            <div className={cn(
              "grid gap-6",
              category.id === "intelligence-research" || category.id === "monitoring-security" 
                ? "grid-cols-1 md:grid-cols-2" 
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}>
              {category.tools.map((tool, i) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={tool.route} className="block h-full">
                    <GlowCard 
                      customSize 
                      className="h-full !p-0 border-white/10"
                      glowColor={
                        category.id === 'ai-detection' ? 'red' :
                        category.id === 'ai-humanizer' ? 'orange' :
                        category.id === 'ai-writing' ? 'purple' :
                        category.id === 'document-management' ? 'blue' : 'green'
                      }
                    >
                      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 group transition-all duration-300">
                        <div className="relative flex flex-1 flex-col justify-between gap-4">
                          <div className="flex items-start justify-between">
                            <div className="w-fit rounded-xl border border-white/10 bg-white/5 p-3 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10">
                              <tool.icon className="w-6 h-6" style={{ color: category.color }} />
                            </div>
                            {tool.badge && (
                              <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/5 text-white/60 border border-white/10">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <div className="space-y-3">
                            <h3 className="text-xl font-bold font-display tracking-tight text-white group-hover:text-fuchsia-400 transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                              {tool.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center text-xs font-bold text-white/20 group-hover:text-white transition-colors">
                            Get Started <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
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
    <div className="relative min-h-screen">
      <GlassmorphismTrustHero />

      <RecentDocuments />
      <ToolGrid />
    </div>
  );
};
