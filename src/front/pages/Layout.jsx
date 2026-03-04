import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import { Home } from "./Home.jsx";
import { Restaurantes } from "./restaurantes.jsx";
import { Favoritos } from "./Favoritos.jsx";
import { Visitados } from "./Visitados.jsx";
import { Perfil } from "./Perfil.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { Login } from "./Login.jsx";
import { Register } from "./Registro.jsx";
import { Guardados } from "./guardados.jsx";
import { Descartados } from "./descartados.jsx";

export const Layout = () => {
    const { dispatch } = useGlobalReducer();

    useEffect(() => {
        const checkUserSession = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                    method: "GET",
                    headers: { "Authorization": "Bearer " + token }
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: "cargar_visitados", payload: data.visitados });
                    dispatch({ type: "cargar_favoritos", payload: data.favoritos });
                    dispatch({ type: "cargar_guardados", payload: data.guardados });
                    dispatch({ type: "cargar_descartados", payload: data.descartados });
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkUserSession();
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Restaurantes />} path="/restaurantes" />
                <Route element={<Favoritos />} path="/favoritos" />
                <Route element={<Visitados />} path="/visitados" />
                <Route element={<Guardados />} path="/guardados" />
                <Route element={<Descartados />} path="/descartados" />
                <Route element={<Perfil />} path="/perfil" />
                <Route path="/Login" element={<Login />} />
                <Route path="/Registro" element={<Register />} />
                <Route element={<h1>No encontrado</h1>} path="*" />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Layout;