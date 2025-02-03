const userModel = require('../models/userModel');

//login callback
const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email, password });
		if (!user) {
			return res.status(400).json({
				status: 'failed',
				message: 'Invalid credentials',
			});
		}
		res.status(200).json({
			status: 'success',
			data: user,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
//register callback
const registerController = async (req, res) => {
	try {
		const newUser = new userModel(req.body);
		await newUser.save();
		res.status(201).json({
			status: 'success',
			data: newUser,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
module.exports = { loginController, registerController };
