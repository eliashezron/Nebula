'use client'
import React, {useState} from 'react'

import { SearchIcon } from '@heroicons/react/solid';
const Scanner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement your search logic here
    console.log(`Search for: ${searchTerm}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center items-center my-12">
      <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden">
        <input
          className="px-4 py-2 w-full"
          type="text"
          placeholder="Enter the address to scan"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="flex items-center justify-center px-4 border-l"
          onClick={handleSearch}
        >
          <SearchIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default Scanner;
