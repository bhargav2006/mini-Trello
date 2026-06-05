import React from 'react';

export default function Badge({
  children,
  variant = 'gray',
  className = '',
}) {
  const variants = {
    red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
    yellow: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
    gray: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800/50',
    brand: 'bg-[#ef2b2d]/10 text-[#ef2b2d] border-[#ef2b2d]/20 dark:bg-[#ef2b2d]/20 dark:text-red-400 dark:border-[#ef2b2d]/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
