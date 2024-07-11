import React, { useEffect, useState } from "react";
import CardComponent from "../../../components/host/CardComponent";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import FilterCp from "../../../components/host/FilterCp";
import CallApi from "../../../service/CallAPI";

const ListBranch = () => {
  const [listBranch, setListBranch] = useState([]);
  const [filters, setFilters] = useState({
    area: "",
    time: "",
  });
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchBranchList = async () => {
      try {
        const apiUrl = role === "host" ? "/api/host/branches" : "/api/branches";
        const response = await CallApi(apiUrl, "get");
        setListBranch(response?.data);
      } catch (error) {
        console.log(
          "=============== fetch list branch ERROR: " +
            error.response?.data?.error
        );
      }
    };
    fetchBranchList();
  }, [role]);

  const getFilteredAndSortedBranches = () => {
    let filteredBranches = [...listBranch];

    // Lọc theo khu vực
    if (filters.area) {
      filteredBranches = filteredBranches.filter((branch) =>
        branch.address.province
          .toLowerCase()
          .includes(filters.area.toLowerCase())
      );
    }

    // Sắp xếp theo thời gian mở cửa
    if (filters.time) {
      filteredBranches.sort((a, b) => {
        const timeA = a.openingHours.split("-")[0].trim(); // Lấy giờ mở cửa
        const timeB = b.openingHours.split("-")[0].trim();
        if (filters.time === "earliest") {
          return timeA.localeCompare(timeB);
        } else {
          return timeB.localeCompare(timeA);
        }
      });
    }

    return filteredBranches;
  };

  const filterOptions = [
    {
      name: "area",
      label: "Khu vực",
      options: [
        { value: "cau giay", label: "Cầu Giấy" },
        { value: "thanh xuan", label: "Thanh Xuân" },
        { value: "hai ba trung", label: "Hai Bà Trưng" },
      ],
      onChange: (value) => handleFilterChange("area", value), // chưa có filter address
    },
    {
      name: "time",
      label: "Thời gian mở cửa",
      options: [
        { value: "earliest", label: "Sớm nhất" },
        { value: "latest", label: "Muộn nhất" },
      ],
      onChange: (value) => handleFilterChange("time", value),
    },
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const isFilterApplied = () => {
    return filters.area !== "" || filters.time !== "";
  };

  const branchesDisplay = isFilterApplied()
    ? getFilteredAndSortedBranches()
    : listBranch;

  return (
    <Box
      sx={{
        my: 16,
        mx: 10,
        minHeight: "100vh",
        height: "full",
      }}
    >
      <Typography variant="h4" component="h2" mb={6} fontWeight={600}>
        Danh sách chi nhánh
      </Typography>
      <FilterCp filters={filterOptions} />
      <Grid container spacing={3}>
        {branchesDisplay.map((item) => (
          <Grid item xs={12} sm={4} md={3} key={item.id}>
            <Link
              to={`/${role === "host" ? "host" : "player"}/branch/${item.id}`}
            >
              <CardComponent
                name={item?.name}
                location={item?.address?.districts}
                time={item?.openingHours}
                image={item?.image}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListBranch;
