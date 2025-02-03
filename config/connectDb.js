const mongoose = require('mongoose');
const colors = require('colors');
const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
	} catch (err) {
		console.error(`Error: ${err.message}`.red.bold);
		process.exit(1);
	}
};
module.exports = connectDb;
