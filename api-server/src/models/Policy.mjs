import mongoose from 'mongoose';

const policy = new mongoose.Schema(
	{
		role: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
		},
		banList: {
			type: [String],
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

const Policy = mongoose.model('Policy', policy);

export { Policy };
