import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
	type: String,
	data: String,
});

const logsSchema = new mongoose.Schema({
	logs: { type: dataSchema, required: true },
	timestamp: { type: Date, default: Date.now, required: true },
});

const Logs = mongoose.model('Log', logsSchema);

export { Logs };
