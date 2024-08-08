import { Box, Card, CardContent, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PropTypes from "prop-types";
export default function SectionDashboard({
  title,
  direction = true,
  percentage,
  subTitle = "User",
}) {
  return (
    <div>
      <Card
        sx={{
          background: "#29be75",
          color: "white",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <span
              style={{
                marginRight: 4,
              }}
              className={direction ? "text-green-800" : "text-red-600"}
            >
              {percentage}
            </span>
            <span>
              {direction ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </span>
          </Typography>
          <Typography variant="subtitle1">{subTitle}</Typography>
          <Box
            sx={{
              height: 40,
              mt: 2,
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
            }}
          >
            {/* Here you can add a chart or a line representing user data over time */}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
SectionDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  direction: PropTypes.bool,
  percentage: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
};
