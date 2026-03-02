import React, { useState, useContext } from "react";

export const Login = () => {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const login = async () => {
			const response = await fetch("https://vigilant-pancake-97xx5547rv4xc7jrp-3001.app.github.dev/api/login", {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer r"
				}
			})
			const res= await response.json();
			console.log(res.token);
		}
	return (
        
        <div className="home-container">
            	<div className="text-center mt-5">
			<div className="container-fluid w-25">

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