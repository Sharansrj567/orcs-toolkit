import os from 'os';
import { performanceData } from './components/perfData.mjs';
import { sysInfo } from './components/systemInfo.mjs';
import { Logger } from './service/logger.mjs';
import { loadPolicyByRole } from './service/orcs-monitor/orcs.mjs';

const logger = new Logger();

export function socketMain(socket) {
	socket.on('connect', () => {
		// logger.info('connected to master server!');
		// identify machine for unique marking, use mac address.
		const nI = os.networkInterfaces();
		let macA;

		// loop through all the network-interfaces of this machine
		// and find non-internal mac address
		for (let key in nI) {
			if (!nI[key][0].internal) {
				macA = nI[key][0].mac;
				break;
			}
		}

		socket.emit('node:logs', {
			type: 'connected',
			data: `system of mac address: ${macA} has connected to the server with socket ID: ${socket.id}`,
		});

		performanceData().then((data) => {
			data.macA = macA;
			socket.emit('initPerfData', data);
		});

		let systemInfoInterval = setInterval(() => {
			sysInfo()
				.then((data) => {
					data.userName = global.userName;
					data.macA = macA;
					data.role = global.role;
					data.name = global.name;
					var x = {};
					var systemMac = { ...x };
					systemMac[macA] = data;
					socket.emit('perfData', systemMac);
				})
				.catch((err) => {
					socket.emit('sysDataError', err);
					throw err;
				});
		}, 1000);

		socket.on('disconnect', () => {
			socket.emit('node:logs', {
				type: 'disconnected',
				data: `system of mac address: ${macA} has disconnected from server`,
			});
			clearInterval(systemInfoInterval);
			logger.warn('Disconnected from master server!');
		});
	});

	socket.on('updated:Ban', (data) => {
		// console.log('From Admin', data);
		// console.log(data.role);
		// console.log(global.role);
		console.log('Received a broadcast of role', global.role);

		if (global.role === data.role) {
			console.log('Hello');
			loadPolicyByRole(global.role);
			// {
			// 	role: '' // default, student, faculty, admin,
			// 	status: // updated, deleted, created
			// }
			// axios.get(`/api/getPolicyByRole/${data.role}`).then(() => {
			// 	orcs_monitors(kemfucker);
			// });
		}
	});
}
