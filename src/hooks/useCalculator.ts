import { useState } from 'react';
import { calculateDistance } from '@/lib/googleMaps';
import { calculateResult, validateFormData } from '@/lib/calculations';
import type { CalculatorFormData, CalculationResult } from '@/types/calculator';

const initialFormData: CalculatorFormData = {
  cenaNetto: '',
  cenaZakupuNetto: '',
  bonus: '',
  iloscCiec: '',
  iloscBebnow: '',
  miejsceDostawy: '',
  skadWysylka: '',
  iloscKabla: '',
  producent: '',
  cableId: '',
  cableType: '',
  cableSection: '',
  cableMass: 0,
};

export function useCalculator() { function useCalculator() {
  const [formData, setFormData] = useState<CalculatorFormData>(initialFormData);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const updateCableData = (cableData: Partial<CalculatorFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...cableData,
    }));
  };

  const calculate = async () => {
    setError(null);

    // Walidacja podstawowych pól
    const requiredFields = ['cenaNetto', 'cenaZakupuNetto', 'iloscCiec', 'iloscBebnow'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof CalculatorFormData]);
    
    if (missingFields.length > 0) {
      setError('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    setLoading(true);

    try {
      let dystans = 0;

      // Oblicz dystans jeśli podano adresy
      if (formData.miejsceDostawy && formData.skadWysylka) {
        try {
          dystans = await calculateDistance(formData.skadWysylka, formData.miejsceDostawy);
        } catch (distanceError) {
          console.warn('Nie udało się obliczyć dystansu, kontynuuję bez niego', distanceError);
          // Dystans pozostaje 0, obliczenia będą bez kosztów transportu
        }
      }

      // Oblicz wynik
      const calculatedResult = calculateResult(formData, dystans);
      
      // Dodaj informacje o kablu do wyniku jeśli dostępne
      if (formData.cableMass && formData.iloscKabla) {
        calculatedResult.cableMass = formData.cableMass;
        calculatedResult.cableLength = parseFloat(formData.iloscKabla);
        calculatedResult.cableType = formData.cableType;
        calculatedResult.cableSection = formData.cableSection;
      }
      
      setResult(calculatedResult);
    } catch (err) {
      setError('Wystąpił błąd podczas obliczania. Spróbuj ponownie.');
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFormData(initialFormData);
    setResult(null);
    setError(null);
  };

  return {
    formData,
    result,
    loading,
    error,
    handleInputChange,
    updateCableData,
    calculate,
    reset,
  };
}