import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Guardados = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-4">
                <h1>Guardados</h1>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/perfil")}>Volver al Perfil</button>
            </div>
            <div className="row">
                {store.guardados.map((res, index) => {
                    const esFav = store.misFavoritos.some(f => f.nombre === res.nombre);
                    return (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card p-3">
                                <div className="d-flex justify-content-between">
                                    <h5>{res.nombre}</h5>
                                    <button className="btn btn-link" onClick={() => dispatch({ type: "agregar_favorito", payload: res })}>
                                        {esFav ? "★" : "☆"}
                                    </button>
                                </div>
                                <button className="btn btn-success btn-sm mt-2" onClick={() => { dispatch({ type: "agregar_visitado", payload: res }); dispatch({ type: "borrar_guardado", payload: res.nombre }); }}>
                                    Visitado
                                </button>
                                <button className="btn btn-outline-danger btn-sm mt-1" onClick={() => dispatch({ type: "borrar_guardado", payload: res.nombre })}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};