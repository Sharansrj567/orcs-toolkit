import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

router.get('/test', (req, res) => {
	res.send('Success!');
});

router.get(
	'/',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

router.get('/callback', passport.authenticate('google'), (req, res) => {
	const { id, name, email } = req.user;

	const userToken = jwt.sign(
		{
			id,
			name,
			email,
		},
		String(process.env.SECRET_KEY)
	);

	req.session.user = userToken;

	res.status(201).send(req.user);
});

export { router as googleAuthRouter };
