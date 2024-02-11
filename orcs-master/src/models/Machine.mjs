import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
	macA: String,
	cpuLoad: Number,
	freeMem: Number,
	totalMem: Number,
	usedMem: Number,
	memUseage: Number,
	osType: String,
	upTime: Number,
	cpuModel: String,
	numCores: Number,
	cpuSpeed: Number,
	joinedAt: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

machineSchema.set('versionKey', 'version');

const Machine = mongoose.model('Machine', machineSchema);

export { Machine };
