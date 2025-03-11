import { NextFunction, Request, Response } from 'express';
import { Poll } from '../../models/Poll';

const submitPollReaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { reaction } = req.body;
    if (!reaction || typeof reaction !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Reaction is required and must be a string',
      });
      return;
    }
    if (!['like', 'trending'].includes(reaction)) {
      res.status(400).json({
        success: false,
        message: 'Invalid reaction type',
      });
      return;
    }

    const updatedPoll = await Poll.findOneAndUpdate({ _id: id }, { $inc: { [`reactions.${reaction}`]: 1 } }, { new: true });

    if (!updatedPoll) {
      res.status(404).json({
        success: false,
        message: 'Poll not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Reaction added',
      data: updatedPoll,
    });
  } catch (error) {
    next(error);
  }
};

export { submitPollReaction };
