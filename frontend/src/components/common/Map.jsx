import { useRef, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

/* eslint-disable react/prop-types */
export default function Map({
  lat = 21.0285,
  lng = 105.8542,
  address = "",
  height = "55vh",
  width = "100%",
}) {
  const mapRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      const newLatLng = L.latLng(lat, lng);
      markerRef.current.setLatLng(newLatLng);
      mapRef.current.setView(newLatLng);
    }
  }, [lat, lng]);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={20}
      style={{ height: height, width: width }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} ref={markerRef}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
}
