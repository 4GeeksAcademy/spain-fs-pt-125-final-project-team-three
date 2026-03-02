import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Descartados = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Descartados 🚫</h1>
                <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => navigate("/perfil")}
                >
                    Volver al Perfil
                </button>
            </div>

            <div className="row">
                {store.descartados.map((res, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card h-100 border-danger">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <span className="fw-bold">{res.nombre}</span>
                                <button 
                                    className="btn btn-sm btn-link text-danger text-decoration-none" 
                                    onClick={() => dispatch({ type: 'borrar_descartado', payload: res.nombre })}
                                >
                                    Quitar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};