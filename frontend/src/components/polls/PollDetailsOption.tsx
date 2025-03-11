'use client';

import { Option, pollVote, revalidatePoll, revalidatePolls } from '@/src/api/poll';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TypographyP, TypographySmall } from '../ui/typography';

type PollDetailsOptionProps = {
  pollId: string;
  option: Option;
  isResultHide: boolean;
  percentage: string;
  idx: number;
};
const PollDetailsOption = ({
  pollId,
  option,
  isResultHide,
  percentage,
  idx,
}: PollDetailsOptionProps) => {
  const router = useRouter();
  const [vote, setVote] = useState('');

  // handle poll vote
  const handlePollVote = async (optionText: string) => {
    if (!isResultHide || vote) return;
    try {
      setVote(optionText);
      const res = await pollVote(pollId, optionText);
      if (!res.success) router.push('/');
      await revalidatePolls();
      await revalidatePoll();
    } catch (error) {
      console.error('Failed to submit vote', error);
      setVote('');
    }
  };

  return (
    <div>
      <TypographyP
        onClick={() => handlePollVote(option.text)}
        className={`relative mt-3 w-full rounded-md border border-gray-200 p-2 transition ${vote !== option.text ? 'hover:bg-gray-200' : 'hover:bg-green-100'} ${isResultHide && 'cursor-pointer'} ${vote === option.text && 'bg-green-100'}`}
      >
        {!isResultHide && (
          <span
            className={`absolute top-0 left-0 h-full rounded-md bg-black opacity-20`}
            style={{ width: `${percentage}%` }}
          ></span>
        )}
        <span className='flex items-center justify-between gap-5'>
          <span>
            {++idx}) {option.text}
          </span>
          {!isResultHide && <span>{percentage}%</span>}
        </span>
      </TypographyP>
      {!isResultHide && (
        <TypographySmall>
          {option.votes} vote{option.votes > 1 ? 's' : ''}
        </TypographySmall>
      )}
    </div>
  );
};

export { PollDetailsOption };
