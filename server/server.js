const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
connectDb();
//user routes
app.use('/api/v1/users', require('./routes/userRoute'));
//transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`.yellow.bold);
});
