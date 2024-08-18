/* eslint-disable react/prop-types */
import Sidebar from "./Sidebar";
import Footer from "../player/Footer";
import { Box } from "@mui/material";
import NavbarHost from "./NavbarHost";
export default function LayoutHost({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavbarHost />
      <div className="grid grid-cols-5 mb-5">
        <div>
          <div className="">
            <Sidebar />
          </div>
        </div>
        <div className="col-span-4 bg-[#fafafa]">{children}</div>
      </div>
      <Footer />
    </Box>
  );
}
