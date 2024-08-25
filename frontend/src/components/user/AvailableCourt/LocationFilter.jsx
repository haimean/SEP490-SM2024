import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import axios from "axios";

const LocationFilter = ({ onFilterChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  const handleProvinceChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setSelectedProvince({ id: "", name: "" });
      setSelectedDistrict({ id: "", name: "" });
      setSelectedWard({ id: "", name: "" });
      setDistricts([]);
      setWards([]);
      onFilterChange("", "", "", date, time, level, price);
      return;
    }

    const selectedOption = provinces.find((province) => province.id === value);
    setSelectedProvince({
      id: selectedOption.id,
      name: selectedOption.name,
    });
    setSelectedDistrict({ id: "", name: "" });
    setSelectedWard({ id: "", name: "" });
    axios
      .get(`https://esgoo.net/api-tinhthanh/2/${selectedOption.id}.htm`)
      .then((response) => {
        if (response.data.error === 0) {
          setDistricts(response.data.data);
          setWards([]); // Reset wards
        }
      })
      .catch((error) => console.error("Error fetching districts:", error));
    onFilterChange(selectedOption.name, "", "", date, time, level, price);
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setSelectedDistrict({ id: "", name: "" });
      setSelectedWard({ id: "", name: "" });
      setWards([]);
      onFilterChange(selectedProvince.name, "", "", date, time, level, price);
      return;
    }

    const selectedOption = districts.find((district) => district.id === value);
    setSelectedDistrict({
      id: selectedOption.id,
      name: selectedOption.name,
    });
    setSelectedWard({ id: "", name: "" });
    axios
      .get(`https://esgoo.net/api-tinhthanh/3/${selectedOption.id}.htm`)
      .then((response) => {
        if (response.data.error === 0) {
          setWards(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching wards:", error));
    onFilterChange(
      selectedProvince.name,
      selectedOption.name,
      "",
      date,
      time,
      level,
      price
    );
  };

  const handleWardChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setSelectedWard({ id: "", name: "" });
      onFilterChange(
        selectedProvince.name,
        selectedDistrict.name,
        "",
        date,
        time,
        level,
        price
      );
      return;
    }

    const selectedOption = wards.find((ward) => ward.id === value);
    setSelectedWard({ id: selectedOption.id, name: selectedOption.name });
    onFilterChange(
      selectedProvince.name,
      selectedDistrict.name,
      selectedOption.name,
      date,
      time,
      level,
      price
    );
  };

  const handleDateChange = (event) => {
    console.log("🚀 ========= event:", event.target.value);
    setDate(event.target.value);
    onFilterChange(
      selectedProvince.name,
      selectedDistrict.name,
      selectedWard.name,
      event.target.value,
      time,
      level,
      price
    );
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
    onFilterChange(
      selectedProvince.name,
      selectedDistrict.name,
      selectedWard.name,
      date,
      event.target.value,
      level,
      price
    );
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    onFilterChange(
      selectedProvince.name,
      selectedDistrict.name,
      selectedWard.name,
      date,
      time,
      level,
      event.target.value
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb={4}
      gap={2}
      className="flex-wrap"
    >
      <FormControl className="w-48">
        <Select
          value={selectedProvince.id}
          onChange={handleProvinceChange}
          displayEmpty
        >
          <MenuItem value="">
            <span>Tỉnh/Thành phố</span>
          </MenuItem>
          {provinces.map((province) => (
            <MenuItem key={province.id} value={province.id}>
              {province.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-48" disabled={!selectedProvince.id}>
        <Select
          value={selectedDistrict.id}
          onChange={handleDistrictChange}
          displayEmpty
        >
          <MenuItem value="">
            <span>Quận/Huyện</span>
          </MenuItem>
          {districts.map((district) => (
            <MenuItem key={district.id} value={district.id}>
              {district.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-48" disabled={!selectedDistrict.id}>
        <Select
          value={selectedWard.id}
          onChange={handleWardChange}
          displayEmpty
        >
          <MenuItem value="">
            <span>Phường/Xã</span>
          </MenuItem>
          {wards.map((ward) => (
            <MenuItem key={ward.id} value={ward.id}>
              {ward.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="date"
        label="Ngày"
        value={date}
        onChange={handleDateChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        type="time"
        label="Giờ"
        value={time}
        onChange={handleTimeChange}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl className="w-48">
        <Select value={price} onChange={handlePriceChange} displayEmpty>
          <MenuItem value="">
            <span>Phí thuê sân</span>
          </MenuItem>
          <MenuItem value="deal">Thỏa thuận</MenuItem>
          <MenuItem value="50000">Dưới 50,000</MenuItem>
          <MenuItem value="100000">Dưới 100,000</MenuItem>
          <MenuItem value="200000">Dưới 200,000</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

LocationFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default LocationFilter;
