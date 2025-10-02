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
  cableMass?: number | string; // Może być stringiem z formularza
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
  // Dodatkowe pola dla kabli
  cableMass?: number;
  cableLength?: number;
  cableType?: string;
  cableSection?: string;
  drumEstimate?: {
    minInnerDiameter: number;
    estimatedDrums: number;
    drumMass: number;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

// Typy dla kabli
export interface Cable {
  id: string;
  przekroj: string;
  srednica_zewnetrzna: number;
  promien_giecia: number;
  masa_kg_km: number;
  ksztalt?: string | null;
}

export interface CableData {
  version: string;
  totalVariants: number;
  cableTypes: string[];
  cables: {
    [key: string]: Cable[];
  };
}