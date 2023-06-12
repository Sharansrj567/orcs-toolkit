import express from 'express';
import cluster from 'cluster';
import { Server } from 'socket.io';
import session from 'express-session';
import redisstore from 'connect-redis';
import redisAdapter from '@socket.io/redis-adapter';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import { morganMiddleware } from '../middlewares/morganMiddleware.mjs';

import { routes } from '../routes/index.mjs';
import { redisClient } from '../services/redis-init.mjs';
import { socketMain } from './socketMain.mjs';
import { Logger } from '../services/logger.mjs';
const logger = new Logger();

// Passport config files
import('../services/jwt-auth.mjs');
import('../services/google-auth.mjs');

var RedisStore = redisstore(session);
var sessionStore = new RedisStore({ client: redisClient });

export function isWorker() {
	const sessionMiddleware = session({
		name: 'auth',
		secret: String(process.env.SECRET_KEY),
		resave: true,
		saveUninitialized: false,
		store: sessionStore,
		cookie: {
			secure: process.env.NODE_ENV === 'production' ? 'true' : 'auto',
			maxAge: 60000,
		},
	});

	// We don't need a port here because Master processes the requests.
	let app = express();
	app.use(express.json());
	app.use(
		cors({
			origin: true,
			credentials: true,
		})
	);
	app.use(sessionMiddleware);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(helmet());
	app.use(morganMiddleware);

	// Routes
	app.use(routes);

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
	const pubClient = redisClient;
	pubClient.on('connect', () => logger.workerInfo('connected to Redis Server'));
	pubClient.on('error', (err) =>
		logger.error("Couldn't establish connection to redis server")
	);
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
	io.use(wrap(sessionMiddleware));
	io.use(wrap(passport.initialize()));
	io.use(wrap(passport.session()));

	// io.use(sharedsession(sessionMiddleware));
	// io.use(wrap(passport.authenticate(['jwt', 'google'])));

	io.on('connection', (socket) => {
		socketMain(io, socket);
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
