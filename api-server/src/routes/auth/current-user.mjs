import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', async (req, res) => {
	var header = req.headers.authorization || '';
	var token = header.split(/\s+/).pop() || '';
	// console.log(`Header: ${header}, Token: ${token}`);

	if (header === 'null' || '' || !header)
		return res.status(200).send({ currentUser: null });
	if (token === 'null' || '' || !token)
		return res.status(200).send({ currentUser: null });

	const payload = jwt.verify(token,process.env.SECRET_KEY);

	res.status(200).send({
		currentUser: payload,
	});
});

export { router as currentuserRouter };
