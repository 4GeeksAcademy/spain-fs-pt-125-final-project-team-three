import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; 

export const Restaurantes = () => {
    const navigate = useNavigate();


    const listaRestaurantes = [
        { nombre: "Tacos El Pastor", precio: "$$", tipo: "Mexicano", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500" },
        { nombre: "Veggie Heaven", precio: "$", tipo: "Vegano", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
        { nombre: "Pizzería Bella", precio: "$$$", tipo: "Italiano", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" }
    ];

    const [indice, setIndice] = useState(0);

    const handleNext = () => {
        if (indice < listaRestaurantes.length - 1) {
            setIndice(indice + 1);
        } else {
            alert("No hay más restaurantes cerca");
            navigate("/");
        }
    };

    const restauranteActual = listaRestaurantes[indice];

    return (
        <div className="home-container">
            <div className="restaurante-card shadow">
                <div className="restaurante-header mb-3">
                    <h2 className="fw-bold">{restauranteActual.nombre}</h2>
                </div>

                <div className="row">
                    <div className="col-md-7">
                        <div className="img-box">
                            <img src={restauranteActual.img} className="img-fluid rounded" alt="restaurante" />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="info-box mb-3">
                            <small className="text-muted">Rango de precios</small>
                            <p className="fw-bold fs-4">{restauranteActual.precio}</p>
                        </div>
                        <div className="action-buttons">
                            <button className="btn-rechazar" onClick={handleNext}>❌</button>
                            <button className="btn-aceptar" onClick={handleNext}>✅</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Restaurantes;    