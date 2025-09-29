import React from 'react';
import { Package, MapPin, Scissors, TrendingUp, Sparkles } from 'lucide-react';
import { Input, Button, Card } from '@/components/ui';
import type { CalculatorFormData } from '@/types/calculator';

interface CalculatorFormProps {
  formData: CalculatorFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
  loading: boolean;
  error: string | null;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  formData,
  onInputChange,
  onCalculate,
  loading,
  error,
}) => {
  return (
    <Card title="Dane transakcji" icon={<Package className="w-6 h-6 text-indigo-600" />}>
      <div className="space-y-5">
        {/* Sekcja cen z gradientowym tłem */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100 space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800">Wartości finansowe</h4>
          </div>
          
          <Input
            label="Cena sprzedaży netto (zł) *"
            type="number"
            name="cenaNetto"
            value={formData.cenaNetto}
            onChange={onInputChange}
            placeholder="0.00"
            step="0.01"
            icon={<TrendingUp className="w-5 h-5" />}
          />

          <Input
            label="Cena zakupu netto (zł) *"
            type="number"
            name="cenaZakupuNetto"
            value={formData.cenaZakupuNetto}
            onChange={onInputChange}
            placeholder="0.00"
            step="0.01"
            icon={<Package className="w-5 h-5" />}
          />

          <Input
            label="Bonus (%)"
            type="number"
            name="bonus"
            value={formData.bonus}
            onChange={onInputChange}
            placeholder="0"
            step="0.1"
            icon={<Sparkles className="w-5 h-5" />}
          />
        </div>

        {/* Sekcja logistyki */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100 space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800">Parametry logistyczne</h4>
          </div>

          <Input
            label="Ilość cięć *"
            type="number"
            name="iloscCiec"
            value={formData.iloscCiec}
            onChange={onInputChange}
            placeholder="0"
            icon={<Scissors className="w-5 h-5" />}
          />

          <Input
            label="Ilość bębnów *"
            type="number"
            name="iloscBebnow"
            value={formData.iloscBebnow}
            onChange={onInputChange}
            placeholder="0"
          />

          <Input
            label="Ilość kabla (m)"
            type="number"
            name="iloscKabla"
            value={formData.iloscKabla}
            onChange={onInputChange}
            placeholder="0"
          />

          <Input
            label="Producent"
            type="text"
            name="producent"
            value={formData.producent}
            onChange={onInputChange}
            placeholder="Nazwa producenta"
          />
        </div>

        {/* Sekcja transportu */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100 space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800">Transport</h4>
          </div>

          <Input
            label="Skąd wysyłka"
            type="text"
            name="skadWysylka"
            value={formData.skadWysylka}
            onChange={onInputChange}
            placeholder="Adres punktu nadania"
            icon={<MapPin className="w-5 h-5" />}
          />

          <Input
            label="Miejsce dostawy"
            type="text"
            name="miejsceDostawy"
            value={formData.miejsceDostawy}
            onChange={onInputChange}
            placeholder="Adres dostawy"
            icon={<MapPin className="w-5 h-5" />}
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <Button
          variant="primary"
          onClick={onCalculate}
          loading={loading}
          className="w-full mt-6 text-lg py-4 shadow-lg hover:shadow-xl"
        >
          {loading ? 'Obliczam...' : '🚀 Oblicz wynik'}
        </Button>
      </div>
    </Card>
  );
};