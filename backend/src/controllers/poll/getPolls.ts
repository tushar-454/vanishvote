import { NextFunction, Request, Response } from 'express';
import { getPollsService } from '../../services/poll/getPollsService';

const getPolls = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const select = req.query.select as string;
    const selectedFields = `_id reactions question ${select ? select.split(',').join(' ') : ''}`;
    const polls = await getPollsService({ selectedFields });
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
