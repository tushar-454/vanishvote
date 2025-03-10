import { Router } from 'express';
import { createPoll } from '../controllers/poll/createPoll';
import { getPollById } from '../controllers/poll/getPollById';
import { getPolls } from '../controllers/poll/getPolls';
const router = Router();

router.post('/', createPoll);
router.get('/', getPolls);
router.get('/:id', getPollById);

export { router as pollRouter };
