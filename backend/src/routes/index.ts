import { Router } from 'express';
import { pollRouter } from './poll';
const router = Router();

router.use('/api/v1/polls', pollRouter);

export default router;
