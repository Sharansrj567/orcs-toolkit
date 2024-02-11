import express from 'express';
import { User } from '../../models/User.mjs';
import { Logger } from '../../services/logger.mjs';

const router = express.Router();
const logger = new Logger();

router.post('/:id', async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).send({
				message: 'User not found!',
			});
		}

		await User.findByIdAndDelete(userId);

		res.status(200).send({
			message: 'Successfully deleted user',
			user,
		});
	} catch (err) {
		logger.error("Couldn't delete user with ID", userId);
	}
});

export { router as deleteUserByIdRouter };
