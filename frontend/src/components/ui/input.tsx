import { cn } from '@/src/lib/utils';
import React from 'react';

type InputProps = {
  label?: string;
  id: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
};

const Input = ({ label, id, type = 'text', required, className, ...props }: InputProps) => {
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='mb-1 block font-semibold text-gray-700 dark:text-gray-300'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <input
        {...props}
        id={id}
        name={id}
        type={type}
        className={cn(
          'w-full rounded border border-gray-200 p-2 outline-none focus:border-gray-300 dark:border-gray-400 dark:focus:border-gray-500',
          className,
        )}
        required={required}
      />
    </div>
  );
};

export { Input };
