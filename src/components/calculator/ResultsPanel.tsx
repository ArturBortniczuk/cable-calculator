import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Truck, Scissors, Sparkles, Target } from 'lucide-react';
import { Card } from '@/components/ui';
import type { CalculationResult } from '@/types/calculator';

interface ResultsPanelProps {
  result: CalculationResult | null;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  if (!result) {
    return (
      <Card className="flex items-center justify-center min-h-[600px] bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-dashed border-gray-200">
        <div className="text-center text-gray-400 animate-pulse">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 blur-2xl opacity-20 rounded-full"></div>
            <TrendingUp className="w-20 h-20 mx-auto relative opacity-50" />
          </div>
          <p className="text-xl font-medium">Wypełnij formularz</p>
          <p className="text-sm mt-2">i zobacz szczegółowe wyniki</p>
        </div>
      </Card>
    );
  }

  const isProfit = result.wynik > 0;
  const profitPercentage = ((result.wynik / result.przychody) * 100).toFixed(1);

  return (
    <Card className="space-y-6 animate-fade-in">
      {/* Główny wynik z animacją */}
      <div className={`relative overflow-hidden rounded-2xl p-8 ${
        isProfit 
          ? 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500' 
          : 'bg-gradient-to-br from-rose-500 via-red-500 to-pink-500'
      } shadow-2xl transform hover:scale-[1.02] transition-all duration-300`}>
        {/* Efekt świetlny w tle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Wynik transakcji
            </p>
            <p className="text-white text-5xl font-bold mb-2">
              {result.wynik.toFixed(2)} zł
            </p>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                Marża: {profitPercentage}%
              </div>
            </div>
          </div>
          {isProfit ? (
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
              <CheckCircle className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
          ) : (
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
              <AlertCircle className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Statystyki w kartach */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            Przychody
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {result.przychody.toFixed(2)} zł
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
            <Target className="w-4 h-4 text-gray-500" />
            Koszty
          </p>
          <p className="text-2xl font-bold text-gray-700">
            {result.koszty.toFixed(2)} zł
          </p>
        </div>
      </div>

      {/* Szczegółowe rozbicie */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Rozbicie kosztów
        </h3>
        
        <div className="space-y-3">
          {result.bonusKwota > 0 && (
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-md transition-all">
              <span className="text-gray-700 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Bonus
              </span>
              <span className="text-green-600 font-bold">+{result.bonusKwota.toFixed(2)} zł</span>
            </div>
          )}

          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all">
            <span className="text-gray-700 font-medium flex items-center gap-2">
              <Scissors className="w-4 h-4 text-blue-500" />
              Cięcie
            </span>
            <span className="text-gray-800 font-bold">{result.kosztCiecia.toFixed(2)} zł</span>
          </div>

          {result.kosztTransportu > 0 && (
            <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all">
              <div>
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-500" />
                  Transport
                </span>
                {result.dystans && (
                  <span className="text-xs text-gray-500 ml-6">{result.dystans} km</span>
                )}
              </div>
              <span className="text-gray-800 font-bold">{result.kosztTransportu.toFixed(2)} zł</span>
            </div>
          )}

          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all">
            <span className="text-gray-700 font-medium flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-xs text-purple-600">📦</span>
              </div>
              Odbiór bębnów
            </span>
            <span className="text-gray-800 font-bold">{result.odbiorBebnow.toFixed(2)} zł</span>
          </div>
        </div>
      </div>

      {/* Status transakcji */}
      <div className={`p-5 rounded-xl border-2 ${
        isProfit 
          ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50' 
          : 'border-red-300 bg-gradient-to-br from-red-50 to-pink-50'
      } transform hover:scale-[1.02] transition-all`}>
        <p className="text-center font-bold text-lg flex items-center justify-center gap-2">
          {isProfit ? (
            <>
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-green-700">Transakcja przyniesie zysk!</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-6 h-6 text-red-600" />
              <span className="text-red-700">Transakcja przyniesie stratę</span>
            </>
          )}
        </p>
      </div>
    </Card>
  );
};