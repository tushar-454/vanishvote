import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className='mx-auto max-w-screen-lg px-4 lg:px-0'>{children}</div>;
};

export { Container };
