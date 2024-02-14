'use client'
import React, { ReactNode,useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import CopyToClipboard from './copy'; 

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  tokenName: string;
  children: ReactNode;
  contractCode: string;
}

const Modal = ({ isOpen, closeModal, tokenName, contractCode }: ModalProps) => {
  if (!isOpen) return null;
  const handleOutsideClick = (e: MouseEvent) => {
    if ((e.target as Element).classList.contains('modal-backdrop')) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractCode);
      // Display a toast or alert to the user that the code was copied
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto h-full w-full" >
      <div className="modal-content relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold py-2 mx-3">{tokenName}</h4>
          <button onClick={closeModal} className="p-1">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="h-96 overflow-auto mb-4 bg-gray-100">
          <pre>{contractCode}</pre>
        </div>
        <div className="text-right">
          <button onClick={copyCodeToClipboard} className="p-1">
          <div className="text-right">
            <CopyToClipboard textToCopy={contractCode} />
          </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
