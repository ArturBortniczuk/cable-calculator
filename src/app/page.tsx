'use client';

import { Header, Footer } from '@/components/layout';
import { CalculatorForm, ResultsPanel } from '@/components/calculator';
import { useCalculator } from '@/hooks/useCalculator';

export default function Home() {
  const {
    formData,
    result,
    loading,
    error,
    handleInputChange,
    calculate,
  } = useCalculator();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animowane tło z gradientami */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-gradient"></div>
      
      {/* Floating shapes w tle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Zawartość */}
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Header />

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CalculatorForm
                formData={formData}
                onInputChange={handleInputChange}
                onCalculate={calculate}
                loading={loading}
                error={error}
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <ResultsPanel result={result} />
            </div>
          </div>

          {/* Dodatkowe informacje */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/60 hover:shadow-2xl transition-all hover:-translate-y-2 duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Natychmiastowe wyniki</h3>
                <p className="text-gray-600 text-sm">Otrzymuj dokładne obliczenia w ułamku sekundy</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/60 hover:shadow-2xl transition-all hover:-translate-y-2 duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Precyzyjne obliczenia</h3>
                <p className="text-gray-600 text-sm">Wszystkie koszty uwzględnione w kalkulacji</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/60 hover:shadow-2xl transition-all hover:-translate-y-2 duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Przejrzyste wyniki</h3>
                <p className="text-gray-600 text-sm">Szczegółowe rozbicie wszystkich kosztów</p>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}