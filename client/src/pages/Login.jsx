import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
const Login = () => {
	const navigate = useNavigate();
	const [Loading, setLoading] = useState(false);
	const submitHandler = async (values) => {
		try {
			setLoading(true);
			const { data } = await axios({
				method: 'post',
				baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
				url: '/users/login',
				data: values,
			});
			setLoading(false);
			message.success('User Logged In Successfully');
			localStorage.setItem(
				'user',
				JSON.stringify({ ...data, password: undefined }),
			);
			console.log(data);
			navigate('/');
		} catch (error) {
			setLoading(false);
			message.error('Invalid Credentials');
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
					<h1>Login Form</h1>
					<Form.Item label="Email" name="email" type="email">
						<Input />
					</Form.Item>
					<Form.Item label="Password" name="password" type="password">
						<Input.Password
							placeholder="input password"
							iconRender={(visible) =>
								visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
							}
						/>
					</Form.Item>
					<div className="d-flex flex-column gap-4 justify-content-between">
						<button className="btn btn-primary">Login</button>
						<Link to="/register">Not a User ? Click Here to Register</Link>
					</div>
				</Form>
			</div>
		</>
	);
};

export default Login;
