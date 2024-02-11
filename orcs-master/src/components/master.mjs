import cluster from 'cluster';
import net from 'net';
import farmhash from 'farmhash';
import os from 'os';
import mongoose from 'mongoose';

// cluster.schedulingPolicy = cluster.SCHED_RR

import { Logger } from '../services/logger.mjs';
import { winLogger } from '../services/winstonLogger.mjs';

const PORT = process.env.PORT || 4000;
const num_processes = process.env.THREADS || os.cpus().length;

const logger = new Logger();

export async function isMaster() {
	let workers = [];

	// Helper function for spawning worker at index 'i'.
	let spawn = (i) => {
		workers[i] = cluster.fork();

		// Optional: Restart worker on exit
		workers[i].on('exit', (code, signal) => {
			logger.info('respawning worker', i);
			spawn(i);
		});
	};

	try {
		await mongoose.connect(process.env.MONGO_URI);
		logger.master('MongoDB connection successful');
		await mongoose.connection.close();
		logger.master('Successfully closed mongoose connection from master');
	} catch (e) {
		winLogger.log('error', {
			message: `${e.message}`,
			meta: 'MongoDB ERROR',
		});
		logger.error(e.message);
	}

	// Spwan workers
	for (var i = 0; i < num_processes; i++) {
		spawn(i);
	}

	const worker_index = (ip, len) => {
		return farmhash.fingerprint32(ip) % len;
	};

	const server = net.createServer({ pauseOnConnect: true }, (connection) => {
		// We received a connection and need to pass it to the appropriate
		// worker. Get the worker for this connection's source IP and pass
		// it the connection.
		let worker = workers[worker_index(connection.remoteAddress, num_processes)];
		worker.send('sticky-session:connection', connection);
	});

	server.listen(PORT, () => {
		logger.master(`Master listenting on PORT: ${PORT}`);
	});
}
