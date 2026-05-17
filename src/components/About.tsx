import { 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Target,
  Eye,
  Heart,
  Cpu,
  Lock,
  Search,
  MessageSquare,
  FileText,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { GridBeam } from "@/src/components/ui/background-grid-beam";
import { GlowCard } from "@/src/components/ui/spotlight-card";

const STATS = [
  { label: "Documents Processed", value: "50M+", icon: FileText, color: "text-blue-400" },
  { label: "Global Users", value: "2M+", icon: Globe, color: "text-emerald-400" },
  { label: "AI Models", value: "12+", icon: Cpu, color: "text-violet-400" },
  { label: "Security Score", value: "99.9%", icon: Shield, color: "text-fuchsia-400" },
];

const VALUES = [
  { 
    title: "Intelligence First", 
    description: "We believe AI should empower human creativity, not replace it. Our tools are designed to be your most powerful ally.",
    icon: Sparkles,
    color: "violet"
  },
  { 
    title: "Radical Transparency", 
    description: "We are open about how our models work and how we handle your data. Trust is our most valuable asset.",
    icon: Eye,
    color: "emerald"
  },
  { 
    title: "Privacy by Design", 
    description: "Your documents are your business. We implement enterprise-grade security at every layer of our platform.",
    icon: Lock,
    color: "blue"
  },
  { 
    title: "Human-Centric", 
    description: "Technology is only useful if it solves real human problems. We build for the people behind the documents.",
    icon: Heart,
    color: "fuchsia"
  },
];

const TEAM = [
  { name: "Alex Rivers", role: "Founder & CEO", image: "https://picsum.photos/seed/alex/400/400" },
  { name: "Sarah Chen", role: "Head of AI Research", image: "https://picsum.photos/seed/sarah/400/400" },
  { name: "Marcus Thorne", role: "Director of Engineering", image: "https://picsum.photos/seed/marcus/400/400" },
  { name: "Elena Vance", role: "Product Design Lead", image: "https://picsum.photos/seed/elena/400/400" },
];

export const About = () => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-24 px-6"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="relative rounded-[3rem] overflow-hidden border border-white/5">
            <GridBeam className="py-24 px-10">
                <div className="flex flex-col items-center text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
                    >
                        <Target className="w-3.5 h-3.5" />
                        <span>Our Mission</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-none max-w-4xl mx-auto"
                    >
                        Empowering Human <span className="text-white/20">Intelligence.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 max-w-2xl mx-auto text-xl font-light leading-relaxed"
                    >
                        Veriscribe is the world's most advanced AI document intelligence platform, built to bridge the gap between artificial and human creativity.
                    </motion.p>
                </div>
            </GridBeam>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
            >
                <GlowCard 
                    glowColor="blue"
                    customSize
                    className="p-10 rounded-[2.5rem] bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 text-center space-y-6 group transition-all duration-500 hover:scale-[1.05]"
                >
                    <div className={cn("w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 border border-white/5", stat.color)}>
                        <stat.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-display font-bold tracking-tight">{stat.value}</div>
                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{stat.label}</div>
                    </div>
                </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold font-display tracking-tight">The Veriscribe Story</h2>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed">
              <p>Founded in 2023, Veriscribe began with a simple observation: as AI content became more prevalent, the tools to understand and refine it were lagging behind.</p>
              <p>We saw students struggling with AI detection false positives, writers losing their unique voice to generic LLM outputs, and businesses overwhelmed by the sheer volume of multi-source data.</p>
              <p>Our team of AI researchers and product designers came together to build a platform that doesn't just detect or generate text—it understands the nuance of human communication.</p>
            </div>
            <button className="px-8 py-4 rounded-2xl bg-violet-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-violet-700 transition-all flex items-center gap-3 shadow-lg shadow-violet-600/20">
              Join Our Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10 overflow-hidden relative group">
              <img 
                src="https://picsum.photos/seed/veriscribe-team/800/800" 
                alt="Veriscribe Team" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-white font-bold text-lg italic">"We're not just building tools; we're building the future of how humans and AI collaborate on the written word."</p>
                <p className="text-white/40 text-sm mt-4 font-bold uppercase tracking-widest">— Alex Rivers, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-display font-bold tracking-tight">Our Core Values</h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">The principles that guide every feature we build and every decision we make.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((value, i) => (
            <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.4 }}
            >
                <GlowCard 
                    glowColor={value.color as any}
                    customSize
                    className="p-10 rounded-[3rem] bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 space-y-8 group transition-all duration-500 hover:scale-[1.02]"
                >
                    <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5",
                        value.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                        value.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                        value.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-fuchsia-500/10 text-fuchsia-400'
                    )}>
                        <value.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold tracking-tight">{value.title}</h3>
                        <p className="text-[15px] text-white/40 leading-relaxed font-light">{value.description}</p>
                    </div>
                </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl font-bold font-display tracking-tight">Meet the Visionaries</h2>
          <p className="text-white/40 max-w-2xl mx-auto">A global team of experts dedicated to the future of document intelligence.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member) => (
            <div key={member.name} className="group space-y-6">
              <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="p-16 rounded-[4rem] bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold font-display tracking-tight">Get in Touch</h2>
              <p className="text-white/40 text-lg">Have questions or want to learn more about Veriscribe? We'd love to hear from you.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Email Us</p>
                    <p className="font-bold">hello@veriscribe.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Visit Us</p>
                    <p className="font-bold">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Subject</label>
                <input type="text" className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Message</label>
                <textarea className="w-full h-40 p-6 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all resize-none" />
              </div>
              <button className="w-full h-16 rounded-2xl bg-violet-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
