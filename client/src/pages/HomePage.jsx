import React, { useState, useEffect, useReducer } from 'react';
import Layout from '../components/layout/Layout';
import {
	Modal,
	message,
	Form,
	Button,
	Select,
	Input,
	Table,
	DatePicker,
} from 'antd';
import {
	UnorderedListOutlined,
	AreaChartOutlined,
	EditOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import Spinner from './Spinner';
import axios from 'axios';
import moment from 'moment';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [allTransactions, setAllTransactions] = useState([]);
	const [frequency, setFrequency] = useState('365');
	const [selectedDate, setSelectedDate] = useState([]);
	const [type, setType] = useState('all');
	const [viewData, setViewData] = useState('table');
	const [editData, setEditData] = useState(null);
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
	const [form] = Form.useForm();
	const totalIncomeTurnover = allTransactions
		.filter((transaction) => transaction.type === 'income')
		.reduce((acc, transaction) => acc + transaction.amount, 0);
	const totalExpenseTurnover = allTransactions
		.filter((transaction) => transaction.type === 'expense')
		.reduce((acc, transaction) => acc + transaction.amount, 0);
	const moneyRemain = totalIncomeTurnover - totalExpenseTurnover;
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	  });
	  
	  const handleTableChange = (pagination) => {
		setPagination(pagination);
	  };
	//table data
	const columns = [
		{
			title: 'S.No',
			dataIndex: 'key',
			key: 'key',
			render: (text, record, index) =>
				(pagination.current - 1) * pagination.pageSize + index + 1,
		  },
		{
			title: 'Date',
			dataIndex: 'date',
			render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
		},
		{
			title: 'Type',
			dataIndex: 'type',
		},
		{
			title: 'Category',
			dataIndex: 'category',
		},
		{
			title: 'Reference',
			dataIndex: 'reference',
		},
		{
			title: 'Actions',
			render: (text, record) => (
				<div>
					<EditOutlined
						style={{ color: 'green', fontSize: '25px', marginRight: '10px' }}
						onClick={() => {
							setEditData(text, record), setShowModal(true);
						}}
					/>
					<DeleteOutlined
						style={{ color: 'red', fontSize: '25px' }}
						onClick={() => handleDelete(text, record)}
					/>
				</div>
			),
		},
	];
	//get all transactions

	useEffect(() => {
		const getAllTransactions = async () => {
			try {
				const user = JSON.parse(localStorage.getItem('user'));
				setLoading(true);
				const { data } = await axios({
					method: 'post',
					baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
					url: '/transactions/get-transactions',
					data: {
						userid: user.data._id,
						frequency,
						selectedDate,
						type,
					},
				});
				setLoading(false);
				setAllTransactions(data);
				console.log(data);
			} catch (error) {
				console.log(error);
				setLoading(false);
				message.error('Transaction Fetch Failed');
			}
		};
		getAllTransactions();
	}, [frequency, selectedDate, type, ignored]);
	const handleDelete = async (text, record) => {
		try {
			setLoading(true);
			await axios({
				method: 'post',
				baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
				url: '/transactions/delete-transaction',
				data: {
					transactionId: record._id,
				},
			});
			setLoading(false);
			message.success('Transaction Deleted Successfully');
			forceUpdate();
		} catch (error) {
			setLoading(false);
			console.log(error);
			message.error('Transaction Deletion Failed');
		}
	};
	const handleSubmit = async (values) => {
		try {
			const user = JSON.parse(localStorage.getItem('user'));
			console.log(user.data._id);
			setLoading(true);
			if (editData) {
				await axios({
					method: 'post',
					baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
					url: '/transactions/edit-transaction',
					data: {
						payload: {
							...values,
							userid: user.data._id,
						},
						transactionId: editData._id,
					},
				});
				setLoading(false);
				message.success('Transaction Updated Successfully');
				console.log('hello if');
			} else {
				await axios({
					method: 'post',
					baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
					url: '/transactions/add-transaction',
					data: {
						...values,
						userid: user.data._id,
					},
				});
				setLoading(false);
				message.success('Transaction Added Successfully');
			}
			setShowModal(false);
			setEditData(null);
			setTimeout(() => {
				form.resetFields();
			}, 3000);
			forceUpdate();
		} catch (error) {
			setLoading(false);
			message.error('Transaction Add Failed');
			console.log(error);
			console.log('hello');
		}
	};
	
	return (
		<Layout>
			{loading && <Spinner />}
			<div className="filtersBlock">
				<div className="filters">
					<div>
						<h6>Select Frequency</h6>
						<Select
							value={frequency}
							onChange={(values) => setFrequency(values)}
						>
							{/* <Select.Option value="All">All</Select.Option> */}
							<Select.Option value="7">Last 1 Week</Select.Option>
							<Select.Option value="30">Last 1 Month</Select.Option>
							<Select.Option value="365">Last 1 Year</Select.Option>
							<Select.Option value="custom">Custom</Select.Option>
						</Select>
						{frequency === 'custom' && (
							<RangePicker
								value={selectedDate}
								onChange={(values) => setSelectedDate(values)}
							/>
						)}
					</div>
					<div>
						<h6>Select Type</h6>
						<Select value={type} onChange={(values) => setType(values)}>
							{/* <Select.Option value="All">All</Select.Option> */}
							<Select.Option value="all">All</Select.Option>
							<Select.Option value="income">Income</Select.Option>
							<Select.Option value="expense">Expense</Select.Option>
						</Select>
					</div>
					<div className="switch-icons">
						<UnorderedListOutlined
							className={`mx-2 ${
								viewData === 'table' ? 'active-icon' : 'inactive-icon'
							}`}
							onClick={() => setViewData('table')}
						/>
						<AreaChartOutlined
							className={`mx-2 ${
								viewData === 'analytics' ? 'active-icon' : 'inactive-icon'
							}`}
							onClick={() => setViewData('analytics')}
						/>
					</div>
					<div>
						<button
							className="btn btn-primary"
							onClick={() => setShowModal(true)}
						>
							Add New
						</button>
					</div>
				</div>
				<div className="underline"></div>
			</div>
			<div className="content">
				{viewData === 'table' ? (
					<div>
						<div className="d-flex justify-content-around">
							<h5 className="text-success">
								Money Collected : {totalIncomeTurnover}
							</h5>
							<h5 className="text-danger">
								Money Spent : {totalExpenseTurnover}
							</h5>
							<h5 className="text-warning">Money Remaining: {moneyRemain}</h5>
						</div>
						<Table
      dataSource={allTransactions}
      columns={columns}
      pagination={pagination}
      onChange={handleTableChange} // Updates pagination state
    />
					</div>
				) : (
					<Analytics allTransactions={allTransactions} />
				)}
			</div>
			<Modal
				title={editData ? 'Edit Transaction' : 'Add Transaction'}
				open={showModal}
				onCancel={() => setShowModal(false)}
				footer={false}
			>
				<Form
					layout="vertical"
					onFinish={handleSubmit}
					form={form}
					initialValues={editData}
				>
					<Form.Item label="Amount" name="amount">
						<Input type="number" />
					</Form.Item>
					<Form.Item label="Type" name="type">
						<Select>
							<Select.Option value="income">Income</Select.Option>
							<Select.Option value="expense">Expense</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="Category" name="category">
						<Select>
							<Select.Option value="Doshokorma Bazar">
								Doshokorma Bazar
							</Select.Option>
							<Select.Option value="Chanda">Chanda</Select.Option>
							<Select.Option value="Thakur">Thakur</Select.Option>
							<Select.Option value="Cleaning">Cleaning</Select.Option>
							<Select.Option value="Boksish">Boksish</Select.Option>
							<Select.Option value="Decorator">Decorator</Select.Option>
							<Select.Option value="Mudi Bazar">Mudi Bazar</Select.Option>
							<Select.Option value="Ful Fol">Ful Fol</Select.Option>
							<Select.Option value="Cooking">Cooking</Select.Option>
							<Select.Option value="Purohit">Purohit</Select.Option>
							<Select.Option value="Toto Vara">Toto Vara</Select.Option>
							<Select.Option value="Mishti">Mishti</Select.Option>
							<Select.Option value="Puja Babod">Puja Babod</Select.Option>
							<Select.Option value="Khawa Babod">Khawa Babod</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="Date" name="date">
						<Input type="date" />
					</Form.Item>
					<Form.Item label="References" name="reference">
						<Input type="text" />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input type="text" />
					</Form.Item>
					<div className="d-flex justify-content-end">
						<Button htmlType="submit" type="primary">
							Save
						</Button>
					</div>
				</Form>
			</Modal>
		</Layout>
	);
};

export default HomePage;
