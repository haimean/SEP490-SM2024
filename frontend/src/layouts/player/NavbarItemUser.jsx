import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarItemUser = () => {
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
        to="/player/list-branch"
        sx={{ textTransform: "none" }}
      >
        Sân đấu
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/player/booking-history"
        sx={{ textTransform: "none" }}
      >
        Lịch sử đặt sân
      </Button>
    </Box>
  );
};

export default NavbarItemUser;
