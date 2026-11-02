import React from "react";
import ThemeToggle from "../shared/ThemeToggle";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg text-textPrimary transition-colors duration-300 overflow-hidden relative">
      {/* Background ambient glowing gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle className="shadow-sm border border-border bg-surface/80 backdrop-blur" />
      </div>

      {/* Left Section: Workspace Branding Panel */}
      <div className="w-full md:w-1/2 bg-surface-sunken text-textPrimary flex flex-col justify-between p-8 md:p-16 relative overflow-hidden border-b md:border-b-0 md:border-r border-border">
        {/* Animated grid simulation */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Immersive glowing nodes */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full shadow-[0_0_20px_var(--color-primary)] animate-pulse-subtle" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary/60 rounded-full shadow-[0_0_15px_var(--color-primary)] animate-float" />
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_var(--color-primary)] animate-pulse" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-border shadow-md shrink-0">
            <img
              src="/assets/bhargav-kb-logo-circular.png"
              alt="KB Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-extrabold text-lg text-textPrimary tracking-tight">
            <span className="text-primary font-bold">KB</span> Task Board
          </span>
        </div>

        {/* Dynamic visual section */}
        <div className="my-auto py-12 relative z-10 max-w-md">
          <h1 className="text-4xl md:text-5xl font-black font-display leading-tight tracking-tight text-textPrimary">
            Build Your{" "}
            <span
              className="font-black"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-tertiary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Workspace
            </span>
          </h1>
          <p className="mt-4 text-textSecondary text-sm leading-relaxed">
            Collaborate, organize, and deliver work with a clean real-time task
            board built for modern teams.
          </p>

          {/* Micro stats inside branding panel */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
            <div>
              <p className="text-xs font-semibold text-textSubtle uppercase tracking-wider">
                Speed
              </p>
              <p className="text-xl font-bold font-display mt-1 text-primary">
                Real-time
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-textSubtle uppercase tracking-wider">
                Sync
              </p>
              <p className="text-xl font-bold font-display mt-1 text-textPrimary">
                Instant
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-textSubtle uppercase tracking-wider">
                Design
              </p>
              <p className="text-xl font-bold font-display mt-1 text-tertiary">
                Verdant
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-textSubtle mt-auto relative z-10">
          © {new Date().getFullYear()} KB Task Board. All rights reserved.
        </div>
      </div>

      {/* Right Section: Form Wrapper */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 relative z-10">
        <div className="w-full max-w-md bg-surface p-8 rounded-2xl border border-border shadow-card backdrop-blur animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
