import { cn } from '@/src/lib/utils';
import React from 'react';

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
};

const Button = ({
  className,
  type = 'button',
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'cursor-pointer rounded px-3 py-2 text-center disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      disabled={disabled}
    >
      <span className='flex items-center justify-center gap-2'>
        {children}{' '}
        {loading && (
          <span className='animate-spin'>
            <svg
              className='size-5 animate-spin text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          </span>
        )}
      </span>
    </button>
  );
};

export { Button };
