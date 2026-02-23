import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import MyMap from "../components/MyMap"
import RestaurantsNearby from "../components/RestaurantsNearby"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
  return (
    <div>
      <h1>Mapa</h1>
      <MyMap />
      <h1>Restaurantes cercanos</h1>
      <RestaurantsNearby />
    </div>

  )
}