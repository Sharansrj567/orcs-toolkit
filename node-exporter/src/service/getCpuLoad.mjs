import os from 'os';

//get average of all cors
function cpuAverage() {
	const cpus = os.cpus();
	let idleMs = 0;
	let totalMs = 0;
	// loop through each core
	cpus.forEach((aCore) => {
		// loop through each property of the current core
		let type;
		for (type in aCore.times) {
			totalMs += aCore.times[type];
		}
		idleMs += aCore.times.idle;
	});
	return {
		idle: idleMs / cpus.length,
		total: totalMs / cpus.length,
	};
}

export function getCpuLoad() {
	return new Promise((resolve, reject) => {
		const start = cpuAverage();
		setTimeout(() => {
			const end = cpuAverage();
			const idleDifference = end.idle - start.idle;
			const totalDifference = end.total - start.total;
			// console.log(idleDifference, totalDifference);
			// calc the % of cpu used
			const percentageCpu =
				100 - Math.floor((100 * idleDifference) / totalDifference);
			resolve(percentageCpu);
		}, 100);
	});
}
