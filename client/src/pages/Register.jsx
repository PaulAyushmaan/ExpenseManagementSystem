import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
const Register = () => {
	const navigate = useNavigate();
	const [Loading, setLoading] = useState(false);
	const submitHandler = async (values) => {
		try {
			setLoading(true);
			await axios({
				method: 'post',
				baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
				url: '/users/register',
				data: values,
			});
			setLoading(false);
			message.success('User Registered Successfully');
			navigate('/login');
		} catch (error) {
			setLoading(false);
			message.error('User Registration Failed');
			console.log(error);
		}
	};
	//Prevent for login user
	useEffect(() => {
		if (localStorage.getItem('user')) {
			navigate('/');
		}
	}, [navigate]);
	return (
		<>
			<div className="register-page">
				{Loading && <Spinner />}
				<Form layout="vertical" onFinish={submitHandler}>
					<h1>Register Form</h1>
					<Form.Item label="Name" name="name">
						<Input />
					</Form.Item>
					<Form.Item label="Email" name="email" type="email">
						<Input />
					</Form.Item>
					<Form.Item label="Password" name="password" type="password">
						<Input />
					</Form.Item>
					<div className="d-flex flex-column gap-4 justify-content-between">
						<button className="btn btn-primary">Register</button>
						<Link to="/login">Already Registered ? Click Here to Login</Link>
					</div>
				</Form>
			</div>
		</>
	);
};

export default Register;
