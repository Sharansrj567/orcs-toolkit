import express from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { ValidateRequest } from '@ssktickets/common';
import { User } from '../../models/JwtUser.mjs';
import { Password } from '../../services/password.mjs';
import { rateLimiter } from '../../middlewares/redisRateLimiter.mjs';

const router = express.Router();

router.post(
	'/',
	[
		body('email').isEmail().withMessage('Email must be valid!'),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('You must supply a password!'),
	],
	ValidateRequest,
	rateLimiter,
	async (req, res) => {
		const { email, password } = req.body;
		console.log(email, password);

		const user = await User.findOne({ email });

		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Invalid Credentials' });

		const validPassword = await Password.compare(user.password, password);

		if (!validPassword)
			return res
				.status(400)
				.json({ success: false, message: 'Invalid Credentials.' });

		// Create and assign token
		const userToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
			},
			String(process.env.SECRET_KEY)
		);

		// Store it on session object
		req.session.user = userToken;

		return res.json({
			success: true,
			message: `Successfully logged in user: ${user.email}`,
		});
	}
);

export { router as signinRouter };
