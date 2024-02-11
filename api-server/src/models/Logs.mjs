import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema(
	{
		data: String,
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret._id;
			},
		},
	}
);

const logsSchema = new mongoose.Schema({
	timestamp: String,
	level: String,
	message: String,
	meta: metaSchema,
});

const Logs = mongoose.model('orcs-logs', logsSchema);

export { Logs };
