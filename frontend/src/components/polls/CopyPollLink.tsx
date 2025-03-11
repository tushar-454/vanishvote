'use client';

import { useState } from 'react';

const CopyPollLink = () => {
  const [isCopied, setIsCopied] = useState(false);

  // handle copy poll link
  const handleCopyPollLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <span onClick={() => handleCopyPollLink()} className='relative cursor-pointer'>
      <span
        className={`absolute top-0 -left-14 rounded-sm bg-black p-1 text-sm text-white transition ${isCopied ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        Copied
      </span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='lucide lucide-clipboard-plus'
      >
        <rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
        <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
        <path d='M9 14h6' />
        <path d='M12 17v-6' />
      </svg>
    </span>
  );
};

export { CopyPollLink };
