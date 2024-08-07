import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";

const PostCard = ({ postId, owner, court, price, time, image, isLarge }) => {
  //isLarge true thì hiển thị ảnh to
  return (
    <Link to={`post/${postId}`}>
      <Card
        className={`shadow-lg ${
          isLarge ? "h-full" : ""
        } hover:shadow-xl hover:scale-[1.02]`}
        sx={{
          boxShadow: 2,
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
            transitionDuration: 300,
          },
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={court}
          className={`object-cover ${isLarge ? "h-96" : "h-40"} bg-blue-200`}
        />
        <CardContent sx={isLarge && { p: 3, height: "full" }}>
          <Typography
            variant={isLarge ? "h4" : "h5"}
            component="div"
            fontWeight={700}
            my={isLarge ? 4 : 0}
          >
            {owner}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sân: {court}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Giá:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Giờ bắt đầu:{" "}
            {time
              ? format(parseISO(time), "HH:mm - dd/MM/yyyy", { locale: vi })
              : ""}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
