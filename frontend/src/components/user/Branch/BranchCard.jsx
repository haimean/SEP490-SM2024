/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StadiumIcon from "@mui/icons-material/Stadium";

const BranchCard = ({ name, location, image, branch, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
      className="cursor-pointer"
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        style={{ height: "250px" }}
        className={"object-cover bg-blue-200 h-40"}
      />
      <CardContent>
        <Tooltip title={name}>
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            className="truncate"
          >
            {name}
          </Typography>
        </Tooltip>
        <Stack direction="row" alignItems="center" spacing={1} className="mt-2">
          <LocationOnOutlinedIcon className="text-red-600" />
          <Tooltip title={location}>
            <Typography className="truncate">{location}</Typography>
          </Tooltip>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <AccessTimeIcon className="text-red-600" />
          <Typography>
            Giờ hoạt động: {branch?.openingHours} - {branch?.closingHours}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <StadiumIcon className="text-red-600" />
          <Typography>Số sân: {branch?.court?.length} sân</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <LocalPhoneIcon className="text-red-600" />
          <Typography>Số điện thoại liên hệ: {branch?.phone}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} className="mb-1">
          <MailIcon className="text-red-600" />
          <Typography>Email: {branch?.email}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BranchCard;
