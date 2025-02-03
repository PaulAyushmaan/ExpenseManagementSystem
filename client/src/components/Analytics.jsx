import { all } from 'axios';
import React from 'react';
import { Progress } from 'antd';
const Analytics = ({ allTransactions }) => {
	const categories = [
		'Chanda',
		'Thakur',
		'Doshokorma Bazar',
		'Cleaning',
		'Boksish',
		'Decorator',
		'Mudi Bazar',
		'Ful Fol',
		'Cooking',
		'Purohit',
		'Toto Vara',
		'Mishti',
		'Puja Babod',
		'Khawa Babod',
	];
	console.log(allTransactions);
	const totalTransaction = allTransactions.length;
	const totalIncomeTransactions = allTransactions.filter(
		(t) => t.type === 'income',
	).length;
	const totalExpenseTransactions = allTransactions.filter(
		(t) => t.type === 'expense',
	).length;
	const totalIncomePercentage = (
		(totalIncomeTransactions / totalTransaction) *
		100
	).toFixed(0);
	const totalExpensePercentage = (
		(totalExpenseTransactions / totalTransaction) *
		100
	).toFixed(0);
	const totalTurnover = allTransactions.reduce(
		(acc, transaction) => acc + transaction.amount,
		0,
	);
	const totalIncomeTurnover = allTransactions
		.filter((transaction) => transaction.type === 'income')
		.reduce((acc, transaction) => acc + transaction.amount, 0);

	const totalExpenseTurnover = allTransactions
		.filter((transaction) => transaction.type === 'expense')
		.reduce((acc, transaction) => acc + transaction.amount, 0);
	const moneyRemain = totalIncomeTurnover - totalExpenseTurnover;

	const totalIncomeTurnoverPercent =
		(totalIncomeTurnover / totalTurnover) * 100;
	const totalExpenseTurnoverPercent =
		(totalExpenseTurnover / totalTurnover) * 100;
	return (
		<>
			<div className="row m-3">
				<div className="col-md-4">
					<div className="card">
						<div className="card-header">
							Total Transactions : {totalTransaction}
						</div>
						<div className="card-body">
							<h5 className="card-title">
								Total Collection : {totalIncomeTransactions}
							</h5>
							<h5 className="card-text">
								Total Expense : {totalExpenseTransactions}
							</h5>
							<div>
								<Progress
									type="circle"
									strokeColor={'green'}
									className="mx-2"
									percent={totalIncomePercentage}
								/>
								<Progress
									type="circle"
									strokeColor={'red'}
									className="mx-2"
									percent={totalExpensePercentage}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card">
						<div className="card-header d-flex justify-content-between">
							{/* <div>Total Turnover : {totalTurnover}</div> */}
							<div className="text-danger">Money Remaining : {moneyRemain}</div>
						</div>
						<div className="card-body">
							<h5 className="text-success">
								Collection : {totalIncomeTurnover}
							</h5>
							<h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
							<div>
								<Progress
									type="circle"
									strokeColor={'green'}
									className="mx-2"
									percent={totalIncomeTurnoverPercent.toFixed(0)}
								/>
								<Progress
									type="circle"
									strokeColor={'red'}
									className="mx-2"
									percent={totalExpenseTurnoverPercent.toFixed(0)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-md-4">
						<h4>Categorywise Collection</h4>
						{categories.map((category) => {
							const amount = allTransactions
								.filter(
									(transaction) =>
										transaction.type === 'income' &&
										transaction.category === category,
								)
								.reduce((acc, transaction) => acc + transaction.amount, 0);
							return (
								amount > 0 && (
									<div className="card">
										<div className="card-body">
											<h5>{category}</h5>
											<Progress
												percent={((amount / totalIncomeTurnover) * 100).toFixed(
													0,
												)}
											/>
										</div>
									</div>
								)
							);
						})}
					</div>
					<div className="col-md-4">
						<h4>Categorywise Expense</h4>
						{categories.map((category) => {
							const amount = allTransactions
								.filter(
									(transaction) =>
										transaction.type === 'expense' &&
										transaction.category === category,
								)
								.reduce((acc, transaction) => acc + transaction.amount, 0);
							return (
								amount > 0 && (
									<div className="card">
										<div className="card-body">
											<h5>{category}</h5>
											<Progress
												percent={(
													(amount / totalExpenseTurnover) *
													100
												).toFixed(0)}
											/>
										</div>
									</div>
								)
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Analytics;
