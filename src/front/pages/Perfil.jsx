import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    
                    <div className="card shadow-sm border-0 mb-4 text-center">
                        <div className="card-body p-5">
                            <div className="rounded-circle bg-light d-inline-block p-4 mb-3 shadow-sm">
                                <span style={{ fontSize: "50px" }}>👤</span>
                            </div>
                            <h2 className="fw-bold">Mi Panel de Actividad</h2>
                            <p className="text-muted">Gestiona tus locales guardados y preferencias</p>
                        </div>
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            <div className="card h-100 shadow-sm border-0 text-center p-4" 
                                 onClick={() => navigate("/favoritos")} 
                                 style={{ cursor: "pointer", transition: "0.3s" }}>
                                <h1 className="display-4 fw-bold text-warning">{store.misFavoritos.length}</h1>
                                <h5 className="text-uppercase fw-bold small text-muted">Favoritos</h5>
                                <button className="btn btn-sm btn-outline-warning mt-2">Ver todos</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card h-100 shadow-sm border-0 text-center p-4" 
                                 onClick={() => navigate("/visitados")} 
                                 style={{ cursor: "pointer", transition: "0.3s" }}>
                                <h1 className="display-4 fw-bold text-success">{store.yaVisitados.length}</h1>
                                <h5 className="text-uppercase fw-bold small text-muted">Visitados</h5>
                                <button className="btn btn-sm btn-outline-success mt-2">Ver historial</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};