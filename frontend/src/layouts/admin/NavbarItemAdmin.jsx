import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarItemAdmin = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    navigate(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        color="inherit"
        component={Link}
        to="/"
        sx={{ textTransform: "none" }}
      >
        Trang chủ
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/admin/list-account"
        sx={{ textTransform: "none" }}
      >
        Quản lý tài khoản
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/admin/report-blog"
        sx={{ textTransform: "none" }}
      >
        Quản lý tố cáo
      </Button>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            color: "white",
            "& .MuiSelect-icon": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem value="" disabled>
            Thuộc tính
          </MenuItem>
          <MenuItem value="/admin/branch-attribute">Thuộc tính cơ sở</MenuItem>
          <MenuItem value="/admin/court-attribute">Thuộc tính sân đấu</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            color: "white",
            "& .MuiSelect-icon": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem value="" disabled>
            Cơ sở
          </MenuItem>
          <MenuItem value="/admin/accept-branch">Duyệt cơ sở</MenuItem>
          <MenuItem value="/admin/list-branch">Danh sách cơ sở</MenuItem>
        </Select>
      </FormControl>

      {/* dẫn đến trang dashboard của admin */}
      <Button
        color="inherit"
        component={Link}
        to="/admin/dashboard"
        sx={{ textTransform: "none" }}
      >
        Thống kê
      </Button>
    </Box>
  );
};

export default NavbarItemAdmin;
