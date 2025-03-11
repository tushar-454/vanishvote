import { Container } from '@/src/components/shared/Container';

function Loading() {
  return (
    <div className='bg-white py-10'>
      <Container>
        <div className='h-10 w-96 animate-pulse bg-gray-100'></div>
        <div className='mt-3 h-5 w-40 animate-pulse bg-gray-100'></div>
        <div className='mt-5 h-10 w-full animate-pulse bg-gray-100'></div>
        <div className='mt-3 h-10 w-full animate-pulse bg-gray-100'></div>
        <div className='mt-5 flex items-center gap-3'>
          <div className='h-10 w-20 animate-pulse bg-gray-100'></div>
          <div className='h-10 w-20 animate-pulse bg-gray-100'></div>
        </div>
        <div className='mt-5 h-10 w-full animate-pulse bg-gray-100'></div>
        <div className='mt-3 h-10 w-full animate-pulse bg-gray-100'></div>
        <div className='mt-3 h-10 w-full animate-pulse bg-gray-100'></div>
        <div className='mt-3 h-10 w-full animate-pulse bg-gray-100'></div>
        <div className='mt-3 h-10 w-full animate-pulse bg-gray-100'></div>
        <div className='mt-3 h-10 w-full animate-pulse bg-gray-100'></div>
        <div className='mt-3 h-10 w-full animate-pulse bg-gray-100'></div>
      </Container>
    </div>
  );
}

export default Loading;
