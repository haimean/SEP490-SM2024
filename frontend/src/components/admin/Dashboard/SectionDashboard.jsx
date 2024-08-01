// import { Box, Card, CardContent, Typography } from "@mui/material";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// export default function SectionDashboard({
//   title,
//   direction = true,
//   percentage,
// }) {
//   return (
//     <div>
//       <Card
//         sx={{ backgroundColor: "#5A55EB", color: "white", borderRadius: 2 }}
//       >
//         <CardContent>
//           <Typography variant="h6" component="div">
//             {title}
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{ display: "flex", alignItems: "center", mb: 1 }}
//           >
//             <span
//               style={{
//                 color: direction == true ? "green" : "red",
//                 marginRight: 4,
//               }}
//             >
//               {percentage}
//             </span>
//             <span>
//               {direction == true ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
//             </span>
//           </Typography>
//           <Typography variant="subtitle1">Users</Typography>
//           <Box
//             sx={{
//               height: 40,
//               mt: 2,
//               background: "rgba(255, 255, 255, 0.2)",
//               borderRadius: 1,
//             }}
//           >
//             {/* Here you can add a chart or a line representing user data over time */}
//           </Box>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { Box, Card, CardContent, Typography, keyframes } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PropTypes from "prop-types";
// Define keyframes for color animation
const colorChange = keyframes`
  0% { background-color: #5A55EB; }
  33% { background-color: #E53935; }
  66% { background-color: #FFB74D; }
  100% { background-color: #5A55EB; }
`;

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
          background: "#5A55EB",
          color: "white",
          borderRadius: 2,
          animation: `${colorChange} 10s infinite ease-in-out`, // Animation with infinite loop
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
                color: direction ? "green" : "red",
                marginRight: 4,
              }}
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
