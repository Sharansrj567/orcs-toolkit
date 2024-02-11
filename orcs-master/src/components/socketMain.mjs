import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import {
	checkAndAdd,
	setActiveState,
	onMachineDisconnect,
} from '../services/MachineCheckAndAdd.mjs';
import { Logger } from '../services/logger.mjs';
import { winLogger } from '../services/winstonLogger.mjs';
import { socket_events } from '../types/events.mjs';

const logger = new Logger();

export function socketMain(io, socket, workerId) {
	const adminNamespace = io.of('/admin');

	(async () => {
		try {
			await mongoose.connect(process.env.MONGO_URI);
			logger.workerInfo(`Worker: ${workerId} connected to MongoDB`);
		} catch (err) {
			logger.error(err.message);
		}
	})();

	let macA;

	// console.log('Socket Session: ', socket.request.session);

	socket.on('logout', async () => {
		var room = Array.from(socket.rooms);
		await socket.leave(room[1]);

		// winLogger.log('info', {
		// 	message: 'MASTER SERVER INFO LOGS',
		// 	type: 'disconnected',
		// 	data: `Client with socket id: ${socket.id} has left the room ${room[1]}!`,
		// });
		winLogger.log('info', {
			message: 'disconnected',
			data: `Client with socket id: ${socket.id} has left the room ${room[1]}!`,
		});
		adminNamespace.to(socket_events.emit.ADMIN).emit(socket_events.emit.LOGS, {
			type: 'disconnected',
			data: `Client with socket id: ${socket.id} has left the room ${room[1]}!`,
		});
		logger.warn(`Leaving room: ${room[1]}`);
		logger.warn(`Client with socket id: ${socket.id} has left the room!`);
	});

	socket.on(socket_events.listen.DISCONNECT, async () => {
		onMachineDisconnect(macA, adminNamespace);

		winLogger.log('info', {
			message: 'disconnected',
			data: `Client with socket id: ${socket.id} has disconnected!`,
		});

		adminNamespace.to(socket_events.emit.ADMIN).emit(socket_events.emit.LOGS, {
			type: 'disconnected',
			data: `Client with socket id: ${socket.id} has disconnected!`,
		});
		logger.warn(`Client with socket id: ${socket.id} has disconnected!`);
	});

	socket.on(socket_events.listen.INIT_PERF_DATA, async (data) => {
		macA = data.macA;
		const mongooseResponse = await checkAndAdd(data);
		logger.info(mongooseResponse);
	});

	socket.on(socket_events.listen.PERF_DATA, (data) => {
		adminNamespace
			.to(socket_events.emit.ADMIN)
			.emit(socket_events.emit.DATA, data);
	});

	socket.on(socket_events.listen.UPDATED_BAN, (data) => {
		logger.info(`Sending ${data} to node-exporter`);
		socket.broadcast.emit(socket_events.emit.UPDATED_BAN, data);
	});

	socket.on(socket_events.listen.NODE_LOGS, async (dateData) => {
		winLogger.log('info', {
			message: `${dateData.type}`,
			data: `${dateData.data}`,
		});
		adminNamespace
			.to(socket_events.emit.ADMIN)
			.emit(socket_events.emit.LOGS, dateData);
	});
}
