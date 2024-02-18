// src/components/StatisticsSection.tsx
'use client'
import { getNumberContractsScanned,getCountOfRiskyTokens, getTotalIssuesFound } from '@/utils/supabaseFunctions';
import { get } from 'http';
import React, {useEffect, useState} from 'react';

const StatisticsSection: React.FC = () => {
    const [contractsScanned, setContractsScanned] = useState<number>(0);
    const [issuesFound, setIssuesFound] = useState<number>(0);
    const [riskTokensDetected, setRiskTokensDetected] = useState<number>(0);

    useEffect(() => {
        getNumberContractsScanned().then((data) => {
            setContractsScanned(data);
        });
        getTotalIssuesFound().then((data) => {
            setIssuesFound(data);
        });
        getCountOfRiskyTokens().then((data) => {
            setRiskTokensDetected(data);
        });
    }, []);
  // Here you would fetch or define the statistics data
  const stats = [
    { label: 'TOTAL CONTRACTS SCANNED', value: contractsScanned ? contractsScanned : '' },
    { label: 'TOTAL ISSUES FOUND', value: issuesFound ? issuesFound : '0' },
    { label: 'RISK TOKENS DETECTED', value: riskTokensDetected ? riskTokensDetected : '0' },
    // { label: 'EXPLOITS IN CRYPTO', value: '$79,390,221,652' },
    // Add more statistics if needed
  ];

  return (
    <div className="flex flex-wrap justify-around items-center bg-white p-4 shadow rounded-lg">
      {stats.map((stat) => (
        <div key={stat.label} className="m-2 text-center">
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm uppercase text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsSection;
