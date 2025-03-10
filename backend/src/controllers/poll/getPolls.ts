import { NextFunction, Request, Response } from 'express';
import { getPollsService } from '../../services/poll/getPollsService';

const getPolls = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const polls = await getPollsService();
    res.status(200).json({
      success: true,
      message: 'Retrieved all polls',
      data: polls,
    });
  } catch (error) {
    next(error);
  }
};

export { getPolls };
