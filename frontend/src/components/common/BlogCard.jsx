import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const BlogCard = ({ court, address, time, image, isLarge }) => {
  //isLarge true thì hiển thị ảnh to
  return (
    <Card
      className={`shadow-lg ${
        isLarge ? "h-full" : ""
      } hover:shadow-xl hover:scale-[1.02]`}
      sx={{
        boxShadow: 2,
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
          transition: 'all 0.3s ease-in-out',
          transitionDuration: 300
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={court}
        className={`object-cover ${isLarge ? "h-96" : "h-40"} bg-blue-200`}
      />
      <CardContent sx={isLarge && { p: 2, height: 100 }}>
        <Typography
          variant="h6"
          component="div"
          fontWeight={700}
          mb={isLarge ? 2 : 0}
        >
          {court}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={isLarge ? 1 : 0}>
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
