import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Link,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Group,
  School,
  AttachMoney,
  SportsBasketball,
} from "@mui/icons-material";
import Map from "../../common/Map";
import FormatTime from "../../../utils/user/formatTime";
import PostRightCP from "./PostRightCP";

const PostDetailCP = ({ post, postId }) => {
  console.log("🚀 ========= post:", post);
  if (!post?.booking?.Court) {
    return "Không tồn tại bài này";
  }

  const { Court } = post.booking;
  const { TypeCourt } = Court;
  // const { address } = Court.Branches;

  // // const location = `${address.wards}, ${address.districts}, ${address.provinces}`;\
  // const location = address?.detail;

  // const formattedDate = format(parseISO(post.booking.dateTime), "yyyy-MM-dd");
  const formattedStartTime = FormatTime(post?.booking?.startTime);
  const formattedEndTime = FormatTime(post?.booking?.endTime);
  const date = `${formattedStartTime} - ${formattedEndTime}`;
  const address = post?.booking?.Court?.Branches?.address;
  console.log("🚀 ========= address:", address);

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
            image={
              TypeCourt?.image !== null
                ? TypeCourt?.image
                : "https://via.placeholder.com/600x400"
            }
            alt="Activity image"
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {Court?.name}
            </Typography>
            {/* {renderInfoItem(LocationOn, location)} */}
            {renderInfoItem(CalendarToday, date)}
            {renderInfoItem(
              Group,
              `Cần tuyển ${post?.numberMember} ${post?.memberPost[0]?.genderPost}` ||
                "Không có thông tin"
            )}
            {renderInfoItem(
              School,
              `Trình độ: ${post?.memberPost[0]?.level}` || "Không có thông tin"
            )}
            {renderInfoItem(
              AttachMoney,
              post?.memberPost[0]?.price || "Không có thông tin"
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
              post?.desciption || "Không có thông tin"
            )}
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
              <Link
                href={`https://www.google.com/maps?q=${address?.latitude},${address?.longitude}&ll=${address?.latitude},${address?.longitude}&z=17`}
                variant="body2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined" startIcon={<LocationOn />}>
                  Xem vị trí
                </Button>
              </Link>
            </Box>
            {/* <Typography variant="body2" color="text.secondary">
                {location}
              </Typography> */}
            <Box
              sx={{
                height: "400px",
                width: "100%",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Map
                lat={address?.latitude}
                lng={address?.longitude}
                address={address?.detail}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <PostRightCP
        user={post?.booking?.bookingInfo}
        post={post}
        postId={postId}
        isOwner={true}
      />
    </Grid>
  );
};

export default PostDetailCP;
