import React, { useState, useEffect } from 'react';
import { Cable } from 'lucide-react';

interface CableSelectorProps {
  cableTypes: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  sections: any[];
  selectedSection: any | null;
  onSectionChange: (section: any) => void;
  loading?: boolean;
}

export const CableSelector: React.FC<CableSelectorProps> = ({
  cableTypes,
  selectedType,
  onTypeChange,
  sections,
  selectedSection,
  onSectionChange,
  loading = false,
}) => {
  const [typeSearch, setTypeSearch] = useState('');
  const [sectionSearch, setSectionSearch] = useState('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);

  // Filtruj typy kabli
  const filteredTypes = cableTypes.filter(type =>
    type.toLowerCase().includes(typeSearch.toLowerCase())
  );

  // Filtruj przekroje
  const filteredSections = sections.filter(section =>
    section.przekroj.toLowerCase().includes(sectionSearch.toLowerCase())
  );

  // Ustaw wartość search gdy wybrano
  useEffect(() => {
    if (selectedType) {
      setTypeSearch(selectedType);
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedSection) {
      setSectionSearch(selectedSection.przekroj);
    }
  }, [selectedSection]);

  const handleTypeSelect = (type: string) => {
    setTypeSearch(type);
    onTypeChange(type);
    setShowTypeDropdown(false);
    // Reset przekroju gdy zmienia się typ
    setSectionSearch('');
    onSectionChange(null);
  };

  const handleSectionSelect = (section: any) => {
    setSectionSearch(section.przekroj);
    onSectionChange(section);
    setShowSectionDropdown(false);
  };

  return (
    <div className="space-y-5">
      {/* Typ kabla */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
            <Cable className="w-4 h-4 text-white" />
          </div>
          <h4 className="font-semibold text-gray-800">Wybór kabla</h4>
        </div>

        {/* Typ kabla - Searchable */}
        <div className="mb-4 relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Typ kabla *
          </label>
          <input
            type="text"
            value={typeSearch}
            onChange={(e) => {
              setTypeSearch(e.target.value);
              setShowTypeDropdown(true);
            }}
            onFocus={() => setShowTypeDropdown(true)}
            placeholder="Wpisz lub wybierz typ kabla..."
            className="w-full px-4 py-3.5 bg-white/90 border-2 border-gray-200 rounded-xl 
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
                     focus:outline-none transition-all duration-300 placeholder:text-gray-400"
            disabled={loading}
          />
          
          {/* Dropdown typów */}
          {showTypeDropdown && filteredTypes.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-indigo-500 
                          rounded-xl max-h-60 overflow-y-auto z-50 shadow-2xl">
              {filteredTypes.slice(0, 10).map((type) => (
                <div
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                  className="px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 
                           last:border-b-0 transition-colors"
                >
                  {type}
                </div>
              ))}
              {filteredTypes.length > 10 && (
                <div className="px-4 py-3 text-sm text-gray-500 italic bg-gray-50">
                  ... i {filteredTypes.length - 10} więcej. Kontynuuj pisanie.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Przekrój - Searchable */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Liczba i przekrój żył *
          </label>
          <input
            type="text"
            value={sectionSearch}
            onChange={(e) => {
              setSectionSearch(e.target.value);
              setShowSectionDropdown(true);
            }}
            onFocus={() => setShowSectionDropdown(true)}
            placeholder={selectedType ? "Wpisz lub wybierz przekrój..." : "Najpierw wybierz typ kabla"}
            disabled={!selectedType || loading}
            className="w-full px-4 py-3.5 bg-white/90 border-2 border-gray-200 rounded-xl 
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
                     focus:outline-none transition-all duration-300 placeholder:text-gray-400
                     disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          {/* Dropdown przekrojów */}
          {showSectionDropdown && filteredSections.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-indigo-500 
                          rounded-xl max-h-60 overflow-y-auto z-50 shadow-2xl">
              {filteredSections.slice(0, 10).map((section) => (
                <div
                  key={section.id}
                  onClick={() => handleSectionSelect(section)}
                  className="px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 
                           last:border-b-0 transition-colors"
                >
                  <div className="font-medium">{section.przekroj}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Masa: {section.masa_kg_km} kg/km • Ø {section.srednica_zewnetrzna} cm
                  </div>
                </div>
              ))}
              {filteredSections.length > 10 && (
                <div className="px-4 py-3 text-sm text-gray-500 italic bg-gray-50">
                  ... i {filteredSections.length - 10} więcej. Kontynuuj pisanie.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Informacje o wybranym kablu */}
        {selectedSection && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-indigo-200">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Średnica zewnętrzna:</span>
                <span>{selectedSection.srednica_zewnetrzna} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Promień gięcia:</span>
                <span>{selectedSection.promien_giecia} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Masa:</span>
                <span className="text-indigo-600 font-bold">{selectedSection.masa_kg_km} kg/km</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center text-gray-500">
          <div className="inline-block w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2">Ładowanie...</p>
        </div>
      )}
    </div>
  );
};

// Zamknij dropdown przy kliknięciu poza nim
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
      // Zamknij wszystkie dropdowny
    }
  });
}