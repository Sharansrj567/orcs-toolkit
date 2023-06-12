import express from 'express';
import jwt from 'jsonwebtoken';
import { ValidateRequest } from '@ssktickets/common';
import { body } from 'express-validator';
import { User } from '../../models/JwtUser.mjs';

const router = express.Router();

router.post(
	'/',
	[
		body('email').isEmail().withMessage('Email must be valid!'),
		body('password')
			.trim()
			.isLength({ min: 6, max: 24 })
			.withMessage('Password must be between 6 and 24 characters'),
		body('name').notEmpty().withMessage('Name cannot be empty!'),
	],
	ValidateRequest,
	async (req, res) => {
		const { name, email, password } = req.body;

		// Check if user is already registered to the database
		const emailExist = await User.findOne({ email });

		if (emailExist) {
			res.status(401).send('Email already registered!');
		}

		const user = new User({
			name,
			email,
			password,
		});

		const userToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
			},
			String(process.env.SECRET_KEY)
		);

		req.session.user = userToken;

		try {
			const savedUser = await user.save();
			res.status(201).send({
				id: savedUser.id,
				email: savedUser.email,
				name: savedUser.name,
			});
		} catch (err) {
			res.status(400).send({ success: false, message: err });
		}
	}
);

export { router as signupRouter };
