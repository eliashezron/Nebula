// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="text-xl font-bold">nebula</div>
      <div className="hidden md:flex space-x-4">
        <a href="#" className="text-gray-300 hover:text-white">Home</a>
        <a href="#" className="text-gray-300 hover:text-white">Sniffer</a>
        <a href="#" className="text-gray-300 hover:text-white">Whitepaper</a>
      </div>
      {/* Add mobile menu logic */}
    </nav>
  );
}

export default Header;
