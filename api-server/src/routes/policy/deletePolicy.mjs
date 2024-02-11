import express from 'express';
import { Policy } from '../../models/Policy.mjs';
import { Logger } from '../../services/logger.mjs';

const router = express.Router();
const logger = new Logger();

router.post('/:id', async (req, res) => {
	const policyId = req.params.id;

	try {
		const policy = await Policy.findById(policyId);

		if (!policy) {
			res.status(401).send({
				message: 'Policy not found!',
			});
		}

		await Policy.findByIdAndDelete(policyId);

		res.status(201).send({
			message: 'Successfully deleted Policy',
			policy,
		});
	} catch (err) {
		logger.error("Couldn't delete policy");
	}
});

export { router as deletePolicyRouter };
