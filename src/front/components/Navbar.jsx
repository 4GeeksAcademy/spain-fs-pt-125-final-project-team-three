import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const token = localStorage.getItem("token");

    const eliminarVisitado = async (visitado) => {
        if (!token) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/visitado/${visitado.id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });
            if (response.ok) dispatch({ type: "borrar_visitado", payload: visitado.nombre });
        } catch (error) { console.error(error); }
    };

    const eliminarGuardado = async (guardado) => {
        if (!token) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/guardado/${guardado.id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });
            if (response.ok) dispatch({ type: "borrar_guardado", payload: guardado.nombre });
        } catch (error) { console.error(error); }
    };

    const eliminarFavorito = async (favorito) => {
        if (!token) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorito/${favorito.id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });
            if (response.ok) dispatch({ type: "borrar_favorito", payload: favorito.nombre });
        } catch (error) { console.error(error); }
    };

    const toggleFavorito = async (restaurante, esFav) => {
        if (!token) return;
        if (esFav) {
            const favToDelete = store.misFavoritos.find(f => f.nombre === restaurante.nombre);
            if (favToDelete) eliminarFavorito(favToDelete);
        } else {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorito`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                    body: JSON.stringify({ nombre: restaurante.nombre, tipo: restaurante.tipo || "Restaurante" })
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: "agregar_favorito", payload: data });
                }
            } catch (error) { console.error(error); }
        }
    };

    return (
        <nav className="navbar navbar-light bg-light p-3 border-bottom shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold " to="/">HAMBRIENTOS</Link>

                <div className="d-flex align-items-center">
                    {token && (
                        <div className="dropdown me-3">
                            <button className="btn dropdown-toggle fw-bold" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Mi Actividad ({store.misFavoritos.length + store.guardados.length})
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end shadow" style={{ minWidth: "300px" }}>
                                <li><h6 className="dropdown-header fw-bold">⭐ Favoritos</h6></li>
                                {store.misFavoritos.length === 0 ? (
                                    <li><span className="dropdown-item text-muted small">Vacio</span></li>
                                ) : (
                                    store.misFavoritos.slice(0, 3).map((fav, i) => (
                                        <li key={i} className="d-flex justify-content-between align-items-center px-3 py-1">
                                            <span className="small text-truncate" style={{ maxWidth: "180px" }}>{fav.nombre}</span>
                                            <button className="btn btn-sm text-danger p-0" onClick={(e) => { e.stopPropagation(); eliminarFavorito(fav); }}>✕</button>
                                        </li>
                                    ))
                                )}

                                <li><hr className="dropdown-divider" /></li>

                                <li><h6 className="dropdown-header fw-bold">💾 Guardados</h6></li>
                                {store.guardados.length === 0 ? (
                                    <li><span className="dropdown-item text-muted small">No tienes restaurantes guardados</span></li>
                                ) : (
                                    store.guardados.slice(0, 3).map((guardado, i) => {
                                        const esFav = store.misFavoritos.some(f => f.nombre === guardado.nombre);
                                        return (
                                            <li key={i} className="d-flex justify-content-between align-items-center px-3 py-1">
                                                <span className="small text-truncate" style={{ maxWidth: "150px" }}>{guardado.nombre}</span>
                                                <div className="d-flex gap-2">
                                                    <button className={`btn btn-sm p-0 ${esFav ? "text-warning" : "text-secondary"}`} onClick={(e) => { e.stopPropagation(); toggleFavorito(guardado, esFav); }}>
                                                        {esFav ? "★" : "☆"}
                                                    </button>
                                                    <button className="btn btn-sm text-danger p-0" onClick={(e) => { e.stopPropagation(); eliminarGuardado(guardado); }}>✕</button>
                                                </div>
                                            </li>
                                        );
                                    })
                                )}

                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item text-center text-primary small fw-bold" to="/perfil">MI PERFIL</Link></li>
                            </ul>
                        </div>
                    )}

                    {!token && (
                        <div>
                            <Link to="/Login"><button className="btn btn-success me-2">Login</button></Link>
                            <Link to="/Registro"><button className="btn btn-success">Registro</button></Link>
                        </div>
                    )}
                    {token && (
                        <button className="btn btn-danger" onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};