/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const BaseBox = ({ title, children }) => {
  return (
    <Box
      sx={{
        my: 12,
        mx: 10,
        minHeight: "100vh",
        height: "full",
      }}
    >
      <Typography variant="h4" component="h2" fontWeight={600}>
        {title}
      </Typography>
      <Box
        sx={{
          mt: 5,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export default BaseBox;
