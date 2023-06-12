export const requestLogin = (req, res, next) => {
	if (!req.session.user) {
		return res.status(401).send({
			success: false,
			message: 'Please login to access this info.',
		});
	}

	next();
};
