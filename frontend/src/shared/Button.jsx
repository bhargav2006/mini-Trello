import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef2b2d]/50 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#ef2b2d] text-white hover:bg-[#ef2b2d]/90 shadow-md hover:shadow-lg active:scale-[0.98]',
    secondary: 'bg-[#1f2937]/10 dark:bg-white/10 text-[#64748b] dark:text-gray-300 hover:bg-[#1f2937]/20 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white',
    outline: 'border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#111827]',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md active:scale-[0.98]',
    ghost: 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="h-4 w-4 text-current" />
      ) : null}
      {children}
    </button>
  );
}
