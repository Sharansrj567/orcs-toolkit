import cluster from 'cluster';
import net from 'net';
import farmhash from 'farmhash';
import os from 'os';
import mongoose from 'mongoose';

import { Logger } from '../services/logger.mjs';
import { winLogger } from '../services/winstonLogger.mjs';

const PORT = process.env.PORT || 4000;
const num_processes = process.env.THREADS || os.cpus().length;

const logger = new Logger();

// Choose forwarding strategy here:
const ACTIVE_METHOD = 'L3_HASH'; // Options: L3_HASH, L4_HASH, ACL, NAT

// ACL rules
const ACL_TABLE = [
	{ ip: '::1', port: 5000, action: 'block' }, // IPv6 loopback
	{ ip: '127.0.0.1', port: 3000, action: 'allow' },
];

// NAT table
const NAT_TABLE = {
	'127.0.0.1:4000': '10.0.0.2:8080',
};

export async function isMaster() {
	let workers = [];

	const spawn = (i) => {
		workers[i] = cluster.fork();

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

	for (let i = 0; i < num_processes; i++) {
		spawn(i);
	}

	// Forwarding Logic
	const getWorkerIndex = (key) => farmhash.fingerprint32(key) % num_processes;

	const server = net.createServer({ pauseOnConnect: true }, (connection) => {
		const ip = connection.remoteAddress;
		const port = connection.remotePort;
		const key = `${ip}:${port}`;

		switch (ACTIVE_METHOD) {
			case 'L4_HASH': {
				const worker = workers[getWorkerIndex(ip + port)];
				logger.master(`L4_HASH forwarding to worker based on ${ip}:${port}`);
				worker.send('sticky-session:connection', connection);
				break;
			}

			case 'ACL': {
				const rule = ACL_TABLE.find(
					(r) => r.ip === ip && r.port === port
				);

				if (rule?.action === 'block') {
					logger.master(`ACL blocked connection from ${ip}:${port}`);
					connection.destroy();
					return;
				}

				const worker = workers[getWorkerIndex(ip)];
				logger.master(`ACL allowed ${ip}:${port} → worker`);
				worker.send('sticky-session:connection', connection);
				break;
			}

			case 'NAT': {
				if (NAT_TABLE[key]) {
					const [mappedIP, mappedPort] = NAT_TABLE[key].split(':');
					logger.master(`NAT mapping ${key} → ${mappedIP}:${mappedPort}`);
					// Simulate logic — for now, just log the NAT.
				}

				const worker = workers[getWorkerIndex(ip)];
				logger.master(`NAT forwarding ${ip} to worker`);
				worker.send('sticky-session:connection', connection);
				break;
			}

			case 'L3_HASH':
			default: {
				const worker = workers[getWorkerIndex(ip)];
				logger.master(`L3_HASH forwarding ${ip} to worker`);
				worker.send('sticky-session:connection', connection);
			}
		}
	});

	server.listen(PORT, () => {
		logger.master(`Master listening on PORT: ${PORT}`);
	});
}
