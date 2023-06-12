import { redisClient } from '../services/redis-init.mjs';

export const rateLimiter = async (req, res, next) => {
	const ip = req.connection.remoteAddress.slice(0, 6);
	const [response] = await redisClient.multi().incr(ip).expire(ip, 60).exec();
	// console.log(response[1]);
	if (response[1] > 10)
		res.send({ success: false, message: 'Maximum request capacity reached!' });
	else next();
};
