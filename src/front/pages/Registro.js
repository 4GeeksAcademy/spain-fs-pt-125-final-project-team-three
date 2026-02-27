import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
            const response = await fetch("https://vigilant-pancake-97xx5547rv4xc7jrp-3001.app.github.dev/", {
                method: "POST",
                body: JSON.stringify({ 
                email: email, 
                password: password 
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const res = await response.json();
            console.log("Usuario registrado con éxito:", res);
            alert("¡Registro completado! Ahora puedes iniciar sesión.");
        } else {
            console.error("Error en el registro");
            alert("Hubo un error al registrar el usuario.");
        }
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="text-center mt-5">
                <h2>Crea tu cuenta</h2>
                <div className="container-fluid w-25">
                    <div className="mb-3">
                        <label htmlFor="FormControlInput1" className="form-label">Dirección email</label>
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
                            placeholder="Crea una contraseña" 
                        />
                    </div>
                </div>
                <button className="btn btn-success" onClick={register}>Registrarse</button>
            </div>
        </div>
    );
};

export default Register;
