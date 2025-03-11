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
      <label htmlFor={id} className='mb-1 block font-semibold text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        {...props}
        id={id}
        name={id}
        type={type}
        className={cn(
          'w-full rounded border border-gray-200 p-2 outline-none focus:border-gray-300',
          className,
        )}
        required={required}
      />
    </div>
  );
};

export { Input };
