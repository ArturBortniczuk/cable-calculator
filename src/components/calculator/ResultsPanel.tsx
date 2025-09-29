import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Truck, Scissors } from 'lucide-react';
import { Card } from '@/components/ui';
import type { CalculationResult } from '@/types/calculator';

interface ResultsPanelProps {
  result: CalculationResult | null;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  if (!result) {
    return (
      <Card className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-400">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Wypełnij formularz i oblicz wynik</p>
        </div>
      </Card>
    );
  }

  const isProfit = result.wynik > 0;

  return (
    <Card>
      {/* Główny wynik */}
      <div className={`rounded-xl p-6 mb-6 ${isProfit ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-red-50 to-pink-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Wynik transakcji</p>
            <p className={`text-4xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
              {result.wynik.toFixed(2)} zł
            </p>
          </div>
          {isProfit ? (
            <CheckCircle className="w-12 h-12 text-green-500" />
          ) : (
            <AlertCircle className="w-12 h-12 text-red-500" />
          )}
        </div>
      </div>

      {/* Szczegóły */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
          <span className="text-gray-700 font-medium">Całkowite przychody</span>
          <span className="text-blue-600 font-bold text-lg">{result.przychody.toFixed(2)} zł</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-700 font-medium">Całkowite koszty</span>
          <span className="text-gray-600 font-bold text-lg">{result.koszty.toFixed(2)} zł</span>
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">Rozbicie kosztów</h3>
          
          <div className="space-y-2">
            {result.bonusKwota > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Bonus</span>
                <span className="text-green-600 font-medium">+{result.bonusKwota.toFixed(2)} zł</span>
              </div>
            )}

            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-600 flex items-center">
                <Scissors className="w-4 h-4 mr-1" />
                Cięcie
              </span>
              <span className="text-gray-700 font-medium">{result.kosztCiecia.toFixed(2)} zł</span>
            </div>

            {result.kosztTransportu > 0 && (
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600 flex items-center">
                  <Truck className="w-4 h-4 mr-1" />
                  Transport {result.dystans && `(${result.dystans} km)`}
                </span>
                <span className="text-gray-700 font-medium">{result.kosztTransportu.toFixed(2)} zł</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Odbiór bębnów</span>
              <span className="text-gray-700 font-medium">{result.odbiorBebnow.toFixed(2)} zł</span>
            </div>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg border-2 ${isProfit ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <p className="text-sm font-medium text-center">
            {isProfit 
              ? '✓ Transakcja przyniesie zysk' 
              : '✗ Transakcja przyniesie stratę'
            }
          </p>
        </div>
      </div>
    </Card>
  );
};
