import React from 'react';
import { Package, MapPin, Scissors, TrendingUp } from 'lucide-react';
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
      <div className="space-y-4">
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
        />

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

        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
            Transport
          </h3>

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
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <Button
          variant="primary"
          onClick={onCalculate}
          loading={loading}
          className="w-full mt-6"
        >
          Oblicz wynik
        </Button>
      </div>
    </Card>
  );
};