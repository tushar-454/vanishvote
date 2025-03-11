import { CreatePoll } from '../polls/CreatePoll';
import { TypographyH2 } from '../ui/typography';

const Header = () => {
  return (
    <header className='flex items-center justify-between border-b border-gray-300 py-3 dark:border-gray-500'>
      {/* brand logo or name  */}
      <TypographyH2>Vanish Vote</TypographyH2>
      <CreatePoll />
    </header>
  );
};

export { Header };
