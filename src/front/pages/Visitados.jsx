import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Visitados = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("https://scaling-dollop-974v94jqq446fxxw4-3001.app.github.dev/api/visitados", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "set_visitados", payload: data });
            });
    }, []);

    const handleFavorito = (item) => {
        dispatch({
            type: "agregar_favorito",
            payload: item
        });
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Locales que ya visité 📍</h2>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/perfil")}>
                    Volver al Perfil
                </button>
            </div>

            {store.yaVisitados.length === 0 ? (
                <div className="text-center p-5 bg-light rounded">
                    <p className="lead">Aún no has marcado ningún restaurante como visitado.</p>
                    <button className="btn btn-primary" onClick={() => navigate("/restaurantes")}>
                        ¡Empezar a explorar!
                    </button>
                </div>
            ) : (
                <div className="row">
                    {store.yaVisitados.map((item, index) => {
                        const esFavorito = store.misFavoritos.some(fav => fav.nombre === item.nombre);
                        return (
                            <div className="col-md-6 col-lg-4 mb-3" key={index}>
                                <div className="card h-100 border-success shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 className="card-title">{item.nombre}</h5>
                                            <span className="badge bg-success">Visitado ✅</span>
                                        </div>
                                        <p className="card-text text-muted">{item.tipo}</p>

                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <button
                                                className={`btn btn-sm ${esFavorito ? "btn-warning" : "btn-outline-warning"}`}
                                                onClick={() => handleFavorito(item)}
                                                disabled={esFavorito}
                                            >
                                                {esFavorito ? "⭐ En favoritos" : "⭐ Guardar"}
                                            </button>

                                            <button
                                                className="btn btn-sm btn-link text-danger text-decoration-none"
                                                onClick={() => dispatch({ type: "borrar_visitado", payload: item.nombre })}
                                            >
                                                Eliminar historial
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};