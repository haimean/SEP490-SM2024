import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import DetailPageCp from "../../../components/host/DetailPageCp";

const BranchDetail = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar sx={{ flexShrink: 0 }} />
      <Box
        sx={{
          my: 12,
          mx: 10,
          flexGrow: 1,
        }}
      >
        <DetailPageCp />
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default BranchDetail;
