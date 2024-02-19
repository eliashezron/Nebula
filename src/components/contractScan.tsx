'use client'
import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation'

const Scanner: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async() => { 
    router.push(`/contract/${searchTerm}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col justify-center items-start my-3 w-full">
      <div className="flex w-full md:w-2/3 lg:w-1/2 xl:w-2/3 border-2 border-gray-300 rounded-lg overflow-hidden">
        <input
          className="pl-4 pr-3 pt-4 pb-4 py-2 flex-grow"
          type="text"
          placeholder="Enter the address to scan"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="flex items-center justify-center px-8 bg-gray-200"
          onClick={handleSearch}
        >
          <SearchIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default Scanner;
