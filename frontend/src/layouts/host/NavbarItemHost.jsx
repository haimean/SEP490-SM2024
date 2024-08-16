import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarItemHost = () => {
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
