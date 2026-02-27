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
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getRestaurants();
    }, [radius]);

    async function getRestaurants() {

        if (isFetching) return;

        setIsFetching(true);
        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const query = `[out:json][timeout:25];
                node["amenity"="restaurant"](around:${radius},${lat},${lon});
                out;
                `;
                try {
                    const response = await fetch("https://overpass-api.de/api/interpreter", {
                        method: "POST",
                        body: query
                    });
                    if (response.status === 429) {
                        throw new Error("Demasiadas solicitudes.");

                    }
                    if (!response.ok){
                        throw new error("Error del servidor.");
                    }
                    const data = await response.json();
                    const valid = data.elements.filter((r) => r.tags?.name && r.tags.name.trim() !== "");
                    setRestaurants(valid);
                    if (valid.length > 0) {
                        pickRandom(valid, [], []);
                    } else {
                        setRandomRestaurant(null);
                    }
                } catch (err) {
                    setError("Error cargando restaurantes.");
                } finally {
                    setLoading(false);
                    setIsFetching(false);
                }
            },
            () => {
                setError("No se pudo obtener tu ubicación.");
                setLoading(false);
                setIsFetching(false);
            }
        );
    }

    function pickRandom(list, currentVisited = visitedIds, currentBlocked = blockedIds) {
        const available = list.filter((r) => !currentBlocked.includes(r.id) && !currentVisited.includes(r.id));
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
        pickRandom(restaurants, visitedIds, updated);
    }

    function handleVisited() {
        if (!randomRestaurant) return;
        dispatch({
            type: "agregar_visitado",
            payload: {
                nombre: randomRestaurant.tags.name,
                tipo: randomRestaurant.tags.cuisine || "Restaurante",
                id: randomRestaurant.id
            }
        });
        const updated = [...visitedIds, randomRestaurant.id];
        setVisitedIds(updated);
        pickRandom(restaurants, updated, blockedIds);
    }

    if (loading) return <div className="container mt-5 text-center"><h2>Buscando el mejor sitio...</h2></div>;
    if (error || !randomRestaurant) return (
        <div className="container mt-5 text-center">
            <h2>{error || "No hay más restaurantes disponibles ;("}</h2>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    );

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
            <div className="card shadow-lg border-0" style={{ maxWidth: "850px", width: "100%" }}>
                <div className="card-body p-4 text-center">
                    <h1 className="display-4 fw-bold mb-4">{randomRestaurant.tags.name}</h1>
                    <div className="rounded shadow-sm mb-4 overflow-hidden" style={{ height: "450px", width: "100%" }}>
                        <MyMap key={randomRestaurant.id} lat={randomRestaurant.lat} lon={randomRestaurant.lon} />
                    </div>
                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                        <button className="btn btn-danger btn-lg px-4" onClick={handleBlock}>NO VOLVER A RECOMENDAR</button>
                        <button className="btn btn-outline-secondary btn-lg px-4 bg-white" onClick={() => pickRandom(restaurants)}>MUESTRÁME OTRO</button>
                        <button className="btn btn-success btn-lg px-5 fw-bold" onClick={handleVisited}>GUARDAR</button>
                    </div>
                    <div className="mx-auto" style={{ maxWidth: "320px" }}>
                        <label className="form-label fw-bold text-muted small">Cambiar distancia:</label>
                        <select
                            value={radius}
                            onChange={(e) => dispatch({ type: "set_radius", payload: Number(e.target.value) })}
                            className="form-select form-select-lg text-center"
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