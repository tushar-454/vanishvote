import { NextFunction, Request, Response } from 'express';
import { findPollByProperty } from '../../services/poll/findPollByProperty';
import { isPollExpired } from '../../utils/time';

const getPollById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const poll = await findPollByProperty('_id', id);
    if (!poll) {
      res.status(404).json({
        success: false,
        message: 'Poll not found',
      });
      return;
    }
    if (poll.isResultHide && isPollExpired(poll.expiresAt)) {
      poll.isResultHide = false;
      await poll.save();
      res.status(200).json({
        success: true,
        message: 'Retrieved poll',
        data: poll,
      });
      return;
    }
    if (!poll.isResultHide) {
      res.status(200).json({
        success: true,
        message: 'Retrieved poll',
        data: poll,
      });
      return;
    }
    const voteHidePoll = poll.options.map((option) => ({
      text: option.text,
    }));
    res.status(200).json({
      success: true,
      message: 'Retrieved poll',
      data: {
        ...poll.toObject(),
        options: voteHidePoll,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getPollById };
