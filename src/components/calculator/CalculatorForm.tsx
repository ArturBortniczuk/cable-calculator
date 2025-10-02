import React from 'react';
import { Package, MapPin, Scissors, TrendingUp, Sparkles, Ruler } from 'lucide-react';
import { Input, Button, Card } from '@/components/ui';
import { CableSelector } from './CableSelector';
import { useCables } from '@/hooks/useCables';
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
  // Hook do zarządzania kablami
  const {
    cableTypes,
    selectedType,
    setSelectedType,
    sections,
    loading: cablesLoading,
    error: cablesError,
  } = useCables();

  const [selectedCable, setSelectedCable] = React.useState<any>(null);
  const [cableLength, setCableLength] = React.useState('');
  const [drumCount, setDrumCount] = React.useState('');
  const [autoCalculateDrums, setAutoCalculateDrums] = React.useState(true);

  // Obsługa wyboru kabla
  const handleCableSelection = (cable: any) => {
    setSelectedCable(cable);
    
    // Oblicz masę kabla
    const mass = cableLength ? (parseFloat(cableLength) / 1000) * cable.masa_kg_km : 0;
    
    // Zaktualizuj dane kabla w formularzu poprzez syntetyczne eventy
    const updates = [
      { name: 'cableId', value: cable.id },
      { name: 'cableType', value: selectedType },
      { name: 'cableSection', value: cable.przekroj },
      { name: 'cableMass', value: mass.toString() },
    ];
    
    updates.forEach(update => {
      const syntheticEvent = {
        target: update
      } as React.ChangeEvent<HTMLInputElement>;
      onInputChange(syntheticEvent);
    });
    
    // Automatyczne obliczenie ilości bębnów jeśli mamy długość kabla
    if (cableLength && autoCalculateDrums) {
      const estimatedDrums = Math.ceil(parseFloat(cableLength) / 750);
      setDrumCount(estimatedDrums.toString());
      
      const syntheticEvent = {
        target: { name: 'iloscBebnow', value: estimatedDrums.toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      onInputChange(syntheticEvent);
    }
  };

  // Obsługa zmiany długości kabla
  const handleCableLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = e.target.value;
    setCableLength(length);
    onInputChange(e);

    // Oblicz masę jeśli wybrany kabel
    if (selectedCable && length) {
      const mass = (parseFloat(length) / 1000) * selectedCable.masa_kg_km;
      const syntheticEvent = {
        target: { name: 'cableMass', value: mass.toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      onInputChange(syntheticEvent);
    }

    // Auto-oblicz ilość bębnów
    if (length && selectedCable && autoCalculateDrums) {
      const estimatedDrums = Math.ceil(parseFloat(length) / 750);
      setDrumCount(estimatedDrums.toString());
      
      const syntheticEvent = {
        target: { name: 'iloscBebnow', value: estimatedDrums.toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      onInputChange(syntheticEvent);
    }
  };

  // Obsługa ręcznej zmiany ilości bębnów
  const handleDrumCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDrumCount(e.target.value);
    setAutoCalculateDrums(false);
    onInputChange(e);
  };

  return (
    <Card title="Dane transakcji" icon={<Package className="w-6 h-6 text-indigo-600" />}>
      <div className="space-y-5">
        {/* Sekcja wyboru kabla */}
        <CableSelector
          cableTypes={cableTypes}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sections={sections}
          selectedSection={selectedCable}
          onSectionChange={handleCableSelection}
          loading={cablesLoading}
        />

        {cablesError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-700 text-sm font-medium">{cablesError}</p>
            </div>
          </div>
        )}

        {/* Sekcja długości kabla i bębnów */}
        {selectedCable && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Ruler className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800">Parametry kabla</h4>
            </div>

            <Input
              label="Ilość kabla (m) *"
              type="number"
              name="iloscKabla"
              value={cableLength}
              onChange={handleCableLengthChange}
              placeholder="0"
              step="0.1"
              icon={<Ruler className="w-5 h-5" />}
            />

            {/* Przełącznik auto/ręczne bębny */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <input
                type="checkbox"
                id="autoCalculateDrums"
                checked={autoCalculateDrums}
                onChange={(e) => {
                  setAutoCalculateDrums(e.target.checked);
                  if (e.target.checked && cableLength && selectedCable) {
                    const estimatedDrums = Math.ceil(parseFloat(cableLength) / 750);
                    setDrumCount(estimatedDrums.toString());
                    const syntheticEvent = {
                      target: { name: 'iloscBebnow', value: estimatedDrums.toString() }
                    } as React.ChangeEvent<HTMLInputElement>;
                    onInputChange(syntheticEvent);
                  }
                }}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="autoCalculateDrums" className="text-sm font-medium text-gray-700">
                Automatycznie oblicz ilość bębnów
              </label>
            </div>

            <Input
              label="Ilość bębnów *"
              type="number"
              name="iloscBebnow"
              value={drumCount}
              onChange={handleDrumCountChange}
              placeholder="0"
              disabled={autoCalculateDrums && !!cableLength}
            />

            {/* Podsumowanie obliczeń kabla */}
            {cableLength && selectedCable && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <h5 className="font-semibold text-gray-800 mb-3">Automatyczne obliczenia:</h5>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Masa kabla:</span>
                    <span className="font-bold text-indigo-600">
                      {((parseFloat(cableLength) / 1000) * selectedCable.masa_kg_km).toFixed(1)} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sugerowana ilość bębnów:</span>
                    <span className="font-bold text-indigo-600">
                      {Math.ceil(parseFloat(cableLength) / 750)} szt.
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min. średnica wewnętrzna bębna:</span>
                    <span className="font-bold text-indigo-600">
                      {(selectedCable.promien_giecia * 2).toFixed(1)} cm
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sekcja producenta */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100 space-y-4">
          <Input
            label="Producent"
            type="text"
            name="producent"
            value={formData.producent}
            onChange={onInputChange}
            placeholder="Nazwa producenta"
            icon={<Package className="w-5 h-5" />}
          />
        </div>

        {/* Sekcja cen */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100 space-y-4">
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
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
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
        </div>

        {/* Sekcja transportu */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-xl border border-orange-100 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg">
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