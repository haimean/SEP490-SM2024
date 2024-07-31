import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const CardComponent = ({
  name,
  location,
  time,
  image,
  role,
  id,
  isAccept,
  onDeleteBranch,
}) => {
  const truncateName = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const cardContent = (
    <>
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: 300,
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            sx={{
              height: "3em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {truncateName(name, 40)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {time}
        </Typography>
        {role === "HOST" && isAccept && (
          <Button
            variant="contained"
            onClick={() => {
              onDeleteBranch(id);
            }}
          >
            Xóa branch
          </Button>
        )}
      </CardContent>
    </>
  );

  return (
    <Card
      sx={{
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
        },
        display: "flex",
        flexDirection: "column",
        height: "100%",
        opacity: isAccept ? 1 : 0.5,
        pointerEvents: isAccept ? "auto" : "none",
      }}
    >
      {isAccept ? (
        <Link to={`/${role === "HOST" ? "host" : "player"}/branch/${id}`}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </Card>
  );
};

export default CardComponent;
