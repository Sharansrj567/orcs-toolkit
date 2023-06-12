import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', async (req, res) => {
	if (!req.session.user) return res.status(400).send({ currentUser: null });

	console.log(req.session);

	// console.log(date.toString());
	const payload = jwt.verify(req.session.user, String(process.env.SECRET_KEY));
	res.status(200).send({ currentUser: payload });
});

export { router as currentuserRouter };
