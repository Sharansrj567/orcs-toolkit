import { Machine } from '../models/Machine.mjs';

export function checkAndAdd(data) {
	return new Promise((resolve, reject) => {
		Machine.findOne({ macA: data.macA }, (err, docs) => {
			if (err) {
				throw err;
				// reject(err);
			} else if (docs === null) {
				// record or machine not added to db, so add it!
				let newMachine = new Machine(data);
				newMachine.save();
				resolve('Machine registered!');
			} else {
				// record or machine already added to db, so resolve
				resolve('Machine already registered!');
			}
		});
	});
}

export function setActiveState(io) {
	Machine.find({}, (err, docs) => {
		docs.forEach((aMachine) => {
			// on load assume all machines are offline
			aMachine.isActive = false;
			console.log('Connected', aMachine);
			io.to('admin').emit('data', aMachine);
		});
	});
}

export function onMachineDisconnect(macA, io) {
	Machine.findOne({ macA }, (err, docs) => {
		if (docs) {
			// send one last emit to client
			// docs[0]['isActive'] = false;
			docs = { ...docs._doc, isActive: false };
			// console.log('Disconnected', docs);
			var x = {};
			var systemMac = { ...x };
			systemMac[macA] = docs;
			console.log(systemMac);
			io.to('admin').emit('data', systemMac);
		}
	});
}
