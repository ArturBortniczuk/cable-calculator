import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="form-group">
      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full 
            px-4 ${icon ? 'pl-12' : ''} 
            py-3.5 
            bg-white/90
            border-2 ${error ? 'border-red-300' : 'border-gray-200'} 
            rounded-xl 
            focus:border-indigo-500 
            focus:ring-4 
            focus:ring-indigo-100
            focus:outline-none 
            transition-all duration-300
            placeholder:text-gray-400
            hover:border-gray-300
            hover:shadow-md
            ${className}
          `}
          {...props}
        />
        {/* Gradient border effect on focus */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
          <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};