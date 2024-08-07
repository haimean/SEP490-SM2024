import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const TopBranches = ({ branches, role = "USER" }) => {
  return (
    <section className="block">
      <Box sx={{ py: 6, px: { xs: 2, md: 4, lg: 6 } }}>
        <Typography variant="h2" align="center" gutterBottom>
          Các sân đấu hàng đầu
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Khám phá các sân cầu lông của chúng tôi và các dịch vụ độc đáo của họ
        </Typography>

        <Grid container spacing={4}>
          {branches.map((branch, index) => {
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
                    <Typography variant="body1" paragraph>
                      {branch?.description}
                    </Typography>
                    <Typography variant="body2">
                      Email: {branch?.email}
                    </Typography>
                    <Typography variant="body2">
                      Phone: {branch?.phone}
                    </Typography>
                    <Typography variant="body2">
                      Hours: {branch?.openingHours} - {branch?.closingHours}
                    </Typography>
                    <Typography variant="body2">
                      Address: {branch?.address.detail}, {branch?.address.wards}
                      , {branch?.address.districts}, {branch?.address.provinces}
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
