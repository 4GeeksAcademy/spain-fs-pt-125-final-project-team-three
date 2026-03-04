import React, { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login correcto");
                window.location.reload(); 
            } else {
                alert("Login incorrecto: " + (data.msg || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor. Revisa si el backend está corriendo.");
        }
    };

    return (
        <div className="home-container">
            <div className="text-center mt-5">
                <div className="container-fluid">
                    <h2>Inicia sesión</h2>
                    <div className="mb-3">
                        <label htmlFor="FormControlInput1" className="form-label">Email address</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className="form-control" 
                            id="FormControlInput1" 
                            placeholder="name@example.com" 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="password" 
                        />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Login;