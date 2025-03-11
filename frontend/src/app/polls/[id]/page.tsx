import { getPollById, getPolls } from '@/src/api/poll';
import { CopyPollLink } from '@/src/components/polls/CopyPollLink';
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
  const { question, options, reactions, comments, expiresAt, isResultHide } = data;
  if (!success) {
    return <div className='mt-10 text-center text-red-500'>Failed to fetch poll</div>;
  }
  const totalVotes = options.reduce((acc, option) => acc + option.votes, 0);
  return (
    <main className='h-screen bg-slate-100'>
      <Container>
        <div className='rounded-xl bg-white p-5'>
          <div className='flex items-center justify-between gap-4'>
            <TypographyH3>{question}</TypographyH3>
            <CopyPollLink />
          </div>
          <TypographySmall className='mt-2'>
            {expiresAt ? <PollExpireTime expiresAt={expiresAt} /> : 'N/A'}
          </TypographySmall>
          <div>
            {options.map((option, index) => {
              const percentage = ((option.votes / totalVotes) * 100).toFixed(0);
              return (
                <PollDetailsOption
                  key={option._id}
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
