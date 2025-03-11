import { Container } from '@/src/components/shared/Container';

function Loading() {
  return (
    <div className='bg-white py-10 dark:bg-neutral-950'>
      <Container>
        <div className='flex items-center justify-between gap-4 border-b border-gray-300 py-3 dark:border-gray-500'>
          <div className='h-10 w-36 animate-pulse bg-gray-100 dark:bg-neutral-800'></div>
          <div className='h-10 w-24 animate-pulse bg-gray-100 dark:bg-neutral-800'></div>
        </div>
        <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='h-[170px] w-full animate-pulse rounded-md bg-gray-100 dark:bg-neutral-800'></div>
          <div className='h-[170px] w-full animate-pulse rounded-md bg-gray-100 dark:bg-neutral-800'></div>
          <div className='h-[170px] w-full animate-pulse rounded-md bg-gray-100 dark:bg-neutral-800'></div>
          <div className='h-[170px] w-full animate-pulse rounded-md bg-gray-100 dark:bg-neutral-800'></div>
          <div className='h-[170px] w-full animate-pulse rounded-md bg-gray-100 dark:bg-neutral-800'></div>
          <div className='h-[170px] w-full animate-pulse rounded-md bg-gray-100 dark:bg-neutral-800'></div>
          <div className='h-[170px] w-full animate-pulse rounded-md bg-gray-100 dark:bg-neutral-800'></div>
          <div className='h-[170px] w-full animate-pulse rounded-md bg-gray-100 dark:bg-neutral-800'></div>
        </div>
      </Container>
    </div>
  );
}

export default Loading;
