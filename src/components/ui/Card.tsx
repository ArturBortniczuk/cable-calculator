import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, icon, className = '' }) => {
  return (
    <div className={`
      relative overflow-hidden
      bg-white/80 backdrop-blur-sm
      rounded-3xl 
      shadow-2xl shadow-indigo-100/50
      p-8 
      border border-white/60
      transform transition-all duration-500
      hover:shadow-3xl hover:shadow-indigo-200/50
      hover:-translate-y-1
      ${className}
    `}>
      {/* Gradient overlay - subtelny efekt */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
      
      {/* Zawartość karty */}
      <div className="relative z-10">
        {title && (
          <div className="mb-6 pb-4 border-b-2 border-gradient-to-r from-indigo-100 to-purple-100">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-3">
              {icon && (
                <span className="transform transition-transform duration-300 hover:scale-110 hover:rotate-12">
                  {icon}
                </span>
              )}
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>

      {/* Subtelny border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
    </div>
  );
};