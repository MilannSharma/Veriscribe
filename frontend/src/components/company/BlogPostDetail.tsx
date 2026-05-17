import React from "react";
import { useParams, Link } from "react-router-dom";
import { CompanyPageLayout } from "./CompanyPageLayout";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "../../data/blogData";

export const BlogPostDetail = () => {
  const { id } = useParams();
  
  // Find the post in centralized blogData
  const post = BLOG_POSTS.find(p => p.id === id) || BLOG_POSTS[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <CompanyPageLayout 
      title={post.title}
      subtitle={post.excerpt}
    >
      <div className="space-y-12">
        {/* Navigation & Sharing Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
          <Link to="/blog" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Journal</span>
          </Link>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
              title="Share Article"
            >
              <Share2 className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>

        {/* Hero Full-bleed Cover Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[30rem] rounded-[3rem] overflow-hidden bg-black/40 border border-white/5 shadow-2xl"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute top-8 left-8 px-5 py-2 rounded-full bg-violet-500/20 text-violet-300 text-xs font-black uppercase tracking-widest border border-violet-500/30 backdrop-blur-md">
            {post.category}
          </span>
        </motion.div>

        {/* Article Metadata Details */}
        <div className="flex flex-wrap items-center gap-8 text-white/40 text-sm py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-violet-400" />
            <span>{post.date}</span>
          </div>
          <span className="text-white/10">•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-violet-400" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Render HTML Content */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="blog-content-rich text-white/80 space-y-6 text-lg leading-relaxed max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio Section */}
        <div className="pt-16 border-t border-white/5">
          <div className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-violet-600/10 via-transparent to-transparent border border-white/5 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
              <User className="w-8 h-8 text-white/30" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white">{post.author}</h3>
                <p className="text-xs text-violet-400 font-bold uppercase tracking-wider">{post.authorRole}</p>
              </div>
              <p className="text-white/40 leading-relaxed text-base max-w-2xl">
                As a senior expert at Veriscribe, {post.author} drives innovation at the intersection of linguistic AI and document processing systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CompanyPageLayout>
  );
};
