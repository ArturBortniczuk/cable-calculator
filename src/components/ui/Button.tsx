import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';
  
  const variants = {
    primary: `
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
      text-white 
      shadow-xl shadow-indigo-300/50
      hover:shadow-2xl hover:shadow-indigo-400/50
      hover:scale-105
      active:scale-95
      before:absolute before:inset-0 
      before:bg-gradient-to-r before:from-indigo-700 before:via-purple-700 before:to-pink-700
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 
      text-gray-800 
      shadow-lg shadow-gray-200/50
      hover:shadow-xl hover:shadow-gray-300/50
      hover:from-gray-200 hover:to-gray-300
      hover:scale-105
      active:scale-95
    `,
    outline: `
      border-3 border-indigo-600 
      text-indigo-600 
      bg-white
      shadow-lg shadow-indigo-100/50
      hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
      hover:shadow-xl hover:shadow-indigo-200/50
      hover:border-purple-600
      hover:scale-105
      active:scale-95
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Obliczam...</span>
          </div>
        ) : (
          <>
            {icon && <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>}
            {children}
          </>
        )}
      </span>
      
      {/* Animowany blask */}
      {!loading && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      )}
    </button>
  );
};