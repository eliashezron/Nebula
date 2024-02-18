// src/components/FilterBar.tsx
import React from 'react';

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        className="border px-4 py-2 rounded shadow flex"
        onClick={() => onFilterChange('mostScanned')}
      >
        <img src='scan.svg' alt='scan icon' className='w-5 h-5 mr-2'/><span>Tokens: Most Scanned</span>
      </button>
      <button
        className="border px-4 py-2 rounded shadow flex"
        onClick={() => onFilterChange('recentThreats')}
      >
       <img src='recent.svg' alt='recent icon' className='w-5 h-5 mr-2'/><span>Tokens: Recent Threats</span>
      </button>
      <button
        className="border px-4 py-2 rounded shadow flex"
        onClick={() => onFilterChange('marketCap')}
      >
        <img src='marketgraph.svg' alt='market grap icon' className='w-5 h-5 mr-2'/><span>Tokens: marketCap</span>
      </button>
    </div>
  );
};

export default FilterBar;
