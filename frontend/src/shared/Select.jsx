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
        <label className="text-xs font-semibold tracking-wider text-[#64748b] dark:text-gray-400 uppercase">
          {label} {required && <span className="text-[#ef2b2d]">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef2b2d]/30 bg-white dark:bg-[#111827]
          ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 dark:text-gray-100'}
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-gray-200 dark:border-gray-800 focus:border-[#ef2b2d] dark:focus:border-[#ef2b2d]'
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
        <span className="text-xs font-medium text-red-500 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}
