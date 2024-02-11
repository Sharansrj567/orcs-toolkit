import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	req.session.destroy(function (err) {
		res.send({
			success: true,
			message: 'Successfully logged out.',
			error: err,
		});
	});
	req.logOut();
});

export { router as signoutRouter };
