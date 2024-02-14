// src/components/AuditRiskTable.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import supabase from '@/config/supabaseClient';
import { Database } from '@/types/supabase';

const AuditRiskTable: React.FC = () => {
  // Define the type for a single token info row
  type TokenInfoRow = Database['public']['Tables']['tokenInfo']['Row'];
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<TokenInfoRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 10;
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = tokenData.slice(indexOfFirstToken, indexOfLastToken);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage((prev) => (prev < Math.ceil(tokenData.length / tokensPerPage) ? prev + 1 : prev));
  const goToPreviousPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));


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
          {currentTokens.map((token, index) => (
            <tr key={index}>
              {/* ... Table data cells ... */}
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
              {/* Assume you have a component to render token information */}
              <td className="border border-black px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <Link href={`/contract/${token.address}`} passHref>
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
                <a href={`https://voyager.online/contract/${token.address}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                  View on Explorer
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-4 py-2 mx-1 rounded-md bg-gray-500 text-white disabled:bg-gray-200">
          Previous
        </button>

        {Array.from({ length: Math.ceil(tokenData.length / tokensPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={goToNextPage} disabled={currentPage === Math.ceil(tokenData.length / tokensPerPage)} className="px-4 py-2 mx-1 rounded-md bg-gray-500 text-white disabled:bg-gray-200">
          Next
        </button>
      </div>
    </div>
  );
};

export default AuditRiskTable;

