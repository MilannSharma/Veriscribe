import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { isLoggedIn, logoutUser } from "@/src/lib/auth";

export const Navbar = ({ onSignIn }: { onSignIn?: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [userName, setUserName] = useState(localStorage.getItem('veriscribe_user_name') || 'User');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('veriscribe_user_email') || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      setLoggedIn(isLoggedIn());
      setUserName(localStorage.getItem('veriscribe_user_name') || 'User');
      setUserEmail(localStorage.getItem('veriscribe_user_email') || '');
    };
    window.addEventListener('veriscribe_auth_change', handleAuthChange);
    return () => window.removeEventListener('veriscribe_auth_change', handleAuthChange);
  }, []);

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage === '/') {
      const workspace = document.getElementById('workspace');
      if (workspace) workspace.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#workspace');
    }
  };

  const handleLogoClick = () => {
    if (currentPage === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Detector", path: "/tools/ai-detector" },
    { name: "Humanizer", path: "/tools/humanizer" },
    { name: "Grammar Fix", path: "/tools/grammar-fix" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none">
      <nav className={cn(
        "max-w-7xl mx-auto flex items-center justify-between px-8 py-4 rounded-[24px] transition-all duration-700 pointer-events-auto border",
        isScrolled 
          ? "bg-black/60 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-transparent"
      )}>
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-4 group relative"
        >
          <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <img 
              src="/images/veriscribe-logo.png" 
              alt="Veriscribe Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white font-display">Veriscribe</span>
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-violet-500 animate-ping opacity-75" />
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-[11px] font-black uppercase tracking-[0.25em] transition-all relative group py-2", 
                currentPage === link.path ? "text-white" : "text-white/40 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6 relative">
          {loggedIn ? (
            <div className="relative pointer-events-auto">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-all border border-white/5 cursor-pointer group"
                aria-label="User Profile"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 border border-white/20 flex items-center justify-center font-bold text-white shadow-lg text-[10px] uppercase tracking-wider">
                  {userName.substring(0, 2)}
                </div>
                <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10 cursor-default" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-black/85 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-20 pointer-events-auto"
                    >
                      <div className="border-b border-white/5 pb-3 mb-3">
                        <p className="text-[9px] font-black uppercase tracking-widest text-violet-400">Authenticated Profile</p>
                        <p className="text-sm font-bold text-white mt-1 truncate">{userName}</p>
                        {userEmail && <p className="text-[10px] text-white/40 truncate mt-0.5">{userEmail}</p>}
                      </div>
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={onSignIn}
              className="hidden sm:block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
          <Link 
            to="/"
            onClick={handleGetStarted}
            className="px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </div>
      </nav>
    </div>
  );
};
