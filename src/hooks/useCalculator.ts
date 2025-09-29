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
};

export function useCalculator() {
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

  const calculate = async () => {
    setError(null);

    if (!validateFormData(formData)) {
      setError('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    setLoading(true);

    try {
      let dystans = 0;

      if (formData.miejsceDostawy && formData.skadWysylka) {
        dystans = await calculateDistance(formData.skadWysylka, formData.miejsceDostawy);
      }

      const calculatedResult = calculateResult(formData, dystans);
      setResult(calculatedResult);
    } catch (err) {
      setError('Wystąpił błąd podczas obliczania. Spróbuj ponownie.');
      console.error(err);
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
    calculate,
    reset,
  };
}