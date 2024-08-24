/* eslint-disable react/prop-types */

import {
  AccountBox,
  Checklist,
  Email,
  LocationOn,
  Phone,
  SportsBasketball,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import CourtCard from "../Court/CourtCard";

// import testImg from "D:/1_2024-05-SEM9/DOAN/scl.jpg"

const UserBranchDetail = ({
  title,
  image,
  description,
  map,
  courts,
  branch,
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
            <Typography variant="h6" gutterBottom>
              Tiện ích:
            </Typography>
            {branch?.attributeBranches.map((att) => (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                key={att.id}
              >
                <Typography>-&nbsp;</Typography>
                <Typography>
                  {att?.attributeKeyBranches.name}: {att.value}
                </Typography>
              </Stack>
            ))}
            <Typography variant="h6" gutterBottom>
              Mô tả thêm
            </Typography>
            {renderInfoItem(
              SportsBasketball,
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Thông tin liên hệ:
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            <AccountBox style={{ marginRight: "8px" }} />
            {branch?.account?.user?.fullName}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Phone style={{ marginRight: "8px" }} />
            {branch?.phone}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Email style={{ marginRight: "8px" }} />
            {branch?.email}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <LocationOn style={{ marginRight: "8px" }} />
            {branch?.address?.detail}
          </Typography>
          {map}
        </CardContent>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Danh sách sân trong cơ sở
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
