import { NextFunction, Request, Response } from 'express';
import { Poll } from '../../models/Poll';
import { isPollExpired } from '../../utils/time';

const submitPollVote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { optionText } = req.body;
    if (!optionText || typeof optionText !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Option text is required',
      });
      return;
    }
    const poll = await Poll.findById(id);
    if (!poll) {
      res.status(404).json({
        success: false,
        message: 'Poll not found',
      });
      return;
    }
    if (!poll.isResultHide || isPollExpired(poll.expiresAt)) {
      if (poll.isResultHide) {
        poll.isResultHide = false;
        await poll.save();
      }
      res.status(400).json({
        success: false,
        message: 'Voting is closed',
      });
      return;
    }
    const updatedPoll = await Poll.findOneAndUpdate({ _id: id, 'options.text': optionText }, { $inc: { 'options.$.votes': 1 } }, { new: true });

    if (!updatedPoll) {
      res.status(404).json({
        success: false,
        message: 'Poll or option not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Vote submitted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export { submitPollVote };
