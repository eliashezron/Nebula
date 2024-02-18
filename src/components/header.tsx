'use client'
import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center">
      <div className="text-lg md:text-2xl font-bold">NEBULA</div>
      <div className="flex items-center md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 absolute md:relative top-16 left-0 w-full md:w-auto bg-white md:bg-transparent z-20 p-4 md:p-0`}>
        <a href="https://t.me/+GCR4p8G0ylwxZTQ0" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white flex items-center justify-center">
          <span className='py-2 mr-3'>Reach Support via</span>
          <img src='telegram.svg' alt='scan icon' className='w-12 h-12'/>
        </a>
      </div>
    </nav>
  );
}

export default Header;
