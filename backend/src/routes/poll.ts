import { Router } from 'express';
import { createPoll } from '../controllers/poll/createPoll';
const router = Router();

router.post('/', createPoll);

export { router as pollRouter };
