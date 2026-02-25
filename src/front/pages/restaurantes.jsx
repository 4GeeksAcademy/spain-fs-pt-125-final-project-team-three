import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Restaurantes = () => {
    const { store } = useGlobalReducer();
    const radius = store.radius || 5000;
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);
    const [randomRestaurant, setRandomRestaurant] = useState(null);
    const [blockedIds, setBlockedIds] = useState([]);
    const [visitedIds, setVisitedIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRestaurants();
    }, [radius]);

    async function getRestaurants() {
        setLoading(true);

        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const query = `
                [out:json];
                node["amenity"="restaurant"](around:${radius},${lat},${lon});
                out;
            `;

            try {
                const response = await fetch(
                    "https://overpass-api.de/api/interpreter",
                    {
                        method: "POST",
                        body: query
                    }
                );

                if (!response.ok) {
                    throw new Error("Error en la API");
                }

                const data = await response.json();

                const valid = data.elements.filter(
                    (r) => r.tags?.name && r.tags.name.trim() !== ""
                );

                setRestaurants(valid);
                pickRandom(valid);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        });
    }

    function pickRandom(list) {
        const available = list.filter(
            (r) =>
                !blockedIds.includes(r.id) &&
                !visitedIds.includes(r.id)
        );

        if (available.length === 0) {
            setRandomRestaurant(null);
            return;
        }

        const randomIndex = Math.floor(Math.random() * available.length);
        setRandomRestaurant(available[randomIndex]);
    }

    function handleBlock() {
        if (!randomRestaurant) return;

        const updated = [...blockedIds, randomRestaurant.id];
        setBlockedIds(updated);

        const available = restaurants.filter(
            (r) =>
                !updated.includes(r.id) &&
                !visitedIds.includes(r.id)
        );

        pickRandom(available);
    }

    function handleVisited() {
        if (!randomRestaurant) return;

        const updated = [...visitedIds, randomRestaurant.id];
        setVisitedIds(updated);

        const available = restaurants.filter(
            (r) =>
                !updated.includes(r.id) &&
                !blockedIds.includes(r.id)
        );

        pickRandom(available);
    }

    if (loading) return <h2>Cargando restaurantes...</h2>;

    if (!randomRestaurant)
        return (
            <div>
                <h2>No hay más restaurantes disponibles 😅</h2>
                <button onClick={() => navigate("/")}>
                    Volver al inicio
                </button>
            </div>
        );

    return (
        <div className="home-container">
            <div className="restaurante-card shadow">
                <div className="restaurante-header mb-3">
                    <h2 className="fw-bold">
                        {randomRestaurant.tags.name}
                    </h2>
                </div>

                <div className="info-box mb-3">
                    <small className="text-muted">Ubicación</small>
                    <p>
                        Lat: {randomRestaurant.lat}
                        <br />
                        Lon: {randomRestaurant.lon}
                    </p>
                </div>

                <div className="action-buttons">
                    <button className="btn btn-danger" onClick={handleBlock}>
                        NO VOLVER A RECOMENDAR
                    </button>

                    <button onClick={() => pickRandom(restaurants)} className="btn btn-light">
                        OTRO
                    </button>

                    <button className="btn btn-success" onClick={handleVisited}>
                        IDO
                    </button>
                </div>
                <div>
                    <div className="radius-section">
                        <h6>Distancia:</h6>
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
                </div>
            </div>
        </div>
    );
};

export default Restaurantes;