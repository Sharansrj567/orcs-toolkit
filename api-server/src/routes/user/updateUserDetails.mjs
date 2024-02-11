import express from 'express';
import { User } from '../../models/User.mjs';
import { Logger } from '../../services/logger.mjs';

const router = express.Router();
const logger = new Logger();

router.post('/:id', async (req, res) => {
	const userId = req.params.id;
	const { name, email, password, isAdmin, role } = req.body;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).send({
				message: 'User not found!',
			});
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				name,
				email,
				password,
				isAdmin,
				role,
			},
			{
				new: true,
			}
		);

		if (!updatedUser) {
			return res.status(400).send({
				message: 'User update failed!',
			});
		}

		res.status(200).send({
			message: 'User updated successfully',
			user: updatedUser,
		});
	} catch (err) {
		logger.error({
			message: `Couldn\'t update user with ID: ${userId}`,
			errorMessage: err,
		});
	}
});

export { router as updateUserByIdRouter };
