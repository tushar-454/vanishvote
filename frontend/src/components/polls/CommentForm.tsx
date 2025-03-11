'use client';

import { pollComment, revalidatePoll, revalidatePolls } from '@/src/api/poll';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type CommentFormProps = {
  pollId: string;
};

const CommentForm = ({ pollId }: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  // handle comment form submission
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await pollComment(pollId, comment);
      await revalidatePoll();
      await revalidatePolls();
    } catch (error) {
      console.error('Failed to submit comment', error);
    } finally {
      setLoading(false);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className='flex w-full items-center'>
      <Input
        id='comment'
        type='text'
        placeholder='Write a comment anonymously'
        className='rounded-r-none py-3'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        type='submit'
        className='mt-1 rounded-l-none border border-green-600 bg-green-600 py-3 text-white'
        loading={loading}
        disabled={loading}
      >
        Comment
      </Button>
    </form>
  );
};

export { CommentForm };
