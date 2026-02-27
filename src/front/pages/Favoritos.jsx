import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Favoritos = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Locales que ya visité 📍</h2>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/perfil")}>
                    Volver al Perfil
                </button>
            </div>

            <div className="container mt-5">
                <h1 className="mb-4 text-center">Mis Favoritos ⭐</h1>
                {store.misFavoritos.length === 0 ? (
                    <div className="text-center alert alert-light">
                        <p>Creo que deberias salir a comer.</p>
                        <button className="btn btn-danger" onClick={() => navigate("/restaurantes")}>Explorar locales</button>
                    </div>
                ) : (
                    <div className="row">
                        {store.misFavoritos.map((res, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card shadow-sm border-warning">
                                    <div className="card-body">
                                        <h5 className="card-title">{res.nombre}</h5>
                                        <p className="card-text text-muted small">{res.tipo}</p>
                                        <button
                                            className="btn btn-outline-danger btn-sm w-100"
                                            onClick={() => dispatch({ type: 'borrar_favorito', payload: res.nombre })}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};