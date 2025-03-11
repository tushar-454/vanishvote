import { getPollById, getPolls } from '@/src/api/poll';
import { CopyPollLink } from '@/src/components/polls/CopyPollLink';
import { PollDetailsComments } from '@/src/components/polls/PollDetailsComments';
import { PollDetailsOption } from '@/src/components/polls/PollDetailsOption';
import { PollDetailsReactions } from '@/src/components/polls/PollDetailsReactions';
import { PollExpireTime } from '@/src/components/polls/PollExpireTime';
import { Container } from '@/src/components/shared/Container';
import { TypographyH3, TypographySmall } from '@/src/components/ui/typography';

type PollDetailsProps = {
  params: Promise<{ id: string }>;
};

const PollDetails = async ({ params }: PollDetailsProps) => {
  const { id } = await params;
  const { success, data } = await getPollById(id);
  const { question, options, reactions, comments, expiresAt, isResultHide } = data || {};
  if (!success) {
    return <div className='mt-10 text-center text-red-500'>Failed to fetch poll</div>;
  }
  const totalVotes = options.reduce((acc, option) => acc + option.votes, 0);
  return (
    <main
      className='min-h-screen bg-slate-100 py-10'
      style={{
        backgroundImage: `url('https://res.cloudinary.com/karim-cloude/image/upload/v1741708211/anonymous_htqobj.svg')`,
      }}
    >
      <Container>
        <div className='rounded-md bg-white p-5'>
          <div className='flex items-center justify-between gap-4'>
            <TypographyH3>{question}</TypographyH3>
            <CopyPollLink />
          </div>
          <TypographySmall className='mt-2'>
            {expiresAt ? <PollExpireTime expiresAt={expiresAt} /> : 'N/A'}
          </TypographySmall>
          <div>
            {options.map((option, index) => {
              const percentage =
                totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(0) : '0';
              return (
                <PollDetailsOption
                  key={option.text}
                  pollId={id}
                  option={option}
                  isResultHide={isResultHide}
                  idx={index}
                  percentage={percentage}
                />
              );
            })}
          </div>

          <PollDetailsReactions pollId={id} reactions={reactions} />
          <PollDetailsComments pollId={id} comments={comments} />
        </div>
      </Container>
    </main>
  );
};

export default PollDetails;

export async function generateStaticParams() {
  const res = await getPolls();
  if (!res.success) null;
  return res.data.map((poll) => ({
    id: poll._id,
  }));
}
