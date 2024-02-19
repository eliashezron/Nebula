import React, { useState } from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/outline';

interface CopyToClipboardProps {
  textToCopy: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Hide the message after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
      setIsCopied(false);
    }
  };

  return (
    <div className="relative">
      <DocumentDuplicateIcon className="h-6 w-6 cursor-pointer" onClick={handleCopy} />
      {isCopied && (
        <div className="absolute-bottom-4 left-0 bg-gray-100 text-black text-xs px-2 py-1 rounded">
          Copied
        </div>
      )}
    </div>
  );
};

export default CopyToClipboard;
