import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
const NavbarItemUser = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        color="inherit"
        component={Link}
        to="/search-courts"
        sx={{ textTransform: "none" }}
      >
        Tìm sân đấu
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/available-post"
        sx={{ textTransform: "none" }}
      >
        Tìm trận đấu
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/list-blog"
        sx={{ textTransform: "none" }}
      >
        Blog
      </Button>
    </Box>
  );
};

export default NavbarItemUser;
