import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MyMap = ({ lat, lon }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      setPosition([lat, lon]);
    } 
    else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Error obteniendo ubicación:", err);
        }
      );
    }
  }, [lat, lon]);

  if (!position) return <p>Obteniendo ubicación...</p>;

  return (
    <MapContainer
      key={position[0] + position[1]}
      center={position}
      zoom={15}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          {lat && lon ? "Ubicación del restaurante" : "Estás aquí"}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;