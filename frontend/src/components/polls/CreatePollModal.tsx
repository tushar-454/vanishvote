import { fetchAPI } from '@/src/lib/utils';
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

type PollBody = {
  question: string;
  expiresAt: string;
  isYesNo: boolean;
  options?: { text: string }[];
};

type CreatePollResponse = {
  success: boolean;
  message: string;
  data: [];
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
  const [poll, setPoll] = useState(initialState);
  const [options, setOptions] = useState(initialOptions);
  const [isYesNo, setIsYesNo] = useState(true);
  const [loading, setLoading] = useState(false);

  // handle poll create submit
  const handlePollCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pollBody: PollBody = {
      question: poll.question,
      expiresAt: poll.expiresAt,
      isYesNo: isYesNo,
    };
    if (!isYesNo) {
      pollBody['options'] = options.map((option) => ({ text: option.text }));
    }
    try {
      setLoading(true);
      const response = await fetchAPI<CreatePollResponse>('/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pollBody),
      });

      if (response.success) {
        setShowModal(false);
        setPoll(initialState);
        setOptions(initialOptions);
      }
    } catch (error) {
      console.error('Error creating poll', error);
    } finally {
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
