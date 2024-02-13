// pages/index.tsx
import React from 'react';
import Header from '../components/header';
import AuditRisk from '../components/auditRisk';
import Scanner from '../components/contractScan';

const Home: React.FC = () => {
  return (
    <div className="bg-none min-h-screen text-black">
      <Header />
      <Scanner />
      <div className="container mx-auto my-8">
        <AuditRisk />
      </div>
    </div>
  );
}

export default Home;
