import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
const Header = () => {
	const [loginUser, setLoginUser] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		console.log(user);
		if (user) {
			setLoginUser(user);
		}
	}, []);
	const logoutHandler = () => {
		localStorage.removeItem('user');
		navigate('/login');
		message.success('Log Out Successful');
	};
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo01"
						aria-controls="navbarTogglerDemo01"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
						<Link className="navbar-brand" to="/">
							Gitanjali & Subhanjali Young Association Swarasati Puja 2025
						</Link>
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								{' '}
								<p className="nav-link">
									Hi, {loginUser && loginUser.data.name}
								</p>{' '}
							</li>
							<li className="nav-item">
								<Button type="primary" onClick={logoutHandler}>
									Logout
								</Button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
