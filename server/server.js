const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./src/config/connectDb');
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
connectDb();
//user routes
app.use('/api/v1/users', require('./src/routes/userRoute'));
//transaction routes
app.use('/api/v1/transactions', require('./src/routes/transactionRoutes'));
app.get('/', (req, res) => {
	res.send('API is running...');
  });

if (process.env.NODE_ENV !== 'vercel') {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
	  console.log(`Server running on port ${PORT}`.yellow.bold);
	});
  }
module.exports = app;