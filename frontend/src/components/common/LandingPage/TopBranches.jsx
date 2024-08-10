import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import haversine from "haversine";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <Box sx={{ py: 6, px: { xs: 2, md: 4, lg: 6 } }}>
        <Typography variant="h2" align="center" gutterBottom>
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
                  >
                    <Typography component="h3" variant="h4" gutterBottom>
                      {branch?.name}
                    </Typography>
                    <Typography variant="body2">
                      Email: {branch?.email}
                    </Typography>
                    <Typography variant="body2">
                      Số điện thoại: {branch?.phone}
                    </Typography>
                    <Typography variant="body2">
                      Giờ hoạt động: {branch?.openingHours} -{" "}
                      {branch?.closingHours}
                    </Typography>
                    <Typography variant="body2">
                      Địa chỉ: {branch?.address?.detail}
                    </Typography>
                    <Typography variant="body2">
                      Sân cách vị trí của bạn:
                      {distance(
                        branch?.address?.latitude,
                        branch?.address?.longitude
                      ).toFixed(0) == 0
                        ? " ~"
                        : distance(
                            branch?.address?.latitude,
                            branch?.address?.longitude
                          ).toFixed(2) + "km"}
                    </Typography>
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
      </Box>
    </section>
  );
};

export default TopBranches;
