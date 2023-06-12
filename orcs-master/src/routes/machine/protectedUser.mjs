import express from 'express';
import { requestLogin } from '../../middlewares/requestLogin.mjs';

const router = express.Router();

router.get('/test', requestLogin, async (req, res) => {
	res.send('Hello!');
	console.log(req.session);
});

export { router as protectedRouter };
