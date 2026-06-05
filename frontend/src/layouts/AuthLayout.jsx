import React from 'react';
import ThemeToggle from '../shared/ThemeToggle';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#ffffff] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden relative">
      {/* Background glowing gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ef2b2d]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ef2b2d]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle className="shadow-sm border border-gray-100 dark:border-gray-800 bg-white/75 dark:bg-[#111827]/75 backdrop-blur" />
      </div>

      {/* Left Section: Immersive Branding Panel */}
      <div className="w-full md:w-1/2 bg-[#0a0a0a] text-white flex flex-col justify-between p-8 md:p-16 relative overflow-hidden border-b md:border-b-0 md:border-r border-[#1f2937]/50">
        {/* Animated canvas/matrix grid simulation using CSS */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Immersive glowing nodes */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-[#ef2b2d] rounded-full shadow-[0_0_20px_#ef2b2d] animate-pulse-subtle" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#ef2b2d]/60 rounded-full shadow-[0_0_15px_#ef2b2d] animate-float" />
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-[#ef2b2d] rounded-full shadow-[0_0_15px_#ef2b2d] animate-pulse" />

        {/* Logo and company title */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-lg bg-[#ef2b2d] flex items-center justify-center font-display font-black text-xl text-white shadow-[0_0_15px_rgba(239,43,45,0.4)]">
            AX
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider font-display">
              Azentrix
            </span>
            <span className="text-[#ef2b2d] font-light text-sm block tracking-wide">
              DIGITAL SOLUTIONS
            </span>
          </div>
        </div>

        {/* Dynamic visual section */}
        <div className="my-auto py-12 relative z-10 max-w-md">
          <h1 className="text-4xl md:text-5xl font-black font-display leading-tight tracking-tight">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#ef2b2d] font-black">Digital Matrix</span>
          </h1>
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Collaborate, build, and deliver state-of-the-art enterprise tasks with the next generation multi-tenant board system.
          </p>

          {/* Micro stats inside branding panel */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#1f2937] pt-8">
            <div>
              <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Speed</p>
              <p className="text-xl font-bold font-display mt-1 text-[#ef2b2d]">Real-time</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Sync</p>
              <p className="text-xl font-bold font-display mt-1 text-white">Instant</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">UI</p>
              <p className="text-xl font-bold font-display mt-1 text-white">Premium</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-[#64748b] mt-auto relative z-10">
          © {new Date().getFullYear()} Azentrix Digital Services. All rights reserved.
        </div>
      </div>

      {/* Right Section: Form Wrapper */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 relative z-10">
        <div className="w-full max-w-md bg-white/50 dark:bg-[#111827]/40 p-8 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-premium dark:shadow-premium-dark backdrop-blur animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
