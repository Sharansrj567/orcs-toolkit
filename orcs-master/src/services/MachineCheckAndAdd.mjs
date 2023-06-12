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
			io.to('admin').emit('data', aMachine);
		});
	});
}

export function onMachineDisconnect(macA, io) {
	Machine.find({ macA }, (err, docs) => {
		if (docs.length > 0) {
			// send one last emit to client
			docs[0].isActive = false;
			io.to('admin').emit('data', docs[0]);
		}
	});
}
