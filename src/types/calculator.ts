export interface CalculatorFormData {
  cenaNetto: string;
  cenaZakupuNetto: string;
  bonus: string;
  iloscCiec: string;
  iloscBebnow: string;
  miejsceDostawy: string;
  skadWysylka: string;
  iloscKabla: string;
  producent: string;
  cableId?: string;
  cableType?: string;
  cableSection?: string;
  cableMass?: number;
}

export interface CalculationResult {
  wynik: number;
  przychody: number;
  koszty: number;
  kosztTransportu: number;
  kosztCiecia: number;
  odbiorBebnow: number;
  bonusKwota: number;
  dystans?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}