import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarItemHost = () => {
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
        to="/host/list-blog"
        sx={{ textTransform: "none" }}
      >
        Bài đăng
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
            Quản lý
          </MenuItem>
          <MenuItem value="/host/list-branch">Danh sách cơ sở</MenuItem>
        </Select>
      </FormControl>

      {/* dẫn đến trang dashboard của host */}
      <Button
        color="inherit"
        component={Link}
        to="/host/dashboard"
        sx={{ textTransform: "none" }}
      >
        Thống kê
      </Button>
    </Box>
  );
};

export default NavbarItemHost;
