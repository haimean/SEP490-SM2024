import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const ListPageCp = ({ name, location, time, image }) => {
  //image là link ảnh
  const id = useParams();

  return (
    <Link to={`/host/branch/${id}`}>
      <Card
        sx={{
          boxShadow: "0 3px 3px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          className={"object-cover bg-blue-200 h-40"}
        />
        <CardContent>
          <Typography variant="h6" component="div" fontWeight={700}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {time}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListPageCp;
