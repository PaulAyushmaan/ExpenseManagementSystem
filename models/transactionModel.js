const mongoose = require('mongoose');

//schema design

const transactionSchema = new mongoose.Schema(
	{
		userid: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: [true, 'Please add an amount'],
		},
		type: {
			type: String,
			required: [true, 'Please select a type'],
		},
		category: {
			type: String,
			required: [true, 'Please select a category'],
		},
		reference: {
			type: String,
		},
		date: {
			type: Date,
			required: [true, 'Please select a date'],
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const transactionModel = mongoose.model('transactions', transactionSchema);
module.exports = transactionModel;
