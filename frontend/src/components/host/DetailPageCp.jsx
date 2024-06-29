import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Repeat,
  Group,
  School,
  AttachMoney,
  SportsBasketball,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";

const DetailPageCp = ({
  title,
  image,
  location,
  date,
  description,
  frequency,
  participants,
  level,
  price,
  RightSectionComponent,
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
            {renderInfoItem(LocationOn, location)}
            {renderInfoItem(CalendarToday, date)}
            {renderInfoItem(Repeat, frequency)}
            {renderInfoItem(Group, participants)}
            {renderInfoItem(School, level)}
            {renderInfoItem(AttachMoney, price)}
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mô tả thêm
            </Typography>
            {renderInfoItem(SportsBasketball, description)}
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Bản đồ</Typography>
              <Button variant="outlined" startIcon={<LocationOn />}>
                Xem vị trí
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
            <Box
              sx={{
                height: "400px",
                width: "100%",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Typography
                variant="body2"
                sx={{ textAlign: "center", paddingTop: "180px" }}
              >
                Google Maps ở đây
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <RightSectionComponent />
    </Grid>
  );
};

export default DetailPageCp;
