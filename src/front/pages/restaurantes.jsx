import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Restaurantes = () => {
    const { store, dispatch } = useGlobalReducer();
    const [indice, setIndice] = useState(0);

    const restauranteActual = store.restaurantes && store.restaurantes[indice];

    const siguiente = () => {
        if (indice < store.restaurantes.length - 1) {
            setIndice(indice + 1);
        } else {
            setIndice(0);
        }
    };

    return (
        <div className="container py-5 text-center">
            {restauranteActual ? (
                <div className="card shadow-lg mx-auto" style={{ maxWidth: "500px" }}>
                    <img src={restauranteActual.foto} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h2 className="fw-bold">{restauranteActual.nombre}</h2>
                        <div className="d-flex justify-content-between mt-4">
                            <button className="btn btn-danger" onClick={() => { dispatch({ type: "agregar_descartado", payload: restauranteActual }); siguiente(); }}>
                                NO VOLVER A RECOMENDAR
                            </button>
                            <button className="btn btn-outline-secondary" onClick={siguiente}>
                                MUESTRÁME OTRO
                            </button>
                            <button className="btn btn-success" onClick={() => { dispatch({ type: "agregar_guardado", payload: restauranteActual }); siguiente(); }}>
                                GUARDAR
                            </button>
                        </div>
                    </div>
                </div>
            ) : <h2>No hay más restaurantes</h2>}
        </div>
    );
};