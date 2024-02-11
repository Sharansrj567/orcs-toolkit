import express from 'express';
import { User } from '../../models/User.mjs';
import { Logger } from '../../services/logger.mjs';

const router = express.Router();
const logger = new Logger();

router.get('/:id', async (req, res) => {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).send({
				message: 'User not found!',
			});
		}

		res.status(200).send(user);
	} catch (err) {
		logger.error({
			message: `Couldn\'t find user with ID: ${userId}`,
			errorMessage: err,
		});
	}
});

export { router as getUserByIdRouter };
