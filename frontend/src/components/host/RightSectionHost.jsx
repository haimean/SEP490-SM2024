// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import CallApi from "../../service/CallAPI";

const RightSectionHost = ({ id, type }) => {
  const { idCourt } = useParams();
  const [court, setCourt] = useState([]);

  useEffect(() => {
    const getAllCourt = async () => {
      try {
        const result = await CallApi(
          type === "Branch"
            ? `/api/host/court/branch/${id}`
            : `/api/host/court/${idCourt}`,
          "get"
        );
        setCourt(result.data);
      } catch (error) {
        console.log("🚀 ========= error:", error);
      }
    };
    getAllCourt();
  }, [id, idCourt, type]);
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
          {type === "Branch"
            ? court.map((item) => (
                <Link
                  key={item.id}
                  to={`/player/branch/${id}/court/${item.id}`}
                >
                  <CustomTooltip title={longText}>
                    <ListItemButton>
                      <img
                        src="https://bizweb.dktcdn.net/100/352/498/products/sancaulong105langha1.jpg?v=1716193376243"
                        width={50}
                        height={50}
                        alt={item.name}
                      />
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </CustomTooltip>
                </Link>
              ))
            : ""}
        </List>
      </Paper>
    </Grid>
  );
};

export default RightSectionHost;
