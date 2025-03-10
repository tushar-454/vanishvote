import { Poll, PollType } from '../../models/Poll';

const findPollByProperty = async (property: string, value: string): Promise<PollType | undefined | null> => {
  try {
    if (property === '_id') return await Poll.findById(value);
    const poll = await Poll.findOne({ [property]: value });
    return poll ? poll : undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { findPollByProperty };
