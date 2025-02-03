const express = require('express');
const {
	addTransaction,
	getAllTransactions,
	editTransaction,
	deleteTransaction,
} = require('../controllers/transactionController');

//router object
const router = express.Router();

//routes
//add transaction POST method
router.post('/add-transaction', addTransaction);
//Edit transaction POST method
router.post('/edit-transaction', editTransaction);
//Delete transaction POST method
router.post('/delete-transaction', deleteTransaction);
//get transactions
router.post('/get-transactions', getAllTransactions);
module.exports = router;
