import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function LayoutPlayer({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar sx={{ flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
}
