import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";

import {
  LocationOn,
  Phone, Email,
  SportsBasketball,
  AccountBox,
  Checklist
} from "@mui/icons-material";
import CourtCard from "../Court/CourtCard";
// import testImg from "D:/1_2024-05-SEM9/DOAN/scl.jpg"

const testImg = "https://via.placeholder.com/200"

const UserBranchDetail = ({
  title,
  image,
  description,
  map,
  courts,
  branch
}) => {
  const renderInfoItem = (Icon, text) => (
    <Box display="flex" alignItems="center" mb={1}>
      <Icon color="action" />
      <Typography variant="body2" ml={1}>
        {text}
      </Typography>
    </Box>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            className={"object-cover bg-blue-200 h-96"}
            image={image}
            alt="Activity image"
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Mở cửa từ: {branch.openingHours} - {branch.closingHours}
            </Typography>
            {
              branch?.attributeBranches.map((att) => (
                <Stack direction="row" alignItems="center" spacing={1} key={att.id}>
                  <Checklist className="text-red-600" />
                  <Typography>
                    {att.value}: {att?.attributeKeyBranches.name}
                  </Typography>
                </Stack>
              ))
            }
            <Typography variant="h6" gutterBottom>
              Mô tả thêm
            </Typography>
            {renderInfoItem(SportsBasketball, description)}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            <AccountBox style={{ marginRight: '8px' }} />{branch?.account?.user?.fullName}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Phone style={{ marginRight: '8px' }} />
            {branch?.phone}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Email style={{ marginRight: '8px' }} />
            {branch?.email}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <LocationOn style={{ marginRight: '8px' }} />
            {branch?.address?.detail}
          </Typography>
          {map}
        </CardContent>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Các sân có sẵn
        </Typography>
        <Grid container spacing={3}>
          {courts.map((court) => (
            <Grid item xs={12} md={4} key={court.id}>
              <CourtCard court={court} image={image} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserBranchDetail;
