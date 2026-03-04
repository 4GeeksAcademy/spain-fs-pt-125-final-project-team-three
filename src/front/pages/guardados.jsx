import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Guardados = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const toggleFavorito = async (res, esFav) => {
        if (!token) return;

        if (esFav) {
            const favToDelete = store.misFavoritos.find(f => f.nombre === res.nombre);
            if (!favToDelete) return;

            try {
                const response = await fetch(`https://scaling-dollop-974v94jqq446fxxw4-3001.app.github.dev/api/favorito/${favToDelete.id}`, {
                    method: "DELETE",
                    headers: { "Authorization": "Bearer " + token }
                });
                if (response.ok) {
                    dispatch({ type: "borrar_favorito", payload: res.nombre });
                }
            } catch (error) {
                console.error("Error al quitar favorito:", error);
            }
        } else {
            try {
                const response = await fetch("https://scaling-dollop-974v94jqq446fxxw4-3001.app.github.dev/api/favorito", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({
                        nombre: res.nombre,
                        tipo: res.tipo || "Restaurante"
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: "agregar_favorito", payload: data });
                }
            } catch (error) {
                console.error("Error al agregar favorito:", error);
            }
        }
    };

    const pasarAVisitado = async (res) => {
        if (!token) return;

        try {
            const responsePost = await fetch("https://scaling-dollop-974v94jqq446fxxw4-3001.app.github.dev/api/visitado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    nombre: res.nombre,
                    tipo: res.tipo || "Restaurante"
                })
            });

            if (responsePost.ok) {
                const nuevoVisitado = await responsePost.json();

                await fetch(`https://scaling-dollop-974v94jqq446fxxw4-3001.app.github.dev/api/guardado/${res.id}`, {
                    method: "DELETE",
                    headers: { "Authorization": "Bearer " + token }
                });

                dispatch({ type: "agregar_visitado", payload: nuevoVisitado });
                dispatch({ type: "borrar_guardado", payload: res.nombre });
            }
        } catch (error) {
            console.error("Error al mover el restaurante:", error);
        }
    };

    const eliminarDeGuardados = async (res) => {
        if (!token) return;
        try {
            const response = await fetch(`https://scaling-dollop-974v94jqq446fxxw4-3001.app.github.dev/api/guardado/${res.id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });

            if (response.ok) {
                dispatch({ type: "borrar_guardado", payload: res.nombre });
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-4">
                <h1>Locales Guardados 🔖</h1>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/perfil")}>Volver al Perfil</button>
            </div>
            
            {store.guardados.length === 0 ? (
                <div className="text-center p-5 bg-light rounded shadow-sm">
                    <p className="lead">No tienes locales pendientes.</p>
                </div>
            ) : (
                <div className="row">
                    {store.guardados.map((res, index) => {
                        const esFav = store.misFavoritos.some(f => f.nombre === res.nombre);
                        return (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card p-3 shadow-sm border-0 h-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="fw-bold mb-0">{res.nombre}</h5>
                                        <button 
                                            className="btn btn-sm p-0 fs-4" 
                                            onClick={() => toggleFavorito(res, esFav)}
                                        >
                                            {esFav ? "⭐" : "☆"}
                                        </button>
                                    </div>
                                    <p className="text-muted small mt-1 mb-0">{res.tipo}</p>
                                    <div className="mt-auto pt-3">
                                        <button 
                                            className="btn btn-success btn-sm w-100 mb-2" 
                                            onClick={() => pasarAVisitado(res)}
                                        >
                                            ✅ Marcar Visitado
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger btn-sm w-100" 
                                            onClick={() => eliminarDeGuardados(res)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};