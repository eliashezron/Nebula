'use client'
import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full">
      <div className="flex items-center justify-between flex-grow">
        <div className="text-lg md:text-2xl font-bold">NEBULA</div>
        <a href="https://t.me/+GCR4p8G0ylwxZTQ0" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center text-black hover:text-blue-500">
          <span className='py-2 mr-3'>Reach Support via</span>
          <img src='telegram.svg' alt='Telegram icon' className='w-12 h-12'/>
        </a>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-16 left-0 w-full bg-white z-20 p-4`}>
        <a href="https://t.me/+GCR4p8G0ylwxZTQ0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
          <span className='py-2 mr-3'>Reach Support via</span>
          <img src='telegram.svg' alt='Telegram icon' className='w-12 h-12'/>
        </a>
      </div>
    </nav>
  );
}

export default Header;
