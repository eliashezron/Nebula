// src/pages/tokenInfo/[symbol].tsx
'use client'
import React,{useState} from 'react';
// import { useRouter } from 'next/router';
import { ClipboardCopyIcon } from '@heroicons/react/outline'; // ensure you have @heroicons/react installed

const TokenInfo:React.FC<{ tokenId: string | string[] | undefined }> = ({ tokenId }) => {
//   const router = useRouter();
//   const { symbol } = router.query;
const [selectedRisk, setSelectedRisk] = useState<string | null>(null);


  const goBack = () => {
    // router.back();
  };

  // Dummy risk data
  const riskCategories = {
    'High risk': [
      { title: "No previous scams by owner's wallet found", details: 'Lorem ipsum dolor sit amet...' },
      { title: "Smart contract's transfer function secure with unchangeable router", details: 'Consectetur adipiscing elit...' },
      { title: 'No significant liquidity rugpull risk found', details: 'Sed do eiusmod tempor incididunt...' },
    ],
    'Moderate risk': [
      { title: 'Users can always transfer their tokens', details: 'Ut labore et dolore magna aliqua...' },
      { title: 'The contract operates without custom fees', details: 'Ut enim ad minim veniam...' },
    ],
    'Low risk': [
      { title: 'No locks detected', details: 'Quis nostrud exercitation ullamco laboris...' },
      { title: 'Contract cannot be upgraded', details: 'Nisi ut aliquip ex ea commodo consequat...' },
      { title: 'Contract was not deployed', details: 'Duis aute irure dolor in reprehenderit...' },
    ],
  };

  const handleRiskSelection = (title: string) => {
    setSelectedRisk(selectedRisk === title ? null : title);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goBack} className="text-blue-600 hover:text-blue-800">
          <span>Go Back</span>
        </button>
        {/* Search input could go here */}
      </div>

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">GROK</h1>
        <div className="flex justify-center items-center gap-2 mt-2">
          <p className="text-gray-700">Token Address</p>
          <ClipboardCopyIcon className="h-5 w-5 cursor-pointer" onClick={() => navigator.clipboard.writeText('token-address')} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {Object.entries(riskCategories).map(([riskLevel, risks]) => (
              <div key={riskLevel}>
                <h3 className="font-bold text-lg">{riskLevel}</h3>
                {risks.map((risk) => (
                  <div key={risk.title} className="p-2 my-2 bg-gray-100 rounded-md">
                    <button onClick={() => handleRiskSelection(risk.title)}>
                      <div className="flex justify-between items-center">
                        <span>{risk.title}</span>
                        <span>{selectedRisk === risk.title ? '-' : '+'}</span>
                      </div>
                    </button>
                    {selectedRisk === risk.title && (
                      <p className="text-gray-700">{risk.details}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="md:col-span-1 bg-gray-200 p-4 rounded-lg">
            <h3 className="font-bold text-lg">SCORE BREAKDOWN</h3>
            {/* Render your score breakdown here */}
          </div>
        </div>
      </div>
      
   
  );
};

export default TokenInfo;


