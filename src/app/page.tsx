// pages/index.tsx
import React from 'react';
import Header from '../components/header';
import AuditRisk from '../components/auditRisk';
import Scanner from '../components/contractScan';
import StatisticsSection from '@/components/statistics';
import ScannerHeading from '@/components/scannerHeading';

const Home: React.FC = () => {
  return (
    <div className="bg-none min-h-screen text-black container mx-auto">
      <Header />
      <ScannerHeading/>
      <Scanner />
      <div className="container mx-auto my-8">
        <StatisticsSection/>
        <AuditRisk />
      </div>
    </div>
  );
}

export default Home;
