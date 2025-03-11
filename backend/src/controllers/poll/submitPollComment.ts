import { NextFunction, Request, Response } from 'express';
import { Poll } from '../../models/Poll';
import { utcISOTime } from '../../utils/time';

const submitPollComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Text is required and must be a string',
      });
      return;
    }
    if (text.length > 300) {
      res.status(400).json({
        success: false,
        message: 'Text must be less than 300 characters',
      });
      return;
    }

    const updatedPoll = await Poll.findOneAndUpdate(
      { _id: id },
      {
        $push: { comments: { text: text, createdAt: utcISOTime(0) } },
      },
      { new: true }
    );

    if (!updatedPoll) {
      res.status(404).json({
        success: false,
        message: 'Poll not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Comment added',
      data: updatedPoll,
    });
  } catch (error) {
    next(error);
  }
};

export { submitPollComment };
