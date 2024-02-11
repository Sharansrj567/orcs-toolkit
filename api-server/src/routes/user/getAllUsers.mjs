import express from 'express';
import { User } from '../../models/User.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const user = await User.find({});
		res.status(200).send(user);
	} catch (err) {
		res.status(500).send({
			message: 'Couldn\t fetch users',
			error: err,
		});
	}
});

export { router as getAllUsersRouter };
