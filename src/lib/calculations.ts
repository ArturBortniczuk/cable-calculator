import { PRICING } from './constants';
import type { CalculatorFormData, CalculationResult } from '@/types/calculator';

export function calculateResult(
  formData: CalculatorFormData,
  dystans: number = 0
): CalculationResult {
  const cenaSprzedazy = parseFloat(formData.cenaNetto);
  const cenaZakupu = parseFloat(formData.cenaZakupuNetto);
  const bonusValue = parseFloat(formData.bonus) || 0;
  const iloscCiecValue = parseFloat(formData.iloscCiec);
  const iloscBebnowValue = parseFloat(formData.iloscBebnow);

  // Koszty
  const kosztTransportu = dystans * PRICING.CENA_ZA_KM;
  const kosztCiecia = PRICING.CENA_CIECIA;
  const odbiorBebnow = iloscBebnowValue * PRICING.CENA_ODBIORU_BEBNA;

  // Przychody
  const przychodBrutto = cenaSprzedazy * iloscCiecValue;
  const bonusKwota = (bonusValue / 100) * przychodBrutto;
  const calkowitePrzychody = przychodBrutto + bonusKwota;

  // Koszty całkowite
  const kosztZakupu = cenaZakupu * iloscCiecValue;
  const calkowiteKoszty = kosztZakupu + kosztTransportu + odbiorBebnow + kosztCiecia;

  // Wynik
  const wynikKoncowy = calkowitePrzychody - calkowiteKoszty;

  return {
    wynik: wynikKoncowy,
    przychody: calkowitePrzychody,
    koszty: calkowiteKoszty,
    kosztTransportu,
    kosztCiecia,
    odbiorBebnow,
    bonusKwota,
    dystans,
  };
}

export function validateFormData(formData: CalculatorFormData): boolean {
  const required = ['cenaNetto', 'cenaZakupuNetto', 'iloscCiec', 'iloscBebnow'];
  return required.every(field => formData[field as keyof CalculatorFormData] !== '');
}
