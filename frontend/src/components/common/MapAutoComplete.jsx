import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import axios from "axios";
import { Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
const SearchControl = ({ onResultSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoComplete: true,
      retainZoomLevel: false,
      autoClose: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      onResultSelect(result.location);
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onResultSelect]);

  return null;
};

// eslint-disable-next-line react/prop-types
const MapAutoComplete = ({ onSubmit }) => {
  const [position, setPosition] = useState([21.01355745, 105.5252751342127]);
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState({});
  const updatePosition = (newPosition) => {
    setPosition(newPosition);

    const provider = new OpenStreetMapProvider({
      params: {
        "accept-language": "vi", // Add this parameter to request results in Vietnamese
      },
    });
    provider
      .search({ query: `${newPosition[0]}, ${newPosition[1]}` })
      .then((results) => {
        if (results && results.length > 0) {
          setAddress(results[0].label);
        }

        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPosition[0]}&lon=${newPosition[1]}&addressdetails=1&accept-language=vi`
          )
          .then((response) => {
            if (response.data && response.data.address) {
              setDetails({
                address: response.data.address,
                latitude: newPosition[0],
                longitude: newPosition[1],
              });
              onSubmit({
                addressDetail: results[0].label,
                address: response.data.address,
                latitude: newPosition[0],
                longitude: newPosition[1],
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching location details:", error);
          });
      });
  };

  const handleMapClick = (e) => {
    updatePosition([e.latlng.lat, e.latlng.lng]);
  };

  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    const newPosition = marker.getLatLng();
    updatePosition([newPosition.lat, newPosition.lng]);
  };

  return (
    <Box style={{ width: "100%", padding: "10px", marginBottom: "10px" }}>
      <p>{address}</p>
      <MapContainer
        center={position}
        zoom={20}
        style={{ height: "55vh", width: "100%" }}
        whenCreated={(map) => {
          map.on("click", handleMapClick);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SearchControl
          onResultSelect={(location) => {
            updatePosition([location.y, location.x]);
          }}
        />
        {position && (
          <Marker
            position={position}
            draggable={true}
            eventHandlers={{ dragend: handleMarkerDragEnd }}
          >
            <Popup>
              <a
                href={`https://www.google.com/maps?q=${position[0]},${position[1]}&ll=${position[0]},${position[1]}&z=17`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {details.address
                  ? `${details.address.road}, ${details.address.city}`
                  : "No details"}
              </a>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </Box>
  );
};

export default MapAutoComplete;
