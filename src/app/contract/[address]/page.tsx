'use client'
import React,{useState, useEffect, use} from 'react';
import { useRouter } from 'next/navigation'
import {ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, DocumentDuplicateIcon, ShareIcon, GlobeAltIcon, CodeIcon } from '@heroicons/react/outline'; 
import { Database } from '@/types/supabase';
import { fetchTokenDetails } from '@/utils/supabaseFunctions';
import Scanner from '../../../components/contractScan';
import { shortenAddress } from '@/helpers/methods';
import Modal from '../../../templates/modal';
import CopyToClipboard from '@/templates/copy';

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
      { 
        title: "No previous scams by owner's wallet found",
        details: 'The wallet associated with the contract owner has no history of fraudulent activities or associated scams, indicating a lower risk of malicious intent.' 
      },
      { 
        title: "Smart contract's transfer function secure with unchangeable router",
        details: 'The transfer function within the smart contract is securely implemented with a fixed router, ensuring that the pathway for token transfers cannot be altered or hijacked.' 
      },
      { 
        title: 'No significant liquidity rugpull risk found',
        details: 'Analysis indicates minimal risk of a rugpull event, where liquidity could be suddenly withdrawn by developers or large holders, destabilizing the token’s market.' 
      },
    ],
    'Moderate risk': [
      { 
        title: 'Users can always transfer their tokens',
        details: 'The smart contract permits uninterrupted token transfers, enabling users to send or receive tokens without encountering unexpected restrictions.' 
      },
      { 
        title: 'The contract operates without custom fees',
        details: 'This contract does not impose additional fees on transactions, which can foster a transparent and user-friendly environment for participants.' 
      },
    ],
    'Low risk': [
      { 
        title: 'No locks detected',
        details: 'Our audit did not detect any time-based locks or similar mechanisms that could restrict token movement or smart contract interactions over a set period.' 
      },
      { 
        title: 'Contract cannot be upgraded',
        details: 'The contract is not upgradable, meaning its logic is immutable and cannot be changed post-deployment, which can be both a security feature and a limitation.' 
      },
      { 
        title: 'Contract was not deployed',
        details: 'The contract code exists but has not been deployed to the blockchain, suggesting it is in a development or testing phase with no active economic impact.' 
      },
    ],
  };
  

  const handleRiskSelection = (title: string) => {
    setSelectedRisk(selectedRisk === title ? null : title);
  };

  const shortAddress = shortenAddress(address);
  const shortClassHash = shortenAddress(classHash);

  const [isModalOpen, setModalOpen] = useState(false);
  const dummyContractCode = `
  //THIS IS DUMMY ERC20 CONTRACT CODE
  #[starknet::contract]
mod MyToken {
    use openzeppelin::token::erc20::ERC20Component;
    use starknet::ContractAddress;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20MetadataImpl = ERC20Component::ERC20MetadataImpl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, initial_supply: u256, recipient: ContractAddress) {
        let name = 'Test USDT';
        let symbol = 'TUSDT';

        self.erc20.initializer(name, symbol);
        self.erc20._mint(recipient, initial_supply);
    }
}
}`;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  

  return (
    <div className="container bg-none min-h-screen mx-auto p-3">
      <div className="flex justify-between items-center mb-1">
        <button onClick={goBack} className="text-gray-900 hover:text-blue-900 font-bold text-2xl md:text-xl flex">
          <ChevronLeftIcon className="h-5 w-5 text-4xl mr-2 mt-1" /> <p className='mr-4'>Back</p>
        </button>
        <Scanner/>
      </div>
      <div className="text-center md:flex md:justify-start md:items-center mt-0">
      <h1 className="text-2xl md:text-4xl font-bold my-2 mr-5">{tokenData ? tokenData.name : ''}</h1>
      <div className="flex justify-center items-center gap-2">
        <p className="text-gray-700 text-sm md:text-base">{shortAddress}</p>
        <div className="text-right">
          <CopyToClipboard textToCopy={address} />
        </div>
      </div>
      </div>
      <div className="p-4">
      <div className="flex flex-wrap gap-2 justify-start items-center">
        <div className="flex items-center border border-black">
          <span className="px-3 py-1">Nebula score 75/100</span>
        </div>
        <div className="flex items-center border border-black" onClick={openModal}>
          <span className="px-3 py-1">Contract code</span>
          <CodeIcon className="h-5 w-5 mr-2 cursor-pointer" />
        </div>
        <div className="flex items-center border border-black bg-gray-500">
          <span className="px-3 py-1">Attention Required 3</span>
        </div>
        <div className="flex items-center border border-black">
          <button className="px-3 py-1"><GlobeAltIcon className="h-5 w-5"></GlobeAltIcon></button>
        </div>
        <div className="flex items-center border border-black">
          <button className="px-3 py-1"><ShareIcon className="h-5 w-5" ></ShareIcon></button>
          
        </div>
        <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        tokenName={tokenData?.name || ''}
        contractCode = {dummyContractCode} 
        // Replace with the actual token name
        // Pass the contract code you want to display
        >
        <pre className="overflow-x-auto p-3 bg-gray-100 rounded">{dummyContractCode}</pre>
      </Modal>
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
                        <span>ERC20</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Contract Address</span>
                        <div className="flex items-center">
                            <span>{shortAddress}</span>
                            <div className="text-right">
                              <CopyToClipboard textToCopy={address} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Class Hash</span>
                        <div className="flex items-center">
                            <span>{shortClassHash}</span>
                            <div className="text-right">
                              <CopyToClipboard textToCopy={classHash} />
                            </div>
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



