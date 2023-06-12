import express from 'express';
import { errorHandler } from '@ssktickets/common';

import { authRouter } from './auth/index.mjs';
import { protectedRouter } from './machine/protectedUser.mjs';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', protectedRouter);

router.use(errorHandler);

export { router as routes };
