import { useEffect, useState } from "react";

const RestaurantsNearby = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [radius, setRadius] = useState(5000);
    const [randomRestaurant, setRandomRestaurant] = useState(null);
    const [blockedIds, setBlockedIds] = useState([]);
    const [visitedIds, setVisitedIds] = useState([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetchRestaurants(lat, lon);
        });
    }, [radius]);

    async function fetchRestaurants(lat, lon, retryCount = 0) {
        const endpoints = [
            "https://overpass-api.de/api/interpreter",
            "https://overpass.kumi.systems/api/interpreter"
        ];

        const query = `
        [out:json][timeout:25];
        node["amenity"="restaurant"](around:${radius},${lat},${lon});
        out 50;
    `;

        try {
            setLoading(true);

            const response = await fetch(endpoints[retryCount], {
                method: "POST",
                body: query
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            setRestaurants(data.elements);
            pickRandomRestaurant(data.elements);

        } catch (error) {
            console.log("Error Overpass:", error);

            if (retryCount < endpoints.length - 1) {
                console.log("Intentando servidor alternativo...");
                fetchRestaurants(lat, lon, retryCount + 1);
            } else {
                alert("Servidor ocupado. Intenta en unos segundos.");
            }

        } finally {
            setLoading(false);
        }
    }



    function pickRandomRestaurant(list) {

        const validRestaurants = list.filter(
            (r) =>
                r.tags?.name &&
                r.tags.name.trim() !== "" &&
                !blockedIds.includes(r.id) &&
                !visitedIds.includes(r.id)
        );

        if (validRestaurants.length === 0) {
            alert("Ya no quedan restaurantes disponibles");
            return;
        }

        const randomIndex = Math.floor(Math.random() * validRestaurants.length);
        setRandomRestaurant(validRestaurants[randomIndex]);
    }

    function blockRestaurant() {
        if (!randomRestaurant) return;

        setBlockedIds((prevBlocked) => {
            const updatedBlocked = [...prevBlocked, randomRestaurant.id];

            const validRestaurants = restaurants.filter(
                (r) =>
                    r.tags?.name &&
                    r.tags.name.trim() !== "" &&
                    !updatedBlocked.includes(r.id)
            );

            if (validRestaurants.length === 0) {
                setRandomRestaurant(null);
                return updatedBlocked;
            }

            const randomIndex = Math.floor(Math.random() * validRestaurants.length);
            setRandomRestaurant(validRestaurants[randomIndex]);

            return updatedBlocked;
        });
    }

    function markAsVisited() {
        if (!randomRestaurant) return;

        setVisitedIds((prevVisited) => {
            const updatedVisited = [...prevVisited, randomRestaurant.id];

            const validRestaurants = restaurants.filter(
                (r) =>
                    r.tags?.name &&
                    r.tags.name.trim() !== "" &&
                    !blockedIds.includes(r.id) &&
                    !updatedVisited.includes(r.id)
            );

            if (validRestaurants.length === 0) {
                setRandomRestaurant(null);
                return updatedVisited;
            }

            const randomIndex = Math.floor(Math.random() * validRestaurants.length);
            setRandomRestaurant(validRestaurants[randomIndex]);

            return updatedVisited;
        });
    }


    return (
        <div>
            <h2>Restaurantes cerca de ti</h2>

            <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
            >
                <option value={1000}>1 km</option>
                <option value={3000}>3 km</option>
                <option value={5000}>5 km</option>
                <option value={10000}>10 km</option>
            </select>
            {loading && <p>Buscando restaurantes cerca de ti...</p>}
            <ul>
                {restaurants
                    .filter((r) => r.tags?.name && r.tags.name.trim() !== "")
                    .map((r) => (
                        <li key={r.id}>
                            {r.tags.name}
                        </li>
                    ))}
            </ul>
            {randomRestaurant && (
                <div>
                    <h3>Restaurante recomendado:</h3>
                    <p>{randomRestaurant.tags.name}</p>
                </div>
            )}
            <button onClick={() => pickRandomRestaurant(restaurants)}>
                Elegir otro
            </button>
            <button onClick={blockRestaurant}>
                No volver a recomendar
            </button>
            <button onClick={markAsVisited}>
                Visitado
            </button>

        </div>
    );
};

export default RestaurantsNearby;
