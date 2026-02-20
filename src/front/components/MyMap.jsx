import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MyMap = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error("Error obteniendo ubicación:", err);
      }
    );
  }, []);

  if (!position) return <p>Obteniendo tu ubicación...</p>;

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>Estás aquí</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;