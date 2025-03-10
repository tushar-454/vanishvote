import { Router } from 'express';
import { createPoll } from '../controllers/poll/createPoll';
import { getPolls } from '../controllers/poll/getPolls';
const router = Router();

router.post('/', createPoll);
router.get('/', getPolls);

export { router as pollRouter };
