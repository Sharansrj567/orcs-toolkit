import express from 'express';
import cluster from 'cluster';
import { Server } from 'socket.io';
import Redis from 'ioredis';
import redisAdapter from '@socket.io/redis-adapter';

import { socketMain } from './socketMain.mjs';
import { Logger } from '../services/logger.mjs';
import { winLogger } from '../services/winstonLogger.mjs';
import { setActiveState } from '../services/MachineCheckAndAdd.mjs';
import { socket_events } from '../types/events.mjs';

const logger = new Logger();

export function isWorker() {
	// We don't need a port here because Master processes the requests.
	let app = express();

	// Don't expose internal server to outside world.
	const server = app.listen(0, 'localhost');
	const io = new Server(server, {
		cors: {
			origin: '*',
		},
	});

	// Tell Socket.IO to use the redis adapter. By default, the redis
	// server is assumed to be on localhost:6379. You don't have to
	// specify them explicitly unless you want to change them.
	// redis-cli monitor.
	const pubClient = new Redis();
	pubClient.on('connect', () => logger.workerInfo('connected to Redis Server'));
	pubClient.on('error', (err) => {
		logger.error("Couldn't establish connection to redis server");
		winLogger.log('error', "Couldn't establish connection to redis server");
	});
	const subClient = pubClient.duplicate();
	io.adapter(redisAdapter(pubClient, subClient));

	const wrap = (middleware) => (socket, next) =>
		middleware(socket.request, {}, next);

	// io.use(function (socket, next) {
	// 	sessionMiddleware(socket.request, socket.request.res, next);
	// });
	// io.use(function (socket, next) {
	// 	sessionMiddleware(socket.handshake, {}, next);
	// });

	// io.use(sharedsession(sessionMiddleware));
	// io.use(wrap(passport.authenticate(['jwt', 'google'])));

	const adminNamespace = io.of('/admin');
	adminNamespace.on('connection', (socket) => {
		socket.on('clientAuth', async (key) => {
			if (key === process.env.AUTH_SECRET) {
				socket.join(socket_events.emit.ADMIN);
				winLogger.log('info', {
					message: 'disconnected',
					data: `Admin with ID ${socket.id} joined!`,
				});
				adminNamespace
					.to(socket_events.emit.ADMIN)
					.emit(socket_events.emit.LOGS, {
						type: 'connected',
						data: `Admin with ID ${socket.id} joined!`,
					});
				logger.info(`Admin with ID ${socket.id} joined!`);
				setActiveState(adminNamespace);
			} else {
				// invalid client
				socket.disconnect(true);
			}
		});
	});

	io.on('connection', (socket) => {
		socketMain(io, socket, cluster.worker.id);
		logger.worker(`Connected to worker: ${cluster.worker.id}`);
		// console.log(`Session: ${socket.request.sessionID}`);
	});

	// Listen to messages sent from master only.
	// Ignore everything else.
	process.on('message', (message, connection) => {
		if (message !== 'sticky-session:connection') {
			return;
		}

		server.emit('connection', connection);
		connection.resume();
	});
}
