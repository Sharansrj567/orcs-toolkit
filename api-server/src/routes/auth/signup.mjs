import express from 'express';
import jwt from 'jsonwebtoken';
import { ValidateRequest } from '@ssktickets/common';
import { body } from 'express-validator';
import { User } from '../../models/User.mjs';

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
		body('isAdmin').isBoolean().optional(),
	],
	ValidateRequest,
	async (req, res) => {
		const { name, email, password, isAdmin, role } = req.body;

		// Check if user is already registered to the database
		const emailExist = await User.findOne({ email });

		if (emailExist) {
			return res.status(401).json('Email already registered!');
		}

		const user = new User({
			name,
			email,
			password,
			isAdmin,
			role: role.toLowerCase(),
		});

		console.log(user);

		const userToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
				admin: user.isAdmin,
				role: user.role,
			},
			String(process.env.SECRET_KEY)
		);

		try {
			const savedUser = await user.save();
			res.status(201).send({
				user: {
					id: savedUser.id,
					email: savedUser.email,
					name: savedUser.name,
					admin: savedUser.isAdmin,
					role: savedUser.role,
				},
				success: true,
				token: userToken,
			});
		} catch (err) {
			return res.status(400).send({ success: false, message: err });
		}
	}
);

export { router as signupRouter };
