import { Router } from 'express';
import { createPoll } from '../controllers/poll/createPoll';
import { getPollById } from '../controllers/poll/getPollById';
import { getPolls } from '../controllers/poll/getPolls';
import { submitPollComment } from '../controllers/poll/submitPollComment';
import { submitPollReaction } from '../controllers/poll/submitPollReaction';
import { submitPollVote } from '../controllers/poll/submitPollVote';
const router = Router();

router.post('/', createPoll);
router.get('/', getPolls);
router.get('/:id', getPollById);
router.post('/:id/vote', submitPollVote);
router.patch('/:id/reaction', submitPollReaction);
router.post('/:id/comments', submitPollComment);

export { router as pollRouter };
