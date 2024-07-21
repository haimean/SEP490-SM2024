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
import { format, parseISO } from "date-fns";
import {
  LocationOn,
  CalendarToday,
  Repeat,
  Group,
  School,
  AttachMoney,
  SportsBasketball,
} from "@mui/icons-material";

const PostDetailCP = ({ post, RightSectionComponent, map }) => {
  console.log(post);

  if (!post.booking || !post.booking.Court) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const { Court } = post.booking;
  const { address } = Court.Branches;

  // const location = `${address.wards}, ${address.districts}, ${address.provinces}`;\
  const location = address.detail;

  const formattedStartTime = format(parseISO(post.booking.startTime), "HH:mm");
  const formattedEndTime = format(parseISO(post.booking.endTime), "HH:mm");
  const date = `${formattedStartTime} - ${formattedEndTime}`;

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
            image={Court.image || "https://via.placeholder.com/600x400"}
            alt="Activity image"
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {Court.name}
            </Typography>
            {renderInfoItem(LocationOn, location)}
            {renderInfoItem(CalendarToday, date)}
            {renderInfoItem(
              Group,
              `Cần tuyển ${post.numberMember} ${post.memberPost[0].genderPost}` ||
                "Không có thông tin"
            )}
            {renderInfoItem(
              School,
              `Trình độ: ${post.memberPost[0].level}` || "Không có thông tin"
            )}
            {renderInfoItem(
              AttachMoney,
              post.memberPost[0].price || "Không có thông tin"
            )}
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mô tả thêm
            </Typography>
            {renderInfoItem(
              SportsBasketball,
              post.desciption || "Không có thông tin"
            )}
          </CardContent>
        </Card>
        {map && (
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
                {map}
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      <RightSectionComponent />
    </Grid>
  );
};

export default PostDetailCP;
