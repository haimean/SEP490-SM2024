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
  Stack,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Repeat,
  Group,
  School,
  AttachMoney,
  Checklist,
  SportsBasketball,
} from "@mui/icons-material";
import RightSectionDetailPage from "../RightSectionDetailPage";
import RightSectionHost from "../RightSectionHost";
const CourtDetailComponent = ({
  title,
  image,
  description,
  id,
  role,
  type,
  court
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
            {
              court?.TypeCourt?.attributeCourt?.map((att) => (
                <Stack direction="row" alignItems="center" spacing={1} key={att.id}>
                  <Checklist className="text-red-600" />
                  <Typography>
                    {att.value}: {att?.attributeKeyCourt.name}
                  </Typography>
                </Stack>
              ))
            }
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
        <RightSectionDetailPage court={court} branch={court?.Branches}/>
      ) : (
        <RightSectionHost id={id} type={type} court1={court}/>
      )}
    </Grid>
  );
};

export default CourtDetailComponent;
