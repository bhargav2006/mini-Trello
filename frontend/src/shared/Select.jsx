import React from 'react';

export default function Select({
  label,
  name,
  value,
  onChange,
  error,
  options = [],
  required = false,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-semibold tracking-wider text-textSecondary uppercase">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2 bg-surface
          ${disabled ? 'text-textSubtle bg-surface-sunken cursor-not-allowed' : 'text-textPrimary'}
          ${error 
            ? 'border-error focus:border-error focus:ring-error/20' 
            : 'border-border hover:border-control-border focus:border-primary focus:ring-primary/20'
          }
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs font-medium text-error mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}
