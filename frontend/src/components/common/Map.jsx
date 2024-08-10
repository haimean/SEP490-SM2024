import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

/* eslint-disable react/prop-types */
export default function Map({
  lat = 21.0285,
  lng = 105.8542,
  address = "",
  height = "55vh",
  width = "100%",
}) {
  const position = useRef([lat, lng]);

  return (
    <MapContainer
      center={position.current}
      zoom={20}
      style={{ height: height, width: width }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position.current}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
}
