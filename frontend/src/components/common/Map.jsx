import { useRef } from "react";
import { MapContainer, Marker } from "react-leaflet";

/* eslint-disable react/prop-types */
export default function Map({ lat, lng }) {
  const position = useRef([lat, lng]);

  return (
    <MapContainer
      center={position}
      zoom={20}
      style={{ height: "80vh", width: "100%" }}
    >
      <Marker position={position}></Marker>
    </MapContainer>
  );
}
