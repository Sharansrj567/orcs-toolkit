import express from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { ValidateRequest } from '@ssktickets/common';
import { User } from '../../models/User.mjs';
import { Password } from '../../services/passwordEncrypt.mjs';

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
	async (req, res) => {
		const { email, password } = req.body;

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
				isAdmin: user.isAdmin,
				role: user.role,
			},
			String(process.env.SECRET_KEY)
		);

		return res.json({
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				admin: user.isAdmin,
				role: user.role,
			},
			success: true,
			token: userToken,
		});
	}
);

export { router as signinRouter };
