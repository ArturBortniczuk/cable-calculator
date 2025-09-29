import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, icon, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};