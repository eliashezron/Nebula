// src/pages/tokenInfo/[symbol].tsx
'use client'
import React,{useState, useEffect, use} from 'react';
import { useRouter } from 'next/navigation'
import {ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, DocumentDuplicateIcon } from '@heroicons/react/outline'; 
import { Database } from '@/types/supabase';
import { fetchTokenDetails } from '@/utils/supabaseFunctions';
import Scanner from '../../../components/contractScan';
import { shortenAddress } from '@/helpers/methods';


export default function Page({ params }: { params: { address: string } }) {
    const router = useRouter();
    type TokenInfoRow = Database['public']['Tables']['tokenInfo']['Row'];
    const [tokenData, setTokenData] = useState<TokenInfoRow | null>(null);
    const [classHash, setClassHash] = useState<string>('');
    const address = params.address;
    useEffect(() => {
      if (!address) return;
      fetchTokenDetails(address).then((data) => {
        setTokenData(data);
        console.log('logging the data', data);
        if (data && data.classHash) {
          setClassHash(data.classHash);
        }

      });
    }, [address]);
    console.log('logging the token data here', tokenData?.isAccount);
    
const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const goBack = () => {
    router.push('/');
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

  const shortAddress = shortenAddress(address);
  const shortClassHash = shortenAddress(classHash);
  

  return (
    <div className="container bg-none min-h-screen mx-auto p-3">
      <div className="flex justify-between items-center mb-1">
        <button onClick={goBack} className="text-gray-900 hover:text-blue-900 font-bold text-2xl flex">
          <ChevronLeftIcon className="h-5 w-5 text-4xl mr-2 mt-1" /> <p>Back</p>
        </button>
        <Scanner/>
      </div>

      <div className="flex justify-items-start text-center">
        <h1 className="text-4xl font-bold">{tokenData ? tokenData.name : ''}</h1>
        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-700">{shortAddress}</p>
          <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" onClick={() => navigator.clipboard.writeText(address)} />
        </div>
      </div> 
      <div className="flex justify-items-start items-center text-gray p-4">
        <div className="flex items-center border border-black mr-2">
          <span className="mx-2 py-1 px-3">Nebula score 75/100</span>
          </div>
        <div className="flex items-center border border-black mr-2">
          <span className="mx-2 py-1 px-3">Contract code</span>
        </div>
        <div className="flex items-center border border-black mr-2">
          <span className="mx-2 bg-gray-500 py-1 px-3">Attention Required 3</span>
        </div>
        <div className="flex items-center border border-black mr-2">
          <button className="mx-2 py-1 px-3 ">Explorer</button>
        </div>
        <div className="flex items-center border border-black">
          <button className="mx-2 py-1 px-3 ">Share</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div className="md:col-span-2 ">
          {Object.entries(riskCategories).map(([riskLevel, risks]) => (
          <div key={riskLevel}>
            <h3 className="font-bold text-lg">{riskLevel}</h3>
            {risks.map((risk) => (
              <div key={risk.title} className="p-2 my-2 bg-gray-100 rounded-md">
                <button onClick={() => handleRiskSelection(risk.title)} className="w-full text-left">
                  <div className="flex justify-between items-center">
                    <span className="flex-grow truncate">{risk.title}</span> {/* truncate if needed */}
                    {selectedRisk === risk.title ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
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

          <div className="md:col-span-1 p-4 rounded-lg">
          <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Basic Token Info</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span>Token Type</span>
                        <span>ERC20</span> {/* Replace with actual data */}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Contract Address</span>
                        <div className="flex items-center">
                            <span>{shortAddress}</span>
                            <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer ml-2" onClick={() => navigator.clipboard.writeText(address)} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Class Hash</span>
                        <div className="flex items-center">
                            <span>{shortClassHash}</span>
                            <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer ml-2" onClick={() => navigator.clipboard.writeText(classHash)} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>IsAccount</span>
                        <div className="flex items-center">
                            <span>{tokenData ? String(tokenData?.isAccount) : ''}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>IsERC20</span>
                        <div className="flex items-center">
                            <span>{tokenData ? String(tokenData?.isERC20) : ''}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>isProxy</span>
                        <div className="flex items-center">
                            <span>{tokenData ? String(tokenData?.isProxy) : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>  
  );
};



