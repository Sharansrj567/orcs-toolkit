import dotenv from 'dotenv';
dotenv.config();
import { createLogger, format, transports } from 'winston';
import _ from 'winston-mongodb';

export const winLogger = createLogger({
	defaultMeta: 'MASTER SERVER LOGS',
	transports: [
		// new transports.File({
		// 	level: 'error',
		// 	filename: 'error.log',
		// 	format: format.combine(format.timestamp(), format.json()),
		// }),
		new transports.MongoDB({
			name: 'NODE EXPORTER ERROR LOGS',
			level: 'error',
			db: String(process.env.MONGO_URI),
			collection: 'orcs-error-logs',
			format: format.combine(format.timestamp(), format.json()),
			options: {
				useUnifiedTopology: true,
			},
		}),
		new transports.MongoDB({
			name: 'NODE EXPORTER LOGS',
			level: 'info',
			db: String(process.env.MONGO_URI),
			collection: 'orcs-info-logs',
			format: format.combine(format.timestamp(), format.json()),
			options: {
				useUnifiedTopology: true,
			},
		}),
	],
});

winLogger.stream = {
	write: function (message, encoding) {
		winLogger.info(message);
	},
};
