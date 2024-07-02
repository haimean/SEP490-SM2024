import { Box, Typography } from "@mui/material";
import React from "react";

const SectionCp = ({ field }) => (
  <Box sx={{ width: "100%", mt: 1 }}>
    <Typography variant="h6" component="h2">
      {field.label}
    </Typography>
  </Box>
);

export default SectionCp;
