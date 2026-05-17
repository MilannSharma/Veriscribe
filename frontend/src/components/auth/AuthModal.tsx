"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, User, Chrome } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { loginUser } from "@/src/lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLocked?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, isLocked = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    
    loginUser(name, email, phone);
    onClose();
  };

  const handleSocialLogin = () => {
    loginUser("Academic Pioneer", "pioneer@veriscribe.edu", "+1 (555) 777-8888");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with extreme blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLocked ? undefined : onClose}
            className={cn(
              "fixed inset-0 z-[1000] bg-black/75 backdrop-blur-[24px]",
              isLocked && "cursor-not-allowed"
            )}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md premium-depth-card p-8 rounded-[40px] pointer-events-auto relative overflow-hidden border border-white/10"
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/10 rounded-full blur-[60px]" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-fuchsia-600/10 rounded-full blur-[60px]" />

              {/* Close Button - strictly hidden if isLocked is active */}
              {!isLocked && (
                <button 
                  onClick={onClose}
                  aria-label="Close modal"
                  className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-silver-matte mb-2">
                  {isLocked ? "Workspace Locked" : "Welcome Back"}
                </h2>
                <p className="text-white/40 text-sm font-light">
                  {isLocked ? "Please login to access AI forensic tools" : "Access your cinematic workspace"}
                </p>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={handleSocialLogin}
                  className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer"
                >
                  <Chrome className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Google</span>
                </button>
                <button 
                  onClick={handleSocialLogin}
                  className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer"
                >
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 23 23">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Microsoft</span>
                </button>
              </div>

              <div className="relative mb-8 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">OR CONTINUE WITH</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-violet-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-violet-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Mobile Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-violet-500/50 transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-[1.01] transition-all mt-4 cursor-pointer"
                >
                  Enter Workspace
                </button>
              </form>

              {/* Footer */}
              <p className="text-center mt-8 text-[10px] text-white/20 uppercase tracking-widest">
                By signing in, you agree to our <span className="text-white/40 cursor-pointer hover:text-white transition-colors underline decoration-white/10">Terms</span> and <span className="text-white/40 cursor-pointer hover:text-white transition-colors underline decoration-white/10">Privacy</span>.
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
