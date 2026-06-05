import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-[#ef2b2d] dark:hover:text-[#ef2b2d] ${className}`}
      aria-label="Toggle theme mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun size={20} className="transform transition-transform duration-500 rotate-0 hover:rotate-45" />
        ) : (
          <Moon size={20} className="transform transition-transform duration-500 rotate-0 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
