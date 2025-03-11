'use client';
import { pollReaction, Reactions, revalidatePoll } from '@/src/api/poll';
import { useState } from 'react';
import { Button } from '../ui/button';

type PollDetailsReactionsProps = {
  pollId: string;
  reactions: Reactions;
};

const PollDetailsReactions = ({ pollId, reactions }: PollDetailsReactionsProps) => {
  const [like, setLike] = useState(reactions.like || 0);
  const [trending, setTrending] = useState(reactions.trending || 0);

  // handle like and trending reactions
  const handleReaction = async (reaction: 'like' | 'trending') => {
    if (reaction === 'like') setLike((prev) => prev + 1);
    if (reaction === 'trending') setTrending((prev) => prev + 1);
    try {
      await pollReaction(pollId, reaction);
      await revalidatePoll();
    } catch (error) {
      console.error('Failed to submit reaction', error);
      if (reaction === 'like') setLike((prev) => prev - 1);
      if (reaction === 'trending') setTrending((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className='mt-5 flex gap-2'>
        <Button
          onClick={() => handleReaction('like')}
          className='min-w-20 border border-gray-200 transition hover:bg-gray-50'
        >
          👍 {like}
        </Button>
        <Button
          onClick={() => handleReaction('trending')}
          className='min-w-20 border border-gray-200 transition hover:bg-gray-50'
        >
          🔥 {trending}
        </Button>
      </div>
    </div>
  );
};

export { PollDetailsReactions };
