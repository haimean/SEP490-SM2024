// MapComponent.jsx
import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import axios from "axios";
import { Box } from "@mui/material";

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

const MapComponent = ({ onSubmit }) => {
  const [position, setPosition] = useState([21.01355745, 105.5252751342127]);
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState({});
  const updatePosition = (newPosition) => {
    setPosition(newPosition);
    const provider = new OpenStreetMapProvider({
      params: {
        "accept-language": "vi", // Thêm tham số này để yêu cầu kết quả bằng tiếng Việt
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
              console.log(response.data);
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

  const markerRef = useRef(null);

  useEffect(() => {
    const map = markerRef.current?.leafletElement?.getMap();
    if (map) {
      map.on("click", handleMapClick);
      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [markerRef]);

  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    const newPosition = marker.getLatLng();
    updatePosition([newPosition.lat, newPosition.lng]);
  };

  return (
    <Box style={{ width: "100%", padding: "10px", marginBottom: "10px" }}>
      <input
        type="text"
        value={address}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <MapContainer
        center={position}
        zoom={20}
        style={{ height: "80vh", width: "100%" }}
        whenCreated={(map) => {
          map.on("click", x);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SearchControl
          onResultSelect={(location) =>
            updatePosition([location.y, location.x])
          }
        />

        <Marker
          position={position}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDragEnd }}
        >
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
      <div style={{ marginTop: "10px" }}>
        <h3>Location Details</h3>
        <p>
          <strong>Latitude:</strong> {details.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {details.longitude}
        </p>
        <p>
          <strong>Address:</strong> {JSON.stringify(details?.address)}
        </p>
      </div>
    </Box>
  );
};

export default MapComponent;
