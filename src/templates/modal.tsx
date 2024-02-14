import React, { ReactNode, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  if (!isOpen) return null;

  // Close modal when clicking outside of it
  const handleOutsideClick = (e: MouseEvent) => {
    if ((e.target as Element).classList.contains('modal-backdrop')) {
      closeModal();
    }
  };

  useEffect(() => {
    // Attach the listener when the component mounts
    window.addEventListener('click', handleOutsideClick);
    // Cleanup the listener when the component unmounts
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto h-full w-full" >
      <div className=" modal-content relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <div className="absolute top-0 left-0 p-4">
          <button onClick={closeModal}>
            <XIcon className="h-6 w-6 text-black" />
          </button>
        </div>
        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
