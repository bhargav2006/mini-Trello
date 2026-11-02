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
  style = {},
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow active:scale-[0.98]',
    secondary: 'bg-surface-sunken text-textPrimary hover:bg-surface border border-border hover:border-control-border',
    outline: 'border border-control-border bg-transparent text-textPrimary hover:bg-surface-sunken',
    danger: 'bg-error text-white hover:bg-error/90 shadow-sm active:scale-[0.98]',
    ghost: 'bg-transparent text-textSecondary hover:bg-surface-sunken hover:text-textPrimary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  const dynamicStyle = {
    ...(variant === 'primary' ? {
      backgroundColor: 'var(--color-primary, #0F766E)',
      color: '#FFFFFF',
    } : {}),
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={dynamicStyle}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
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
