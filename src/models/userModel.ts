import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	name: {
		type: String,
		required: false,
		default: '',
		trim: true,
	},
	username: {
		type: String,
		required: [true, 'Username is required'],
		unique: true,
		trim: true,
	},
	profile_picture: {
		type: String,
		default: '',
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	forgotPasswordToken: {
		type: String,
	},
	forgotPasswordTokenExpiry: {
		type: Date,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
	},
	verificationTokenExpiry: {
		type: Date,
	},
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
