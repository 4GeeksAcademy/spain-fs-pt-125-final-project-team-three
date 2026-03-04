import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import MyMap from "../components/MyMap.jsx";
import "../index.css";

export const Home = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [radius, setRadius] = useState(5000);

    const handleSearch = () => {
        dispatch({
            type: "set_radius",
            payload: radius
        });

        navigate("/restaurantes");
    };

    return (
        <div className="home-container">
            <h1 className="hambrientos-title">HAMBRIENTOS</h1>

            <div className="search-card shadow">
                <div className="location-section">
                    <MyMap />

                    <div className="radius-section">
                        <label>Distancia:</label>
                        <select
                            value={radius}
                            onChange={(e) => setRadius(Number(e.target.value))}
                            className="form-select"
                        >
                            <option value={1000}>1 km</option>
                            <option value={3000}>3 km</option>
                            <option value={5000}>5 km</option>
                            <option value={10000}>10 km</option>
                        </select>
                    </div>

                    <small>Ubicación detectada por GPS</small>
                </div>

                <button className="search-button" onClick={handleSearch}>
                    EMPEZAR A BUSCAR
                </button>
            </div>
        </div>
    );
};

export default Home;