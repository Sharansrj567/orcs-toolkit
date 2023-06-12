import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
	banList: Array,
});

studentSchema.set('versionKey', 'version');

const Student = mongoose.model('Student', studentSchema);

export { Student };
