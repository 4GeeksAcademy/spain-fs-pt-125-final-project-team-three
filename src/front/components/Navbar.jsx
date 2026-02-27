import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar navbar-light bg-light p-3 border-bottom shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold " to="/">HAMBRIENTOS</Link>

                <div className="d-flex align-items-center">
                    <div className="dropdown me-3">
                        <button 
                            className="btn dropdown-toggle fw-bold" 
                            type="button" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            Mi Actividad ({store.misFavoritos.length + store.yaVisitados.length})
                        </button>
                        
                        <ul className="dropdown-menu dropdown-menu-end shadow" style={{ minWidth: "300px" }}>
                            <li><h6 className="dropdown-header fw-bold">⭐ Favoritos</h6></li>
                            {store.misFavoritos.length === 0 ? (
                                <li><span className="dropdown-item text-muted small">Vacio</span></li>
                            ) : (
                                store.misFavoritos.slice(0, 3).map((fav, i) => (
                                    <li key={i} className="d-flex justify-content-between align-items-center px-3 py-1">
                                        <span className="small text-truncate" style={{ maxWidth: "180px" }}>{fav.nombre}</span>
                                        <button 
                                            className="btn btn-sm text-danger p-0"
                                            onClick={() => dispatch({ type: "borrar_favorito", payload: fav.nombre })}
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))
                            )}

                            <li><hr className="dropdown-divider" /></li>

                            <li><h6 className="dropdown-header fw-bold">📍 Ya Visitados</h6></li>
                            {store.yaVisitados.length === 0 ? (
                                <li><span className="dropdown-item text-muted small">No has ido a ninguno</span></li>
                            ) : (
                                store.yaVisitados.slice(0, 3).map((vis, i) => {
                                    const esFav = store.misFavoritos.some(f => f.nombre === vis.nombre);
                                    return (
                                        <li key={i} className="d-flex justify-content-between align-items-center px-3 py-1">
                                            <span className="small text-truncate" style={{ maxWidth: "150px" }}>{vis.nombre}</span>
                                            <div className="d-flex gap-2">
                                                <button 
                                                    className={`btn btn-sm p-0 ${esFav ? "text-warning" : "text-secondary"}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        dispatch({ type: "agregar_favorito", payload: vis });
                                                    }}
                                                    disabled={esFav}
                                                >
                                                    {esFav ? "★" : "☆"}
                                                </button>
                                                <button 
                                                    className="btn btn-sm text-danger p-0"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        dispatch({ type: "borrar_visitado", payload: vis.nombre });
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })
                            )}
                            
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item text-center text-primary small fw-bold" to="/perfil">MI PERFIL</Link></li>
                        </ul>
                    </div>

                    <Link to="/login" className="btn btn-outline-primary">Login</Link>
                </div>
            </div>
        </nav>
    );
};