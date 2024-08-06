import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

/* eslint-disable react/prop-types */
export default function Map({ lat = 21.0285, lng = 105.8542 }) {
  const position = useRef([lat, lng]);
  console.log("🚀 ========= position:", position);

  return (
    <MapContainer
      center={position.current}
      zoom={20}
      style={{ height: "55vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position.current}>
        <Popup>
          <a
            href={`https://www.google.com/maps?q=${position[0]},${position[1]}&ll=${position[0]},${position[1]}&z=17`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Mở bản đồ
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
