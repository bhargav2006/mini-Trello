import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-200 bg-surface hover:bg-surface-sunken text-textSecondary hover:text-textPrimary border border-border shadow-sm active:scale-95 group focus-visible:ring-2 focus-visible:ring-primary/40 ${className}`}
      aria-label="Toggle theme mode"
      title={isDark ? "Switch to Verdant Signal (Light)" : "Switch to Obsidian & Forest (Dark)"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun size={18} className="text-tertiary transform transition-transform duration-300 rotate-0 group-hover:rotate-45" />
        ) : (
          <Moon size={18} className="text-secondary transform transition-transform duration-300 rotate-0 group-hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
