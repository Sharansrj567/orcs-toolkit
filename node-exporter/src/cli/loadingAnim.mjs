import { createSpinner } from 'nanospinner';
import { Logger } from '../service/logger.mjs';

export async function loadingAnim(socket) {
	const logger = new Logger();
	const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

	const spinner = createSpinner(
		'Checking if necessary configuration is set...'
	).start();
	await sleep();

	const spinner2 = createSpinner('Attempting to reconnect...');

	if (!process.env.SOCKET_URI) {
		spinner.error({ text: 'SOCKET_URI not defined!' });
		process.exit(1);
	}
	spinner.success({ text: 'configuration successful' });

	socket.io.once('reconnect_error', () => {
		logger.error('Error connecting to the master server');
	});

	// socket.io.on('reconnect', () => {
	// 	logger.debug('Reconnecting...');
	// });

	socket.io.on('reconnect_failed', () => {
		spinner2.error({ text: 'Failed to reconnect to server :(' });
		logger.info('Try restarting the server or try again later');
	});

	socket.io.once('reconnect_attempt', async () => {
		// logger.error('Attempting to reconnect...');
		await sleep();
		spinner2.start();
	});

	socket.on('connect', () => {
		spinner2.success({ text: 'connected to master server!' });
		// logger.success('connected to master server!');
		// logger.debug(socket.connected);
	});

	process.on('SIGINT', () => {
		socket.disconnect(true);
		spinner2.error({ text: 'Received SIGINT shuting down...' });
		process.exit(1);
	});
}
