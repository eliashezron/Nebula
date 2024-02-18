// src/components/FilterBar.tsx
"use client"
import React, { useEffect, useState } from 'react';
import supabase from '@/config/supabaseClient';
import { Database } from '@/types/supabase';

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC = () => {
    type TokenInfoRow = Database['public']['Tables']['tokenInfo']['Row'];
    const [tokenData, setTokenData] = useState<TokenInfoRow[]>([]);
    // ... other states and variables
  
    // Add a state for the active filter
    const [activeFilter, setActiveFilter] = useState('');
  
    useEffect(() => {
      // Fetch tokens with active filter applied
      const fetchTokens = async () => {
        let query = supabase.from('tokenInfo').select('*');
  
        if (activeFilter === 'byMarketCap') {
          query = query.order('marketCap', { ascending: false });
        }
        // Add more conditions for other filters
  
        const { data, error } = await query;
        if (error) {
          // handle error
        } else {
          setTokenData(data);
        }
      };
  
      fetchTokens();
    }, [activeFilter]); // Refetch when activeFilter changes
  
    // Define the handler function for filter changes
    const onFilterChange = (filter: string) => {
      setActiveFilter(filter);
    };
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
        onClick={() => onFilterChange('byMarketCap')}
      >
        Tokens: by Market Cap
      </button>
    </div>
  );
};

export default FilterBar;
