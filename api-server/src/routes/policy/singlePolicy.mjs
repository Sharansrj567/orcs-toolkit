import express from 'express';
import { Policy } from '../../models/Policy.mjs';

const router = express.Router();

router.get('/:id', async (req, res) => {
	const policyId = req.params.id;

	try {
		const policy = await Policy.findById(policyId);

		if (!policy)
			res.status(401).send({
				message: 'Policy not found!',
			});

		res.status(201).send(policy);
	} catch (err) {
		res.status(500).send({
			message: 'Couldn\t fetch requested policy',
			error: err,
		});
	}
});

export { router as getSinglePolicyRouter };
