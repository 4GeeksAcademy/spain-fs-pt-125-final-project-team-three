import React, { useState, useContext } from "react";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async () => {
		const response = await fetch("https://scaling-dollop-974v94jqq446fxxw4-3001.app.github.dev/api/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer r"
			}
		});
		const data = await response.json();

		if (response.ok) {
			localStorage.setItem("token", data.token);
			alert("login correcto");
			window.location.reload();
		} else {
			alert("Login incorrecto");
		}
	};
	return (

		<div className="home-container">
			<div className="text-center mt-5">
				<div className="container-fluid">
				<h2>Inicia sesión</h2>
					<div className="mb-3">
						<label for="FormControlInput1" className="form-label">Email address</label>
						<input onChange={(e) => {
							setEmail(e.target.value)
						}} type="email" className="form-control" id="FormControlInput1" placeholder="name@example.com" />
					</div>
					<div className="mb-3">
						<label for="password" className="form-label">Password</label>
						<input onChange={(e) => {
							setPassword(e.target.value)
						}} type="password" className="form-control" id="password" placeholder="password" />
					</div>
				</div>
				<button className="btn btn-primary" onClick={login}>Login</button>
			</div>
		</div>
	);
};

export default Login;