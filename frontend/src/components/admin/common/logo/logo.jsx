import PropTypes from "prop-types";
import { forwardRef } from "react";
import { keyframes } from "@mui/system";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { RouterLink } from "../../../../routers/admin/components";
import { Typography } from "@mui/material";

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const gentleShakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      {...other}
      className="my-4"
    >
      <Typography
        variant="h5"
        fontWeight={500}
        noWrap
        // component={Link}
        to="/host/dashboard"
        sx={{
          display: { xs: "none", sm: "block" },
          cursor: "pointer",
          "&:hover": {
            animation: `${gentleShakeAnimation} 0.5s ease-in-out`,
          },
        }}
      >
        Court Connect
      </Typography>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link
      component={RouterLink}
      href="/admin/dashboard"
      sx={{ display: "contents" }}
    >
      {logo}
    </Link>
  );
});
Logo.displayName = "Logo";
Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
