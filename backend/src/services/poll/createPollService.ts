import { Poll, PollType } from '../../models/Poll';

const createPollService = async (poll: Partial<PollType>): Promise<PollType | undefined> => {
  const { question, options, isYesNo, expiresAt, isResultHide, isPrivate } = poll;
  try {
    const newPoll = await Poll.create({
      question,
      options,
      isYesNo,
      expiresAt,
      isResultHide,
      isPrivate,
    });
    return newPoll;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { createPollService };
