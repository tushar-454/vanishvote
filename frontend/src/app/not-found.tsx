import Link from 'next/link';
import { Button } from '../components/ui/button';
import { TypographyH2, TypographyP } from '../components/ui/typography';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-neutral-900'>
      <TypographyH2 className='mb-4 text-red-600'>404 - Page Not Found</TypographyH2>
      <TypographyP className='mb-6 text-gray-700 dark:text-gray-300'>
        The page you are looking for does not exist.
      </TypographyP>
      <Button className='bg-red-500 text-white dark:bg-red-700'>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
}
