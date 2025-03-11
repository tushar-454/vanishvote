'use client';

import { Option, pollVote, revalidatePoll, revalidatePolls } from '@/src/api/poll';
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
  const [vote, setVote] = useState('');

  // handle poll vote
  const handlePollVote = async (optionText: string) => {
    if (!isResultHide || vote) return;
    try {
      setVote(optionText);
      await pollVote(pollId, optionText);
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
        className={`relative mt-3 w-full rounded-md border border-gray-200 p-2 transition hover:bg-gray-200 ${isResultHide && 'cursor-pointer'} ${vote === option.text && 'bg-gray-200'}`}
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
