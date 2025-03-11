import { getPolls } from '@/src/api/poll';
import { PollCard } from './PollCard';

const Polls = async () => {
  const polls = await getPolls();
  if (!polls.success) {
    return <div className='mt-10 text-center text-red-500'>Failed to fetch polls</div>;
  }

  if (polls.success && polls.data.length === 0) {
    return <div className='mt-10 text-center text-gray-500'>No polls available</div>;
  }

  return (
    <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
      {polls.success && polls.data.map((poll) => <PollCard key={poll._id} poll={poll} />)}
    </div>
  );
};

export { Polls };
