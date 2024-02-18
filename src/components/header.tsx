// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="flex justify-between items-center my-4">
      <div className="text-2xl font-bold">NEBULA</div>
      <div className="hidden md:flex space-x-4">
        <a href="https://t.me/+GCR4p8G0ylwxZTQ0" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white flex">
          <span className='py-2 mr-3'>Reach Support via</span>
        <img src='telegram.svg' alt='scan icon' className='w-12 h-12'/>
        </a>
      </div>
      {/* Add mobile menu logic */}
    </nav>
  );
}

export default Header;
