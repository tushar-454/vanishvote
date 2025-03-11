'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { CreatePollModal } from './CreatePollModal';

const CreatePoll = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <Button
          className='cursor-pointer bg-green-600 text-white'
          onClick={() => setShowModal(!showModal)}
        >
          Create Poll
        </Button>
      </div>
      <div
        className={`absolute top-0 left-0 flex min-h-screen w-full justify-center bg-gray-900/50 pt-16 transition-all duration-300 ${showModal ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <CreatePollModal setShowModal={setShowModal} />
      </div>
    </>
  );
};

export { CreatePoll };
