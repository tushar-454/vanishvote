import { createPoll, revalidatePolls } from '@/src/api/poll';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TypographyH3 } from '../ui/typography';

type CreatePollModalProps = {
  setShowModal: (show: boolean) => void;
};

type InitialStateType = {
  question: string;
  expiresAt: string;
};

export type PollBody = {
  question: string;
  expiresAt: string;
  isYesNo: boolean;
  isPrivate: boolean;
  options?: { text: string }[];
};

const initialState: InitialStateType = {
  question: '',
  expiresAt: '',
};

const initialOptions = [
  {
    id: 1,
    text: '',
  },
  {
    id: 2,
    text: '',
  },
];

const CreatePollModal = ({ setShowModal }: CreatePollModalProps) => {
  const router = useRouter();
  const [poll, setPoll] = useState(initialState);
  const [options, setOptions] = useState(initialOptions);
  const [isYesNo, setIsYesNo] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle poll create submit
  const handlePollCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pollBody: PollBody = {
      question: poll.question,
      expiresAt: poll.expiresAt,
      isYesNo: isYesNo,
      isPrivate: isPrivate,
    };
    if (!isYesNo) {
      pollBody['options'] = options.map((option) => ({ text: option.text }));
    }
    try {
      setLoading(true);
      const response = await createPoll(pollBody);
      if (response.success) {
        if (!isPrivate) await revalidatePolls();
        router.push(`/polls/${response.data._id}`);
      }
    } catch (error) {
      console.error('Error creating poll', error);
      setLoading(false);
    }
  };

  // handle add option
  const handleAddOption = () => {
    const newOptions = [...options, { id: options.length + 1, text: '' }];
    setOptions(newOptions);
  };

  return (
    <div className='min-h-[768px] w-[768px] rounded-lg bg-white p-4 shadow-lg md:h-[768px]'>
      {/* form header  */}
      <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
        <TypographyH3>Create Poll</TypographyH3>
        <Button className='bg-red-600 text-white' onClick={() => setShowModal(false)}>
          Close
        </Button>
      </div>
      {/* form body  */}
      <form className='space-y-3' onSubmit={handlePollCreateSubmit}>
        <Input
          label='Question'
          id='question'
          type='text'
          placeholder='Enter your question'
          required
          value={poll.question}
          onChange={(e) => setPoll({ ...poll, question: e.target.value })}
        />
        <Input
          label='Expires At'
          id='expiresAt'
          type='number'
          placeholder='Enter number of hours'
          required
          value={poll.expiresAt}
          onChange={(e) => setPoll({ ...poll, expiresAt: e.target.value })}
        />
        {!isYesNo &&
          options.map((option, index) => (
            <Input
              key={option.id}
              label={`Options ${option.id}`}
              id={`options ${option.id}`}
              type='text'
              placeholder={`Enter your options text for ${option.id}`}
              value={option.text}
              required
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = { ...newOptions[index], text: e.target.value };
                setOptions(newOptions);
              }}
            />
          ))}
        {/* isYesNo button and add option button  */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <input
              type='checkbox'
              checked={!isYesNo}
              onChange={() => setIsYesNo(!isYesNo)}
              name='isYesNo'
              id='isYesNo'
            />
            <label htmlFor='isYesNo' className='ml-2 cursor-pointer'>
              Choose Multiple Options
            </label>
          </div>
          {!isYesNo && (
            <Button className='bg-blue-600 text-white' onClick={handleAddOption}>
              Add Option
            </Button>
          )}
        </div>
        {/* isPrivate button  */}
        <div>
          <input
            type='checkbox'
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            name='isPrivate'
            id='isPrivate'
          />
          <label htmlFor='isPrivate' className='ml-2 cursor-pointer'>
            I want to make this poll private
          </label>
        </div>
        <Button
          type='submit'
          loading={loading}
          disabled={loading}
          className='bg-green-600 text-white'
        >
          Create Poll
        </Button>
      </form>
    </div>
  );
};

export { CreatePollModal };
