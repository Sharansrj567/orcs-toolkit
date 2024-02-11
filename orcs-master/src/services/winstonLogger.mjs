import dotenv from 'dotenv';
dotenv.config();
import { createLogger, format, transports } from 'winston';
import _ from 'winston-mongodb';

export const winLogger = createLogger({
	format: format.metadata(),
	transports: [
		// new transports.File({
		// 	level: 'error',
		// 	filename: 'error.log',
		// 	format: format.combine(format.timestamp(), format.json()),
		// }),
		new transports.MongoDB({
			name: 'MASTER SERVER ERROR LOGS',
			label: 'MASTER SERVER ERROR LOGS',
			level: 'error',
			db: String(process.env.MONGO_URI),
			collection: 'orcs-logs',
			format: format.combine(format.timestamp(), format.json()),
			options: {
				useUnifiedTopology: true,
			},
		}),
		new transports.MongoDB({
			name: 'MASTER SERVER INFO LOGS',
			label: 'MASTER SERVER INFO LOGS',
			level: 'info',
			db: String(process.env.MONGO_URI),
			collection: 'orcs-logs',
			format: format.combine(format.timestamp(), format.json()),
			options: {
				useUnifiedTopology: true,
			},
		}),
	],
});
