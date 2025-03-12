'use client';

import { pollComment, revalidatePoll, revalidatePolls } from '@/src/api/poll';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type CommentFormProps = {
  pollId: string;
};

const CommentForm = ({ pollId }: CommentFormProps) => {
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  // handle comment form submission
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await pollComment(pollId, comment);
      if (!res.success) router.push('/');
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
    <form onSubmit={handleCommentSubmit} className='mt-3 flex w-full items-center'>
      <Input
        id='comment'
        type='text'
        placeholder='Write a comment anonymously'
        className='rounded-r-none py-3'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button
        type='submit'
        className='rounded-l-none border border-green-600 bg-green-600 py-3 text-white dark:border-green-700 dark:bg-green-700'
        loading={loading}
        disabled={loading}
      >
        Comment
      </Button>
    </form>
  );
};

export { CommentForm };
