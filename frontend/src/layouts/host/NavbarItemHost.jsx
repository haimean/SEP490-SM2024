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
        Blog
      </Button>
    </Box>
  );
};

export default NavbarItemHost;
