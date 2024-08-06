import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, Box, TextField } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";

const BranchFilter = ({ onFilterChange }) => {
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
  const [search, setSearch] = useState("");

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
      onFilterChange("", "", "", search);
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
    onFilterChange(selectedOption.name, "", "", search);
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setSelectedDistrict({ id: "", name: "" });
      setSelectedWard({ id: "", name: "" });
      setWards([]);
      onFilterChange(selectedProvince.name, "", "", search);
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
    onFilterChange(selectedProvince.name, selectedOption.name, "", search);
  };

  const handleWardChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setSelectedWard({ id: "", name: "" });
      onFilterChange(selectedProvince.name, selectedDistrict.name, "", search);
      return;
    }

    const selectedOption = wards.find((ward) => ward.id === value);
    setSelectedWard({ id: selectedOption.id, name: selectedOption.name });
    onFilterChange(
      selectedProvince.name,
      selectedDistrict.name,
      selectedOption.name,
      search
    );
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onFilterChange(
      selectedProvince.name,
      selectedDistrict.name,
      selectedWard.name,
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
              {province.name}
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
              {district.name}
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
              {ward.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Tìm kiếm theo tên"
        value={search}
        onChange={handleSearchChange}
        variant="outlined"
      />
    </Box>
  );
};

BranchFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default BranchFilter;
