import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className='mx-auto min-h-screen max-w-screen-lg bg-white px-4'>{children}</div>;
};

export { Container };
