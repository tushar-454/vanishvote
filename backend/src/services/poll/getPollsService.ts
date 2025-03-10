import { Poll, PollType } from '../../models/Poll';

const getPollsService = async (): Promise<PollType[] | undefined> => {
  try {
    const polls = await Poll.find({ isPrivate: false }).sort({ createdAt: -1 }).select('-comments -isPrivate -options -isYesNo -expiresAt -isResultHide -createdAt -__v');
    return polls || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getPollsService };
