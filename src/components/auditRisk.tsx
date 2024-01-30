// src/components/AuditRiskTable.tsx

import React from 'react';
import Link from 'next/link';

interface TokenData {
  id: number;
  name: string;
  symbol: string;
  chain: string;
  safetyScore: string;
  price: string;
  liquidity: string;
  holders: string;
  topHoldersPercentage: string;
  tvl: string;
  highRisks: string;
lowRisks: string;
  risks: boolean[];
  governance: string;
}

const dummyData: TokenData[] = [
  // Your dummy data goes here
  {
    id: 4,
    name: 'Grok',
    symbol: 'GROK',
    chain: 'ETH',
    safetyScore: '0/100',
    price: '~$ 0.0041',
    liquidity: '$ 870K',
    holders: '12K',
    topHoldersPercentage: '41%',
    tvl: '3',
    highRisks: '1',
    lowRisks: '2',
    risks: [true, true, false, true],
    governance: 'Renounced',
  },
  {
    id: 1,
    name: 'Treat',
    symbol: 'GROK',
    chain: 'ETH',
    safetyScore: '0/100',
    price: '~$ 0.0041',
    liquidity: '$ 870K',
    holders: '12K',
    topHoldersPercentage: '41%',
    tvl: '3',
    highRisks: '2',
    lowRisks: '1',
    risks: [true, true, false, true],
    governance: 'Renounced',
  },
  // ... more dummy data
];

const AuditRiskTable: React.FC = () => {
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
          {dummyData.map((token, index) => (
            <tr key={index}>
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

