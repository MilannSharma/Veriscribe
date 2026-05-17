import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export const Navbar = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "AI Detection", path: "/tools/ai-detector" },
    { name: "Humanizer", path: "/tools/humanizer" },
    { name: "Grammar Fix", path: "/tools/grammar-fix" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-morphism m-4 rounded-2xl">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl font-bold tracking-tighter text-white font-display">Veriscribe</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link 
            key={link.path}
            to={link.path}
            className={cn(
              "text-base font-medium transition-colors relative group", 
              currentPage === link.path ? "text-white" : "text-white/40 hover:text-white"
            )}
          >
            {link.name}
            <span className={cn(
              "absolute -bottom-1 left-0 h-0.5 bg-violet-500 transition-all", 
              currentPage === link.path ? "w-full" : "w-0 group-hover:w-full"
            )} />
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="text-base font-medium text-white/60 hover:text-white transition-colors">Sign In</button>
        <Link 
          to="/"
          className="px-6 py-2.5 text-base font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all relative overflow-hidden group"
        >
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
        </Link>
      </div>
    </nav>
  );
};
