import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ setToken }) {
	const [username, setUserName] = useState();
	const [password, setPassword] = useState();
	const [message, setMessage] = useState('');
	const [notValid, setNotValid] = useState(false);


	async function loginUser(credentials) {
		return fetch('http://localhost:5000/Login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
			.then(data => data.json()
			)
	}
	const handleSubmit = async e => {
		e.preventDefault();
		const token = await loginUser({
			username,
			password
		});
		setMessage(token.message)
		setNotValid(true)
		if (token) {
			setToken(token[0]);
		}
	}
	return (
		<div className={styles.loginwrapper}>
			<h1>Please Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<p>Username</p>
					<input type="text" onChange={e => setUserName(e.target.value)} />
				</label>
				<label>
					<p>Password</p>
					<input type="password" onChange={e => setPassword(e.target.value)} />
				</label>
				<div>
					<button type="submit">Submit</button>
				</div>
				{notValid && <p className={styles.Message}>{message}</p>}
			</form>
		</div>
	)
}
