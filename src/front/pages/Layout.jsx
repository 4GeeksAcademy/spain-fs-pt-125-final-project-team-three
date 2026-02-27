import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home.jsx";
import { Restaurantes } from "./restaurantes.jsx";
import { Favoritos } from "./Favoritos.jsx";
import { Visitados } from "./Visitados.jsx"; 
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";

export const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar /> 
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Restaurantes />} path="/restaurantes" />
                <Route element={<Favoritos />} path="/favoritos" />
                <Route element={<Visitados />} path="/visitados" />
                <Route element={<h1>No encontrado</h1>} path="*" />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Layout;