import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import SocketMock from 'socket.io-mock';
import { socket_events } from '../types/events.mjs';

describe('Master Server', () => {
	let io, serverSocket, clientSocket;

	beforeAll((done) => {
		const httpServer = createServer();
		io = new Server(httpServer);
		httpServer.listen(() => {
			const port = httpServer.address().port;
			clientSocket = new Client(`http://localhost:${port}`);
			io.on('connection', (socket) => {
				serverSocket = socket;
			});
			clientSocket.on('connect', done);
		});
	});

	afterAll(() => {
		io.close();
		clientSocket.close();
	});

	it('clientAuth check', (done) => {
		serverSocket.on('clientAuth', (key) => {
			if (key === 'admin') serverSocket.join('admin');
			var room = Array.from(serverSocket.rooms);
			expect(room[1]).toBe('admin');
			done();
		});
		clientSocket.emit('clientAuth', 'admin');
	});

	it('check client emit', (done) => {
		clientSocket.on('hello', (arg) => {
			expect(arg).toBe('world');
			done();
		});
		serverSocket.emit('hello', 'world');
	});

	it('check server emit', (done) => {
		serverSocket.on('hi', (cb) => {
			cb('hola');
		});
		clientSocket.emit('hi', (arg) => {
			expect(arg).toBe('hola');
			done();
		});
	});

	// test('disconnect check', (done) => {
	// 	let socket = new SocketMock();
	// 	let io = new SocketMock();

	// 	socket.on('disconnect', () => {
	// 		// io.to('admin').emit('hello', 'hello');
	// 		io.emit('hello', 'hello');
	// 		console.log('disconnected!');
	// 		done();
	// 	});

	// 	socket.socketClient.on('hello', (data) => {
	// 		console.log('Disconnted:', data);
	// 	});

	// 	// serverSocket.on('hello', (cb) => {
	// 	// 	// serverSocket.to(socket_events.emit.ADMIN).emit(socket_events.emit.LOGS, {
	// 	// 	// 	type: 'disconnected',
	// 	// 	// 	data: `Client with socket id: ${socketId} has disconnected!`,
	// 	// 	// });
	// 	// 	cb('hello');
	// 	// });

	// 	// clientSocket.on('hello', (arg) => {
	// 	// 	// expect(arg).toBe('hello');
	// 	// 	console.log(arg);
	// 	// 	done();
	// 	// });

	// 	socket.disconnect((e) => {
	// 		console.log(e);
	// 	});
	// });

	it('check for initPerfData event', (done) => {
		serverSocket.on(socket_events.listen.INIT_PERF_DATA, (cb) => {
			cb('snapshot saved to database');
		});

		clientSocket.emit(socket_events.emit.INIT_PERF_DATA, (arg) => {
			expect(arg).toBe('snapshot saved to database');
			done();
		});
	});

	it('check for performance data event', (done) => {
		serverSocket.on(socket_events.listen.PERF_DATA, (cb) => {
			cb('receiving performance metrics');
		});

		clientSocket.emit(socket_events.emit.PERF_DATA, (arg) => {
			expect(arg).toBe('receiving performance metrics');
			done();
		});
	});

	it('check for update_ban_list event', (done) => {
		let socket = new SocketMock();

		socket.socketClient.on(socket_events.listen.UPDATED_BAN, (data) => {
			expect(data).toBe('new ban list');
		});

		socket.on(socket_events.listen.UPDATE_BAN_LIST, (data) => {
			socket.emit(socket_events.emit.UPDATED_BAN, data);
			done();
		});

		socket.socketClient.emit(
			socket_events.emit.UPDATE_BAN_LIST,
			'new ban list'
		);
	});

	it('checks for NODE_LOGS event', (done) => {
		let socket = new SocketMock();

		socket.socketClient.on(socket_events.listen.LOGS, (data) => {
			expect(data).toBe('telemetry from multiple systems');
		});

		socket.on(socket_events.listen.NODE_LOGS, (data) => {
			socket.emit(socket_events.emit.LOGS, data);
			done();
		});

		socket.socketClient.emit(
			socket_events.emit.NODE_LOGS,
			'telemetry from multiple systems'
		);
	});
});
