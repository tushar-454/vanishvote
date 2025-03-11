import { Poll, PollType } from '../../models/Poll';

type TGetPollsService = {
  selectedFields: string;
};

const getPollsService = async ({ selectedFields }: TGetPollsService): Promise<PollType[] | undefined> => {
  try {
    const polls = await Poll.find({ isPrivate: false }).sort({ createdAt: -1 }).select(selectedFields);
    return polls || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getPollsService };
