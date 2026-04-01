import { Link } from "react-router-dom";
import { categories } from "@/src/data/tools";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0D0D1A] border-t border-white/5 pt-24 pb-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Col 1: Logo & Social */}
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white font-display">Veriscribe</Link>
          <p className="text-white/40 text-sm leading-relaxed">
            The only AI writing suite that detects, humanizes, formats, and perfects — all in one intelligent workspace.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Twitter className="w-5 h-5 text-white/60" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Github className="w-5 h-5 text-white/60" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Linkedin className="w-5 h-5 text-white/60" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Mail className="w-5 h-5 text-white/60" />
            </a>
          </div>
        </div>

        {/* Col 2: Tools */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Tools</h4>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-2">
                <p className="text-xs font-bold text-white/20 uppercase tracking-wider">{cat.name}</p>
                <ul className="space-y-1">
                  {cat.tools.slice(0, 2).map((tool) => (
                    <li key={tool.id}>
                      <Link to={tool.route} className="text-sm text-white/40 hover:text-white transition-colors">{tool.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Company */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Company</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-sm text-white/40 hover:text-white transition-colors">About Us</Link></li>
            <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Col 4: Legal */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Legal</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-xs">© 2025 Veriscribe. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/10">ISO27001 Certified</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/10">Secure Https</span>
        </div>
      </div>
    </footer>
  );
};
