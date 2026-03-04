import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Favoritos = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const eliminarFavorito = async (res) => {
        if (!token) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorito/${res.id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });
            if (response.ok) {
                dispatch({ type: "borrar_favorito", payload: res.nombre });
            }
        } catch (error) { console.error(error); }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Mis Favoritos ⭐</h2>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/perfil")}>Volver al Perfil</button>
            </div>

            {store.misFavoritos.length === 0 ? (
                <div className="text-center alert alert-light p-5 shadow-sm">
                    <p className="lead">Creo que deberías salir a comer.</p>
                    <button className="btn btn-danger" onClick={() => navigate("/restaurantes")}>Explorar locales</button>
                </div>
            ) : (
                <div className="row">
                    {store.misFavoritos.map((res, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card shadow-sm border-warning h-100">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title fw-bold">{res.nombre}</h5>
                                        <p className="card-text text-muted small">{res.tipo}</p>
                                    </div>
                                    <button className="btn btn-outline-danger btn-sm w-100 mt-3" onClick={() => eliminarFavorito(res)}>
                                        Eliminar de favoritos
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};