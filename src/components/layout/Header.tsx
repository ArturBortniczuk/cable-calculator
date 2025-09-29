import React from 'react';
import { Calculator, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-16 animate-fade-in">
      <div className="relative inline-block mb-6">
        {/* Efekt świetlny za ikoną */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 blur-3xl opacity-30 animate-pulse-glow"></div>
        
        {/* Kontener z ikoną */}
        <div className="relative flex items-center justify-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:rotate-6">
              <Calculator className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-black">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Kalkulator Kabli
            </span>
          </h1>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 text-xl mb-4 font-medium">
          Profesjonalne obliczenia rentowności transakcji
        </p>
        
        {/* Badges */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full text-sm font-semibold text-indigo-700 hover:shadow-md transition-all">
            <Zap className="w-4 h-4" />
            Szybkie obliczenia
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full text-sm font-semibold text-emerald-700 hover:shadow-md transition-all">
            ✓ Dokładne wyniki
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full text-sm font-semibold text-blue-700 hover:shadow-md transition-all">
            🚀 Łatwe w użyciu
          </span>
        </div>
      </div>
    </header>
  );
};