import React from "react";
import { 
  ArrowRight, 
  Play, 
  Target, 
  Crown, 
  Star,
  Shield,
  Zap,
  Brain,
  FileText,
  CheckCircle2,
  Sparkles
} from "lucide-react";

// --- MOCK BRANDS ---
const CLIENTS = [
  { name: "TechFlow", icon: Zap },
  { name: "SecureWrite", icon: Shield },
  { name: "BrainyAI", icon: Brain },
  { name: "DocuGen", icon: FileText },
  { name: "VeriTrust", icon: CheckCircle2 },
  { name: "Sparkle", icon: Sparkles },
];

// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium sm:text-xs">{label}</span>
  </div>
);

// --- MAIN COMPONENT ---
export default function HeroSection() {
  return (
    <div className="relative w-full bg-[#0a0a0b] text-white overflow-hidden font-sans min-h-[90vh] flex items-center">
      {/* 
        SCOPED ANIMATIONS 
      */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Background Image with Gradient Mask */}
      <div 
        className="absolute inset-0 z-0 bg-[url(https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000)] bg-cover bg-center opacity-20 grayscale"
        style={{
          maskImage: "linear-gradient(180deg, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 20%, black 80%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-12 sm:px-6 md:pt-40 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* Badge */}
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-default">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/60 flex items-center gap-2">
                  Next-Gen AI Writing Suite
                  <Star className="w-3.5 h-3.5 text-fuchsia-500 fill-fuchsia-500" />
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 
              className="animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.9] font-display"
            >
              Write with<br />
              <span className="bg-gradient-to-br from-white via-white/90 to-fuchsia-500 bg-clip-text text-transparent">
                Intelligence
              </span><br />
              Beyond Limits
            </h1>

            {/* Description */}
            <p className="animate-fade-in delay-300 max-w-xl text-lg text-white/40 leading-relaxed">
              The only AI writing suite that detects, humanizes, formats, and perfects — all in one intelligent workspace designed for the future of content.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98]">
                Get Started Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.05]">
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stats Card */}
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl group hover:border-white/20 transition-all duration-500">
              {/* Card Glow Effect */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none group-hover:bg-fuchsia-500/20 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-500">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">99.9%</div>
                    <div className="text-sm text-white/40">Detection Accuracy</div>
                  </div>
                </div>

                {/* Progress Bar Section */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">AI Humanization Rate</span>
                    <span className="text-white font-bold">98.4%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[98.4%] rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_10px_rgba(192,38,211,0.5)]" />
                  </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-6" />

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="50M+" label="Words" />
                  <div className="w-px h-8 bg-white/10 mx-auto self-center" />
                  <StatItem value="24/7" label="Uptime" />
                  <div className="w-px h-8 bg-white/10 mx-auto self-center" />
                  <StatItem value="100%" label="Secure" />
                </div>

                {/* Tag Pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-widest text-white/60">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    LIVE ENGINE
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-widest text-white/60">
                    <Crown className="w-3 h-3 text-fuchsia-500" />
                    ENTERPRISE
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee Card */}
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 py-8 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
              <h3 className="mb-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Trusted by Global Teams</h3>
              
              <div 
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                }}
              >
                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 opacity-30 transition-all hover:opacity-100 hover:scale-110 cursor-default grayscale hover:grayscale-0"
                    >
                      <client.icon className="h-5 w-5 text-white" />
                      <span className="text-sm font-bold text-white tracking-tight">
                        {client.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
