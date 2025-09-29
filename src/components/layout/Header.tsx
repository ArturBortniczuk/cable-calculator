import React from 'react';
import { Calculator } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12 animate-fade-in">
      <div className="flex items-center justify-center mb-4">
        <Calculator className="w-12 h-12 text-indigo-600 mr-3" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Kalkulator Kabli
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Profesjonalne obliczenia rentowności transakcji
      </p>
    </header>
  );
};