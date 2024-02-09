// src/components/AuditRiskTable.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import supabase from '@/config/supabaseClient';
import { Database } from '@/assets/supabase';

const AuditRiskTable: React.FC = () => {
  // Define the type for a single token info row
  type TokenInfoRow = Database['public']['Tables']['tokenInfo']['Row'];
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<TokenInfoRow[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const { data, error } = await supabase
      .from('tokenInfo') // Specify the type when calling 'from'
      .select('*');

      if (error) {
        setFetchError(error.message);
      } else if (data) {
        setTokenData(data);
      }
    };
    fetchTokens();
  }, []);

 

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white divide-y divide-gray-200 border border-black">
        <thead className="bg-gray-50 border border-black" >
          <tr className='border border-black'>
            {/* Main headers */}
            <th colSpan={4} className="border border-black px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Token Info
            </th>
            <th colSpan={1} className="border border-black px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Liquidity
            </th>
            <th colSpan={2} className="border border-black px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Circulation
            </th>
            <th colSpan={2} className="border border-black px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Possible Risks
            </th>
            <th colSpan={1} className="border border-black px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
          <tr className='border border-black'>
            {/* Subheaders */}
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token Info</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Safety Score</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liquidity</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Circulation</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TVL</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">High Risks</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">low Risks</th>
            <th className="border border-black px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View on Explorer</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tokenData.map((token, index) => (
            <tr key={token.id}>
              {/* ... Table data cells ... */}
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{token.id}</td>
              {/* Assume you have a component to render token information */}
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <Link href={`/tokenInfo/${token.id}`} passHref>
                  <span>{token.name} ({token.symbol})</span>
            </Link>
            </td>
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">{token.safetyScore}</td>
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">{token.price}</td>
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">{token.liquidity}</td>
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">{token.holders}</td>
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">{token.tvl}</td>
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">{token.highRisks}</td>
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">{token.lowRisks}</td>
                            {/* Action cell */}
                <td className=" border border-black px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  View on Explorer
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditRiskTable;

