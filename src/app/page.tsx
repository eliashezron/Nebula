// pages/index.tsx
import React from 'react';
import Header from '../components/header';
import TokenInfo from '../components/tokenInfoComponent';
import AuditRisk from '../components/auditRisk';
import Footer from '../components/footer';
import Scanner from '../components/contractScan';

const Home: React.FC = () => {
  return (
    <div className="bg-none min-h-screen text-black">
      <Header />
      <Scanner />
      <div className="container mx-auto my-8">
        <AuditRisk />
      {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Home;
