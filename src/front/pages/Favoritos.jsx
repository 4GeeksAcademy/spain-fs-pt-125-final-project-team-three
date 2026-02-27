import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Favoritos = () => {
    const { store } = useGlobalReducer();

    return (
        <div style={{ padding: "20px" }}>
            <h1>Mis Favoritos ⭐</h1>
            {store.misFavoritos.length === 0 ? (
                <p>Deberias salir a comer mas amenudo (;.</p>
            ) : (
                store.misFavoritos.map((res, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                        <h3>{res.nombre}</h3>
                        <p>{res.tipo} - {res.precio}</p>
                    </div>
                ))
            )}
        </div>
    );
};