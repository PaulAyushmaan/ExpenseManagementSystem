const mongoose = require('mongoose');

//schema design
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide your name'],
		},
		email: {
			type: String,
			required: [true, 'Please provide your email'],

			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please provide your password'],
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{ timestamps: true },
);

//export
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
