import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import axios from "axios";

const removeAdministrativeTerms = (input) => {
  if (!input) return null;
  return input
    .replace(/(?:quận|huyện|xã|tỉnh|phường|thị trấn|thành phố)\s*/gi, "")
    .trim();
};

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
      keepResult: false,
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
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newPosition[0]}&lon=${newPosition[1]}&addressdetails=1&accept-language=vi&`
          )
          .then((response) => {
            if (response.data && response.data.address) {
              console.log("response.data.address", response.data.address);

              const normalized = {
                commune:
                  removeAdministrativeTerms(
                    response.data.address.village ||
                      response.data.address.residential ||
                      response.data.address.quarter ||
                      response.data.address.neighbourhood
                  ) || "Xã", // Xã/Phường/Thị trấn
                district:
                  removeAdministrativeTerms(
                    response.data.address.county ||
                      response.data.address.city_district ||
                      response.data.address.suburb
                  ) || "Huyện", // Huyện/Quận
                province:
                  removeAdministrativeTerms(
                    response.data.address.state || response.data.address.city
                  ) || "Tỉnh", // Tỉnh/Thành phố
              };

              console.log("normalized'", normalized);

              setDetails({
                address: response.data.address,
                latitude: newPosition[0],
                longitude: newPosition[1],
              });
              onSubmit({
                addressDetail: results[0].label,
                address: normalized,
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
