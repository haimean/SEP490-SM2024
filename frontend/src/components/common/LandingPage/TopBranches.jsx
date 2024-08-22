/* eslint-disable react/prop-types */
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Tooltip,
  Container,
} from "@mui/material";
import haversine from "haversine";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StadiumIcon from "@mui/icons-material/Stadium";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const TopBranches = ({ branches, role = "USER" }) => {
  const [location, setLocation] = useState(null);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
      });
    }
  };
  const distance = (latitude, longitude) => {
    return haversine(
      {
        latitude: latitude || "21.013393218627524",
        longitude: longitude || "105.52526950492785",
      },
      {
        latitude: location?.latitude || "21.013393218627524",
        longitude: location?.longitude || "105.52526950492785",
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <section className="block">
      <Container sx={{ py: 6, px: { xs: 2, md: 4, lg: 6 } }}>
        <Typography
          variant="h4"
          component="h2"
          mb={6}
          fontWeight={600}
          align="center"
        >
          Các sân đấu mới nhất
        </Typography>
        <Grid container spacing={4}>
          {branches?.map((branch, index) => {
            const cardContent = (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: index % 2 === 0 ? "row" : "row-reverse",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    height: { xs: "auto", md: 400 },
                    objectFit: "cover",
                  }}
                  image={branch?.image}
                  alt={branch?.name}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { lg: "100%", xl: "50%" },
                  }}
                >
                  <CardContent
                    sx={{
                      flex: "1 0 auto",
                      p: {
                        xs: 2,
                        sm: 4,
                        md: 6,
                        lg: 8,
                        xl: 10,
                      },
                    }}
                    className="flex gap-1 flex-col"
                  >
                    <Typography component="h3" variant="h4" gutterBottom>
                      {branch?.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <DirectionsRunIcon className="text-red-600" />
                      <Typography>
                        Sân cách vị trí của bạn:{" "}
                        {distance(
                          branch?.address?.latitude,
                          branch?.address?.longitude
                        ).toFixed(0) == 0
                          ? " ~ "
                          : distance(
                              branch?.address?.latitude,
                              branch?.address?.longitude
                            ).toFixed(2)}{" "}
                        km
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PersonIcon className="text-red-600" />
                      <Tooltip
                        title={branch?.account?.user?.fullName || "Chưa có tên"}
                      >
                        <Typography>
                          {branch?.account?.user?.fullName || "Chưa có tên"}
                        </Typography>
                      </Tooltip>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocationOnOutlinedIcon className="text-red-600" />
                      <Typography>
                        Địa chỉ:
                        {branch?.address?.detail}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AccessTimeIcon className="text-red-600" />
                      <Typography>
                        Giờ hoạt động: {branch?.openingHours} -{" "}
                        {branch?.closingHours}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <StadiumIcon className="text-red-600" />
                      <Typography>
                        Số sân: {branch?.court?.length} sân
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocalPhoneIcon className="text-red-600" />
                      <Typography>
                        Số điện thoại liên hệ: {branch?.phone}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MailIcon className="text-red-600" />
                      <Typography>Email: {branch?.email}</Typography>
                    </Stack>
                  </CardContent>
                </Box>
              </Card>
            );

            return (
              <Grid item xs={12} key={branch?.id}>
                {role === "USER" ? (
                  <Link to={`/user/branch/${branch?.id}`}>{cardContent}</Link>
                ) : (
                  cardContent
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </section>
  );
};

export default TopBranches;
