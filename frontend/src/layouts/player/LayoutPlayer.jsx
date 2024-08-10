import Footer from "./Footer";
import { Box } from "@mui/material";
import NavbarUser from "./NavbarUser";

export default function LayoutPlayer({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavbarUser sx={{ flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
}
