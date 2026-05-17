import React, { useState } from "react";
import { CompanyPageLayout } from "./CompanyPageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Clock, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ExternalLink 
} from "lucide-react";
import { Link } from "react-router-dom";
import { BLOG_POSTS, BlogPost } from "../../data/blogData";

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "full">("grid");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))];

  // Filter posts
  const filteredPosts = selectedCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const toggleExpandPost = (postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
    }
  };

  return (
    <CompanyPageLayout 
      title="The Journal"
      subtitle="Insights, guides, and updates from the world's #1 AI Document Editor."
    >
      <div className="space-y-12">
        {/* Controls Bar: Category Filter & View Mode Toggle */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center pb-6 border-b border-white/5">
          {/* Categories Tab Bar */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setExpandedPostId(null); // collapse when switching category
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === category 
                    ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20" 
                    : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                viewMode === "grid" 
                  ? "bg-white/10 text-white shadow-md" 
                  : "text-white/40 hover:text-white"
              }`}
              title="Grid View (Click to read inline)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode("full")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                viewMode === "full" 
                  ? "bg-white/10 text-white shadow-md" 
                  : "text-white/40 hover:text-white"
              }`}
              title="Full Content Feed"
            >
              <List className="w-3.5 h-3.5" />
              <span>Full Feed</span>
            </button>
          </div>
        </div>

        {/* Blog Post Layouts */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            /* ==================== GRID VIEW ==================== */
            <motion.div 
              key="grid-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredPosts.map((post, i) => {
                const isExpanded = expandedPostId === post.id;
                return (
                  <motion.div
                    key={post.id}
                    layout="position"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3) }}
                    viewport={{ once: true }}
                    className={`group premium-depth-card overflow-hidden rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all duration-500 bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between ${
                      isExpanded ? "md:col-span-2 ring-1 ring-violet-500/20 shadow-xl shadow-violet-500/5" : ""
                    }`}
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative h-64 overflow-hidden w-full bg-black/40">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-black uppercase tracking-widest border border-violet-500/30 backdrop-blur-md">
                          {post.category}
                        </span>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-8 space-y-6">
                        <div className="flex flex-wrap items-center gap-4 text-white/40 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.date}</span>
                          </div>
                          <span className="text-white/10">•</span>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-violet-400 transition-colors duration-300">
                          {post.title}
                        </h3>

                        <p className="text-white/50 text-base leading-relaxed font-light">
                          {post.excerpt}
                        </p>

                        {/* Inline Content Drawer */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden border-t border-white/5 pt-6 mt-6"
                            >
                              <div 
                                className="blog-content-rich text-white/80 space-y-4 text-base leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-8 pb-8 pt-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                          <User className="w-4 h-4 text-white/40" />
                        </div>
                        <div>
                          <p className="text-xs text-white font-semibold">{post.author}</p>
                          <p className="text-[10px] text-white/30">{post.authorRole}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleExpandPost(post.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                          {isExpanded ? (
                            <>
                              <span>Collapse</span>
                              <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Read Inline</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600/10 border border-violet-500/20 text-xs text-violet-400 hover:bg-violet-600 hover:text-white transition-all duration-300 group/link"
                        >
                          <span>Full Page</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* ==================== FULL FEED VIEW ==================== */
            <motion.div 
              key="full-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.1, 0.3) }}
                  viewport={{ once: true }}
                  className="premium-depth-card overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-xl p-8 md:p-12 space-y-8"
                >
                  {/* Hero Header */}
                  <div className="relative h-[25rem] rounded-[2rem] overflow-hidden bg-black/40">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8 space-y-4">
                      <span className="px-4 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-black uppercase tracking-widest border border-violet-500/30 backdrop-blur-md">
                        {post.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                        {post.title}
                      </h2>
                    </div>
                  </div>

                  {/* Metadata and Author details */}
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                        <User className="w-5 h-5 text-white/50" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-bold">{post.author}</p>
                        <p className="text-xs text-white/40">{post.authorRole}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-white/40 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div 
                    className="blog-content-rich text-white/80 space-y-6 text-lg leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Call-to-action Link */}
                  <div className="pt-6 border-t border-white/5 flex justify-end">
                    <Link 
                      to={`/blog/${post.id}`}
                      className="flex items-center gap-2 text-violet-400 hover:text-white font-bold uppercase tracking-widest text-[10px] group transition-colors duration-300"
                    >
                      <span>Share & Bookmark Full Post</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CompanyPageLayout>
  );
};
