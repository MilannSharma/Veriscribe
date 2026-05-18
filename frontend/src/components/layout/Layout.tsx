import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GlassFilter } from "@/src/components/ui/liquid-glass";
import { AuthModal } from "@/src/components/auth/AuthModal";
import { useState } from "react";
import { isLoggedIn } from "@/src/lib/auth";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AmbientOrbs = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <motion.div 
      animate={{ 
        x: [0, 50, 0], 
        y: [0, 30, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        x: [0, -40, 0], 
        y: [0, 50, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[150px]" 
    />
    <motion.div 
      animate={{ 
        x: [0, 30, 0], 
        y: [0, -40, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-fuchsia-500/10 rounded-full blur-[100px]" 
    />
  </div>
);

export const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isToolRoute = pathname.startsWith('/tools');
      const loggedIn = isLoggedIn();
      
      if (isToolRoute && !loggedIn) {
        setIsLocked(true);
        setIsAuthModalOpen(true);
      } else {
        setIsLocked(false);
        if (isToolRoute && loggedIn) {
          setIsAuthModalOpen(false);
        }
      }
    };

    checkAuth();

    window.addEventListener('veriscribe_auth_change', checkAuth);
    return () => {
      window.removeEventListener('veriscribe_auth_change', checkAuth);
    };
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4), // ultra-smooth quartic out deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis exclusively via GSAP ticker for perfect, stutter-free scroll synchronization
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Refresh GSAP ScrollTrigger after the page transition has finished
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    // Handle hash scroll after page change
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Wait for page transition and rendering
    }

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f1f5f9] selection:bg-violet-500/30 overflow-x-hidden">
      <AmbientOrbs />
      <GlassFilter />
      <Navbar onSignIn={() => {
        setIsLocked(false);
        setIsAuthModalOpen(true);
      }} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} isLocked={isLocked} />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      
      {/* Global SVG Filters for Liquid Glass */}
      <svg className="hidden">
        <defs>
          <filter id="glass-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
