/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Repeat,
  Group,
  School,
  AttachMoney,
  SportsBasketball,
} from "@mui/icons-material";
import RightSectionDetailPage from "../RightSectionDetailPage";
import RightSectionHost from "../RightSectionHost";
const CourtDetailComponent = ({
  title,
  image,
  location,
  date,
  description,
  frequency,
  participants,
  level,
  price,
  id,
  role,
  type,
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
            {location && renderInfoItem(LocationOn, location)}
            {date && renderInfoItem(CalendarToday, date)}
            {frequency && renderInfoItem(Repeat, frequency)}
            {participants && renderInfoItem(Group, participants)}
            {level && renderInfoItem(School, level)}
            {price && renderInfoItem(AttachMoney, price)}
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mô tả thêm
            </Typography>
            {description && renderInfoItem(SportsBasketball, description)}
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {role == "USER" ? (
        <RightSectionDetailPage />
      ) : (
        <RightSectionHost id={id} type={type} />
      )}
    </Grid>
  );
};

export default CourtDetailComponent;
