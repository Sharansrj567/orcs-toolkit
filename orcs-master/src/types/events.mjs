export const socket_events = {
	listen: {
		CLIENT_AUTH: 'clientAuth',
		ADMIN: 'admin',
		LOGOUT: 'logout',
		DISCONNECT: 'disconnect',
		INIT_PERF_DATA: 'initPerfData',
		PERF_DATA: 'perfData',
		UPDATE_BAN_LIST: 'updatedBanList',
		UPDATED_BAN: 'updated:Ban',
		NODE_LOGS: 'node:logs',
		LOGS: 'logs',
	},
	emit: {
		LOGS: 'logs',
		UPDATED_BAN: 'updated:Ban',
		UPDATE_BAN_LIST: 'updatedBanList',
		ADMIN: 'admin',
		DATA: 'data',
		INIT_PERF_DATA: 'initPerfData',
		PERF_DATA: 'perfData',
		NODE_LOGS: 'node:logs',
	},
};
