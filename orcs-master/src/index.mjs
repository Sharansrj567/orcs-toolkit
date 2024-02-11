import cluster from 'cluster';
import { createSpinner } from 'nanospinner';
import { Logger } from './services/logger.mjs';

const logger = new Logger();
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

import { isMaster } from './components/master.mjs';
import { isWorker } from './components/worker.mjs';

if (cluster.isPrimary || !cluster.isWorker) {
	await (async () => {
		const spinner = createSpinner(
			'Checking if necessary configuration is set...'
		).start();
		await sleep();

		if (!process.env.SECRET_KEY) {
			// logger.error('SECRET_KEY not defined!');
			spinner.error({ text: 'SECRET_KEY not defined!' });
			logger.warn('Using default SECRET_KEY!');
		}

		if (!process.env.MONGO_URI) {
			// logger.error('MONGO_URI not specified!');
			spinner.error({ text: 'MONGO_URI not defined!' });
			process.exit(1);
		}

		spinner.success({ text: 'Configuration successful' });
	})();
	// console.log('Hello from Master!');
	await isMaster();
} else {
	// console.log('Hello from Worker!');
	isWorker();
}
