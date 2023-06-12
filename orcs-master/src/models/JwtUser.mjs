import mongoose from 'mongoose';
import { Password } from '../services/password.mjs';

const jwtSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			max: 255,
		},
		email: {
			type: String,
			required: true,
			min: 6,
			max: 255,
		},
		password: {
			type: String,
			required: true,
			max: 1024,
			min: 6,
		},
		date: {
			type: Date,
			default: Date.now,
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

jwtSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

const User = mongoose.model('JwtUser', jwtSchema);

export { User };
