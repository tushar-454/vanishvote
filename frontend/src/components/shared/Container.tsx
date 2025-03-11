import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='mx-auto min-h-screen max-w-screen-lg rounded-md bg-white px-4 dark:bg-neutral-900 dark:text-neutral-100'>
      {children}
    </div>
  );
};

export { Container };
