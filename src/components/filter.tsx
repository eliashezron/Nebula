// src/components/FilterBar.tsx
import React from 'react';

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        className="border px-4 py-2 rounded shadow"
        onClick={() => onFilterChange('mostScanned')}
      >
        Tokens: Most Scanned
      </button>
      <button
        className="border px-4 py-2 rounded shadow"
        onClick={() => onFilterChange('recentThreats')}
      >
        Tokens: Recent Threats
      </button>
      <button
        className="border px-4 py-2 rounded shadow"
        onClick={() => onFilterChange('marketCap')}
      >
        Tokens: by Market Cap
      </button>
    </div>
  );
};

export default FilterBar;
