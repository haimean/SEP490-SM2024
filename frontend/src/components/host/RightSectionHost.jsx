import React from "react";
import {
  Grid,
  Paper,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Link } from "react-router-dom";

const RightSectionHost = () => {
  const longText = "Sàn: Gỗ<br/>Chất lượng: Tốt<br/>Số lượng: 4 người";

  const CustomTooltip = ({ title, children }) => {
    return (
      <Tooltip
        title={<span dangerouslySetInnerHTML={{ __html: title }} />}
        TransitionComponent={Zoom}
        placement="right"
        className="flex gap-2"
      >
        {children}
      </Tooltip>
    );
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ position: "sticky", top: 100, px: 2, py: 1 }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Danh sách sân
            </ListSubheader>
          }
        >
          <CustomTooltip title={longText}>
            <ListItemButton>
              <img
                src="https://bizweb.dktcdn.net/100/352/498/products/sancaulong105langha1.jpg?v=1716193376243"
                width={50}
                height={50}
                alt="Sân 1"
              />
              <ListItemText primary="Sân 1" />
            </ListItemButton>
          </CustomTooltip>
          <Link to={"/player/court/1"}>
            <CustomTooltip title={longText}>
              <ListItemButton>
                <img
                  src="https://bizweb.dktcdn.net/100/352/498/products/sancaulong105langha1.jpg?v=1716193376243"
                  width={50}
                  height={50}
                  alt="Sân 2"
                />
                <ListItemText primary="Sân 2" />
              </ListItemButton>
            </CustomTooltip>
          </Link>
        </List>
      </Paper>
    </Grid>
  );
};

export default RightSectionHost;
