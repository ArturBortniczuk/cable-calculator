import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-12 pb-8">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Kalkulator Kabli. Wszystkie prawa zastrzeżone.
      </p>
    </footer>
  );
};