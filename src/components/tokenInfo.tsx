// src/components/TokenInfo.tsx

import React from 'react';

const TokenInfo: React.FC = () => {
  // Dummy data for the cards
  const data = [
    { title: 'Total contracts scanned', value: 12 },
    { title: 'Total issues found', value: 19 },
    { title: 'Risk tokens detected', value: 0 },
  ];

  return (
    <div className="flex justify-around items-center my-8">
      {data.map((card, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md w-1/4">
          <h3 className="text-gray-300 text-sm font-medium">{card.title}</h3>
          <p className="text-white text-3xl font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default TokenInfo;

