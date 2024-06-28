import React from "react";
import { Box, Typography, Grid, Paper, Avatar, Button } from "@mui/material";
import { Facebook, Share, AttachMoney as MoneyIcon } from "@mui/icons-material";

const PreCheckoutCp = () => {
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ position: "sticky", top: 100, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Người đăng tin
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={"link ảnh"} />
          <Typography variant="subtitle1" ml={2}>
            tên gì đó
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Facebook />}
          fullWidth
          sx={{ mb: 2 }}
        >
          Link facebook cá nhân
        </Button>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" startIcon={<Share />}>
            Chia sẻ
          </Button>
          <Button variant="outlined" color="error">
            Báo vi phạm
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default PreCheckoutCp;
