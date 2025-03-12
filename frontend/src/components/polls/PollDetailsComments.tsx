import { Comment } from '@/src/api/poll';
import { TypographyH4, TypographyMuted, TypographyP } from '../ui/typography';
import { CommentForm } from './CommentForm';
import { PollExpireTime } from './PollExpireTime';

type PollDetailsCommentsProps = {
  pollId: string;
  comments: Comment[];
};

const PollDetailsComments = ({ pollId, comments }: PollDetailsCommentsProps) => {
  return (
    <div className='mt-8'>
      <TypographyH4>Comments</TypographyH4>
      {/* comment form  */}
      <CommentForm pollId={pollId} />
      {/* list of comments */}
      <div>
        {comments.reverse().map((comment) => (
          <div
            key={comment._id}
            className='mt-4 flex gap-4 rounded-xs p-2 transition hover:bg-neutral-700 dark:hover:bg-gray-800'
          >
            <span className='grid size-12 place-content-center rounded-full bg-gray-200 p-2 dark:bg-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                width='30'
                height='30'
                x='0'
                y='0'
                viewBox='0 0 24 24'
                xmlSpace='preserve'
              >
                <g>
                  <g strokeLinecap='round' strokeLinejoin='round'>
                    <path
                      d='M7.5 13C5.573 13 4 14.573 4 16.5S5.573 20 7.5 20a3.509 3.509 0 0 0 3.463-3h2.074a3.509 3.509 0 0 0 3.463 3c1.927 0 3.5-1.573 3.5-3.5S18.427 13 16.5 13a3.509 3.509 0 0 0-3.463 3h-2.074A3.509 3.509 0 0 0 7.5 13zm0 1c1.387 0 2.5 1.113 2.5 2.5S8.887 19 7.5 19 5 17.887 5 16.5 6.113 14 7.5 14zm9 0c1.387 0 2.5 1.113 2.5 2.5S17.887 19 16.5 19 14 17.887 14 16.5s1.113-2.5 2.5-2.5zM7.742 4a2.264 2.264 0 0 0-2.209 1.674L4.117 11H2.5a.5.5 0 0 0 0 1h19a.5.5 0 0 0 0-1h-1.617l-1.416-5.326A2.262 2.262 0 0 0 15.56 4.12l-3.399 1.16a.502.502 0 0 1-.324 0l-3.399-1.16A2.24 2.24 0 0 0 7.742 4zm-.015.996c.129.002.26.026.39.07l3.399 1.16c.314.108.654.108.968 0l3.399-1.16a1.246 1.246 0 0 1 1.617.866L18.85 11H5.15L6.5 5.932a1.247 1.247 0 0 1 1.227-.936z'
                      fill='#000000'
                      opacity='1'
                      data-original='#000000'
                    ></path>
                  </g>
                </g>
              </svg>
            </span>

            <div>
              <TypographyP className='mb-2 leading-6'>{comment.text}</TypographyP>
              <TypographyMuted>
                <PollExpireTime expiresAt={comment.createdAt.toString()} label='Date & Time' />
              </TypographyMuted>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PollDetailsComments };
