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
      const response = await fetch('/api/cables');
      if (!response.ok) throw new Error('Failed to load cable types');
      const data = await response.json();
      setCableTypes(data.cableTypes);
    } catch (err) {
      setError('Nie udało się załadować typów kabli');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCableSections = async (type: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/cables?type=${encodeURIComponent(type)}`);
      if (!response.ok) throw new Error('Failed to load cable sections');
      const data = await response.json();
      setSections(data.sections);
    } catch (err) {
      setError('Nie udało się załadować przekrojów');
      console.error(err);
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