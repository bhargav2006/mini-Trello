import React from 'react';

export default function Input({
  label,
  type = 'text',
  placeholder = '',
  name,
  value,
  onChange,
  error,
  required = false,
  className = '',
  disabled = false,
  icon: Icon,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-semibold tracking-wider text-[#64748b] dark:text-gray-400 uppercase">
          {label} {required && <span className="text-[#ef2b2d]">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#64748b] dark:text-gray-500">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full py-2.5 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef2b2d]/30 
            ${Icon ? 'pl-11 pr-4' : 'px-4'} 
            ${disabled ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-transparent text-gray-900 dark:text-gray-100'}
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-gray-200 dark:border-gray-800 focus:border-[#ef2b2d] dark:focus:border-[#ef2b2d]'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs font-medium text-red-500 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}
