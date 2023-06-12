import si from 'systeminformation';
// const hardwareInfo = require('../service/hardwareInfo');

export async function sysInfo() {
	return new Promise(async (resolve, reject) => {
		const osType = await si.osInfo();
		const cpu = await si.cpu();
		const cpuTemp = await si.cpuTemperature();
		const mem = await si.mem();
		const networkInterfaces = await si.networkInterfaces();
		const systemInformation = await hardwareInfo();
		const processData = await si.processes();

		const isActive = true;

		resolve({
			osType,
			cpu,
			cpuTemp,
			mem,
			networkInterfaces,
			systemInformation,
			isActive,
			processData,
		});
	});
}

async function hardwareInfo() {
	const system = await si.system();
	const uuid = await si.uuid();
	const bios = await si.bios();
	const baseboard = await si.baseboard();
	const chassis = await si.chassis();

	return {
		system,
		uuid,
		bios,
		baseboard,
		chassis,
	};
}
