// pages/index.tsx
import React from 'react';
import Header from '../components/header';
import AuditRisk from '../components/auditRisk';
import Scanner from '../components/contractScan';
import StatisticsSection from '@/components/statistics';
import FilterBar from '@/components/filter';

const Home: React.FC = () => {
  return (
    <div className="bg-none min-h-screen text-black">
      <Header />
      <Scanner />
      <div className="container mx-auto my-8">
        <StatisticsSection/>
        <AuditRisk />
      </div>
    </div>
  );
}

export default Home;
