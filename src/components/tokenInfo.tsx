// pages/tokenInfo/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import TokenInfoComponent from './tokenInfoComponent'; // Assume your detailed component is named TokenInfoComponent

const TokenInfoPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL

  return (
    <div>
      {/* Render the detailed token information based on the id */}
      <TokenInfoComponent tokenId={id} />
    </div>
  );
};

export default TokenInfoPage;
