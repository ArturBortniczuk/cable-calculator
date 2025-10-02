// Logika obliczania bębnów - przeniesiona z Python app.py

export interface Cable {
  id: string;
  przekroj: string;
  srednica_zewnetrzna: number;
  promien_giecia: number;
  masa_kg_km: number;
  ksztalt?: string | null;
}

export interface DrumRequirement {
  minInnerDiameter: number;
  estimatedDrums: number;
  cableMass: number;
  drumMassEstimate: number;
}

/**
 * Oblicza minimalne wymagania dla bębnów na podstawie kabla
 * @param cable - Dane kabla
 * @param cableLength - Długość kabla w metrach
 * @returns Wymagania dla bębnów
 */
export function calculateDrumRequirements(
  cable: Cable,
  cableLength: number
): DrumRequirement {
  const srednicaKabla = cable.srednica_zewnetrzna / 10; // cm -> dm (dla obliczeń)
  let promienGiecia = cable.promien_giecia / 10; // cm -> dm

  // Zmniejsz promień gięcia dla krótkich długości (jak w app.py)
  if (cableLength < 400) {
    promienGiecia = Math.max(promienGiecia - 5, 0);
  }

  // Minimalna średnica wewnętrzna bębna (2 * promień gięcia)
  const minInnerDiameter = promienGiecia * 2;

  // Masa kabla (długość w km * masa kg/km)
  const cableMass = (cableLength / 1000) * cable.masa_kg_km;

  // Przybliżone obliczenie liczby bębnów
  // Zakładamy standardowy bęben może pomieścić ~500-1000m kabla
  // To uproszczone - właściwe obliczenie wymaga danych o bębnach
  const averageCablePerDrum = 750; // metry
  const estimatedDrums = Math.ceil(cableLength / averageCablePerDrum);

  // Szacowana masa bębna (uproszczone - zależy od rozmiaru)
  const drumMassEstimate = estimatedDrums * 50; // ~50kg na bęben (średnia)

  return {
    minInnerDiameter,
    estimatedDrums,
    cableMass,
    drumMassEstimate,
  };
}

/**
 * Bardziej szczegółowe obliczenie - wymaga danych o konkretnych bębnach
 * To jest uproszczona wersja funkcji calculate_cable_on_drum z app.py
 */
export function calculateCableOnDrum(
  drumDiameter: number,
  drumWidth: number,
  innerDiameter: number,
  cableDiameter: number,
  targetLength: number
): { achievedLength: number; layers: number } {
  let layer = 0;
  let totalLength = 0;
  const maxLayers = 50;

  while (totalLength < targetLength && layer < maxLayers) {
    const currentLayerDiameter = innerDiameter + layer * cableDiameter * 2;

    // Sprawdź czy nie przekraczamy średnicy bębna
    if (currentLayerDiameter > drumDiameter - 5) {
      break;
    }

    // Obwód warstwy
    const layerCircumference = Math.PI * currentLayerDiameter;

    // Liczba zwojów na warstwie
    const turnsPerLayer = Math.floor(drumWidth / cableDiameter);

    // Długość na tej warstwie
    const lengthOnLayer = (turnsPerLayer * layerCircumference) / 100; // cm -> m

    totalLength += lengthOnLayer;
    layer++;
  }

  return {
    achievedLength: totalLength,
    layers: layer,
  };
}

/**
 * Formatuje wynik do wyświetlenia
 */
export function formatDrumRequirements(req: DrumRequirement): string {
  return `
    Wymagania dla bębnów:
    • Min. średnica wewnętrzna: ${req.minInnerDiameter.toFixed(1)} cm
    • Szacowana liczba bębnów: ${req.estimatedDrums}
    • Masa kabla: ${req.cableMass.toFixed(1)} kg
    • Szacowana masa bębnów: ${req.drumMassEstimate} kg
    • Łączna masa: ${(req.cableMass + req.drumMassEstimate).toFixed(1)} kg
  `.trim();
}