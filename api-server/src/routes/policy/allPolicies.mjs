import express from 'express';
import { Policy } from '../../models/Policy.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const policy = await Policy.find({});
		res.status(200).send(policy);
	} catch (err) {
		res.status(500).send({
			message: 'Couldn\t fetch policies',
			error: err,
		});
	}
});

async function getAllPoliciesExample() {
	return await Policy.find({});
}

export { router as getAllPoliciesRouter, getAllPoliciesExample };
