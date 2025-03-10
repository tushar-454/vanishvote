import { NextFunction, Request, Response } from 'express';
import { PollType } from '../../models/Poll';
import { createPollService } from '../../services/poll/createPollService';
import { utcISOTime } from '../../utils/time';

const createPoll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { question, options, isYesNo, expiresAt, isPrivate } = req.body as PollType;
    const poll = await createPollService({
      question,
      options,
      isYesNo,
      expiresAt: utcISOTime(Number(expiresAt)),
      isPrivate,
    });
    res.status(201).json({
      success: true,
      message: 'Poll created',
      data: poll,
    });
  } catch (error) {
    next(error);
  }
};

export { createPoll };
