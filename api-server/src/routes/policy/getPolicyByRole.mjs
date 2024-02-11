import express from 'express';
import { Policy } from '../../models/Policy.mjs';

const router = express.Router();

router.get('/:role', async (req, res) => {
	const role = String(req.params.role);

	try {
		Policy.find(
			{
				role: new RegExp(role, 'i'),
			},
			function (err, doc) {
				if (err) {
					res.status(401).send({
						message: 'Policy not found!',
						error: err.message,
					});
				}

				res.status(201).send({
					policy: doc[0],
				});
			}
		);
	} catch (err) {
		console.log(err.message);
		res.status(500).send({
			message: 'Couldn\t fetch requested policy',
			error: err,
		});
	}
});

export { router as roleBasedPolicyRouter };
