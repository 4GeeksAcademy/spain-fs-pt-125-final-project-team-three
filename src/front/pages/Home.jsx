import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import "../index.css"; 

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [filtros, setFiltros] = useState({
        halal: false,
        vegano: false,
        celiaco: false
    });

    const handleSearch = () => {
        dispatch({
            type: "set_filters",
            payload: filtros
        });
        navigate("/restaurantes");
    };

    return (
        <div className="home-container">
            <h1 className="hambrientos-title">HAMBRIENTOS</h1>

            <div className="search-card shadow">
                <h2 className="search-title">¿Qué te apetece hoy?</h2>
                
                <div className="options-container">
                    <label className="option-label">
                        <input 
                            type="checkbox" 
                            checked={filtros.halal}
                            onChange={() => setFiltros({...filtros, halal: !filtros.halal})} 
                        />
                        <span>Halal</span>
                    </label>
                    <label className="option-label">
                        <input 
                            type="checkbox" 
                            checked={filtros.vegano}
                            onChange={() => setFiltros({...filtros, vegano: !filtros.vegano})} 
                        />
                        <span>Vegano</span>
                    </label>
                    <label className="option-label">
                        <input 
                            type="checkbox" 
                            checked={filtros.celiaco}
                            onChange={() => setFiltros({...filtros, celiaco: !filtros.celiaco})} 
                        />
                        <span>Celíacos</span>
                    </label>
                </div>

                <div className="location-section">
                    <div className="fake-input">
                        Ubicación actual... <span>5 Km</span>
                    </div>
                    <small>📍 Ubicación detectada por GPS</small>
                </div>

                <button className="search-button" onClick={handleSearch}>
                    EMPEZAR A BUSCAR
                </button>
            </div>
        </div>
    );
};