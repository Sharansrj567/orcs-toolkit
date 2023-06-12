import express from 'express';

import { currentuserRouter } from './current-user.mjs';
import { googleAuthRouter } from './google-auth.mjs';
import { signupRouter } from './signup.mjs';
import { signinRouter } from './signin.mjs';
import { signoutRouter } from './signout.mjs';

const router = express.Router();

router.use('/currentuser', currentuserRouter);
router.use('/google', googleAuthRouter);
router.use('/register', signupRouter);
router.use('/login', signinRouter);
router.use('/logout', signoutRouter);

export { router as authRouter };
