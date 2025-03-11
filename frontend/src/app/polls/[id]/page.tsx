import { getPollById } from '@/src/api/poll';
import { PollDetailsOption } from '@/src/components/polls/PollDetailsOption';
import { PollDetailsReactions } from '@/src/components/polls/PollDetailsReactions';
import { Container } from '@/src/components/shared/Container';
import { TypographyH3 } from '@/src/components/ui/typography';

type PollDetailsProps = {
  params: {
    id: string;
  };
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
          <TypographyH3>{question}</TypographyH3>
          <div>
            {options.map((option, index) => {
              const percentage = ((option.votes / totalVotes) * 100).toFixed(0);
              return (
                <PollDetailsOption
                  key={option._id}
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
