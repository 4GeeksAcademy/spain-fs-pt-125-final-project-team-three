import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Descartados = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const eliminarDeDescartados = async (res) => {
        if (!token) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/descartado/${res.id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });
            if (response.ok) {
                dispatch({ type: "borrar_descartado", payload: res.nombre });
            }
        } catch (error) { console.error(error); }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-4">
                <h1>No Recomendados 🚫</h1>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/perfil")}>Volver al Perfil</button>
            </div>

            <p className="text-muted mb-4">Estos restaurantes no volverán a aparecer en tu ruleta de búsqueda.</p>

            {store.descartados.length === 0 ? (
                <div className="text-center p-5 bg-light rounded">
                    <p className="lead text-muted">Tu lista de no recomendados está vacía.</p>
                </div>
            ) : (
                <div className="row">
                    {store.descartados.map((res, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card p-3 border-danger shadow-sm h-100">
                                <h5 className="fw-bold">{res.nombre}</h5>
                                <p className="small text-muted">{res.tipo || "Restaurante"}</p>
                                <button className="btn btn-sm btn-link text-danger text-decoration-none p-0 text-start mt-2" onClick={() => eliminarDeDescartados(res)}>
                                    Quitar de la lista y dar otra oportunidad
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};