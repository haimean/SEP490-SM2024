import { useState } from "react";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";

// ----------------------------------------------------------------------

export default function LayoutAdmin({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

LayoutAdmin.propTypes = {
  children: PropTypes.node,
};
