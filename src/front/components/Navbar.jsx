import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar  bg-light p-3">
            <Link className="navbar-brand" to="/">HAMBRIENTOS</Link>
            <div>
                <Link className="btn " to="/favoritos">Mis Favoritos</Link>
            </div>
        </nav>
    );
};