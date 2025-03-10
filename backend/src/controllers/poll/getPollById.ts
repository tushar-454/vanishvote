import { NextFunction, Request, Response } from 'express';
import { findPollByProperty } from '../../services/poll/findPollByProperty';

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
    res.status(200).json({
      success: true,
      message: 'Retrieved poll',
      data: poll,
    });
  } catch (error) {
    next(error);
  }
};

export { getPollById };
