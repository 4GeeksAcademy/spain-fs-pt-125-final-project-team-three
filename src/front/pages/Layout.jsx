import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./Home.jsx";
import { Restaurantes } from "./restaurantes.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export const Layout = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Navbar /> 
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Restaurantes />} path="/restaurantes" />
                    <Route element={<h1>Página no encontrada</h1>} path="*" />
                </Routes>
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Layout;