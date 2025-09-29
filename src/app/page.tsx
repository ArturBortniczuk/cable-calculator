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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid md:grid-cols-2 gap-8">
          <CalculatorForm
            formData={formData}
            onInputChange={handleInputChange}
            onCalculate={calculate}
            loading={loading}
            error={error}
          />

          <ResultsPanel result={result} />
        </div>

        <Footer />
      </div>
    </div>
  );
}