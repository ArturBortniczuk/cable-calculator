import { useState, useEffect } from 'react';

interface Cable {
  id: string;
  przekroj: string;
  srednica_zewnetrzna: number;
  promien_giecia: number;
  masa_kg_km: number;
  ksztalt?: string | null;
}

export function useCables() {
  const [cableTypes, setCableTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [sections, setSections] = useState<Cable[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Załaduj typy kabli przy starcie
  useEffect(() => {
    loadCableTypes();
  }, []);

  // Załaduj przekroje gdy wybrano typ
  useEffect(() => {
    if (selectedType) {
      loadCableSections(selectedType);
    } else {
      setSections([]);
    }
  }, [selectedType]);

  const loadCableTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      // Próbuj załadować z API
      try {
        const response = await fetch('/api/cables');
        if (response.ok) {
          const data = await response.json();
          setCableTypes(data.cableTypes || []);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        console.warn('API nie działa, próbuję załadować z pliku JSON...');
      }

      // Fallback - załaduj bezpośrednio z pliku JSON
      const response = await fetch('/data/cables.json');
      if (!response.ok) throw new Error('Failed to load cable data');
      const data = await response.json();
      setCableTypes(data.cableTypes || []);
    } catch (err) {
      setError('Nie udało się załadować typów kabli');
      console.error('Error loading cable types:', err);
      
      // Ultimate fallback - hardcoded data
      setCableTypes(['YKY', 'YAKY', 'YAKXS', 'YDY', 'YDYp', 'N2XH', 'NAYY-J']);
    } finally {
      setLoading(false);
    }
  };

  const loadCableSections = async (type: string) => {
    setLoading(true);
    setError(null);
    try {
      // Próbuj załadować z API
      try {
        const response = await fetch(`/api/cables?type=${encodeURIComponent(type)}`);
        if (response.ok) {
          const data = await response.json();
          setSections(data.sections || []);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        console.warn('API nie działa, próbuję załadować z pliku JSON...');
      }

      // Fallback - załaduj bezpośrednio z pliku JSON
      const response = await fetch('/data/cables.json');
      if (!response.ok) throw new Error('Failed to load cable data');
      const data = await response.json();
      setSections(data.cables[type] || []);
    } catch (err) {
      setError('Nie udało się załadować przekrojów');
      console.error('Error loading cable sections:', err);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    cableTypes,
    selectedType,
    setSelectedType,
    sections,
    loading,
    error,
  };
}