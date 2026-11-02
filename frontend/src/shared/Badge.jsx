import React from 'react';

export default function Badge({
  children,
  variant = 'gray',
  className = '',
}) {
  const variants = {
    red: 'bg-error-bg text-error border-error-border',
    yellow: 'bg-warning-bg text-warning border-warning-border',
    green: 'bg-success-bg text-success border-success-border',
    blue: 'bg-info-bg text-info border-info-border',
    gray: 'bg-surface-sunken text-textSecondary border-border',
    brand: 'bg-primary-container text-on-primary-container border-primary/25',
    primary: 'bg-primary-container text-on-primary-container border-primary/25',
    secondary: 'bg-secondary-container text-on-secondary-container border-secondary/25',
    tertiary: 'bg-tertiary-container text-on-tertiary-container border-tertiary/25',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${variants[variant] || variants.gray} ${className}`}
    >
      {children}
    </span>
  );
}
