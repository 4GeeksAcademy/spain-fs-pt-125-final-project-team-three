import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import MyMap from "../components/MyMap.jsx";

export const Restaurantes = () => {
    const { store, dispatch } = useGlobalReducer();
    const radius = store.radius || 5000;
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);
    const [randomRestaurant, setRandomRestaurant] = useState(null);
    const [blockedIds, setBlockedIds] = useState([]);
    const [visitedIds, setVisitedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setBlockedIds([]);
        setVisitedIds([]);
        getRestaurants();
        const timeout = setTimeout(() => {
            getRestaurants();
        }, 2000);

        return () => clearTimeout(timeout);
    }, [radius]);

    async function getRestaurants() {
        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const query = `
                [out:json][timeout:25];
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

                    if (response.status === 429) {
                        throw new Error("Demasiadas solicitudes. Espera unos segundos.");
                    }

                    if (!response.ok) {
                        throw new Error("Error del servidor (timeout o sobrecarga).");
                    }

                    const data = await response.json();

                    if (!data.elements) {
                        throw new Error("Respuesta inválida del servidor.");
                    }

                    const valid = data.elements.filter(
                        (r) => r.tags?.name && r.tags.name.trim() !== ""
                    );

                    setRestaurants(valid);

                    if (valid.length > 0) {
                        pickRandom(valid);
                    } else {
                        setRandomRestaurant(null);
                    }

                } catch (err) {
                    console.error(err);
                    setError(err.message || "Error cargando restaurantes.");
                    setRandomRestaurant(null);
                } finally {
                    setLoading(false);
                }
            },
            (geoError) => {
                console.error(geoError);
                setError("No se pudo obtener tu ubicación.");
                setLoading(false);
            }
        );
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

    if (error)
        return (
            <div>
                <h2>{error}</h2>
                <button onClick={getRestaurants}>
                    Reintentar
                </button>
                <button onClick={() => navigate("/")}>
                    Volver al inicio
                </button>
            </div>
        );

    if (!randomRestaurant)
        return (
            <div>
                <h2>No hay más restaurantes disponibles ;(</h2>
                <button onClick={() => navigate("/")}>
                    Volver al inicio
                </button>
            </div>
        );

    return (
        <div className="home-container">
            <div className="restaurante-card shadow">

                <h2>{randomRestaurant.tags.name}</h2>

                <MyMap
                    key={randomRestaurant.id}
                    lat={randomRestaurant.lat}
                    lon={randomRestaurant.lon}
                />

                <div className="action-buttons">
                    <button
                        className="btn btn-danger"
                        onClick={handleBlock}
                    >
                        NO VOLVER A RECOMENDAR
                    </button>

                    <button
                        className="btn btn-light"
                        onClick={() => pickRandom(restaurants)}
                    >
                        OTRO
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={handleVisited}
                    >
                        IDO
                    </button>
                </div>

                <div className="radius-section mt-3">
                    <h6>Distancia:</h6>
                    <select
                        value={radius}
                        onChange={(e) =>
                            dispatch({
                                type: "set_radius",
                                payload: Number(e.target.value)
                            })
                        }
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
    );
};

export default Restaurantes;