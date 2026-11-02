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
        <label className="text-xs font-semibold tracking-wider text-textSecondary uppercase">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-textSubtle">
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
          className={`w-full py-2.5 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2 
            ${Icon ? 'pl-11 pr-4' : 'px-4'} 
            ${disabled ? 'bg-surface-sunken text-textSubtle cursor-not-allowed' : 'bg-surface text-textPrimary'}
            ${error 
              ? 'border-error focus:border-error focus:ring-error/20' 
              : 'border-border hover:border-control-border focus:border-primary focus:ring-primary/20'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs font-medium text-error mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}
