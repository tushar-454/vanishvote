import { PollType } from '@/src/api/poll';
import Link from 'next/link';
import { Button } from '../ui/button';
import { TypographyH4, TypographyP } from '../ui/typography';
import { PollExpireTime } from './PollExpireTime';

type PollCardProps = {
  poll: Partial<PollType>;
};

const PollCard = ({ poll }: PollCardProps) => {
  return (
    <div className='flex flex-col gap-5 rounded-md border border-gray-100 p-4 shadow-md'>
      <div>
        <TypographyH4>{poll.question}</TypographyH4>
        {poll.expiresAt ? <PollExpireTime expiresAt={poll.expiresAt} /> : 'N/A'}
        <TypographyP>
          Reactions: 🔥 {poll.reactions?.trending || 0}, 👍 {poll.reactions?.like || 0}
        </TypographyP>
      </div>

      <Link href={`/polls/${poll._id}`}>
        <Button className='bg-green-600 text-sm text-white'>Vote Now</Button>
      </Link>
    </div>
  );
};

export { PollCard };
